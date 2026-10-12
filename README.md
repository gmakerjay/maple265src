# MapleStory Server v265 (SwordieMS Core)

เซิร์ฟเวอร์จำลอง MapleStory v265.3 พัฒนาด้วยภาษา **Java 21** ร่วมกับ **Portable MariaDB 10.11.8** และ **Apache Maven 3.9.15** รองรับไคลเอนต์ MapleStory v265 (64-bit AMD64) เต็มรูปแบบ

---

## 🌟 ข้อมูลทางเทคนิคและสถาปัตยกรรม (Technical Specifications)

- **Language Runtime**: OpenJDK 21 (Adoptium Temurin 64-bit)
- **Build System**: Apache Maven 3.9.15 (Single Fat JAR Assembly ~138.64 MB)
- **Network Framework**: Netty (NIO Transport)
- **Database Engine**: MariaDB 10.11.8 Portable (พอร์ต `33066`, HikariCP Connection Pool)
- **Scripting Engine**: Python 2.7.2 (Jython Integration for NPCs, Bosses, Portals, Reactors)
- **Target Distribution**: [`Server263/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263)

---

## 🚀 ฟังก์ชันหลักที่ได้รับการพัฒนาและปรับปรุงสมบูรณ์

1. **6th Job HEXA Matrix System**:
   - รองรับสกิล Origin และ HEXA Masteries ครบทุกอาชีพ (40+ คลาส)
   - สถานะอมตะ `CharacterTemporaryStat.IndieNotDamaged` พร้อมคัทซีนปาร์ตี้ `UserLocal.showHexaSkillEff`
   - เมคานิกสตันเด็ดขาด `MobStat.Freeze` (10 วินาที) และ `MobStat.OriginDebuff` (20 วินาที)
   - ปลดล็อคระบบ Sol Erda Energy และ Sol Erda Fragments

2. **Universal Boss System (ระบบบอส 129 รายการ)**:
   - สถาปัตยกรรม [`BossEntry.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/BossEntry.java) ปลดล็อคการเข้าบอสแบบอิสระ ไม่จำกัดรอบ (Infinite Runs)
   - เข้าผ่าน Boss UI / Content Guide หรือแท่นบูชาหน้าห้องบอสได้ตลอด 24 ชั่วโมง
   - ปลดล็อคเควสต์เข้าบอสทั้งหมดอัตโนมัติเมื่อตั้งค่า `server.bossUnlockPrequests=true`
   - ครอบคลุมบอสระดับสูง: Kalos, Karing, Seren, Limbo, Black Mage, Demian, Lucid, Will, Slime, Root Abyss (Pierre, Von Bon, Queen, Vellum ทั้ง Normal และ Chaos)

3. **Multi-Network Routing & Dynamic Channel IP**:
   - `NettyClient.getEffectiveChannelIp()` สลับ IP แชนแนลอัตโนมัติสำหรับ Local loopback (`127.0.0.1`) และ Remote network (LAN / Radmin VPN / Hamachi)
   - `Localhost.dll` โหลด IP จาก `launcher.ini` โดยอัตโนมัติ

4. **Zero-Install Account Tools & Auto-Register**:
   - ระบบสมัครไอดีอัตโนมัติเมื่อเข้าเกมครั้งแรก (`server.autoRegister=true`)
   - สคริปต์จัดการไอดีแบบไม่ต้องเปิดดูฐานข้อมูล: [`Create_Account.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/Create_Account.bat)

---

## 🛠️ การคอมไพล์โปรเจกต์ (Build & Deploy)

รันคำสั่ง Maven ผ่านชุด Portable ภายในโฟลเดอร์:
```powershell
.\apache-maven-3.9.15\bin\mvn.cmd clean package -DskipTests
```
หรือดับเบิลคลิก [`2_Build_Server.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/2_Build_Server.bat) เพื่อสร้าง `maplestory-219.5-jar-with-dependencies.jar` และอัปเดตไฟล์ไปยัง `Server263/maplestory.jar` อัตโนมัติ