#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MapleStory Asset & ID Auditor (Cross-Version Porting Checker)
Compares IDs from external scripts/references against Server263 v265 WZ assets.
"""

import os
import sys
import re
import argparse
import xml.etree.ElementTree as ET

sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
WZ_DIR = os.path.join(ROOT_DIR, 'Server263', 'data', 'wz265')

class AssetAuditor:
    def __init__(self, wz_path=WZ_DIR):
        self.wz_path = wz_path
        self.mob_names = {}
        self.map_names = {}
        self.item_names = {}
        self._mob_cache = None
        self._map_cache = None

    def _get_mob_files(self):
        if self._mob_cache is None:
            mob_dir = os.path.join(self.wz_path, 'Mob.wz')
            if os.path.exists(mob_dir):
                self._mob_cache = set(f.replace('.xml', '').lstrip('0') for f in os.listdir(mob_dir) if f.endswith('.xml'))
            else:
                self._mob_cache = set()
        return self._mob_cache

    def check_mob(self, mob_id):
        mid_str = str(mob_id).lstrip('0')
        exists = mid_str in self._get_mob_files()
        name = self.get_mob_name(mid_str)
        return exists, name

    def get_mob_name(self, mid_str):
        if not self.mob_names:
            p = os.path.join(self.wz_path, 'String.wz', 'Mob.img.xml')
            if os.path.exists(p):
                try:
                    tree = ET.parse(p)
                    for node in tree.getroot().findall('imgdir'):
                        m_id = node.attrib.get('name', '').lstrip('0')
                        n_tag = node.find("string[@name='name']")
                        if n_tag is not None:
                            self.mob_names[m_id] = n_tag.attrib.get('value', '')
                except Exception as e:
                    pass
        return self.mob_names.get(mid_str, '')

    def check_map(self, map_id):
        mid_str = str(map_id)
        if len(mid_str) < 9:
            mid_str = mid_str.zfill(9)
        area_code = mid_str[0]
        p1 = os.path.join(self.wz_path, 'Map.wz', 'Map', f'Map{area_code}', f'{mid_str}.img.xml')
        p2 = os.path.join(self.wz_path, 'Map.wz', 'Map', f'Map{area_code}', f'{mid_str}.xml')
        exists = os.path.exists(p1) or os.path.exists(p2)
        name = self.get_map_name(str(map_id).lstrip('0'))
        return exists, name

    def get_map_name(self, mid_str):
        if not self.map_names:
            p = os.path.join(self.wz_path, 'String.wz', 'Map.img.xml')
            if os.path.exists(p):
                try:
                    tree = ET.parse(p)
                    for area in tree.getroot().findall('imgdir'):
                        for node in area.findall('imgdir'):
                            m_id = node.attrib.get('name', '').lstrip('0')
                            street = node.find("string[@name='streetName']")
                            map_n = node.find("string[@name='mapName']")
                            s_val = street.attrib.get('value', '') if street is not None else ''
                            m_val = map_n.attrib.get('value', '') if map_n is not None else ''
                            full = f"{s_val} : {m_val}".strip(' :')
                            self.map_names[m_id] = full
                except Exception:
                    pass
        return self.map_names.get(mid_str, '')

    def check_item(self, item_id):
        iid_str = str(item_id).lstrip('0')
        # Check string files
        name = self.get_item_name(iid_str)
        exists = name != ''
        if not exists:
            # Check Item.wz directly
            iid_int = int(item_id)
            group = f"{iid_int // 10000:04d}"
            # Check Consume, Etc, Install, Cash, Special
            for cat in ['Consume', 'Etc', 'Install', 'Cash', 'Special']:
                p = os.path.join(self.wz_path, 'Item.wz', cat, f'{group}.img.xml')
                if os.path.exists(p):
                    exists = True
                    break
        return exists, name

    def get_item_name(self, iid_str):
        if not self.item_names:
            for s_file in ['Consume.img.xml', 'Eqp.img.xml', 'Etc.img.xml', 'Ins.img.xml', 'Cash.img.xml']:
                p = os.path.join(self.wz_path, 'String.wz', s_file)
                if os.path.exists(p):
                    try:
                        tree = ET.parse(p)
                        root = tree.getroot()
                        # Some files have nested imgdirs (e.g. Eqp)
                        for node in root.iter('imgdir'):
                            i_id = node.attrib.get('name', '').lstrip('0')
                            n_tag = node.find("string[@name='name']")
                            if n_tag is not None:
                                self.item_names[i_id] = n_tag.attrib.get('value', '')
                    except Exception:
                        pass
        return self.item_names.get(iid_str, '')

    def audit_script(self, script_path):
        if not os.path.exists(script_path):
            print(f"File not found: {script_path}")
            return

        with open(script_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        print(f"\n=======================================================")
        print(f" AUDIT REPORT FOR: {os.path.basename(script_path)}")
        print(f" File: {script_path}")
        print(f"=======================================================")

        # Find Map IDs: typically 9 digits, e.g., 410007025, 100000000
        map_ids = set(re.findall(r'\b(4\d{8}|1\d{8}|9\d{8}|2\d{8}|8\d{8})\b', content))
        # Find Mob IDs: typically 7 digits, e.g. 8880830, 8881030, or starting with 88 or 9
        mob_ids = set(re.findall(r'\b(88\d{5}|89\d{5}|9\d{6})\b', content))
        # Find Item IDs: typically 7 digits starting with 1, 2, 4, 5
        item_ids = set(re.findall(r'\b(1\d{6}|2\d{6}|4\d{6}|5\d{6})\b', content))

        print(f"\n--- [1] MAP AUDIT (Found {len(map_ids)} candidates) ---")
        for mid in sorted(map_ids, key=int):
            exists, name = self.check_map(mid)
            status = "✅ MATCH" if exists else "❌ NOT FOUND IN v265"
            desc = f" ({name})" if name else ""
            print(f"  Map {mid}: {status}{desc}")

        print(f"\n--- [2] MOB AUDIT (Found {len(mob_ids)} candidates) ---")
        for mid in sorted(mob_ids, key=int):
            exists, name = self.check_mob(mid)
            status = "✅ MATCH" if exists else "❌ NOT FOUND IN v265"
            desc = f" ({name})" if name else ""
            print(f"  Mob {mid}: {status}{desc}")

        print(f"\n--- [3] ITEM AUDIT (Found {len(item_ids)} candidates) ---")
        for iid in sorted(item_ids, key=int):
            exists, name = self.check_item(iid)
            status = "✅ MATCH" if exists else "⚠️ CHECK WZ"
            desc = f" ({name})" if name else ""
            print(f"  Item {iid}: {status}{desc}")

        print(f"\n=======================================================\n")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Audit MapleStory Assets against v265 WZ")
    parser.add_argument('script', nargs='?', help="Path to script file to audit")
    parser.add_argument('--mob', type=int, help="Single Mob ID to test")
    parser.add_argument('--map', type=int, help="Single Map ID to test")
    parser.add_argument('--item', type=int, help="Single Item ID to test")
    args = parser.parse_args()

    auditor = AssetAuditor()
    if args.script:
        auditor.audit_script(args.script)
    elif args.mob:
        ex, name = auditor.check_mob(args.mob)
        print(f"Mob {args.mob}: {'✅ Exists' if ex else '❌ Missing'} ({name})")
    elif args.map:
        ex, name = auditor.check_map(args.map)
        print(f"Map {args.map}: {'✅ Exists' if ex else '❌ Missing'} ({name})")
    elif args.item:
        ex, name = auditor.check_item(args.item)
        print(f"Item {args.item}: {'✅ Exists' if ex else '❌ Missing'} ({name})")
    else:
        print("Please provide a script path or --mob/--map/--item argument.")
