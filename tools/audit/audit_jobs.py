import os, re, json

jobs_dir = r"v214 src\src\main\java\net\swordie\ms\client\jobs"
wz_dir = r"Server263\data\wz265"
dat_dir = r"Server263\data\dat265"

results = []

for root, dirs, files in os.walk(jobs_dir):
    for f in files:
        if f.endswith('.java') and f != 'Job.java':
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                content = fp.read()
            
            # Check for 6th job / Hexa keywords
            has_show_hexa = 'showHexaSkillEff' in content
            has_origin_debuff = 'OriginDebuff' in content
            has_hexa_kw = 'HEXA' in content or 'Hexa' in content
            
            # Find all skill constants defined or used
            skill_constants = re.findall(r'public static final int\s+([A-Z0-9_]+)\s*=\s*([0-9]+);', content)
            
            # Find Hexa skills specifically
            hexa_skills = [(name, val) for name, val in skill_constants if 'HEXA' in name or 'ORIGIN' in name or (len(val) == 9 and val.startswith(('4000', '15', '16', '63')) and int(val) % 10000 > 1000)]
            
            # Check handleSkill cases
            handle_skill_match = re.search(r'handleSkill\s*\([^)]*\)\s*\{([\s\S]*?)(?:public|private|protected|\Z)', content)
            handle_skill_text = handle_skill_match.group(1) if handle_skill_match else ""
            
            # Check handleAttack cases
            handle_attack_match = re.search(r'handleAttack\s*\([^)]*\)\s*\{([\s\S]*?)(?:public|private|protected|\Z)', content)
            handle_attack_text = handle_attack_match.group(1) if handle_attack_match else ""
            
            # Check spawnSummon & spawnAffectedArea
            summon_calls = re.findall(r'spawnSummon[^\n;]*', content)
            aa_calls = re.findall(r'spawnAffectedArea[^\n;]*', content)
            
            rel_path = os.path.relpath(p, jobs_dir)
            results.append({
                'class': f.replace('.java', ''),
                'path': rel_path.replace('\\', '/'),
                'lines': len(content.splitlines()),
                'has_show_hexa': has_show_hexa,
                'has_origin_debuff': has_origin_debuff,
                'has_hexa_kw': has_hexa_kw,
                'num_constants': len(skill_constants),
                'hexa_skills': hexa_skills,
                'summon_calls_count': len(summon_calls),
                'aa_calls_count': len(aa_calls),
                'has_handle_skill': bool(handle_skill_match),
                'has_handle_attack': bool(handle_attack_match)
            })

print(f"Total job classes: {len(results)}")
print(f"With showHexaSkillEff: {sum(1 for r in results if r['has_show_hexa'])}")
print(f"With OriginDebuff: {sum(1 for r in results if r['has_origin_debuff'])}")
print(f"With HEXA keyword: {sum(1 for r in results if r['has_hexa_kw'])}")

# Output summary
with open(r"audit_jobs_summary.json", "w", encoding="utf-8") as out_fp:
    json.dump(results, out_fp, indent=2)

print("Saved audit_jobs_summary.json")
