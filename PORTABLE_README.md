# คู่มือการใช้งานเซิร์ฟเวอร์ MapleStory (Portable Edition)

เซิร์ฟเวอร์นี้ได้รับการปรับปรุงและจัดเตรียมระบบให้เป็นแบบ **Portable (รันได้ทุกที่)** ไม่จำเป็นต้องติดตั้ง Java (JDK) หรือ Apache Maven ลงในระบบปฏิบัติการของเครื่องใหม่เลย เนื่องจากมีเครื่องมือทั้งหมดติดตั้งอยู่ภายในโฟลเดอร์โปรเจกต์นี้เรียบร้อยแล้ว

---

## 📁 สิ่งที่จัดเตรียมไว้ให้พร้อมภายในโฟลเดอร์

1. **`jdk21\`**: Java Development Kit 21 (Temurin Adoptium) สำหรับรันและคอมไพล์โค้ด
2. **`apache-maven-3.9.15\`**: ตัวจัดการ Build & Dependencies (Maven)
3. **`maplestory.jar`**: ไฟล์ JAR เซิร์ฟเวอร์ที่รวมไลบรารีครบทุกตัว (Fat JAR / Assembly) พร้อมรันได้ทันที
4. **`server.properties`**: ไฟล์ตั้งค่าเซิร์ฟเวอร์ (Database, IP, Port) ปรับเปลี่ยนได้ทันทีโดยไม่ต้อง Rebuild
5. **`backup.sql`**: ฐานข้อมูลเซิร์ฟเวอร์เวอร์ชันสมบูรณ์ (แก้ไข Error และ Column ซ้ำเรียบร้อยแล้ว)
6. **ตัวรันและเมนูจัดการแบบคลิกเดียว**:
   - `1_Start_Server.bat` : เริ่มรันเซิร์ฟเวอร์ MapleStory
   - `2_Build_Server.bat` : คอมไพล์และสร้าง `maplestory.jar` ใหม่เมื่อมีการแก้ไขซอร์สโค้ด
   - `3_Stop_Server.bat` : หยุดการทำงานของเซิร์ฟเวอร์และเคลียร์พอร์ต
   - `4_Server_Control_Panel.bat` : เมนูควบคุมรวม (Start / Restart / Stop / Build / Import DB / Config)
   - `Import_Database.bat` : นำเข้าฐานข้อมูล `backup.sql` เข้า MySQL อัตโนมัติ

---

## 🚀 ขั้นตอนการติดตั้งและเริ่มต้นใช้งาน (สำหรับผู้ใช้)

ผู้ใช้มีหน้าที่เพียง 2 ขั้นตอนเท่านั้น:

### ขั้นตอนที่ 1: ติดตั้ง MySQL / MariaDB และนำเข้าฐานข้อมูล
1. ติดตั้ง **MySQL Server 8.0** หรือ **MariaDB** (หรือใช้ XAMPP)
2. นำเข้าฐานข้อมูลโดยทำได้ 2 วิธี:
   - **วิธีง่าย (แนะนำ)**: ดับเบิลคลิกไฟล์ **`Import_Database.bat`** แล้วใส่รหัสผ่าน root ของ MySQL ตัวระบบจะสร้าง Database `vietmaple` และนำเข้าข้อมูลจาก `backup.sql` ให้อัตโนมัติ
   - **วิธีนำเข้าเอง**: สร้างฐานข้อมูลชื่อ `vietmaple` (utf8mb4) แล้วนำเข้าไฟล์ `backup.sql`

### ขั้นตอนที่ 2: ตรวจสอบและตั้งค่าไฟล์ `server.properties`
เปิดไฟล์ `server.properties` ด้วย Notepad:
```properties
# การเชื่อมต่อฐานข้อมูล
db.url=jdbc:mariadb://127.0.0.1:3306/vietmaple?allowMultiQueries=true&useSSL=false&serverTimezone=Asia/Bangkok
db.username=root
db.password=root

# IP สำหรับเชื่อมต่อ (Localhost ใช้ 127.0.0.1)
server.ip=127.0.0.1

# พอร์ตเซิร์ฟเวอร์
server.loginPort=8484
server.apiPort=8483
```
> **หมายเหตุ:** หากรหัสผ่าน MySQL ในเครื่องของคุณไม่ใช่ `root` (เช่น `123456`) ให้เปลี่ยนค่า `db.password` ให้ตรงกัน

### ขั้นตอนที่ 3: เปิดเซิร์ฟเวอร์
ดับเบิลคลิกไฟล์ **`1_Start_Server.bat`** (หรือเปิดผ่าน **`4_Server_Control_Panel.bat`**)

เมื่อเซิร์ฟเวอร์พร้อมใช้งาน หน้าต่างคอนโซลจะแสดงผล:
- `[World 19] Channel 1-10 listening on port 8585-8594`
- `Login listening on port 8484`
- `API listening on port 8483`
- `[WZ Data] Finished Loaded WZ data`

---

## 🎮 ข้อมูลการเชื่อมต่อไคลเอนต์ (Client Connection)

- **IP:** `127.0.0.1`
- **Login Port:** `8484`
- **Game Version:** v265.3 (SwordieMS architecture)
- **World:** Scania (World ID 19)

---

## 🛠️ การแก้ไขซอร์สโค้ดในโฟลเดอร์ `src\`
หากมีการพัฒนาหรือแก้ไขโค้ด Java ในโฟลเดอร์ `src\`:
1. บันทึกไฟล์โค้ด
2. ดับเบิลคลิก **`2_Build_Server.bat`**
3. ระบบจะเรียกใช้ Portable Maven + Portable JDK 21 ภายในโฟลเดอร์ และอัปเดตไฟล์ `maplestory.jar` ให้ทันที
