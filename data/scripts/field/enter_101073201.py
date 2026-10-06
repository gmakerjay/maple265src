# id 101073201 (Mandraky Field : Kidnapping Site), field 101073201
sm.lockInGameUI(True, True)
sm.hideUser(True)
sm.spawnNpc(1500026, -322, 228)
sm.showNpcSpecialActionByTemplateId(1500026, "summon", 0)
sm.spawnNpc(1500031, 40, 228)
sm.showNpcSpecialActionByTemplateId(1500031, "summon", 0)
sm.spawnNpc(1500032, 180, 228)
sm.showNpcSpecialActionByTemplateId(1500032, "summon", 0)
sm.setSpeakerType(3)
sm.setSpeakerID(1500016) # Tiên nữ Woonie
sm.setParam(1)
sm.sendNext("Tôi sợ quá... Chúng tôi chỉ đang diễn tập vở kịch thôi...")
sm.setSpeakerID(1500018) # Tiên nữ Tracy
sm.sendSay("Đừng lo, Woonie. Mọi chuyện sẽ ổn thôi! Sẽ có người đến cứu chúng ta... tôi nghĩ vậy...")
sm.setSpeakerID(1500026) # ???
sm.sendSay("Cái gì thế này? Những cô tiên nhỏ bé lại ở trong vương quốc của Vua Chuột Chũi sao?! Chắc các cô phải dũng cảm lắm mới thành mồi ngon cho ta!")
sm.setSpeakerID(1500018) # Tiên nữ Tracy
sm.sendSay("Làm ơn thả chúng tôi đi. Tôi không muốn trở thành thức ăn của chuột chũi!")
sm.setSpeakerID(1500026) # ???
sm.sendSay("Ồ, ta sẽ không ăn các cô đâu! Ta sẽ giữ các cô lại làm cô dâu của ta! Khi các cô đủ tuổi, tất nhiên rồi, bọn chuột chũi chúng ta có một tinh thần hiệp sĩ rất mạnh mẽ.")
sm.setSpeakerID(1500016) # Tiên nữ Woonie
sm.sendSay("Cái gì?! THẬT GÊ TỞM!")
sm.setSpeakerID(1500026) # ???
sm.sendSay("Ta xin lỗi nếu đã xúc phạm các quý cô, nhưng ta sẽ không dành những ngày của mình dưới lòng đất ẩm ướt, tăm tối! Khi ta giải phóng tất cả những Mandrakies này khỏi chế độ tiên nữ áp bức của các cô, ta sẽ là người cai trị ở đây, và các cô sẽ yêu ta... miễn là các cô đồng ý.")
sm.setSpeakerID(1500018) # Tiên nữ Tracy
sm.sendSay("Được rồi, phải có ai đó đến cứu chúng ta thôi.")
sm.hideUser(False)
sm.lockInGameUI(False, True)
sm.warp(101073100)