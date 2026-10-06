# id 2 (pt_east), field 101073200
sm.setSpeakerID(1500027) # Mole King's Lair
res = sm.sendAskAccept("Bạn muốn di chuyển đến #bSân khấu Nhà hát ngoài trời#k?")
if res:
    sm.warp(101073300)
