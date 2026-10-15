import sys
import xml.etree.ElementTree as ET

xml_file = sys.argv[1] if len(sys.argv) > 1 else '124'
skill_id = sys.argv[2] if len(sys.argv) > 2 else None

path = f'Server263/data/wz265/Skill.wz/Skill_00000/{xml_file}.xml'
tree = ET.parse(path)
root = tree.getroot()
skill_dir = root.find("./*[@name='skill']")

if skill_id:
    s = skill_dir.find(f"./*[@name='{skill_id}']")
    if s is not None:
        print(f"Skill {skill_id}:")
        for c in s:
            name = c.attrib.get('name')
            val = c.attrib.get('value', '')
            if c.tag == 'imgdir':
                children = [sub.attrib.get('name') + '=' + sub.attrib.get('value', '') for sub in c]
                print(f"  [{c.tag}] {name}: {children[:10]}")
            else:
                print(f"  [{c.tag}] {name} = {val}")
    else:
        print(f"Skill {skill_id} not found in {xml_file}.xml")
else:
    print(f"Skills in {xml_file}.xml:")
    for c in skill_dir:
        print(" ", c.attrib.get('name'))
