import os, re, json, glob

jobs_dir = r"v214 src\src\main\java\net\swordie\ms\client\jobs"
wz_skill_dir = r"Server263\data\wz265\Skill.wz"

# Collect all job classes
job_files = {}
for root, dirs, files in os.walk(jobs_dir):
    for f in files:
        if f.endswith('.java') and f != 'Job.java':
            job_files[f.replace('.java', '')] = os.path.join(root, f)

audit_report = {}

for job_name, file_path in job_files.items():
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as fp:
        code = fp.read()
    
    # Extract skill constants: NAME = VALUE
    constants = dict(re.findall(r'public static final int\s+([A-Za-z0-9_]+)\s*=\s*([0-9]+);', code))
    
    # Find 5th job (V) skills: typically 4000x or V_
    v_skills = {k: v for k, v in constants.items() if k.startswith('V_') or ('4000' in v and len(v) == 9)}
    
    # Find Hexa / Origin skills
    hexa_skills = {k: v for k, v in constants.items() if 'HEXA' in k or 'ORIGIN' in k or (len(v) == 9 and int(v) % 100000 >= 41000)}
    
    # Check handleSkill cases
    hs_cases = re.findall(r'case\s+([A-Za-z0-9_]+):', code)
    
    # Check if Origin skill is explicitly handled in handleSkill and handleAttack
    origin_names = [k for k in hexa_skills.keys() if 'ORIGIN' in k or (k in constants and int(constants[k]) % 100000 >= 41500 and int(constants[k]) % 100000 <= 41599)]
    
    origin_in_skill = [k for k in origin_names if re.search(r'case\s+' + k + r'\s*:', code)]
    origin_in_attack = [k for k in origin_names if re.search(r'case\s+' + k + r'\s*:', code)]
    
    # Check spawnSummon calls and their skill IDs
    summon_calls = re.findall(r'(?:spawnSummon|getSummonByAndSetStat)\s*\([^,]+,\s*([A-Za-z0-9_.]+)', code)
    
    # Check spawnAffectedArea calls
    aa_calls = re.findall(r'(?:spawnAffectedArea|AffectedArea\.getPassiveAA)\s*\([^,]+,\s*([A-Za-z0-9_.]+)', code)
    
    # Check showHexaSkillEff
    has_cutscene = 'showHexaSkillEff' in code
    
    audit_report[job_name] = {
        'total_constants': len(constants),
        'v_skills_count': len(v_skills),
        'hexa_skills_count': len(hexa_skills),
        'v_skills': v_skills,
        'hexa_skills': hexa_skills,
        'origin_names': origin_names,
        'has_cutscene': has_cutscene,
        'summon_calls': summon_calls,
        'aa_calls': aa_calls,
        'lines': len(code.splitlines())
    }

print(f"Audited {len(audit_report)} jobs.")
# Summary of jobs with HEXA skills
hexa_jobs = {k: v for k, v in audit_report.items() if v['hexa_skills_count'] > 0}
print(f"Jobs with defined HEXA skills: {len(hexa_jobs)}")

with open("audit_full_report.json", "w", encoding="utf-8") as fp:
    json.dump(audit_report, fp, indent=2)

print("Saved audit_full_report.json")
