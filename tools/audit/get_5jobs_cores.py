import xml.etree.ElementTree as ET
import json

tree = ET.parse(r'Server263\data\wz265\Etc.wz\HexaCore.img.xml')
root = tree.getroot()

# First get all core details (name, connectSkill)
cores_info = {}
for elem in root.findall('.//imgdir'):
    if elem.attrib.get('name') == 'coreData':
        for core in elem.findall('imgdir'):
            cid = core.attrib.get('name')
            cname = ""
            connect = []
            for ch in core:
                if ch.attrib.get('name') == 'name':
                    cname = ch.attrib.get('value')
                elif ch.attrib.get('name') == 'connectSkill':
                    connect = [s.attrib.get('value') for s in ch]
            cores_info[cid] = {'name': cname, 'connectSkill': connect}

target_jobs = {
    '10112': 'Zero',
    '14212': 'Kinesis',
    '332': 'Pathfinder',
    '3112': 'Demon Slayer',
    '2712': 'Luminous'
}

results = {}
for elem in root.findall('.//imgdir'):
    if elem.attrib.get('name') == 'jobCore':
        for job_elem in elem.findall('imgdir'):
            jid = job_elem.attrib.get('name')
            if jid in target_jobs:
                job_name = target_jobs[jid]
                cat_map = {}
                for cat in job_elem.findall('imgdir'):
                    cat_name = cat.attrib.get('name')
                    cat_cores = []
                    for c in cat.findall('int'):
                        core_val = c.attrib.get('value')
                        core_meta = cores_info.get(core_val, {})
                        cat_cores.append({
                            'core_id': core_val,
                            'name': core_meta.get('name', 'N/A'),
                            'connectSkill': core_meta.get('connectSkill', [])
                        })
                    cat_map[cat_name] = cat_cores
                results[f"{jid}_{job_name}"] = cat_map

with open("missing_5jobs_hexacores.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)

for job_key, cats in results.items():
    print(f"\n==================== {job_key} ====================")
    for cat_name, cores in cats.items():
        for c in cores:
            print(f"  [{cat_name:7}] Core {c['core_id']}: {c['name']} -> Skills: {c['connectSkill']}")
