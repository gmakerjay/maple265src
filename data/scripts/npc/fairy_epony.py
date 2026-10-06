# id 1500019 (Ephony the Fairy), field 101073110
sm.setSpeakerType(3)

if not sm.hasMobsInField():
    sm.setParam(5)
    sm.setSpeakerID(1500019) # Tiên nữ Ephony
    sm.sendNext("Phù! Anh/chị đã cứu tôi! Tôi cứ nghĩ lũ quái vật đó sẽ ăn thịt tôi mất.")
    sm.setSpeakerID(1500020) # Tiên nữ Phiny
    sm.sendSay("A-anh/chị là a-anh hùng sao?")
    sm.setParam(17)
    sm.sendSay("#b(Tổng cộng có năm đứa mất tích... Những đứa trẻ khác đâu rồi?)#k")
    sm.setParam(5)
    sm.sendSay("Anh/chị phải đi cứu Woonie và Tracy! Tôi thấy một con quái vật bóng tối định ăn thịt chúng!")
    sm.setParam(17)
    sm.sendSay("#bQuái vật bóng tối?#k")
    sm.warp(101073201)
    sm.completeQuest(32126)
else:
    sm.sendNext("Làm ơn tiêu diệt hết lũ quái vật đi, chúng tôi không thể ra ngoài như thế này được!")