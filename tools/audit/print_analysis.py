import json

with open('class_analysis_deep.json') as f:
    data = json.load(f)

print("=== 1. SKILLS MISSING IN DAT/WZ (Defined in Java but NOT in .dat) ===")
missing_any = False
for c, info in sorted(data.items()):
    if info['v_missing_dat_count'] > 0 or info['hexa_missing_dat_count'] > 0:
        missing_any = True
        print(f"{c:18} | Missing V: {info['v_missing_dat']} | Missing Hexa: {info['hexa_missing_dat']}")

if not missing_any:
    print("NONE! All defined V and Hexa skills exist 100% in DAT/WZ files.")

print("\n=== 2. HEXA DEFINED BUT 0 HANDLING (PURE SCAFFOLDING / CONSTANTS ONLY) ===")
scaffolding = []
for c, info in sorted(data.items()):
    if info['hexa_count'] > 0:
        hs_count = len(info['hexa_in_handleSkill'])
        ha_count = len(info['hexa_in_handleAttack'])
        if hs_count == 0 and ha_count == 0:
            scaffolding.append((c, info['hexa_count'], info['origin_count'], info['origin_names']))

for c, hc, oc, onames in scaffolding:
    print(f"{c:18} | Hexa Constants: {hc:2} | Origin Count: {oc:2} | Origins: {onames}")

print(f"\nTotal pure scaffolding Hexa classes: {len(scaffolding)}")

print("\n=== 3. CLASSES WITH ACTUAL HEXA IMPLEMENTATION ===")
implemented = []
for c, info in sorted(data.items()):
    if info['hexa_count'] > 0:
        hs_count = len(info['hexa_in_handleSkill'])
        ha_count = len(info['hexa_in_handleAttack'])
        if hs_count > 0 or ha_count > 0 or info['has_showHexaSkillEff']:
            implemented.append((c, hc, hs_count, ha_count, info['has_showHexaSkillEff'], info['origin_in_handleSkill'], info['origin_in_handleAttack']))

for c, hc, hsc, hac, eff, ohs, oha in implemented:
    print(f"{c:18} | HandleSkill: {hsc:2} | HandleAttack: {hac:2} | ShowHexaEff: {str(eff):5} | OriginInHS: {ohs} | OriginInHA: {oha}")

print(f"\nTotal actively handled Hexa classes: {len(implemented)}")
