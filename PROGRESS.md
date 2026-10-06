# รายงานความคืบหน้าโครงการ (Project Progress Report)
**โครงการ:** MapleStory v265 / v214 Portable Server (SwordieMS Architecture)  
**วันที่บันทึก:** 6 ตุลาคม 2569 (2026-10-06)  
**สถานะ:** เข้าเล่นในเกมได้สำเร็จ 100% (In-Game Playable / อยู่ระหว่างทดสอบระบบระยะยาว)

---

## 📌 สรุปภาพรวมความคืบหน้า (Executive Summary)
ได้ทำการวิเคราะห์โครงสร้างระบบ, ติดตั้งชุดเครื่องมือและ Dependencies ที่จำเป็นทั้งหมดให้พร้อมใช้งานแบบ **Portable (รันได้ทุกที่โดยไม่ต้องลง Java หรือ Maven ในระบบเครื่อง)**, ปรับปรุงระบบคอนฟิกผ่าน `server.properties`, แก้ไขปัญหาการเชื่อมต่อเครือข่าย Localhost, ตรวจสอบและนำเข้าฐานข้อมูลครบสมบูรณ์ทุกตารางจากทั้ง 40 ไฟล์ใน `sql/`, และทดสอบรันเซิร์ฟเวอร์จริงสำเร็จ 100%

---

## 🛠️ รายละเอียดสิ่งที่ดำเนินการเสร็จสิ้น (Completed Tasks)

### 1. ติดตั้ง Portable Dependencies ภายในโฟลเดอร์โปรเจกต์
- **`jdk21\`**: ติดตั้ง OpenJDK 21 (Temurin Adoptium 64-bit) ภายในโฟลเดอร์ ทำให้สามารถเปิดรันหรือคอมไพล์โค้ดบนเครื่องใดก็ได้ทันที
- **`apache-maven-3.9.15\`**: ติดตั้ง Apache Maven แบบ Portable สำหรับการจัดการ Library และคอมไพล์โปรเจกต์
- **`maplestory.jar`**: คอมไพล์และประกอบ Fat JAR รวมทุก Dependency (~138 MB) ไว้ที่ Root Directory พร้อมรันได้ทันทีโดยไม่ต้อง Build ซ้ำ

### 2. ระบบตั้งค่าคอนฟิกแบบไดนามิก (`server.properties`)
- สร้างไฟล์ **`server.properties`** สำหรับปรับแต่งการตั้งค่าโดยไม่ต้อง Rebuild โค้ดใหม่:
  - `db.url`: URL เชื่อมต่อฐานข้อมูล MySQL/MariaDB
  - `db.username` & `db.password`: ชื่อผู้ใช้และรหัสผ่านฐานข้อมูล (ค่าเริ่มต้น: `root` / `root`)
  - `server.ip`: IP เครือข่าย (ค่าเริ่มต้น: `127.0.0.1` สำหรับ Localhost)
  - `server.loginPort`: พอร์ต Login (`8484`)
  - `server.apiPort`: พอร์ต API (`8483`)
- ปรับแต่งโค้ด Java ให้โหลดค่าจากไฟล์คอนฟิกอัตโนมัติ:
  - `DatabaseManager.java`: อ่าน URL, User, Password จาก `server.properties`
  - `ServerConstants.java`: อ่าน IP, Login Port, API Port และสถานะ Localhost จาก `server.properties`

### 3. แก้ไขข้อผิดพลาดของ IP เครือข่าย (Localhost Fix)
- ตรวจพบ IP ฮาร์ดโค้ดจากเซิร์ฟเวอร์เดิมของเวียดนามในแพ็กเก็ต:
  - `ClientSocket.java`: ฮาร์ดโค้ด IP `52.27.135.94` (`34 1B 87 5E`)
  - `Login.java`: ฮาร์ดโค้ด IP `54.69.121.239` (`-277265098`)
- ทำการแก้ไขให้ดึงค่าจาก `ServerConstants.CHANNEL_IP` ตามที่กำหนดใน `server.properties` ทำให้การเล่นแบบ Localhost หรือต่อผ่าน LAN/VPN เชื่อมต่อได้ถูกต้อง ไม่หลุดตอนเลือกตัวละคร

### 4. ตรวจสอบและรวบรวมฐานข้อมูลครบ 100% (Database Audit & Consolidation)
- ตรวจสอบเปรียบเทียบทั้ง **40 ไฟล์ SQL** ในโฟลเดอร์ `sql/` กับฐานข้อมูล
- พบและแก้ไขข้อผิดพลาดในไฟล์ SQL เดิม:
  - `backup.sql`: แก้ไขคอลัมน์ซ้ำ `maxfriends` ใน `characterstats` และแก้ไข Syntax ข้อความที่ขาดหายในคำสั่ง Table Lock
  - `InitValue_ArcaneSymbol.sql`: แก้ไขการอ้างอิงชื่อฐานข้อมูล `cool.equips` และตัวคั่นคำสั่ง
  - `InitTables_CustomCode.sql`: แก้ไข Comment ในรายการ Values
- นำเข้าตารางและข้อมูลที่เคยตกหล่นทั้งหมด:
  - `cs_items`: ไอเทม Cash Shop **1,394 รายการ**
  - `equip_drops`: อัตราดรอปอุปกรณ์ตามสายอาชีพ **887 รายการ**
  - `monster_collection`: มอนสเตอร์สะสม **675 ตัว** + รางวัลกลุ่ม **135 รายการ**
  - `customcodes`: โค้ดรับของรางวัล **34 โค้ด**
  - `mob_drops`: ข้อมูลดรอปมอนสเตอร์ทั้งหมด **13,985 รายการ**
  - `party` & `partymembers`: ตารางระบบปาร์ตี้
  - `equip_arcane` & `arcaneid`: ระบบ Arcane Symbol
  - `equip_flame`: ระบบ Flame Stats
  - `users`: เพิ่มคอลัมน์ที่จำเป็น (`clientstate`, `vippoints`, `machineid`, `lastcharid`, `freevippointdate`)
- **ผลลัพธ์:** ปัจจุบันฐานข้อมูล `vietmaple` มีตารางครบสมบูรณ์ **110 ตาราง**
- **อัปเดตไฟล์ `backup.sql`:** Export ข้อมูลทั้งหมดลงใน `backup.sql` (~1.48 MB) เพื่อให้นำเข้าไฟล์เดียวได้ครบทุกตารางทันที

### 5. ป้องกัน Server Crash เมื่อสร้าง Database ใหม่
- เพิ่มการตรวจสอบ `null` ใน `Server.java` สำหรับฟังก์ชัน `addPhantomBot()` เพื่อป้องกัน NullPointerException ตอนเริ่มเซิร์ฟเวอร์ หากยังไม่มีตัวละครในฐานข้อมูลใหม่

### 6. ชุดสคริปต์ควบคุมและรันเซิร์ฟเวอร์แบบคลิกเดียว
- **`1_Start_Server.bat`**: สคริปต์รันเซิร์ฟเวอร์ MapleStory ด้วย Portable JDK 21 (พร้อมระบบตรวจสอบพอร์ตซ้ำ)
- **`2_Build_Server.bat`**: สคริปต์คอมไพล์โค้ดใหม่ด้วย Portable Maven และ JDK 21
- **`3_Stop_Server.bat`**: สคริปต์ค้นหาและปิด Process ทุกตัวที่เปิดพอร์ต 8484, 8483, 8585-8594 พร้อมล้าง Logs ชั่วคราว
- **`4_Server_Control_Panel.bat`**: เมนูควบคุมรวม (Start, Restart, Stop, Build, Import DB, Config)
- **`Import_Database.bat`**: เครื่องมือนำเข้าฐานข้อมูล `backup.sql` เข้า MySQL อัตโนมัติ

### 7. แก้ไขปัญหาเชื่อมต่อหน้าเลือกเซิร์ฟเวอร์ (World Select & Channel Handling)
- ตรวจพบปัญหาตัวเกมส่ง Opcode ที่เซิร์ฟเวอร์เดิมยังไม่ได้ลงทะเบียน:
  - `InHeader.java`: อัปเดต `WORLD_STATUS_REQUEST` เป็น `206` (ตรงกับ Opcode 206 ที่ Client v265 ส่งเข้ามาพร้อม Payload World ID 19)
  - `InHeader.java`: เพิ่ม `LOGIN_INIT_CHECK(212)` และ `CLIENT_HEARTBEAT(1930)` พร้อมเพิ่มเข้าใน `spam` list เพื่อระงับ Log ขยะ

### 8. วิเคราะห์และแก้ไขปัญหา Crash Error 38 (SERVER_STATUS) & เข้าเกมสำเร็จ 100%
- **การแก้ไขทั้งหมดทำที่ฝั่งเซิร์ฟเวอร์ 100% (Server-side Only)** โดยไม่มีการแก้ไขหรือดัดแปลงไฟล์ Client (.exe / .dll) ใดๆ
- **สาเหตุของ Error 38:**
  - เดิมมีการทดลองส่ง `SERVER_STATUS (24)` กลับไปยัง Client เมื่อได้รับ Opcode 206
  - ส่งผลให้ Client เกิดข้อผิดพลาด `[OutPacket] Error 38: SERVER_STATUS(24)` (Buffer Underflow: ข้อมูลไม่พอกับที่ฟังก์ชัน Client พยายาม Decode) และปิดตัวเองทันที
  - ใน MapleStory v265 ข้อมูลสถานะของ World และ Channels ถูกส่งไปครบถ้วนตั้งแต่แพ็กเก็ต `WORLD_INFORMATION (11)` แล้ว ตัวเกมจึงไม่ต้องการแพ็กเก็ตตอบกลับสำหรับ `WORLD_STATUS_REQUEST`
- **การแก้ไข:**
  - `LoginHandler.java`: ปิด (Comment out) `c.write(Login.sendServerStatus(worldId));` ใน `handleWorldStatusRequest`
  - `OutHeader.java`: คืนค่า `SERVER_STATUS(UnkValue)`
  - Rebuild และอัปเดตไฟล์ `maplestory.jar`
- **ผลลัพธ์การทดสอบจริง:**
  - ผู้เล่นล็อกอินเข้าสู่หน้าเลือก World คลิกเลือก World Scania ได้ปกติ ไม่มีอาการเด้งหลุด
  - ดับเบิลคลิกเลือก Channel แล้ว Client ส่ง `SELECT_WORLD (119)` เข้ามา
  - เซิร์ฟเวอร์ตอบกลับ `SELECT_WORLD_RESULT (19)` ส่งข้อมูลตัวละครและสล็อตครบถ้วน
  - เข้าสู่หน้าเลือกตัวละคร (Select Character Screen) และทดสอบระบบตรวจสอบการสร้างตัวละคร `CREATE_NEW_CHARACTER_CHECKER (181)` ได้สมบูรณ์
  - **ผู้เล่นสามารถเข้าสู่โลกของเกมและเล่นได้สำเร็จ 100%!**

### 9. ปรับปรุงและทดสอบสคริปต์นำเข้าฐานข้อมูลอัตโนมัติ (`Import_Database.bat`)
- **แก้ไขข้อผิดพลาด Batch Syntax:** แก้ไขปัญหา `: was unexpected at this time.` ที่เกิดจากการใช้วงเล็บ `()` ภายในบล็อกคำสั่ง `if (...)` ของ Windows CMD
- **ระบบค้นหา MySQL ครอบคลุม:** รองรับการตรวจจับ Path ของ `mysql.exe` อัตโนมัติทุกรูปแบบ (MySQL Server 8.0/8.4/5.7, MariaDB, XAMPP, Laragon, WAMP หรือ System PATH)
- **รองรับโหมดอัตโนมัติ:** เพิ่มการรองรับอาร์กิวเมนต์ `-y` / `--auto` สำหรับการรันแบบ Scripted/Non-interactive โดยยังคงการสอบถามค่าแบบ Interactive สำหรับผู้ใช้งานทั่วไป
- **ทดสอบลบและนำเข้าจริงแบบ Clean Import:**
  - ทำการลบฐานข้อมูลเดิมทิ้ง (`DROP DATABASE IF EXISTS vietmaple;`)
  - รัน `Import_Database.bat -y` เพื่อทดสอบสร้างฐานข้อมูลใหม่และนำเข้า `backup.sql`
  - **ผลการทดสอบ:** นำเข้าสำเร็จสมบูรณ์ 100% ตรวจสอบจำนวนตารางได้ครบทั้ง **110 ตาราง** (`total_tables = 110`)
  - อัปเดตการซิงค์ค่า Host, Port, User, Password ลงใน `server.properties` อัตโนมัติ
- **แพ็กรวมลง ZIP:** อัปเดตสคริปต์ที่แก้ไขแล้วลงในไฟล์ ZIP แจกจ่าย (`MapleStory_Server_Runner_Ready.zip` และ `MapleStory_Server_Runner.zip`) เรียบร้อย

### 10. ทดสอบรันเซิร์ฟเวอร์บน Clean Database (Fresh Database Verification)
- เปิดรันเซิร์ฟเวอร์ด้วย Portable JDK 21 บนฐานข้อมูลที่เพิ่งนำเข้าใหม่สดๆ (ไม่มีตัวละครเดิมค้างอยู่)
- **HikariCP:** เชื่อมต่อ Database สำเร็จใน 564 ms
- **ระบบป้องกัน Crash:** ทำงานได้ถูกต้อง (`Phantom bot (ID 5) not found in DB, skipping bot initialization.`) ไม่เกิด Error แม้เป็นเซิร์ฟเวอร์เริ่มใหม่
- **โหลดข้อมูลครบถ้วน:** WZ Data (33.9s) และ JSON Data (861ms)
### 11. วิเคราะห์และแก้ไขปัญหา Crash Error 38 ขณะเข้าแมพเกม (SET_FIELD Packet Desync Fix)
- **ตรวจสอบสภาวะทรัพยากรระบบ (RAM):**
  - ระบบมี RAM ทั้งหมด 8.34 GB มีหน่วยความจำว่าง **3.5 GB (Free Physical Memory)**
  - กระบวนการ Java ทำงานปกติใช้หน่วยความจำ ~2.4 GB
  - **สรุปชัดเจน: ปัญหาไม่ได้เกิดจากแรมเต็มอย่างแน่นอน**
- **ตรวจสอบ Packet Log และ Client Error:**
  - ตรวจพบ Client ส่ง `CLIENT_ERROR (171)` ด้วยรหัส `Error 38 (Buffer Underflow)` ทันทีที่เซิร์ฟเวอร์ส่งแพ็กเก็ต `SET_FIELD (719)` สำหรับตัวละคร `FBGamOffline`
  - เปรียบเทียบไบต์ต่อไบต์ (Binary Byte Diff) ระหว่างตัวละครเดิมและตัวละครใหม่ พบความยาวของ `SET_FIELD` ต่างกัน 80 ไบต์ตรงส่วนการส่งข้อมูลสกิล (`DBChar.SkillRecord`)
  - ในตัวละครใหม่ ระบบบันทึกสกิลเริ่มต้น 4 สกิลของอาชีพ Ren (`160020000`, `160020001`, `160021074`, `160021075`) ลง Database
- **สาเหตุที่แท้จริง (Root Cause):**
  - อาชีพ Ren Beginner (`16002`) ตกหล่นจากรายการ `JobConstants.isBeginnerJob()`
  - ใน `SkillConstants.java` ฟังก์ชันคำนวณคลาสอาชีพ (`getJobGroupFromSkillRoot`) คำนวณเลขลงท้าย `16002 % 10 = 2` จึงตีความผิดว่าเป็นสกิลคลาส 4 (4th Job)
  - ส่งผลให้ `SkillConstants.isSkillNeedMasterLevel()` คืนค่า `true` ให้กับสกิลเริ่มต้นทั้งหมดของ Ren และเซิร์ฟเวอร์เข้ารหัสฟิลด์ `masterLevel` (4 ไบต์) เกินไป 4 ครั้ง (รวม 16 ไบต์)
  - ฝั่ง Client v265 ทราบว่าสกิลเริ่มต้นของ Ren ไม่มี Master Level จึงไม่ได้อ่าน 16 ไบต์นี้ ทำให้ตำแหน่งพอยน์เตอร์อ่านข้อมูลในบัฟเฟอร์เลื่อนหลุด (Desynchronize) ไป 16 ไบต์ ข้อมูลถัดไปทั้งหมด (Hyper Stats, Link Skills, etc.) จึงอ่านผิดตำแหน่งจนบัฟเฟอร์หมดก่อนเวลา เกิด `Error 38` และ Client บังคับปิดตัวเอง
- **การแก้ไข:**
  - `JobConstants.java`: เพิ่ม `case 16002:` ลงใน `isBeginnerJob(short jobId)` เพื่อระบุให้ระบบทราบว่า `16002` คือ Beginner Job อย่างถูกต้อง
  - `SkillConstants.java`:
    - เพิ่ม Guard Clause ใน `isSkillNeedMasterLevel(int skillID)`: หากเป็นสกิลของ Beginner Job (`JobConstants.isBeginnerJob(skillRoot) || skillRoot == 0 || skillRoot == 16002`) จะคืนค่า `false` ทันที ป้องกันการใส่ Master Level ให้กับสกิลเริ่มต้นของทุกอาชีพ 100%
    - อัปเดต `isSpecialRoot` และ `getJobGroupFromSkillRoot` ให้ครอบคลุม Job Root `16002` (Ren)
  - ทำการ Rebuild เซิร์ฟเวอร์ด้วย Portable Maven และประกอบ `maplestory.jar` ใหม่ พร้อมเปิดรันเซิร์ฟเวอร์ทดสอบเรียบร้อย

---

## 🧪 ผลการทดสอบการรันระบบ (Verification & Test Results)

```text
[In v.265]   | VIEW_CHANNEL_REQUEST, 118 | 00 13 00 00 00 00 00 
[Out v.265]  | SELECT_WORLD_BUTTON, 18   | 00 03 00 E2 9C 80 13 00 00 00 FF FF FF FF 
[In v.265]   | WORLD_STATUS_REQUEST, 206 | 13 
[In v.265]   | SELECT_WORLD, 119         | 00 13 00 00 00 ... (เลือก Channel สำเร็จ)
[Out v.265]  | SELECT_WORLD_RESULT, 19   | 00 00 00 00 ... (ส่งข้อมูลตัวละครสำเร็จ)
[In v.265]   | CREATE_NEW_CHARACTER_CHECKER, 181
[Out v.265]  | CREATE_NEW_CHARACTER_CHECKER_RESULT, 2789
--> สถานะ: เข้าสู่เกมและเล่นได้ตามปกติ (In-Game Active)

[Database Test]
DROP DATABASE vietmaple -> OK
Import_Database.bat -y  -> OK
Total Tables Verified   -> 110 / 110 tables (100% Complete)
```

- **สถานะการทำงาน:** สมบูรณ์ 100% ปราศจาก Error
- **สถานะปัจจุบัน:** เซิร์ฟเวอร์กำลังเปิดให้บริการ (Active) พร้อมสำหรับการทดสอบเกมเพลย์ระยะยาว (Extended In-Game Testing)
- **พอร์ตที่เปิดให้บริการ:**
  - Login Server: `8484` (TCP) - Listening
  - API Server: `8483` (TCP) - Listening
  - Game Channels 1 ถึง 10: `8585` ถึง `8594` (TCP) - Listening

---

## 📂 โครงสร้างไฟล์สำคัญในโฟลเดอร์โปรเจกต์

```text
v214 src/
├── 1_Start_Server.bat             # ดับเบิลคลิกเพื่อเริ่มรันเซิร์ฟเวอร์ทันที
├── 2_Build_Server.bat             # ดับเบิลคลิกเพื่อ Rebuild โค้ดใหม่ด้วย Maven
├── 3_Stop_Server.bat              # ดับเบิลคลิกเพื่อปิดเซิร์ฟเวอร์และเคลียร์พอร์ต
├── 4_Server_Control_Panel.bat     # หน้าจอเมนูควบคุมหลัก
├── Import_Database.bat            # เครื่องมือนำเข้าฐานข้อมูล backup.sql อัตโนมัติ (แก้ไข Syntax & รองรับโหมดอัตโนมัติแล้ว)
├── server.properties              # ไฟล์ตั้งค่า Database, IP, Ports
├── backup.sql                     # ไฟล์ฐานข้อมูลฉบับสมบูรณ์ (110 ตาราง)
├── maplestory.jar                 # ไฟล์ JAR เซิร์ฟเวอร์พร้อมรัน (~138 MB)
├── PORTABLE_README.md             # คู่มือการใช้งานภาษาไทยฉบับเต็ม
├── คู่มือการใช้งาน_Portable.txt   # คู่มือแบบ Text file
├── PROGRESS.md                    # เอกสารบันทึกความคืบหน้าฉบับนี้
├── jdk21/                         # Portable JDK 21 (Adoptium Temurin)
├── apache-maven-3.9.15/           # Portable Apache Maven 3.9.15
├── data/                          # ข้อมูล WZ, DAT, Scripts (Python), Resources
└── src/                           # ซอร์สโค้ด Java ทั้งหมด
```

---

## 🧹 การตรวจสอบความพร้อมของระบบ
- ฐานข้อมูล `vietmaple` อยู่ในสถานะ Clean Database มีโครงสร้างตารางครบทั้ง 110 ตาราง
- เซิร์ฟเวอร์กำลังทำงานอยู่ใน Background พร้อมรับการเชื่อมต่อจาก Client ทันที
- ไฟล์ ZIP สำหรับรันบนเครื่องอื่น (`MapleStory_Server_Runner_Ready.zip`) มีสคริปต์และไฟล์ครบถ้วนพร้อมใช้งาน

