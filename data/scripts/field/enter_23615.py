# Character field ID when accessed: 931060030
# ObjectID: 0
# ParentID: 931060030
BLACK_WINGS  = 1514001
sm.lockInGameUI(True, False)
sm.removeNpc(BLACK_WINGS)
sm.spawnNpc(BLACK_WINGS,758,28)

sm.setSpeakerID(BLACK_WINGS)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Huh? I'm sure I have seen two persons, but where did one go? And you, you don't seem familiar to me! What are you doing here?")

sm.setPlayerBoxChat()
sm.sendNext("I'm just a normal Black Wing passing by.")

sm.setSpeakerID(BLACK_WINGS)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("No, wait a moment.. Somehow you appear to be familiar.... Oh, yes! I think I have seen someone familiar like you in Gelimer's directory.")

sm.setPlayerBoxChat()
sm.sendNext("I'm not.")

sm.setSpeakerID(BLACK_WINGS)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Huh, r..really? Seeing you talking like that, I might be wrong........no, I am not sure so I can just ask Gelimer for confirmation. Just follow me!")

sm.setPlayerBoxChat()
sm.sendNext("Is it a fail? I should defeat him and escape.")
sm.chatScript("Defeat the Black Wing's challenger.")
sm.spawnMob(9300643,758,28,False)
sm.removeNpc(BLACK_WINGS)


sm.lockInGameUI(False, False)