# Start [Arcana] Wock Spiwit Wescue

ROCK_SPIRIT = 3003314
ROCK_SPIRITS = 3003315

sm.lockUI()
sm.setNpcBoxChat(ROCK_SPIRIT)
sm.sendNext("#face0#I was swimming awound undagwound wif my bwudders when suddenwee a big wave came and swept us away!")
sm.sendNext("#face0#When I woke up, I was twapped undah these woots! They've gwoan immensewee... It must be the same foh the Spiwit Twee.")
sm.sendNext("#face0#And... and... I'm fohgetting somefing impohtant...")
sm.setNpcBoxChat(ROCK_SPIRITS)
sm.sendNext("#face0#Us, you dodo! You awe fohgetting us!")
sm.sendNext("#face0#Oof! We awe stuck undah these bwasted woots! And... my butt is getting cohd and wet!")
sm.setNpcBoxChat(ROCK_SPIRITS)
sm.sendNext("#face0#I know, I know! Go and find the west of my bwudders wost thwoughout the cave! You can stack them on top wun anudder and cwimb up!")
sm.unlockUI()
sm.createQuestWithQRValue(34474, "fin=7")
sm.completeQuest(34474)