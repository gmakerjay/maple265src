# Được tạo bởi MechAviv
# Giới thiệu Kinesis
# ID bản đồ :: 101020400
# Rừng Đông :: Hiệp hội Pháp sư
KINESIS = 1531000
NERO = 1531003
THREE_MOON = 1531004

sm.setNpcOverrideBoxChat(NERO)
sm.sendNext("#face1#Bạn có tất cả không? Cho tôi, cho tôi.")
sm.sendSay("#face1#Woo! Đuôi Mắt Lạnh! Three Moon sẽ nấu một món súp tuyệt vời từ đây.\r\n\r\n#b#i2010045# #t2010045#")
sm.giveItem(2010045, 10)
sm.completeQuest(parentID)
#lấy 10 mắt lạnh tails
sm.sendSayOkay("#face0#Bạn sắp đến nơi rồi đấy, Kinesis. Khi bạn đạt đến #bCấp 30#k, tôi có thể đưa bạn trở lại Three Moon.")