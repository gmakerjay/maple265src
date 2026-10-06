# id 62025 (Collecting the Eagle Swordsman Demon Orb), field 701210150
sm.setSpeakerType(3)
sm.setParam(37)
sm.setColor(1)
sm.setSpeakerID(9310597) # Zarak
sm.sendNext("Hey. You have the orb I asked for?")
sm.completeQuest(parentID)
sm.setSpeakerType(4)
sm.setSpeakerID(9310597) # Zarak
sm.sendSay("Oh yeah, this'll help with my research. Come to me, demon orb.")
sm.playExclSoundWithDownBGM("Field.img/masteryBook/EnchantSuccess", 100)
