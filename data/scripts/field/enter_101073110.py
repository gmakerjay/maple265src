# id 101073110 (Mandraky Field : Desolate Orchard 2), field 101073110
sm.setSpeakerType(3)
sm.setParam(4)
sm.setSpeakerID(1500019) # Ephony the Fairy
sm.sendSayOkay("Giúp chúng tôi với! Lũ quái vật này sắp tấn công chúng ta rồi!\r\n\r\n#b(Đánh bại tất cả quái vật gần đó.)#k")
while sm.hasMobsInField():
    sm.waitForMobDeath()
sm.showFieldEffect("monsterPark/clear", 0)
sm.playSound("Party1/Clear", 100)
