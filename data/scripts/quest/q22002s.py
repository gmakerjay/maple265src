# 22002 |   Sandwich for Breakfast (Evan intro)
sm.lockInGameUI(True,False)
sm.removeEscapeButton()
sm.setSpeakerID(1013101)
sm.setBoxChat()
sm.sendNext("Did you feed Bulldog? You should have some breakfast now then, Evan. Today's breakfast is Handmade Sandwich. I've brought it with me. Hee hee. I was going to eat it myself if you didn't agree to feed Bulldog")
if sm.sendAskYesNo("Here, I'll give you this #bSandwich#k, so #bgo talk to mom when you finish eating#k. She says she has something to tell you."):
    if sm.canHold(2022620):
        sm.startQuest(parentID)
        sm.giveItem(2022620)
        
        sm.setPlayerBoxChat()
        sm.setPlayerAsSpeaker()
        sm.sendNext("#b(Mom has something to say? Eat your Handmade Sandwich and head back inside the house.)")
        
        sm.lockInGameUI(False,False)
        #sm.dispose()
    else:
        sm.sendNext("Please make room in your Use inventory.")
        sm.lockInGameUI(False,False)
        #sm.dispose()
else:
    sm.lockInGameUI(False,False)
    #sm.dispose()

