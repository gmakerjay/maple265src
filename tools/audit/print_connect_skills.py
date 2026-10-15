import json

with open('wz_job_hexacores_detailed.json') as f:
    data = json.load(f)

for jid, cats in data.items():
    print(f"\n==================== JOB {jid} ====================")
    for cat_name, cores in cats.items():
        for c in cores:
            print(f"  [{cat_name:7}] Core {c['core_id']}: {c['name']} -> Skills: {c['connectSkill']}")
