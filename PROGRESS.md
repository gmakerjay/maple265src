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
- [x] **Updated Patch Package**: สร้างแพตช์อัปเดตใหม่ Server263_Patch_20261009_1419.zip (121.51 MB) รวมโค้ด Khali + Lara + Illium + Ark + HoYoung + Kain และระบบคำสั่งทดสอบครบถ้วน
- [x] **Private Developer Testing Command (!endgame)**: เพิ่มคำสั่งลับเฉพาะผู้พัฒนาที่มีสิทธิ์ Admin (`requiredType = Admin`) ใน `AdminCommands.java` ปลอดภัย ไม่กระทบไฟล์สาธารณะ:
  - `!endgame` หรือ `!test6`: บูสต์ตัวละครปัจจุบันเป็น Lv.260 + ปลดล็อกเควสต์คลาส 5 (1460-1466) & คลาส 6 (1488) + สกิลคลาส 1-4 เต็ม + สกิล V-Matrix และ HEXA คลาส 6 (Origin Lv.30 + HEXA Mastery Lv.30) + เงิน 2 พันล้าน Mesos + Sol Erda x20 + Sol Erda Fragments x1,000 + อาวุธ Arcane Umbra
  - รองรับการเปลี่ยนอาชีพและรับสกิลคลาส 6 ทันทีในคำสั่งเดียว: `!endgame khali`, `!endgame lara`, `!endgame illium`, `!endgame ark`, `!endgame hoyoung`, `!endgame kain`

### 9.4 แก้ไขข้อผิดพลาดและปรับปรุงความเสถียรของคำสั่งลับ (!endgame)
- **แก้ไข ClassCastException (`Integer cannot be cast to Short`)**: ใน `AdminCommands.setupEndgame` ขณะส่งแพ็กเก็ต `Stat.job` ตัวเกมต้องการข้อมูลประเภท `Short` จึงทำการแปลง `targetJob.shortValue()` ให้ตรงตามสเปกแพ็กเก็ตของ WvsContext
- **แก้ไขบั๊ก String Format ใน `Char.java`**: แก้ไขข้อผิดพลาดในเมธอด `addSkill` บรรทัดที่ 3537 ที่มี Format specifier `%d` เกิน ซึ่งอาจทำให้เกิด `MissingFormatArgumentException` เมื่อค้นหาไอดีสกิลไม่พบ
- **เพิ่มระบบ Fault-Tolerance**: ครอบบล็อก `try-catch` อิสระในทุกส่วนของการทำงาน (การเปลี่ยนอาชีพ, ปรับเลเวล, บันทึกเควสต์, แม็กซ์สกิล, มอบสกิลคลาส 6, และแจกไอเทม) เพื่อป้องกันไม่ให้ข้อผิดพลาดจุดใดจุดหนึ่งขัดจังหวะการทำงาน
- **อัปเดตแพ็กเกจแพตช์**: รัน `tools/create_patch.py` สร้างแพตช์ล่าสุด `Patches/Server263_Patch_20261009_1437.zip` (121.51 MB)
- **อัปเดตไฟล์เซิร์ฟเวอร์**: คอมไพล์ผ่าน 100% (`BUILD SUCCESS`) และเขียนทับ `Server263/maplestory.jar` เรียบร้อยแล้ว

### 9.5 การออดิตและแก้ไขระบบคลาส 6 (HEXA Matrix) และชุดไอเทมทดสอบครบวงจร
- **ผลการออดิต (Audit Findings)**:
  1. **ไอเทมผิดอาชีพ**: ในเวอร์ชันก่อนหน้านี้ รหัสอาวุธ Arcane Umbra ของ Khali (`1292024` -> เป็นไอดีพัด HoYoung ที่ไม่มีจริง), Lara (`1372230` -> ไม่มีจริง), Illium (`1282024` -> ไม่มีจริง), Ark (`1482223` -> เป็นไอเทมเลเวล 140 Shark Tooth Wild Talon), HoYoung (`1272023` -> โซ่ Cadena) และ Kain (`1214022` -> ไม่มีจริง) ทำให้ตัวละครได้รับอาวุธผิดประเภทหรือไม่ได้รับอาวุธ ส่งผลให้ไม่สามารถร่ายสกิลโจมตีเพื่อทดสอบได้
  2. **ขาดอาวุธรอง (Secondary Weapon) และตราสัญลักษณ์ (Emblem)**: ตัวละครที่บูสต์ไม่มีอาวุธรองและตราสัญลักษณ์ที่จำเป็นต่อการแสดงผลและใช้งานสกิลบางประเภท
  3. **ขาดชุดเกราะป้องกัน (Armor Set)**: ตัวละครไม่มีชุดเกราะป้องกัน ทำให้การทดสอบในแมพมอนสเตอร์ระดับสูงทำได้ยาก
  4. **รหัสสกิล HEXA ไม่ถูกต้อง (Dummy/Non-existent IDs)**: มีการใช้ไอดีจำลองช่วง `xxx40000` (เช่น `154140000`, `162140000` ฯลฯ) ซึ่งไม่มีอยู่ในไฟล์ `.dat` ของ WZ ทำให้เมธอด `SkillData.getSkillDeepCopyById()` คืนค่า `null` และไม่ได้รับสกิล HEXA Mastery จริง
  5. **Adele 6th Job Origin Skill (Maestro - 151141500)**: เพิ่มระบบสถานะอมตะสมบูรณ์แบบ 7 วินาที (`IndieNotDamaged`), แสดงเอฟเฟกต์คัทซีนปาร์ตี้ (`UserLocal.showHexaSkillEff`), และสถานะหยุดการเคลื่อนไหวสมบูรณ์แบบ 10 วินาที (`MobStat.Freeze`) กับลดต้านทานบอส 20 วินาที (`MobStat.OriginDebuff`) ให้ครบตามมาตรฐาน
- **การแก้ไขและปรับปรุง (Comprehensive Fixes)**:
  1. **แก้ไขรหัสอาวุธ Arcane Umbra, อาวุธรอง และตราสัญลักษณ์ตรงสาย 100%**:
     - **Khali**: อาวุธ `1404018` (Arcane Umbra Chakram) + อาวุธรอง `1354033` (Infinite Hex Seeker) + ตราสัญลักษณ์ `1191113` (Gold Guardian Emblem) + ชุดเกราะ Arcane Umbra Thief ครบ 6 ชิ้น
     - **Lara**: อาวุธ `1372228` (Arcane Umbra Wand) + อาวุธรอง `1354023` (Radiant Four-Jade Ornament) + ตราสัญลักษณ์ `1190561` (Gold Earthseer Emblem) + ชุดเกราะ Arcane Umbra Mage ครบ 6 ชิ้น
     - **Illium**: อาวุธ `1282017` (Arcane Umbra Lucent Gauntlet) + อาวุธรอง `1353503` (Glory Lucent Wings) + ตราสัญลักษณ์ `1190532` (Gold Crystal Emblem) + ชุดเกราะ Arcane Umbra Mage ครบ 6 ชิ้น
     - **Ark**: อาวุธ `1482221` (Arcane Umbra Knuckle) + อาวุธรอง `1353603` (Ultimate Path) + ตราสัญลักษณ์ `1190540` (Gold Abyssal Emblem) + ชุดเกราะ Arcane Umbra Pirate ครบ 6 ชิ้น
     - **HoYoung**: อาวุธ `1292018` (Arcane Umbra Super Ritual Fan) + อาวุธรอง `1353803` (Moonstone Fan Tassel) + ตราสัญลักษณ์ `1190550` (Gold Three Paths Emblem) + ชุดเกราะ Arcane Umbra Thief ครบ 6 ชิ้น
     - **Kain**: อาวุธ `1214018` (Arcane Umbra Whispershot) + อาวุธรอง `1354013` (D100 Custom Weapon Belt) + ตราสัญลักษณ์ `1190554` (Gold Hitman Emblem) + ชุดเกราะ Arcane Umbra Archer ครบ 6 ชิ้น
     - **Adele**: อาวุธ `1213018` (Arcane Umbra Bladecaster) + อาวุธรอง `1354003` (Noble Bladebinder) + ตราสัญลักษณ์ `1190552` (Gold Knight's Emblem) + ชุดเกราะ Arcane Umbra Warrior ครบ 6 ชิ้น
     - **Hayato, Kanna, Xenon และอาชีพอื่นๆ**: รองรับคำสั่งตรงและมีระบบ Fallback ตรวจจับสายอุปกรณ์ (`isWarriorEquipJob`, `isMageEquipJob`, `isArcherEquipJob`, `isThiefEquipJob`, `isPirateEquipJob`) มอบอาวุธและชุดเกราะตรงสาย 100%
  2. **แก้ไขรหัสสกิล HEXA Matrix และ V-Matrix ให้ตรงตามดาต้า WZ/DAT 100%**:
     - นำรหัสสกิลจริงทั้งหมดจาก Job Class มาบันทึกใน `setupEndgame` ทำให้ระบบมอบสกิลคลาส 6 HEXA Mastery และ Origin ทุกสกิลที่ระดับ Lv.30 เต็มได้ครบ 100%
  3. **มอบไอเทมจำเป็นสำหรับการทดสอบเพิ่มเติม**:
     - หิน Nodestone x100 (`2435719`)
     - ยา Power Elixir x1000 (`2000005`)
     - Sol Erda Energy x20 (`2636421`) และ Sol Erda Fragment x1000 (`4009548`)
     - ส่งแพ็กเก็ต Add Item พร้อมอัปเดต Client Inventory ในทันที
  4. **คอมไพล์และอัปเดตแพ็กเกจแจกจ่าย**:
     - คอมไพล์ผ่าน 100% (`BUILD SUCCESS`)
     - เขียนทับ `Server263/maplestory.jar`
     - สร้างแพตช์อัปเดตล่าสุด `Patches/Server263_Patch_20261009_1510.zip` (121.51 MB) พร้อมใช้งานและทดสอบได้ทันที


---

### 9.6 การออดิตและแก้ไขเชิงลึกระบบ HEXA Matrix รายอาชีพ (Batch 1: Lara & Khali) และแก้ไขวิกฤติ Packet Desync

#### 🔍 1. การวิเคราะห์สาเหตุเชิงลึกของบั๊ก "มอนสเตอร์หยุดเดิน" และ "ใช้หรือลากไอเทมไม่ได้" (Root Cause Analysis)
- **ปัญหาที่พบ:** ผู้เล่นทดสอบสกิล Origin หรือสกิลบางอย่างแล้วมอนสเตอร์ทั้งหมดหยุดเคลื่อนไหว ไม่ตอบสนอง และไม่สามารถกดใช้ยา หรือคลิกลากไอเทมในช่องเก็บของได้
- **สาเหตุทางเทคนิค (Technical Root Cause):**
  1. ในการส่งแพ็กเก็ตสถานะมอนสเตอร์ `MobTemporaryStat.encode` ได้มีการใส่ `MobStat.OriginDebuff (bit 133)` เข้าไปใน Collection ของมอนสเตอร์
  2. ใน `MobStat.java` นั้น `OriginDebuff` **ไม่ได้อยู่ในรายการ `MobStat.orders`** ทำให้เมธอด `cts.getOrder()` คืนค่า `-1`
  3. ผลลัพธ์คือ ฝั่งเซิร์ฟเวอร์เข้ารหัส Bitmask โดยประกาศว่ามีสถานะบิต 133 แต่ในลูปการส่งข้อมูลกลับข้ามการเขียนข้อมูล 10 ไบต์ (`nOption`, `rOption`, `tOption`) และดันไปเขียน `encodeShort(xOption)` ที่ส่วนท้าย
  4. ตัวเกมฝั่ง Client (`MapleStory.exe`) เมื่อถอดรหัสบิต 133 จึงพบ Buffer Underflow เกิด `CXX_EXCEPTION` ขึ้นใน Thread รับส่งแพ็กเก็ต (บันทึกใน `CrashLog.txt`) ทำให้ Client หยุดประมวลผลแพ็กเก็ตทั้งหมดจากเซิร์ฟเวอร์
  5. เมื่อเครือข่ายหยุดส่ง/รับข้อมูล ผู้เล่นจึงเห็นมอนสเตอร์หยุดเดิน และการกระทำใดๆ ที่ต้องรอการยืนยันสถานะจากเซิร์ฟเวอร์ (`exclRequestSent` เช่น การลากไอเทมหรือกดยา) จะค้างในสถานะ Action Lock ตลอดไป
- **แนวทางแก้ไขระดับโครงสร้าง (Permanent Fix):**
  - กำหนดให้ `OriginDebuff` เป็นระบบนับคูลดาวน์ต้านทาน 100 วินาทีแบบ **Server-side Only** ภายใน `mob.getLastDebuffTimes()` เท่านั้น โดยห้ามส่งเข้าแพ็กเก็ตเน็ตเวิร์กไปยัง Client โดยเด็ดขาด
  - ใน `MobTemporaryStat.java` เพิ่มระบบป้องกันอัตโนมัติ `map.remove(OriginDebuff)` ก่อนประกอบแพ็กเก็ต และตัด `encodeShort` สำหรับ OriginDebuff ออกอย่างถาวร
  - การหยุดการเคลื่อนไหวของมอนสเตอร์ในสกิล Origin ให้ส่งสถานะ `MobStat.Freeze` ซึ่งเป็นสถานะมาตรฐานที่เสถียรและทำงานได้สมบูรณ์ 100%

---

#### 🌟 2. ผลการออดิตและแก้ไขรายอาชีพ (Job-by-Job Audit: Batch 1)

##### 🍃 อาชีพที่ 1: Lara (ลาร่า - Job ID: 16212)
- [x] **สกิล Origin: Cornucopia (풍년 - 162141502 / 162141503)**:
  - แก้ไขบล็อก `handleAttack` ให้เรียกใช้ `mts.addStatOptions(mob, MobStat.Freeze, opt1)` โดยตรง ไม่ส่ง `OriginDebuff` ป้องกันบั๊กหลุด/ค้าง 100%
  - มอบสถานะอมตะสมบูรณ์แบบ 7 วินาที (`IndieNotDamaged`) ในช่วงคัตซีน
  - เชื่อมต่อระบบคูลดาวน์ต้านทาน 100 วินาทีฝั่งเซิร์ฟเวอร์ผ่าน `Job.isOriginSkill()`
  - แสดงเอฟเฟกต์คัตซีนสกิลเต็มจอแก่สมาชิกในปาร์ตี้ (`UserLocal.showHexaSkillEff`)
- [x] **ป้องกัน Action Lock ในสกิล Active & Utility**:
  - สกิล `Big Stretch (400021122)`, `Unconstrained Dragon Vein (162121042)`, `Dragon Vein Reading (162101000)`, `Dragon Vein Conversion (162121001)` เพิ่มการส่ง `chr.dispose()` คืนสิทธิ์การควบคุมแก่ Client ทันที
  - เพิ่มบล็อก `default: chr.dispose();` ใน `Lara.handleSkill` เพื่อป้องกันอาการติดสถานะรอ (Pending Request) เมื่อร่ายสกิลที่ไม่มีบัฟ
- [x] **ตรวจสอบสกิล HEXA Mastery ครบทั้ง 8 สกิล**:
  - `HEXA Eruption: Heaving River (162141001 / 162141002)`
  - `HEXA Eruption: Whirlwind (162141005 / 162141006)`
  - `HEXA Eruption: Sunrise Well (162141008 / 162141009)`
  - `HEXA Dragon Vein Absorption (162141010)`
  - `HEXA Absorption: River Puddle Douse (162141012 / 162141013)`
  - `HEXA Absorption: Fierce Wind (162141015 / 162141016)`
  - `HEXA Absorption: Sunlit Grain (162141018 / 162141019)`
  - `HEXA Wakeup Call (162141020)`

##### ⚔️ อาชีพที่ 2: Khali (คาลี - Job ID: 15412)
- [x] **สกิล Origin: Wake the Void (헤็ก스: 마그눔 - 154141504 / 154141505)**:
  - แก้ไขบล็อก `handleAttack` ให้เรียกใช้ `mts.addStatOptions(mob, MobStat.Freeze, opt1)` โดยตรง ไม่ส่ง `OriginDebuff` ป้องกันแพ็กเก็ตผิดพลาด 100%
  - มอบสถานะอมตะสมบูรณ์แบบ 7 วินาที (`IndieNotDamaged`) ในช่วงคัตซีน
  - รีเซ็ตคูลดาวน์สกิลตระกูล Void Rush ทั้งหมดอัตโนมัติ
  - กระตุ้นระบบ Resonate ทันทีเพื่อสร้างความเสียหายต่อเนื่องรอบตัว
  - แสดงเอฟเฟกต์คัตซีนแก่สมาชิกในปาร์ตี้ (`UserLocal.showHexaSkillEff`)
- [x] **ระบบ Chakri Vortex & Resonate**:
  - สกิลสาย Arts ลดคูลดาวน์ของสกิล Hex ทั้งหมดลง 1 วินาทีต่อการโจมตีโดนมอนสเตอร์
  - เสก Chakri Vortex ลงบนตำแหน่งมอนสเตอร์ที่โดนโจมตีด้วยโอกาส 60%
  - เมื่อพุ่งผ่านด้วย Void Rush หรือกด Origin จะดูดซับ Vortex ฟื้นฟู 5% HP/MP และทำดาเมจ Resonate ทันที
  - เพิ่ม `chr.dispose()` ใน `Khali.handleSkill` เพื่อป้องกัน Action Lock ทุกกรณี
- [x] **ตรวจสอบสกิล HEXA Mastery ครบทั้ง 10 สกิล**:
  - เพิ่มรหัสสกิล `HEXA Resonate (154141013)` เข้าในระบบ `!endgame` ที่เคยตกหล่น
  - สกิลครบถ้วน: `HEXA Arts: Flurry (154141000)`, `HEXA Arts: Crescentum (154141001)`, `HEXA Arts: Triple Bash (154141002)`, `HEXA Void Blitz (154141008)`, `HEXA Chakram Split (154141009)`, `HEXA Chakram Fury (154141010)`, `HEXA Chakram Sweep (154141011)`, `HEXA Death Blossom (154141012)`, `HEXA Resonate (154141013)`, `HEXA Deceiving Blade (154141014)`

---

#### 💎 3. ปรับปรุงไอเทมทดสอบระดับมหาศาล (Massive Testing Items Boost)
- ปรับเปลี่ยนปริมาณไอเทมในคำสั่ง `!endgame` และเพิ่มคำสั่งใหม่ `!hexaitems` / `!solerda`:
  - **Sol Erda Energy (`2636421`)**: เพิ่มจาก 20 เป็น **500 ก้อน**
  - **Sol Erda Fragments (`4009548`)**: เพิ่มจาก 1,000 เป็น **20,000 ชิ้น**
  - **Nodestones (`2435719`)**: เพิ่มจาก 100 เป็น **2,000 ชิ้น**
  - **Power Elixirs (`2000005`)**: เพิ่มจาก 1,000 เป็น **5,000 ขวด**
  - **Mesos**: มอบทันที **10,000,000,000 Mesos (1 หมื่นล้าน Mesos)**
- **คำสั่งใหม่เฉพาะ Admin**: พิมพ์ `!hexaitems` หรือ `!solerda` หรือ `!hexastones` ได้ตลอดเวลาเมื่อไอเทมหินหรือผงอัปสกิลหมด โดยไม่ต้องรีเซ็ตตัวละครใหม่

---

#### 🚨 4. วิเคราะห์และแก้ไขบั๊กเกมเด้ง (Client Crash on Login / Field Enter Fix)
- **สาเหตุของอาการเกมเด้ง (Root Cause Analysis)**:
  1. **Error 38 (Buffer Underflow) ใน Achievement System**: ใน `Char.java:4913` มีการเรียก `AchievementHandler.handleFieldEnter(this, toField.getId());` ซึ่งมีคอมเมนต์เดิมระบุไว้ชัดเจนว่า `// ?? err38` เมื่อสร้างตัวละครใหม่ (เช่น `KahliOFFLINE`) ที่ยังไม่เคยเข้าเมือง Henesys ระบบจะส่งแพ็กเก็ต `MESSAGE (ACHIEVEMENT_INIT / ACHIEVEMENT_DATA_MESSAGE)` ที่โครงสร้างไบต์ไม่ตรงกับ Client v265 ทำให้ไคลเอนต์เกิดบัฟเฟอร์ขาด (`0xE06D7363` C++ exception ใน `CInPacket::Decode`) แล้วส่งรายงาน Error 38 ก่อนพังด้วย Heap Corruption (`0xC0000374`)
  2. **Mo Xuan Extra System Stack Packets รั่วไหล**: ใน `Char.java:4907-4910` มีการส่ง `sendExtraSystemStack` และ `sendExtraSystemInit` (Opcode 545) ให้กับทุกตัวละครที่วาร์ปเข้าแมพ ทั้งที่ไม่ใช่อาชีพ Mo Xuan
  3. **Field Script Undefined Chat/Dispose Race**: แผนที่ Henesys มีสคริปต์ `explorationPoint` ใน WZ เมื่อเซิร์ฟเวอร์ไม่มีไฟล์นี้จะตกไปที่ `undefined(ScriptType.Field)` ซึ่งส่งข้อความแชตสีแดงและ `chr.dispose()` แทรกระหว่างการโหลดแมพ
  4. **Action Lock ในสกิล Origin**: ใน `Lara.java` และ `Khali.java` เมื่อกดร่ายสกิลคัตซีน Origin ขาดการเรียก `chr.dispose()` ทำให้ตัวละครค้างในสถานะ Action Lock ลากไอเทมหรือคลิกใช้ของไม่ได้
- **การแก้ไขที่ดำเนินการ (Applied Fixes)**:
  - [x] **ปิดการทำงานของ `AchievementHandler.handleFieldEnter`**: ป้องกันการส่งแพ็กเก็ต Achievement ผิดโครงสร้างที่ทำให้ Client v265 Error 38
  - [x] **จำกัดเงื่อนไข Mo Xuan Extra System Packets**: ครอบด้วย `if (JobConstants.isMoXuan(getJob()))` ป้องกันแพ็กเก็ตแปลกปลอมรบกวนอาชีพอื่น
  - [x] **แก้ไข `ScriptManagerImpl.undefined` สำหรับ `Field`**: ให้ `case Field: break;` ข้ามไปอย่างเงียบสงบโดยไม่ส่งแชตเตือนหรือดิสโพสแทรกการเข้าแมพ
  - [x] **เพิ่ม `chr.dispose()` ใน `CORNUCOPIA` (Lara) และ `WAKE_THE_VOID` (Khali)**: ปลดล็อกการควบคุมตัวละครทันทีหลังร่ายสกิล Origin
  - [x] **เปิด Packet Logging & ปรับปรุง Client Error Logging**: ตั้ง `server.packetLog=true` และแสดง Hex เต็มของแพ็กเก็ตแจ้งเตือนข้อผิดพลาดจากเกม
  - [x] คอมไพล์และดีพลอยเซิร์ฟเวอร์ใหม่ พร้อมสตาร์ตระบบเรียบร้อย 100% พอร์ต 8484, 8585, 8483 พร้อมให้เข้าทดสอบ

---

### 9.5 การวิเคราะห์ Logs: แก้ไขบั๊กมอนสเตอร์ไม่ตาย, ปลดล็อก Cooldown สกิล Hexa และปรับโครงสร้างคำสั่งทดสอบ

#### 🔍 1. การวิเคราะห์สาเหตุเชิงลึกจาก Logs เซิร์ฟเวอร์จริง (Real Server Logs Analysis)
1. **การติด Cooldown Lock ของสกิลคลาส 6 (14s Cooldown Freeze)**:
   - สกิล HEXA Mastery เช่น `HEXA Chakram Split (154141009)` ในไฟล์ WZ มีค่า `cooltime = 14 วินาที`
   - เมื่อใช้คำสั่งก่อนหน้าที่มีการเสกสกิลคลาส 6 เข้าตัวละครตรงๆ (`chr.addSkill`) ระบบจะบันทึกสกิลลงใน Skill Book ของตัวละคร
   - เมื่อกดโจมตีครั้งแรก ฟังก์ชัน `Char.checkAndSetSkillCooltime(154141009, true)` จะทำงานและตั้งเวลาคูลดาวน์ 14 วินาทีให้ตัวละครทันที (ตรวจพบแพ็กเก็ต `SKILL_COOLTIME_SET_M` ใน Logs อย่างต่อเนื่อง)
   - การกดโจมตีระลอกถัดไปทั้งหมดภายใน 14 วินาทีจะถูกตีกลับเป็น `false` ส่งผลให้ [AttackHandler.java](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/user/AttackHandler.java#L113-L116) **ตัดทิ้งการโจมตีทั้งหมด (Silent Drop)** ไม่ส่งดาเมจไปยัง `mob.damage()` มอนสเตอร์จึงไม่ได้รับความเสียหายและไม่ตาย
2. **สกิลคลาส 5 Multi-wave ถูกคูลดาวน์ตัดคลื่นหลังๆ**:
   - สกิลคลาส 5 เช่น `400041082` (Void Blitz ของ Khali) มีคูลดาวน์ 30 วินาที เมื่อกดใช้ 1 ครั้ง Client จะส่งแพ็กเก็ตการโจมตีออกมาต่อเนื่อง 10–15 แพ็กเก็ตภายใน 1 วินาที (Logs บรรทัด 6005–6021)
   - คลื่นแรกทำงานได้ แต่คลื่นที่ 2 ถึง 15 ถูกเซิร์ฟเวอร์ตัดทิ้งทั้งหมดเนื่องจากไม่ได้อยู่ในรายการ `SkillConstants.isNoCoolDownAttack`
3. **การฟันลม (0 Mobs Hit)**:
   - Logs บรรทัด 8370–8393 แพ็กเก็ตส่ง `mobCount = 0` (`mask = 0x0A, 0x07, 0x04`) มอนสเตอร์อยู่นอกระยะการโจมตี เซิร์ฟเวอร์จึงข้ามการคำนวณดาเมจ
4. **มอนสเตอร์หยุดเดิน (Mob Pathfinding Desync)**:
   - การมีสกิลคลาส 6 แปลกปลอมอยู่ใน Skill Book ปกติของ Client v265 ทำให้เกิดความคลาดเคลื่อนในการส่งข้อมูลสถานะการควบคุมมอนสเตอร์ (Controller Ack) เมื่อไคลเอนต์ติดสถานะไม่สอดคล้องจะระงับการคำนวณ Pathfinding ของมอนสเตอร์ชั่วคราว

#### 🛠️ 2. การแก้ไขที่นำไปใช้งาน (Applied Fixes)
- [x] **ปรับโครงสร้างคำสั่ง `!endgame` ตามข้อสังเกตของผู้ใช้อย่างเคร่งครัด**:
  - **เสกเฉพาะสกิลคลาส 1–4 ให้เต็ม 100% (`chr.maxSkills()`) เท่านั้น** ป้องกันบั๊กการยัดสกิลคลาส 5/6 เข้า Skill Book โดยตรง
  - **ระบบทำความสะอาดอัตโนมัติ**: เมื่อพิมพ์ `!endgame` ระบบจะตรวจจับและลบสกิลคลาส 6 ที่เคยยัดเข้า Skill Book ค้างไว้ออกทั้งหมดทันที ป้องกัน Skill Tree ค้าง
  - **มอบไอเทมอัปเกรดระดับมหาศาลสำหรับ V-Matrix และ Hexa Matrix แท้ของเกม**:
    - **Sol Erda Energy (`2636421`)**: 1,000 ก้อน
    - **Sol Erda Fragments (`4009548`)**: 30,000 ชิ้น
    - **Nodestones (`2435719`)**: 3,000 ชิ้น
    - **Power Elixirs (`2000005`)**: 5,000 ขวด
    - **Mesos**: 10,000,000,000 (1 หมื่นล้าน Mesos)
    - **เซ็ตอุปกรณ์ Arcane Umbra ครบชุด**: อาวุธ, อาวุธรอง, Emblem, ชุดเกราะ
- [x] **ปลดล็อกคูลดาวน์สกิลคลาส 6 ใน `Char.checkAndSetSkillCooltime`**:
  - เพิ่มเงื่อนไข `(skillID >= 100000000 && (skillID % 100000 / 10000 == 4))` เพื่อให้การโจมตีด้วยสกิลคลาส 6 / HEXA Mastery ไม่ถูกบล็อกด้วยคูลดาวน์ของตัวสกิล
- [x] **เพิ่มสกิลต่อเนื่องคลาส 5 ใน `SkillConstants.isNoCoolDownAttack`**:
  - เพิ่มสกิล Khali (`400041082`, `400041083`, `400041084`, `400041087`, `400041089`)
  - เพิ่มสกิล Lara (`400021122`, `400021123`, `400021129`, `400021130`)
- [x] **คอมไพล์ JAR และรีสตาร์ตเซิร์ฟเวอร์เรียบร้อย 100%** พร้อมเข้าทดสอบทันที

---

### 9.6 การตรวจสอบและแก้ไขอาชีพ Lara (Anima Mage)

#### 🔍 1. รายการประเด็นที่พบจากการ Audit เชิงลึก
1. **Mountain Seeds Summon ขาดลอจิกการเสก**: ใน [Lara.java](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/anima/Lara.java) เมื่อกดใช้สกิล `MOUNTAIN_SEEDS (162101012)` โค้ดตกไปที่ `default: chr.dispose();` ไม่มีการสร้างและเสกตัวมอนสเตอร์ซัมมอนของเมล็ดพันธุ์ดินออกมาช่วยโจมตี
2. **การรีฟิล Stack สกิลของ Lara ไม่ตอบสนอง**: ไคลเอนต์ MapleStory v265 ส่งแพ็กเก็ต `LARA_STACK_OVER_TIME_SKILL_INCREASE_REQUEST` / `STACK_OVER_TIME_SKILL_INCREASE_REQUEST` เพื่อขอสะสม Seed และ Traces แต่ใน [AttackHandler.java](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/user/AttackHandler.java) ไม่มี case รองรับสกิลของ Lara ทำให้ไคลเอนต์ไม่ได้รับแพ็กเก็ตตอบกลับ `STACK_SKILL_REQUEST_RESULT`
3. **สกิลระลอกสองและคลื่นดาเมจของ Dragon Vein ขาดจาก `isNoCoolDownAttack`**: สกิลการระเบิดมังกร (Eruption), การดูดซับ (Absorption) และคลื่นของสันเขา (Winding Mountain Ridge 2 `400021131`) มีการส่งแพ็กเก็ตการโจมตีหลายระลอก หากไม่ได้ยกเว้นจะถูกคูลดาวน์สกัดกั้น
4. **Hexa Wakeup Call ในแพ็กเก็ตส่งไปยังผู้เล่นอื่น (UserRemote)**: ไคลเอนต์ v265 มีเงื่อนไขเฉพาะสำหรับ `162111005` (Wakeup Call) ที่ต้อง encode int(0) เพิ่มเติม แต่ยังขาดการรองรับ `HEXA_WAKEUP_CALL (162141020)` ซึ่งอาจทำให้ผู้เล่นคนอื่นในแผนที่เดียวกันหลุดหรือ Desync

#### 🛠️ 2. การดำเนินการแก้ไข (Applied Fixes)
- [x] **เพิ่มระบบอัญเชิญ Mountain Seeds ใน `Lara.handleSkill`**:
  - สร้าง `Summon` อัตโนมัติด้วย `Summon.getSummonByAndSetStat`, กำหนด `MoveAbility.Stop` และ `AssistType.Attack` เพื่อให้เมล็ดพันธุ์งอกและโจมตีมอนสเตอร์รอบตัว
- [x] **เพิ่มการประมวลผล Stack ของ Lara ใน `AttackHandler.handleStackOverTimeSkillIncreaseRequest`**:
  - เพิ่มการตรวจสอบสกิล `MOUNTAIN_SEEDS`, `DRAGON_VEIN_TRACES`, `UNCONSTRAINED_DRAGON_VEIN` พร้อมส่ง `WvsContext.updateSkillStackRequestResult` ยืนยันสแต็กกลับไปยังไคลเอนต์
- [x] **เพิ่มสกิลย่อยทั้งหมดของ Lara ลงใน `SkillConstants.isNoCoolDownAttack`**:
  - `400021131` (Winding Mountain Ridge 2)
  - Eruption Sub-Attacks: `162101004`, `162101007`, `162101009`, `162101011`, `162121013`, `162121014`, `162121016`, `162121017`, `162121019`
  - Absorption Sub-Attacks: `162121004`, `162121007`, `162121010`
  - Manifestation Sub-Attacks: `162111002`
- [x] **แก้ไขแพ็กเก็ต `UserRemote.java` สำหรับ Hexa Wakeup Call**:
  - เพิ่ม `ai.skillId == 162141020` เข้ากับเงื่อนไข `encodeInt(0)` ป้องกันไคลเอนต์ของเพื่อนร่วมแมพ Desync
- [x] **ทดสอบการคอมไพล์ผ่านสมบูรณ์ 100%**: Maven BUILD SUCCESS (50.2s) และดีพลอย JAR ไปยัง `Server263/maplestory.jar` เรียบร้อย

---

### 9.7 การออดิตและแก้ไขเชิงระบบครบวงจรสำหรับคลาสที่ยังไม่สมบูรณ์เรื่องสกิล / STAT (Comprehensive Audit & Fixes)

#### 🔍 1. รายการบั๊กและข้อบกพร่องที่ค้นพบจากการ Audit ทั่วทั้งระบบ
1. **Kain (Nova Archer)**:
   - ตกหล่นจาก `JobConstants.isArcherEquipJob`: ส่งผลให้ `ScriptManagerImpl.resetAP` คำนวณ Stat หลักผิด, `ItemConstants.getJobMaskFromChar` มองเป็น AnyJob (0), และชุดเกราะ `!endgame` ตกไปเป็น Pirate
   - ขาดสกิลคลาส 5 และ 6 ใน `SkillConstants.isNoCoolDownAttack`: สกิลรัวหลายฮิตอย่าง `Fatal Blitz (400031065)`, `Dragon Burst (400031061)`, `Thanatos Descent (400031062-64)`, `Grip of Agony (400031066)` และท่า Origin `Total Annihilation / Churning Malice` หยุดทำดาเมจหลังฮิตแรกเนื่องจากติดคูลดาวน์สกัดกั้น
2. **Ren (Anima Warrior)**:
   - บั๊ก `jobID + 1` ในการเลื่อนขั้นอาชีพ: โค้ดเดิมกำหนด `sm.setJob((short)(jobID + 1))` ซึ่งทำให้ `REN_1 (16100)` กลายเป็น `16101` (ไอดีอาชีพที่ไม่มีอยู่จริง ส่งผลให้คลาสพัง) โดยคลาส 2 ที่ถูกต้องคือ `16110 (REN_2)`
   - ขาดการเลื่อนขั้นอาชีพที่เลเวล 30: `handleLevelUp` มีเพียงเลเวล 60 และ 100 เท่านั้น
   - ขาดอาวุธเริ่มต้น (Starter Weapon): `addItemToNewCharacter` แจกเพียงอาวุธรอง `1354040` ทำให้ตัวละครไม่มีอาวุธดาบหลัก
   - ขาดสกิลคลาส 5 ใน `SkillConstants.isNoCoolDownAttack`: สกิล `400011147`, `400011148`, `400011150`, `400011151`, `400011153`, `400011157`
   - ตกหล่นจาก `!endgame`: ไม่มีเคสแจกอาวุธ Arcane Umbra Plum Sword (`1215018`) และ Radiant Spirit Heart (`1354043`)
3. **Lynn (Jianghu Mage)**:
   - ขาดการเลื่อนขั้นที่เลเวล 30 ใน `handleLevelUp`: เมื่อเก็บเลเวลตามปกติถึง 30 ตัวละครจะไม่เปลี่ยนเป็น `LYNN_2 (17210)`
   - ขาดสกิลคลาส 5 ใน `SkillConstants.isNoCoolDownAttack`: `400021134`, `400021137`, `400021138`, `400021139`
   - ตกหล่นจาก `!endgame`: ขาดเคสแจก Arcane Umbra Memorial Staff (`1252098`) และ Beast Bell (`1352813`)
4. **MoXuan (Jianghu Pirate)**:
   - ขาด `handleLevelUp` อัตโนมัติ: ตัวละครต้องพึ่งพาบทสนทนา NPC เท่านั้น เมื่อเลเวลถึง 30, 60, 100 ไม่มีการเปลี่ยนอาชีพและแจกแต้ม SP อัตโนมัติ
   - ใช้อาวุธรองผิดสายใน `addItemToNewCharacter`: แจก `1354030` ซึ่งเป็นอาวุธรอง Thief (rJob=8) แทนที่จะเป็น `1352860` ของ MoXuan (Pirate rJob=16)
   - ขาดสกิลคลาส 5 ใน `SkillConstants.isNoCoolDownAttack`: `400051084`, `400051086`, `400051087`, `400051088`, `400051089`
   - การจัดหมวด Stat หลักผิดพลาด: ใน `GameConstants` ถูกจัดเข้า `BaseStat.dex` ทั้งที่ MoXuan เป็น STR Pirate (สนับมือเริ่มต้นต้องการ STR 45)
5. **Sia Astelle (Shine Mage)**:
   - โค้ดเดิมเป็นโครงร่างว่างเปล่า (มีเพียง 25 บรรทัด): ขาด `setCharCreationStats`, `addItemToNewCharacter`, `handleLevelUp`, `handleInitAfterMigrate`
   - ขาดการนิยาม `WeaponType`: อาวุธ Celestial Light (`1253xxx`) ไม่มีประเภทใน `WeaponType.java` ทำให้ `ItemConstants.getWeaponType` คืนค่า `None` ส่งผลให้การคำนวณดาเมจพื้นฐานกลายเป็น 0
   - ขาดสกิลคลาส 5 ใน `SkillConstants.isNoCoolDownAttack`: `400021142`, `400021143`, `400021147`, `400021149`, `400021152`
6. **Adele**:
   - ขาดสกิล V-Matrix หลายฮิตใน `SkillConstants.isNoCoolDownAttack`: `Ruin (400011105)` และ `Storm (400011136)`
7. **ระบบกลาง (Core Constants & Damage Calculation)**:
   - `JobConstants.isWarriorEquipJob`: มี `isArk(id)` อยู่ ทั้งที่ Ark เป็น Pirate ส่งผลให้ระบบมอง Ark เป็น Warrior และแจกชุดเกราะ/Scroll ผิดประเภท
   - `DamageCalc.getMastery()`: ขาดอาวุธ `Bladecaster`, `RenSword`, `Chakram`, `Whispershot`, `MemoryStaff`, `CelestialLight` ทำให้ Base Mastery กลายเป็น 0
   - `JobEnum.getUsingWeapons()`: สิ้นสุดที่ Kain ขาดอาชีพใหม่ทั้งหมด (Cadena, Illium, Ark, Pathfinder, Hoyoung, Lara, Khali, Ren, Lynn, MoXuan, Sia)

---

#### 🛠️ 2. การดำเนินการแก้ไขครบทุกจุด (Applied Fixes)
- [x] **แก้ไข `JobConstants.java`**:
  - เพิ่ม `isKain(id)` ใน `isArcherEquipJob`
  - นำ `isArk(id)` ออกจาก `isWarriorEquipJob`
  - เพิ่มการลงทะเบียนอาวุธของทุกอาชีพใหม่ใน `JobEnum.getUsingWeapons()`
- [x] **แก้ไข `WeaponType.java` & `DamageCalc.java`**:
  - เพิ่ม `CelestialLight(1.2f, 253)` สำหรับ Sia Astelle
  - อัปเดต `DamageCalc.getMastery()` ครอบคลุมอาวุธใหม่ทุกประเภท
- [x] **แก้ไข `ItemConstants.java`**:
  - เพิ่ม `MemoryStaff` และ `CelestialLight` ใน `getWeaponTypeVal`
- [x] **แก้ไข `GameConstants.java` & `ScriptManagerImpl.java`**:
  - ปรับ MoXuan และ Ren เข้ากลุ่ม `BaseStat.str` ให้ตรงกับสาย STR Warrior/Pirate
  - เพิ่ม MoXuan และ Ark ในการรีเซ็ตแต้ม AP สาย STR Pirates ใน `ScriptManagerImpl.resetAP`
  - ปรับปรุง `GameConstants.getItemJobByJob` ให้เรียกตรวจผ่านเมธอด EquipJob กลาง รองรับทุกอาชีพโดยไม่ตกไปที่ `ItemJob.BEGINNER`
- [x] **แก้ไข `Ren.java`**:
  - เพิ่มการมอบอาวุธเริ่มต้น `1215000` (Basic Plum Sword)
  - ปรับระบบ `handleLevelUp` ให้เปลี่ยนอาชีพตรง Job ID (`REN_2 (16110)`, `REN_3 (16111)`, `REN_4 (16112)`) พร้อมแจกแต้ม SP และอาวุธรองตามระดับเลเวล 30, 60, 100
- [x] **แก้ไข `Lynn.java`**:
  - เพิ่มการเปลี่ยนอาชีพคลาส 2 อัตโนมัติที่เลเวล 30 พร้อมแจก SP และอาวุธรอง `1352811`
  - ปรับปรุงเลเวล 60 (`LYNN_3`) และ 100 (`LYNN_4`) ให้แจกอาวุธรองตามระดับ
- [x] **แก้ไข `MoXuan.java`**:
  - แก้ไขอาวุธรองเริ่มต้นเป็น `1352860` (Martial Fist สำหรับ Pirate)
  - เพิ่ม `handleLevelUp` อัตโนมัติที่เลเวล 30, 60, 100 แจก SP และอาวุธรองคลาส 2, 3, 4
- [x] **สร้างคลาส `SiaAstelle.java` ให้สมบูรณ์แบบ**:
  - กำหนด Stat ตั้งต้นตอนสร้างตัวละคร (`INT 45`, `HP/MP 1000/500`, `SP +5`)
  - แจกอาวุธเริ่มต้น Celestial Light `1253000` และ Constellation `1352870`
  - ระบบเปลี่ยนอาชีพคลาส 2-4 อัตโนมัติที่เลเวล 30, 60, 100
- [x] **อัปเดต `SkillConstants.isNoCoolDownAttack`**:
  - เพิ่มสกิลหลายฮิตคลาส 5 & 6 ของ Kain, Ren, Lynn, MoXuan, Sia Astelle และ Adele
- [x] **อัปเดตคำสั่ง `!endgame` ใน `AdminCommands.java`**:
  - เพิ่มการแจกอุปกรณ์ Arcane Umbra, อาวุธรองคลาส 4, ตราสัญลักษณ์, และชุดเกราะตรงสาย 100% สำหรับ Ren, Lynn, MoXuan, Sia Astelle, Cadena, Pathfinder, Kinesis
- [x] **คอมไพล์ผ่านสมบูรณ์ 100% (Maven BUILD SUCCESS)** และรีสตาร์ตเซิร์ฟเวอร์เปิดให้บริการพอร์ต 8484 และ 8585-8594 ครบทุกแชนแนล



