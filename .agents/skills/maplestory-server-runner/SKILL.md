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

---

## 3. มาตรฐานการพัฒนาสกิลคลาส 6 & Matrix UI Integrity

### 3.1 รูปแบบ Origin Skill (6th Job)
1. **ใน `handleSkill()`**:
   - มอบสถานะอมตะ: `tsm.putCharacterStatValue(CharacterTemporaryStat.IndieNotDamaged, option)` ระยะเวลา 7 วินาที
   - ส่งแพ็กเก็ตคัทซีนปาร์ตี้: `chr.write(UserLocal.showHexaSkillEff(chr, skillID))`
2. **ใน `handleAttack()`**:
   - ติดสถานะ Absolute Bind ให้มอนสเตอร์: `MobStat.Freeze` (10 วินาที)
   - ติดสถานะ Origin Debuff: `MobStat.OriginDebuff` (20 วินาที) ด้วย `EnumMap<MobStat, Option>`
   - บังคับคูลดาวน์ 360 วินาทีเคร่งครัด

### 3.2 รูปแบบ Ascent Skill & Transformation State Machine
- สกิลคอมโบต่อเนื่อง (เช่น Ren Ascent: Falling Flower ➔ Climbing Serpent ➔ Soaring Dragon):
  - ควบคุมการเปลี่ยนปุ่มด้วย `UserLocal.registerExtraSkill`
  - ตรวจสอบ State และบัฟสถานะ (เช่น `Holding`) ก่อนอนุญาตให้โจมตี
  - ท่าปิดฉากต้องเคลียร์บัฟ ปลดซัมมอน และเริ่มนับคูลดาวน์เต็ม (เช่น 240 วินาที)

### 3.3 การป้องกันไอคอนสกิลย่อยขยะใน Matrix UI (Zero Phantom Sub-Skill Policy)
- สกิลย่อยที่มี `<int name="invisible" value="1"/>`:
  - **ห้ามส่งแพ็กเก็ตอัปเดตสกิลไปยัง Client**: ห้ามเรียก `removeSkillAndSendPacket` ให้ใช้ `removeSkill` เงียบๆ ในเซิร์ฟเวอร์
  - **การกรองแพ็กเก็ต**: กรอง `!SkillConstants.isSpecialInvisibleSkill` และ `!si.isInvisible()` ใน `Char.encode` (SkillRecord)
  - **ระบบ Auto-Purge ในฐานข้อมูล**: ใน `Skill.getSkillsFromSQLByCharID` ให้สแกนและสั่งลบสกิลย่อยเลเวล 0 ออกจากตาราง `skills` ของ MariaDB อัตโนมัติเมื่อตัวละครเข้าเกม
  - **บล็อกการสแปม 0 คูลดาวน์**: ตรวจสอบเงื่อนไขบัฟและคูลดาวน์ของสกิลหลักใน `SkillHandler` และ `AttackHandler` เสมอ

### 3.4 ระบบ Super Buff All (`!buffall` / `@buff`)
- คำสั่ง `@buff` และ `@buffall` สำหรับผู้เล่นทั่วไป
- คำสั่ง `!buffall` สำหรับแอดมิน
- เมนูคลิกใน NPC Maple Admin (`[Super Buff All (2 Hours)]`) รวม 20+ บัฟระดับท็อป (EXP +55%, Drop +44%, ATT +260+, Boss DMG +50%, IED +50%, Speed +2 Stages) นาน 2 ชั่วโมงเต็ม

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

## 5. กระบวนการทำงานที่เป็นมาตรฐาน (Standardized Workflow)

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
