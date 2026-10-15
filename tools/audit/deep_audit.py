import os, re, json, glob

dat_skills_dir = r"Server263\data\dat265\skills"
existing_dat_ids = set()
for f in os.listdir(dat_skills_dir):
    if f.endswith('.dat'):
        try:
            existing_dat_ids.add(int(f[:-4]))
        except ValueError:
            pass

print(f"Total existing .dat skill IDs: {len(existing_dat_ids)}")

jobs_dir = r"v214 src\src\main\java\net\swordie\ms\client\jobs"

class_analysis = {}

for root, dirs, files in os.walk(jobs_dir):
    for f in files:
        if f.endswith('.java') and f != 'Job.java':
            class_name = f.replace('.java', '')
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                code = fp.read()
            
            # Find all constants: NAME = VALUE
            constants = re.findall(r'public static final int\s+([A-Za-z0-9_]+)\s*=\s*([0-9]+);', code)
            const_map = {name: int(val) for name, val in constants}
            
            # Categorize constants
            v_skills = {}
            hexa_skills = {}
            origin_skills = {}
            
            for name, val in const_map.items():
                # V-Matrix: starts with 4000x or has V_ in name
                if name.startswith('V_') or (400000000 <= val <= 400059999):
                    v_skills[name] = val
                # Hexa skills: % 100000 between 41000 and 41599 or name has HEXA/ORIGIN
                if 'HEXA' in name or 'ORIGIN' in name or (val % 100000 >= 41000 and val % 100000 <= 41599):
                    hexa_skills[name] = val
                # Origin skill specifically: % 100000 between 41500 and 41599 or name has ORIGIN
                if 'ORIGIN' in name or (val % 100000 >= 41500 and val % 100000 <= 41599):
                    origin_skills[name] = val

            # Check handleSkill cases
            hs_cases = set(re.findall(r'case\s+([A-Za-z0-9_]+)\s*:', code))
            
            # Check handleAttack cases
            ha_cases = set(re.findall(r'case\s+([A-Za-z0-9_]+)\s*:', code)) # note: search within handleAttack
            
            # Find handleSkill block
            hs_block = ""
            m_hs = re.search(r'public void handleSkill\([^\)]*\)\s*\{([\s\S]*?)(?:\n\s{4}public|\n\s{4}private|\n\s{4}protected|\Z)', code)
            if m_hs:
                hs_block = m_hs.group(1)
            hs_handled = set(re.findall(r'case\s+([A-Za-z0-9_]+)\s*:', hs_block))
            for k in hexa_skills.keys():
                if k in hs_block and (f'== {k}' in hs_block or f'case {k}:' in hs_block):
                    hs_handled.add(k)
            
            # Find handleAttack block
            ha_block = ""
            m_ha = re.search(r'public void handleAttack\([^\)]*\)\s*\{([\s\S]*?)(?:\n\s{4}public|\n\s{4}private|\n\s{4}protected|\Z)', code)
            if m_ha:
                ha_block = m_ha.group(1)
            ha_handled = set(re.findall(r'case\s+([A-Za-z0-9_]+)\s*:', ha_block))
            for k in hexa_skills.keys():
                if k in ha_block and (f'== {k}' in ha_block or f'case {k}:' in ha_block):
                    ha_handled.add(k)

            # Check WZ existence for V skills and Hexa skills
            v_missing_dat = [k for k, v in v_skills.items() if v not in existing_dat_ids]
            hexa_missing_dat = [k for k, v in hexa_skills.items() if v not in existing_dat_ids]
            
            # Check how origin is handled
            origin_handled_hs = [k for k in origin_skills.keys() if k in hs_handled]
            origin_handled_ha = [k for k in origin_skills.keys() if k in ha_handled]
            
            # Check dangerous calls: spawnSummon, spawnAffectedArea inside Hexa cases
            hexa_summons = []
            hexa_aas = []
            for h_name in hexa_skills.keys():
                pattern_summon = r'case\s+' + h_name + r'[\s\S]*?(?:spawnSummon|getSummonByAndSetStat)[\s\S]*?(?:break|return)'
                pattern_aa = r'case\s+' + h_name + r'[\s\S]*?spawnAffectedArea[\s\S]*?(?:break|return)'
                if re.search(pattern_summon, code):
                    hexa_summons.append(h_name)
                if re.search(pattern_aa, code):
                    hexa_aas.append(h_name)

            class_analysis[class_name] = {
                'v_count': len(v_skills),
                'v_missing_dat_count': len(v_missing_dat),
                'v_missing_dat': v_missing_dat,
                'hexa_count': len(hexa_skills),
                'hexa_missing_dat_count': len(hexa_missing_dat),
                'hexa_missing_dat': hexa_missing_dat,
                'origin_count': len(origin_skills),
                'origin_names': list(origin_skills.keys()),
                'origin_in_handleSkill': origin_handled_hs,
                'origin_in_handleAttack': origin_handled_ha,
                'hexa_in_handleSkill': [k for k in hexa_skills.keys() if k in hs_handled],
                'hexa_in_handleAttack': [k for k in hexa_skills.keys() if k in ha_handled],
                'hexa_summons': hexa_summons,
                'hexa_aas': hexa_aas,
                'has_showHexaSkillEff': 'showHexaSkillEff' in code
            }

with open("class_analysis_deep.json", "w", encoding="utf-8") as fp:
    json.dump(class_analysis, fp, indent=2)

print("Saved class_analysis_deep.json")
