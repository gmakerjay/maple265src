# id 101073010 (Mandraky Field : Desolate Orchard 1), field 101073010
sm.setSpeakerType(3)
sm.setParam(4)
sm.setSpeakerID(1500017) # Tiên nữ Tosh
sm.sendSayOkay("Cứu tôi với! Tôi bị mắc kẹt hoàn toàn vì lũ quái vật!\r\n\r\n#b(Đánh bại tất cả quái vật gần đó.)#k")
while sm.hasMobsInField():
    sm.waitForMobDeath()
sm.showFieldEffect("monsterPark/clear", 0)
sm.playSound("Party1/Clear", 100)