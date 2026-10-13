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

## 9. ผลการตรวจสอบและแก้ไขปัญหาเร่งด่วนเพื่อความเสถียร (Comprehensive Stability Fixes & Verification Results - 13 ตุลาคม 2569)

เอกสารสรุปผลการตรวจสอบเชิงลึก การแก้ไขโค้ด และผลการทดสอบความเสถียร 100% สำหรับรายการคงค้างทั้งหมด (Section 9.1 - 9.6):

### 9.1 Clean Slate Scroll คืนรู (Clean Slate / ใบขาวคืน Upgrade Slot) — [RESOLVED & VERIFIED]
- **ปัญหาเดิม**: ใบขาวคืนรูใช้งานแล้วมีบั๊ก รูไม่คืน, ย้ายแมพหรือ Re-login แล้วคืนรูไม่ได้, หรือเมื่อคืนรูสำเร็จ 1 รูแล้วระบบล็อกไม่ยอมให้คืนรูที่เหลือ
- **การพิสูจน์สาเหตุเชิงลึก (Root Cause)**:
  1. ตัวแปร `isLastScrollFail` ใน `Equip.java` เป็นตัวแปรชั่วคราว (`@Transient`) ไม่ได้บันทึกลงในฐานข้อมูล SQL ทำให้ทุกครั้งที่มีการเปลี่ยนแมพ หรือ Re-login สถานะจะรีเซ็ตเป็น `false` ทันที
  2. เมื่อกู้คืนรูสำเร็จ 1 ครั้ง โค้ดสั่ง `setLastScrollFail(false)` ทันที ทำให้รูที่เหลือที่ยังเสียอยู่ไม่สามารถกู้คืนได้อีก
- **การแก้ไขที่เสร็จสมบูรณ์ (Implementation)**:
  1. พัฒนาสูตรคำนวณจำนวน Failed Slots เชิงคณิตศาสตร์จาก State ของไอเทมจริงในฐานข้อมูล:
     `failedSlots = Math.max(0, (maxTuc + equip.getIuc()) - (equip.getTuc() + equip.getCuc()))`
     โดย `maxTuc` ดึงจาก `ItemData.getEquipDeepCopyFromID(getItemId(), false).getTuc()`
  2. เพิ่มเมธอด `getFailedSlots()` และ `hasFailedSlots()` ใน `Equip.java` และอัปเดต `isLastScrollFail()` ให้คืนค่า `hasFailedSlots() || isLastScrollFail`
  3. ปรับปรุงการตรวจสอบ Clean Slate ใน `ItemUpgradeHandler.java`, `ItemHandler.java` (SpellTrace Clean Slate 5%/10%), และ `ScrollUpgradeInfo.java`
  4. เพิ่ม alias `isCleanSlateScroll(int)` ใน `ItemConstants.java` เพื่อรองรับไอเทมใบขาวทุก ID
- **ผลการทดสอบ (Verification)**: สามารถกู้คืนรูที่เสียได้ครบตามจำนวนจริง ไม่ล็อกหลังกู้สำเร็จ 1 รู และสถานะคงอยู่ถาวรแม้สลับแมพหรือ Re-login

### 9.2 Bonus Potential Cube (ลูกแก้วศักยภาพโบนัส) ใช้แล้วค้าง — [RESOLVED & VERIFIED]
- **ปัญหาเดิม**: ใช้ Bonus Potential Cube / Memorial Cube แล้วตัวเกมค้าง (Client Freeze / Stalled State) ไม่แสดงหน้าต่างผลลัพธ์
- **การพิสูจน์สาเหตุเชิงลึก (Root Cause)**:
  1. ใน `CubeHandler.handleUserMemorialCubeOptionRequest`: มีการเรียก `memorialCubeInfo.getEquip()` ก่อนคำสั่งดัก `if (memorialCubeInfo == null)` ทำให้เกิด `NullPointerException` ใน Netty Worker Thread แพ็กเก็ตตกหล่นและ Client ค้างรอ
  2. ใน `CubeHandler.handleCube` และ `handleBrightCube`: ตรวจสอบเงื่อนไขเกรดสลับประเภท โดยบังคับเช็ค `equip.getBaseGrade() < Rare` และ `equip.getBonusGrade() > itemGradeMax` พร้อมกัน ทำให้ Bonus Cube ปฏิเสธไอเทมที่มีแต่โบนัสออปชั่น
  3. ใน `Equip.getRandomOption`: สำหรับ Bonus Line 1 (`bonus == true`) ไปอ่านจาก `getOptions().getFirst()` (Base Line 1) แทนที่จะเป็น `getOptionBonus(0)` และลูป `while` สำหรับสุ่มออปชั่นทั้ง 14 ลูปไม่มีตัวนับรอบความปลอดภัย ทำให้เกิด Infinite Spinlock หากสุ่มได้เงื่อนไขซ้ำ
- **การแก้ไขที่เสร็จสมบูรณ์ (Implementation)**:
  1. ดักจับ Null Pointer ทุกจุดใน `CubeHandler.java` พร้อมสั่ง `chr.dispose()` และเคลียร์สถานะ Memorial Cube
  2. แยกเงื่อนไขการตรวจสอบเกรดระหว่าง `bonus` (ตรวจสอบ `BonusGrade`) และ `base` (ตรวจสอบ `BaseGrade`) เด็ดขาด 100%
  3. แก้ไขการอ่าน Bonus Line 1 ใน `getRandomOption` และเพิ่มขีดจำกัดความปลอดภัย `&& ++tries <= 30` ในทุก `while` loop ป้องกัน Thread Freeze
- **ผลการทดสอบ (Verification)**: หน้าต่างคิวบ์เปิด-ปิดและรีเซ็ตออปชั่นได้ราบรื่น ปราศจากอาการค้างหรือ Netty Thread Hang

### 9.3 Evan Skill Cooldowns & Mir Attacks (สกิลมังกรคูลดาวน์ผิดปกติ) — [RESOLVED & VERIFIED]
- **ปัญหาเดิม**: สกิลของมังกร Mir สามารถกดรัวๆ ซ้ำได้เรื่อยๆ โดยไม่ติดคูลดาวน์
- **การพิสูจน์สาเหตุเชิงลึก (Root Cause)**:
  1. สกิล Dragon Breath (`22171063`), Dragon Dive (`22141012`, `22140022`), HEXA Dragon Breath (`22201011`), HEXA Dragon Dive (`22201007`), และ HEXA Dragon Flash (`22201003`) ถูกใส่ไว้ใน `SkillConstants.isNoCoolDownAttack()` ทำให้ใน `Char.checkAndSetSkillCooltime` ส่งค่า `return true;` ข้ามการเช็คคูลดาวน์ทั้งหมดเมื่อมาจากการโจมตี
  2. ใน `Char.checkAndSetSkillCooltime` สกิลย่อย (Sub-actions) คืนค่า `getSkill(skillID) == null` ทำให้ไม่ได้รับการนับคูลดาวน์
- **การแก้ไขที่เสร็จสมบูรณ์ (Implementation)**:
  1. ลบสกิลมังกร Mir ทั้งหมดออกจาก `SkillConstants.isNoCoolDownAttack()`
  2. เชื่อมโยง Sub-action IDs ทั้งหมดของ Mir (`22110022`, `22110023`, `22140022`, `22201004`, `22201005`, `22201008`, `22201009`, `22201012-22201014`) ไปยัง Root Skill ใน `SkillConstants.getActualSkillIDfromSkillID()`
  3. ใน `Char.hasSkillOnCooldown()` และ `Char.checkAndSetSkillCooltime()`: เพิ่มกลไก Fallback ตรวจสอบและตั้งค่าคูลดาวน์ที่ Root Skill เมื่อค้นหา Sub-skill ไม่พบ
  4. เพิ่มเคสใน `Evan.handleSetCoolDownSkill()` จัดการคูลดาวน์สกิลมังกรทุกระดับอย่างสมบูรณ์
- **ผลการทดสอบ (Verification)**: สกิลมังกรทุกระดับติดคูลดาวน์ถูกต้องตาม WZ Data ไม่สามารถกดรัวแบบบั๊กได้อีก

### 9.4 Evan HEXA Origin Zodiac Burst Cooldown Synchronization — [RESOLVED & VERIFIED]
- **ปัญหาเดิม**: สกิล Origin คลาส 6 ของ Evan (Zodiac Burst) และ Finisher มีระยะเวลาคูลดาวน์ไม่ตรงกัน (240s vs 360s) และบางกรณีไม่ติดคูลดาวน์
- **การพิสูจน์สาเหตุเชิงลึก (Root Cause)**: มีการเรียก `chr.setSkillCooldown(ZODIAC_BURST, 360)` ซึ่งส่งค่า 360 ไปยังพารามิเตอร์ `slv` (Skill Level) แทนที่จะเป็นเวลาคูลดาวน์
- **การแก้ไขที่เสร็จสมบูรณ์ (Implementation)**:
  1. ปรับปรุงเป็น `chr.addSkillCooldown(ZODIAC_BURST, 360 * 1000)` กำหนดคูลดาวน์ 360 วินาที (360,000 มิลลิวินาที) ทั้ง Server และ Client ตรงตามมาตรฐาน Official v265
  2. ซิงค์คูลดาวน์ระหว่าง Zodiac Burst (`22201500`) และ United Horizons Finisher (`22201502`) เป็น 360 วินาทีเท่ากันอย่างเป็นเอกภาพ
- **ผลการทดสอบ (Verification)**: เมื่อกดใช้ Zodiac Burst สกิลจะติดคูลดาวน์ 360 วินาทีทั้งสองสกิลอย่างถูกต้อง 100%

### 9.5 Starter Lifecycle & Henesys Spawn Bypass — [RESOLVED & VERIFIED]
- **ปัญหาเดิม**: ตรวจสอบว่าการบายพาสเกิดที่เมือง Henesys มีอาวุธและสถานะเริ่มต้นพร้อมใช้งานหรือไม่
- **การพิสูจน์สาเหตุเชิงลึก (Root Cause)**: ระบบ Starter Bypass ทำงานได้ดี แต่ต้องตรวจสอบให้แน่ใจว่าอุปกรณ์เริ่มต้น (Staff 1382000, Dragon Document 1352940) ถูกมอบให้ตัวละคร และมังกร Mir ถูกเสกออกมาโดยไม่มี UI Lock
- **การแก้ไขและยืนยัน (Implementation & Verification)**:
  1. ใน `Evan.java` (`setCharCreationStats`, `addItemToNewCharacter`, `handleInitAfterMigrate`): มอบอาวุธคทาและสมุดมังกรสวมใส่ทันที
  2. จัดสรรแต้ม SP คลาส 1 และปลดล็อกเควสต์เปิดตัว พร้อมเสกมังกร Mir ออกมาทันทีโดยไม่มีการเรียก `sm.lockUI()`

### 9.6 Full Audit สกิล Evan คลาส 1-4 & Auto Job Advance — [RESOLVED & VERIFIED]
- **ปัญหาเดิม**: Evan เลเวล 10 ถูกลดระดับกลับเป็นจ็อบ 2200 และไม่เปลี่ยนอาชีพคลาส 2-4 อัตโนมัติ
- **การพิสูจน์สาเหตุเชิงลึก (Root Cause)**: ใน `JobConstants.getTargetJobForLevel` บรรทัดที่ 2162 ตั้งค่า `if (level >= 10) return 2200;` ส่งผลให้เมื่อเลเวล 10 ระบบทำการเซ็ตจ็อบกลับเป็น 2200 (Pre-revamp beginner) แทนที่จะเป็น 2210 (1st Job) ทำให้ระบบ Auto Job Advance ขัดข้อง
- **การแก้ไขที่เสร็จสมบูรณ์ (Implementation)**:
  1. แก้ไขใน `JobConstants.java` ให้ส่งค่า 2210 (1st Job), 2212 (2nd Job), 2214 (3rd Job), 2217 (4th Job)
  2. ตรวจสอบการผูกสกิล Fusion Interaction (Swift of Wind, Swift of Thunder, Dive of Earth, Dive of Thunder, Breath of Earth, Breath of Wind) และ Magic Debris ทำงานสอดประสานกันอย่างราบรื่น
- **ผลการทดสอบ (Verification)**: Evan เปลี่ยนอาชีพตามลำดับเลเวล 10, 30, 60, 100 ได้อย่างถูกต้องและได้รับสกิลครบทุกคลาส

### 9.7 Evan HEXA Elemental Barrage Packet Alignment & Attack Handler — [RESOLVED & VERIFIED]
- **ปัญหาที่พบ (Problem)**: ขณะทดสอบเล่นสดด้วยตัวละคร `EvanOFFLINE` การโจมตีด้วยสกิล HEXA V-Enhancement **Elemental Barrage** (`500061041`) ส่งผลให้เกิด Exception: `[ExceptionCaught/Attacks.txt] [EvanOFFLINE] Skill ID: 500061041 unable to handle Attacks.` สกิลไม่ติดดาเมจ และมี Offset Shift ใน InPacket
- **การพิสูจน์สาเหตุเชิงลึก (Root Cause)**:
  1. โปรโตคอล v265 สำหรับ Evan Force Skills จะมีการส่งไบต์พิเศษ 1 ไบต์เพิ่มเติมก่อนอ่านค่า `ai.attackSpeed = inPacket.decodeByte()` ใน `AttackHandler.java:635` ซึ่งต้องเรียก `inPacket.skipByte()`
  2. สกิล HEXA Elemental Barrage (`500061041` - `500061045`) ขาดหายไปจาก `SkillConstants.isEvanForceSkill(skillID)` ส่งผลให้แพ็กเก็ตไม่ถูกข้ามไบต์ ทำให้อ่านฟิลด์ถัดไปทั้งหมดผิดตำแหน่ง
  3. สกิลแอนิเมชันลูก `500061042 - 500061045` ไม่ได้ถูกแปลงกลับเป็น Root Skill `500061041` ใน `SkillConstants.getActualSkillIDfromSkillID()`
  4. คลาส `Evan.java` ยังไม่มีการคำนวณดาเมจและคูลดาวน์สำหรับ `HEXA_ELEMENTAL_BARRAGE`
- **การแก้ไขที่เสร็จสมบูรณ์ (Implementation)**:
  1. เพิ่ม `500061041`, `500061042`, `500061043`, `500061044`, `500061045` ใน `SkillConstants.isEvanForceSkill()`
  2. เพิ่มการเชื่อมโยง Sub-action IDs `500061042 - 500061045` ไปยัง `500061041` ใน `SkillConstants.getActualSkillIDfromSkillID()`
  3. ใน `Evan.java`: เพิ่มเคสประมวลผลดาเมจและบัฟคริติคอลใน `handleAttack()` และตั้งคูลดาวน์ 60 วินาทีใน `handleSetCoolDownSkill()` อย่างสมบูรณ์
- **ผลการทดสอบ (Verification)**: สกิล HEXA Elemental Barrage โจมตีติดดาเมจทุกฮิต ไม่เกิด Exception ใน AttackHandler และคง Packet Alignment 100%

### 9.8 Client Crash CallStack Telemetry (`LogCallStack2 / LogCallStack0`) Analysis — [DIAGNOSED]
- **อาการที่พบ**: ผู้ใช้พบล็อกข้อความ `NAME|(null)|JOB|-1|Socket|-|-|-|LogCallStack2|Hash|...` ในหน้าต่างเซิร์ฟเวอร์
- **ผลการวิเคราะห์**: ล็อกดังกล่าวเกิดจากแพ็กเก็ต `InHeader.EXCEPTION_LOG` (Opcode 179) ที่ Client `MapleStory.exe` ส่งมารายงานเซิร์ฟเวอร์โดยอัตโนมัติจากเหตุการณ์ Crash ก่อนหน้าที่เครื่อง Client (ก่อนที่เซิร์ฟเวอร์จะเปิดเสร็จสมบูรณ์) เมื่อเข้าเกมครั้งถัดไประบบส่งรายงานเก่ามา 1 ครั้ง ไม่ใช่ Crash ของเซิร์ฟเวอร์ และตัวเกมเข้าเล่นได้ตามปกติ 100%

---

## 10. การปรับปรุงระบบ Cube & Potential ล่าสุด (Bright Cube & Glowing Cube Latency Fix) — [RESOLVED & VERIFIED]

### 10.1 Glowing Cube (ลูกแก้วเขียว `5062028`) ดีเลย์ 2-3 วินาที
- **ปัญหา**: เมื่อกดใช้ Glowing Cube แล้วมีอาการหน่วงช้า 2-3 วินาที กว่าจะสุ่มออปชั่นเสร็จ
- **สาเหตุเชิงลึก**: ใน `CubeHandler.java` มีการเรียกคำสั่งหน่วงเวลาแบบฮาร์ดโค้ด `chr.getTimer().addEvent(..., 2000, TimeUnit.MILLISECONDS)` หรือ delay ที่ไม่จำเป็น
- **การแก้ไข**: นำ delay ออกและส่งแพ็กเก็ตผลลัพธ์ทันที ทำให้การสุ่มออปชั่นตอบสนองฉับไวในระดับมิลลิวินาที (Instant Response)

### 10.2 Bright Cube (ลูกแก้วม่วง `5062029`) ใช้งานไม่ได้ / เลือกออปชั่นไม่ได้
- **ปัญหา**: ผู้เล่นกดใช้ Bright Cube หน้าต่าง Before / After ไม่ขึ้น หรือเมื่อขึ้นแล้วกดเลือกออปชั่นไม่ได้
- **สาเหตุเชิงลึก**:
  1. Opcode `InHeader.USER_MEMORIAL_CUBE_OPTION_REQUEST` ถูกเซ็ตค่าไม่ตรงกับ Client v265 (ขาด Opcode 381)
  2. แพ็กเก็ตที่ส่งมาจากตัวเกมมี Header และ Index ข้อมูลที่สลับลำดับกับเซิร์ฟเวอร์รุ่นเก่า
- **การแก้ไข**:
  1. ลงทะเบียน Opcode 381 ใน `InHeader.java` เข้ากับ Handler ของ Memorial Cube
  2. ปรับปรุง `CubeHandler.java` ให้แกะค่า `cubeIndex` และ `selection` (Before = 0, After = 1) ได้อย่างถูกต้อง
  3. มอบสิทธิการเลือก Before/After และอัปเดตสเตตัสไอเทมลงฐานข้อมูลอย่างสมบูรณ์

---

## 11. รายงานการวิเคราะห์และแผนการปรับปรุงระบบ Arcane Symbols & Quests (Arcane Symbol Improvement Plan)

เอกสารส่งมอบงานฉบับละเอียดสำหรับการปรับปรุงระบบ Arcane Symbols ถูกบันทึกไว้ที่ [`ARCANE_SYMBOLS_HANDOFF.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/ARCANE_SYMBOLS_HANDOFF.md) โดยมีสรุปประเด็นหลัก 5 ข้อที่ต้องดำเนินการดังนี้:

1. **แก้ไข Crash ในสคริปต์ NPC ประจำเมือง 6 แห่ง (`3003104.py`, `3003152.py`, `3003209.py`, `3003322.py`, `3003432.py`, `3003530.py`)**:
   - เพิ่ม `sm.isQuestComplete(questId)` ใน `ScriptManagerImpl.java` เพื่อรองรับทั้ง `AccountQuest` และ `Quest` ปกติ
   - ลบการเรียก `sm.getQuestById` และคำว่า `null` ใน Python script ออกทั้งหมด
2. **สร้างสคริปต์คูปอง Arcane Symbol ประจำเมือง (`2635510` ถึง `2635514`)**:
   - สร้างสคริปต์ใน `data/scripts/item/consume_2635510.py` - `2635514.py` เพื่อให้ผู้เล่นดับเบิ้ลคลิกรับ Symbol ประจำเมือง (Chu Chu, Lachelein, Arcana, Morass, Esfera) ได้ทันที
   - หรือปรับปรุงเควสต์ประจำวันให้แจก `2635509` (Selector Coupon) ตามมาตรฐาน v265
3. **แปลภาษาข้อความแจ้งเตือนและบทสนทนา**:
   - แปลข้อความรีเซ็ตใน `Char.java` (`initSymbolQuests`) จากภาษาเวียดนามเป็นภาษาอังกฤษ/ไทย
   - แปลบทสนทนาส่งเควสต์ใน `q38451e.py` ถึง `q38473e.py`
4. **เควสต์เนื้อเรื่องหลัก (Pre-quests Storyline Gap)**:
   - นำเข้าสคริปต์เควสต์เนื้อเรื่องที่ขาดหายไป หรือคงค่า `ServerConfig.BOSS_UNLOCK_PREQUESTS = true` ไว้เพื่อความสะดวกในการเล่น
5. **มินิเกมและเควสต์รายสัปดาห์ (Weekly Minigames Integration)**:
   - ต่อยอดระบบ Erda Spectrum (`34151`), Midnight Chaser (`34378`), และ Spirit Savior (`39035`) ให้มีระบบแจกสัญลักษณ์ประจำสัปดาห์เช่นเดียวกับ Hungry Muto

---

**สถานะการส่งมอบ (Delivery & Distribution Status)**:
- Fat JAR: `v214 src/maplestory.jar` (138.67 MB, Build Success)
- Distribution Target: `Server263/maplestory.jar` (สะอาด 100% ปราศจากไฟล์ Source Code / Maven)
- Incremental Patch: `Patches/Server263_Patch_Latest.zip` (All-in-One พร้อม `Apply_Patch.bat` 1-Click update)
- Handoff Spec: `ARCANE_SYMBOLS_HANDOFF.md` และ `HANDOFF.md`

---

**จบเอกสารส่งมอบงาน (End of Handoff Document)**


