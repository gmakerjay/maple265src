#   [Thăng Cấp] (Lv.100)   Đường Lối của Cung Chủ / Xạ Thủ
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
heroicPentagon = 4031514
heroicStar = 4031515

sm.setSpeakerID(20181300)
sm.setBoxChat()
if sm.getChr().getLevel() >= 100:
    sm.sendNext("Ngươi đã đạt được đỉnh cao của Sức Mạnh, tuy nhiên vẫn còn một chướng ngại vật nữa cản đường ngươi.\r\n"
                "Ta sẽ thử thách ngươi trước khi trao cho ngươi sức mạnh nghề bậc 4.")
else:
    sm.sendSayOkay("Ngươi chưa sẵn sàng. Hãy nói chuyện với ta khi ngươi đạt Cấp độ 100.")


sm.sendNext("Mang cho ta một #b#i"+ str(heroicPentagon) +"##z"+ str(heroicPentagon) +"##k và một #b#i"+ str(heroicStar) +"##z"+ str(heroicStar) +"##k. "
           "Những biểu tượng anh hùng này có thể có được bằng cách đánh bại #bManon#k và #bGriffey#k.")

response = sm.sendAskYesNo("Ngươi đã sẵn sàng tham gia thử thách chưa?")

if response:
    sm.sendSayOkay("Ta sẽ chờ đợi sự xuất hiện của ngươi.")
    sm.startQuestNoCheck(parentID)
    sm.lockInGameUI(False, False)
else:
    sm.sendSayOkay("Hãy nói chuyện với ta khi ngươi cảm thấy mình đã sẵn sàng.")
    sm.lockInGameUI(False, False)