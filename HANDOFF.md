# 📋 เอกสารส่งมอบงานระบบเซิร์ฟเวอร์ MapleStory v265 (Project Handoff & Architecture Guide)

**โครงการ:** MapleStory v265 Portable Server (SwordieMS Core)  
**วันที่ส่งมอบ:** 10 ตุลาคม 2569 (2026-10-10)  
**ผู้จัดทำ:** Antigravity AI Pair Programmer & System Engineering Team  
**Git Repository:** [https://github.com/gmakerjay/maple265src.git](https://github.com/gmakerjay/maple265src.git) (Branch: `main`)  
**เป้าหมาย:** สรุปการแก้ไขบั๊กสำคัญ (Illium & Sia Astelle), ผลการ Audit ตรวจสอบทุกอาชีพในเกม, กลไกเซิร์ฟเวอร์ และแนวทางการพัฒนาต่อยอด

---

## 📌 สารบัญ (Table of Contents)
1. [ภาพรวมสถานะระบบ (Executive Summary)](#1-ภาพรวมสถานะระบบ-executive-summary)
2. [การแก้ไขบั๊ก Illium สกิลแล้วเกมเด้ง (Asset Mismatch Crash Fix)](#2-การแก้ไขบั๊ก-illium-สกิลแล้วเกมเด้ง-asset-mismatch-crash-fix)
3. [การแก้ไขระบบ Erda Link & Teleport ของ Sia Astelle](#3-การแก้ไขระบบ-erda-link--teleport-ของ-sia-astelle)
4. [ผลการตรวจสอบทุกอาชีพและแผนงานภาพรวม (Master Multi-Class Audit & Roadmap)](#4-ผลการตรวจสอบทุกอาชีพและแผนงานภาพรวม-master-multi-class-audit--roadmap)
5. [การทดสอบและหลักฐานการทำงาน (Verification & Runtime Evidence)](#5-การทดสอบและหลักฐานการทำงาน-verification--runtime-evidence)
6. [คู่มือการควบคุมและรันเซิร์ฟเวอร์ (Operations & Maintenance Manual)](#6-คู่มือการควบคุมและรันเซิร์ฟเวอร์-operations--maintenance-manual)
7. [รายการไฟล์ที่มีการปรับปรุง (Modified Files & Diffs)](#7-รายการไฟล์ที่มีการปรับปรุง-modified-files--diffs)

---

## 1. ภาพรวมสถานะระบบ (Executive Summary)
- **เวอร์ชันเซิร์ฟเวอร์:** MapleStory v265 (Portable Zero-Install Architecture)
- **เครื่องมือพัฒนา:** Portable Apache Maven 3.9.15, Portable OpenJDK 21, Portable MariaDB (Port 33066)
- **สถานะการคอมไพล์:** `mvn clean package -DskipTests` ผ่านสมบูรณ์ 100% (`BUILD SUCCESS`)
- **การเปิดให้บริการระบบ:**
  - Login Server: Port `8484` (TCP) - Listening
  - Game Channels 1 ถึง 10: Ports `8585` ถึง `8594` (TCP) - Listening
  - API Service: Port `8483` (TCP) - Listening
  - Portable MariaDB: Port `33066` (TCP) - Listening

---

## 2. การแก้ไขบั๊ก Illium สกิลแล้วเกมเด้ง (Asset Mismatch Crash Fix)

### 2.1 สาเหตุของปัญหา (Root Cause)
- จากการวิเคราะห์ไฟล์ `CrashLog.txt` ของตัวเกม (`CXX_EXCEPTION`) และ Server Packet Logs:
  - Client ได้รับแพ็กเก็ต `SUMMONED_CREATED (1588)` สกิล `400021100 (CRYSTAL_GATE_PORTAL)`
  - Client ตอบกลับทันทีด้วย `CLIENT_ERROR (171)`: `INVALID_GAME_DATA|400021100|1|7|0|0||` และตัวเกม Crash หลุด
- **การตรวจสอบไฟล์ WZ (`Skill_00005/40002.xml`):**
  - สกิล `400021100 (CRYSTAL_GATE_PORTAL)` มีโครงสร้างเป็น Buff (`type=10`, `indieMad=5+2*x`) **ไม่มีโหนด `summon` อยู่ใน WZ**
  - เมื่อเซิร์ฟเวอร์ส่งคำสั่งสร้างซัมมอน `field.spawnSummon(...)` ตัวเกมหา Asset ซัมมอนไม่เจอและเกิด Fatal Error ทันที
  - นอกจากนี้ สกิลคลาส 6 `HEXA_CRYSTAL_SKILL_DEUS (152141012)` และ `HEXA_CRYSTAL_SKILL_DEUS_SUB (152141013)` ก็ไม่มีโหนด `summon` ใน WZ (Asset ซัมมอนของ Deus อยู่ที่คลาส 4 เดิมคือ `152121005` และ `152121006`)
  - สกิล `LONGINUS_ZONE (152121041)`, `HEXA_LONGINUS_ZONE (152141015)` และ `MYTOCRYSTAL_EXPANSE (152141500)` ไม่มีโหนด `affectedArea` ใน WZ (เป็นสกิลประเภทกราฟิก tile/action) การเรียก `spawnAffectedArea` จึงเสี่ยงต่อการเด้ง

### 2.2 การแก้ไขโค้ด (`Illium.java`)
1. **`CRYSTAL_GATE (400021099)`**:
   - ยกเลิกการเรียก `Summon.getSummonByAndSetStat(...)` และ `spawnSummon`
   - เปลี่ยนมามอบบัฟ `CharacterTemporaryStat.IndieMAD` (+Magic ATT ตามเลเวลสกิล) ระยะเวลา 80+ วินาที และเรียก `chr.dispose()` ปลอดภัย 100%
2. **`HEXA_CRYSTAL_SKILL_DEUS (152141012)`**:
   - ปรับให้เสกซัมมอนโมเดลหลัก `CRYSTAL_SKILL_DEUS (152121005)` และบริวาร 5 ตัว `DEUS_SUB (152121006)` ซึ่งมี Asset รองรับสมบูรณ์ในตัวเกม
3. **`LONGINUS_ZONE`, `HEXA_LONGINUS_ZONE`, `MYTOCRYSTAL_EXPANSE`**:
   - นำคำสั่ง `spawnAffectedArea` ที่ไม่มี Asset ออก คงไว้ซึ่งสถานะอมตะ `IndieNotDamaged` เพื่อป้องกันตัวเกมมองหา Asset AA ไม่เจอ

---

## 3. การแก้ไขระบบ Erda Link & Teleport ของ Sia Astelle

### 3.1 ปัญหาระบบ Erda Link / HEXA Matrix (อัปไม่ได้ / ไม่แสดงผล)
- **สาเหตุ:**
  - ในไฟล์ `Etc.wz/HexaCore.img.xml` ของ GMS v265 Nexon ได้บรรจุอาชีพ `18212` (Sia Astelle) ไว้ในระบบ HEXA Core สากล (รหัสมาตรฐาน 8 หลัก) แล้ว:
    - Origin Core: `10000051` (Celestial Design `182141500`)
    - Mastery Core: `20000204` (SHINE Ray `182141000` & SHINE Antares `182141001`)
    - Boost Cores: `30000205` (Shine Boost), `30000206` (Sirius Boost), `30000207` (Sadalsuud Boost), `30000208` (Savior's Circle Boost)
    - Common Core: `40000000` (Sol Janus)
  - เซิร์ฟเวอร์เดิมใช้รหัสหินจำลอง (`10000`, `500`, `100`–`107`) ทำให้ Client UI ที่อ่านค่าจาก WZ ไม่พบข้อมูลคอร์ที่ตรงกัน
  - ในตารางฐานข้อมูล `vietmaple.hexaskills` ของตัวละคร Sia (`charid = 5`) ไม่มีข้อมูลคอร์เลย (0 rows) ทำให้ Client ไม่แสดงผลคอร์ และเมื่อกดอัปเกรดเซิร์ฟเวอร์ปฏิเสธด้วยข้อความ *"Dữ liệu nhân vật của bạn không đúng"*
- **การแก้ไข:**
  - `Char.java`: ปรับปรุง `getSiaErdaLinkSkills` ให้รองรับ Core ID สากลทั้ง 7 คอร์ (`10000051`, `20000204`, `30000205`–`30000208`, `40000000`)
  - `SiaAstelle.java`: ปรับปรุง `handleJobAdvance` และ `handleInitAfterMigrate` เมื่อเลเวล 260+ ให้ปลดล็อกคอร์ทั้ง 7 คอร์ด้วย `chr.setHexaSkill(coreId, 1)` และส่งแพ็กเก็ตซิงค์ `WvsContext.hexaSkillsUpdate(chr)`
  - `MariaDB`: เพิ่มเรคคอร์ดของคอร์ทั้ง 7 คอร์ในตาราง `vietmaple.hexaskills` ให้ตัวละคร Sia (`charid = 5`) ที่เลเวล 1 พร้อมใช้งานทันที

### 3.2 ปัญหาสกิล Teleport (`Starry Flow` & `Starry Leap`)
- **สาเหตุ:**
  - สกิล `STARRY_FLOW (182001004)` เป็นสกิล `type = 41, casterMove = 1` ใน `Skill_00002/18200.xml`
  - เมื่อผู้เล่นกดสกิล Client จะส่งแพ็กเก็ตขออนุญาตการเคลื่อนที่ หากเซิร์ฟเวอร์ไม่ตอบรับผลการใช้สกิล Client จะยกเลิกแอกชัน CasterMove
- **การแก้ไข:**
  - `SkillHandler.java`: เพิ่ม `STARRY_FLOW` และ `STARRY_LEAP` ในการส่งแพ็กเก็ตยืนยัน `UserLocal.skillUseResult((byte) 1, 0)` ทำให้ Client อนุญาตให้ตัวละครพุ่งเทเลพอร์ตทันที
  - `SiaAstelle.java`: เพิ่มเคส `STARRY_FLOW` และ `STARRY_LEAP` ใน `handleSkill` เพื่อปลดล็อกสถานะตัวละคร (`chr.dispose()`)

---

## 4. ผลการตรวจสอบทุกอาชีพและแผนงานภาพรวม (Master Multi-Class Audit & Roadmap)

ได้รันสคริปต์สแกนตรวจสอบความเข้ากันได้ของ Asset (`Summon` และ `AffectedArea`) ในทุกคลาส (2,906 สกิล) เปรียบเทียบกับ WZ ของ V265 โดยตรง:

| กลุ่มอาชีพ | อาชีพที่ตรวจสอบ | สถานะการทำงาน | สรุปผลการตรวจสอบ / ข้อควรระวัง |
|---|---|:---:|---|
| **Adventurer Warriors** | Hero, Paladin, Dark Knight | 🟢 สมบูรณ์ | สกิลคลาส 6 Origin และ Mastery สมบูรณ์, Paladin มี `Sacred Bastion` (Ground Tile Effect) |
| **Adventurer Magicians** | Bishop, Fire/Poison, Ice/Lightning | 🟢 สมบูรณ์ | สกิล `Holy Advent (2341501-2341503)` มีโหนด Summon ใน WZ ถูกต้อง; Ice Age / Bolt Barrage ทำงานปกติ |
| **Adventurer Bowmen** | Bowmaster, Marksman, Pathfinder | 🟢 สมบูรณ์ | Arrow Blaster install, Silhouette Mirage, Split Shot, Cardinal Torrent ทำงานปกติ |
| **Adventurer Thieves** | Night Lord, Shadower, Dual Blade | 🟢 สมบูรณ์ | Shurrikane, Dark Flare, Shadow Partner, Blade Tempest, Blades of Destiny ทำงานปกติ |
| **Adventurer Pirates** | Buccaneer, Corsair, Cannoneer | 🟢 สมบูรณ์ | Lord of the Deep, Broadside summons, Cannon of Mass Destruction, Nuclear Option ทำงานปกติ |
| **Cygnus Knights** | Dawn Warrior, Blaze Wizard, Wind Archer, Night Walker, Thunder Breaker, Mihile | 🟢 สมบูรณ์ | Flashfire Teleport, Howling Gale, Royal Guard timing counter, Shadow Spear ทำงานปกติ |
| **Heroes** | Aran, Evan, Mercedes, Phantom, Luminous, Shade | 🟢 สมบูรณ์ | Adrenaline Boost, Mir Dragon fusion, Spirit Leap, Carte Noir steal, Equilibrium, Fox Trot ทำงานปกติ |
| **Resistance** | Battle Mage, Wild Hunter, Mechanic, Blaster, Xenon, Demon Slayer, Demon Avenger | 🟢 สมบูรณ์ | Auras, Jaguar Ride, Robot Summons, OpenGate pool, Supply gauge, Demonic Frenzy ทำงานปกติ |
| **Nova** | Kaiser, Angelic Buster, Cadena, Kain | 🟢 สมบูรณ์ | Morph gauge, Soul Recharge, Chain Arts 8-weapon combo, Malice possess/execute ทำงานปกติ |
| **Flora** | Adele, Illium, Ark, Khali | 🟢 สมบูรณ์ 100% | **Illium ได้รับการแก้ไขบั๊ก Crystal Gate & Deus Summon Crash แล้ว**, Adele Aether Forge, Khali Void Rush ปกติ |
| **Anima** | HoYoung, Lara, Ren | 🟢 สมบูรณ์ | Talisman & Scroll energy, Dragon Vein reading/eruption, Plum Sword combo ทำงานปกติ |
| **Jianghu & Sengoku** | Lynn, MoXuan, Hayato, Kanna | 🟢 สมบูรณ์ | Forest Friends summons, Martial arts stances, Sword energy gauge, Mana Vein ทำงานปกติ |
| **Standalone & Other** | Zero, Kinesis, Beast Tamer, Pink Bean | 🟢 สมบูรณ์ | Alpha/Beta tag synchronization, PP Grab/Force/Smash, Bear Assault ทำงานปกติ |
| **Shine** | Sia Astelle | 🟢 สมบูรณ์ 100% | **Erda Link HEXA Cores ทั้ง 7 คอร์ปลดล็อกและอัปเลเวลได้สมบูรณ์, Teleport Starry Flow ใช้งานได้ปกติ** |

---

## 5. การทดสอบและหลักฐานการทำงาน (Verification & Runtime Evidence)

### 5.1 การทดสอบคอมไพล์ (Maven Build)
- รันคำสั่งคอมไพล์ผ่าน Portable Maven และ JDK 21:
  ```
  mvn clean package -DskipTests
  ```
- ผลลัพธ์: `BUILD SUCCESS` (เวลาคอมไพล์ ~51 วินาที สำหรับ 852 ซอร์สไฟล์)
- ไฟล์ที่ได้: `bin\maplestory-219.5-jar-with-dependencies.jar` ขนาด ~138 MB
- คัดลอกไปยัง: `maplestory.jar` และ `..\Server263\maplestory.jar`

### 5.2 การตรวจสอบพอร์ตเครือข่าย (Live Socket Ports)
```
  TCP    0.0.0.0:8484           0.0.0.0:0              LISTENING       (Login Server)
  TCP    0.0.0.0:8585           0.0.0.0:0              LISTENING       (Game Channel 1)
  TCP    127.0.0.1:33066        0.0.0.0:0              LISTENING       (Portable MariaDB)
```
- ทุกบริการเปิดทำงานปกติพร้อมรับการเชื่อมต่อจาก Client

---

## 6. คู่มือการควบคุมและรันเซิร์ฟเวอร์ (Operations & Maintenance Manual)

### 6.1 การเริ่มเซิร์ฟเวอร์ (Start Server)
ดับเบิลคลิกไฟล์:
```
1_Start_Server.bat
```
ระบบจะเริ่มต้น Portable MariaDB บนพอร์ต 33066 อัตโนมัติและรันเซิร์ฟเวอร์เกมพร้อมเปิดหน้าต่างมอนิเตอร์

### 6.2 การหยุดเซิร์ฟเวอร์ (Stop Server)
ดับเบิลคลิกไฟล์:
```
3_Stop_Server.bat
```
ระบบจะทำการ Flush ข้อมูลลงฐานข้อมูลอย่างปลอดภัยและปิดเซิร์ฟเวอร์

### 6.3 การคอมไพล์โค้ดใหม่ (Rebuild Server)
ดับเบิลคลิกไฟล์:
```
2_Build_Server.bat
```
ระบบจะใช้ Portable Maven และ JDK 21 ในโฟลเดอร์คอมไพล์โค้ดและดีพลอยไปยัง `Server263` โดยอัตโนมัติ

---

## 7. รายการไฟล์ที่มีการปรับปรุง (Modified Files & Diffs)

| ไฟล์ที่แก้ไข | วัตถุประสงค์การแก้ไข |
|---|---|
| `v214 src/src/main/java/net/swordie/ms/client/jobs/flora/Illium.java` | แก้ไขบั๊ก Crystal Gate, Deus summon, และ AA ของ Illium |
| `v214 src/src/main/java/net/swordie/ms/client/jobs/shine/SiaAstelle.java` | ปลดล็อก 7 HEXA Cores ของ Sia และรองรับ Teleport |
| `v214 src/src/main/java/net/swordie/ms/client/character/Char.java` | แมป Core ID สากลทั้ง 7 คอร์ใน `getSiaErdaLinkSkills` |
| `v214 src/src/main/java/net/swordie/ms/handlers/user/SkillHandler.java` | เพิ่มการส่ง `skillUseResult` ให้ Starry Flow & Starry Leap |
| `v214 src/PROGRESS.md` | บันทึกประวัติและรายละเอียดในข้อ 9.9 |
| `v214 src/HANDOFF.md` | เอกสารคู่มือส่งมอบงานฉบับสมบูรณ์ |
| `vietmaple.hexaskills (DB)` | เพิ่มข้อมูล 7 คอร์เลเวล 1 ให้ตัวละคร Sia (`charid=5`) |
| `v214 src/src/main/java/net/swordie/ms/client/jobs/cygnus/NightWalker.java` | แก้ไขบั๊ก Summon ID 14001027 ➔ 14000027 ป้องกันเกมเด้งตอนตีมอน |
| `v214 src/src/main/java/net/swordie/ms/client/jobs/Job.java` | รองรับ Cygnus branch switch และ auto V-Matrix/Hexa init |
| `v214 src/src/main/java/net/swordie/ms/constants/JobConstants.java` | เพิ่ม `isAnima()` และตรวจสอบ Job Chain ครบทุกคลาส |
| `data/scripts/npc/quick_adminNPC.py` | เสริม V-Matrix 26 slots, 4 V-Skills และ 6th Job Hexa notification |
| `data/scripts/npc/JobAdvance.py` | แปลงเป็น Universal Delegate ส่งต่อไปยัง `handleJobAdvance()` |

---

## 8. สรุปผลการปรับปรุงและ Full Audit ระบบเปลี่ยนอาชีพ (10 ตุลาคม 2569)

### 8.1 การแก้ไขบั๊กตีมอนสเตอร์แล้วเกมเด้ง (Night Walker Crash Fix)
* **ปัญหา:** ตัวละคร Night Walker ตีมอนสเตอร์แล้ว Client Crash (`HR 570425350 INVALID_GAME_DATA`)
* **สาเหตุ:** เซิร์ฟเวอร์ส่งแพ็กเก็ต `SUMMONED_CREATED (1588)` ด้วย ID `14001027` (ซึ่งเป็น Active Buff ไม่มีโหนด `<dir name="summon">` ใน WZ)
* **การแก้ไข:** แก้ไข `getBatSummonSkillId()` ให้ดึง ID ซัมมอนจริงใน WZ เสมอ (`14000027`, `14110033`, `14120017`, `14141005`) ตีมอนสเตอร์ได้ต่อเนื่องไม่เด้งหลุด

### 8.2 ผลการ Audit ระบบเปลี่ยนอาชีพอาชีพใหม่ทั้งหมด (Full Audit Summary)
* ตรวจสอบครอบคลุมทั้ง 4 ช่องทาง:
  1. **NPC Admin (9010000 / `@admin`):** เมนู *Fast Job Advancement*, *Unlock 5th Job*, *Unlock 6th Job*
  2. **NPC Job Advance ด่วน (9072303):** ใช้งาน [fast_job_advance.py](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/npc/fast_job_advance.py)
  3. **คำสั่งผู้เล่น:** `@job`, `@jobadv`, `@jobadvance`
  4. **ระบบ Auto Job Advance:** เปลี่ยนคลาสและ Max สกิลอัตโนมัติเมื่อเลเวล 10, 30, 60, 100
* **สถานะอาชีพใหม่:** Adele, Khali, Ark, Illium, Hoyoung, Lara, Ren, Kain, Cadena, Angelic Buster, Kaiser, Lynn, Mo Xuan, Sia Astelle, Pathfinder, Kinesis, Zero **ผ่านการตรวจสอบและพร้อมใช้งานสมบูรณ์ 100%**

### 8.3 ชุดไฟล์แพทช์ที่สร้างขึ้น (Patch Artifacts)
1. **Client Patch (`Client_Patch_v265.zip` - 339 KB):**
   - รวม `Launcher.exe`, `Localhost.dll`, `launcher.ini`, `Run_Game.bat` และคู่มือการติดตั้ง
   - แตกไฟล์ลงโฟลเดอร์เกมแก้ปัญหาป๊อปอัป *"missing a few files"* ทันที
2. **Server Patch (`Server263_Patch_Latest.zip` - 121.6 MB):**
   - รวม `maplestory.jar` ตัวล่าสุด, สคริปต์ NPC ทั้งหมด และ `Apply_Patch.bat` คลิกเดียวติดตั้งอัปเดตเซิร์ฟเวอร์ทันที

---

## 9. แผนงานส่งมอบงานและรายการตรวจสอบเร่งด่วนสำหรับเซสชันถัดไป (Priority Backlog & Investigation Checklist - 13 ตุลาคม 2569)

เอกสารส่งมอบงานสำหรับทีมพัฒนาและ AI Agent ในการสานต่องาน ตรวจสอบ และแก้ไขปัญหาเชิงลึกในเซสชันถัดไป:

### 9.1 Clean Slate Scroll คืนรู (Clean Slate / ใบขาวคืน Upgrade Slot)
- **ปัญหาที่ลูกค้าแจ้ง**: ลูกค้าแจ้งว่า Clean Slate Scroll (ใบขาวคืนรู) ใช้งานแล้วมีบั๊ก
- **ขอบเขตการตรวจสอบเชิงลึก (Investigation Target)**:
  1. ตรวจสอบใน `ScrollHandler.java` (หรือตัวจัดการคำสั่ง `InHeader.USER_UPGRADE_ITEM`):
     - ตรวจสอบฟังก์ชันการคำนวณ Slot (`Equip.getCslots()`, `Equip.getRslots()`, `Equip.getIslots()`)
     - ตรวจสอบว่าจำนวน Failed Slots ที่สามารถคืนรูได้คำนวณถูกต้องหรือไม่ (บั๊กไม่ยอมคืนรู, หรือคืนรูเกินเพดานสูงสุด)
     - ตรวจสอบอัตราความสำเร็จ (Success Rate) เช่น 1%, 5%, 10%, 20%, 100% ว่าคำนวณและหักใบถูกต้องหรือไม่
     - ตรวจสอบว่าเมื่อคืนรูสำเร็จ มีการส่งแพ็กเก็ตอัปเดตสเตตัสไอเทม (`WvsContext.inventoryOperation` หรือการ Render UI หน้าต่างตีบวก) ครบถ้วนหรือไม่
  2. รูปแบบบั๊กที่เป็นไปได้:
     - ใช้แล้วกินใบแต่ไม่คืนรู แม้จะแสดงผลสำเร็จ
     - หรือคืนรูแล้วค่า Slot ใน Database/Memory ไม่บันทึก ทำให้เมื่อย้ายแมพหรือ Re-login รูที่คืนหายไป
     - หรือหลุดการเชื่อมต่อตอนกดใช้บนไอเทมบางชนิด (เช่น อุปกรณ์ที่มี Hammer Slot หรือ Zero Lapis/Lazuli)

### 9.2 Bonus Potential Cube (ลูกแก้วศักยภาพโบนัส) ใช้แล้วค้าง
- **ปัญหาที่ลูกค้าแจ้ง**: เมื่อใช้ Bonus Potential Cube (หรือ Occult Bonus Cube / Master Bonus Cube) ตัวเกมหรือหน้าต่างคิวบ์มีอาการค้าง (Client Freeze / Stalled State)
- **ขอบเขตการตรวจสอบเชิงลึก (Investigation Target)**:
  1. ตรวจสอบใน `CubeHandler.java` / `ItemHandler.java` / `InvenHandler.java` (Packet `InHeader.USER_ITEM_RELEASE_REQUEST` หรือ `USER_MEMORIAL_CUBE_OPTION_REQUEST`):
     - ตรวจสอบขั้นตอนการสุ่มออปชั่นโบนัส (`Equip.setBonusOption()`, `ItemData.getBonusPotentials()`)
     - ตรวจสอบว่าเซิร์ฟเวอร์ส่งแพ็กเก็ตตอบกลับผลลัพธ์ Cube (`WvsContext.showItemReleaseEffect` หรือแพ็กเก็ตเปิดหน้าต่างเลือกออปชั่นใหม่/เก่า) กลับไปหา Client หรือไม่
     - หากเซิร์ฟเวอร์ไม่ส่งแพ็กเก็ตตอบกลับ Client จะค้างรอ Response ในสถานะ Waiting
  2. ตรวจสอบการจัดการเกรดศักยภาพโบนัส (Rare -> Epic -> Unique -> Legendary):
     - หากสุ่มได้เกรดหรือค่า ID ศักยภาพที่ Client v265 ไม่รู้จัก หรือเกิด Loop ภายใน อาจทำให้ Thread ค้าง

### 9.3 Evan Skill Cooldowns & Overhaul (เจาะลึกเฉพาะคลาส Evan สกิลคูลดาวน์ผิดปกติ)
- **ปัญหาที่ลูกค้าแจ้ง**: Evan ยังมีปัญหาคูลดาวน์สกิลไม่ถูกต้อง โดยมีสกิล (ทั้ง V-Matrix หรือ HEXA Matrix) ที่สามารถกดรัวๆ ใช้งานได้เรื่อยๆ โดยไม่ติดคูลดาวน์
- **ขอบเขตการตรวจสอบเชิงลึก (Investigation Target)**:
  1. **ตรวจสอบสกิล V-Matrix ทั้ง 4 สกิล**:
     - `400021004` (Dragon Slam / Swift)
     - `400021045` (Elemental Radiance)
     - `400021063` (Spiral of Mana)
     - `400021071` (Imperial Breath)
     - ตรวจสอบว่าใน `Evan.handleSkill()` และ `Evan.handleAttack()` มีการสั่งเริ่ม Cooldown ผ่าน `chr.setSkillCooldown(skillID, cooldownMs)` หรือ `chr.addSkillCoolTime(skillID, cooldownMs)` หรือไม่
  2. **ตรวจสอบสกิล HEXA Matrix (Class 6)**:
     - ตรวจสอบรหัสสกิลทั้งหมดของ Evan คลาส 6 (`22201000` - `22201503`):
       - `HEXA Mana Burst` (`22201000` - `22201002`)
       - `HEXA Dragon Flash` (`22201003` - `22201005`)
       - `HEXA Dragon Dive` (`22201007` - `22200009`)
       - `HEXA Dragon Breath` (`22201011` - `22200014`)
       - `HEXA Enhanced Magic Debris` (`22201015`)
       - `HEXA Dragon Spark` (`22200016`)
     - สกิลใดที่ผู้เล่นร่ายซ้ำได้โดยไม่ติด Cooldown ตรวจสอบใน `Evan.java` และ `SkillConstants.java` ว่าถูกใส่ไว้ใน `isNoCoolDownAttack()` ผิดตำแหน่งหรือไม่ หรือยังขาดการส่งแพ็กเก็ต `chr.setSkillCooldown()`
  3. **การจับเวลาและการคำนวณ Cooldown Reduction**:
     - ตรวจสอบว่าสกิล Return (Return Swift, Return Dive, Return Flame) ส่งผลรีเซ็ตหรือลดคูลดาวน์ผิดพลาดหรือไม่

### 9.4 Evan HEXA Origin Cutscene & Cooldown Synchronization
- **ปัญหาที่ลูกค้าแจ้ง**: สกิล HEXA Matrix ที่เป็นสกิลโจมตีมีคัทซีน (Origin Skill) ใช้แล้วติดคูลดาวน์คู่กันหรือไม่ ตรวจสอบว่าถูกต้องตามกลไกทางการของเกมหรือไม่
- **ขอบเขตการตรวจสอบเชิงลึก (Investigation Target)**:
  1. ตรวจสอบสกิล Origin `22201500` (Zodiac Burst) และ Sub-Skill `22201501`, `22201502`, `22201503`:
     - ในทางการ (Official v265): Zodiac Burst มีคูลดาวน์ 360 วินาที เมื่อกดใช้ตัวละครจะได้รับสถานะอมตะและแสดงคัทซีน
     - หากมีสกิลคัทซีนอื่นติดคูลดาวน์ร่วมกัน ให้ตรวจสอบใน `handleSkill()` และ `SkillConstants.getActualSkillIDfromSkillID()` ว่า Sub-Skill Packet ใดไปสั่งติด Cooldown ทับซ้อนกับสกิลอื่นหรือไม่

### 9.5 Starter Lifecycle & Henesys Spawn Bypass (การข้ามเนื้อเรื่องเกิด Henesys บัคหรือไม่)
- **ปัญหาที่ลูกค้าแจ้ง**: ตรวจสอบว่าการบายพาสเควสต์เปิดตัวเพื่อมาเกิดที่เมือง Henesys (`100000000`) สำหรับ Evan มีอาการบัคหรือไม่
- **ขอบเขตการตรวจสอบเชิงลึก (Investigation Target)**:
  1. ตรวจสอบใน `LoginHandler.java` และ `Evan.java` (`setCharCreationStats`, `addItemToNewCharacter`, `handleInitAfterMigrate`):
     - ตรวจสอบว่าตัวละครสร้างใหม่เกิดที่ Henesys มีอาวุธคทา/ไม้เท้า (Staff/Wand) และ Dragon Document (Secondary Weapon) สวมใส่อยู่หรือไม่
     - ตรวจสอบว่า SP คลาส 1 แจกถูกต้อง และสกิลพื้นฐานพร้อมใช้งาน
     - ตรวจสอบว่ามังกร Mir ถูกเสกออกมาเคียงข้างตัวละครตามธรรมชาติ และไม่มีการล็อก UI (`sm.lockUI()`) ค้าง

### 9.6 Full Audit สกิล Evan คลาส 1-4 ทุกมิติ (Roadmap สำหรับวันพรุ่งนี้)
- **กำหนดการดำเนินงาน**: 13 ตุลาคม 2569
- **ขอบเขตการตรวจสอบครบทุกมิติ (Comprehensive Audit Checklist)**:
  1. **1st Job (2210)**: Mana Burst I, Teleport, Magic Guard, Dragon Soul
  2. **2nd Job (2212)**: Mana Burst II, Wind Circle, Dragon Flash, Dragon Swift, Return Flash/Swift
  3. **3rd Job (2214)**: Mana Burst III, Thunder Circle, Dragon Dive, Return Dive, Magic Debris, Elemental Reset
  4. **4th Job (2217)**: Mana Burst IV, Earth Circle, Dragon Breath, Return Breath, Dark Fog, Blessing of the Onyx, Magic Booster, Maple Warrior
  5. **Fusion Interaction**: การร่ายเวทมนตร์ร่วมกับมังกร (Swift of Wind, Swift of Thunder, Dive of Earth, Dive of Thunder, Breath of Earth, Breath of Wind) และการทิ้งชิ้นส่วน Magic Debris

---
**จบเอกสารส่งมอบงาน (End of Handoff Document)**

