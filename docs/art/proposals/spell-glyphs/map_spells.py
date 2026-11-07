#!/usr/bin/env python3
"""Read-only data-to-glyph proposal generator. No repo edits, DB mutations or network.
Explicit per-spell decisions live in manual-rules.json. Auto rules are transparent
heuristics, NOT a claim every tactical interaction is encoded by this vocabulary.
"""
from pathlib import Path
import json,re,collections,argparse
P=Path(__file__).resolve().parent
REPO=Path('/workspace/odm')
SCHOOLS=['abjuration','conjuration','divination','enchantment','evocation','illusion','necromancy','transmutation']
TYPES=['fire','cold','lightning','thunder','acid','poison','necrotic','radiant','force','psychic','bludgeoning','piercing','slashing']
def key(s):return re.sub(r'[^a-z0-9]','',s.lower())
def load(n):return json.load(open(REPO/n))
def main():
 manifest=load('src/lib/srd/manifest/spells.json')['spells'];mechanics=load('src/lib/srd/manifest/spell-mech.json')['spells'];auth=load('src/lib/srd/authored-spells.json')['spells'];pages=load('src/lib/rulebook/srd-5.1.json')['pages'];pages=[x for x in pages if x.get('kind')=='spell']
 rows={key(x['n']):dict(name=x['n'],level=x['l'],school=x['s'],manifest=x,sources=['src/lib/srd/manifest/spells.json']) for x in manifest};aliases={key(a):key(x['n']) for x in manifest for a in x.get('a',[])}
 def row(n):
  k=aliases.get(key(n),key(n))
  if k not in rows: rows[k]=dict(name=n,level=None,school=None,manifest={},sources=[])
  return rows[k]
 for x in pages: r=row(x['title']);r['rules']=x;r['sources'].append('src/lib/rulebook/srd-5.1.json')
 for x in auth:r=row(x['name']);r['authored']=x;r['sources'].append('src/lib/srd/authored-spells.json')
 for x in mechanics:r=row(x['n']);r['mechanics']=x;r['sources'].append('src/lib/srd/manifest/spell-mech.json')
 overrides=json.load(open(P/'manual-rules.json')) if (P/'manual-rules.json').exists() else {}
 results=[]
 for k,r in sorted(rows.items(),key=lambda v:v[1]['name']):
  n=r['name'];name=n.lower(); mf=r['manifest']; au=r.get('authored',{});ru=r.get('rules',{}); m={**au.get('mech',{}),**r.get('mechanics',{}).get('m',{})}
  text=au.get('desc',ru.get('md',''));text=re.split(r'\*\*\*At Higher Levels',text)[0];low=text.lower()
  ran=str(au.get('range',mf.get('d',''))).lower();dur=str(au.get('duration',''))
  if not dur:
   z=re.search(r'\*\*Duration:\*\*\s*([^\n]+)',text);dur=z.group(1) if z else ''
  if not ran:
   z=re.search(r'\*\*Range:\*\*\s*([^\n]+)',text);ran=z.group(1).lower() if z else ''
  school=r['school'] or au.get('school') or next((s for s in SCHOOLS if s in ru.get('meta','').lower()),'transmutation')
  level=r['level'] if r['level'] is not None else au.get('level')
  why=[];primary=None;fallback=False;damage=[]
  dt=m.get('damageType')
  if isinstance(dt,str) and dt in TYPES:damage=[dt]
  hits=[]
  pattern=r'(\d+)d(\d+)(?:\s*(?:extra|additional))?\s+('+'|'.join(TYPES)+r')\s+damage'
  for z in re.finditer(pattern,low):hits.append((int(z[1])*(int(z[2])+1)/2,z[3]))
  if not damage and hits:damage=[d for _,d in sorted(hits,reverse=True)]
  dtypes=list(dict.fromkeys('physical' if x in ['bludgeoning','piercing','slashing'] else x for x in damage))
  if m.get('resolution')=='heal' or re.search(r'(regains?|restores?)\b[^.]{0,90}\bhit points',low):primary='heal';why.append('healing mechanics/text')
  elif dtypes:primary=dtypes[0];why.append('structured damage type' if dt else 'explicit damage dice in text')
  elif re.search(r'^(conjure|summon|animate dead|create undead|danse macabre|find familiar|find steed|find greater steed|tiny servant|unseen servant|animate objects)',name):primary='summon';why.append('summoning/animation name rule')
  elif re.search(r'\b(teleport|teleportation)\b',low) or name in ['misty step','dimension door','far step','thunder step','blink','tree stride','transport via plants']:primary='teleport';why.append('explicit teleport/movement rules')
  elif name.startswith(('detect ','locate ','identify','clairvoyance','scrying','divination','augury','commune','legend lore','find traps','true seeing','see invisibility','arcane eye')):primary='detection';why.append('information spell name rule')
  elif re.search(r'\b(paralyzed|frightened|charmed|restrained|stunned|incapacitated|blinded|deafened)\b',low) or m.get('condition'):primary='control';why.append('condition in mechanics/text')
  elif school=='abjuration' or re.search(r'^(shield|ward|protection|resistance|death ward|sanctuary|mage armor|stoneskin|barkskin|invulnerability)',name):primary='protection';why.append('protective school/name rule')
  elif m.get('resolution')=='buff' or m.get('buff') or re.search(r'^(bless|haste|enhance ability|heroism|guidance|enlarge|aid|darkvision|foresight|longstrider|jump|fly|levitate|water breathing|water walk)',name):primary='buff';why.append('beneficial mechanics/name rule')
  else:primary='utility';fallback=True;why.append('unclassified: utility fallback, needs semantic review')
  secondary=[]
  if dtypes and re.search(r'\b(prone|paralyzed|frightened|charmed|restrained|stunned|blinded|deafened)\b',low):secondary.append('control')
  shape_text=ran+' '+low
  # Area cues come from rule text; ranges such as Self (15-foot cone) take precedence.
  if re.search(r'\bcone\b',shape_text):target='cone'
  elif re.search(r'\bwall\b',name) or re.search(r'\b\d+[- ]foot(?:[- ]radius)? cube\b|\bcubic\b',shape_text):target='cube-wall'
  elif re.search(r'\bline\b',ran) or re.search(r'\bline\s+(?:\d+|that is)|\b\d+[- ]foot[- ]long line\b',low):target='line'
  elif re.search(r'\bsphere\b|\b(?:\d+|\w+)[- ]foot[- ]radius\b|\bcylinder\b',shape_text) or m.get('area'):target='sphere'
  elif 'touch' in ran:target='touch'
  elif 'self' in ran:target='self'
  elif re.search(r'\b(?:up to |choose )?(?:two|three|four|five|six|ten|\d+) (?:willing )?(?:creatures|humanoids|targets)\b',low):target='multiple'
  else:target='single'
  save=m.get('save')
  if not save:
   z=re.search(r'\b(?:make|makes|succeed on|succeeds on|failed|fails) (?:a |an )?(strength|dexterity|constitution|intelligence|wisdom|charisma) saving throw\b',low);save=z[1][:3] if z else None
  conc=bool(mf.get('k') or au.get('concentration') or 'concentration' in dur.lower())
  ritual=bool(mf.get('r') or au.get('ritual') or '(ritual)' in text.lower())
  v=dict(name=n,level=level,frame=school,primaryEffect=primary,secondaryEffects=secondary,target=target,flags={'concentration':conc,'ritual':ritual,'save':save.upper() if save else None},range=ran,duration=dur,damageTypes=dtypes,mapping='utility-fallback' if fallback else 'automatic',reasons=why,sources=r['sources'],hasRulesText=bool(text))
  if n in overrides:
   rule=overrides[n];v.update({k:x for k,x in rule.items() if k not in ['reason','flags']})
   if 'flags'in rule:v['flags'].update(rule['flags'])
   v['mapping']='manual-rule';v['reasons'].append(rule['reason'])
  results.append(v)
 counts=collections.Counter(x['mapping'] for x in results)
 summary={'total':len(results),'automatic':counts['automatic'],'manualRule':counts['manual-rule'],'utilityFallback':counts['utility-fallback'],'runtimeChoice':sum(bool(x.get('requiresRuntimeChoice')) for x in results),'noRulesText':[x['name'] for x in results if not x['hasRulesText']],'utilityFallbackSpells':[x['name'] for x in results if x['mapping']=='utility-fallback'],'intentionalUtilitySpells':[x['name'] for x in results if x['primaryEffect']=='utility'],'primaryEffectCounts':dict(collections.Counter(x['primaryEffect'] for x in results)),'sourceCounts':{'manifest':len(manifest),'bakedMechanics':len(mechanics),'SRD51':len(pages),'authoredExpanded':len(auth)},'metadataWarnings':json.load(open(P/'metadata-warnings.json'))['warnings'],'scope':'Union of repository manifest, baked mechanics, SRD rules and authored-expanded rules. No live content database mounted/queried. Automatic means transparent rule-based proposal, not human-verified tactical completeness.'}
 # Validate taxonomy and retain confidence boundaries instead of silently inventing glyphs.
 effects={x.stem for x in (P/'effects').glob('*.webp')};targets={x.stem for x in (P/'targets').glob('*.webp')}
 for x in results:assert x['primaryEffect'] in effects and x['target'] in targets and x['frame'] in SCHOOLS,x
 (P/'spell-map.json').write_text(json.dumps({'summary':summary,'spells':results},indent=2))
 print(json.dumps(summary,indent=2))
if __name__=='__main__':main()
