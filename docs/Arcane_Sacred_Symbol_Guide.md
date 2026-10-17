# คู่มือระบบ Arcane & Sacred Symbol และการปลดล็อคเควสต์ (Arcane & Sacred Symbol Unlock Guide)

เอกสารสรุปสถาปัตยกรรม, สถานะการทำงานของเควสต์, การปลดล็อคช่องแม่กุญแจ (Lock Slots), และแนวทางการตอบผู้เล่นสำหรับระบบ **Arcane Symbol** และ **Sacred Symbol** ประจำเซิร์ฟเวอร์ **MapleStory Server Runner v265**

---

## 1. บทสรุปสถานะระบบ (Executive Summary)

| ระบบ | สถานะการทำงาน | สคริปต์เควสต์ | การปลดล็อคช่อง (Slots) | ระบบข้ามเนื้อเรื่อง (Skip) |
| :--- | :---: | :---: | :---: | :---: |
| **Arcane Symbol (Arcane River)** | **สมบูรณ์ 100%** | มีครบทั้ง 6 เมือง | ปลดล็อคตามเควสต์สำเร็จ | **มีปุ่ม Skip ทุกเมือง (1 วินาที)** |
| **Sacred Symbol (Grandis)** | **ระบบคำนวณสมบูรณ์ 100%** | ยังไม่มีสคริปต์เนื้อเรื่อง | ปลดล็อคผ่าน Quest Record / GM / คูปอง | ปลดผ่านระบบ Admin / NPC |

> [!NOTE]
> **ข้อเท็จจริงสำคัญ:** เควสต์ Arcane River ไม่ได้มีบั๊กและทำงานได้ 100% ครบทุกเมือง สาเหตุที่ผู้เล่นแจ้งว่า *"ไม่มีเควสให้ทำแล้ว"* เกิดจากกลไกของเกม MapleStory ที่ออกแบบเควสต์แม่น้ำ Arcane River ให้เป็น **เควสต์ประจำพื้นที่ (Map / Area Trigger)** ไม่ใช่เควสต์หลอดไฟ (Lightbulb) ที่จะเด้งขึ้นมากลางจอเมื่อยืนอยู่ในเมืองทั่วไป

---

## 2. โครงสร้างทางเทคนิคของหน้าต่าง Symbol UI

ในหน้าต่างสวมใส่อุปกรณ์ (Equipment Inventory - `UIEquip.img.xml`) ระบบแบ่งออกเป็น 2 แท็บหลัก:

```
[ EQUIP ] [ CASH ] [ PET ] [ ARCANE ] [ SACRED ]
```

### 2.1 แถบ ARCANE (Arcane Equipment)
- **ตำแหน่งช่องในระบบ (BodyPart):** `ArcBase` (`1600`) ถึง `ArcEnd` (`1606`)
- **การแสดงผลในไคลเอนต์:** มีทั้งหมด 6 ช่องเรียงตามลำดับพื้นที่:
  1. ช่องที่ 0 (บนซ้าย): **Vanishing Journey** (`slot: -1600`, Item: `1712001`)
  2. ช่องที่ 1 (บนกลาง): **Chu Chu Island** (`slot: -1601`, Item: `1712002`)
  3. ช่องที่ 2 (บนขวา): **Lachelein** (`slot: -1602`, Item: `1712003`)
  4. ช่องที่ 3 (ล่างซ้าย): **Arcana** (`slot: -1603`, Item: `1712004`)
  5. ช่องที่ 4 (ล่างกลาง): **Morass** (`slot: -1604`, Item: `1712005`)
  6. ช่องที่ 5 (ล่างขวา): **Esfera** (`slot: -1605`, Item: `1712006`)
- **กลไกแม่กุญแจ (`disablebox` / `canvas:slotCover`):** ไคลเอนต์จะแสดงภาพแม่กุญแจครอบช่องไว้จนกว่าตัวละครจะสำเร็จเควสต์ปลดประจำพื้นที่นั้นๆ

### 2.2 แถบ SACRED (Sacred / Authentic Equipment)
- **ตำแหน่งช่องในระบบ (BodyPart):** `AUSBase` (`1700`) ถึง `AUSEnd` (`1706`)
- **การแสดงผลในไคลเอนต์:** มีทั้งหมด 6 ช่องเรียงตามลำดับพื้นที่ Grandis:
  1. ช่องที่ 0: **Cernium** (`slot: -1700`, Item: `1713000`)
  2. ช่องที่ 1: **Hotel Arcus** (`slot: -1701`, Item: `1713001`)
  3. ช่องที่ 2: **Odium** (`slot: -1702`, Item: `1713002`)
  4. ช่องที่ 3: **Shangri-La** (`slot: -1703`, Item: `1713003`)
  5. ช่องที่ 4: **Arteria** (`slot: -1704`, Item: `1713004`)
  6. ช่องที่ 5: **Carcion** (`slot: -1705`, Item: `1713005`)

---

## 3. รายละเอียดเควสต์ Arcane River ทั้ง 6 ดินแดน (Arcane River Prequests)

ทุกเมืองในเซิร์ฟเวอร์ของเราถูกออกแบบให้มีสคริปต์ **Fast-Track Skip Option** ให้ผู้เล่นเลือกได้ทันทีตั้งแต่บทสนทนาแรก:

### 3.1 ดินแดนที่ 1: Vanishing Journey (ทะเลสาบแห่งการลืมเลือน)
- **เลเวลขั้นต่ำ:** Lv. 200 (ผ่านคลาส 5 เควสต์ `1465`)
- **NPC เริ่มต้น:** Kao (`3003131`)
- **แมพเริ่มต้น:** `450000000` (ทะเลสาบแห่งการลืมเลือน)
- **รหัสเควสต์:** `34100` (`q34100s.py`) ถึง `34120` (`q34120s.py`)
- **สิทธิ์การข้าม:** คุยกับ Kao เลือก `#rSkip the prequests and receive your Arcane Symbol immediately#k`
- **ผลลัพธ์:** ปลดล็อคช่อง 1 + ได้รับ `Arcane Symbol: Vanishing Journey` (`1712001`) x1

### 3.2 ดินแดนที่ 2: Chu Chu Island (เกาะชูชู)
- **เลเวลขั้นต่ำ:** Lv. 210
- **จุดเริ่มต้นเควสต์:** เดินไปสุดทางของ Vanishing Journey แมพ **Cave of Repose (ถ้ำแห่งการพักผ่อน)** แล้วกระโดดลงน้ำตกเข้าสู่แมพ `450002021` / `450002200`
- **NPC เริ่มต้น:** Muto / Master Lyck (`3003156`)
- **รหัสเควสต์:** `34200` (`q34200s.py`) ถึง `34218` (`q34218s.py`)
- **สิทธิ์การข้าม:** เมื่อเข้าแมพเควสต์จะเด้งขึ้นมา เลือก `#rSkip the prequests and receive your Arcane Symbol immediately#k`
- **ผลลัพธ์:** สำเร็จเควสต์ `34200-34218` + ปลดล็อคช่อง 2 + ได้รับ `Arcane Symbol: Chu Chu Island` (`1712002`) x1

### 3.3 ดินแดนที่ 3: Lachelein (นครแห่งความฝันราเชเลน)
- **เลเวลขั้นต่ำ:** Lv. 220
- **จุดเริ่มต้นเควสต์:** คุยกับปลากระเบน Flying Fish ที่ท่าเรือ Chu Chu Island เพื่อบินข้ามไปยังเมือง Lachelein (`450003000`)
- **รหัสเควสต์:** `34300` (`q34300s.py`) ถึง `34331`
- **สิทธิ์การข้าม:** เมื่อถึงเมือง เควสต์ `34300` จะเริ่มอัตโนมัติ เลือก `#rSkip the prequests and receive your Arcane Symbol immediately#k`
- **ผลลัพธ์:** สำเร็จเควสต์ `34300-34331` + ปลดล็อคช่อง 3 + ได้รับ `Arcane Symbol: Lachelein` (`1712003`) x1

### 3.4 ดินแดนที่ 4: Arcana (ป่าแห่งวิญญาณอาร์คานา)
- **เลเวลขั้นต่ำ:** Lv. 225
- **จุดเริ่มต้นเควสต์:** เดินลงไปทางคลองระบายน้ำท้ายเมือง Lachelein
- **รหัสเควสต์:** `34450` (`q34450s.py`) ถึง `34478`
- **สิทธิ์การข้าม:** เควสต์ `34450` จะเริ่มอัตโนมัติ เลือก `#rSkip the prequests and receive your Arcane Symbol immediately#k`
- **ผลลัพธ์:** สำเร็จเควสต์ `34450-34478` + ปลดล็อคช่อง 4 + ได้รับ `Arcane Symbol: Arcana` (`1712004`) x1

### 3.5 ดินแดนที่ 5: Morass (บึงโคลนความทรงจำโมราส)
- **เลเวลขั้นต่ำ:** Lv. 230
- **จุดเริ่มต้นเควสต์:** คุยกับปลากระเบน Flying Fish (`3003409`) ในป่า Arcana
- **รหัสเควสต์:** `34249` (`q34249s.py`) ถึง `34272`
- **สิทธิ์การข้าม:** เควสต์ `34249` เริ่มต้นขึ้น เลือก `#rSkip the prequests and receive your Arcane Symbol immediately#k`
- **ผลลัพธ์:** สำเร็จเควสต์ `34249-34272` + ปลดล็อคช่อง 5 + ได้รับ `Arcane Symbol: Morass` (`1712005`) x1

### 3.6 ดินแดนที่ 6: Esfera (ทะเลต้นกำเนิดเอสเฟอรา)
- **เลเวลขั้นต่ำ:** Lv. 235
- **จุดเริ่มต้นเควสต์:** คุยกับ Jean (`3003406`) ที่ Trueffet ใน Morass
- **รหัสเควสต์:** `34561` (`q34561s.py`) ถึง `37871`
- **สิทธิ์การข้าม:** เควสต์ `34561` เริ่มต้นขึ้น เลือก `#rSkip the prequests and receive your Arcane Symbol immediately#k`
- **ผลลัพธ์:** สำเร็จเควสต์ `34561-37871` + ปลดล็อคช่อง 6 + ได้รับ `Arcane Symbol: Esfera` (`1712006`) x1

---

## 4. สถานะและกลไกของ Sacred Symbol (Grandis)

1. **สถาปัตยกรรมภายในเซิร์ฟเวอร์:**
   - เซิร์ฟเวอร์รองรับ Authentic / Sacred Force (AUT) สมบูรณ์แบบ 100% ใน [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java), [`ItemConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java), และ [`ItemHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemHandler.java)
   - สัญลักษณ์แต่ละชิ้นมอบสแตทพื้นฐาน +500 Main Stat (Demon Avenger +10,500 HP, Xenon All Stat +240)
2. **รหัสเควสต์ที่ไคลเอนต์ใช้ตรวจสอบการปลดล็อคช่อง:**
   - Cernium (Lv. 260): Quest `1484` (A Divine Power)
   - Hotel Arcus (Lv. 270): Quest `38120`
   - Odium (Lv. 275): Quest `38319`
   - Shangri-La (Lv. 275/280): Quest `38419`
   - Arteria (Lv. 280/285): Quest `38519`
   - Carcion (Lv. 285/290): Quest `38619`
3. **แนวทางการรับ Sacred Symbol ของผู้เล่นในปัจจุบัน:**
   - เนื่องจากเควสต์เนื้อเรื่อง Grandis ยังไม่มี Script วิ่งในเกม ผู้เล่นสามารถรับลูกแก้ว Sacred Symbol ผ่านคูปองกล่องสัญลักษณ์ หรือร้านค้า Admin/NPC
   - สามารถสวมใส่ลงในช่องได้เมื่อมีการสำเร็จ Quest Record ของดินแดนนั้นๆ

---

## 5. สคริปต์ข้อความสำหรับทีมงานนำไปตอบผู้เล่น (Player Support Message)

ทีมงานสามารถคัดลอกข้อความด้านล่างนี้ไปตอบผู้เล่นในช่องทางแชท / Ticket ได้ทันที:

```text
สวัสดีครับคุณผู้เล่น 🙏

สำหรับระบบ Arcane Symbol เควสต์ทำงานได้ปกติ 100% ทุกเมืองครับ!
สาเหตุที่ดูเหมือน "ไม่มีเควสให้ทำแล้ว" เพราะเควสต์เมืองต่อๆ ไปของ Arcane River จะไม่แสดงในหลอดไฟข้างจอตอนยืนอยู่ในเมืองทั่วไปครับ แต่เป็นเควสต์ประจำพื้นที่ (Area Trigger)

📌 วิธีปลดล็อค Arcane แต่ละช่อง:
1. เมื่อเลเวลถึงเกณฑ์ของเมืองถัดไป:
   - เกาะ Chu Chu Island: เลเวล 210
   - เมือง Lachelein: เลเวล 220
   - ป่า Arcana: เลเวล 225
   - บึง Morass: เลเวล 230
   - ทะเล Esfera: เลเวล 235
2. ให้เดินหรือวาร์ปไปยังทางเข้าของเมืองนั้นๆ เช่น:
   - เมือง Chu Chu: เดินไปท้ายแมพ Vanishing Journey (ถ้ำแห่งการพักผ่อน) แล้วกระโดดลงน้ำตก เควสต์จะเด้งขึ้นมาทันทีครับ
   - เมือง Lachelein: นั่งปลากระเบน Flying Fish จากเกาะ Chu Chu Island
3. เมื่อเควสต์เด้งขึ้นมา จะมีปุ่มตัวเลือกให้กด [Skip the prequests and receive your Arcane Symbol immediately]
   👉 สามารถกดข้ามเนื้อเรื่องเพื่อรับลูกแก้ว Symbol และปลดล็อคช่องแม่กุญแจได้ทันทีใน 1 วินาทีเลยครับ!

(ส่วนแท็บ Sacred Symbol ทางทีมงานกำลังเพิ่มระบบปลดล็อคด่วนผ่าน NPC ประจำเมืองให้เร็วๆ นี้ครับ)
```

---

## 6. สรุปคำสั่ง Admin / GM ที่เกี่ยวข้อง

| คำสั่ง | ประเภท | รายละเอียด |
| :--- | :---: | :--- |
| `!completequest <qid>` | Admin | สั่งสำเร็จเควสต์ทันที (เช่น `!completequest 34218` ปลด Chu Chu) |
| `!item <itemid>` | Admin | เสกลูกแก้ว Symbol เช่น `1712001` - `1712006`, `1713000` - `1713005` |
| `!warp <mapid>` | Admin / Player | วาร์ปไปยังดินแดน Arcane ต่างๆ (เช่น Chu Chu: `450002000`, Lachelein: `450003000`) |
