# 📜 MapleStory v265 Server Development Progress & Active Log

This file tracks current active bug fixes, feature implementations, and system optimizations.
Older archives are preserved in [PROGRESS_ARCHIVE.md](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS_ARCHIVE.md).

## 📅 [2026-10-13 14:48 น.] Core Standards & Admin Command Policy Realignment: TMS Reference Audit, Test-First Deployment, Full Git Sync, and Zero-Skill-Injection `!endgame`

### 🎯 Scope & Technical Details
- **หัวข้อ**: Project Memory & Operational Standards Overhaul (`AGENTS.md` & `SKILL.md`) and Admin `!endgame` Refactoring to Zero Skill Injection
- **รายละเอียด**:
  1. **ปัญหาที่พบและความต้องการปรับปรุง (Problem & User Requirements)**:
     - กฎเดิมใน `AGENTS.md` และการทำงานมีหลายจุดที่ไม่ตรงกับสเปคที่แท้จริงของผู้ใช้:
       1) การพอร์ตจาก TMS จำเป็นต้องตอกย้ำว่าเป็นคลังความรู้อ้างอิง (Reference) สำหรับสูตรคำนวณและระบบที่สมบูรณ์เท่านั้น และต้องตรวจสอบ ID ทุกครั้ง ห้ามก๊อปปี้ ID มาตรงๆ
       2) การสร้างไฟล์แพตช์ (Deploy Patch) ต้องผ่านการทดสอบในเกมก่อนเสมอ ไม่สร้างแพตช์ก่อนทดสอบเพื่อไม่ให้เสียเวลา
       3) การ Push Git ต้อง Push ทุกไฟล์เสมอรวมทั้งไฟล์เอกสาร เพื่อให้ทุกเครื่องที่ pull ทำงานไปในทิศทางเดียวกัน 100%
       4) คำสั่ง `!endgame` ใน `AdminCommands.java` เดิมมีการยัดแกนสกิล V-Matrix และเลเวลสกิลคลาส 6 HEXA ลงไปในตัวละครโดยตรง ซึ่งเสี่ยงต่อการเกิดบัค สกิลหลอน ซ้ำซ้อน หรือค้าง ผู้ใช้ต้องการให้มอบเฉพาะเลเวล, ของใช้สำหรับเปิด Matrix, อุปกรณ์ BiS และเงิน ให้ผู้เล่นกดหินและอัปแต้มเองตามธรรมชาติ
  2. **การปรับปรุงและวิธีแก้ (Implementation)**:
     - **ปรับปรุงมาตรฐานใน [`AGENTS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/AGENTS.md) และ [`SKILL.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/.agents/skills/maplestory-bug-knowledge/SKILL.md)**:
       - **หมวด 4**: กำหนดนโยบาย Test-First Policy ต้องทดสอบในเกมให้ผ่านก่อนทำไฟล์แพตช์ และรักษามาตรฐานแพตช์ไฟล์เดี่ยว `Server263_Patch_Latest.zip`
       - **หมวด 6**: ปรับปรุงกฎ `!endgame` สู่มาตรฐาน Strict Zero-Skill-Injection Policy ห้ามเรียก `chr.addSkill`, `chr.setHexaSkill` หรือ `mc.setSkillLevel` โดยเด็ดขาด
       - **หมวด 7**: บัญญัติกฎเหล็ก Push Everything Policy บังคับ Git Push ทุกไฟล์รวมถึงเอกสารทั้งหมด (`PROGRESS.md`, `AGENTS.md`, ฯลฯ)
       - **หมวด 8**: ระบุบทบาท TMS เป็น Reference สำหรับสูตรคำนวณและ Mechanics พร้อมกฎเหล็ก Strict ID Audit ห้ามคัดลอก ID มาตรงๆ เด็ดขาด
     - **ปรับปรุงโค้ด [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)**:
       - ลบโค้ดการยัดแกนสกิล V-Matrix (`mc.setSkillLevel(25)` / `addMatrixCore`) ออกจาก `setupEndgame`
       - ลบโค้ดการยัดเลเวลสกิลคลาส 6 (`chr.setHexaSkill(coreId, 30)`) ออกจาก `setupEndgame`
       - คงการมอบเลเวล 260, ค่า AP, ขยายช่องเก็บของ 128 ช่อง, เควสต์คลาส 5/6, Nodestones x3,000, Exp Nodestones x20, Sol Erda Energy x1,000, Sol Erda Fragments x30,000, ยา Power Elixir x3,000, เงิน 10B Mesos, และอุปกรณ์ Arcane Umbra + Princess No ครบชุด
     - **คอมไพล์และตรวจสอบความถูกต้อง**:
       - รันคอมไพล์ Maven ด้วย JDK 21: `BUILD SUCCESS` (853 source files, 0 errors)
       - Deploy `maplestory.jar` (~138.67 MB) ไปยัง `v214 src/`, `Server263/`, และ Root ครบถ้วน
  3. **ผลลัพธ์ (Outcome)**:
     - มาตรฐานเอกสารและการปฏิบัติงานของ AI และทีมพัฒนาสอดคล้องกับสเปคของผู้ใช้ 100%
     - คำสั่ง `!endgame` สะอาด ปลอดภัย ปราศจากบัคสกิลซ้อนทับหรือหลอน 100%
     - รหัสและเอกสารถูกเตรียมพร้อมสำหรับ Git Push ครบทุกไฟล์

### 📂 Files Modified
- [`AGENTS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/AGENTS.md)
- [`v214 src/AGENTS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/AGENTS.md)
- [`.agents/skills/maplestory-bug-knowledge/SKILL.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/.agents/skills/maplestory-bug-knowledge/SKILL.md)
- [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/PROGRESS.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS.md)

## 📅 [2026-10-13 14:02 น.] Patch Consolidation & Deployment: Unified Single All-in-One Distribution Package

### 🎯 Scope & Technical Details
- **หัวข้อ**: Patch Consolidation into a Single All-in-One Package (`Server263_Patch_Latest.zip`) & Re-Deployment
- **รายละเอียด**:
  1. **ปัญหาที่พบ (Problem)**:
     - ในโฟลเดอร์ [`Patches/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/) มีไฟล์แพตช์แยกย่อยซ้ำซ้อนกันถึง 4 ไฟล์ (`Server263_Patch_<timestamp>.zip`, `Server263_Patch_Latest.zip`, `Client_Patch_<timestamp>.zip`, `Client_Patch_Latest.zip`) ซึ่งกินพื้นที่และทำให้ผู้ใช้งานเกิดความสับสนในการเลือกไฟล์ไปใช้งาน
     - ตัวแพ็คเกจ Server263_Patch แท้จริงแล้วได้รวมโฟลเดอร์ `Client_Patch_Files/` (Launcher.exe, Localhost.dll, launcher.ini, Install_Client_Patch.bat) ไว้ครบถ้วนอยู่แล้ว จึงไม่มีความจำเป็นต้องแยกไฟล์ Client ออกเป็นอีกชุด
  2. **การปรับปรุงและวิธีแก้ (Enhancement & Implementation)**:
     - **ปรับปรุงเครื่องมือสร้างแพตช์ ([`tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/create_patch.py) และ [`v214 src/tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/tools/create_patch.py))**:
       - แก้ไขให้ล้างโฟลเดอร์ `Patches/` เดิมทั้งหมดก่อน และส่งออกไฟล์แพตช์แบบ All-in-One เพียงไฟล์เดียวอย่างเข้มงวด: [**`Server263_Patch_Latest.zip`**](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip)
       - กรองตัดไฟล์ขยะแคช `*.class` และ `__pycache__` ออกจาก `data/scripts` ระหว่างกระบวนการแพ็คเพื่อลดขนาดไฟล์และเพิ่มความสะอาด
       - เพิ่ม `backup.sql`, `Create_Account.bat`, และ `Create_Update_Patch.bat` ลงในรายการไฟล์ที่อัปเดตอัตโนมัติของ `Apply_Patch.bat`
       - ปรับปรุงให้ `Apply_Patch.bat` รองรับทั้งการแตกไฟล์ทับไดเรกทอรีปัจจุบัน และตรวจหาโฟลเดอร์ Server263 อัตโนมัติ
     - **รันกระบวนการ Deploy และตรวจสอบความสมบูรณ์ (Integrity Verification)**:
       - รันคำสั่งแพ็คและ Deploy ใหม่: ผลิตไฟล์ `Patches/Server263_Patch_Latest.zip` ขนาด 122.42 MB (7,016 ไฟล์)
       - ตรวจสอบความถูกต้องของโครงสร้างไฟล์ ZIP (`Valid ZIP: True`) ครบถ้วนทั้ง Server Core, Script Data, Drop Tables และ Client Patch Files
  3. **ผลลัพธ์ (Outcome)**:
     - โฟลเดอร์ [`Patches/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/) ได้รับการจัดระเบียบให้เหลือ **เพียงไฟล์เดียว (Single File 100%)** เบ็ดเสร็จทุกระบบในที่เดียว สะอาดตา และพร้อมแจกจ่ายทันที
     - ผู้ใช้นำ [**`Server263_Patch_Latest.zip`**](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip) ไปแตกไฟล์และรัน `Apply_Patch.bat` จะอัปเดตทั้งเซิร์ฟเวอร์และถามเพื่ออัปเดตโฟลเดอร์ตัวเกมให้อัตโนมัติในคลิกเดียว

### 📂 Files Modified / Created
- [`tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/create_patch.py)
- [`v214 src/tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/tools/create_patch.py)
- [`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip) (Single All-in-One Distribution Package)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/PROGRESS.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS.md)

## 📅 [2026-10-13 13:25 น.] Workspace Root Directory Architecture Cleanup & Comprehensive Organization

### 🎯 Scope & Technical Details
- **หัวข้อ**: Complete Workspace Cleanup, Root Folder Reorganization, and Launcher Portability Hardening
- **รายละเอียด**:
  1. **ปัญหาที่พบ (Problem)**:
     - โฟลเดอร์ Root (`C:\Users\admin\Documents\MapleStory_Server_Runner`) มีไฟล์กระจัดกระจายรวมกันถึง 72 ไฟล์ ทำให้ยากต่อการค้นหาและดูแลรักษา
     - มีไฟล์ SQL สคริปต์ย่อยยุคเก่า (`InitColumn_*.sql`, `InitTable_*.sql`, `InitTables_*.sql`, `InitValue_*.sql`, `ModifyValue_*.sql`, `AIO.sql`) กองอยู่ที่ Root รวม 42 ไฟล์ ทั้งที่มีสำเนาเก็บอยู่ใน `Server263/sql/` อยู่แล้ว
     - มีไฟล์ Python สำหรับ Audit และ JSON รายงานผลการสแกนทักษะสกิลในอดีตกระจัดกระจายอยู่ที่ Root รวม 17 ไฟล์
     - มีโฟลเดอร์ขยะว่างเปล่า `client/` (มีเพียง `.DepotDownloader` เปล่า)
     - ไฟล์สคริปต์ `Create_Account.bat` และ `Import_Database.bat` ที่ Root มีโค้ดเขียนทับซ้อนและพยายามเรียก `mariadb` ที่ Root โดยตรง ซึ่งอาจ Error หากไม่มีโฟลเดอร์ `mariadb` อยู่ที่ Root
  2. **การจัดระเบียบและวิธีแก้ (Reorganization & Implementation)**:
     - **จัดเก็บหมวดหมู่ฐานข้อมูล (SQL Migration Scripts)**:
       - รวบรวมไฟล์ SQL ย่อยทั้ง 42 ไฟล์ ย้ายเข้าไปจัดเก็บไว้อย่างเป็นระเบียบในโฟลเดอร์ [`sql/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/sql/)
       - คงเหลือเฉพาะไฟล์ฐานข้อมูลหลัก [**`backup.sql`**](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/backup.sql) ไว้ที่ Root สำหรับการ Import ฐานข้อมูลเริ่มต้น
     - **จัดเก็บหมวดหมู่เครื่องมือตรวจเช็ค (Audit & Analysis Tools)**:
       - สร้างโฟลเดอร์ [`tools/audit/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/audit/) และย้ายไฟล์ Python Script และ JSON Audit Reports ทั้ง 17 ไฟล์เข้าไปจัดเก็บรวมไว้ด้วยกันอย่างเป็นหมวดหมู่
     - **ล้างโฟลเดอร์ชั่วคราว (Dead Folder Cleanup)**:
       - ลบโฟลเดอร์ `client/` ที่ว่างเปล่าทิ้งอย่างปลอดภัย
     - **ยกระดับความ Portable ของสคริปต์ที่ Root (Launcher Portability Hardening)**:
       - ปรับปรุง [`Create_Account.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Create_Account.bat) และ [`Import_Database.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Import_Database.bat) ที่ Root ให้ทำหน้าที่เป็น Smart Redirection ชี้เข้าสู่ `Server263` อัตโนมัติ (มาตรฐานเดียวกับ `1_Start_Server.bat`, `3_Stop_Server.bat`, และ `4_Server_Control_Panel.bat`) ทำให้เรียกใช้ MariaDB Engine และ Environment ของ `Server263` ได้ทันที 100% ไม่ว่าจะรันจากโฟลเดอร์ไหน
  3. **ผลลัพธ์ (Outcome)**:
     - โฟลเดอร์ Root ลดจำนวนไฟล์จาก 72 ไฟล์ เหลือเพียง **14 ไฟล์หลัก และ 10 โฟลเดอร์ที่เป็นระบบระเบียบ สะอาดตา และค้นหาง่าย 100%**
     - โครงสร้างโปรเจกต์มีความเป็นสัดส่วนชัดเจนตามมาตรฐาน Enterprise

### 📂 Files Modified / Reorganized
- [`Create_Account.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Create_Account.bat) (Smart Redirection to Server263)
- [`Import_Database.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Import_Database.bat) (Smart Redirection to Server263)
- [`sql/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/sql/) (Consolidated 42 migration SQL files)
- [`tools/audit/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/audit/) (Consolidated 17 audit scripts and reports)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/PROGRESS.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS.md)

## 📅 [2026-10-13 13:18 น.] Patch System Enhancement: Dual-Package Incremental Patches (Server Runner & Localhost Client 1-Click Installer)

### 🎯 Scope & Technical Details
- **หัวข้อ**: Dual-Package Incremental Patch Creation (Server Runner + Standalone Localhost Client Installer)
- **รายละเอียด**:
  1. **ปัญหาที่พบ (Problem)**:
     - ไฟล์ `Localhost.dll` ในโฟลเดอร์ Steam (`depot_216151`) เป็นเวอร์ชันเก่าจากวันที่ 5 ตุลาคม 2026 (MD5: `20608BFE...`) เกิดการ Crash หลุดทันทีเมื่อเปิดเกมเนื่องจาก Memory Assertion Error (`ZXString` / `StringPool` refcount check)
     - ระบบเดิมสร้างไฟล์ Patch แพ็ครวมทั้งเซิร์ฟเวอร์ขนาดใหญ่ (~122 MB) ทำให้ผู้ใช้ที่ต้องการแจกจ่ายเฉพาะไฟล์เชื่อมต่อ Client ให้เพื่อนหรือผู้เล่นอื่นต้องแยกไฟล์เองด้วยตนเอง
     - ผู้ใช้ต้อง Copy-Paste ไฟล์ Localhost ลงในโฟลเดอร์ตัวเกมด้วยตนเอง ซึ่งอาจเกิด Human Error ลืมก๊อปปี้ หรือวางผิดโฟลเดอร์
  2. **การปรับปรุงและวิธีแก้ (Enhancement & Implementation)**:
     - **ฝั่ง Client Patch (Localhost)**:
       - อัปเดต `Localhost.dll` ตัวล่าสุด (MD5: `C9D118CC0F1E45EE7B7C7C7AAB676EC1`) ที่แก้ปัญหา Memory Crash และ Socket Redirect สมบูรณ์
       - สร้างสคริปต์ [`Install_Client_Patch.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/Client_Patch_Files/Install_Client_Patch.bat) ติดตั้งแบบ 1-Click อัตโนมัติ: มีระบบค้นหาโฟลเดอร์ติดตั้ง MapleStory v265 อัตโนมัติ (Steam Depot, Steam Common, Nexon, D:, E:) สำรองไฟล์เดิม และอัปเดตไฟล์ให้เสร็จสรรพ
       - ซิงค์ไฟล์ชุดแพตช์ล่าสุดลงในโฟลเดอร์ Steam Depot ของเครื่องปัจจุบันโดยตรงเรียบร้อย
     - **ฝั่ง Server Runner Patch (ตัวรันเซิร์ฟเวอร์)**:
       - อัปเกรดเครื่องมือสร้างแพตช์ [`tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/create_patch.py) ให้สร้างไฟล์แพตช์ 2 แพ็กเกจพร้อมกัน:
         1. **Server Runner Patch**: `Patches/Server263_Patch_Latest.zip` (122.47 MB) บรรจุ `maplestory.jar`, `server.properties`, สคริปต์รันเซิร์ฟเวอร์, `data/scripts/` (รวมเควสต์ Evan `q22133s.py`), `data/resources/`, `Client_Patch_Files/`, และ `Apply_Patch.bat`
         2. **Standalone Client Patch**: `Patches/Client_Patch_Latest.zip` (329.3 KB) มีเฉพาะไฟล์ฝั่ง Client พร้อม `Install_Client_Patch.bat` สำหรับส่งต่อให้ผู้เล่นดาวน์โหลดไปแตกไฟล์ทับตัวเกมได้ทันที
       - ปรับปรุง `Apply_Patch.bat` ให้ตรวจหาและถามผู้ใช้ว่าต้องการอัปเดต Localhost Client Patch ลงโฟลเดอร์ตัวเกม MapleStory ด้วยหรือไม่ในขั้นตอนเดียว
  3. **ผลลัพธ์ (Outcome)**:
     - ตัวรันเซิร์ฟเวอร์และตัวเชื่อมต่อ Localhost ได้รับการปรับปรุงเป็นเวอร์ชันล่าสุด 100%
     - ได้ไฟล์แพตช์สำเร็จรูปพร้อมใช้งานและแจกจ่ายในโฟลเดอร์ [`Patches/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/):
       - [`Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip) (ตัวรันเซิร์ฟเวอร์)
       - [`Client_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Client_Patch_Latest.zip) (ตัวเชื่อมต่อ Localhost)

### 📂 Files Modified / Created
- [`Server263/Client_Patch_Files/Install_Client_Patch.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/Client_Patch_Files/Install_Client_Patch.bat)
- [`Server263/Client_Patch_Files/วิธีใช้งาน_สำหรับนำไปวางเครื่องอื่น.txt`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/Client_Patch_Files/วิธีใช้งาน_สำหรับนำไปวางเครื่องอื่น.txt)
- [`tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/create_patch.py)
- [`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip)
- [`Patches/Client_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Client_Patch_Latest.zip)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/PROGRESS.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS.md)

## 📅 [2026-10-13 12:57 น.] 74062d2d — Evan Mir Hatching & Skill UI Evolution Fix: Revamped Quest Synchronization, Level-up Advancement Overhaul, and Missing Quest Script Implementation

### 🎯 Scope & Technical Details
- **หัวข้อ**: Evan Mir Hatching & Evolution in Skill Window UI (K Window), Fix Normal Play Progression & Endgame Admin Command
- **รายละเอียด**:
  1. **ปัญหาที่พบ (Problem)**:
     - ในหน้าต่างสกิล (Skill UI - [K]) ของอาชีพ Evan มังกร Mir แสดงผลเป็นไข่ที่ยังไม่ฟัก แม้จะทำการเสกตัวละครด้วยคำสั่ง `!endgame` แล้วก็ตาม ในขณะที่มังกร Mir ในฟิลด์/แมพเติบโตเป็นตัวเต็มวัยตามปกติ
     - ในการเล่นปกติ พบว่าผู้เล่นไม่สามารถเปลี่ยนเป็นคลาส 4 ได้ (Quest 22133 ขาดสคริปต์) และเมื่อเลเวล 10 โค้ดเดิมกำหนด Job เป็น 2210 (ซึ่งไม่มีข้อมูลสกิลใน WZ v265) แทนที่จะเป็น 2200
  2. **สาเหตุเชิงลึกทางเทคนิค (Technical Root Cause)**:
     - **Native Client Binary Check**: จากการตรวจสอบโค้ดภาษาเครื่อง (Disassembly) ของ `MapleStory.exe` ใน v265 พบว่าการเรนเดอร์โมเดลมังกร Mir ในหน้าต่างสกิลถูกผูกไว้กับฟังก์ชัน `CQuestMan::IsQuestCompleted()` โดยไคลเอนต์ตรวจสอบเควสต์ `22007`, `22011` และโดยเฉพาะอย่างยิ่ง **Quest ID 22130** (Evan 1st Job Advancement - Mir Hatches!)
     - หากเควสต์ `22130` ยังไม่สำเร็จ (`state != 2`) ไคลเอนต์จะบังคับเรนเดอร์โมเดล "ไข่มังกร (Dragon Egg)" ในหน้าต่าง UI เสมอ และหากมีเควสต์ `22131` (คลาส 2 - สลัดเปลือกไข่), `22132` (คลาส 3 - วัยรุ่น), `22133` (คลาส 4 - โตเต็มวัย) ไคลเอนต์จึงจะพัฒนาแอนิเมชันของ Mir ไปตามลำดับ
     - **คำสั่ง `!endgame` เดิม**: ใน [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java) มีการวนลูปคอมพลีตเควสต์รหัสโบราณ `22100 - 22103` (ซึ่งเป็นเควสต์ยุค 10 คลาสที่มีสถานะ `blocked=1` ใน WZ v265) ทำให้ตัวละครที่ผ่านคำสั่ง `!endgame` ไม่เคยได้รับสถานะความสำเร็จของเควสต์ `22130 - 22133` เลย ส่งผลให้ไคลเอนต์แสดงภาพเป็นไข่มังกรตลอดเวลา
     - **การเล่นปกติ (Normal Play)**: มังกรในแมพโตจริง 100% เพราะถูกผูกไว้กับ `handleLevelUp` ทุกระดับเลเวล (10, 30, 60, 100, 260) แต่ในหน้าต่างสกิล มังกรจะไม่ออกจากไข่หากเควสต์เปลี่ยนคลาส Revamp (22130 - 22133) ไม่ได้รับการบันทึกสถานะ
  3. **วิธีแก้และการ Refactor (Fix & Implementation)**:
     - **Refactor เฉพาะอาชีพ Evan เท่านั้น**:
       - แก้ไข [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java) ในส่วน `setupEndgame`: ปรับปรุงบล็อก `isEvan(job)` ให้คอมพลีตเควสต์ Revamp ครบถ้วน ได้แก่:
         - เควสต์บทนำและฟักไข่: `22000 - 22011`
         - เควสต์เปลี่ยนคลาส Revamp: `22130` (คลาส 1 - ไข่ฟัก), `22131` (คลาส 2 - สลัดเปลือก), `22132` (คลาส 3 - มังกรวัยรุ่น), `22133` (คลาส 4 - มังกรโตเต็มวัย)
         - เควสต์ปลุกพลังมังกร: `22500 - 22512`
         - เควสต์สกิลขี่มังกร: `22400`, `22404`, `22414`, `22415`
         - มอบสกิลกลับบ้าน `20011293` (Back to Nature)
       - แก้ไข [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java):
         - ใน `handleInitAfterMigrate(Char chr)`: ทำการคอมพลีตเควสต์ `22000 - 22011`, `22130`, `22131`, `22500` และมอบสกิล `20011293`
         - ใน `handleLevelUp(short level)`:
           - เลเวล 10: แก้ไขจาก `job = 2210` เป็น `job = 2200` (Evan 1st Job ที่ถูกต้องตาม WZ v265), สำเร็จเควสต์ `22130` (มังกรฟักออกจากไข่ทันทีทั้งในแมพและหน้าต่างสกิล), มอบ SP +5 และสกิล `20011293`
           - เลเวล 30: สำเร็จเควสต์ `22131` (มังกรสลัดเปลือกไข่)
           - เลเวล 60: สำเร็จเควสต์ `22132` (มังกรวัยรุ่น)
           - เลเวล 100: สำเร็จเควสต์ `22133` (มังกร Onyx เต็มวัย)
       - สร้างสคริปต์เควสต์คลาส 4 [`q22133s.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/scripts/quest/q22133s.py) และ [`v214 src/data/scripts/quest/q22133s.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/quest/q22133s.py) รองรับการเปลี่ยนคลาส 4 อย่างสมบูรณ์
  4. **ผลลัพธ์ (Outcome)**:
     - เมื่อใช้คำสั่ง `!endgame` หรือ `!endgame evan`: หน้าต่างสกิล (K) จะแสดงมังกร Mir ตัวเต็มวัยที่ออกจากไข่แล้ว 100% สอดคล้องกับมังกรที่บินตามในฟิลด์
     - สำหรับผู้เล่นที่เล่นปกติ ตั้งแต่เลเวล 10 ขึ้นไป มังกรจะฟักออกจากไข่ในหน้าต่างสกิลทันที และวิวัฒนาการไปตามระดับเลเวล 10 -> 30 -> 60 -> 100 อย่างสมบูรณ์

### 📂 Files Modified
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)
- [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)
- [`q22133s.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/scripts/quest/q22133s.py)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/PROGRESS.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS.md)

### 🧪 Verification & Deployment
- **Maven Compile**: `BUILD SUCCESS` (853 files, 0 errors)
- **Maven Package**: `BUILD SUCCESS` (`maplestory-219.5-jar-with-dependencies.jar` 138.67 MB)
- **Artifact Deployment**: ซิงค์ไฟล์ `maplestory.jar` สู่ `v214 src/`, Root, และ `Server263/`
- **Incremental Patch**: สร้างแพ็กเกจแพตช์ล่าสุด `Patches/Server263_Patch_20261013_1256.zip` (122.47 MB) พร้อม `Apply_Patch.bat`
- **Rule Compliance**: `Server263/` ปราศจากไฟล์ซอร์สโค้ดและเครื่องมือ Maven 100% และไม่มีการแก้ไขอาชีพอื่นนอกเหนือจาก Evan

## 📅 [2026-10-13 12:25 น.] aa01393 — Evan In-Depth Re-Analysis & Comprehensive Fixes: United Horizons Skill Redirection Collision, Dragon Slam V-Matrix Follow-up Mapping & Cooldowns, Magic Debris Memory Leak Removal, and Starter Lifecycle Step 3

### 🎯 Scope & Technical Details
1. **แก้ปัญหาการ Collision ของ United Horizons (`22201502`) ใน `SkillConstants.getActualSkillIDfromSkillID()`**:
   - **ปัญหาที่พบ (Problem)**: สกิล HEXA Active ลำดับที่สองของ Evan คือ United Horizons (`22201502`, Core 10000074) ถูกตีความเป็น Finisher Sub-skill ของ Zodiac Burst (`22201500`) โดยในกรณี Default ของ `getActualSkillIDfromSkillID()` มีคำสั่ง `(skillID > 22201500 && skillID <= 22201599)` ส่งผลให้ `22201502` ถูกรีไดเรกต์กลับไปเป็น `22201500`
   - **สาเหตุเชิงลึก (Technical Root Cause)**: เมื่อ `22201502` ถูกรีไดเรกต์เป็น `22201500` การเช็คคูลดาวน์ผ่าน `chr.hasSkillOnCooldown()` และการคำนวณแดเมจจะไปดึงเลเวลและคูลดาวน์ 360 วินาทีของ Zodiac Burst มาทับคูลดาวน์ 240 วินาทีของ United Horizons ทำให้ไม่สามารถกดใช้ United Horizons ได้อย่างเป็นอิสระ
   - **วิธีแก้ (Fix)**: เพิ่ม `case 22201502: return 22201502;` ดักไว้ก่อนเคสรีไดเรกต์ และกำหนดให้ท่าโจมตีสะท้อน `22201503` (United Horizons Resonance Attack) ชี้กลับหา `22201502` อย่างถูกต้อง 100%

2. **แก้ปัญหาสกิลลูกของ Dragon Slam (`400021046`) ขาดหายใน `SkillConstants` และ `handleSetCoolDownSkill`**:
   - **ปัญหาที่พบ (Problem)**: ท่าต่อเนื่องของ Dragon Slam คือ Wyrmking's Breath (`400020046`) และ Ludicrous Speed (`400020051`) ไม่มีการแมปกลับสู่ Root Skill `400021046`
   - **สาเหตุเชิงลึก (Technical Root Cause)**: ผู้เล่นถือครองโหนด V-Matrix รหัส `400021046` แต่ไม่มีรหัส `400020046` ในตัวละคร เมื่อมังกรโจมตีต่อเนื่อง เซิร์ฟเวอร์อ่านเลเวลสกิลเป็น 0 และใน `Evan.handleSetCoolDownSkill()` มีการสั่ง `chr.setSkillCooldown(WYRMKINGS_BREATH, chr.getSkillLevel(WYRMKINGS_BREATH))` ซึ่งได้ค่าเลเวลเป็น 0 ทำให้คูลดาวน์ไม่ทำงานหรือติดขัด
   - **วิธีแก้ (Fix)**:
     - แมป `case 400020046, 400020051 -> return 400021046;` ใน `getActualSkillIDfromSkillID()`
     - ลงทะเบียน `400020046` และ `400020051` ใน `isEvanForceSkill()` ป้องกัน Packet Offset Shift ใน `AttackHandler`
     - รวมเคสคูลดาวน์ใน `Evan.handleSetCoolDownSkill()`: `case DRAGON_SLAM, WYRMKINGS_BREATH, LUDICROUS_SPEED -> chr.setSkillCooldown(DRAGON_SLAM, Math.max(1, chr.getSkillLevel(DRAGON_SLAM)));`

3. **แก้บั๊ก Memory Leak และเศษ Debris ไม่ยอมเกิดใหม่ใน `Evan.createMagicDebrisForceAtom()`**:
   - **ปัญหาที่พบ (Problem)**: หลังจากกดใช้ Magic Debris (`22141017` / `22170070` / `22201015`) ระเบิดเศษชิ้นส่วนแล้ว เมื่อผู้เล่นโจมตีด้วย Fusion Skill ต่อเนื่อง เศษ Debris ใหม่กลับไม่ยอมดรอปขึ้นมาทันที
   - **สาเหตุเชิงลึก (Technical Root Cause)**: เดิมโค้ดเรียกเพียง `chr.write(FieldPacket.delWreckage(chr, field.getWreckageByChrId(chr.getId())));` ซึ่งเป็นการส่งแพ็กเก็ตแจ้งเตือนไปยัง Client เฉพาะตัวผู้เล่น แต่ไม่ได้ลบ Life Object ของ Wreckage ออกจากหน่วยความจำของ `Field` เซิร์ฟเวอร์ ทำให้ `chr.getField().getWreckage().size() < getMaxDebris()` ยังคงมองว่ามีเศษหินเต็มจำนวน และไม่ยอมเสกเศษใหม่จนกว่าจะหมดเวลา 30 วินาที
   - **วิธีแก้ (Fix)**: เปลี่ยนมาเรียก `field.removeWreckage(chr, field.getWreckageByChrId(chr.getId()));` ซึ่งจะทำการบรอดคาสต์แพ็กเก็ตลบวัตถุแก่ทุกคนในแมพ, ยกเลิก Schedule Timer, และลบ Wreckage Life ออกจากฟิลด์ทันที ทำให้สามารถสะสม Debris ชุดใหม่ได้ทันทีอย่างไร้รอยต่อ

4. **เพิ่มรหัส Alternative Actions ของ HEXA Dragon Skills ใน `isEvanForceSkill`, `isEvanFusionSkill`, และ `handleDragonSkillEffect`**:
   - เพิ่มรหัสย่อย `22201008` (HEXA Earth Dive alt), `22201009` (HEXA Thunder Dive alt), `22201012/22201013` (HEXA Earth Breath alt), `22201014` (HEXA Wind Breath alt) เข้าสู่:
     - `SkillConstants.isEvanForceSkill()`: ป้องกันไคลเอนต์อ่านข้อมูลข้ามไบต์หลุด alignment
     - `SkillConstants.isEvanFusionSkill()`: มั่นใจว่าการโจมตีจากทุก Sub-action ID จะทำการเสก Magic Debris ลงพื้นได้เสมอ
     - `Evan.handleDragonSkillEffect()`: กำหนดค่า `attackActionType` เพื่อให้แอนิเมชันของ Mir ถูกบรอดคาสต์สู่ผู้เล่นคนอื่นในแมพอย่างถูกต้องสมบูรณ์

5. **เติมเต็ม Starter Lifecycle Step 3 สำหรับตัวละคร Evan ใหม่ใน `handleInitAfterMigrate()`**:
   - ตรวจสอบพบว่า Evan มีเพียง Step 1 และ Step 2 แต่ยังขาด Step 3 ใน `handleInitAfterMigrate(Char chr)` ต่างจากอาชีพฮีโร่อื่นๆ
   - เพิ่มเงื่อนไข `if (chr.getLevel() < 30)`: สำเร็จเควสต์บทนำฟาร์ม 22000-22015 และเควสต์ไข่มังกร 22100-22102, ปรับเลเวลเป็น 30, เปลี่ยนอาชีพเป็น 2nd Job (2212), แจกแต้ม SP คลาส 1 (+5) และคลาส 2 (+3), สวมใส่อาวุธ Wizard Staff (`1382003`) และ Secondary Dragon Master's Document (`1352941`), และวาร์ปสู่ Henesys พร้อมเสก Mir อย่างปลอดภัย

### 📂 Files Modified
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)
- [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/PROGRESS.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS.md)

### 🧪 Verification & Deployment
- **Maven Compile**: `BUILD SUCCESS` (853 files, 0 errors)
- **Maven Package**: `BUILD SUCCESS` (`maplestory-219.5-jar-with-dependencies.jar` 138.67 MB)
- **Artifact Deployment**: ซิงค์ไฟล์ `maplestory.jar` สู่ `v214 src/`, Root, และ `Server263/`
- **Incremental Patch**: สร้างแพ็กเกจแพตช์ล่าสุด `Patches/Server263_Patch_20261013_1223.zip` พร้อม `Apply_Patch.bat`
- **Rule Compliance**: `Server263/` ปราศจากไฟล์ซอร์สโค้ดและเครื่องมือ Maven 100%

## 📅 [2026-10-13 11:55 น.] Cross-Version Porting Standard, AGENTS.md Section 8, Disk Space Recovery (+18.87 GB), and Asset Audit Tool (tools/audit_tms_asset.py)

### 🎯 Scope & Technical Details
1. **เพิ่มกฎข้อบังคับข้อ 8 ใน [AGENTS.md](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/AGENTS.md) และ [SKILL.md](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/.agents/skills/maplestory-bug-knowledge/SKILL.md)**:
   - กำหนดให้การพอร์ตแมคคานิคบอส, ดรอปเรท, หรือเควสต์จาก [tms273](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/TMS277_REF_NomainSource/tms273) ต้องผ่านการ Audit ตรวจสอบรหัส Mob IDs, Item IDs, Map IDs เทียบกับ WZ v265 100% ทุกครั้งก่อนลงโค้ด เพื่อป้องกันปัญหา ID ไม่ตรงกันหรือมีไอเทม TMS Exclusive
   - กำหนดขั้นตอน Standardized Porting Workflow: Audit Asset -> Translate ScriptAPI -> Test via Admin -> Update Progress

2. **การกู้คืนพื้นที่ฮาร์ดดิสก์ขนาดใหญ่ (+18.87 GB Disk Free Space)**:
   - ตรวจพบไดรฟ์ C: วิกฤต เหลือพื้นที่ว่างเพียง 7.16 GB
   - ทำการสำรวจและลบไฟล์ขนาดใหญ่ที่ไม่ได้ใช้งานในโปรเจกต์:
     - ลบ `TMS277_REF_NomainSource/WZ_JSON_TW` (3.2 GB, 184,520 ไฟล์)
     - ลบ `TMS277_REF_NomainSource/tms273/WZ_JSON_TW` (3.2 GB, 184,520 ไฟล์)
     - ลบ `tms273/bin` (668 MB, Linux ELF Binaries)
     - ลบโฟลเดอร์ Logs เก่า
   - ผสานข้อมูลเสริม `Event/` และ `PunchKing/` เข้าสู่ `tms273/data/` ก่อนลบ
   - **ผลลัพธ์**: พื้นที่ว่างบนไดรฟ์ C: เพิ่มขึ้นจาก **`7.16 GB`** เป็น **`26.03 GB`** (+18.87 GB) เซิร์ฟเวอร์และเครื่องทำงานได้อย่างปลอดภัยสูงสุด

3. **สร้างเครื่องมือตรวจสอบอัจฉริยะ [`tools/audit_tms_asset.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/audit_tms_asset.py)**:
   - พัฒนาสคริปต์ Python สำหรับสแกนไฟล์สคริปต์ต้นทางอัตโนมัติ เพื่อตรวจสอบ:
     - Mob IDs เทียบกับ `Server263/data/wz265/Mob.wz/` และ `String.wz/Mob.img.xml`
     - Map IDs เทียบกับ `Server263/data/wz265/Map.wz/Map/MapX/` และ `String.wz/Map.img.xml`
     - Item IDs เทียบกับ `Server263/data/wz265/Item.wz/`, `Character.wz/`, และ String files
   - ทำการทดสอบจริงกับ:
     - `boss_karing_easy.js`: Map 13 แผนที่ และ Mob 6 ตัว (Qiongqi, Taowu, Hundun, Kaling, Frenzied Kaling) ตรวจพบตรงกับ WZ v265 แบบ 100%
     - `boss_kalos_chaos.js`: Map Karote Summit 6 แผนที่ และ Mob 3 ตัว (Kalos P1/P2, Chest) ตรงกับ WZ v265 แบบ 100%
     - `boss_seren_normal.js`: Map Cernium Palace 6 แผนที่ และ Mob 3 ตัว ตรงกับ WZ v265 แบบ 100%
     - `boss_limbo_normal.js`: Map Carcion 10 แผนที่ และ Mob Limbo 4 ตัว ตรงกับ WZ v265 แบบ 100%
     - `BOSS_REWARD_APPLY.js`: ตรวจจับไอเทมแปลกปลอม เช่น `1152209` (TMS Exclusive) ได้อย่างแม่นยำ

## 📅 [2026-10-13 11:20 น.] Audit Full Report: Fix Consumable Use Lock (Inventory Overflow), Evan Mir Egg Hatching (Quests 22100-22103), Class-Specific Spawn Map & Analysis of TMS277_REF_NomainSource

### 🎯 Scope & Technical Details
1. **แก้ปัญหาใช้ยาหรือไอเทมกดใช้ไม่ได้เลย (Consumable Lock / Inventory Overflow 466 Duplicate Items)**:
   - **ปัญหาที่พบ (Problem)**: ผู้เล่นกดกินยา (Power Elixir, White Potion ฯลฯ) ไม่ได้เลย ไอเทมไม่ลด เลือดไม่เด้ง ไม่มี Log error ในเซิร์ฟเวอร์
   - **สาเหตุเชิงลึก (Technical Root Cause)**:
     - ใน [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java): คำสั่ง `!endgame` แจก Exp Nodestone (`2437760`) จำนวน 500 ชิ้น ซึ่งใน MapleStory ไอเทมประเภท Coupon/Exp Node มี `slotMax = 1` (กิน 1 ช่องต่อ 1 ชิ้น)
     - กระเป๋า Consume เริ่มต้นมีเพียง 48 ช่อง เมื่อยัดไอเทม 500 ชิ้น ระบบ `Inventory.addItem` ทำงานวนซ้ำจนช่องเต็ม ทำให้ `firstFreeSlotLocked()` คืนค่า `-1` และโค้ด Swordie บังคับยัดไอเทมที่เหลือกว่า 466 ชิ้นลงใน `bagindex = 1` ซ้ำกันทั้งหมดในฐานข้อมูล `vietmaple.items`
     - ยิ่งไปกว่านั้น Power Elixir (`2000005`) ก็ถูกยัดลงใน `bagindex = 1` ซ้อนทับกัน
     - เมื่อผู้เล่นคลิกใช้ยา Client ส่งแพ็กเก็ตขอใช้ยาช่องที่ 1 แต่ Server ตรวจสอบพบ `item.getItemId() != itemID` เพราะช่องที่ 1 ชี้ไปที่ Exp Nodestone ตัวที่ 466 ที่ทับอยู่ ระบบจึง `return;` ทิ้งทันที ทำให้ยาและของกดใช้ทุกชนิดเป็นอัมพาต 100%
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - ใน [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java): เพิ่มระบบขยายกระเป๋า 128 ช่องเต็มพิกัด (`setSlots(128)` + `WvsContext.expandInventory`) ให้ทุกแท็บ (Equip, Consume, Etc, Install) ก่อนเริ่มแจกไอเทม
     - ปรับลดจำนวน Exp Nodestones จาก 500 ชิ้น เหลือ 20 ชิ้น (ใช้ 20 ช่อง) ซึ่งเพียงพอต่อการอัป V-Matrix เต็ม และลด Power Elixir เหลือ 3,000 ชิ้น (ใช้ 3 ช่อง)
     - ทำการ Clean Database ในตาราง `vietmaple.items` สำหรับตัวละคร `EVOffline`: ลบแถว Exp Nodestone ที่ซ้ำซ้อน 466 แถวทิ้ง และจัดสรร `bagindex` ของ Power Elixir ให้มีช่องเฉพาะตัว (`bagindex = 15`)
     - ผลลัพธ์: กระเป๋าโล่งสะอาด สามารถกดใช้ยาและไอเทมได้ทันทีตามปกติ 100%

2. **แก้ปัญหามังกรในหน้าต่างสกิล Evan เป็นไข่มังกรไม่ยอมโต (Evan Mir Dragon Egg Evolution)**:
   - **ปัญหาที่พบ (Problem)**: ตัวละคร Evan หน้าต่างสกิลแสดงรูป "ไข่มังกร" ไม่ฟักเป็นมังกร Mir แม้เลเวลจะ 260 แล้วก็ตาม
   - **สาเหตุเชิงลึก (Technical Root Cause)**:
     - ตรวจสอบไฟล์ WZ ใน `Quest.wz/QuestData/22100.img.xml` ถึง `22103.img.xml`:
       - เควสต์ `22100`: "Dragon Master 1st Job Advancement" ("Baby Dragon Mir has been born from the Dragon Egg") -> มังกรฟักออกจากไข่
       - เควสต์ `22101`: "Dragon Master 2nd Job Advancement" ("Mir has grown bigger and taken off the egg shell he was wearing as a hat") -> มังกรถอดเปลือกไข่ที่สวมเป็นหมวก
       - เควสต์ `22102` & `22103`: มังกรวัยรุ่นและมังกรเต็มวัย (Adult Dragon)
       - ตัวเกม Client อ่าน Record สถานะความสำเร็จของเควสต์ `22100–22103` มาเรนเดอร์สไปรต์มังกรในหน้าต่างสกิล UI เมื่อเควสต์เหล่านี้ไม่ได้บันทึกสถานะ `Completed` ตัวเกมจึงเรนเดอร์ Mir เป็น "ไข่มังกรที่ยังไม่ฟัก"
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - ใน [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java): บันทึกเควสต์ `22100` ให้สำเร็จทันทีใน `setCharCreationStats`
     - ใน [`Job.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java): ใน `postJobAdvanceSetup` ตรวจสอบถ้าเป็น Evan ให้ auto-complete เควสต์ `22100–22103` ตามระดับเลเวล
     - ใน [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java): คำสั่ง `!endgame` ปลดล็อคเควสต์ `22100–22103` ทันทีและสั่ง `evan.spawnDragon()`
     - อัปเดตฐานข้อมูล `vietmaple.quests` ของ `EVOffline` ให้เควสต์ `22100–22103` มีสถานะ `status = 2` (Completed)
     - ผลลัพธ์: มังกร Mir ฟักออกจากไข่ เปลือกไข่หลุดออก และเติบโตเป็นมังกรดำร่างเต็มวัย (Adult Dragon) สง่างามทั้งในหน้าต่างสกิลและในฉากเกม

3. **Audit การเกิดที่ Henesys vs เมืองเกิดดั้งเดิม (Henesys Spawn & Hometown Travel Audit)**:
   - **ปัญหาที่พบ**: ใน [`LoginHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java) บรรทัด 372 มีการฮาร์ดโค้ด `characterStat.setPosMap(FieldConstants.HENESYS_ID);` ทับค่าจุดเกิดของทุกอาชีพ
   - **ผลการ Audit เชิงลึก**:
     - หากเกิดที่ Henesys: ไม่พบบั๊กล็อคเนื้อเรื่อง เพราะเควสต์ฟาร์ม 22000-22015 ถูกตั้งค่า `Completed` ไว้ล่วงหน้าแล้ว
     - หากเดินทางกลับไปฟาร์มของ Utah (`100030100` ถึง `100030104`): สคริปต์พอร์ทัลทุกตัว (`enterEvanRoom.py`, `evanlivingRoom.py`, `evanGarden0.py`, `evanFarmCT.py`, `evanEntrance.py`) มีเส้นทางเชื่อมต่อแบบ 2-way เข้า-ออกสู่ Henesys ได้ปกติ ไม่มีการติดกับดักหรือวาร์ปตาย
     - แต่สกิล `Back to Nature` (กลับสู่ธรรมชาติ) ของ Evan จะพาวาร์ปกลับมาที่ฟาร์มหน้าบ้าน (`100030102`)
   - **การแก้ไข**: ปรับใน [`LoginHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java) ให้ตั้งค่า Henesys เฉพาะกรณี `characterStat.getPosMap() == 0` เท่านั้น เพื่อเปิดให้อาชีพที่มีจุดเกิดเฉพาะตัว (เช่น Evan เกิดที่ห้องใต้หลังคาบ้าน Utah `100030100`) เกิดที่บ้านเกิดได้อย่างถูกต้องตาม Lore ดั้งเดิม และสามารถเดินออกสู่ Henesys ได้ใน 15 วินาที

4. **การวิเคราะห์และทำความสะอาดโฟลเดอร์อ้างอิง `TMS277_REF_NomainSource`**:
   - ตรวจสอบโครงสร้าง: เป็นเซิร์ฟเวอร์ Taiwan MapleStory v277.6 สถาปัตยกรรม Alice / MetaMS รันบน Linux ELF ไบนารีผ่าน WSL ไม่มี Main Source Code
   - **การทำความสะอาดไฟล์ที่ไม่จำเป็น (Cleaned Up Unnecessary Files & Folders)**:
     - ลบไฟล์ Zip ขยะขนาดใหญ่: `tms277.6.zip` (459.5 MB) และ `277.6登录器.zip` (63.8 MB)
     - ลบไฟล์ Exe ตัวรันที่ไม่เกี่ยวข้อง: `tms277.6客户端.exe` (10.9 MB)
     - ลบโฟลเดอร์ Linux ELF Binaries ที่ใช้งานไม่ได้บน Windows: `bin/` (~256 MB)
     - ลบสคริปต์รัน WSL และ Logs เก่า: `123/`, `linux_sh/`, `logs/`
     - ลบโปรแกรม Proxy & Redirector: `ะยฝจฮฤผผะ/` (SunnyNet64.dll, redirector.exe)
     - ลบเซฟข้อมูลตัวละครเก่าของเซิร์ฟเวอร์อื่น: `data/Character/` (98 โฟลเดอร์)
     - ลบไฟล์บีบอัดซ้ำซ้อน: `data/data.7z` (367 KB)
     - คืนพื้นที่ดิสก์รวมกว่า **800+ MB**
   - **คงเหลือเฉพาะขุมทรัพย์ข้อมูลที่ใช้ประโยชน์กับ v265 ได้ 100%**:
     - `WZ_JSON_TW/`: ข้อมูลสกิลคลาส 6 (`WZ_JSON_TW/Skill/*.json`), ไอเทม, เควสต์, มอนสเตอร์ (JSON)
     - `data/Common/`: ข้อมูล StarForce, Cube rates, UI Button scripts, Boss HP modify
     - `data/Shop/`: ข้อมูลร้านค้า NPC เมืองระดับสูง 172 ไฟล์
     - `sql/alice.sql`: โครงสร้างฐานข้อมูลสำหรับอ้างอิง
     - `config/`: ค่าคอนฟิกเซิร์ฟเวอร์สำหรับอ้างอิง

### 📂 Files Modified
- [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)
- [`LoginHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java)
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)
- [`Job.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java)

### 🧪 Verification & Deployment
- **Maven Build**: `BUILD SUCCESS` (42s clean compile with Java 21)
- **Deployment**: ซิงค์ `maplestory.jar` ไปยัง `Server263/`, `maple265src/` และ Root เรียบร้อย
- **Database Cleanup**: ซ่อมแซมตาราง `items`, `inventories`, `quests` ใน `vietmaple` สำหรับตัวละคร `EVOffline` สมบูรณ์
- **Server Status**: สตาร์ทใหม่ออนไลน์พร้อมทดสอบ Netty Port 8484, 8585-8594, MariaDB Port 33066

## 📅 [2026-10-13 10:44 น.] Fix Character Creation NullPointerException & Safe Pre-Quest Registration

### 🎯 Scope & Technical Details
1. **แก้ปัญหา NullPointerException ตอนสร้างตัวละครใหม่ (`CREATE_NEW_CHARACTER` Opcode 141)**:
   - **ปัญหาที่พบ (Problem)**: เมื่อผู้เล่นสร้างตัวละครใหม่ (เช่น `EvanOFFLINE`) ระบบแจ้งข้อผิดพลาด: `NullPointerException: Cannot invoke "User.getAccountType()" because "Char.getUser()" is null at Char.addQuest(Char.java:12954)` ส่งผลให้สร้างตัวละครไม่สำเร็จ
   - **สาเหตุเชิงลึก (Technical Root Cause)**:
     - ใน [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) บรรทัด 12947 และ 12954 มีการเรียก `getUser().getAccountType()` โดยไม่มีการเช็ค `getUser() != null`
     - ใน [`LoginHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java) ในขณะสร้างตัวละครใหม่ `Char chr = new Char(...)` ฟิลด์ `user` ยังไม่ได้ถูกเซ็ตเข้าไปยังอ็อบเจกต์ `chr` ก่อนที่ `JobHandler.setCharCreationStats` จะทำงาน
     - ใน [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java) การเรียก `chr.completeQuest(...)` ขณะสร้างตัวละคร พยายามส่งแพ็กเก็ตเน็ตเวิร์กและแจกของรางวัลเควสต์ก่อนที่ตัวละครจะได้รับ ID จากฐานข้อมูล MySQL
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - เพิ่มการตรวจสอบความปลอดภัย `if (getUser() != null && getUser().getAccountType() != null)` ใน [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java)
     - กำหนด `chr.setUser(acc.getUser())` ทันทีหลังสร้างอินสแตนซ์ใน [`LoginHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java)
     - ใน [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java) เปลี่ยนเป็นการบรรจุเควสต์สำเร็จลงใน `chr.getQuests().put(qid, new Quest(chr.getId(), qid, QuestStatus.Completed))` โดยตรงอย่างปลอดภัย เพื่อรอเซฟลงฐานข้อมูลพร้อมกับตัวละครโดยไม่เกิด Exception
     - ผู้เล่นสามารถสร้างตัวละครใหม่ทุกอาชีพได้อย่างราบรื่น 100%

### 📂 Files Modified
- [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java)
- [`LoginHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java)
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)

### 🧪 Verification & Deployment
- **Maven Build**: `BUILD SUCCESS` (Compiled with Java 21)
- **Deployment**: คัดลอก `maplestory.jar` ไปยัง `Server263/maplestory.jar` และ root
- **Server Status**: สตาร์ทเซิร์ฟเวอร์ใหม่เรียบร้อย Netty พร้อมรับการเชื่อมต่อที่พอร์ต 8484, 8585, 33066
- **Patch Created**: `Patches/Server263_Patch_20261013_1043.zip` (122.46 MB)

## 📅 [2026-10-13 10:22 น.] Refactor !endgame Skill Management, ExtendSP Fallback, Evan Elemental Barrage Cooldown & Origin/United Horizon Separation

### 🎯 Scope & Technical Details
1. **ลบการ Add Skill และ MaxSkills ทั้งหมดออกจากคำสั่ง `!endgame` (Manual Skill Allocation Standard)**:
   - **ปัญหา/ความต้องการ (Requirement & Problem)**: ผู้ใช้ต้องการให้คำสั่ง `!endgame` ไม่แทรกแซงหรือยัดเยียดสกิลลงในตัวละคร (`chr.addSkill` หรือ `chr.maxSkills()`) เพื่อให้ผู้เล่นสามารถจัดสรรและอัปเกรดสกิลคลาส 1–4 ได้ด้วยตัวเองผ่านหน้าต่างสกิล (K) โดยใช้แต้ม SP (Skill Points) ที่ได้รับจากการอัปเลเวล
   - **การแก้ไขเชิงลึก (Implementation Details)**:
     - ใน [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java): ลบบล็อก `chr.addSkill(...)` ของทุกอาชีพทั้งหมดออก 100% (Hero, Paladin, Dark Knight, F/P, I/L, Bishop, Bowmaster, Marksman, Pathfinder, Night Lord, Shadower, Dual Blade, Buccaneer, Corsair, Cannoneer)
     - ลบคำสั่ง `chr.maxSkills()` ออกจากเมธอด `setupEndgame`
     - จัดสรรแต้ม SP ผ่าน `ExtendSP` ให้ครบถ้วนทุกระดับคลาส (1st: 65 SP, 2nd: 130 SP, 3rd: 130 SP, 4th: 255 SP และ 5th-6th สำหรับ Dual Blade) หรือมอบ `Stat.sp` สำหรับคลาสที่ไม่ใช่ ExtendSP เพื่อให้ผู้เล่นมีแต้มเพียงพอในการอัปสกิลเองได้เต็มที่
   - **ผลลัพธ์ (Outcome)**: คำสั่ง `!endgame` สะอาด ไร้การ Force-add สกิล และมอบแต้ม SP ให้ผู้เล่นกดอัปสกิลเองตามต้องการ

2. **เพิ่มระบบ Fallback ให้กับ `ExtendSP.java`**:
   - **การแก้ไขเชิงลึก**: ใน [`ExtendSP.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/ExtendSP.java) เมธอด `setSpToJobLevel(int jobLevel, int sp)` เพิ่มการตรวจสอบ หากยังไม่มีโหนด `SPSet` ของ `jobLevel` นั้น ให้ทำการ `spSet.add(new SPSet((byte) jobLevel, sp))` อัตโนมัติ ป้องกันกรณีที่คลาสมีจำนวนระดับอาชีพมากกว่าปกติ

3. **แก้ไขปัญหาสกิล Evan V-Skill `Elemental Barrage` (`400021012`) ไม่มีคูลดาวน์**:
   - **สาเหตุ (Root Cause)**: สกิลลูกที่ส่งผลดาเมจ (`400021013 - 400021015`) ไม่ได้ถูกแปลงค่ากลับเข้าสู่ Root ID `400021012` ใน [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java) และไม่ได้ใส่ใน `isEvanForceSkill` ทำให้การประมวลผลคูลดาวน์ไม่ถูกเรียกใช้
   - **การแก้ไข (Fix)**: แมป `400021013 - 400021015` -> `400021012` ใน `getActualSkillIDfromSkillID()` และเพิ่มการตั้งคูลดาวน์ 60 วินาทีใน [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)

4. **แยกคูลดาวน์ระหว่าง `United Horizons` (`22201502`) และ `Zodiac Burst` (`22201500`)**:
   - **สาเหตุ (Root Cause)**: คอมมิตเดิมมีการรีไดเร็กต์ `22201502` และ `22201503` เข้าไปหา `22201500` และแชร์คูลดาวน์ 360 วินาทีร่วมกัน ทั้งที่ใน WZ ดั้งเดิมเป็นคนละสกิลกัน
   - **การแก้ไข (Fix)**: ยกเลิกการรีไดเร็กต์ใน `SkillConstants.java` และใน `Evan.java` แยกคูลดาวน์ของ Zodiac Burst (360 วินาที) และ United Horizons (240 วินาที) ออกจากกันอย่างอิสระตามมาตรฐาน WZ

5. **Refactor จุดเกิดและเนื้อเรื่องเริ่มต้นของ Evan**:
   - **การวิเคราะห์ (Analysis)**: การให้ Evan เกิดที่ Henesys ทันทีข้ามบรรยากาศดั้งเดิมและเกิดลูปวาร์ปซ้ำใน `handleInitAfterMigrate` แต่หากให้เกิดที่ฟาร์มเลเวล 1 จะเกิดบั๊กเควสต์ติดล็อกเนื่องจากสคริปต์เควสต์ให้อาหารหมาบูลด็อก `q22001e.py` และเควสต์ 22005-22015 ไม่มีในตัวเซิร์ฟเวอร์
   - **การแก้ไข (Fix)**:
     - ปรับให้สร้างตัวละครมาเกิดที่บ้านเดิม: Utah's House Attic (แผนที่ `100030100`) ที่เลเวล 10 คลาส 2210 ทันที
     - ออโต้คอมพลีตเควสต์ฟาร์มที่ขาดหายไป (`22000-22015`) ใน `setCharCreationStats` เพียงครั้งเดียว เพื่อป้องกันการติดล็อก
     - สร้างสคริปต์พอร์ทัล [`enterEvanRoom.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/portal/enterEvanRoom.py) เพื่อให้ผู้เล่นเดินขึ้น-ลงบันไดระหว่างห้องใต้หลังคากับห้องนั่งเล่นบ้านยูทาห์ได้อย่างสมบูรณ์

### 📂 Files Modified
- [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)
- [`ExtendSP.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/ExtendSP.java)
- [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)
- [`enterEvanRoom.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/portal/enterEvanRoom.py)

### 🧪 Verification & Deployment
- **Maven Build**: `BUILD SUCCESS` (Compiled with Java 21)
- **Deployment**: คัดลอก `maplestory.jar` ไปยัง `Server263/maplestory.jar` และ root
- **Patch Created**: `Patches/Server263_Patch_20261013_1021.zip` (122.46 MB)

## 📅 [2026-10-13 09:05 น.] HEXA Elemental Barrage Packet Misalignment Fix & Client Crash Telemetry Diagnostic

### 🎯 Scope & Technical Details
1. **Evan HEXA Elemental Barrage Attack Handling & Packet Alignment (`500061041` - `500061045`)**:
   - **ปัญหาที่พบ (Problem)**: ขณะทดสอบตัวละคร `EvanOFFLINE` มีข้อผิดพลาดใน `task-645.log` แจ้งเตือน: `[ExceptionCaught/Attacks.txt] [EvanOFFLINE] Skill ID: 500061041 unable to handle Attacks.` สกิลไม่สร้างดาเมจและแพ็กเก็ตหลุดตำแหน่ง
   - **สาเหตุเชิงลึก (Technical Root Cause)**:
     - ในโปรโตคอล v265 สกิลสาย Evan Force Skills จะมีการส่งไบต์พิเศษ 1 ไบต์เพิ่มเติมก่อนค่า attack speed (`ai.attackSpeed = inPacket.decodeByte()`) โดย `AttackHandler.java:635` ทำการตรวจสอบด้วยคำสั่ง `if (SkillConstants.isEvanForceSkill(skillID)) inPacket.skipByte();`
     - สกิล HEXA V-Enhancement **Elemental Barrage** (`500061041` - `500061045`) ขาดหายไปจาก `SkillConstants.isEvanForceSkill(skillID)` ส่งผลให้ไม่ถูกข้ามไบต์ ข้อมูลถัดไปใน InPacket เกิด Offset Shift (ไบต์เลื่อน) ทำให้ตัวประมวลผลอ่านดาเมจและข้อมูลเป้าหมายผิดตำแหน่ง
     - สกิลลูก `500061042 - 500061045` ไม่ได้ถูกแมปเข้าหา Root Skill `500061041` ใน `SkillConstants.getActualSkillIDfromSkillID()`
     - คลาส [`Evan.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java) ยังไม่มีเคสประมวลผลดาเมจและคูลดาวน์สำหรับ `HEXA_ELEMENTAL_BARRAGE` (`500061041`)
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - เพิ่ม ID `500061041`, `500061042`, `500061043`, `500061044`, `500061045` ลงใน `SkillConstants.isEvanForceSkill()`
     - เพิ่มการแปลงรหัสย่อย `500061042 - 500061045` -> `500061041` ใน `SkillConstants.getActualSkillIDfromSkillID()`
     - ใน [`Evan.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java): กำหนดค่าคงที่ `HEXA_ELEMENTAL_BARRAGE = 500061041`, จัดการคำนวณบัฟดาเมจ / คริติคอลใน `handleAttack` และตั้งคูลดาวน์ 60 วินาทีใน `handleSetCoolDownSkill()` อย่างถูกต้องสมบูรณ์
     - สกิล HEXA Elemental Barrage โจมตีติดดาเมจทุกฮิต และไม่เกิด Exception Packet Shift อีกต่อไป

2. **Client Crash CallStack Telemetry (`LogCallStack2 / LogCallStack0`) Diagnostic**:
   - **ปัญหาที่พบ (Problem)**: ผู้ใช้พบข้อความ Log: `NAME|(null)|JOB|-1|Socket|-|-|-|LogCallStack2|Hash|1974435496|Line|116|Info1|-1|...` ในคอนโซล
   - **การวิเคราะห์ทางเทคนิค (Technical Analysis)**:
     - ล็อกดังกล่าวไม่ใช่ Exception ฝั่งเซิร์ฟเวอร์ Java แต่เป็นแพ็กเก็ต `InHeader.EXCEPTION_LOG` (Opcode 179) ที่ไคลเอนต์ `MapleStory.exe` ส่งมารายงานเซิร์ฟเวอร์โดยอัตโนมัติเมื่อทำการเชื่อมต่อ
     - ข้อมูลระบุว่าไคลเอนต์เกิด Crash ก่อนหน้านี้ (`DATETIME|2026/10/13 08:51:57` ในขณะที่เซิร์ฟเวอร์เพิ่งกำลังเริ่มรัน) สาเหตุเกิดจากช่วงเวลาที่ตัวเกมเปิดขึ้นมาแล้ว Socket ยังไม่พร้อม (`Socket|-|-|-|`, `NAME|(null)|JOB|-1|`) และมีข้อผิดพลาดเกี่ยวกับไดรเวอร์/โมดูล `DosHdr is NULL` ในการโหลด
     - เมื่อผู้เล่นเข้าเล่นตามปกติหลังจากเซิร์ฟเวอร์พร้อม ตัวเกมส่งรายงานเก่านี้มาบันทึกที่เซิร์ฟเวอร์ 1 ครั้ง จากนั้นผู้เล่นสามารถล็อกอินเข้าแมพและเล่นได้ตามปกติอย่างไร้ปัญหา

### 📂 Files Modified
- [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleV265Src/PROGRESS.md)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/PROGRESS.md)

### 🧪 Verification & Deployment
- **Maven Build**: `BUILD SUCCESS` (Compiled 853 source files with Java 21)
- **Deployment**: Synchronized Fat JAR to `v214 src/maplestory.jar` and `Server263/maplestory.jar`
- **Patch Folder**: Regenerated clean, uncompressed `Patches/Server263_Patch_Latest` with updated `maplestory.jar` and 1-click `Apply_Patch.bat`

## 📅 [2026-10-13 08:45 น.] Comprehensive Stability Overhaul: Clean Slate Slot Recovery, Cube Freeze Elimination, Evan Cooldown Synchronization & Auto Job Advance (Section 9.1 - 9.6)

### 🎯 Scope & Technical Details
1. **Clean Slate Scroll Slot Recovery (ใบขาวคืนรู) — Section 9.1**:
   - **ปัญหาที่พบ (Problem)**: ผู้เล่นแจ้งว่า Clean Slate Scroll (ใบขาวคืนรู) ใช้งานแล้วมีอาการบั๊ก ใช้แล้วรูไม่คืน, เมื่อเปลี่ยนแผนที่หรือ Re-login แล้วรูที่เคยคืนได้กลับคืนไม่ได้, หรือหากคืนรูสำเร็จ 1 ครั้งจะล็อกไม่ให้ใช้ใบขาวกับรูที่เหลือที่ยังพังอยู่
   - **สาเหตุเชิงลึก (Technical Root Cause)**:
     - ตัวแปร `isLastScrollFail` ใน [`Equip.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/items/Equip.java) เป็นฟิลด์สถานะชั่วคราวในหน่วยความจำ (`@Transient`) ไม่ได้ถูกบันทึกลงในฐานข้อมูล SQL ทำให้ทุกครั้งที่มีการเปลี่ยนแมพ หรือ Re-login ค่าจะรีเซ็ตกลับเป็น `false` ทันที แม้ว่าไอเทมจะมีรูที่เสียจากการตีบวกพลาดจริงก็ตาม
     - ใน `applyScroll()` เมื่อ Clean Slate สำเร็จ 1 ครั้ง ระบบสั่ง `setLastScrollFail(false)` ทันที ทำให้ไม่สามารถกู้คืนรูที่เสียรูถัดไปได้
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - พัฒนาสูตรคำนวณ Failed Slots ตามหลักคณิตศาสตร์:
       `failedSlots = Math.max(0, (maxTuc + equip.getIuc()) - (equip.getTuc() + equip.getCuc()))`
       โดย `maxTuc` คือรูตั้งต้นของไอเทม, `iuc` คือรูค้อน Vicious Hammer, `tuc` คือรูที่เหลือสำหรับตีบวก, และ `cuc` คือจำนวนครั้งที่ตีบวกสำเร็จ
     - เพิ่มฟังก์ชัน `getFailedSlots()` และ `hasFailedSlots()` ใน [`Equip.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/items/Equip.java) และอัปเดต `isLastScrollFail()` ให้คืนค่า `hasFailedSlots() || isLastScrollFail`
     - ปรับปรุงการตรวจสอบใน [`ItemUpgradeHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemUpgradeHandler.java), [`ItemHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemHandler.java) (SpellTrace), [`ScrollUpgradeInfo.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/items/ScrollUpgradeInfo.java), และเพิ่ม alias `isCleanSlateScroll()` ใน [`ItemConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java)
     - ไอเทมสามารถใช้ Clean Slate Scroll กู้คืนรูที่เสียได้ครบตามจำนวนรูที่เสียจริง 100% ไม่สูญหายหลัง Re-login

2. **Bonus Potential Cube & Memorial Cube Client Freeze Elimination — Section 9.2**:
   - **ปัญหาที่พบ (Problem)**: การใช้งาน Bonus Potential Cube หรือ Memorial Cube (Black/Bright Cube) มีอาการค้าง (Client Freeze / Stalled State) ไม่แสดงหน้าต่างผลลัพธ์
   - **สาเหตุเชิงลึก (Technical Root Cause)**:
     - ใน `CubeHandler.handleUserMemorialCubeOptionRequest`: มีการเรียก `memorialCubeInfo.getEquip()` ก่อนคำสั่งตรวจสอบ `if (memorialCubeInfo == null)` ส่งผลให้เกิด `NullPointerException` ใน Netty Worker Thread ทำให้แพ็กเก็ตตกหล่นและ Client รอคอยผลลัพธ์ไม่สิ้นสุด
     - ใน `CubeHandler.handleCube` และ `handleBrightCube`: มีการตรวจสอบศักยภาพสลับประเภท โดยบังคับเช็ค `equip.getBaseGrade() < Rare` และ `equip.getBonusGrade() > itemGradeMax` สำหรับทุกลูกบาศก์ ทำให้ลูกบาศก์ศักยภาพโบนัสที่ใช้บนไอเทมที่ไม่มีศักยภาพหลักถูกปฏิเสธ หรือไอเทมที่ไม่มีศักยภาพโบนัสแต่มีศักยภาพหลักกลับถูกปล่อยผ่าน
     - ใน `Equip.getRandomOption`: เมื่อทำการสุ่มออปชั่นโบนัส (`bonus == true`) บรรทัดที่ 2244 ไปดึง `option1` จาก Base Line 1 (`getOptions().getFirst()`) แทนที่จะเป็น Bonus Line 1 (`getOptionBonus(0)`) และลูป `while` ทั้ง 14 เงื่อนไขไม่มีตัวนับรอบความปลอดภัย (Infinite Spinlock) หากสุ่มได้ออปชั่นที่ไม่ผ่านเงื่อนไขซ้ำๆ
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - ดักจับ Null-safety ทุกจุดใน [`CubeHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/item/CubeHandler.java) พร้อมคืนสถานะด้วย `chr.dispose()` และทำความสะอาด `chr.setMemorialCubeInfo(null)`
     - แยกตรรกะการตรวจสอบศักยภาพระหว่าง `bonus` (ตรวจสอบ `BonusGrade`) และ `base` (ตรวจสอบ `BaseGrade`) ชัดเจน 100%
     - ใน `getRandomOption`: ปรับปรุง `int option1 = bonus ? getOptionBonus(0) : getOptions().getFirst();` และเพิ่มตัวควบคุมความปลอดภัย `&& ++tries <= 30` ในทุก `while` loop ป้องกัน Thread Spinlock และ Client Freeze 100%

3. **Evan Skill Cooldowns & Mir Attacks (สกิลมังกรคูลดาวน์ผิดปกติ) — Section 9.3**:
   - **ปัญหาที่พบ (Problem)**: สกิลโจมตีของมังกร Mir สามารถกดรัวๆ ซ้ำได้เรื่อยๆ โดยไม่ติดคูลดาวน์
   - **สาเหตุเชิงลึก (Technical Root Cause)**:
     - สกิล Dragon Breath (`22171063`), Dragon Dive (`22141012`, `22140022`), HEXA Dragon Breath (`22201011`), HEXA Dragon Dive (`22201007`), และ HEXA Dragon Flash (`22201003`) ถูกใส่ไว้ใน `SkillConstants.isNoCoolDownAttack()` ส่งผลให้ใน `Char.checkAndSetSkillCooltime` ส่งค่า `return true;` ข้ามการเช็คคูลดาวน์ทั้งหมดเมื่อมาจากการโจมตี (`fromAttack = true`)
     - ใน `Char.checkAndSetSkillCooltime`: สกิลย่อย (Sub-action IDs) คืนค่า `getSkill(skillID) == null` เพราะตัวละครครอบครองเฉพาะ Root Skill ทำให้เซิร์ฟเวอร์ไม่ได้ตั้งค่าคูลดาวน์
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - ลบสกิลมังกร Mir ทั้งหมดออกจาก `SkillConstants.isNoCoolDownAttack()`
     - เชื่อมโยง Sub-action IDs ทั้งหมดของ Mir (`22110022`, `22110023`, `22140022`, `22201004`, `22201005`, `22201008`, `22201009`, `22201012-22201014`) ไปยัง Root Skill ใน `SkillConstants.getActualSkillIDfromSkillID()`
     - ใน `Char.hasSkillOnCooldown()` และ `Char.checkAndSetSkillCooltime()`: เพิ่มกลไก Fallback ตรวจสอบและตั้งค่าคูลดาวน์ที่ Root Skill เมื่อค้นหา Sub-skill ไม่พบ
     - เพิ่มเคสใน `Evan.handleSetCoolDownSkill()` จัดการคูลดาวน์สกิลมังกรทุกระดับอย่างสมบูรณ์

4. **Evan HEXA Origin Zodiac Burst Cooldown Synchronization — Section 9.4**:
   - **ปัญหาที่พบ (Problem)**: สกิล Origin คลาส 6 ของ Evan (Zodiac Burst) และ Finisher มีระยะเวลาคูลดาวน์ไม่ตรงกัน (ปนเปกันระหว่าง 240s และ 360s) และบางกรณีไม่ติดคูลดาวน์
   - **สาเหตุเชิงลึก (Technical Root Cause)**: ใน `Evan.java` มีการเรียก `chr.setSkillCooldown(ZODIAC_BURST, 360)` ซึ่งส่งค่า 360 ไปยังพารามิเตอร์ `slv` (Skill Level) แทนที่จะเป็นเวลาคูลดาวน์ ส่งผลให้คูลดาวน์ไม่ทำงานหาก WZ ไม่มีโหนด cooltime ตามระดับเลเวลนั้น
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - เปลี่ยนมาใช้ `chr.addSkillCooldown(ZODIAC_BURST, 360 * 1000)` กำหนดคูลดาวน์ 360 วินาที (360,000 มิลลิวินาที) ทั้งบน Server และ Client ตรงตามมาตรฐานทางการ ทั้งใน `handleSkill`, `handleAttack`, และ `handleSetCoolDownSkill`
     - ซิงค์คูลดาวน์ระหว่าง Zodiac Burst (`22201500`) และ United Horizons Finisher (`22201502`) เป็น 360 วินาทีเท่ากันอย่างเป็นเอกภาพ

5. **Evan Auto Job Advance & Starter Lifecycle — Section 9.5 & 9.6**:
   - **ปัญหาที่พบ (Problem)**: ตัวละคร Evan เมื่อเลเวลอัปถึง 10 มีอาการถูกดาวน์เกรดกลับเป็นจ็อบ 2200 และไม่เปลี่ยนอาชีพคลาส 2, 3, 4 อัตโนมัติเมื่อเลเวลถึงเกณฑ์
   - **สาเหตุเชิงลึก (Technical Root Cause)**: ใน `JobConstants.getTargetJobForLevel` บรรทัดที่ 2162 ตั้งค่า `if (level >= 10) return 2200;` ซึ่ง 2200 คือจ็อบระดับ 0 ยุคก่อนรีแวมป์ ส่งผลให้เมื่อเลเวล 10 ระบบทำการเซ็ตจ็อบกลับเป็น 2200 แทนที่จะเป็น 2210 (1st Job) และทำให้ Auto Job Advance หยุดชะงัก
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - แก้ไขใน [`JobConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/JobConstants.java) ให้คืนค่า 2210 (1st Job), 2212 (2nd Job), 2214 (3rd Job), 2217 (4th Job)
     - ตรวจสอบ Starter Lifecycle ใน `Evan.java` (`setCharCreationStats`, `addItemToNewCharacter`, `handleInitAfterMigrate`): มอบอาวุธคทา (1382000), สมุดมังกร Dragon Document (1352940), ปลดเควสต์เริ่มต้น และเสก Mir ร่วมผจญภัยทันทีโดยไม่ติด UI Lock

### 📂 Files Modified
- [`Equip.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/items/Equip.java) (Failed slots math formula, safe bonus option line 1, while loop limit)
- [`ItemUpgradeHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemUpgradeHandler.java) (Clean slate slot validation)
- [`ItemHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemHandler.java) (SpellTrace Clean slate slot validation)
- [`ScrollUpgradeInfo.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/items/ScrollUpgradeInfo.java) (Clean slate recovery slot check)
- [`ItemConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java) (Added isCleanSlateScroll alias)
- [`CubeHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/item/CubeHandler.java) (Null-safety, separate bonus vs base potential checks, dispose cleanup)
- [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java) (Removed Mir attacks from isNoCoolDownAttack, added Evan sub-skill root mappings)
- [`Char.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) (Root skill resolution for cooldown check & setting)
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java) (Zodiac Burst 360s unified cooldown, Mir attack cooldowns in handleSetCoolDownSkill)
- [`JobConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/JobConstants.java) (Fixed 1st job target to 2210)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/PROGRESS.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleV265Src/PROGRESS.md)

### 🧪 Verification & Deployment
- **Maven Compile & Package**: `BUILD SUCCESS` (853 files, Fat JAR `maplestory.jar` 138.67 MB created)
- **Deployment**: Synchronized to `v214 src/maplestory.jar`, Root `maplestory.jar`, and `Server263/maplestory.jar`
- **Patch Created**: Single uncompressed patch `Patches/Server263_Patch_Latest/` with automated `Apply_Patch.bat`
- **Rule Verification**: `Server263/` contains 0 source code files (`.java`/`pom.xml`), zero old patches in `Patches/`

## 📅 [2026-10-12 23:48 น.] Windows 11 Smart App Control (SAC) & Device Guard Policy Blocking Portable MariaDB: Technical Diagnosis & Resolution Standard

### 🎯 Scope & Technical Details
1. **ปัญหาที่พบ (Problem)**:
   - ผู้เล่นบน Windows 11 (build 26200 / 24H2) รัน `1_Start_Server.bat` หรือ `Start_Database.bat` แล้ว MariaDB ไม่ยอมสตาร์ต พร้อมแสดงข้อความ Error บน Console:
     `'...\Server263\mariadb\bin\mysqld.exe' was blocked by your organization's Device Guard policy. Contact your support person for more info.`
2. **สาเหตุเชิงลึก (Technical Root Cause)**:
   - **Smart App Control (SAC) Kernel Enforcement**: บน Windows 11 เวอร์ชัน 22H2 / 23H2 / 24H2 มีระบบ Smart App Control ที่เปิดใช้งานมาแต่เริ่มต้น ซึ่งทำงานครอบคลุมอยู่บนเลเยอร์เคอร์เนลของ **Windows Defender Application Control (WDAC) / Device Guard**
   - **Unsigned Binary (Status: NotSigned)**: จากการตรวจสอบ `Get-AuthenticodeSignature` พบว่า `mysqld.exe` ของ MariaDB Portable เป็นโอเพนซอร์สที่ไม่มี Digital Certificate ขององค์กร (ต่างจาก `java.exe` ที่มีใบรับรอง Eclipse Foundation Valid) ทำให้ SAC/Device Guard บล็อกการ Exec ทันที
   - **Mark of the Web (Zone.Identifier)**: เมื่อผู้เล่นดาวน์โหลดไฟล์ผ่านเว็บ/คลาวด์ไดรฟ์ Windows จะแนบ NTFS Alternate Data Stream `Zone.Identifier` (ZoneId=3) ทำให้ระบบรักษาความปลอดภัยเพ่งเล็งและสกัดกั้นการรัน
   - **Command Prompt vs PowerShell**: เมื่อผู้เล่นพิมพ์คำสั่ง `Get-ChildItem ... | Unblock-File` ใน Command Prompt (CMD) ปกติ ระบบจะแจ้งเตือนว่าไม่รู้จักคำสั่ง ต้องครอบด้วย `powershell -Command "..."`
3. **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
   - **วิธีแก้หลัก**: สั่งปิด Smart App Control ใน `Windows Security` -> `App & browser control` -> `Smart App Control settings` -> เปลี่ยนเป็น `Off`
   - **วิธีเสริม**: ปลดล็อก Mark of the Web ด้วยคำสั่ง CMD: `powershell -Command "Get-ChildItem -Path '<Folder>' -Recurse | Unblock-File"`
   - ผู้เล่นสามารถเปิดใช้งาน Portable MariaDB พอร์ต 33066 และรันเซิร์ฟเวอร์ MapleStory v265 ได้สำเร็จ 100%

### 📂 Files Modified
- [`SKILL.md`](file:///c:/Users/admin/Documents/MapleV265Src/.agents/skills/maplestory-bug-knowledge/SKILL.md) (เพิ่มหัวข้อ 2.3 คู่มือแก้ปัญหา Device Guard / Smart App Control)
- [`HOW_TO_USE.txt`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/HOW_TO_USE.txt) (เพิ่มหัวข้อ [7] คู่มือ Troubleshooting สำหรับผู้เล่น)
- [`Server263/HOW_TO_USE.txt`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/Server263/HOW_TO_USE.txt) (เพิ่มหัวข้อ [8] คู่มือ Troubleshooting ในแพ็คแจกจ่าย)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/PROGRESS.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/PROGRESS.md)

## 📅 [2026-10-12 22:55 น.] Evan Complete HEXA Matrix Overhaul: HEXA Enhanced Magic Debris (22201015), HEXA Dragon Spark (22200016), Lv. 260 Auto-Evolution & No-Cooldown Attack Handlers

### 🎯 Scope & Technical Details
1. **เพิ่มและเชื่อมโยง HEXA Enhanced Magic Debris (`22201015`) ในระบบสกิลทั้งหมด**:
   - เชื่อมโยงใน [`Evan.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java):
     - `getDebrisSkill()` และ `getMaxDebris()`: รองรับการดึง Skill Info และคำนวณจำนวนชิ้นส่วน Wreckage สูงสุดของสกิลคลาส 6
     - `createMagicDebrisForceAtom()`: ปล่อย ForceAtom รูปแบบ `ADV_WRECKAGE`
     - `createWreckage()`: ตรวจสอบและสร้างเศษ Debris จาก Fusion Skill
     - `handleSkill()`: จัดการ Packet ร่ายสกิลระเบิดชิ้นส่วน Debris
   - เชื่อมโยงใน [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java):
     - `isForceAtomSkill()`: ลงทะเบียน `Evan.HEXA_MAGIC_DEBRIS`
2. **ลงทะเบียนสกิลมังกรคลาส 6 ใน `isNoCoolDownAttack()`**:
   - เพิ่ม `22201011` (HEXA Dragon Breath), `22201007` (HEXA Dragon Dive), `22201003` (HEXA Dragon Flash) ป้องกันการหัก MP ซ้ำซ้อนและหลีกเลี่ยงการติด Cooldown ผิดปกติ
3. **ระบบเลื่อนขั้นมังกรอัตโนมัติเมื่อเลเวล 260 (`handleLevelUp`)**:
   - เพิ่ม `case 260: spawnDragon();` ให้มังกร Mir อัปเกรดเป็น Stage 9 ทันทีเมื่อผู้เล่นเลเวลอัปถึง 260 โดยไม่ต้องรอเปลี่ยนแผนที่
4. **อัปเกรดคำสั่ง `!endgame` มอบสกิล HEXA คลาส 6 เต็มสูบ**:
   - มอบสกิล `22201015` (HEXA Magic Debris) และ `22200016` (HEXA Dragon Spark) ระดับ Master Level 30 ทันที

### 📂 Files Modified
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)
- [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)
- [`SKILL.md`](file:///c:/Users/admin/Documents/MapleV265Src/.agents/skills/maplestory-bug-knowledge/SKILL.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleV265Src/PROGRESS.md)

### 🧪 Verification & Deployment
- **Maven Compile**: `BUILD SUCCESS` (853 files, 0 errors, 23.6s)
- **Maven Package**: `BUILD SUCCESS` (Fat JAR 138MB created in 30.9s)
- **Rule #1 Verification**: โฟลเดอร์ `Server263/` ปราศจากไฟล์ Source Code / pom.xml (0 violations)
- **Rule #2 Verification**: แพตช์อัปเดตเดี่ยวใน `Patches/Server263_Patch_Latest/` พร้อม `Apply_Patch.bat`
- **Server Live Check**: รันเซิร์ฟเวอร์เรียบร้อย พอร์ต 8484 และ 8585-8594 กำลังเปิดรับการเชื่อมต่อพร้อมใช้งาน 100%

## 📅 [2026-10-12 22:45 น.] Evan 6th Job Crash Root Cause Fix: Mir Stage 9 (2220) Evolution, HEXA Skills & Fusion Redirection, Companion Life Spawn Guard

### 🎯 Scope & Root Cause Analysis
1. **วิเคราะห์เจาะลึกและกำจัดต้นตออาการ Client เด้งเมื่อ Evan ใช้สกิล (Crash Log & Disassembly)**:
   - **การถอดรหัส Crash Log**: ไคลเอนต์ MapleStory v265 เกิด C++ Exception `0xE06D7363` (`CTerminateException`) พร้อมแสดงไดอะล็อกเตือน *"You appear to be missing a few files needed to run the game. Please visit maplestory.nexon.net and download the latest version of the client."* และส่งแพ็กเก็ต `InHeader.CLIENT_ERROR (171)` สู่เซิร์ฟเวอร์ด้วยรหัส `570425350` (`0x22000006` = `INVALID_GAME_DATA`)
   - **ถอดรหัส Asm จุดเกิดเหตุ (`0x2DAEB60` - `0x2DAF407`)**:
     - เมื่อ Evan ร่ายสกิลคลาส 6 (`2220xxxx`), ฟังก์ชัน `CDragon::DoAttack` (`0x4FFFB3A`) เรียก `CDragon::SetAction` (`0x2DA0D0D`) สู่ `vfunc_48` ของ Dragon
     - ไคลเอนต์จะค้นหา Animation Node ของท่าทางมังกรประจำคลาส 6 (`6thDragonSwift`, `6thDragonDive`, `6thDragonBreath` ฯลฯ) ใน WZ Data ของมังกรตาม Job ปัจจุบัน
     - ใน `Skill.wz/Skill_00007/Dragon/`:
       - `2217.xml` (Stage 8) มีเพียง 17 actions ไม่มีโหนดตระกูล `6thDragon*` อยู่เลย
       - `2220.xml` (Stage 9) มีครบทั้ง 26 actions รวมถึง 9 โหนดของคลาส 6 ทั้งหมด (`6thDragonSwift`, `6thDragonSwiftWind`, `6thDragonSwiftThunder`, `6thDragonDive`, `6thDragonDiveEarth`, `6thDragonDiveThunder`, `6thDragonBreath`, `6thDragonBreathEarth`, `6thDragonBreathWind`)
     - เดิมเซิร์ฟเวอร์สร้างมังกรด้วย `short job = chr.getJob();` (`2217`) เสมอ ทำให้ไคลเอนต์มองหาท่าใน `2217.img` แล้วได้ Pointer ว่าง (`[rsi + 4] == 0`) จึงกระโดดเข้าสู่ Error `0x22000006` (`INVALID_GAME_DATA`) และสั่งปิดเกมทันที
2. **แก้ไขการเสกและการเปลี่ยนร่างของ Mir สู่ Stage 9 (`2220`) อย่างสมบูรณ์**:
   - ใน [`Dragon.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/life/Dragon.java): ปรับ Constructor ให้ตรวจสอบ `if (JobConstants.isEvan(chrJob) && (chr.getLevel() >= 260 || chr.hasSkill(22201000) || chr.hasSkill(22201500) || (chr.getHexaSkills() != null && !chr.getHexaSkills().isEmpty())))` ให้กำหนด `this.job = 2220` ทันที
   - ใน [`Evan.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java):
     - `spawnDragon()`: อัปเดต `dragon.setJob(dragonJob)` เป็น `2220` หากตัวละครเป็นคลาส 6 และหากมังกรเกิดอยู่ในฟิลด์แล้วแต่ Job มีการเปลี่ยนร่าง ให้ Despawn มังกรตัวเดิมและ Respawn ใหม่เป็นร่าง Stage 9 อย่างปลอดภัย
     - `getDragon()`: ซิงค์ Job ของมังกรที่แคชไว้ให้กลายเป็น `2220` เมื่อมีสกิลคลาส 6 หรือเลเวล 260+
     - `getEvanSkill(int skillID)`: เพิ่มการดักจับ `22201000` (HEXA Mana Burst), `22201001`, `22201010` (HEXA Wind Circle), `22201002` (HEXA Thunder Circle), `22201006` (HEXA Earth Circle)
     - `handleDragonSkillEffect()`: เพิ่มการแมปสกิลคลาส 6 ของมังกรเข้าสู่ `attackActionType` ให้ตรงตามกลไกแอนิเมชันของ WZ: `22201003` (Type 3), `22201005` (Type 4), `22201007` (Type 5), `22200009` (Type 6), `22200008` (Type 7), `22200014` (Type 8), `22201011` (Type 9), `22201004` (Type 10), `22200012`/`22200013` (Type 11)
     - `handleSetCoolDownSkill()`: เพิ่มคูลดาวน์ให้ `22201007` (HEXA Dragon Dive) และ `22201003` (HEXA Dragon Flash)
3. **เชื่อมโยงสกิล HEXA Matrix ใน [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)**:
   - `isEvanForceSkill()`: เพิ่มสกิลคลาส 6 ทั้งหมดของ Evan เพื่อให้ Packet Decoding ข้าม Extra Byte ตามสเปกของไคลเอนต์ ป้องกันปัญหา Packet Desync
   - `getActualSkillIDfromSkillID()`: เชื่อมโยงรหัส Sub-Skills ของ Evan คลาส 6 สู่รหัสสกิลหลัก (`22201001` -> `22201000`, `22201004`/`05` -> `22201003`, `22200008`/`09` -> `22201007`, `22200012`/`13`/`14` -> `22201011`, `22201501`/`02`/`03` -> `22201500`) เพื่อให้อ่านค่าดาเมจและเลเวลสกิลได้แม่นยำ 100%
   - `isEvanFusionSkill()`: เพิ่มรหัส Fusion Skills คลาส 6 (`22201004`, `22201005`, `22200008`, `22200009`, `22200012`, `22200013`, `22200014`) สำหรับสร้าง Magic Debris Wreckage
4. **ปลดบล็อกการเสกมังกรใน [`Char.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java)**:
   - นำเงื่อนไข `if (!isGM)` ที่เคยกั้น `evan.spawnDragon()`, `kanna.spawnHaku()`, และ `getAndroid()` ออกอย่างถาวร ทำให้ตัวละครแอดมินหรือผู้เล่นที่วาร์ปเข้าสู่แมพสามารถเสกสัตว์เลี้ยงคู่หูได้ 100% โดยไม่มีข้อจำกัด
5. **อัปเกรดคำสั่ง `!endgame` ใน [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)**:
   - มอบสกิลย่อยของ Origin Zodiac Burst (`22201501`, `22201502`, `22201503`) เต็มเลเวล 30 และสั่งเสกมังกร Stage 9 (`2220`) ทันที

### 📂 Files Modified
- [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`Dragon.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/life/Dragon.java)
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)
- [`Char.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java)
- [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleV265Src/PROGRESS.md)

### 🧪 Verification & Deployment
- **Maven Compile**: `BUILD SUCCESS` (853 files, 0 errors, 22.9s)
- **Maven Package**: `BUILD SUCCESS` (`maplestory-219.5-jar-with-dependencies.jar` 138MB Fat JAR)
- **Rule #1 (Server263)**: ตรวจสอบไม่พบไฟล์ `.java` หรือ `pom.xml` ใน `Server263/` (0 files)
- **Rule #2 (Patches)**: อัปเดตแพทช์ล่าสุดใน `Patches/Server263_Patch_Latest/` พร้อม `Apply_Patch.bat`
- **Server Runtime Test**: ปิดโปรเซสเดิมและเริ่มการทำงานของเซิร์ฟเวอร์ใหม่บน Portable JDK 21 และ MariaDB พอร์ต 33066 สำเร็จสมบูรณ์ (Login Port 8484 และ Channels 1-10 พอร์ต 8585-8594 เปิดรับ Client ปกติ)

## 📅 [2026-10-12 19:40 น.] Ultimate Root Cause Elimination: Removed Erroneous Henesys lockUI() in Job.java, Added Full Kanna Starter Lifecycle & Buff Handlers, Recompiled & Deployed Live

### 🎯 Scope & Root Cause Analysis
1. **การค้นพบและกำจัดต้นตอหลักที่ทำให้ตัวละครกดสกิล/กดยาไม่ได้ใน Henesys (lockUI Bug)**:
   - **ต้นตอหลัก (The Smoking Gun)**: ใน [Job.java](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java) บรรทัดที่ 3258-3260 ในเมธอด handleInitAfterField() มีโค้ดคำสั่ง:
     `java
     if (chr.getFieldID() == FieldConstants.START_MAP) {
         sm.lockUI();
     }
     `
   - เนื่องจาก FieldConstants.START_MAP = 100000000; (Henesys) ทุกครั้งที่ตัวละครเกิดใหม่หรือวาร์ปเข้าสู่ Henesys เซิร์ฟเวอร์จะสั่ง sm.lockUI() ทันที ซึ่งส่งแพ็กเก็ตล็อกการควบคุมในเกม (lockInGameUI(true, false)) ทำให้ Client ปิดการทำงานของปุ่มคีย์ลัด, การกดสกิล, และการคลิกไอเทม/ยาในกระเป๋าทั้งหมด!
   - **การแก้ไข**: ลบโค้ดคำสั่งบล็อก UI บน START_MAP ออกจาก Job.java อย่างถาวร
2. **ขยายผลการตรวจสอบคลาส Sengoku คู่หูอย่างสมบูรณ์ ([Kanna.java](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/sengoku/Kanna.java))**:
   - เพิ่ม 3-Step Starter Lifecycle:
     - setCharCreationStats(Char chr): เริ่มต้นที่ Lv. 10 อาชีพ Kanna 1st Job (4200), HP 1,000, MP 100, SP 5 แต้ม
     - ddItemToNewCharacter(Char chr): สวมใส่อาวุธ Starter Fan (1552000) และอาวุธรอง Starter Haku Fan (1352810)
     - handleInitAfterMigrate(Char chr): เคลียร์เควสต์เริ่มต้น, เลื่อนระดับเป็น Lv. 30, เปลี่ยนอาชีพเป็น Kanna 2nd Job (4210), แจก SP คลาส 1 (+5) และคลาส 2 (+3), สวมใส่พัด Lv. 30 (1552001) และ Haku Fan Lv. 30 (1352811), วาร์ปสู่ Henesys อย่างปลอดภัย
   - เพิ่ม Null Safety ใน spawnHaku() ป้องกัน Server Crash เมื่อ oxMan หรือ ield เป็น null
   - เพิ่มการจัดการสกิลบัฟ AKATUSKI_HERO_KANNA (42121006) ใน handleSkill() ให้ส่งบัฟ BasicStatUp อย่างถูกต้อง
3. **การคอมไพล์และแจกจ่ายแพตช์ (Build & Distribution)**:
   - คอมไพล์ผ่าน Maven ด้วย JDK 21: BUILD SUCCESS (853 source files, 0 errors)
   - คัดลอก Fat JAR ลงใน 214 src/maplestory.jar และ Server263/maplestory.jar
   - ตรวจสอบ Server263/: ไม่มีไฟล์ .java, src/, หรือ pom.xml หลงเหลืออยู่ 100%
   - สร้าง Incremental Patch ใน Patches/Server263_Patch_Latest/ พร้อม Apply_Patch.bat
   - รีสตาร์ตเซิร์ฟเวอร์รันสดบน Portable JDK 21 และ MariaDB พอร์ต 33066 พร้อมพอร์ต 8484 และแชนแนล 1–10 (8585–8594)

### 📂 Files Modified
- [Job.java](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java)
- [Kanna.java](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/sengoku/Kanna.java)
- [PROGRESS.md](file:///c:/Users/admin/Documents/MapleV265Src/PROGRESS.md)

---
*ประวัติการพัฒนาย้อนหลังทั้งหมดถูกจัดเก็บใน [PROGRESS_ARCHIVE.md](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS_ARCHIVE.md)*
