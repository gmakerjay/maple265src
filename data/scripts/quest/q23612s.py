# ParentID: 23612
# ObjectID: 0
# Character field ID when accessed: 230050000
BIOLOGIST = 2300002

sm.setSpeakerID(BIOLOGIST)
sm.setBoxChat()    
sm.sendNext("Hello, I called you because of an important matter, I don't know whether you know, but I heard Gelimer is still looking for you.")   
sm.sendNext("In that meanwhile there hasn't been anyone following you beside of the chaser called Beryl. But it seems like now a whole part of the Black Wings seems to be in search for you. Somehow I get the feeling they just changed their plans, since they could not catch you so far.....")
sm.sendNext("Right now, not everyone at the Black Wings seems to know about you, but if this goes on like this It's just a matter of time, when you are being captured again. Therefore, everyone in the institute is creating a new weapon for you..... But I am against giving it to you. Do you know why?")

sm.setPlayerBoxChat()
sm.sendNext("Is that because I am not human?")

sm.setSpeakerID(BIOLOGIST)
sm.setBoxChat()    
sm.sendNext("I can assert, it's not.")

sm.setPlayerBoxChat()
sm.sendNext("Then is it because Gelimer created me?")

sm.setSpeakerID(BIOLOGIST)
sm.setBoxChat()    
sm.sendNext("Neither. It's not you whom I cannot trust. it's myself. To be honest everyone is being human, but what if I lose my humanity, who says I wouldn't be as acquistive as Gelimer? Same for the others. The colleagues are all nice, but it's the science that changes everyone.")  
if sm.sendAskYesNo("Scientists have to take responsbility over their own curiosity. That's why I cannot decide easily, whether to give you this intense power.\r\nTherefore, I ask you to prove your courage to me. It won't be easy indeed...... but would you like to try?"):
    sm.sendNext("Are you going to try? Then please get a #bBlack Wing's hat#k as proof of your courage.\r\nYou will be able to get one in Edelstein's #bRoad to the Mine 1.#k \r\nThe mine is already an area of the enemies and they are even looking for you now, so you will have to be extra careful. Come back safe.")
    sm.startQuest(parentID)
