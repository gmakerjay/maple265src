import os, re, xml.etree.ElementTree as ET

wz_skill_dir = r"Server263\data\wz265\Skill.wz"
jobs_dir = r"v214 src\src\main\java\net\swordie\ms\client\jobs"

skill_nodes = {}

print("Scanning Skill.wz XML files (checking <dir> and <imgdir>)...")
for root, dirs, files in os.walk(wz_skill_dir):
    for f in files:
        if f.endswith('.xml') and not f.startswith('MobSkill') and not f.startswith('Dragon'):
            p = os.path.join(root, f)
            try:
                tree = ET.parse(p)
                r = tree.getroot()
                for elem in r.iter():
                    if elem.tag in ('dir', 'imgdir'):
                        sname = elem.attrib.get('name', '')
                        if sname.isdigit() and len(sname) >= 7:
                            sid = int(sname)
                            has_summon = False
                            has_aa = False
                            for sub in elem:
                                sub_name = sub.attrib.get('name', '')
                                if sub_name == 'summon':
                                    has_summon = True
                                elif sub_name == 'affectedArea':
                                    has_aa = True
                            skill_nodes[sid] = {'has_summon': has_summon, 'has_aa': has_aa}
            except Exception as e:
                pass

print(f"Loaded {len(skill_nodes)} skills from Skill.wz")

# Now check Java classes
crash_risks = []
for root, dirs, files in os.walk(jobs_dir):
    for f in files:
        if f.endswith('.java') and f != 'Job.java':
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                lines = fp.readlines()
            
            # Map constant names to integer IDs
            consts = {}
            for line in lines:
                m = re.search(r'public static final int\s+([A-Za-z0-9_]+)\s*=\s*([0-9]+);', line)
                if m:
                    consts[m.group(1)] = int(m.group(2))
            
            # Check spawnSummon calls
            for idx, line in enumerate(lines):
                m_summon = re.search(r'getSummonByAndSetStat\s*\([^,]+,\s*([A-Za-z0-9_.]+)', line)
                if m_summon:
                    skill_ref = m_summon.group(1).split('.')[-1]
                    sid = None
                    if skill_ref.isdigit():
                        sid = int(skill_ref)
                    elif skill_ref in consts:
                        sid = consts[skill_ref]
                    
                    if sid and sid in skill_nodes:
                        if not skill_nodes[sid]['has_summon']:
                            crash_risks.append({
                                'class': f,
                                'line': idx + 1,
                                'type': 'SUMMON_WITHOUT_NODE',
                                'skill': skill_ref,
                                'id': sid
                            })
                
                m_aa = re.search(r'spawnAffectedArea\s*\([^,]+,\s*([A-Za-z0-9_.]+)', line)
                if m_aa:
                    skill_ref = m_aa.group(1).split('.')[-1]
                    sid = None
                    if skill_ref.isdigit():
                        sid = int(skill_ref)
                    elif skill_ref in consts:
                        sid = consts[skill_ref]
                    
                    if sid and sid in skill_nodes:
                        if not skill_nodes[sid]['has_aa']:
                            crash_risks.append({
                                'class': f,
                                'line': idx + 1,
                                'type': 'AA_WITHOUT_NODE',
                                'skill': skill_ref,
                                'id': sid
                            })

print(f"\nCrash risk analysis completed: {len(crash_risks)} potential issues found.")
for cr in crash_risks[:20]:
    print(f"[{cr['type']}] in {cr['class']} line {cr['line']}: Skill {cr['skill']} ({cr['id']})")
