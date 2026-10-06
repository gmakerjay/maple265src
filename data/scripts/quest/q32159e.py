Fanzy = 1040002

sm.setSpeakerID(Fanzy)
sm.sendNext("Bạn có phải là người tôi mời đến giúp giải quyết vụ ồn ào ở Học viện Tiên nữ Ellinel không?")
sm.setPlayerAsSpeaker()
sm.sendSay("Ừm, tất nhiên rồi?")
sm.setSpeakerID(Fanzy)
sm.sendSay("Trông bạn không khỏe như tôi mong đợi. Nhưng bạn nổi tiếng mà, nên tôi để bạn lo.")
sm.completeQuest(parentID)
sm.createQuestWithQRValue(32147, "0")