# id 64072 ([MONAD: Điềm Báo Đầu Tiên] Vào Rừng), field 867201100
sm.setSpeakerType(3)
sm.setParam(57)
sm.setColor(1)
sm.sendNext("#b(Giờ đã biết cabin ở đâu, tôi nên đi ngay.)")
res = sm.sendNext("#b(Cuối cùng, có lẽ tốt nhất là nên đi ngay lập tức.)\r\n#L0# 'Tôi nên đi thôi.'#l")
sm.startQuest(parentID)
sm.warp(867201050)