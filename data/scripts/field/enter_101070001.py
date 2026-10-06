sm.lockUI()

FANZY = 1500010
MIDSUMMER_NIGHTS_FOREST_ELLINEL_LAKE_SHORE = 101070000 # MAP ID

sm.removeEscapeButton()

sm.flipDialoguePlayerAsSpeaker()
sm.sendNext("#bBleh! Tôi suýt chết đuối!#k")

sm.setSpeakerID(FANZY)
sm.sendSay("Chắc chắn phải có một loại bùa chú nào đó ngăn không cho người ta bơi qua.")

sm.flipDialoguePlayerAsSpeaker()
sm.sendSay("#bAnh nên nói trước với tôi điều đó chứ!#k")

sm.setSpeakerID(FANZY)
sm.sendSay("Tôi không phải là người toàn năng, và anh là một đối tượng thử nghiệm tốt. Chúng ta sẽ phải tìm cách khác.")

sm.unlockUI()
sm.startQuest(32102)
sm.completeQuest(32102)

sm.warp(MIDSUMMER_NIGHTS_FOREST_ELLINEL_LAKE_SHORE, 0)