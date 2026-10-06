# 🍁 คู่มือรวมคำสั่ง GM และคำสั่งทั้งหมด (MapleStory v265 / v214)

เอกสารรวบรวมคำสั่งทั้งหมดของเซิร์ฟเวอร์ **MapleStory (SwordieMS v265.3 / v214)** ทั้งคำสั่งสำหรับผู้เล่นทั่วไป และคำสั่งสำหรับทีมงาน (GameMaster & Admin) เพื่อความสะดวกในการค้นหาและใช้งาน

---

## 📌 สัญลักษณ์นำหน้าคำสั่ง (Command Prefixes) และระดับสิทธิ์ (Permission Levels)

### 1. สัญลักษณ์คำสั่ง (Prefixes)
* **คำสั่งผู้เล่น (Player Command):** ขึ้นต้นด้วย `@` เช่น `@help`, `@dispose`, `@check`
* **คำสั่งผู้ดูแล (Admin / GM Command):** ขึ้นต้นด้วย `!` หรือ `#` เช่น `!item`, `#level`, `!spawn`

### 2. ระดับสิทธิ์ของบัญชี (Account Types / Permissions)
ระบบเซิร์ฟเวอร์ตรวจสอบสิทธิ์บัญชี (`AccountType`) ก่อนดำเนินการคำสั่ง หากสิทธิ์ไม่ถึงจะไม่สามารถใช้งานได้:
| ระดับสิทธิ์ | ค่าลำดับ (Value) | สิทธิ์การเข้าถึงคำสั่ง |
| :--- | :---: | :--- |
| **Player** | 0 | คำสั่งผู้เล่นทั่วไป (`@`) |
| **Tester** | 1 | ผู้ทดสอบระบบ |
| **Intern** | 2 | ผู้ช่วย GM / พนักงานฝึกหัด |
| **GameMaster** | 3 | เจ้าหน้าที่ GM (ใช้งานคำสั่ง `!` ส่วนใหญ่ได้) |
| **Admin** | 4 | ผู้ดูแลระบบสูงสุด (ใช้งานได้ทุกคำสั่ง รวมถึงคำสั่ง Server/Database/Packet) |

---

## 📑 สารบัญหมวดหมู่คำสั่ง

1. [🎮 หมวดที่ 1: คำสั่งสำหรับผู้เล่นทั่วไป (Player Commands - `@`)](#-หมวดที่-1-คำสั่งสำหรับผู้เล่นทั่วไป-player-commands) (11 คำสั่ง)
2. [⚔️ หมวดที่ 2: สเตตัส เลเวล และสายอาชีพ (Character Stats, Levels & Jobs)](#-หมวดที่-2-สเตตัส-เลเวล-และสายอาชีพ-character-stats-levels--jobs) (19 คำสั่ง)
3. [🔮 หมวดที่ 3: สกิล บัฟ และระบบต่อสู้ (Skills, Buffs & Combat)](#-หมวดที่-3-สกิล-บัฟ-และระบบต่อสู้-skills-buffs--combat) (13 คำสั่ง)
4. [🎒 หมวดที่ 4: ไอเทม เงิน และช่องสัมภาระ (Items, Mesos, Cash & Inventory)](#-หมวดที่-4-ไอเทม-เงิน-และช่องสัมภาระ-items-mesos-cash--inventory) (16 คำสั่ง)
5. [👾 หมวดที่ 5: จัดการมอนสเตอร์ บอส และ NPC (Monsters, Bosses & NPCs)](#-หมวดที่-5-จัดการมอนสเตอร์-บอส-และ-npc-monsters-bosses--npcs) (14 คำสั่ง)
6. [🗺️ หมวดที่ 6: การวาร์ป แผนที่ และประตูมิติ (Teleportation, Maps & Portals)](#-หมวดที่-6-การวาร์ป-แผนที่-และประตูมิติ-teleportation-maps--portals) (9 คำสั่ง)
7. [📜 หมวดที่ 7: ระบบเควสต์และสคริปต์ (Quests & Scripts)](#-หมวดที่-7-ระบบเควสต์และสคริปต์-quests--scripts) (6 คำสั่ง)
8. [🛡️ หมวดที่ 8: การจัดการผู้เล่นและการลงโทษ (Moderation, Ban & Anti-Cheat)](#-หมวดที่-8-การจัดการผู้เล่นและการลงโทษ-moderation-ban--anti-cheat) (6 คำสั่ง)
9. [⚙️ หมวดที่ 9: การควบคุมเซิร์ฟเวอร์ ระบบอีเวนต์ และดีบั๊ก (Server Administration, Events & Debug)](#-หมวดที่-9-การควบคุมเซิร์ฟเวอร์-ระบบอีเวนต์-และดีบั๊ก-server-administration-events--debug) (23 คำสั่ง)
10. [📊 ตารางสรุปคำสั่งทั้งหมดเรียงตามตัวอักษร (Quick Reference Table)](#-ตารางสรุปคำสั่งทั้งหมดเรียงตามตัวอักษร-quick-reference-table) (117 คำสั่ง)

---

## 🎮 หมวดที่ 1: คำสั่งสำหรับผู้เล่นทั่วไป (Player Commands)
> **สัญลักษณ์คำสั่ง:** `@` | **สิทธิ์ขั้นต่ำ:** `Player` (ทุกคนใช้ได้)

| คำสั่ง | คำสั่งย่อ / ชื่ออื่น | รูปแบบการใช้งาน (Syntax) | คำอธิบาย |
| :--- | :--- | :--- | :--- |
| `@help` | - | `@help` | แสดงรายการคำสั่งช่วยเหลือเบื้องต้น และช่วยรีเฟรช V-Matrix พร้อมเปิด UI เกิดใหม่หากตัวละครตาย |
| `@dispose` | - | `@dispose` | **แก้บั๊กตัวละครติดค้าง (Unstuck)**: ปลดล็อค UI, ล้างค้างสคริปต์, รีเฟรชปาร์ตี้, กิลด์, พันธมิตร และเปิดหน้าต่างชุบชีวิตถ้าตาย |
| `@check` | - | `@check [ชื่อตัวละคร]` | หากไม่ใส่ชื่อ จะเปิดดูสเตตัสตนเอง (`check_stats`) หากใส่ชื่อผู้เล่นอื่นในแผนที่ จะเปิดดูข้อมูลตัวละครนั้น |
| `@checkmob` | `@checkmonster` | `@checkmob` | สแกนมอนสเตอร์รอบตัว 500x500 พิกเซล แสดง Mob ID, ชื่อ, เลือดปัจจุบัน/สูงสุด, ค่า EXP, รายการของดรอป และจำนวนมอนสเตอร์ในแมพ |
| `@boss` | `@checkboss` | `@boss` | ตรวจสอบคูลดาวน์และจำนวนรอบการลงบอสทั้งหมด (คำนวณตามระดับ VIP: ทั่วไป, Gold, Diamond) พร้อมนับเวลาถอยหลัง |
| `@home` | - | `@home` | วาร์ปตัวละครกลับไปยังเมือง **Henesys** (Map ID: 100000000) ทันที (ไม่สามารถใช้ขณะอยู่ใน Instance ได้) |
| `@sell` | `@quicksell` | `@sell` | เปิดหน้าต่างระบบขายไอเทมด่วนในช่องเก็บของ (`inv-seller`) |
| `@afk` | - | `@afk` | เปิดระบบบอทฟาร์มล่ามอนสเตอร์อัตโนมัติ (Idle Hunting Content Script) |
| `@ssb` | - | `@ssb` | เปิดดูรายการไอเทมแฟชั่นทั้งหมดที่สามารถสุ่มได้จากกล่อง Premium Surprise Style Box (Common & Rare) |
| `@logout` | `@end` | `@logout` | บันทึกข้อมูลตัวละครและนำทางกลับไปยังหน้าจอเลือกตัวละคร (Title Screen) |
| `@joinevent` | `@event` | `@joinevent` | เข้าร่วมกิจกรรมสาธารณะ (In-Game Public Event) ที่เซิร์ฟเวอร์กำลังเปิดรับสมัครอยู่ในขณะนั้น |

---

## ⚔️ หมวดที่ 2: สเตตัส เลเวล และสายอาชีพ (Character Stats, Levels & Jobs)
> **สัญลักษณ์คำสั่ง:** `!` หรือ `#`

| คำสั่ง | ชื่ออื่น | สิทธิ์ | รูปแบบคำสั่ง (Syntax) | คำอธิบายและพารามิเตอร์ |
| :--- | :--- | :---: | :--- | :--- |
| `!level` | `!setlevel`<br>`!lvl`<br>`!lv` | `GameMaster` | `!level <level>` | กำหนดระดับเลเวลของตัวละครโดยตรง (เช่น `!level 275`) |
| `!leveluntil` | `!levelupuntil` | `GameMaster` | `!leveluntil <level>` | เลเวลอัปตัวละครทีละขั้นไปจนถึงเลเวลที่ระบุ (เพื่อให้ได้รับแต้ม AP/SP และรางวัลตามขั้นปกติ) |
| `!job` | `!setjob` | `GameMaster` | `!job <job_id>` | เปลี่ยนอาชีพของตัวละครตามรหัส Job ID (เช่น `!job 112` เป็น Hero, `!job 2412` เป็น Phantom) |
| `!jobV` | - | `Admin` | `!jobV` | เปลี่ยนเป็นคลาส 5 (5th Job) อัตโนมัติ โดยสำเร็จเควสต์ V-Matrix (เควสต์ 1465) ทันที |
| `!jobVI` | - | `Admin` | `!jobVI` | เปลี่ยนเป็นคลาส 6 (6th Job) อัตโนมัติ โดยสำเร็จเควสต์ Hexa Matrix (เควสต์ 1488) ทันที |
| `!sp` | `!setsp` | `GameMaster` | `!sp <จำนวน>` | กำหนดแต้ม Skill Points (SP) ของตัวละคร |
| `!ap` | `!setap` | `GameMaster` | `!ap <จำนวน>` | กำหนดแต้ม Ability Points (AP) ของตัวละคร |
| `!str` | `!setstr` | `GameMaster` | `!str <จำนวน>` | กำหนดค่าพลัง STR ของตัวละคร |
| `!dex` | `!setdex` | `GameMaster` | `!dex <จำนวน>` | กำหนดค่าพลัง DEX ของตัวละคร |
| `!int` | `!setint` | `GameMaster` | `!int <จำนวน>` | กำหนดค่าพลัง INT ของตัวละคร |
| `!luk` | `!setluk` | `GameMaster` | `!luk <จำนวน>` | กำหนดค่าพลัง LUK ของตัวละคร |
| `!hp` | `!sethp` | `GameMaster` | `!hp <จำนวน>` | กำหนดค่า Max HP สูงสุดของตัวละคร |
| `!mp` | `!setmp` | `GameMaster` | `!mp <จำนวน>` | กำหนดค่า Max MP สูงสุดของตัวละคร |
| `!curhp` | - | `GameMaster` | `!curhp <จำนวน>` | กำหนดค่า HP ปัจจุบันของตัวละคร |
| `!curmp` | - | `GameMaster` | `!curmp <จำนวน>` | กำหนดค่า MP ปัจจุบันของตัวละคร |
| `!heal` | - | `GameMaster` | `!heal` | ฟื้นฟู HP และ MP ของตัวละครให้เต็มหลอดทันที |
| `!stats` | - | `GameMaster` | `!stats` | แสดงข้อมูลสถิติสเตตัสโดยละเอียด (STR, DEX, INT, LUK, HP, MP, %เลือด) |
| `!sethonor` | `!honor` | `Admin` | `!sethonor <จำนวน>` | เพิ่มแต้ม Honor EXP สำหรับปลดล็อคและสุ่ม Ability (ศักยภาพตัวละคร) |
| `!done` | - | `GameMaster` | `!done` | ปรับตัวละครให้พร้อมรบทันที: เซ็ตเลเวล 235, HP/MP 250,000, ค่า All Stats 1,000 |

---

## 🔮 หมวดที่ 3: สกิล บัฟ และระบบต่อสู้ (Skills, Buffs & Combat)
> **สัญลักษณ์คำสั่ง:** `!` หรือ `#`

| คำสั่ง | ชื่ออื่น | สิทธิ์ | รูปแบบคำสั่ง (Syntax) | คำอธิบายและพารามิเตอร์ |
| :--- | :--- | :---: | :--- | :--- |
| `!getskill` | - | `GameMaster` | `!getskill <skill_id> <cur_lv> <max_lv>` | เสกสกิลให้ตัวละคร เช่น `!getskill 1121008 30 30` (ID สกิล, เลเวลปัจจุบัน, เลเวลสูงสุด) |
| `!maxskills` | - | `GameMaster` | `!maxskills` | อัปเกรดสกิลทั้งหมดของอาชีพปัจจุบันให้เต็มเลเวลสูงสุดทันที |
| `!clearcd` | - | `Admin` | `!clearcd` | ล้างคูลดาวน์ (Cooldown) ของทุกสกิลในตัวละครทันที |
| `!invincible`| - | `GameMaster` | `!invincible` | สลับเปิด/ปิด โหมดอมตะ (Godmode) ตัวละครจะไม่ได้รับความเสียหายใดๆ |
| `!morph` | - | `GameMaster` | `!morph <morph_id>` | แปลงร่างตัวละครตาม Morph ID ที่ระบุ |
| `!mount` | - | `GameMaster` | `!mount <mount_id> <bit_pos>` | สั่งให้ตัวละครขึ้นขี่สัตว์ขี่ตาม Mount ID |
| `!showbuffs` | - | `GameMaster` | `!showbuffs` | แสดงรายชื่อและค่าของบัฟทั้งหมดที่ตัวละครกำลังใช้งานอยู่ |
| `!testbuff` | - | `Admin` | `!testbuff` | ทดสอบการส่งสเตตัสบัฟ (Unk841 / 41141004) ไปยัง Client |
| `!atom` | - | `Admin` | `!atom` | ทดสอบการสร้างและแสดงผลลูกแก้วพลัง Force Atom |
| `!getphantomstolenskills` | - | `GameMaster` | `!getphantomstolenskills` | แสดงรายการสกิลที่ตัวละคร Phantom ขโมยมาเก็บไว้ พร้อมตำแหน่งและเลเวล |
| `!stealskilllist` | - | `GameMaster` | `!stealskilllist` | แสดงรายการสกิลทั้งหมดของสาย Explorer ที่ Phantom สามารถขโมยได้ |
| `!openCustomCore` | - | `Admin` | `!openCustomCore <coreID> <skill1> <skill2> <skill3> <crc>` | สร้างและใส่ Node Core / Custom V-Core พิเศษเข้าตัวละครโดยตรง |
| `!testAction`| - | `GameMaster` | `!testAction <action_id>` | สั่งบังคับให้มอนสเตอร์ทั้งหมดในแผนที่แสดงท่าทาง Action ตามรหัสที่ระบุ |

---

## 🎒 หมวดที่ 4: ไอเทม เงิน และช่องสัมภาระ (Items, Mesos, Cash & Inventory)
> **สัญลักษณ์คำสั่ง:** `!` หรือ `#`

| คำสั่ง | ชื่ออื่น | สิทธิ์ | รูปแบบคำสั่ง (Syntax) | คำอธิบายและพารามิเตอร์ |
| :--- | :--- | :---: | :--- | :--- |
| `!item` | - | `GameMaster` | `!item <item_id> <จำนวน>`<br>`!item <ชื่อไอเทม> [จำนวน]` | เสกไอเทมเข้าตัวละคร รองรับทั้งรหัสตัวเลขและค้นหาตามชื่อ (กรณีใส่ ID ต้องระบุจำนวนด้วย เช่น `!item 2000000 100`) รองรับ Symbol และ Boss Crystal อัตโนมัติ |
| `!exitem` | - | `GameMaster` | `!exitem <item_id> <จำนวนวัน>` | เสกไอเทมประเภทสวมใส่ (Equip) แบบกำหนดระยะเวลาหมดอายุ (วัน) |
| `!proitem` | - | `GameMaster` | `!proitem <id> <all_stat> <atk> <flame>` | เสกไอเทมระดับเทพ ปรับแต่งสเตตัสได้ตามใจ: All Stats (STR/DEX/INT/LUK), Attack/M.Attack, และ Flame Stats เช่น `!proitem 1003797 32767 32767 100` |
| `!mesos` | `!money` | `GameMaster` | `!mesos <จำนวนเงิน>` | เพิ่มเงิน Meso ให้ตัวละคร (ใส่ติดลบเพื่อลดเงินได้) เช่น `!mesos 1000000000` |
| `!nx` | `!setnx` | `GameMaster` | `!nx <จำนวน>` | กำหนดจำนวนเงินพรีเมียม NX Cash ของบัญชี |
| `!givenx` | - | `GameMaster` | `!givenx <ชื่อผู้เล่น> <จำนวน>` | มอบเงิน NX Cash ให้ผู้เล่นคนอื่นที่ออนไลน์อยู่ในเซิร์ฟเวอร์ |
| `!dp` | `!setdp` | `GameMaster` | `!dp <จำนวน>` | กำหนดแต้มบริจาค Donator Points (DP) ให้ตัวละคร |
| `!vp` | `!setvp` | `GameMaster` | `!vp <จำนวน>` | กำหนดแต้มโหวต Vote Points (VP) ให้ตัวละคร |
| `!clearinv` | - | `GameMaster` | `!clearinv <หมวด> <ช่องเริ่ม> <ช่องสิ้นสุด>` | ลบไอเทมในช่องสัมภาระตามช่วงที่กำหนด หมวดที่รองรับ: `equip`, `use`, `etc`, `setup`, `cash` เช่น `!clearinv equip 0 128` |
| `!showinvinfo` | `!invinfo` | `GameMaster` | `!showinvinfo` | ตรวจสอบสถานะการใช้งานและจำนวนช่องเก็บของในแต่ละหมวด |
| `!warriorequips` | - | `GameMaster` | `!warriorequips` | เสกชุดเซ็ตอาวุธและอุปกรณ์สวมใส่เริ่มต้นสำหรับสายอาชีพ **Warrior** |
| `!mageequips` | - | `GameMaster` | `!mageequips` | เสกชุดเซ็ตอาวุธและอุปกรณ์สวมใส่เริ่มต้นสำหรับสายอาชีพ **Mage** |
| `!archerequips`| - | `GameMaster` | `!archerequips` | เสกชุดเซ็ตอาวุธและอุปกรณ์สวมใส่เริ่มต้นสำหรับสายอาชีพ **Archer** |
| `!thiefequips` | - | `GameMaster` | `!thiefequips` | เสกชุดเซ็ตอาวุธและอุปกรณ์สวมใส่เริ่มต้นสำหรับสายอาชีพ **Thief** |
| `!pirateequips`| - | `GameMaster` | `!pirateequips` | เสกชุดเซ็ตอาวุธและอุปกรณ์สวมใส่เริ่มต้นสำหรับสายอาชีพ **Pirate** |
| `!shop` | - | `GameMaster` | `!shop` | เปิดหน้าร้านค้า NPC ร้านค้าทดสอบ (Shop ID: 1011100) ได้จากทุกที่ |

---

## 👾 หมวดที่ 5: จัดการมอนสเตอร์ บอส และ NPC (Monsters, Bosses & NPCs)
> **สัญลักษณ์คำสั่ง:** `!` หรือ `#`

| คำสั่ง | ชื่ออื่น | สิทธิ์ | รูปแบบคำสั่ง (Syntax) | คำอธิบายและพารามิเตอร์ |
| :--- | :--- | :---: | :--- | :--- |
| `!spawn` | - | `GameMaster` | `!spawn <mob_id> [จำนวน] [hp]` | เสกมอนสเตอร์ตามตำแหน่งที่ยืน กำหนดจำนวนและปรับเลือดได้ เช่น `!spawn 8880300 1 5000000` |
| `!killmobs` | - | `GameMaster` | `!killmobs` | กำจัดมอนสเตอร์ทั้งหมดที่อยู่ในแผนที่ปัจจุบันทันที (เคลียร์แมพ) |
| `!mobinfo` | - | `GameMaster` | `!mobinfo` | ดูข้อมูลของมอนสเตอร์ตัวที่อยู่ใกล้ที่สุด: Object ID, Template ID, HP/MP, ทิศทางหัน, Controller |
| `!mobstat` | - | `GameMaster` | `!mobstat` | ทดสอบใส่สถานะผิดปกติ (Stun) ให้กับมอนสเตอร์ในแผนที่ |
| `!testmobstat`| - | `Admin` | `!testmobstat` | ทดสอบการส่งค่า Temporary Stat ของมอนสเตอร์ในแผนที่ |
| `!forcechase` | - | `GameMaster` | `!forcechase` | บังคับให้มอนสเตอร์วิ่งไล่ตามตัวละคร |
| `!setcontroller`| - | `GameMaster` | `!setcontroller <ชื่อตัวละคร>` | กำหนดผู้เล่นที่เป็น Controller ในการควบคุมพฤติกรรมมอนสเตอร์ |
| `!mobcontroller`| - | `GameMaster` | `!mobcontroller <ชื่อตัวละคร>` | ตรวจสอบมอนสเตอร์ทั้งหมดที่ควบคุมโดยตัวละครที่ระบุ |
| `!npc` | `!spawnnpc` | `GameMaster` | `!npc <npc_id>` | เสก NPC วางลงบนแผนที่ ณ พิกัดที่ยืนอยู่ (หายไปเมื่อรีโหลดแมพ) เช่น `!npc 9010000` |
| `!pnpc` | - | `GameMaster` | `!pnpc <npc_id>` | เสก Permanent NPC วางในแผนที่และบันทึกลงฐานข้อมูลแบบถาวร |
| `!testdrop` | - | `GameMaster` | `!testdrop <mob_id> [จำนวนรอบ]` | คำนวณจำลองการสุ่มดรอปไอเทมของมอนสเตอร์ตาม Drop Rate ของเซิร์ฟเวอร์ |
| `!hilla` | - | `Admin` | `!hilla` | ทดสอบเสกบอส **Verus Hilla** พร้อมนับเวลา 30 นาที, กำหนด Death Count 5 ครั้ง และเสกเทียนไข |
| `!will` | - | `Admin` | `!will` | ทดสอบเสกบอส **Will** ตาม Phase แผนที่ปัจจุบัน พร้อมระบบ Moonlight Gauge และใยแมงมุม |
| `!die` | - | `Admin` | `!die [ชื่อตัวละคร]` | สั่งลด HP ผู้เล่นจนเหลือ 0 ทันที เพื่อทดสอบระบบตายและหน้าต่างชุบชีวิต |

---

## 🗺️ หมวดที่ 6: การวาร์ป แผนที่ และประตูมิติ (Teleportation, Maps & Portals)
> **สัญลักษณ์คำสั่ง:** `!` หรือ `#`

| คำสั่ง | ชื่ออื่น | สิทธิ์ | รูปแบบคำสั่ง (Syntax) | คำอธิบายและพารามิเตอร์ |
| :--- | :--- | :---: | :--- | :--- |
| `!goto` | - | `GameMaster` | `!goto <ชื่อสถานที่>` | วาร์ปไปยังเมืองสำคัญ เช่น `!goto henestys`, `!goto leafre`, `!goto ardent`, `!goto ellinia` (พิมพ์ `!goto` เพื่อดูรายชื่อเมืองทั้งหมด) |
| `!setmap` | - | `GameMaster` | `!setmap <map_id> <portal_id>` | วาร์ปไปยัง Map ID และจุด Portal ที่กำหนด เช่น `!setmap 100000000 0` |
| `!warpto` | - | `Admin` | `!warpto <ชื่อตัวละคร>` | วาร์ปตัวเราไปหาผู้เล่นเป้าหมาย (หากอยู่คนละ Channel ระบบจะเปลี่ยนแชนแนลให้อัตโนมัติ) |
| `!warpHere` | - | `Admin` | `!warpHere <ชื่อตัวละคร>` | ดึงตัวผู้เล่นเป้าหมายมาหาเรา ณ ตำแหน่งและแผนที่ปัจจุบัน |
| `!savemap` | - | `GameMaster` | `!savemap <save/go> <ชื่อย่อ>`<br>`!savemap list` | ระบบจุดวาร์ปส่วนตัว: บันทึกแมพปัจจุบัน (`!savemap save boss`), วาร์ปไปแมพที่เซฟ (`!savemap go boss`), หรือดูรายการ (`!savemap list`) |
| `!setportal` | - | `GameMaster` | `!setportal <portal_id>` | วาร์ปตัวละครไปยังจุดพอร์ทัลตาม ID ภายในแผนที่ปัจจุบัน |
| `!np` | `!nearestportal` | `GameMaster` | `!np` | ตรวจสอบข้อมูล Portal ที่อยู่ใกล้ตัวที่สุด (ชื่อพอร์ทัล, รหัส Portal ID, พิกัด X/Y) |
| `!fp` | `!findportal` | `GameMaster` | `!fp <ชื่อหรือรหัสพอร์ทัล>` | ค้นหาตำแหน่งพอร์ทัลภายในแผนที่ปัจจุบัน |
| `!hypertp` | - | `GameMaster` | `!hypertp` | เสกไอเทม **Hyper Teleport Rock** (วาร์ปฟรีทุกแมพ) เข้ากระเป๋า Cash ทันที |

---

## 📜 หมวดที่ 7: ระบบเควสต์และสคริปต์ (Quests & Scripts)
> **สัญลักษณ์คำสั่ง:** `!` หรือ `#`

| คำสั่ง | ชื่ออื่น | สิทธิ์ | รูปแบบคำสั่ง (Syntax) | คำอธิบายและพารามิเตอร์ |
| :--- | :--- | :---: | :--- | :--- |
| `!startquest` | - | `GameMaster` | `!startquest <quest_id>` | บังคับเริ่มเควสต์ตามรหัส Quest ID ที่ระบุทันที |
| `!completequest` | - | `GameMaster` | `!completequest <quest_id>` | สั่งให้เควสต์ตาม Quest ID นั้นเสร็จสิ้นทันที (Completed) |
| `!removequest` | - | `GameMaster` | `!removequest <quest_id>` | ยกเลิก/ลบสถานะเควสต์ที่กำลังดำเนินอยู่ออกจากตัวละคร |
| `!deleteQuest` | - | `GameMaster` | `!deleteQuest <quest_id>` | ลบข้อมูลเควสต์ออกจากตัวละครโดยสมบูรณ์ |
| `!sendQRvalue`| `!qr` | `Admin` | `!qr <quest_id> <qr_value>` | ส่งและบันทึกค่า Quest Record (QR String) ของเควสต์นั้นๆ |
| `!script` | - | `GameMaster` | `!script <ประเภท> <ชื่อไฟล์>` | ทดสอบรันสคริปต์ Python ประเภทต่างๆ เช่น `Portal`, `Npc`, `Field`, `Quest`, `Reactor` เช่น `!script npc 9010000` |

---

## 🛡️ หมวดที่ 8: การจัดการผู้เล่นและการลงโทษ (Moderation, Ban & Anti-Cheat)
> **สัญลักษณ์คำสั่ง:** `!` หรือ `#`

| คำสั่ง | ชื่ออื่น | สิทธิ์ | รูปแบบคำสั่ง (Syntax) | คำอธิบายและพารามิเตอร์ |
| :--- | :--- | :---: | :--- | :--- |
| `!notice` | - | `GameMaster` | `!notice <ข้อความ>` | ประกาศข้อความระบบ (Notice) สีฟ้าไปยังผู้เล่นทุกคนในเซิร์ฟเวอร์ และส่งแจ้งเตือนเข้า Discord |
| `!ban` | - | `GameMaster` | `!ban <ชื่อ> <จำนวน> <min/hour/day/year> <เหตุผล>` | แบนบัญชีผู้เล่นตามระยะเวลาและเหตุผลที่กำหนด เช่น `!ban Hacker 7 day ใช้งานโปรแกรมช่วยเล่น` |
| `!dc` | - | `Admin` | `!dc <ชื่อตัวละคร>` | ตัดการเชื่อมต่อ (Disconnect / เตะ) ผู้เล่นออกจากเซิร์ฟเวอร์ทันที |
| `!ld` | `!liedetector` | `GameMaster` | `!ld <ชื่อตัวละคร หรือ @me>` | ยิงระบบตรวจจับบอท (Lie Detector Captcha) ใส่ผู้เล่นเป้าหมายเพื่อตรวจสอบการเล่นอัตโนมัติ |
| `!checkid` | `!getid`<br>`!charid` | `GameMaster` | `!checkid` | ตรวจสอบรหัส Character ID และ Account ID ของตัวละครตนเอง |
| `!checkProcess` | - | `GameMaster` | `!checkProcess <ชื่อตัวละคร>` | ส่งคำสั่งตรวจสอบรายชื่อโปรเซสของ Client เครื่องผู้เล่นเพื่อตรวจหาโปรแกรมโกง |

---

## ⚙️ หมวดที่ 9: การควบคุมเซิร์ฟเวอร์ ระบบอีเวนต์ และดีบั๊ก (Server Administration, Events & Debug)
> **สัญลักษณ์คำสั่ง:** `!` หรือ `#`

| คำสั่ง | ชื่ออื่น | สิทธิ์ | รูปแบบคำสั่ง (Syntax) | คำอธิบายและพารามิเตอร์ |
| :--- | :--- | :---: | :--- | :--- |
| `!shutdown` | - | `Admin` | `!shutdown <นาที หรือ NOW>` | แจ้งเตือนและนับถอยหลังปิดเซิร์ฟเวอร์อย่างปลอดภัย พร้อมเซฟข้อมูลผู้เล่น (เช่น `!shutdown 5` หรือ `!shutdown NOW`) |
| `!serverInfo` | `!online` | `GameMaster` | `!serverInfo` | เปิดหน้าต่างข้อมูลเซิร์ฟเวอร์ แสดงจำนวนผู้เล่นออนไลน์, อัตราคูณ EXP/Drop/Meso |
| `!toggleLoginMode` | - | `GameMaster` | `!toggleLoginMode` | สลับโหมดจำกัดการล็อกอิน (Admin Login Only กับ Normal Login) |
| `!toggleEvent`| - | `Admin` | `!toggleEvent <ชื่ออีเวนต์> <Enable/Disable>` | เปิด/ปิดอีเวนต์พิเศษของเซิร์ฟเวอร์: `FeverTime`, `MiracleTime`, `ExpRate`, `DropRate` เช่น `!toggleEvent FeverTime Enable` |
| `!forceevent` | - | `GameMaster` | `!forceevent <event_id>` | บังคับเปิดอีเวนต์กิจกรรมสาธารณะของเซิร์ฟเวอร์ตาม ID ทันที |
| `!lookup` | `!find` | `GameMaster` | `!lookup <ประเภท> <ID หรือ ชื่อ>` | ค้นหาข้อมูลรหัสในเกม ประเภทที่รองรับ: `item`, `skill`, `mob`, `npc`, `map` เช่น `!lookup item Absolab`, `!lookup mob Zakum` |
| `!lookupreactor` | `!reactors` | `GameMaster` | `!lookupreactor` | แสดงรายการวัตถุ Reactor ทั้งหมดในแผนที่ปัจจุบัน |
| `!rune` | - | `Admin` | `!rune <ประเภท>` | เสกหินรูน (Rune Stone) ตามประเภทที่กำหนดลงในแผนที่เพื่อทดสอบบัฟ |
| `!openUI` | - | `Admin` | `!openUI <ui_id>` | สั่งเปิดหน้าต่าง UI ของเกมตามรหัส ID |
| `!closeUI` | - | `Admin` | `!closeUI <ui_id>` | สั่งปิดหน้าต่าง UI ของเกมตามรหัส ID |
| `!packet` | - | `Admin` | `!packet <header_op> <hex_data>` | ส่งแพ็กเก็ตจำลอง (Hex Packet) ตรงไปยัง Client เพื่อทดสอบระบบ เช่น `!packet 123 00 01 02` |
| `!tohex` | - | `GameMaster` | `!tohex <ตัวเลข>` | แปลงค่าตัวเลขจำนวนเต็มเป็นรูปแบบรหัสฐาน 16 (Hexadecimal Byte Array) |
| `!fromhex` | - | `GameMaster` | `!fromhex <hex_string>` | แปลงรหัสฐาน 16 (Hex String) กลับเป็นตัวเลขฐาน 10 |
| `!reloadcs` | - | `Admin` | `!reloadcs` | โหลดข้อมูลสินค้า Cash Shop ใหม่จากฐานข้อมูลทันทีโดยไม่ต้องรีสตาร์ทเซิร์ฟเวอร์ |
| `!resetData` | - | `Admin` | `!resetData` | ล้างข้อมูลแผนที่และโหลด FieldData ใหม่ทั้งหมด |
| `!debug` | - | `Admin` | `!debug` | สลับเปิด/ปิดโหมด Debug Mode ของระบบเซิร์ฟเวอร์ |
| `!roll` | - | `Admin` | `!roll` | เล่นมินิเกมตู้สล็อต One-Armed Bandit แสดงผล Effect |
| `!bot` | - | `Admin` | `!bot <charID> <itemID>` | สร้าง Phantom Bot จำลองตัวละครมานั่งเก้าอี้ในแผนที่ |
| `!mo` | - | `Admin` | `!mo <type> <stack> <time> <stack2>` | ส่งแพ็กเก็ตทดสอบ Extra System Result |
| `!info` | - | `Admin` | `!info` | แสดงข้อมูลพิกัดตัวละคร (MapID, X, Y) และค่า BaseStats ทั้งหมด |
| `!test` | - | `Admin` | `!test` | ส่งแพ็กเก็ตทดสอบรหัส 1568 ไปยัง Client |
| `!testCommand`| - | `GameMaster` | `!testCommand <option_id>` | ดึงและพิมพ์ค่าสเตตัสของ Item Option แต่ละเลเวลลงคอนโซลเซิร์ฟเวอร์ |
| `!testInstance`| - | `GameMaster` | `!testInstance` | ตรวจสอบว่าตัวละครกำลังอยู่ใน Instance แผนที่ส่วนตัวหรือไม่ |

---

## 📊 ตารางสรุปคำสั่งทั้งหมดเรียงตามตัวอักษร (Quick Reference Table)

| ลำดับ | คำสั่งหลัก | คำสั่งทางเลือก (Aliases) | สัญลักษณ์ | ระดับสิทธิ์ | คำอธิบายโดยย่อ |
| :---: | :--- | :--- | :---: | :---: | :--- |
| 1 | `afk` | - | `@` | Player | เริ่มระบบบอทฟาร์มมอนสเตอร์อัตโนมัติ (Idle Hunting) |
| 2 | `ap` | `setap` | `!` | GameMaster | กำหนดแต้ม Ability Points (AP) |
| 3 | `archerequips` | - | `!` | GameMaster | รับชุดและอาวุธเซ็ตสำหรับสายอาชีพ Archer |
| 4 | `atom` | - | `!` | Admin | ทดสอบการสร้างลูกแก้ว Force Atom |
| 5 | `ban` | - | `!` | GameMaster | แบนบัญชีผู้เล่นตามระยะเวลาและเหตุผล |
| 6 | `boss` | `checkboss` | `@` | Player | เช็คคูลดาวน์และรอบการลงบอสทั้งหมดแบบนับถอยหลัง |
| 7 | `bot` | - | `!` | Admin | สร้างตัวละครจำลอง Phantom Bot นั่งเก้าอี้ |
| 8 | `check` | - | `@` | Player | เช็คสเตตัสตนเอง หรือส่องดูข้อมูลตัวละครอื่นในแมพ |
| 9 | `checkid` | `getid`, `charid` | `!` | GameMaster | ดู Character ID และ Account ID ของตนเอง |
| 10 | `checkmob` | `checkmonster` | `@` | Player | สแกนข้อมูลมอนสเตอร์รอบตัว (HP, EXP, ของดรอป) |
| 11 | `checkProcess` | - | `!` | GameMaster | สแกนโปรเซสในเครื่องผู้เล่นเพื่อตรวจจับโปรแกรมโกง |
| 12 | `clearcd` | - | `!` | Admin | รีเซ็ตคูลดาวน์ทุกสกิลของตัวละครทันที |
| 13 | `clearinv` | - | `!` | GameMaster | ล้างช่องสัมภาระตามหมวดและช่วงช่องที่ระบุ |
| 14 | `closeUI` | - | `!` | Admin | บังคับปิดหน้าต่าง UI ในเกมตามรหัส ID |
| 15 | `completequest` | - | `!` | GameMaster | บังคับทำเควสต์ให้สำเร็จทันที |
| 16 | `curhp` | - | `!` | GameMaster | ปรับค่า HP ปัจจุบันของตัวละคร |
| 17 | `curmp` | - | `!` | GameMaster | ปรับค่า MP ปัจจุบันของตัวละคร |
| 18 | `dc` | - | `!` | Admin | เตะผู้เล่นเป้าหมายออกจากเซิร์ฟเวอร์ |
| 19 | `debug` | - | `!` | Admin | สลับเปิด/ปิด Debug Mode ของเซิร์ฟเวอร์ |
| 20 | `deleteQuest` | - | `!` | GameMaster | ลบข้อมูลเควสต์ออกจากตัวละคร |
| 21 | `dex` | `setdex` | `!` | GameMaster | กำหนดค่าพลัง DEX |
| 22 | `die` | - | `!` | Admin | สั่งให้ตัวละครเลือดเหลือ 0 (ตายทันที) |
| 23 | `dispose` | - | `@` | Player | แก้บั๊กตัวละครติดค้าง, ปลดล็อค UI, ล้างสคริปต์ |
| 24 | `done` | - | `!` | GameMaster | เซ็ตเลเวล 235 เลือด 250k สเตตัส 1k พร้อมรบ |
| 25 | `dp` | `setdp` | `!` | GameMaster | กำหนดแต้ม Donator Points (DP) |
| 26 | `exitem` | - | `!` | GameMaster | เสกอุปกรณ์สวมใส่แบบมีระยะเวลากำหนดวันหมดอายุ |
| 27 | `forcechase` | - | `!` | GameMaster | สั่งมอนสเตอร์ให้วิ่งไล่ตามตัวละคร |
| 28 | `forceevent` | - | `!` | GameMaster | บังคับเปิดอีเวนต์กิจกรรมเซิร์ฟเวอร์ตาม ID |
| 29 | `fp` | `findportal` | `!` | GameMaster | ค้นหาพอร์ทัลในแผนที่ปัจจุบัน |
| 30 | `fromhex` | - | `!` | GameMaster | แปลงเลขฐาน 16 เป็นฐาน 10 |
| 31 | `getphantomstolenskills` | - | `!` | GameMaster | ดูสกิลที่ Phantom ขโมยมาทั้งหมด |
| 32 | `getskill` | - | `!` | GameMaster | เสกสกิลพร้อมกำหนดเลเวลและมาสเตอร์เลเวล |
| 33 | `givenx` | - | `!` | GameMaster | มอบเงิน NX Cash ให้ผู้เล่นคนอื่น |
| 34 | `goto` | - | `!` | GameMaster | วาร์ปไปยังเมืองสำคัญต่างๆ ในเกม |
| 35 | `heal` | - | `!` | GameMaster | ฟื้นฟู HP และ MP เต็ม 100% |
| 36 | `help` | - | `@` | Player | แสดงคำสั่งผู้เล่น และรีเฟรช V-Matrix |
| 37 | `hilla` | - | `!` | Admin | ทดสอบระบบบอส Verus Hilla พร้อมเทียนและ Death Count |
| 38 | `home` | - | `@` | Player | วาร์ปกลับเมือง Henesys ทันที |
| 39 | `hp` | `sethp` | `!` | GameMaster | กำหนดค่า Max HP สูงสุด |
| 40 | `hypertp` | - | `!` | GameMaster | รับไอเทม Hyper Teleport Rock วาร์ปฟรี |
| 41 | `info` | - | `!` | Admin | ตรวจสอบพิกัดและ BaseStats ทั้งหมดของตัวละคร |
| 42 | `int` | `setint` | `!` | GameMaster | กำหนดค่าพลัง INT |
| 43 | `invincible` | - | `!` | GameMaster | สลับเปิด/ปิดโหมดอมตะ (Godmode) ไม่โดนดาเมจ |
| 44 | `item` | - | `!` | GameMaster | เสกไอเทมตามรหัส ID หรือค้นหาตามชื่อไอเทม |
| 45 | `job` | `setjob` | `!` | GameMaster | เปลี่ยนสายอาชีพตาม Job ID |
| 46 | `jobV` | - | `!` | Admin | เปลี่ยนเป็น 5th Job อัตโนมัติ (รับ V-Matrix) |
| 47 | `jobVI` | - | `!` | Admin | เปลี่ยนเป็น 6th Job อัตโนมัติ (รับ Hexa Matrix) |
| 48 | `joinevent` | `event` | `@` | Player | เข้าร่วมกิจกรรมสาธารณะที่กำลังเปิดรับสมัคร |
| 49 | `killmobs` | - | `!` | GameMaster | กำจัดมอนสเตอร์ทั้งหมดในแผนที่ทันที |
| 50 | `ld` | `liedetector` | `!` | GameMaster | ส่งหน้าต่าง Lie Detector จับบอทใส่ผู้เล่น |
| 51 | `level` | `setlevel`, `lvl`, `lv` | `!` | GameMaster | กำหนดเลเวลของตัวละครโดยตรง |
| 52 | `leveluntil` | `levelupuntil` | `!` | GameMaster | เลเวลอัปทีละขั้นไปจนถึงเลเวลเป้าหมาย |
| 53 | `logout` | `end` | `@` | Player | บันทึกตัวละครและกลับหน้าเลือกตัวละคร |
| 54 | `luk` | `setluk` | `!` | GameMaster | กำหนดค่าพลัง LUK |
| 55 | `lookup` | `find` | `!` | GameMaster | ค้นหารหัส Item, Skill, Mob, NPC, Map |
| 56 | `lookupreactor` | `reactors` | `!` | GameMaster | แสดงรายการ Reactor ในแผนที่ |
| 57 | `mageequips` | - | `!` | GameMaster | รับชุดและอาวุธเซ็ตสำหรับสายอาชีพ Mage |
| 58 | `maxskills` | - | `!` | GameMaster | อัปเกรดสกิลทั้งหมดของอาชีพปัจจุบันจนเต็ม |
| 59 | `mesos` | `money` | `!` | GameMaster | เพิ่มหรือลบเงิน Meso ของตัวละคร |
| 60 | `mo` | - | `!` | Admin | ทดสอบแพ็กเก็ต Extra System Result |
| 61 | `mobcontroller` | - | `!` | GameMaster | ดูมอนสเตอร์ที่ตัวละครนั้นควบคุมอยู่ |
| 62 | `mobinfo` | - | `!` | GameMaster | ดูข้อมูลมอนสเตอร์ตัวที่อยู่ใกล้ที่สุด |
| 63 | `mobstat` | - | `!` | GameMaster | ทดสอบใส่ค่าสถานะผิดปกติให้มอนสเตอร์ |
| 64 | `morph` | - | `!` | GameMaster | แปลงร่างตัวละครตาม Morph ID |
| 65 | `mount` | - | `!` | GameMaster | สั่งขี่สัตว์ขี่ตาม Mount ID |
| 66 | `mp` | `setmp` | `!` | GameMaster | กำหนดค่า Max MP สูงสุด |
| 67 | `notice` | - | `!` | GameMaster | ประกาศข้อความระบบไปยังทุกคนและส่งเข้า Discord |
| 68 | `np` | `nearestportal` | `!` | GameMaster | ดูข้อมูล Portal ที่ใกล้ตัวที่สุดในแผนที่ |
| 69 | `npc` | `spawnnpc` | `!` | GameMaster | เสก NPC วางลงบนพิกัดที่ยืนอยู่ |
| 70 | `nx` | `setnx` | `!` | GameMaster | กำหนดจำนวนเงิน NX Cash ของบัญชี |
| 71 | `openCustomCore` | - | `!` | Admin | สร้างและติดตั้ง Custom Node Matrix Core |
| 72 | `openUI` | - | `!` | Admin | บังคับเปิดหน้าต่าง UI ของเกมตาม ID |
| 73 | `packet` | - | `!` | Admin | ส่งแพ็กเก็ต Hex จำลองไปยัง Client |
| 74 | `pirateequips` | - | `!` | GameMaster | รับชุดและอาวุธเซ็ตสำหรับสายอาชีพ Pirate |
| 75 | `pnpc` | - | `!` | GameMaster | เสก Permanent NPC บันทึกลงฐานข้อมูลถาวร |
| 76 | `proitem` | - | `!` | GameMaster | เสกไอเทมปรับแต่งสเตตัสระดับเทพ (All Stat / Atk / Flame) |
| 77 | `reloadcs` | - | `!` | Admin | โหลดข้อมูล Cash Shop ใหม่จากฐานข้อมูล |
| 78 | `removequest` | - | `!` | GameMaster | ยกเลิกเควสต์ที่กำลังดำเนินอยู่ออกจากตัวละคร |
| 79 | `resetData` | - | `!` | Admin | เคลียร์และรีเซ็ตโหลดข้อมูล FieldData ใหม่ |
| 80 | `roll` | - | `!` | Admin | หมุนสล็อตมินิเกม One-Armed Bandit |
| 81 | `rune` | - | `!` | Admin | เสกหินรูน (Rune Stone) ลงในแผนที่ |
| 82 | `savemap` | - | `!` | GameMaster | บันทึกพิกัดแมพทางลัด หรือวาร์ปไปยังแมพที่เซฟไว้ |
| 83 | `script` | - | `!` | GameMaster | ทดสอบรันสคริปต์ Python ในเกม |
| 84 | `sell` | `quicksell` | `@` | Player | เปิดหน้าระบบขายไอเทมด่วนในช่องเก็บของ |
| 85 | `sendQRvalue` | `qr` | `!` | Admin | บันทึกค่า Quest Record (QR String) ของเควสต์ |
| 86 | `serverInfo` | `online` | `!` | GameMaster | ดูข้อมูลเซิร์ฟเวอร์และจำนวนผู้เล่นออนไลน์ |
| 87 | `setcontroller` | - | `!` | GameMaster | กำหนด Controller ผู้เล่นที่ควบคุมมอนสเตอร์ |
| 88 | `sethonor` | `honor` | `!` | Admin | เพิ่มแต้ม Honor EXP สำหรับศักยภาพตัวละคร |
| 89 | `setmap` | - | `!` | GameMaster | วาร์ปไปยัง Map ID และ Portal ID ที่ระบุ |
| 90 | `setportal` | - | `!` | GameMaster | วาร์ปไปยัง Portal ID ภายในแผนที่ปัจจุบัน |
| 91 | `shop` | - | `!` | GameMaster | เปิดร้านค้าทดสอบ (Shop ID 1011100) ได้จากทุกที่ |
| 92 | `showbuffs` | - | `!` | GameMaster | แสดงรายชื่อบัฟทั้งหมดที่ตัวละครได้รับอยู่ |
| 93 | `showinvinfo` | `invinfo` | `!` | GameMaster | แสดงข้อมูลและจำนวนช่องสัมภาระแต่ละหมวด |
| 94 | `shutdown` | - | `!` | Admin | ปิดเซิร์ฟเวอร์อย่างปลอดภัยพร้อมนับถอยหลัง |
| 95 | `sp` | `setsp` | `!` | GameMaster | กำหนดแต้ม Skill Points (SP) |
| 96 | `spawn` | - | `!` | GameMaster | เสกมอนสเตอร์ตาม ID กำหนดจำนวนและเลือดได้ |
| 97 | `ssb` | - | `@` | Player | ส่องดูรายการไอเทมในกล่อง Surprise Style Box |
| 98 | `startquest` | - | `!` | GameMaster | บังคับเริ่มเควสต์ตาม Quest ID ทันที |
| 99 | `stats` | - | `!` | GameMaster | ดูข้อมูลสถิติสเตตัสตัวละครโดยละเอียด |
| 100 | `stealskilllist` | - | `!` | GameMaster | เปิดหน้าต่างรายการสกิลที่ Phantom ขโมยได้ |
| 101 | `str` | `setstr` | `!` | GameMaster | กำหนดค่าพลัง STR |
| 102 | `test` | - | `!` | Admin | ส่งแพ็กเก็ตทดสอบรหัส 1568 ไปยัง Client |
| 103 | `testAction` | - | `!` | GameMaster | บังคับมอนสเตอร์ในแมพแสดงท่าทางตาม Action ID |
| 104 | `testbuff` | - | `!` | Admin | ทดสอบส่งค่าบัฟ Temporary Stat ให้ตัวละคร |
| 105 | `testCommand` | - | `!` | GameMaster | ตรวจสอบข้อมูลสเตตัส Item Option ลงคอนโซล |
| 106 | `testdrop` | - | `!` | GameMaster | จำลองการสุ่มดรอปไอเทมของมอนสเตอร์ |
| 107 | `testInstance` | - | `!` | GameMaster | ตรวจสอบว่าตัวละครอยู่ใน Instance หรือไม่ |
| 108 | `testmobstat` | - | `!` | Admin | ทดสอบระบบสเตตัสของมอนสเตอร์ในแผนที่ |
| 109 | `thiefequips` | - | `!` | GameMaster | รับชุดและอาวุธเซ็ตสำหรับสายอาชีพ Thief |
| 110 | `toggleEvent` | - | `!` | Admin | เปิด/ปิดอีเวนต์ FeverTime, MiracleTime, Exp, Drop |
| 111 | `toggleLoginMode` | - | `!` | GameMaster | สลับโหมดจำกัดการล็อกอิน (Admin Only / ปกติ) |
| 112 | `tohex` | - | `!` | GameMaster | แปลงตัวเลขฐาน 10 เป็นเลขฐาน 16 (Hex) |
| 113 | `vp` | `setvp` | `!` | GameMaster | กำหนดแต้มโหวต Vote Points (VP) |
| 114 | `warpHere` | - | `!` | Admin | ดึงตัวผู้เล่นคนอื่นมาหาเราในแผนที่ปัจจุบัน |
| 115 | `warriorequips` | - | `!` | GameMaster | รับชุดและอาวุธเซ็ตสำหรับสายอาชีพ Warrior |
| 116 | `warpto` | - | `!` | Admin | วาร์ปตัวเราไปหาผู้เล่นอื่นที่ออนไลน์อยู่ |
| 117 | `will` | - | `!` | Admin | ทดสอบระบบบอส Will (Moonlight Gauge & ใยแมงมุม) |

---

### 💡 เคล็ดลับเพิ่มเติมสำหรับผู้ดูแลเซิร์ฟเวอร์ (Admin / GM Tips)
1. **การค้นหา ID:** สามารถใช้คำสั่ง `!lookup item <ชื่อ>`, `!lookup mob <ชื่อ>`, `!lookup map <ชื่อ>` เพื่อหารหัสไอเทม มอนสเตอร์ หรือแผนที่ได้โดยตรงในเกมโดยไม่ต้องเปิดดูไฟล์ Data
2. **การวาร์ปข้ามแชนแนล:** คำสั่ง `!warpto` และ `!warpHere` รองรับการย้ายแชนแนลให้อัตโนมัติหากผู้เล่นไม่ได้อยู่ในแชนแนลเดียวกัน
3. **การเสกไอเทมด้วย ID:** ในการใช้คำสั่ง `!item <id> <quant>` ต้องระบุจำนวนไอเทมด้วยเสมอ เช่น `!item 2000000 100` เพื่อป้องกันข้อผิดพลาด
4. **การปิดเซิร์ฟเวอร์อย่างปลอดภัย:** ควรใช้คำสั่ง `!shutdown <นาที>` เช่น `!shutdown 5` เพื่อให้ระบบบันทึกข้อมูลตัวละครของผู้เล่นทุกคนและส่งข้อความแจ้งเตือนอย่างเป็นระเบียบ
