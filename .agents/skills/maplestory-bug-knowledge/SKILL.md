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

### 1.3 นโยบายการแจกจ่ายแบบ Patch (Incremental Patch Policy)
- **ห้ามบีบอัดไฟล์ WZ ใหม่อีกเด็ดขาด**: ไฟล์ WZ Data (`data/wz265/`) มีขนาดใหญ่มาก (~5 GB, ~400,000 ไฟล์) ผู้ใช้จะทำการบีบอัดไฟล์ตัวเต็ม (Base Package) เพียงครั้งเดียวเท่านั้น
- **เมื่อมีการแก้ไขโค้ดหรืออัปเดตระบบ**: จัดเตรียมเฉพาะ **"ไฟล์แพตช์ (Incremental Patch)"** ผ่าน [`Create_Update_Patch.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Create_Update_Patch.bat) ซึ่งจะรวมเฉพาะ:
  - `maplestory.jar` (~138.64 MB)
  - สคริปต์ใน `data/scripts/` (NPC, บอส, เควสต์, พอร์ทัล)
  - `Client_Patch_Files/` (Launcher, Localhost.dll, config)
  - `server.properties` และ Batch scripts
- ผู้เล่นนำไปลงทับด้วย `Apply_Patch.bat` ได้ใน 2 วินาที โดยไม่แตะต้องไฟล์ WZ และรักษาฐานข้อมูลตัวละคร 100%

### 1.4 การทดสอบผ่านคำสั่งลับระดับ Admin เท่านั้น (Private Admin Testing Commands)
- **ห้ามใส่ปุ่มโกงหรือเมนูทดสอบลงในสคริปต์สาธารณะเด็ดขาด**: ไฟล์สำหรับแจกจ่ายผู้เล่นทั่วไป (`quick_adminNPC.py`, `PlayerCommands.java` ฯลฯ) ต้องสะอาด 100%
- **การทดสอบทำผ่านคำสั่งลับระดับ Admin เท่านั้น** (`requiredType = Admin` ใน `AdminCommands.java` บัญชี `admin`/`admin`):
  - `!endgame` หรือ `!test6` หรือ `!boost` (ปรับเลเวล 260, สกิลคลาส 1-4 เต็ม, สกิล V-Matrix และ HEXA คลาส 6 Lv.30 เต็ม, อาวุธ Arcane Umbra, เงิน 2B Mesos, Sol Erda Energy x20, Sol Erda Fragment x1,000)
  - `!endgame <class_name>` สำหรับเปลี่ยนอาชีพและรับของฟูลเซ็ตทันที เช่น `!endgame hayato`, `!endgame kanna`, `!endgame khali`, `!endgame lara`, `!endgame kain`, `!endgame illium`, `!endgame ark`, `!endgame hoyoung`
- เมื่อเพิ่มหรือปรับแก้คลาสใหม่ ให้ลงทะเบียนไอเทมประจำอาชีพและสกิล V-Matrix/HEXA ใน `AdminCommands.setupEndgame` เสมอ

### 1.5 มาตรฐานการบันทึก Progress (Progress Logging Standard)
- **ต้องระบุเวลาที่แก้ไขเสมอ**: บันทึกทั้งวันที่และเวลาจริง เช่น `[2026-10-12 11:00 น.]` หรือ `34c9857 (22:51 น.)`
- **โครงสร้าง 2 บล็อกหลัก**:
  - `Hash (เวลา น.) — หัวข้อภาษาไทยที่กระชับได้ใจความ (หัวข้ออังกฤษ)`
  - `- **หัวข้อ**: <Commit Subject / Feature Scope>`
  - `- **รายละเอียด**:`
    - แจกแจงแยกหมวดย่อย ปัญหาที่พบ (Problem) -> สาเหตุเชิงเทคนิค -> วิธีแก้ (Fix/Implementation) -> ผลลัพธ์ (Outcome)
    - ทำ clickable link ไฟล์ที่แก้ไขเสมอ เช่น [`SkillConstants.java`](file:///...)
- **การจัดเก็บเอกสาร**: บันทึกลงใน [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/PROGRESS.md) และคัดลอกซิงค์มาที่ [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS.md) ที่รูทเสมอ

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
   - **Magic Debris Rect Guard**: เช็ค `if (si == null || si.getFirstRect() == null) return;` ก่อนคำนวณ Force Atom
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

## 5. กระบวนการทำงาน (Workflow: Development, Build & Patch)

```text
[แก้ไขโค้ด Java หรือ Python Script]
            │
            ▼
[รัน Maven Package ใน v214 src]
(mvn clean package -DskipTests หรือ 2_Build_Server.bat)
            │
            ▼
[ตรวจสอบ BUILD SUCCESS]
            │
            ▼
[Deploy maplestory.jar ไปยัง Server263/ และ Root]
            │
            ▼
[ซิงค์ data/scripts/ ไปยัง Server263/data/scripts/]
            │
            ▼
[สร้าง Incremental Patch ผ่าน tools/create_patch.py]
            │
            ▼
[บันทึก PROGRESS.md พร้อมระบุเวลาจริง (HH:mm น.)]
            │
            ▼
[Git Add, Commit, Push]
```
