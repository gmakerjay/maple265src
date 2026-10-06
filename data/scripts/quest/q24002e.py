# Yêu cầu của Philius
PHILIUS = 1033202
sm.removeEscapeButton()
sm.lockInGameUI(True, False)
sm.setSpeakerID(PHILIUS)
sm.setBoxChat()
sm.sendNext("Có lẽ chúng ta là những người may mắn. "
            "Trong khi chúng ta ngủ, Thế giới Maple sẽ được chữa lành khỏi những điều tồi tệ mà Black Mage đã gây ra. "
            "Tôi tự hỏi chúng ta sẽ thức dậy trong một thế giới như thế nào?")


if sm.sendAskYesNo("Thưa Điện hạ, tôi sẽ mơ về một thế giới tươi đẹp hơn khi chúng ta thức dậy..."):
    sm.completeQuest(parentID)
    sm.sendSayOkay("Tôi chúc ngài... có những giấc mơ đẹp...")
    #sm.startQuest(24005) # Giấc Ngủ Bị Nguyền Rủa
    sm.lockInGameUI(False, False)
else:
  sm.lockInGameUI(False, False)