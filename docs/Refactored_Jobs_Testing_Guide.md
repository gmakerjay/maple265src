# 🎮 คู่มือการทดสอบสายอาชีพที่ได้รับการปรับปรุง & รีแฟกเตอร์ (MapleStory v265)

เอกสารนี้รวบรวมรายชื่อสายอาชีพที่ผ่านการ **Audit, Refactor, ทำความสะอาด Matrix UI (Zero Phantom Sub-Skill), ซิงค์คูลดาวน์ และรองรับคำสั่ง `!endgame` (Strict Zero Skill Injection)** พร้อมคำสั่งสำหรับทดสอบและขั้นตอนการตรวจสอบอย่างละเอียด

---

## 📑 สารบัญ
1. [มาตรฐานและกฎเหล็กการทดสอบ (Core Testing Standards)](#1-มาตรฐานและกฎเหล็กการทดสอบ-core-testing-standards)
2. [ขั้นตอนการทดสอบทีละสเต็ป (Step-by-Step Testing Workflow)](#2-ขั้นตอนการทดสอบทีละสเต็ป-step-by-step-testing-workflow)
3. [ตารางสรุปคำสั่งบูสต์อาชีพทั้งหมด (!endgame <job>)](#3-ตารางสรุปคำสั่งบูสต์อาชีพทั้งหมด-endgame-job)
4. [รายละเอียดการทดสอบแยกตามกลุ่มอาชีพ](#4-รายละเอียดการทดสอบแยกตามกลุ่มอาชีพ)
   - [กลุ่มที่ 1: Resistance (Blaster, Battle Mage)](#กลุ่มที่-1-resistance-blaster-battle-mage)
   - [กลุ่มที่ 2: Nova (Angelic Buster, Kain, Cadena, Kaiser)](#กลุ่มที่-2-nova-angelic-buster-kain-cadena-kaiser)
   - [กลุ่มที่ 3: Flora & Anima (Khali, Adele, Lara, Hoyoung, Ren)](#กลุ่มที่-3-flora--anima-khali-adele-lara-hoyoung-ren)
   - [กลุ่มที่ 4: Explorer Warriors (Hero, Paladin, Dark Knight)](#กลุ่มที่-4-explorer-warriors-hero-paladin-dark-knight)
5. [คำสั่งช่วยเหลือพิเศษสำหรับ Admin & Testing](#5-คำสั่งช่วยเหลือพิเศษสำหรับ-admin--testing)

---

## 1. มาตรฐานและกฎเหล็กการทดสอบ (Core Testing Standards)

เพื่อให้การทดสอบตรงกับโครงสร้างจริงของเกมและป้องกันการเกิดบัค:
1. **Strict Zero Skill Injection Policy**:
   - คำสั่ง `!endgame` **จะไม่ทำการยัด/ฉีดเลเวลสกิลลงในตัวละครเด็ดขาด**
   - ผู้เล่นจะได้รับเลเวล 260, ค่า AP 1,250, และแต้ม SP เต็มพิกัดผ่าน `ExtendSP` สำหรับคลาส 1–4
   - ผู้เล่นต้องเป็นผู้จัดสรรแต้ม SP และเปิดกล่อง V-Matrix / Hexa Matrix ด้วยตนเองตามกลไกธรรมชาติของเกม
2. **Zero Phantom Sub-Skill Policy**:
   - เมื่อเปิดหน้าต่างสกิล (ปุ่ม **K**) หรือหน้าต่าง V-Matrix จะต้อง **ไม่มีไอคอนสกิลย่อยขยะ, ไม่มีปุ่มกากบาทสีแดง, และไม่มีโหนด Dummy โผล่ขึ้นมา**
3. **Cooldown & Condition Integrity**:
   - สกิลที่มีคูลดาวน์ร่วม หรือท่าต่อเนื่อง (Origin Skill 360 วินาที, Ascent Skill, ท่าปิดท้าย) จะต้องซิงค์คูลดาวน์ตรงกัน 100% บล็อกการกดสแปม 0 วินาที

---

## 2. ขั้นตอนการทดสอบทีละสเต็ป (Step-by-Step Testing Workflow)

### สเต็ปที่ 1: เปลี่ยนอาชีพและรับชุดไอเทมตั้งต้น
พิมพ์คำสั่งในช่องแชท:
```text
!endgame <ชื่ออาชีพ>
```
*ตัวอย่าง*: `!endgame blaster` หรือ `!endgame battlemage` หรือ `!endgame ab` หรือ `!endgame kain`
- ตัวละครจะเปลี่ยนอาชีพและเลเวลปรับเป็น 260 ทันที
- เควสต์คลาส 5 (1460–1466) และคลาส 6 (1488) สำเร็จอัตโนมัติ
- ได้รับอาวุธ Arcane Umbra, Princess No Secondary, Mitra's Emblem, และชุดเกราะตรงสาย
- ได้รับ 10,000,000,000 Mesos, Nodestones x3,000, Exp Nodestones x20, Sol Erda Energy x1,000, Sol Erda Fragments x30,000

### สเต็ปที่ 2: รับสุดยอดบัฟ 2 ชั่วโมงเต็ม
พิมพ์คำสั่ง:
```text
!buffall
```
*(หรือสำหรับผู้เล่นทั่วไปพิมพ์ `@buff` หรือคลิก NPC Maple Admin เลือก [Super Buff All (2 Hours)])*
- ได้รับ 20+ บัฟระดับท็อป: โบนัส EXP +55%, อัตราดรอป +44%, ATT +260+, Boss Damage +50%, IED +50%, Speed +2 Stages

### สเต็ปที่ 3: จัดสรรแต้ม SP (คลาส 1–4)
- กดปุ่ม **K** เพื่อเปิดหน้าต่างสกิล
- อัปแต้มสกิลคลาส 1 ถึงคลาส 4 ให้เต็มตามต้องการ
- **จุดสังเกต**: ต้องไม่มีปุ่มกากบาทแดง และไม่มีไอคอนสกิลที่คลิกไม่ได้

### สเต็ปที่ 4: เปิดใช้งาน V-Matrix และ HEXA Matrix (คลาส 5–6)
- เปิดกระเป๋าช่อง **USE**: ดับเบิ้ลคลิกเปิดหิน **Nodestones** เพื่อรับโหนดสกิล V-Matrix
- นำหินสกิลไปติดตั้งในหน้าต่าง V-Matrix
- ไปที่หน้าต่าง **HEXA Matrix**: ใช้ **Sol Erda Energy** และ **Sol Erda Fragments** ปลดล็อกแกน Hexa Skill และ Origin Skill

### สเต็ปที่ 5: ทดสอบการต่อสู้และคูลดาวน์
- ทดสอบสกิลโจมตีหลัก, การสะสมเกจเฉพาะอาชีพ
- ทดสอบกด **Origin Skill**:
  - จะต้องได้รับสถานะอมตะ 7 วินาที (`IndieNotDamaged`)
  - คัทซีนปาร์ตี้แสดงผลเต็มหน้าจอ
  - มอนสเตอร์ที่โดนตีติดสถานะ Absolute Bind Freeze (10 วินาที) และ OriginDebuff (20 วินาที)
  - ติดคูลดาวน์ 360 วินาทีเต็ม และท่าย่อยไม่สามารถกดสแปมได้

---

## 3. ตารางสรุปคำสั่งบูสต์อาชีพทั้งหมด (!endgame <job>)

| กลุ่มอาชีพ | ชื่ออาชีพ | คำสั่งบูสต์ (`!endgame <job>`) | Job ID | อาวุธ BiS ที่ได้รับ |
| :--- | :--- | :--- | :--- | :--- |
| **Resistance** | **Blaster** | `!endgame blaster` | 3712 | Arcane Umbra Ellaha (`1582023`) |
| **Resistance** | **Battle Mage** | `!endgame battlemage` หรือ `!endgame bam` | 3212 | Arcane Umbra Staff (`1382265`) |
| **Resistance** | **Wild Hunter** | `!endgame wildhunter` หรือ `!endgame wh` | 3312 | Arcane Umbra Crossbow (`1522143`) |
| **Resistance** | **Mechanic** | `!endgame mechanic` หรือ `!endgame mech` | 3512 | Arcane Umbra Gun (`1492236`) |
| **Resistance** | **Xenon** | `!endgame xenon` | 3612 | Arcane Umbra Energy Sword (`1242121`) |
| **Nova** | **Angelic Buster** | `!endgame angelicbuster` หรือ `!endgame ab` | 6512 | Arcane Umbra Soul Shooter (`1222113`) |
| **Nova** | **Kain** | `!endgame kain` | 6312 | Arcane Umbra Breath Shooter (`1292023`) |
| **Nova** | **Cadena** | `!endgame cadena` | 6412 | Arcane Umbra Chain (`1272017`) |
| **Nova** | **Kaiser** | `!endgame kaiser` | 6112 | Arcane Umbra Two-Handed Sword (`1402259`) |
| **Flora** | **Khali** | `!endgame khali` | 15412 | Arcane Umbra Chakram (`1262024`) |
| **Flora** | **Adele** | `!endgame adele` | 15112 | Arcane Umbra Bladecaster (`1214023`) |
| **Flora** | **Illium** | `!endgame illium` | 15212 | Arcane Umbra Lucent Gauntlet (`1282023`) |
| **Flora** | **Ark** | `!endgame ark` | 15512 | Arcane Umbra Abyssal Gauntlet (`1482221`) |
| **Anima** | **Lara** | `!endgame lara` | 16212 | Arcane Umbra Wand (`1372228`) |
| **Anima** | **Hoyoung** | `!endgame hoyoung` หรือ `!endgame hy` | 16412 | Arcane Umbra Ritual Fan (`1592023`) |
| **Anima** | **Ren** | `!endgame ren` | 16112 | Arcane Umbra Spirit Sword |
| **Heroes** | **Aran** | `!endgame aran` | 2112 | Arcane Umbra Polearm (`1442274`) |
| **Heroes** | **Evan** | `!endgame evan` | 2217 | Arcane Umbra Staff (`1382265`) |
| **Heroes** | **Mercedes** | `!endgame mercedes` หรือ `!endgame merc` | 2312 | Arcane Umbra Dual Bowguns (`1522143`) |
| **Heroes** | **Phantom** | `!endgame phantom` | 2412 | Arcane Umbra Cane (`1362140`) |
| **Heroes** | **Luminous** | `!endgame luminous` หรือ `!endgame lumi` | 2712 | Arcane Umbra Shining Rod (`1212120`) |
| **Heroes** | **Shade** | `!endgame shade` หรือ `!endgame eunwol` | 2512 | Arcane Umbra Claw / Knuckle |
| **Cygnus** | **Dawn Warrior** | `!endgame dawnwarrior` หรือ `!endgame dw` | 1112 | Arcane Umbra Two-Handed Sword |
| **Cygnus** | **Blaze Wizard** | `!endgame blazewizard` หรือ `!endgame bw` | 1212 | Arcane Umbra Staff |
| **Cygnus** | **Wind Archer** | `!endgame windarcher` หรือ `!endgame wa` | 1312 | Arcane Umbra Bow |
| **Cygnus** | **Night Walker** | `!endgame nightwalker` หรือ `!endgame nw` | 1412 | Arcane Umbra Claw |
| **Cygnus** | **Thunder Breaker** | `!endgame thunderbreaker` หรือ `!endgame tb` | 1512 | Arcane Umbra Knuckle |
| **Cygnus** | **Mihile** | `!endgame mihile` | 5112 | Arcane Umbra One-Handed Sword |
| **Explorer** | **Hero** | `!endgame hero` | 112 | Arcane Umbra Two-Handed Sword |
| **Explorer** | **Paladin** | `!endgame paladin` | 122 | Arcane Umbra Blunt Weapon / Sword |
| **Explorer** | **Dark Knight** | `!endgame darkknight` หรือ `!endgame drk` | 132 | Arcane Umbra Spear |
| **Explorer** | **Fire/Poison** | `!endgame fp` | 212 | Arcane Umbra Staff |
| **Explorer** | **Ice/Lightning** | `!endgame il` | 222 | Arcane Umbra Staff |
| **Explorer** | **Bishop** | `!endgame bishop` | 232 | Arcane Umbra Staff |
| **Explorer** | **Bowmaster** | `!endgame bowmaster` หรือ `!endgame bm` | 312 | Arcane Umbra Bow |
| **Explorer** | **Marksman** | `!endgame marksman` หรือ `!endgame mm` | 322 | Arcane Umbra Crossbow |
| **Explorer** | **Pathfinder** | `!endgame pathfinder` หรือ `!endgame pf` | 332 | Arcane Umbra Ancient Bow |
| **Explorer** | **Night Lord** | `!endgame nightlord` หรือ `!endgame nl` | 412 | Arcane Umbra Claw |
| **Explorer** | **Shadower** | `!endgame shadower` หรือ `!endgame shad` | 422 | Arcane Umbra Dagger |
| **Explorer** | **Dual Blade** | `!endgame dualblade` หรือ `!endgame db` | 434 | Arcane Umbra Dagger & Katara |
| **Explorer** | **Buccaneer** | `!endgame buccaneer` หรือ `!endgame bucc` | 512 | Arcane Umbra Knuckle |
| **Explorer** | **Corsair** | `!endgame corsair` หรือ `!endgame sair` | 522 | Arcane Umbra Gun |
| **Explorer** | **Cannoneer** | `!endgame cannoneer` หรือ `!endgame cannon` | 532 | Arcane Umbra Hand Cannon |
| **Special** | **Zero** | `!endgame zero` | 10112 | Lapis & Lazuli Type 9 |
| **Special** | **Kinesis** | `!endgame kinesis` | 14212 | Arcane Umbra Psy-limiter |
| **Special** | **Hayato** | `!endgame hayato` | 4112 | Arcane Umbra Katana |
| **Special** | **Kanna** | `!endgame kanna` | 4212 | Arcane Umbra Fan |
| **Special** | **Lynn** | `!endgame lynn` | 17212 | Arcane Umbra Memorial Staff |
| **Special** | **Mo Xuan** | `!endgame moxuan` | 17512 | Arcane Umbra Martial Core |
| **Special** | **Sia Astelle** | `!endgame sia` | 18212 | Arcane Umbra Celestial Wand |

---

## 4. รายละเอียดการทดสอบแยกตามกลุ่มอาชีพ

### กลุ่มที่ 1: Resistance (Blaster, Battle Mage)

#### 💥 Blaster (`!endgame blaster`)
- **Cylinder Ammo & Gauge**:
  - กดใช้ `Magnum Punch`, `Double Blast` หรือ `Revolving Cannon` เพื่อสะสมกระสุนใน Cylinder
  - สกิล `Bunker Buster Explosion` จะต้องใช้กระสุนและสะสมเกจความร้อน
  - เมื่อเกจความร้อนเต็มจะติดสถานะ Overheat ห้ามระบายซ้ำจนกว่าจะพ้นระยะเวลา
- **V-Matrix (5th Job)**:
  - `Rocket Punch`: มอบบัฟเสริมความเสียหายการระเบิดกระสุน
  - `Gatling Punch`: หมัดรัวแบบกดคีย์ดาวน์
  - `Bullet Blast`: กดค้างเพื่อชาร์จกระสุนมอบสถานะอมตะ (`NotDamaged`) และปล่อยหมัดระเบิดรุนแรง
  - `Afterimage Shock`: เกิดคลื่นกระแทกตามหลังการโจมตี
- **HEXA Matrix & 6th Job**:
  - `Final Destroyer` (Origin Skill `37141500`): คัทซีนพุ่งชน บัฟอมตะ 7 วินาที, มอนสเตอร์ติด Absolute Bind Freeze 10 วิ, คูลดาวน์ 360 วิ
  - `Vanguard Strike` (Ascent Skill `37141502`): ท่าพุ่งโจมตีต่อเนื่อง
  - `handleSetCoolDownSkill`: ซิงค์คูลดาวน์ท่าย่อยของ Hyper Magnum Punch, Revolving Blast, Rocket Punch ไม่ให้สแปม 0 วินาที

#### 🔮 Battle Mage (`!endgame battlemage` หรือ `!endgame bam`)
- **Aura Management**:
  - ทดสอบเปิด Aura: Hasty (วิ่งไว/ความเร็วโจมตี), Draining (ดูดเลือด), Blue (ลดความเสียหาย), Dark (เพิ่มดาเมจ), Debuff (ลดเกราะศัตรู)
  - ตรวจสอบว่าเปิดได้ทีละ 1 ออร่า (หรือหลายออร่าผ่านสกิลบัฟ 5th Job Union Aura)
- **Dark Genesis Final Attack Proc**:
  - กดใช้ `Dark Genesis` (หรือ Hexa) ให้สกิลติดคูลดาวน์
  - จากนั้นโจมตีมอนสเตอร์ด้วย `Finishing Blow` สังเกตว่าจะสุ่มโอกาส 60% เกิดฟ้าผ่า Final Attack (`Dark Genesis FA`) ลงบนหัวมอนสเตอร์อย่างต่อเนื่อง
- **V-Matrix (5th Job)**:
  - `Aura Scythe`: แปลงร่างเคียวออร่า ฟันรุนแรงทะลุเกราะ
  - `Union Aura`: รวมผลลัพธ์ของทุกลำแสงออร่าพร้อมกัน
  - `Black Magic Altar`: ตั้งเสาแท่นบูชาเชื่อมสายฟ้าทมิฬ
  - `Grim Harvest`: ซัมมอนยมทูตเก็บเกี่ยววิญญาณ
  - `Abyssal Lightning`: วางพอร์ทัลสายฟ้ามิติ
- **HEXA Matrix & 6th Job**:
  - `Crimson Pact` (Origin Skill `32141500`): ทำพันธสัญญาโลหิตยมทูต คัทซีนอลังการ มอบบัฟอมตะ 7 วินาที + Absolute Bind Freeze 10 วินาที คูลดาวน์ 360 วินาที
  - `Abyssal Reckoning` (Ascent Skill `32141502`): ท่าต่อสู้สายฟ้าแห่งความมืด

---

### กลุ่มที่ 2: Nova (Angelic Buster, Kain, Cadena, Kaiser)

#### 💖 Angelic Buster (`!endgame ab`)
- **Soul Battery System**:
  - โจมตีด้วยสกิลต่างๆ เพื่อเปิดใช้งานระบบชาร์จแบตเตอรี่ (Recharge) เมื่อ Affinity Heart ทำงานจะรีชาร์จเต็มทันที
- **V-Matrix & HEXA**:
  - `Super Star Spotlight`: ติดตั้งสปอตไลท์ 3 ดวงฉายลงบนพื้น เพิ่มบัฟตามจำนวนแสงที่ยืนทับ
  - `Mighty Mascot`: ซัมมอนมาสคอตเอสกาด้าพ่นลำแสงฟองสบู่
  - `Grand Finale` (Origin Skill `65141500`): คัทซีนคอนเสิร์ตใหญ่ บัฟอมตะ 7 วินาที + Bind มอนสเตอร์ทั้งฉาก คูลดาวน์ 360 วินาที
  - `Surprise Encore` (Ascent Skill `65141502`): คอมโบระเบิดคอนเสิร์ต

#### 🏹 Kain (`!endgame kain`)
- **Malice Gauge & Possession**:
  - ต้องสะสมเกจ Malice ให้ถึง 100 หน่วยจึงจะกดเข้าสู่โหมด `Possession` ได้ (หากเกจไม่พอระบบจะบล็อกป้องกันการสแปม)
  - เมื่ออยู่ในโหมด Possess สกิล Strike Arrow, Scattering Shot, Shaft Break, Falling Dust จะเปลี่ยนเป็นร่างสีม่วงรุนแรง
- **Execute Skills**:
  - สกิลประหารชีวิต (Poison Needle, Chain Sickle, Tearing Knife) จะระเบิดสแตก Death's Blessing สร้างดาเมจมหาศาล
- **Origin Skill**:
  - `Total Annihilation` (Origin Skill `63141500`): คัทซีนปลดปล่อยมังกรยมทูต อมตะ 7 วินาที + Absolute Bind 10 วินาที

---

### กลุ่มที่ 3: Flora & Anima (Khali, Adele, Lara, Hoyoung, Ren)

#### 🌀 Khali (`!endgame khali`)
- **Void Rush & Resonate**:
  - ทดสอบแดช 3 ทิศทางต่อเนื่อง พร้อมกดสกิลจักระเพื่อแคนเซิลอนิเมชันสร้าง Chakram Resonance บินโจมตีอัตโนมัติ
- **Origin Skill**:
  - `Hex: Pandemonium` (Origin Skill `154141500`): อมตะ 7 วินาที + Absolute Bind 10 วิ

#### 🗡️ Adele (`!endgame adele`)
- **Ether Swords & Order**:
  - สะสมเกจ Ether สร้างดาบเวทบินรอบตัว สั่ง `Order` พุ่งเสียบศัตรู และสั่ง `Gathering` เรียกดอกดาบกลับมารวมตัว
- **Origin Skill**:
  - `Maestro` (Origin Skill `151141500`): คอนเสิร์ตระบำดาบหมื่นเล่ม

#### 🌸 Ren (Forest Child) (`!endgame ren`)
- **Spirit Sword Ascent Combo**:
  - ทดสอบคอมโบต่อเนื่อง 3 จังหวะ: Falling Flower ➔ Climbing Serpent ➔ Soaring Dragon (ปุ่มสกิลบน Hotbar จะเปลี่ยนตามสเตจ)
- **Origin Skill**:
  - `Heavenly Imugi` (Origin Skill `161141500`): คัทซีนอัญเชิญพญานาคราชมังกร

---

### กลุ่มที่ 4: Explorer Warriors (Hero, Paladin, Dark Knight)

#### ⚔️ Hero (`!endgame hero`)
- **Combo Counter System**:
  - อัปและเปิดใช้งาน `Combo Attack` (คลาส 2) และ `Advanced Combo` (คลาส 4) เพื่อสะสมลูกแก้วคอมโบสูงสุด 10 ลูก (แสดงผลรอบตัวละคร)
  - ทดสอบการใช้ `Combo Fury` พุ่งดึงศัตรู และ `Beam Blade` ฟันปล่อยคลื่นพลัง (คูลดาวน์ 7 วิ)
- **V-Matrix (5th Job)**:
  - `Burning Soul Blade`: ซัมมอนดาบวิญญาณเพลิงตามหลังตัวละคร หรือกดคีย์ซ้ำเพื่อปักดาบลงพื้นโจมตีศัตรูต่อเนื่อง
  - `Worldreaver`: ดาบฟันทำลายมิติผ่าทั้งฉาก มอบสถานะอมตะ I-frame ขณะร่าย
  - `Combo Instinct`: ปลดปล่อยสัญชาตญาณคอมโบ เรียกดาบอัญเชิญฟันตามการโจมตีทุกครั้ง
  - `Sword Illusion`: ดาบภาพลวงตาฟันรัวระเบิดดาเมจ
- **HEXA Matrix & 6th Job**:
  - `Spirit Calibur` (Origin Skill `1141500`): รวมจิตวิญญาณฟันดาบยักษ์ คัทซีนเต็มจอ มอบบัฟอมตะ 7 วินาที (`IndieNotDamaged`), เติมลูกแก้ว Combo Counter เต็ม 10 ลูกทันที, ศัตรูติด Absolute Bind Freeze 10 วินาที + OriginDebuff 20 วินาที คูลดาวน์ 360 วินาที
  - `Ultrasonic Slash` (Ascent Skill `1141502`): ท่าฟันดาบความเร็วเหนือเสียง มอบบัฟอมตะ 5 วินาที, เติมคอมโบเต็ม คูลดาวน์ 240 วินาที
  - `handleSetCoolDownSkill`: ซิงค์คูลดาวน์ท่าย่อยของ Spirit Calibur, Ultrasonic Slash, Rising Rage, Cry Valhalla, Burning Soul Blade, Worldreaver, Combo Instinct, Sword Illusion, Beam Blade บล็อกสแปม 0 วินาที

#### 🛡️ Paladin (`!endgame paladin`)
- **Elemental Charge System**:
  - โจมตีสลับธาตุด้วย Flame Charge, Blizzard Charge, Lightning Charge, Divine Charge เพื่อสะสมสแตก Elemental Charge (สูงสุด 5 สแตก) ช่วยลดดาเมจและเพิ่มพลังโจมตี
  - ทดสอบ `Divine Mark` ตราประทับเทพเจ้า (คูลดาวน์ 7 วิ)
- **V-Matrix (5th Job)**:
  - `Hammers of the Righteous`: ค้อนศักดิ์สิทธิ์ 3 เล่มหมุนวนรอบตัวละคร หรือกดซ้ำเพื่อขยายวงรัศมีค้อนหมุนรวดเร็ว
  - `Grand Guardian`: กางตรากางเขนศักดิ์สิทธิ์ยิงลำแสงโจมตีมหาศาล
  - `Divine Echo`: เชื่อมโยงจิตวิญญาณกับเพื่อนร่วมปาร์ตี้ เลียนแบบสกิลโจมตีและบัฟ
  - `Mighty Mjolnir`: ขว้างค้อนโยเนียร์กระดอนกระแทกศัตรู
- **HEXA Matrix & 6th Job**:
  - `Sacred Bastion` (Origin Skill `1241500`): ปักดาบศักดิ์สิทธิ์กางอาณาเขตแห่งแสง คัทซีนอลังการ มอบบัฟอมตะ 7 วินาที (`IndieNotDamaged`), สร้างพื้นที่แสงศักดิ์สิทธิ์ฟื้นฟูเลือดและโจมตีต่อเนื่อง, ศัตรูติด Absolute Bind Freeze 10 วินาที + OriginDebuff 20 วินาที คูลดาวน์ 360 วินาที
  - `Dominus Oblivion` (Ascent Skill `1241504`): ปลดปล่อยทัณฑ์สวรรค์ มอบบัฟอมตะ 5 วินาที, บัฟชาร์จธาตุ คูลดาวน์ 240 วินาที
  - `handleSetCoolDownSkill`: ซิงค์คูลดาวน์ท่าย่อยของ Sacred Bastion, Dominus Oblivion, Divine Mark, Heaven's Hammer, Falling Justice, Smite Shield, Sacrosanctity, Divine Echo, Hammers of the Righteous, Grand Guardian บล็อกสแปม 0 วินาที

#### 🔱 Dark Knight (`!endgame darkknight` หรือ `!endgame drk`)
- **Evil Eye & Final Pact (Reincarnation)**:
  - เรียก `Evil Eye` ออกมาช่วยฮีลเลือดและสะสมพลัง
  - สกิล `Final Pact`: เมื่อ HP หมดจะฟื้นคืนชีพทันทีพร้อมโหมดอมตะ
- **Gungnir's Descent 0 Cooldown Mechanism**:
  - ทดสอบเปิดใช้งาน `Dark Resonance` หรืออยู่ในโหมด `Final Pact`
  - สกิล `Gungnir's Descent` และ HEXA Gungnir จะต้อง **ไม่มีคูลดาวน์ (0 วินาที)** สามารถกดสแปมแทงหอกรัวได้ตามกลไกแท้ของเกม
- **V-Matrix (5th Job)**:
  - `Spear of Darkness`: พุ่งหอกทมิฬเสียบทะลวงต่อเนื่อง
  - `Darkness Aura`: กางออร่าความมืดดูดซับวิญญาณและระเบิดดาเมจปิดท้าย
  - `Radiant Evil`: คลื่นวิญญาณความมืดกระจายรอบตัว
  - `Calamitous Cyclone`: หมุนควงหอกพายุทมิฬเป็นวงกว้าง
- **HEXA Matrix & 6th Job**:
  - `Dead Space` (Origin Skill `1341500`): ผ่ามิติแห่งความตาย คัทซีนทมิฬ มอบบัฟอมตะ 7 วินาที (`IndieNotDamaged`), เปิดใช้งานบัฟ Dark Resonance ทันที, ศัตรูติด Absolute Bind Freeze 10 วินาที + OriginDebuff 20 วินาที คูลดาวน์ 360 วินาที
  - `Dark Halidom` (Ascent Skill `1341502`): ท่าหอกทมิฬสังหาร มอบบัฟอมตะ 5 วินาที, บัฟ Dark Resonance คูลดาวน์ 240 วินาที
  - `handleSetCoolDownSkill`: ซิงค์คูลดาวน์ท่าย่อยของ Dead Space, Dark Halidom, Dark Bident, Nightshade Explosion, Evil Eye Shock, Dark Resonance, Dark Thirst, Spear of Darkness, Darkness Aura, Radiant Evil, Calamitous Cyclone บล็อกสแปม 0 วินาที

---

## 5. คำสั่งช่วยเหลือพิเศษสำหรับ Admin & Testing

| คำสั่ง | สิทธิ์ | คำอธิบาย |
| :--- | :--- | :--- |
| `!endgame <job>` | Admin | เปลี่ยนอาชีพเป็นคลาส 6 เลเวล 260 + แต้ม AP/SP เต็มพิกัด + อุปกรณ์ BiS + 3,000 Nodes |
| `!buffall` | Admin | มอบ Super Buff All 20+ บัฟ ระยะเวลา 2 ชั่วโมงเต็ม (EXP +55%, Drop +44%, ATT +260+, IED +50%) |
| `@buff` หรือ `@buffall` | ผู้เล่นทุกคน | คำสั่งสำหรับผู้เล่นทั่วไปหรือเพื่อนในวง LAN เพื่อรับบัฟเทพ 2 ชั่วโมง |
| `!solerda` หรือ `!hexaitems` | Admin | เสกวัตถุดิบ HEXA (Sol Erda Energy x500, Fragments x20,000, Nodes x2,000, 10B Mesos) |
| `!level <เลเวล>` | GM | ปรับเลเวลตัวละคร (เช่น `!level 260` หรือ `!level 300`) |
| `!job <jobID>` | GM | เปลี่ยน Job ID ตรง (ดูรหัสจากตารางด้านบน) |
| `!heal` | GM | ฟื้นฟู HP/MP 100% |
| `!cd` | GM | ล้างคูลดาวน์สกิลทั้งหมดในตัวละครทันที |
| `!admin` หรือ `!adminnpc` | GM | เปิดเมนูลัด Quick Admin NPC |
| `!spawn <mobID> [จำนวน]` | GM | เสกมอนสเตอร์หรือบอสออกมาทดสอบตีดาเมจ |

---
*จัดทำขึ้นโดย MapleStory Server Runner v265 Project Team — เอกสารนี้ได้รับการซิงค์ตรงกับเซิร์ฟเวอร์และแพตช์ล่าสุด 100%*
