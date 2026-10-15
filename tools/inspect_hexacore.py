import sys
import xml.etree.ElementTree as ET

target_job = sys.argv[1] if len(sys.argv) > 1 else '122'

tree = ET.parse('Server263/data/wz265/Etc.wz/HexaCore.img.xml')
root = tree.getroot()

hexaSkill = root.find("./imgdir[@name='hexaSkill']")
jobCore = hexaSkill.find("./imgdir[@name='jobCore']")
coreData = hexaSkill.find("./imgdir[@name='coreData']")

core_dict = {}
for cd in coreData:
    cid = cd.attrib.get('name')
    name_node = cd.find("./string[@name='name']")
    name = name_node.attrib.get('value') if name_node is not None else ''
    connect = [s.attrib.get('value') for s in cd.findall("./imgdir[@name='connectSkill']/int")]
    core_dict[cid] = (name, connect)

found = False
for j in jobCore:
    if j.attrib.get('name') == target_job:
        found = True
        print(f"=== Job {target_job} Hexa Cores ===")
        for cat in j:
            cat_name = cat.attrib.get('name')
            cores = [c.attrib.get('value') for c in cat]
            print(f"Category: {cat_name}")
            for cid in cores:
                cinfo = core_dict.get(cid, ('Unknown', []))
                print(f"  CoreID {cid}: {cinfo[0]} -> ConnectSkills: {cinfo[1]}")

if not found:
    print(f"Job {target_job} not found in jobCore!")
