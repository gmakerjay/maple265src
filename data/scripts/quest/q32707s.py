# Created by MechAviv
# Quest ID :: 32707
# [FriendStory] Student From Another World

sm.setNpcBoxChat(1530000)
sm.setSpeakerType(3)
sm.sendNext("Alo? Alo?\r\nĐược rồi, gã pháp sư nói rằng anh ta đã dịch chuyển chiếc điện thoại này đến một người có thể giúp đỡ. Vậy, ừm, chào? Bạn có thể giúp tôi không, có lẽ thế?")


sm.setNpcBoxChat(1530000)
sm.setSpeakerType(3)
sm.sendSay("...Gì cơ?\r\nVâng, tôi đang nói chuyện với-\r\nAnh bạn, bình tĩnh đi! Tôi sẽ hỏi-")


sm.setNpcBoxChat(1530000)
sm.setSpeakerType(3)
if sm.sendAskYesNo("Ách, gã này cư xử như một kẻ lập dị.\r\nNày, anh ta muốn biết liệu anh ta có thể dịch chuyển bạn đến đây không. Ổn chứ?\r\n#b(Bạn sẽ được chuyển đến Khu Nhà Tủ Quần Áo ở Henesys.)#k"):
    sm.setNpcBoxChat(1530000)
    sm.setSpeakerType(3)
    sm.sendNext("Tuyệt. ...Này, gã ma thuật! Làm trò ma thuật của anh đi!\r\n#e#b(Bạn cũng có thể sử dụng Gương Chiều Không Gian để đến đây.)#n#k")

    sm.warp(330002040, 0)
else:
    sm.setNpcBoxChat(1530000)
    sm.setSpeakerType(3)
    sm.sendNext("...Tôi hiểu rồi. Họ sẽ không quan tâm đến tôi, ngay cả khi mọi thứ đang bị đảo lộn như thế này.")