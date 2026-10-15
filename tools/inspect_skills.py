import sys
import xml.etree.ElementTree as ET

prefix = sys.argv[1] if len(sys.argv) > 1 else '124'

tree = ET.parse('Server263/data/wz265/String.wz/Skill.img.xml')
root = tree.getroot()

for elem in root:
    name_id = elem.attrib.get('name', '')
    if name_id.startswith(prefix):
        name_elem = elem.find("./string[@name='name']")
        skill_name = name_elem.attrib.get('value', '') if name_elem is not None else 'N/A'
        desc_elem = elem.find("./string[@name='desc']")
        desc = desc_elem.attrib.get('value', '') if desc_elem is not None else ''
        print(f"{name_id}: {skill_name} | {desc[:40]}")
