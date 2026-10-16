---
name: maplestory-server-runner
description: >-
  Essential knowledge, architectural reference, strict rules, and deployment policies for MapleStory Server Runner v265 (SwordieMS Core + Portable MariaDB 33066 + JDK 21 + Server263 Distribution). Use whenever the user asks to modify, develop, build, run, test, fix, or review MapleStory server code, boss scripts, HEXA Matrix skills, or distribution packages.
---

# MapleStory Server Runner Master Developer & Agent Guide

คู่มือสถาปัตยกรรม, กฎเหล็กความเสถียร, มาตรฐานสกิลคลาส 6 HEXA Matrix, ระบบบอส 129 ตัว, ระบบเครือข่าย Multi-Network, และแนวทางการพัฒนาโปรเจกต์ **MapleStory Server Runner v265** สำหรับ AI Agent และทีมพัฒนา เพื่อให้การทำงานในทุกเซสชันมีมาตรฐานเดียวกัน 100% ปราศจากข้อผิดพลาด

---

## 1. กฎเหล็กประจำโครงการ (Strict Rules — ห้ามละเมิดเด็ดขาด)

### 1.1 แพ็คเกจแจกจ่ายหลักคือ `Server263` (Official Distribution Package)
- โฟลเดอร์ **[`Server263/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263)** คือ **"ซอสที่ทำการแพ็คแล้วพร้อมแจกจ่าย"** และเป็นเป้าหมายหลักในการคอมไพลน์และส่งมอบไฟล์ (Deploy Target)
- ทุกครั้งที่คอมไพล์โค้ด Java สำเร็จ (`mvn clean package -DskipTests` หรือ `2_Build_Server.bat`) ไฟล์ `maplestory.jar` จะต้องถูกคัดลอกลงใน **`Server263/maplestory.jar`** เสมอ (รวมทั้ง `v214 src/` และ Root)
- **ห้าม** ใส่ Source Code, Build Tools (Maven), หรือไฟล์ชั่วคราวลงใน `Server263/`
- ต้องรันได้ทันที **100% ในทุกเครื่องและทุกไดรฟ์** (C:, D:, E:, USB, External Drive) โดยไม่ต้องติดตั้ง Java, Maven หรือ MariaDB ในระบบเครื่อง

### 1.2 กฎความ Portable ข้ามเครื่องและข้ามไดรฟ์ (Strict Portability Rules)
1. **ห้ามมี Hardcoded Path**: ห้ามเขียน Path เต็มแบบ `C:\...` หรือ `C:/Users/...` ลงในไฟล์คอนฟิก (`my.ini`, `server.properties`, batch scripts) โดยเด็ดขาด
2. **Path สัมพัทธ์และไดนามิก**:
   - ใช้ `%~dp0` ในไฟล์ Batch script เสมอ
   - MariaDB ใช้พอร์ต **`33066`** (หลบเลี่ยงพอร์ต `3306` ป้องกันการชนกับ MySQL ของระบบเครื่อง)
   - ลบไฟล์ `mariadb\data\my.ini` เก่าทิ้งอัตโนมัติก่อนรัน เพื่อป้องกันการจดจำ Path ของเครื่องเดิม
   - สคริปต์จะทำการ Generate `mariadb\my.ini` แบบไดนามิกตาม Directory ปัจจุบัน พร้อมครอบเครื่องหมายคำพูด `""` ป้องกันปัญหาโฟลเดอร์ที่มีช่องว่าง (Spaces in path)

### 1.3 โครงสร้างโฟลเดอร์มาตรฐาน & นโยบายความสะอาด (Clean Directory & Zero-Scratch Policy)
1. **Root Directory**: คงไว้เฉพาะ Smart Launchers (`*.bat`), `AGENTS.md`, `README.md`, `PROGRESS.md`, `backup.sql`, `maplestory.jar`
2. **รวมคู่มือทั้งหมดใน `docs/`**: เอกสารและคู่มือการใช้งานทั้งหมดต้องอยู่ใน [`docs/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/docs) (`MapleStory_Commands_Guide.md`, `HOW_TO_USE.txt`, `HOW_TO_PLAY_LAN.txt`)
3. **Zero-Scratch Policy**: ห้ามสร้างโฟลเดอร์ `scratch/` หรือปล่อยไฟล์สคริปต์ทดสอบชั่วคราวทิ้งไว้ในระบบ สคริปต์ที่ใช้ตรวจสอบชั่วคราวต้องลบทิ้งทันทีก่อนจบงาน
4. **ห้ามสร้างไฟล์ Handoff ย่อย**: ข้อมูลทั้งหมดต้องบันทึกใน [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS.md) และ [`AGENTS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/AGENTS.md) เท่านั้น

### 1.4 นโยบายการทดสอบและการจัดทำไฟล์แพตช์ (Testing-First & Single Patch Policy)
1. **กฎเหล็กการทดสอบก่อนทำแพตช์ (Strict Test-First Policy)**:
   - **ต้องทดสอบให้เรียบร้อยก่อนเสมอแล้วจึงค่อยทำไฟล์แพตช์**: เมื่อมีการแก้ไขโค้ด Java หรือสคริปต์ ให้ทำการคอมไพล์ รันเซิร์ฟเวอร์ และ**ทดสอบการทำงานจริงในเกม (In-Game Testing) ให้ผ่าน 100% ก่อนเสมอ** เพื่อให้มั่นใจว่าฟีเจอร์ทำงานถูกต้อง ไม่มี Error และไม่เกิด Client/Server Crash แล้วจึงค่อยรันสคริปต์สร้างไฟล์แพตช์
2. **รวมไฟล์แพตช์เป็นไฟล์เดียวเบ็ดเสร็จ (Single All-in-One Patch Archive)**:
   - ในโฟลเดอร์ **[`Patches/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches)** จะต้องมี **เพียงไฟล์เดียวเท่านั้น (Strictly Single File 100%)** คือ:
     - **`Patches/Server263_Patch_Latest.zip`**
   - ห้ามสร้างไฟล์แตกย่อยซ้ำซ้อน และห้ามเก็บไฟล์ zip ที่มี Timestamp ซ้ำซ้อน
3. **นโยบายไม่บีบอัดไฟล์ WZ ซ้ำ**:
   - ห้ามให้ผู้ใช้บีบอัดไฟล์ WZ Data (`data/wz265/` ~5 GB) ใหม่อีกเด็ดขาด ผู้ใช้จะบีบอัดตัวเต็มเพียงครั้งเดียว และใช้วิธีนำไฟล์แพตช์ไปวางทับใน `Server263/` ด้วย `Apply_Patch.bat`

### 1.5 คำสั่งลับสำหรับทดสอบระบบเฉพาะผู้พัฒนา (Private Admin Testing Commands: `!endgame`)
- **ห้ามใส่ปุ่มโกงลงในสคริปต์สาธารณะ**: ไฟล์สำหรับแจกจ่ายผู้เล่นทั่วไป (`quick_adminNPC.py`, `PlayerCommands.java` ฯลฯ) ต้องสะอาด 100%
- **การทดสอบทำผ่านคำสั่งลับระดับ Admin เท่านั้น** (`requiredType = Admin` ใน `AdminCommands.java` บัญชี `admin`/`admin`):
  - `!endgame` หรือ `!test6` หรือ `!boost` หรือ `!endgame <class_name>`
- **มาตรฐานผลลัพธ์ของคำสั่ง `!endgame` (Strict Zero-Skill-Injection Standard)**:
  - ปรับเลเวล 260, ฟื้นฟู HP/MP 100%, แต้ม AP 1,250
  - สำเร็จเควสต์คลาส 5 (1460-1466) และเควสต์คลาส 6 (1488) แบบ `noRewards = true` ป้องกันเควสต์แจกลูกแก้ว Arcane Symbol อัตโนมัติ
  - มอบแต้ม SP เต็มพิกัดผ่าน ExtendSP เพื่อให้อัปสกิลคลาส 1–4 ตามธรรมชาติ
  - มอบ Nodestones x3,000 (`2435719`), Experience Nodestones x20, Sol Erda Energy x1,000, Sol Erda Fragments x30,000, Power Elixir x3,000
  - มอบอุปกรณ์ BiS ครบเซ็ต (Arcane Umbra, Princess No Secondary, Emblem) และเงิน 10B Mesos
  - ⚠️ **กฎเหล็กเด็ดขาด (Strict Zero Skill Injection Policy)**:
    - **ห้ามเรียก `chr.addSkill`, `chr.setHexaSkill`, หรือ `mc.setSkillLevel` ใน `!endgame` โดยเด็ดขาด**
    - **ผู้เล่นจะเป็นผู้กดเปิดหิน Nodestones, ปลดล็อกแกน HEXA Matrix, และจัดสรรแต้ม SP ด้วยตนเองตามกลไกธรรมชาติของระบบเกม เพื่อป้องกัน Skill Book เสียหาย 100%**

### 1.6 มาตรฐานการ Push Git และบันทึก Progress (Git Sync & Lean Progress Standard)
1. **กฎเหล็กการ Push Git ทุกอย่าง (Push Everything Policy)**:
   - **ต้อง Push ทุกอย่าง รวมถึงไฟล์เอกสารทั้งหมดเสมอ**: เมื่อทำการ Git Commit & Push จะต้องทำ `git add .` หรือระบุทุกไฟล์ที่มีการเปลี่ยนแปลง รวมถึงไฟล์เอกสาร (`PROGRESS.md`, `AGENTS.md`, `README.md`, `docs/*`, scripts, configs, tools)
   - **ห้ามเว้นไฟล์เอกสารหรือปล่อยค้างไว้ที่ Local เด็ดขาด**
2. **มาตรฐานการบันทึกและแจกแจง Progress (`PROGRESS.md`)**:
   - ต้องระบุเวลาที่แก้ไขเสมอ: บันทึกทั้งวันที่และเวลาจริง เช่น `[2026-10-16 18:05 น.]` หรือ `e8c54c5d (18:05 น.)`
   - โครงสร้าง 2 บล็อกหลัก: Problem -> Cause -> Fix -> Outcome
   - รักษาความกระชับ (Lean Progress): คงไว้เฉพาะประวัติและฟีเจอร์เวอร์ชันปัจจุบัน ซิงค์ตรงกันทั้งใน `v214 src/PROGRESS.md` และ Root `PROGRESS.md`

---

## 2. สถาปัตยกรรมและรายละเอียดทางเทคนิค (Architecture & Technical Specs)

### 2.1 พอร์ตและระบบเครือข่าย (Port & Network Routing)
- **Database Port:** `33066` (Default), `33076` (Backup)
- **Login Port:** `8484`
- **API Port:** `8483`
- **World 19 (Scania) Channels 1–10:** `8585` – `8594`
- **Multi-Network Smart Routing:**
  - `Localhost.dll` ดึง IP จาก `launcher.ini` อัตโนมัติ (ไม่ Hardcode 127.0.0.1)
  - `NettyClient.getEffectiveChannelIp()` ส่ง IP `127.0.0.1` ให้เครื่อง Localhost และส่ง IP ภายนอก (LAN / VPN) ให้ผู้เล่นวงเน็ตเวิร์กอื่น ทำให้เล่นพร้อมกันได้โดยไม่ตัดการเชื่อมต่อตอนเปลี่ยนแชนแนล

### 2.2 โครงสร้างฐานข้อมูล (Zero-Install MariaDB)
- **Database Name:** `vietmaple` (UTF-8, 110 ตาราง)
- **User / Password:** `root` / `root`
- **Connection Pool:** HikariCP
- **ข้อควรระวังสำคัญ (Database Gotchas)**:
  - ในการบันทึกเควสต์ (`QuestProgressRequirement.saveToSQL`): **ห้ามเปิด Connection ใหม่จาก DatabaseManager ขณะที่ยังอยู่ใน Transaction** เพราะจะเกิด InnoDB Deadlock (`Lock wait timeout exceeded (50s)`). ให้ส่ง `Connection con` ที่เปิดอยู่แล้วเข้ามารันใน Transaction เดียวกันเสมอ
  - ตาราง `questprogressrequirements` ไม่มีคอลัมน์ `charid` (มีเฉพาะใน `questprogressrequirements_acc` สำหรับ Account Quests)

### 2.3 การแก้ปัญหา Portable MariaDB ถูกบล็อกโดย Windows 11 Device Guard / Smart App Control (SAC)
- **อาการ/ข้อความ Error**:
  ```text
  '...\Server263\mariadb\bin\mysqld.exe' was blocked by your organization's Device Guard policy.
  Contact your support person for more info.
  ```
- **สาเหตุเชิงลึก**:
  1. ใน **Windows 11 (22H2 / 23H2 / 24H2)** ระบบเปิดใช้งานฟีเจอร์ **Smart App Control (SAC)** เป็นค่าเริ่มต้น
  2. ตัว Engine ของ SAC ทำงานผ่านระบบเคอร์เนลของ **Windows Defender Application Control (WDAC) / Device Guard**
  3. ไฟล์ `mysqld.exe` ของ MariaDB Portable เป็น Unsigned Binary (`Status: NotSigned`) ไม่มี Digital Signature ระดับองค์กร เมื่อ SAC หรือ Device Guard ตรวจจับจะสั่งบล็อกการ Exec ทันที
  4. ไฟล์ที่ดาวน์โหลดผ่านอินเทอร์เน็ตจะติดสตรีมความปลอดภัย `Zone.Identifier` (Mark of the Web) เพิ่มความเข้มงวดในการบล็อก
- **แนวทางแก้ไข (Solution Workflow)**:
  1. **ปิด Smart App Control ใน Windows 11** (วิธีหลักที่ได้ผล 100%):
     - ไปที่ `Windows Security` -> `App & browser control` -> `Smart App Control settings`
     - สลับสถานะเป็น **`Off` (ปิด)**
  2. **ปลดบล็อก Mark of the Web ด้วย PowerShell**:
     - รันผ่าน Command Prompt / PowerShell:
       ```cmd
       powershell -Command "Get-ChildItem -Path '<Path>' -Recurse | Unblock-File"
       ```
  3. **ตรวจสอบ Work/School Account**:
     - หากเป็นเครื่องส่วนตัวแต่เชื่อมต่ออีเมลสถาบัน ให้ไปที่ `Settings` -> `Accounts` -> `Access work or school` แล้วกด Disconnect เพื่อล้างนโยบาย Device Guard ภายนอกออก

---

## 3. มาตรฐานการพัฒนาสกิลคลาส 6 & HEXA Matrix

### 3.1 รูปแบบ Origin Skill (6th Job)
1. **ใน `handleSkill()`**:
   - มอบสถานะอมตะ: `tsm.putCharacterStatValue(CharacterTemporaryStat.IndieNotDamaged, option)` ระยะเวลา 7 วินาที
   - ส่งแพ็กเก็ตคัทซีนปาร์ตี้: `chr.write(UserLocal.showHexaSkillEff(chr, skillID))`
2. **ใน `handleAttack()`**:
   - ติดสถานะ Absolute Bind ให้มอนสเตอร์: `MobStat.Freeze` (10 วินาที)
   - ติดสถานะ Origin Debuff: `MobStat.OriginDebuff` (20 วินาที) ด้วย `EnumMap<MobStat, Option>`

### 3.2 รูปแบบ HEXA Mastery Skills & Sub-Skill Redirection
- สกิลคลาส 6 หลายสกิลมี Sub-action packet IDs แยกย่อย (เช่น คอมโบหลายจังหวะ หรือเอฟเฟกต์ระเบิด)
- **ต้องแมปใน `SkillConstants.getActualSkillIDfromSkillID(int skillID)` เสมอ**: เพื่อให้เซิร์ฟเวอร์ดึงค่า Skill Level และ Mastery จากสกิลหลักได้อย่างถูกต้อง ป้องกันปัญหาดาเมจเป็น 0 หรือ NullPointerException
- **การเชื่อมโยงระบบเกจ (Gauges)**: นำรหัสสกิลคลาส 6 ไปใส่ในฟังก์ชันสะสมเกจของอาชีพนั้นๆ เสมอ เช่น:
  - Kaiser: `incrementMorphGauge()`
  - Hayato: `incrementSwordEnergy()` (+5 ท่าดาบปกติ, +2 ดึงดาบ)
  - Kanna: `isSpiritWalkerSkill()` สำหรับเกิดเส้นชีพจรวิญญาณ (Mana Veins)
  - Lara: ธาตุ Earth/River/Wind/Sun interaction

### 3.3 ข้อควรระวังและกลไกเฉพาะกลุ่ม Explorer Thief (Thief, NL, Shadower, DB)
1. **Shadow Walker (400001023)**: โจมตีโดยไม่หลุด Dark Sight
   - ใน `handleAttack()` ของ `Thief`, `NightLord`, `Shadower`, `DualBlade` จะต้องเช็ค `Option dsOpt = tsm.getOption(DarkSight); if (dsOpt == null || dsOpt.rOption != SHADOW_WALKER)` เสมอ ห้ามลบ Dark Sight ทิ้งหากเกิดจาก Shadow Walker
   - ใน `handleSkill()` ต้องมอบ `IndiePMdR` (Final Damage) ควบคู่กับ `DarkSight` เสมอ
2. **Dual Blade `lastShadowMeld`**: ต้องเป็น Instance Variable (`private long lastShadowMeld`) ห้ามเป็น `static` เพื่อป้องกันผู้เล่นทั้งเซิร์ฟเวอร์แชร์ Internal Cooldown ร่วมกัน
3. **Shadow Assault Packet Decoding**: ใน `SkillConstants.isShadowAssault()` ต้องครอบคลุมทั้ง 5th Job (400041002-400041005) และ 6th Job HEXA Shadow Assault (4241006-4241010) มิฉะนั้น `AttackHandler` จะข้ามการ Decode `teleportByte` และ `teleportPt` ส่งผลให้ Packet หลุด Alignment (Desync)
4. **Shadower Shadow Assault Stack**: ต้องเช็ค `!chr.hasSkillOnCooldown(SHADOW_ASSAULT)` ก่อนเติมสแต็กใน `update()` และสั่งเริ่มคูลดาวน์เมื่อสแต็กหมด
5. **Night Lord SOSI & Random Bound Guard**: ต้องเช็ค Null-safety บน Shoot Object Single Info ใน Barrage และป้องกัน Random Bound `<= 0` ใน `handleMark()`

### 3.4 ข้อควรระวังและกลไกเฉพาะกลุ่ม Legend / Heroes (Aran, Evan, Mercedes, Phantom, Luminous, Shade)
1. **Aran (อารัน)**:
   - **Surging Adrenaline Duration**: ค่าระยะเวลาในบัฟต้องเป็น `+ 5` วินาที ไม่ใช่ `+ 5000` (ที่จะกลายเป็น 5,000 วินาที)
   - **Combo Accumulation**: ใน `handleAttack()` ต้องนับ Hit โจมตีของทุกม็อบ (`mai.damages.length`) เพื่อเรียก `setCombo(getCombo() + comboGain)` เสมอ มิฉะนั้นคอมโบจะไม่ขึ้นตามธรรมชาติ
   - **Maha's Fury Cooldown**: คูลดาวน์ 3 วินาทีของท่าโจมตีต้องลงที่ `MAHAS_FURY_ATTACK` (400011020) ห้ามลงที่ `MAHAS_FURY_BUFF` (400011016) ซึ่งจะไปทับคูลดาวน์ 150 วินาทีของบัฟ
2. **Evan (เอวาน)**:
   - **Job Advancement Lv.100**: หลังรีแวมป์ คลาส 4 ของ Evan คือ Job ID `2217` (รหัส 2218 ไม่มีอยู่จริง) การเรียก `setJob` หรือ `addSpToSpecificJob` ต้องใช้ `2217` เท่านั้น
   - **Mir Stage 9 (2220) & 6th Job Crash**: ใน MapleStory v265 โหนดแอนิเมชันสกิลคลาส 6 (`6thDragonSwift`, `6thDragonDive`, `6thDragonBreath` ฯลฯ) มีเฉพาะใน `Skill.wz/Skill_00007/Dragon/2220.xml` เท่านั้น หากเสก Mir ด้วย Job `2217` (Stage 8) เมื่อกดสกิลคลาส 6 ไคลเอนต์จะหาโหนดไม่เจอและ Crash ทันทีด้วย `0x22000006` (`INVALID_GAME_DATA`) ต้องกำหนด Job ของ Mir ให้เป็น `2220` เสมอเมื่อตัวละครมีสกิลคลาส 6 หรือเลเวล 260+
   - **Magic Debris Rect Guard**: เช็ค `if (si == null || si.getFirstRect() == null) return;` ก่อนคำนวณ Force Atom
   - **Evan Fusion & Force Skills**: ต้องลงทะเบียนสกิลคลาส 6 ครบทั้ง `isEvanForceSkill`, `isEvanFusionSkill` และ `getActualSkillIDfromSkillID` เพื่อให้ Packet Decoding และการคำนวณ Damage/Wreckage ถูกต้อง 100%
3. **Mercedes (เมอร์เซเดส)**:
   - **Array Containment Bug**: `summonAttacks` เป็น `int[]` ห้ามใช้ `Collections.singletonList(summonAttacks).contains(...)` เพราะจะได้ `List<int[]>` ให้ใช้ `Arrays.stream(summonAttacks).anyMatch(id -> id == skillId)`
   - **Ignis Roar Stack**: ตรวจสอบการมีสกิลด้วย `chr.hasSkill(IGNIS_ROAR)` ห้ามเช็ค `tsm.hasStat(RpSiksin)` (ซึ่งเป็น CTS ของ Kanna)
4. **Phantom (แฟนทอม)**:
   - **IsCaneSkill Detection**: ต้องรวมรหัสคลาส 6 (`HEXA_MILLE_AIGUILLES`, `DEFYING_FATE`, `DEFYING_FATE_ATTACK`) ไว้ใน `isCaneSkill()` เพื่อให้สะสม Phantom's Mark และชาร์จไพ่ได้ครบ
   - **Ace in the Hole & WZ Rect**: ตรวจสอบ null-safety สำหรับ `si.getFirstRect()` เสมอ
5. **Luminous (ลูมิเนียส)**:
   - **Ray of Redemption Party Healing**: ฮีลผู้ร่ายและสมาชิกทุกคนในปาร์ตี้ที่อยู่ในแผนที่เดียวกันผ่าน `chr.getParty().getPartyMembersInSameFieldWithChr(chr)`
   - **Cooldown Synchronization**: จัดการ Cooldown ใน `handleSetCoolDownSkill()` สำหรับ Origin `HARMONIC_PARADOX`, `HEXA_ENDER`, `HEXA_REFLECTION`, `HEXA_APOCALYPSE`
6. **Shade (อึนวอล)**:
   - **Fox Spirits Rect Guard**: เพิ่ม Fallback Rect ป้องกัน NPE กรณี `si.getFirstRect() == null`
   - **Summon Other Spirit Revive**: ใช้ข้อความภาษาอังกฤษมาตรฐาน ไม่ฮาร์ดโค้ดภาษาเวียดนาม

### 3.5 คำสั่ง `!endgame` และการจัดการอุปกรณ์/สกิลอย่างถูกต้อง (Best Practices for Endgame Setup)
1. **การเลื่อนขั้นอาชีพอัตโนมัติ (`setupEndgame`)**:
   - ต้องดักจับ Beginner Jobs ของกลุ่ม Legend (2000-2005) และสายอาชีพเริ่มต้น เพื่อเปลี่ยนไปยังคลาส 4 ที่ถูกต้องเสมอ:
     - Aran: `2112`, Evan: `2217` (ห้ามเป็น 2218), Mercedes: `2312`, Phantom: `2412`, Luminous: `2712`, Shade: `2512`
   - รองรับ Alias ที่ผู้เล่นคุ้นเคย เช่น `!endgame eunwol` ชี้ไปยัง Shade
2. **รหัสอุปกรณ์ BiS ตรงสายอาชีพ 100% (Verified via WZ String Data)**:
   - **Aran**: Arcane Umbra Polearm (`1442274`), Princess No's Flower Ballast (`1352935`), Mitra Warrior Emblem (`1190555`), ชุดเกราะ Warrior 6 ชิ้น
   - **Evan**: Arcane Umbra Staff (`1382265`), Princess No's Dragon Legacy (`1352945`), Mitra Magician Emblem (`1190557`), ชุดเกราะ Mage 6 ชิ้น
   - **Mercedes**: Arcane Umbra Dual Bowguns (`1522143`), Princess No's Accursed Arrow (`1352009`), Mitra Bowman Emblem (`1190556`), ชุดเกราะ Archer 6 ชิ้น
   - **Phantom**: Arcane Umbra Cane (`1362140`), Princess No's Carte (`1352109`), Mitra Thief Emblem (`1190558`), ชุดเกราะ Thief 6 ชิ้น
   - **Luminous**: Arcane Umbra Shining Rod (`1212120`), Princess No's Soul Orb (`1352406`), Mitra Magician Emblem (`1190557`), ชุดเกราะ Mage 6 ชิ้น
   - **Shade**: Arcane Umbra Knuckle (`1482221`), Princess No's Fox Marble (`1353105`), Mitra Pirate Emblem (`1190559`), ชุดเกราะ Pirate 6 ชิ้น
3. **หลักการจัดการสกิลอย่างเป็นธรรมชาติ (Natural Skill Integrity)**:
   - **ห้ามแอดสกิลมั่ว**: ห้ามใช้ `chr.addSkill()` อัด sub-action/invisible action IDs ใส่ตัวละครโดยเด็ดขาด เพราะจะทำให้ Skill Book ล้น มีไอคอนที่กดไม่ได้ และรบกวน UI
   - สกิลคลาส 1-4 ให้อัปเต็มผ่าน `chr.maxSkills()` และแจก SP ใน ExtendSP อย่างสมบูรณ์
   - สกิล V-Matrix และ HEXA Matrix ให้แจกวัตถุดิบและอุปกรณ์ให้เพียงพอ เพื่อให้ผู้เล่นเปิดและอัปเกรดตามธรรมชาติในตัวเกม:
     - Sol Erda Energy x1,000 (`2636421`)
     - Sol Erda Fragments x30,000 (`4009548`)
     - Nodestones x3,000 (`2435719`)
     - Experience Nodestones x500 (`2437760`)
     - Power Elixirs x5,000 (`2000005`)
     - เงิน 10B Mesos

### 3.6 วงจรชีวิตการสร้างตัวละครและการบังคับเกิดที่ Henesys (Starter Lifecycle & Henesys Spawn Bypass)
1. **สาเหตุของปัญหาตัวละครเริ่มเกมใช้สกิล/กดยาไม่ได้เมื่อเกิดที่ Henesys**:
   - เมื่อเซิร์ฟเวอร์ตั้งค่าบังคับให้ตัวละครใหม่เกิดที่ Henesys (100000000) ใน LoginHandler.java จะเป็นการข้ามแมพ Tutorial ทั้งหมด
   - อาชีพที่ไม่มี Starter Lifecycle จะค้างอยู่ที่ **Lv. 1 / Beginner Job** โดยมี HP 50 / MP 50, มีเฉพาะสกิลพื้นฐาน (โจมตีปกติ/ก้ม/กระโดด), ไม่มีอาวุธหลักหรือรองสวมใส่อยู่
   - **กดยาไม่ได้**: เนื่องจากตัวละคร Lv. 1 มีเลือดเต็ม 50/50 อยู่แล้ว ระบบเซิร์ฟเวอร์จะปฏิเสธแพ็กเก็ตการใช้ยาเพิ่มเลือด (Potion rejected because HP is 100%)
   - **ใช้สกิลไม่ได้**: ไม่มีอาวุธสวมใส่และไม่มีสกิลคลาส 1 เพราะไม่ได้ผ่านเควสต์เปลี่ยนอาชีพใน Tutorial
   - **Aran พิเศษ**: JobConstants.isAran ต้องมี JobEnum.LEGEND (2000) และใน JobManager ต้องไม่มีคลาส Legend::new สตับเปล่ามาดักจับ
2. **มาตรฐาน Starter Lifecycle 3 สเต็ปสำหรับทุกอาชีพ**:
   - **สเต็ป 1: setCharCreationStats(Char chr)**:
     - เซ็ตเลเวลเริ่มต้นเป็น Lv. 10 ทันที
     - เปลี่ยนเป็น 1st Job ID (เช่น Aran: 2100, Evan: 2210, Mercedes: 2300, Phantom: 2400, Luminous: 2700, Shade: 2500, Hayato: 4100, Mihile: 5100)
     - เซ็ต Max HP 1,000, Max MP 500 (Luminous MP 1,000)
     - มอบ SP 5 แต้มลงในช่อง SP คลาส 1
   - **สเต็ป 2: addItemToNewCharacter(Char chr)**:
     - สวมใส่อาวุธเริ่มต้นและอาวุธรอง (Secondary Weapon) ลงในช่อง Equipped ทันที
   - **สเต็ป 3: handleInitAfterMigrate(Char chr)**:
     - ดักจับเมื่อผู้เล่นเข้าสู่เกมครั้งแรก (if (chr.getLevel() < 30))
     - สำเร็จเควสต์เปิดตัว/เนื้อเรื่องเริ่มต้นทั้งหมด
     - เรียก chr.levelUntil(30) และเปลี่ยนอาชีพเป็น 2nd Job
     - มอบและสวมใส่อาวุธ Lv. 30 และ Secondary Weapon Lv. 30
     - วาร์ปตัวละครสู่ Henesys (100000000) อย่างปลอดภัย
3. **ตารางรหัส Secondary Weapon ประจำอาชีพ**:
   - **Aran**: 1st 1352930 (Maha's Weight), 2nd 1352931 (Maha's Pendant), BiS 1352935 (Princess No's Flower Ballast)
   - **Evan**: 1st 1352940 (Dragon Document), 2nd 1352941, BiS 1352945 (Princess No's Dragon Legacy)
   - **Mercedes**: 1st 1352000 (Magic Arrow), 2nd 1352001, BiS 1352009 (Princess No's Accursed Arrow)
   - **Phantom**: 1st 1352100 (Carte Blanche), 2nd 1352101, BiS 1352109 (Princess No's Carte)
   - **Luminous**: 1st 1352400 (Light Orb), 2nd 1352401, BiS 1352406 (Princess No's Soul Orb)
   - **Shade**: 1st 1353100 (Fox Marble), 2nd 1353101, BiS 1353105 (Princess No's Fox Marble)
   - **Hayato**: 1st 1352800 (Wakizashi), 2nd 1352801, BiS 1352803 (Princess No's Wakizashi)
   - **Kanna**: 1st 1352810 (Haku Fan), 2nd 1352811, BiS 1352813 (Princess No's Haku Fan)
   - **Mihile**: 1st 1098000 (Soul Shield), 2nd 1098001, BiS 1098007 (Justice Soul Shield)
4. **ความปลอดภัยของระบบและการป้องกัน Client Freeze**:
   - **Henesys lockUI Removal in Job.java**: ห้ามมีคำสั่ง if (chr.getFieldID() == FieldConstants.START_MAP) sm.lockUI(); ใน handleInitAfterField() เด็ดขาด เพราะจะส่งแพ็กเก็ตล็อก UI ทำให้ตัวละครกดคีย์ลัด สกิล และยาไม่ได้เมื่อเกิดที่ Henesys
   - **Kanna Haku Null Safety**: ตรวจสอบ Null Check ใน spawnHaku() (if (chr == null || chr.getField() == null || chr.getFoxMan() == null || chr.getSkillPet() == null) return;) ป้องกันเซิร์ฟเวอร์ Crash
   - **Evan Mir & Partners Buff**: ตรวจสอบ Null Check ก่อนเรียกใช้เสมอ (if (dragon != null) { ... }) ป้องกัน NPE ระหว่างการย้ายแมพ
   - **Undefined NPC/Reactor Fallback**: ใน ScriptManagerImpl.undefined() ห้ามเปิดหน้าต่างสนทนาค้างไว้ ให้แจ้งข้อความในกล่องแชท chr.chatMessage(...) และเรียก chr.dispose() ทันที เพื่อป้องกันตัวละครติดสถานะล็อกขยับไม่ได้

### 3.4 กลไกการเกิดและแอนิเมชันของสัตว์คู่หู Evan Mir & Kanna Haku (Companion Life & 6th Job Stage Evolution)
1. **มังกร Mir กับสกิลคลาส 6 (HEXA Matrix Animation Desync Bug)**:
   - **ปัญหา**: เมื่อ Evan ปลดล็อกสกิลคลาส 6 (เลเวล >= 260 หรือมีสกิล HEXA Matrix เช่น Zodiac Burst, HEXA Flash, HEXA Dive) ตัว Client จะเรียกหาท่าทางของ Mir ตระกูล `6thDragon*` ใน WZ Data
   - **โครงสร้าง WZ**: `Skill.wz/Skill_00007/Dragon/2217.xml` (Stage 8) มีเพียง 17 actions ไม่มีโหนดคลาส 6; ส่วน `2220.xml` (Stage 9) มีครบ 26 actions รวมถึงโหนดคลาส 6 ทั้ง 9 ท่า
   - **กฎเหล็ก**: 
     - ใน `Dragon.java`, `Evan.spawnDragon()`, และ `Evan.getDragon()` ต้องตรวจสอบสถานะคลาส 6 หากเลเวล >= 260 หรือมีสกิลคลาส 6 ให้ตั้งค่า `dragon.setJob(2220)` เสมอ
     - หากมังกรเคยอยู่ในแมพแล้วเปลี่ยน Job stage ต้อง Despawn แล้ว Respawn เป็น Stage 9 เพื่อให้ Client โหลด WZ โหนด 2220
     - ป้องกัน Client C++ Exception `0xE06D7363` (`INVALID_GAME_DATA 0x22000006`) อย่างถาวร
2. **การปลดบล็อก Companion Spawning สำหรับ GM ใน `Char.java`**:
   - ห้ามมีเงื่อนไข `if (!isGM)` กั้นการเรียก `evan.spawnDragon()` หรือ `kanna.spawnHaku()` หรือ Android ใน `Char.java` (บรรทัด ~4950) เด็ดขาด เพื่อให้ตัวละครทุกประเภทเรียกสัตว์เลี้ยงคู่หูได้ถูกต้อง
3. **การลงทะเบียน HEXA Magic Debris (22201015) & HEXA Dragon Spark (22200016)**:
   - สกิล `22201015` คือ HEXA Enhanced Magic Debris ต้องผูกใน `Evan.java` (`getDebrisSkill`, `getMaxDebris`, `createMagicDebrisForceAtom`, `createWreckage`, `handleSkill`) และ `SkillConstants.java` (`isForceAtomSkill`)
   - สกิลคลาส 6 ของ Mir (`22201011`, `22201007`, `22201003`) ต้องลงทะเบียนใน `SkillConstants.isNoCoolDownAttack()` เพื่อป้องกันปัญหาคูลดาวน์ซ้อนและมานาลดผิดปกติ

---

## 4. สถาปัตยกรรมระบบบอส (Universal Boss Entry Architecture)

### 4.1 สถาปัตยกรรม `BossEntry.java`
- คลาส [`BossEntry.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/BossEntry.java) เป็นจุดศูนย์กลางในการจัดการข้อมูลบอสทั้ง 129 รายการ
- รองรับการเข้าบอสผ่าน **Boss UI (Content Guide match button)** โดยตรงเข้าสู่ Private Instance
- รองรับการเข้าแบบ **Infinite Runs**: ไม่จำกัดรอบต่อวัน/สัปดาห์ สำหรับการเล่นแบบออฟไลน์/LAN
- รองรับการบายพาสเควสต์เนื้อเรื่อง: เมื่อเปิด `server.bossUnlockPrequests=true` ใน `server.properties` ระบบจะสำเร็จเควสต์ทางเข้าบอสให้อัตโนมัติใน `Char.initQuests()`

### 4.2 ระบบแท่นบูชาและทางออก (Altars, Reactors & Exit Handlers)
- บอสที่มีแท่นบูชา (เช่น Root Abyss): ต้องสร้างสคริปต์ใน `data/scripts/reactor/` และเรียกฟังก์ชัน `cleanReactor()` เพื่อนำแท่นบูชาออกเมื่อบอสเกิด ป้องกันการกดซ้ำ
- ประตูทางออก (Exit Portals / NPCs): ต้องมีสคริปต์รองรับการออกจากห้องบอสคืนสู่แมพหน้าประตูเสมอ เช่น `sm.exitBoss()` หรือการวาร์ปคืนสู่ `forcedReturn`

---

## 5. กระบวนการทำงานที่เป็นมาตรฐาน (Standardized Workflow: Development, Build, Test & Patch)

```text
[แก้ไขโค้ด Java หรือ Python Script]
            │
            ▼
[รัน Maven Package ใน v214 src (2_Build_Server.bat)]
            │
            ▼
[ตรวจสอบ BUILD SUCCESS]
            │
            ▼
[Deploy maplestory.jar ไปยัง Server263/ และ Root]
            │
            ▼
[รันเซิร์ฟเวอร์และทดสอบจริงในเกม (In-Game Testing) ให้ผ่าน 100%]
            │
            ▼
[สร้างไฟล์แพตช์เดี่ยวผ่าน tools/create_patch.py -> Patches/Server263_Patch_Latest.zip]
            │
            ▼
[บันทึก PROGRESS.md ทั้ง root และ v214 src/ พร้อมระบุเวลาจริง]
            │
            ▼
[Git Add & Git Commit & Git Push ทุกอย่างรวมถึงเอกสารทั้งหมด]
```

---

## 6. มาตรฐานการพอร์ตและตรวจสอบข้อมูลอ้างอิงข้ามเวอร์ชัน (TMS Reference & Strict ID Audit)

1. **บทบาทของคลังข้อมูลอ้างอิงหลัก (Reference Repository)**:
   - โฟลเดอร์ `TMS277_REF_NomainSource/tms273/`:
     - `script/event/`: แมคคานิคบอส 81 ตัว (Kalos, Kaling, Seren, Limbo, Extreme Lotus, Black Mage ฯลฯ)
     - `script/boss/`: ตารางดรอปและคำนวณของรางวัลบอส (`BOSS_REWARD_APPLY.js`, `boss_crystallize.js`)
     - `script/ScriptAPI.d.ts`: นิยามเมธอดของระบบ Script Engine (2,067 บรรทัด)
     - `data/MobReward/`: ข้อมูลอัตราการดรอปของมอนสเตอร์ 1,987 ตัว
     - `data/Shop/`: สินค้าร้านค้า NPC 169 ร้าน
   - **จุดประสงค์หลักในการใช้งาน TMS REF**:
     - **ใช้เป็น Reference สูตรการคำนวณ**: ใช้สำหรับอ้างอิงสูตรคำนวณตัวเลข (Formulas), Logic การคิดความเสียหาย/อัตราการดรอป, และระบบ Event Mechanics
     - **ส่วนไหนใน TMS ที่ทำไว้สมบูรณ์และเป็นมาตรฐาน**: สามารถดึงมาเป็น Reference และพอร์ตมาปรับใช้เข้ากับเซิร์ฟเวอร์ v265 ของเราได้ทันที
2. **กฎเหล็กการตรวจสอบ ID ป้องกันความคลาดเคลื่อน (Strict ID & Asset Audit Policy)**:
   - ⚠️ **ต้องเช็คทุกครั้งว่า ID ตรงกับ v265 หรือไม่ ห้ามคัดลอก ID จาก TMS มาใส่ในโค้ดหรือฐานข้อมูล v265 ตรงๆ โดยเด็ดขาด**:
     - **Mob IDs**: ตรวจสอบกับ `Server263/data/wz265/Mob.wz/<MobID>.img.xml` และ `String.wz/Mob.img.xml`
     - **Item IDs**: ตรวจสอบกับ `Server263/data/wz265/Item.wz/` และ `Character.wz/` กรองไอเทม TMS Exclusive ทิ้ง
     - **Map IDs**: ตรวจสอบกับ `Server263/data/wz265/Map.wz/Map/Map<X>/<MapID>.img.xml` ป้องกันจอดำ
     - **Reactor IDs & Portals**: ตรวจสอบกับ `Server263/data/wz265/Reactor.wz/`
3. **ขั้นตอนการพอร์ตที่เป็นมาตรฐาน**:
   - **Step 1: Automated Asset Audit**: สแกน IDs ทั้งหมดในสคริปต์ต้นทางเทียบ WZ v265 ผ่าน Python Checker
   - **Step 2: Script Logic Translation**: แมปคำสั่ง ScriptAPI (JavaScript) ➔ SwordieMS (Python/Java)
   - **Step 3: Verification & In-Game Testing**: ทดสอบในเกมผ่านตัวละคร Admin ให้ผ่านสมบูรณ์ 100%
   - **Step 4: Update Documentation & Git Push**: บันทึกใน `PROGRESS.md` ตามมาตรฐาน และ Git Push ทุกไฟล์รวมทั้งเอกสาร

