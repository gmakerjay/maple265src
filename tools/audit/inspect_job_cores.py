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

job_details = {}
for elem in root.findall('.//imgdir'):
    if elem.attrib.get('name') == 'jobCore':
        for job_elem in elem.findall('imgdir'):
            jid = job_elem.attrib.get('name')
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
            job_details[jid] = cat_map

target_jobs = {
    '15112': 'Adele',
    '15212': 'Illium',
    '15412': 'Khali',
    '15512': 'Ark',
    '6312': 'Kain',
    '16212': 'Lara',
    '16412': 'HoYoung',
    '16112': 'Ren',
    '17212': 'Lynn',
    '17512': 'MoXuan',
    '18212': 'Sia Astelle',
    '112': 'Hero',
    '232': 'Bishop'
}

print(f"{'Job ID':7} | {'Job Name':14} | {'Skill(Origin)':14} | {'Mastery Cores':14} | {'Enforce(Boost)':14} | {'Common':8}")
print("-" * 80)
for jid, name in target_jobs.items():
    cats = job_details.get(jid, {})
    sk = len(cats.get('skill', []))
    ma = len(cats.get('mastery', []))
    en = len(cats.get('enforce', []))
    co = len(cats.get('common', []))
    print(f"{jid:7} | {name:14} | {sk:14} | {ma:14} | {en:14} | {co:8}")

with open("wz_job_hexacores_detailed.json", "w", encoding="utf-8") as f:
    json.dump({k: job_details.get(k) for k in target_jobs.keys()}, f, indent=2)

print("\nSaved wz_job_hexacores_detailed.json")
