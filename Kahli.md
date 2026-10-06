# คู่มือรหัสไอเทมและข้อมูลอาชีพ Khali (Kahli) — MapleStory v265

เอกสารรวบรวมรหัสไอดีไอเทม (Item IDs), อาวุธ, อุปกรณ์สวมใส่, ทรงผม/ใบหน้า, แคชไอเทม ตลอดจนแนวทางการแก้ไขโค้ดสำหรับอาชีพ **Khali (High Flora Thief)** ดึงข้อมูลโดยตรงจากโครงสร้างดาต้าเบส **v265 (`dat265`)** ของเซิร์ฟเวอร์

---

## 📌 ข้อมูลพื้นฐานของอาชีพ (Job Overview)

* **สายอาชีพ:** High Flora — Thief (โจรเผ่าไฮฟลอร่า)
* **สเตตัสหลัก (Main Stat):** LUK
* **สเตตัสรอง (Secondary Stat):** DEX
* **อาวุธหลัก (Primary Weapon):** Chakram (ชาครัม / กงจักรคู่) — Prefix: `1404xxx`
* **อาวุธรอง (Secondary Weapon):** Hex Seeker (เฮกซ์ซีเกอร์) — Prefix: `135403x`
* **รหัสสายอาชีพ (Job IDs):**
  * `15003`: Khali (Beginner)
  * `15400`: Khali (1st Job)
  * `15410`: Khali (2nd Job)
  * `15411`: Khali (3rd Job)
  * `15412`: Khali (4th Job)

---

## ⚔️ 1. อาวุธหลัก (Primary Weapon: Chakram) — Prefix `1404xxx`

สามารถใช้คำสั่ง GM เสกไอเทมเข้ากระเป๋าได้ทันที เช่น `!item 1404018`

| Item ID | ชื่อไอเทม | เลเวล | เซ็ต / แหล่งที่มา |
| :---: | :--- | :---: | :--- |
| **`1404000`** | **Eneth Canis** | 10 | อาวุธเริ่มต้น (Starter Weapon) |
| **`1404001`** | **Fellum Aquila** | 30 | อาวุธเลเวล 30 |
| **`1404002`** | **Obsidic Corvus** | 50 | อาวุธเลเวล 50 |
| **`1404003`** | **Rupesh Lacerta** | 60 | อาวุธเลเวล 60 |
| **`1404004`** | **Damascus Equus** | 70 | อาวุธเลเวล 70 |
| **`1404005`** | **Jafir Phasis** | 80 | อาวุธเลเวล 80 |
| **`1404006`** | **Acimic Capra** | 90 | อาวุธเลเวล 90 |
| **`1404007`** | **Cruso Apus** | 100 | อาวุธเลเวล 100 |
| **`1404020`** | **Onyx Maple Kshama** | 100 | อีเวนต์ Onyx Maple |
| **`1404023`** | **Frozen Kshama** | 100 | อีเวนต์ Frozen Set |
| **`1404008`** | **Dragon Ursa** | 110 | Dragon Weapon |
| **`1404009`** | **Zakum's Poisonic Zehar** | 110 | บอส Zakum |
| **`1404010`** | **Briser Taurus** | 120 | อาวุธเลเวล 120 |
| **`1404011`** | **Necro Chakram** | 120 | บอส Hilla (Necro Set) |
| **`1404012`** | **Jaihin Lupus** | 130 | อาวุธเลเวล 130 |
| **`1404013`** | **Royal Von Leon Chakram** | 130 | บอส Von Leon |
| **`1404014`** | **Utgard Cetus** | 140 | เซ็ต Pensalir / Utgard |
| **`1404015`** | **Raven Horn Chakram** | 140 | บอส Cygnus (Empress Set) |
| **`1404019`** | **Meister Hydra** | 145 | การสร้าง Meister Crafting |
| **`1404016`** | **Fafnir Chakram** | 150 | เซ็ต Root Abyss (CRA) |
| **`1404036`** | **Commerci Chakram** | 150 | เซ็ต Commerci |
| **`1404017`** | **AbsoLab Chakram** | 160 | เซ็ต AbsoLab (Lotus / Damien) |
| **`1404037`** | **Sweetwater Chakram** | 160 | เซ็ต Sweetwater |
| **`1404038`** | **Terminus Chakram** | 160 | อาวุธ Terminus |
| **`1404018`** | **Arcane Umbra Chakram** | 200 | เซ็ต Arcane Umbra (Lucid / Will) |
| **`1404021`** | **Sealed Genesis Eclipse** | 200 | Genesis Chakram (ยังไม่ปลดผนึก) |
| **`1404022`** | **Genesis Eclipse** | 200 | Genesis Chakram (ปลดผนึกสมบูรณ์) |
| **`1404046`** | **Destiny Chakram** | 250 | อาวุธเซ็ต Destiny |

---

## 🔮 2. อาวุธรอง (Secondary Weapon: Hex Seeker) — Prefix `135403x`

| Item ID | ชื่อไอเทม | เลเวล | คลาส / รายละเอียด |
| :---: | :--- | :---: | :--- |
| **`1354030`** | **Plain Hex Seeker** | 10 | อาวุธรองเริ่มต้น (1st Job) |
| **`1354031`** | **Bright Hex Seeker** | 30 | อาวุธรองคลาส 2 (2nd Job) |
| **`1354032`** | **Brilliant Hex Seeker** | 60 | อาวุธรองคลาส 3 (3rd Job) |
| **`1354033`** | **Infinite Hex Seeker** | 100 | อาวุธรองคลาส 4 (4th Job) |
| **`1354034`** | **Frozen Infinite Hex Seeker** | 100 | อาวุธรองเซ็ต Frozen |
| **`1354035`** | **Onyx Maple Infinite Hex Seeker** | 100 | อาวุธรองเซ็ต Onyx Maple |
| **`1354036`** | **Evolving Infinite Hex Seeker** | 105 | อาวุธรองเซ็ต Evolving |
| **`1354037`** | **Princess No's Immortal Hex Seeker** | 140 | อาวุธรองบอส Princess No (Best in Slot) |

---

## 🛡️ 3. ตราสัญลักษณ์ (Emblem)

| Item ID | ชื่อไอเทม | เลเวล | รายละเอียด |
| :---: | :--- | :---: | :--- |
| **`1190562`** | **Silver Chaser Emblem** | 60 | ตราประจำอาชีพขั้นเงิน |
| **`1190563`** | **Gold Chaser Emblem** | 100 | ตราประจำอาชีพขั้นทอง |
| **`1190558`** | **Mitra's Rage: Thief** | 200 | ตรา Seren ประจำสายโจร (รวมถึง Khali) |
| **`2635634`** | **Khali Emblem Coupon** | - | คูปองแลกรับ Emblem ของ Khali |

---

## 👗 4. เครื่องแต่งกายและแฟชั่นประจำตัว (Outfits & Equipment)

| Item ID | ชื่อไอเทม | ประเภท | รายละเอียด |
| :---: | :--- | :---: | :--- |
| **`1006150`** | **Khali's Head Decoration** | หมวก (Hat) | เครื่องประดับศีรษะตอนสร้างตัวละคร |
| **`1006182`** | **Khali's Head Decoration** | หมวก (Hat) | เครื่องประดับศีรษะแบบทางเลือก |
| **`1053943`** | **Ypsilon Zealot Uniform** | ชุด (Outfit) | ชุดเครื่องแบบตอนสร้างตัวละคร |
| **`1073717`** | **Ypsilon Zealot Shoes** | รองเท้า (Shoes) | รองเท้าตอนสร้างตัวละคร |
| **`1050685`** | **Khali's Clothes** | ชุด (Outfit) | ชุดเริ่มต้น Khali |
| **`1051758`** | **Khali's Clothes** | ชุด (Outfit) | ชุดเริ่มต้น Khali |
| **`1073727`** | **Khali's Shoes** | รองเท้า (Shoes) | รองเท้าเริ่มต้น Khali |
| **`1103563`** | **Khali's Scarf** | ผ้าคลุม (Cape) | ผ้าพันคอ Khali |
| **`1703321`** | **Ypsilon Zealot Chakram** | อาวุธแคช (Cash Weapon) | สกินอาวุธ Chakram สวมใส่ได้ทุกอาวุธ |

---

## 💇 5. ใบหน้าและทรงผมเริ่มต้น (Face & Hair)

### ใบหน้า (Face)
* **ตัวละครชาย:** `53470` (*Khali Face*)
* **ตัวละครหญิง:** `54490` (*Khali Face*)
* *รหัสสีตาอื่นๆ:*
  * ชาย: `53070` (ดำ), `53170` (น้ำเงิน), `53270` (แดง), `53370` (เขียว), `53470` (น้ำตาล), `53570` (ม่วง), `53670` (ส้ม), `53770` (ฟ้า), `53870` (เหลือง)
  * หญิง: `54090` (ดำ), `54190` (น้ำเงิน), `54290` (แดง), `54390` (เขียว), `54490` (น้ำตาล), `54590` (ม่วง), `54690` (ส้ม), `54790` (ฟ้า), `54890` (เหลือง)

### ทรงผม (Hair: Secret Bobbed Hair)
* **ตัวละครชาย:** `60944` (รหัสเฉดสีตามลำดับ `60940` - `60947`)
* **ตัวละครหญิง:** `64294` (รหัสเฉดสีตามลำดับ `64290` - `64297`)

---

## 🐾 6. สัตว์เลี้ยง, ดาเมจสกิน, แหวน และของสะสม (Pet & Cash Items)

| Item ID | ชื่อไอเทม | รายละเอียด |
| :---: | :--- | :--- |
| **`5002546`** | **Lil Khali** | สัตว์เลี้ยงมินิ Khali (Pet) |
| **`2635614`** | **Lil Khali Pet Package** | กล่องแพ็กเกจสัตว์เลี้ยง Lil Khali |
| **`1802959`** | **Lil Khali's Chakram** | อุปกรณ์สวมใส่สำหรับสัตว์เลี้ยง Lil Khali |
| **`2635632`** | **Khali Damage Skin** | สกินตัวเลขดาเมจ Khali |
| **`2635633`** | **Khali Damage Skin (Unit)** | สกินตัวเลขดาเมจ Khali (แสดงหน่วยตัวเลข) |
| **`1115274`** | **Khali Chat Ring** | แหวนกรอบข้อความแชท Khali |
| **`1115376`** | **Khali Label Ring** | แหวนป้ายชื่อตัวละคร Khali |
| **`2635630`** | **Khali Label Ring Coupon** | คูปองแลกรับแหวนป้ายชื่อ |
| **`2635631`** | **Khali Chat Ring Coupon** | คูปองแลกรับแหวนกรอบแชท |
| **`5010259`** | **Khali Emblem** | ฉายาเกียรติยศ / เหรียญ Medal |
| **`5010263`** | **World's Best Khali** | เหรียญฉายาอันดับหนึ่ง Khali |

---

## 💡 7. คำสั่งเสกไอเทมสำหรับ Admin / GM (Cheat Commands)

สามารถพิมพ์คำสั่งในช่องแชทเกมได้ทันที:

```text
!item <Item ID> [จำนวน]
```

**ตัวอย่างคำสั่งยอดนิยม:**
* เสก Arcane Chakram: `!item 1404018 1`
* เสก Genesis Chakram: `!item 1404022 1`
* เสก อาวุธรอง Princess No: `!item 1354037 1`
* เสก ตราสัญลักษณ์ทอง: `!item 1190563 1`
* เสก สัตว์เลี้ยง Lil Khali: `!item 5002546 1`
* เสก ดาเมจสกิน Khali: `!item 2635633 1`
* เสก คอสตูมอาวุธแคช: `!item 1703321 1`

---

## 🛠️ 8. หมายเหตุสำหรับผู้พัฒนาเซิร์ฟเวอร์ (`Khali.java`)

ในซอร์สโค้ดไฟล์:  
[`net/swordie/ms/client/jobs/flora/Khali.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/flora/Khali.java#L174-L189)

ฟังก์ชัน `addItemToNewCharacter` มีการฮาร์ดโค้ดไอเทมเริ่มต้นผิดพลาด (คัดลอกมาจากอาชีพอื่น):
```java
// เดิมในโค้ด:
Item secondary = ItemData.getItemDeepCopy(1354040); // 1354040 คือ Imugi Gem ของ Lara
Item weapon = ItemData.getItemDeepCopy(1292000);    // 1292000 คือพัด Ritual Fan ของ HoYoung
```

**ค่าที่ถูกต้องของ Khali ควรแก้ไขเป็น:**
```java
// แนะนำให้เปลี่ยนเป็น:
Item secondary = ItemData.getItemDeepCopy(1354030); // Plain Hex Seeker (อาวุธรอง Khali Lv.10)
Item weapon = ItemData.getItemDeepCopy(1404000);    // Eneth Canis (ชาครัมเริ่มต้น Lv.10)
```


