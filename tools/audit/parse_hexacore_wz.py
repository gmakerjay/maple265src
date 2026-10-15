import xml.etree.ElementTree as ET
import json

tree = ET.parse(r'Server263\data\wz265\Etc.wz\HexaCore.img.xml')
root = tree.getroot()

core_data = {}
job_cores = {}

for elem in root.findall('.//imgdir'):
    name = elem.attrib.get('name', '')
    if name == 'coreData':
        for core in elem.findall('imgdir'):
            cid = core.attrib.get('name')
            cname = ""
            ctype = 0
            connect_skills = []
            for child in core:
                if child.attrib.get('name') == 'name':
                    cname = child.attrib.get('value', '')
                elif child.attrib.get('name') == 'type':
                    ctype = int(child.attrib.get('value', 0))
                elif child.attrib.get('name') == 'connectSkill':
                    for cs in child:
                        connect_skills.append(int(cs.attrib.get('value', 0)))
            core_data[cid] = {'name': cname, 'type': ctype, 'connectSkills': connect_skills}
    elif name == 'jobCore':
        for job_elem in elem.findall('imgdir'):
            jid = job_elem.attrib.get('name')
            cores = []
            for c in job_elem:
                cores.append(int(c.attrib.get('value', 0)))
            job_cores[jid] = cores

print(f"Total Cores in WZ: {len(core_data)}")
print(f"Total Jobs in WZ: {len(job_cores)}")

wz_hexa_info = {
    'total_cores': len(core_data),
    'total_jobs': len(job_cores),
    'jobs': list(job_cores.keys()),
    'core_samples': list(core_data.items())[:10]
}

with open("wz_hexa_info.json", "w", encoding="utf-8") as fp:
    json.dump(wz_hexa_info, fp, indent=2)

print("Saved wz_hexa_info.json")
