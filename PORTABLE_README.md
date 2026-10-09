# คู่มือการใช้งานเซิร์ฟเวอร์ MapleStory (Zero-Install Portable Edition)

เซิร์ฟเวอร์นี้ได้รับการปรับปรุงและจัดเตรียมระบบให้เป็นแบบ **Full Portable 100% (Zero-Install)** ไม่จำเป็นต้องติดตั้ง Java (JDK), Apache Maven, หรือ **MySQL / MariaDB ใดๆ บนเครื่องคอมพิวเตอร์เลย** เนื่องจากมีชุด Engine รันไทม์และ Dependencies ทั้งหมดบรรจุอยู่ภายในโฟลเดอร์โปรเจกต์นี้เรียบร้อยแล้ว

---

## 📁 สิ่งที่จัดเตรียมไว้ให้พร้อมภายในโฟลเดอร์

1. **`mariadb\`**: Portable MariaDB 10.11.8 Engine ทำหน้าที่เป็นเซิร์ฟเวอร์ฐานข้อมูลโดยไม่ต้องติดตั้งโปรแกรมภายนอก
   - ข้อมูลตัวละคร, เลเวล, ไอเทม, เงิน Mesos, สกิล จะถูกบันทึกลงใน `mariadb\data\` ตลอดเวลาแบบ Real-time
2. **`jdk21\`**: OpenJDK 21 (Adoptium Temurin 64-bit) สำหรับรันและคอมไพล์โค้ด
3. **`apache-maven-3.9.15\`**: ตัวจัดการ Build & Dependencies (Maven)
4. **`maplestory.jar`**: ไฟล์ JAR เซิร์ฟเวอร์ที่รวมไลบรารีครบทุกตัว (Fat JAR / Assembly ~138 MB) พร้อมรันได้ทันที
5. **`server.properties`**: ไฟล์ตั้งค่าเซิร์ฟเวอร์ (Database, IP, Port, Server Rates EXP/Meso/Drop)
6. **`backup.sql`**: ฐานข้อมูลเซิร์ฟเวอร์เวอร์ชันสมบูรณ์ (110 ตาราง)
7. **`Client_Patch_Files\`**: ชุดไฟล์สำหรับวางในโฟลเดอร์เกม Client v265 (`Launcher.exe`, `Localhost.dll`, `Run_Game.bat`)
8. **ตัวรันและเมนูจัดการแบบคลิกเดียว**:
   - `1_Start_Server.bat` : เริ่มรัน MariaDB และเซิร์ฟเวอร์ MapleStory ในคลิกเดียว
   - `2_Build_Server.bat` : คอมไพล์และสร้าง `maplestory.jar` ใหม่เมื่อมีการแก้ไขซอร์สโค้ด
   - `3_Stop_Server.bat` : หยุดการทำงานของเซิร์ฟเวอร์และบันทึกปิด MariaDB อย่างปลอดภัย
   - `4_Server_Control_Panel.bat` : เมนูควบคุมรวม (Start / Restart / Stop / Build / Import DB / Config)
   - `Import_Database.bat` : เครื่องมือนำเข้าฐานข้อมูล `backup.sql` เข้า Portable MariaDB

---

## 🚀 ขั้นตอนการเริ่มต้นใช้งาน (สำหรับผู้ใช้)

ผู้ใช้มีหน้าที่เพียง **คลิกเดียว**:

### ขั้นตอนที่ 1: เปิดเซิร์ฟเวอร์
ดับเบิลคลิกไฟล์ **`1_Start_Server.bat`** (หรือเปิดผ่าน **`4_Server_Control_Panel.bat`**)
- ระบบจะเปิด Portable MariaDB Engine ให้อัตโนมัติ (พอร์ต 3306)
- หากเปิดใช้งานครั้งแรก ระบบจะตรวจจับและนำเข้าฐานข้อมูล `vietmaple` ให้ทันที
- เมื่อเซิร์ฟเวอร์พร้อมใช้งาน หน้าต่างคอนโซลจะแสดงผล:
  - `[World 19] Channel 1-10 listening on port 8585-8594`
  - `Login listening on port 8484`
  - `API listening on port 8483`
  - `[WZ Data] Finished Loaded WZ data`

### ขั้นตอนที่ 2: เปิดเล่นเกม (Client)
1. ก๊อปปี้ไฟล์ทั้งหมดในโฟลเดอร์ **`Client_Patch_Files`** ไปวางในโฟลเดอร์ MapleStory v265
2. ดับเบิลคลิก **`Run_Game.bat`** หรือ **`Launcher.exe`**
3. ล็อกอินเข้าเล่นเกมได้ทันที! (บัญชีเริ่มต้น: `admin` / `admin`)

---

## 🛑 การปิดเซิร์ฟเวอร์อย่างปลอดภัย (Safe Shutdown)
ดับเบิลคลิกไฟล์ **`3_Stop_Server.bat`**
- ระบบจะปิดเกมเซิร์ฟเวอร์
- สั่ง `mysqladmin shutdown` เพื่อ Flush ข้อมูลจาก Buffer Pool ลงในไฟล์ดิสก์อย่างสมบูรณ์ ป้องกันข้อมูลสูญหายหรือไฟล์ฐานข้อมูลเสียหาย

---

## 🎮 ข้อมูลการเชื่อมต่อไคลเอนต์ (Client Connection)

- **IP:** `127.0.0.1` (เปลี่ยนเป็น LAN/VPN IP ได้ใน `server.properties` และ `Client_Patch_Files/launcher.ini`)
- **Login Port:** `8484`
- **API Port:** `8483`
- **Game Version:** v265.3 (SwordieMS architecture)
- **World:** Scania (World ID 19)

---

## 🛠️ การแก้ไขซอร์สโค้ดในโฟลเดอร์ `src\`
หากมีการพัฒนาหรือแก้ไขโค้ด Java ในโฟลเดอร์ `src\`:
1. บันทึกไฟล์โค้ด
2. ดับเบิลคลิก **`2_Build_Server.bat`**
3. ระบบจะเรียกใช้ Portable Maven + Portable JDK 21 ภายในโฟลเดอร์ และอัปเดตไฟล์ `maplestory.jar` ให้ทันที
