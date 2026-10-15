import json, re

# Read JobEnum from JobConstants.java
job_enum_map = {}
with open(r'v214 src\src\main\java\net\swordie\ms\constants\JobConstants.java', 'r', encoding='utf-8') as f:
    text = f.read()

enum_matches = re.findall(r'([A-Za-z0-9_]+)\s*\(\s*([0-9]+)\s*\)', text)
for name, val in enum_matches:
    job_enum_map[int(val)] = name

with open('wz_hexa_info.json') as f:
    data = json.load(f)

wz_jobs = sorted([int(j) for j in data['jobs']])

print(f"{'Job ID':7} | {'Enum Name':28}")
print("-" * 40)
for j in wz_jobs:
    jname = job_enum_map.get(j, f"Unknown ({j})")
    print(f"{j:7} | {jname:28}")
