import json, re

# Extract job IDs from JobConstants.java
job_map = {}
with open(r'v214 src\src\main\java\net\swordie\ms\constants\JobConstants.java', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.findall(r'([A-Za-z0-9_]+)\s*\(\s*([0-9]+)\s*\)', text)
for name, val in matches:
    job_map[int(val)] = name

with open('wz_hexa_info.json') as f:
    data = json.load(f)

wz_jobs = sorted([int(j) for j in data['jobs']])

print(f"{'Job ID':7} | {'Job Name':25} | {'WZ Supported'}")
print("-" * 50)
for j in wz_jobs:
    jname = job_map.get(j, f"Unknown ({j})")
    print(f"{j:7} | {jname:25} | YES")

# Check jobs NOT in HexaCore.img.xml
all_4th_jobs = [k for k, v in job_map.items() if (k % 10 == 2 or k in [434, 2217, 10112]) and k > 100 and k < 20000]
missing_in_wz = [j for j in all_4th_jobs if j not in wz_jobs]
print("\n=== 4th Job classes NOT in HexaCore.img.xml ===")
for j in sorted(missing_in_wz):
    print(f"{j:7} | {job_map.get(j, 'Unknown')}")
