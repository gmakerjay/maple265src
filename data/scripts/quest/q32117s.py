# id 32117 ([Ellinel Fairy Academy] Graduate Search), field 101072000
sm.setSpeakerID(1500001) # Hiệu trưởng Ivana
res = sm.sendAskAccept("Bạn có biết Arwen hoặc Rowen ở Ellinia không? Họ là cựu học sinh của Học viện Tiên nữ Ellinel. Họ có thể biết một số nơi mà giáo viên chúng tôi không biết.\r\n\r\n  #e#b(Bạn sẽ được chuyển đến Ellinia nếu chấp nhận.)#k")
if res:
    sm.sendNext("Làm ơn gặp Arwen the Fairy ở Ellinia.")
    sm.startQuest(parentID)
    sm.warp(101000000)