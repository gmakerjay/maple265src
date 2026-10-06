# id 101073300 (Mandraky Field : Outdoor Theater Stage), field 101073300
if not sm.hasMobsInField():
    sm.spawnMob(3501008, 18, 222, False)
    sm.spawnMob(1500016, 442, 113, False)
    sm.spawnMob(1500018, 568, 105, False)
sm.setSpeakerType(3)
sm.setParam(4)
sm.setSpeakerID(1500016) # Tiên nữ Woonie
sm.sendSayOkay("Làm ơn tiêu diệt con chuột chũi già kinh tởm đó!\r\n#b(Đánh bại Vua Chuột Chũi.)#k")
sm.startQuest(26509)
while sm.hasMobsInField():
    sm.waitForMobDeath()
sm.showFieldEffect("monsterPark/clear", 0)
sm.playSound("Party1/Clear", 100)