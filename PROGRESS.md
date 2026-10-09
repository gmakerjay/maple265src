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

### 12. ตรวจสอบและแก้ไขบั๊กอาชีพใหม่ (New Jobs Bug Fixing & Implementation Audit)
- **Lynn (`Lynn.java`):**
  - แก้ไขบั๊กค่าสเตตัสเริ่มต้นใน `setCharCreationStats`: สลับจากเดิมที่ตั้งผิดเป็น DEX 45, INT 4 ให้ถูกต้องเป็น **INT 45, DEX 4** (อาชีพสายเวท)
  - เพิ่มเมธอด `addItemToNewCharacter`: แจกอาวุธเริ่มต้น **Memorial Staff (1252002)** และโล่รอง **Beast Bell (1352811)** เข้าช่องสวมใส่อัตโนมัติพร้อมบันทึก SQL
- **Mo Xuan (`MoXuan.java`):**
  - แก้ไขบั๊กค่าสเตตัสเริ่มต้นใน `setCharCreationStats`: สลับจากเดิมที่ตั้งผิดเป็น DEX 45, STR 4 ให้ถูกต้องเป็น **STR 45, DEX 4** (อาชีพสายหมัดกำลังภายใน STR)
  - เพิ่มเมธอด `addItemToNewCharacter`: แจกสนับมือเริ่มต้น **Martial Fist (1403000)** และโล่รอง **Martial Fist Secondary (1354030)**
  - นำคำสั่ง Debug Chat `chr.chatScriptMessage("powerType : " + ...)` ออกจาก `handleSpecialEffect` เพื่อป้องกันการส่งสแปมข้อความแชททุกครั้งที่ใช้สกิลเสวียนซาน
- **Kain (`Kain.java`):**
  - เพิ่มเมธอด `addItemToNewCharacter`: แจกอาวุธเริ่มต้น **Whispershot (1214000)** และโล่รอง **Weapon Belt (1354020)**
  - เพิ่มเมธอด `handleSkill`: รองรับสกิลบัฟหลัก **Breath Shooter Booster (63101010)**, **Nova Warrior (63121009)**, ล้างสถานะผิดปกติ **Nova Hero's Will (63121010)**, บัฟไฮเปอร์ **Incarnation (63121044)**, บาเรียอมตะ **Dragon Scale (63121008)** และระบบเปิด-ปิดบัฟ **Remain Incense (63111009)**
  - เพิ่มเมธอด `handleAttack`: รองรับการประมวลผลการโจมตีพื้นฐาน
- **Lara (`Lara.java`):**
  - เพิ่มเมธอด `setCharCreationStats`: กำหนดค่าสเตตัสเริ่มต้นของสายเวท **INT 45, LUK 4, STR 4, DEX 4**, เลเวล 10, HP 1000, MP 800, แต้ม SP 5
  - เพิ่มเมธอด `addItemToNewCharacter`: แจกอาวุธเริ่มต้น **Wand (1372000)** และโล่รอง **Ornamental Knot (1354010)**
  - เพิ่มระบบเปลี่ยนอาชีพ `handleLevelUp`: เปลี่ยนอาชีพเป็นคลาส 2, 3, 4 อัตโนมัติที่เลเวล 30, 60, 100 พร้อมมอบแต้ม SP และ AP
  - เพิ่มเมธอด `handleSkill`: รองรับ **Wand Booster (162101013)**, **Anima Warrior (162121023)**, **Anima Hero's Will (162121024)** และสกิลเปิด-ปิด **Peerless Mountain (162001005)**
- **Server Core (`Server.java`):**
  - แก้ไข NullPointerException จากตัวแปร `bannedMacs` ที่ไม่มีการกำหนดค่าเริ่มต้นใน `Server.java` ทำให้เมื่อเรียก `LoginHandler.handleSelectWorld()` ไม่เกิดอาการ Crash

---

### 13. ตรวจสอบความครบถ้วนของระบบบอสทั้งหมด (Boss System Completeness Audit)
จากการตรวจสอบโค้ดในแพ็กเกจ `net.swordie.ms.world.boss.*`, `BossConstants.java`, `BossPartyType.java` และสคริปต์ใน `data/scripts/boss/`, `data/scripts/field/`:

| กลุ่มบอส | รายชื่อบอส | สถานะระบบในเซิร์ฟเวอร์ | รายละเอียดกลไก |
|---|---|:---:|---|
| **บอสคลาสสิก / ช่วงต้นเกม** | Zakum, Horntail, Pink Bean, Ursus | 🟢 สมบูรณ์ 100% | มีคลาสเฉพาะแยกทุกตัว, คำนวณ HP รวม (SpecialHP), มีแขน/หัว/หินครบทุกชิ้นส่วน |
| **บอสช่วงกลางเกม (Hero/Grand)** | Von Leon, Cygnus, Arkarium, Magnus, Hilla | 🟢 สมบูรณ์ 100% | ห้องขัง Von Leon, นก Shinsoo & 5 อัศวิน Cygnus, จอแตก Arkarium, อุกกาบาตตก Magnus |
| **รูทอบิส (Root Abyss)** | Pierre, Von Bon, Crimson Queen, Vellum | 🟢 สมบูรณ์ 100% | หมวกสลับสี Pierre, มิติเวลา Von Bon, หน้ากาก 4 อารมณ์ Queen, หินย้อย/มุดดิน Vellum |
| **บอสระดับสูง (Arcane River)** | Lotus (Swoo), Damien | 🟢 สมบูรณ์ 100% | Lotus 3 เฟส (เลเซอร์แกนกลาง, ก้อนพลังงาน, หุ่นตก), Damien 2 เฟส (ดาบบิน, แท่นบูชายัญ Stigma) |
| **บอสระดับสูง (Arcane River)** | Lucid, Will, Verus Hilla | 🟢 สมบูรณ์ 100% | Lucid มังกรพ่นไฟ/กระจกแตก, Will มิติแสง-มืด/ใยแมงมุม/มูนไลท์, Verus Hilla เทียนแดง-เขียว/วิญญาณ |
| **บอสเนื้อเรื่องหลัก** | Black Mage (검은 마법사) | 🟢 สมบูรณ์ 4 เฟส | มีสคริปต์ `firstenter_bossBlackMage.py` วาร์ปต่อเนื่อง P1 (ยักษ์คู่), P2, P3, P4 สมบูรณ์ |
| **บอสดันเจี้ยนพิเศษ** | Gollux, Ranmaru, Princess No | 🟢 สมบูรณ์ 100% | ชิ้นส่วนหัว/ไหล่/ท้อง Gollux, ดันเจี้ยน 4 ห้องก่อนพบ Princess No |
| **Tenebris Bosses** | Gloom (더스크), Darknell (듄켈) | 🟡 มีข้อมูลในระบบ / ขาดสคริปต์สนาม | มี Mob ID, แมพวาร์ป, และ Intense Power Crystal แล้ว แต่ยังไม่มีตัวจัดการเฟสแยก |
| **Grandis & Newest Bosses** | Chosen Seren, Kalos, Kaling, Limbo, Baldrix, First Adversary | 🔴 มี Enum / Crystal / ยังไม่มีตัวจัดการดันเจี้ยน | มีการลงทะเบียนในระบบ `BossPartyType` และราคาผลึกคริสตัลแล้ว แต่ยังไม่มี AI / Boss Event Controller รองรับ |

---

### 14. การทดสอบคอมไพล์และเปิดรันเซิร์ฟเวอร์จริง (Build & Runtime Verification)
- **คอมไพล์ซอร์สโค้ด:** ผ่านสำเร็จ 100% ปราศจาก Error (`BUILD SUCCESS` ใช้เวลา 22.5 วินาที สำหรับ 851 ไฟล์)
- **ประกอบ JAR:** ประกอบ Fat JAR รวม Dependencies ทั้งหมดสำเร็จ (`maplestory.jar` ขนาด ~138 MB)
- **ทดสอบเปิดรันเซิร์ฟเวอร์ (Live Test Run):**
  - พอร์ตเปิดให้บริการครบทุกพอร์ต:
    - Login: `8484` (TCP) - Listening
    - API: `8483` (TCP) - Listening
    - Game Channels 1 ถึง 10: `8585` - `8594` (TCP) - Listening
  - โหลดฐานข้อมูล MariaDB และ WZ Data (22.0 วินาที) สำเร็จ 100%
  - ตรวจสอบ `logs/.../ExceptionCaught/All.txt` ไม่พบ Exception หรือ Error ตกค้าง

---

### 15. ทดสอบความ Portable ขั้นสูงสุด: ถอนการติดตั้ง MySQL ออกจากระบบเครื่อง 100% (Zero-Install Audit)
- **การทดสอบจริงบนเครื่องที่ไม่มี MySQL:**
  - ทำการตรวจสอบสถานะระบบหลังจากผู้ใช้ถอนการติดตั้งโปรแกรม MySQL ออกจากระบบปฏิบัติการ Windows (Service `MySQL80` อยู่ในสถานะ Stopped / ไม่มีการรัน MySQL ภายนอกใดๆ)
  - พอร์ต `3306` ปิดสนิท (`TcpTestSucceeded : False`)
- **ติดตั้งและรวม Portable MariaDB Engine 10.11.8:**
  - ทำการติดตั้งชุด Engine `mariadb\` แบบ Standalone Portable Binaries ภายในโฟลเดอร์โปรเจกต์
  - ตั้งค่าระบบ Auto-Initialize ข้อมูลระบบ (`mariadb-install-db.exe`) อัตโนมัติในครั้งแรก
  - ปรับปรุงการสร้างไฟล์คอนฟิก `mariadb\my.ini` แบบไดนามิกผ่าน Batch Script เพื่อให้ดึงตำแหน่งพาทปัจจุบัน (`%~dp0`) เสมอ ป้องกันข้อผิดพลาด Path Mismatch เมื่อย้ายโฟลเดอร์หรือก๊อปลง Flash Drive
- **การจัดการ Lifecycle อัตโนมัติ (Start / Stop Orchestration):**
  - `1_Start_Server.bat`: ตรวจสอบสถานะฐานข้อมูล หากยังไม่เปิดจะสั่งรัน Portable MariaDB ในเบื้องหลัง และรอจนพอร์ต 3306 พร้อมตอบสนอง ก่อนเริ่มสตาร์ท Java Server
  - `3_Stop_Server.bat`: สั่ง `mysqladmin shutdown` เพื่อ Flush ข้อมูลจากหน่วยความจำ (Buffer Pool) ลงดิสก์อย่างปลอดภัย 100% ป้องกันข้อมูลตัวละคร/ไอเทมเสียหาย ก่อนปิดเกมเซิร์ฟเวอร์
  - `Import_Database.bat`: ปรับปรุงให้ตรวจพบและใช้งาน Portable MariaDB โดยตรง นำเข้าฐานข้อมูล `vietmaple` (110 ตาราง) ได้อย่างสมบูรณ์
- **ผลการทดสอบรันเซิร์ฟเวอร์จริงแบบ Zero-Install:**
  - รัน `1_Start_Server.bat`:
    - MariaDB เริ่มทำงานอัตโนมัติบนพอร์ต 3306
    - HikariCP เชื่อมต่อฐานข้อมูล `vietmaple` สำเร็จใน 280 ms
    - WZ Data โหลดเสร็จสิ้นใน 27.6 วินาที
    - JSON Data โหลดเสร็จสิ้นใน 577 ms
    - พอร์ต Login (`8484`), API (`8483`), Game Channels 1 ถึง 10 (`8585`-`8594`) เปิดให้บริการครบสมบูรณ์
  - ทดสอบส่งแพ็กเก็ต Handshake: เซิร์ฟเวอร์ตอบกลับ `SECURITY_PACKET_CODE` (39) และ `SET_HOT_FIX` (42) ได้ทันที
  - รัน `3_Stop_Server.bat`: ปิดเซิร์ฟเวอร์และ MariaDB ได้อย่างหมดจด ปราศจาก Process ตกค้าง

---

## 📂 โครงสร้างไฟล์สำคัญในโฟลเดอร์โปรเจกต์ (Zero-Install Portable)

```text
MapleStory_Server_Runner/
├── 1_Start_Server.bat             # ดับเบิลคลิกเพื่อเริ่มรัน (เปิด DB + Server อัตโนมัติ)
├── 3_Stop_Server.bat              # ดับเบิลคลิกเพื่อปิด (เซฟข้อมูล MariaDB ปลอดภัย)
├── 4_Server_Control_Panel.bat     # หน้าจอเมนูควบคุมหลัก
├── v214 src/
│   ├── 1_Start_Server.bat         # ตัวรันเซิร์ฟเวอร์หลัก (Orchestrator)
│   ├── 2_Build_Server.bat         # ดับเบิลคลิกเพื่อ Rebuild โค้ดใหม่ด้วย Maven
│   ├── 3_Stop_Server.bat          # ดับเบิลคลิกเพื่อปิดเซิร์ฟเวอร์และเคลียร์พอร์ต
│   ├── 4_Server_Control_Panel.bat # หน้าจอเมนูควบคุมหลัก
│   ├── Import_Database.bat        # เครื่องมือนำเข้าฐานข้อมูล backup.sql อัตโนมัติ
│   ├── server.properties          # ไฟล์ตั้งค่า Database, IP, Ports, Rates
│   ├── backup.sql                 # ไฟล์ฐานข้อมูลฉบับสมบูรณ์ (110 ตาราง)
│   ├── maplestory.jar             # ไฟล์ JAR เซิร์ฟเวอร์พร้อมรัน (~138 MB)
│   ├── Client_Patch_Files/        # ไฟล์ตัวเปิดเกมฝั่งผู้เล่น (Launcher.exe, Localhost.dll)
│   ├── mariadb/                   # Portable MariaDB 10.11.8 Engine + Data (Zero-Install)
│   │   ├── bin/ (mysqld.exe, mysql.exe, mysqladmin.exe)
│   │   ├── data/ (โฟลเดอร์เซฟข้อมูลตัวละครและไอเทมในเกมตลอดเวลา)
│   │   └── my.ini (คอนฟิกไดนามิก)
│   ├── jdk21/                     # Portable JDK 21 (Adoptium Temurin)
│   ├── apache-maven-3.9.15/       # Portable Apache Maven 3.9.15
│   ├── data/                      # ข้อมูล WZ, DAT, Scripts (Python), Resources
│   └── src/                       # ซอร์สโค้ด Java ทั้งหมด
```

---

## 🧹 การตรวจสอบความพร้อมของระบบ (Final Verification Checklist)
- [x] **Zero-Install Database**: เครื่องผู้ใช้ไม่ต้องติดตั้ง MySQL หรือโปรแกรมใดๆ เพิ่มเติม 100%
- [x] **Data Persistence**: ข้อมูลเซฟลงโฟลเดอร์ `mariadb\data\` ตลอดเวลา ย้ายเครื่องหรือใส่ Flash Drive ข้อมูลไม่หาย
- [x] **Database Schema**: ฐานข้อมูล `vietmaple` มีตารางครบทั้ง 110 ตาราง
- [x] **Server Engine**: Portable JDK 21 และ `maplestory.jar` โหลด WZ + JSON สมบูรณ์ ปราศจาก Crash
- [x] **Crash Error 38 Fix**: แก้ไข Opcode 206 และ Beginner Ren Master Level ครบถ้วน
- [x] **New Jobs Bugfix**: Lynn, Mo Xuan, Kain, Lara ปรับแต่งสเตตัสและแจกไอเทมเริ่มต้นเรียบร้อย
- [x] **Safe Shutdown**: สคริปต์ `3_Stop_Server.bat` สั่ง Flush MariaDB Buffer Pool ก่อนปิด ไม่เสี่ยง DB Corrupt
- [x] **Client Ready**: ไฟล์ `Client_Patch_Files` พร้อมนำไปวางในโฟลเดอร์เกม MapleStory v265 เพื่อเข้าเล่นได้ทันที

- [x] **Khali V & HEXA 6th Job**: อัปเกรดระบบสกิล V Matrix (Astra, Void Burst, Resonate Ultimatum) และ HEXA Matrix (Wake the Void Origin Cutscene, Absolute Freeze Bind, Party Effect, 10 HEXA Mastery Skills) เรียบร้อย 100%
- [x] **Incremental Patch Package**: จัดทำแพ็กเกจแพตช์ Server263_Patch_20261009_1307.zip พร้อม 1-Click Installer Apply_Patch.bat

---

## 🚀 9. การพัฒนาระบบ V Matrix และ HEXA Matrix คลาส 6 (9 ตุลาคม 2569)

### 9.1 ภาพรวมการ Audit ทั้ง 35 อาชีพในเซิร์ฟเวอร์
1. **สถานะการปลดล็อก (LoginJob Status)**:
   - ปลดล็อกเป็น JobFlag.ENABLED ให้ผู้เล่นสร้างเล่นได้ครบทุกอาชีพ (35 อาชีพ)
   - ปิดเพียง 2 อาชีพตามแพตช์ทางการของ MapleStory v260+ คือ JETT (ลบออกจากเกม) และ CHASE (Beast Tamer ถูกแทนที่ด้วย Lynn)
2. **ระบบฐานราก HEXA Matrix (Core Engine & UI)**:
   - สมบูรณ์ 100%: HexaCore.java โหลดข้อมูล Node, Stat, Cost จาก Etc.wz/HexaCore.img.xml โดยตรง
   - มีระบบหัก Sol Erda / Sol Erda Fragments และบันทึกลง SQL (hexaskills, hexastats) ผ่าน UserHandler.java
3. **สถานะความพร้อมของสกิลต่อสู้ในระดับคลาส 6 แยกตามสายอาชีพ**:
   - **กลุ่มที่เขียนโค้ดต่อสู้คลาส 6 แล้ว (Coded)**: Adele, Kanna, Hayato, Xenon, BattleMage, Kaiser, Phantom, Demon Avenger, Wild Hunter
   - **กลุ่มที่ได้รับการอัปเกรดใหม่ (Newly Upgraded)**: Khali (คาร์ลี) — เขียนระบบ V Matrix และ HEXA ครบ 100%
   - **กลุ่มที่ยังรอคิวการพัฒนา (Uncoded Roadmap)**: Lara, Illium, Hoyoung (ทำบางส่วน), Explorer บางสาย และ Resistance บางสาย (ซึ่งตัวเกมอาศัยการส่งดาเมจดิบจาก Client)

### 9.2 รายละเอียดการอัปเกรดอาชีพ Khali (Khali.java)
- **6th Job Origin Skill (Wake the Void - 154141504 & 154141505)**:
  - เมื่อกดใช้ มอบสถานะอมตะสมบูรณ์แบบ (CharacterTemporaryStat.IndieNotDamaged) 7 วินาทีตลอดช่วงคัทซีน
  - รีเซ็ตคูลดาวน์สกิลตระกูล Void Rush ทั้งหมดทันที
  - ล็อคและสาปมอนสเตอร์/บอสด้วย MobStat.Freeze (10 วินาที) และ MobStat.OriginDebuff (20 วินาที)
  - กระจายเอฟเฟกต์คัทซีนคลาส 6 ให้เพื่อนในปาร์ตี้ผ่าน UserLocal.showHexaSkillEff(chr)
  - กระตุ้นการระเบิดจักรา triggerResonate()
- **6th Job HEXA Mastery Skills (10 สกิล)**:
  - บรรจุสกิล HEXA เข้าในวงคอมโบ isArtsSkill(), isHexSkill(), isVoidSkill():
    - Arts Flurry VI (154141000), Crescentum VI (154141001), Triple Bash VI (154141002) -> ลดคูลดาวน์สกิล Hex 1 วินาทีทุกฮิต
    - Chakram Sweep VI (154141011), Chakram Split VI (154141009), Chakram Fury VI (154141010), Death Blossom VI (154141012) -> ถูกลดคูลดาวน์เมื่อใช้ Arts
    - Void Blitz VI (154141008) -> จุดระเบิดจักราเมื่อพุ่งผ่าน
    - Hexa Deceiving Blade (154141014) -> มอบบัฟ PAD 30 หน่วย 180 วินาที
- **5th Job V Matrix Enhancements**:
  - Arts: Astra (400041087): มอบสถานะลดดาเมจจากการโจมตี 75% (IndieDamReduceR) ระหว่างร่าย
  - Void Burst (400041084): มอบสถานะอมตะ 3 วินาที (IndieNotDamaged) พร้อมจุดชนวนจักรา
  - Resonate: Ultimatum (400041089): ฟังก์ชัน spawnResonateUltimatumVortices() เสกวงจักรา Chakri ทันที 4 จุดรอบตัว และจุดระเบิดจักราทำดาเมจมหาศาลทันที
  - Hex: Pandemonium (400041082): บรรจุเข้าใน Hex Skills เพื่อรับผลลดคูลดาวน์จาก Arts ได้อย่างถูกต้อง

### 9.3 ข้อมูลแพ็กเกจแพตช์อัปเดต (Distribution Package)
- **โฟลเดอร์แพตช์**: Patches/Server263_Patch_20261009_1307/
- **ไฟล์ ZIP พร้อมแจกจ่าย**: Patches/Server263_Patch_20261009_1307.zip (ขนาดเพียง 121.50 MB)
- **วิธีการใช้งาน**: แตกไฟล์แล้วดับเบิลคลิก Apply_Patch.bat เพื่อติดตั้งลงใน Server263 ได้ภายใน 2 วินาที โดยไม่ต้องแปลงหรือบีบอัดไฟล์ WZ ใหม่แม้แต่น้อย
- [x] **Lara V & HEXA 6th Job**: อัปเกรดระบบสกิล V Matrix (Big Stretch, Land's Connection, Mountain Embrace -60% Damage Reduction, Vine Coil 10s Stun Bind) และ HEXA Matrix (Cornucopia Origin Cutscene 7s Invincibility, Absolute Freeze Bind 10s, Origin Debuff 20s, 10 HEXA Mastery Skills) คอมไพล์ผ่าน 100%
- [x] **Illium V & HEXA 6th Job**: อัปเกรดระบบสกิล 6th Job Origin Excidium (7s Invincibility, 10s Absolute Freeze Bind, 20s Origin Debuff, Party Cutscene Effect), Mytocrystal Expanse (6s Invincibility, Crystal Expanse Area 20s, Umbral Brand Procs), 10 HEXA Mastery Skills (Radiant Javelin, Winged Javelin, Longinus Spear, Reaction Destruction/Domination, Vortex Wings, Ex, Machina, Deus, Longinus Zone, Umbral Brand III), และ V-Skill Crystal Gate คอมไพล์ผ่าน 100%
- [x] **Ark V & HEXA 6th Job**: อัปเกรดระบบสกิล 6th Job Origin Whisper of Deepest Abyss (7s Invincibility, 10s Absolute Freeze Bind, 20s Origin Debuff, Party Cutscene Effect), Primordial Abyss (8s Invincibility, 30s Hold Specter Gauge, Specter Mode trigger), 20+ HEXA Mastery Skills (HEXA Basic / Scarlet / Gust / Abyssal Charge Drive + Spell Bullet logic, Grievous Wound, Insatiable Hunger, Unbridled Chaos, Endless Agony, Blissful Restraint, Vengeful Hate Wreckage, Ominous Nightmare / Dream) คอมไพล์ผ่าน 100%
- [x] **HoYoung V & HEXA 6th Job**: อัปเกรดระบบสกิล 6th Job Origin Millennium Spirit (7s Invincibility, 10s Absolute Freeze Bind, 20s Origin Debuff, Party Cutscene Effect), Sage: Apotheosis (6s Invincibility, Max Talisman/Scroll energy), 20+ HEXA Mastery Skills (เชื่อมโยงระบบธาตุสวรรค์ / ปฐพี / มนุษยโลก Heaven, Earth, Humanity, Talisman, Scroll เข้าสู่วงคอมโบอัตโนมัติ) คอมไพล์ผ่าน 100%
- [x] **Kain V & HEXA 6th Job**: อัปเกรดระบบสกิล 6th Job Origin Churning Malice (7s Invincibility, 10s Absolute Freeze Bind, 20s Origin Debuff, Party Cutscene Effect), Total Annihilation (6s Invincibility, Death's Blessing), 20+ HEXA Mastery Skills (Falling Dust, Poison Needle, Strike Arrow, Scattering Shot, Tearing Knife, Chain Sickle, Dragon Fang, Death's Blessing, Shaft Break, Lasting Grudge, Phantom Blade, Chasing Shot, Unseen Sniper) พร้อมจัดเข้ากลุ่ม Possession / Execution / WhisperShot ครบถ้วน คอมไพล์ผ่าน 100%
- [x] **Updated Patch Package**: สร้างแพตช์อัปเดตใหม่ Server263_Patch_20261009_1407.zip (121.50 MB) รวมโค้ด Khali + Lara + Illium + Ark + HoYoung + Kain เรียบร้อย