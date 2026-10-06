NPC = 9130081
MEDAL = 1142507
sm.lockInGameUI(True, False)
sm.removeEscapeButton()

sm.setSpeakerID(NPC)
sm.setBoxChat()    
sm.sendNext("Finally, your real skills are coming back! I'm tired of doing all the work!")

sm.setPlayerBoxChat()
sm.sendNext("What exactly do you do other than sleep?")

sm.setSpeakerID(NPC)
sm.setBoxChat()    
sm.sendNext("I do all kinds of stuff...when I have enought Mana, which, might I add, I am still waiting for!")

sm.setPlayerBoxChat()
sm.sendNext("That reminds me. I should release some of the Mana I've stored up. The weak magic I've been using won't get me very far.")
sm.sendNext("Time to buff up my magic. I'll be strong in no time!")

sm.setSpeakerID(NPC)
sm.setBoxChat()    
sm.sendNext("Hey! Are u trying to starve me to death? Without Mana, I might as well be a house cat! ")

sm.setPlayerBoxChat()
sm.sendNext("Relax, furball. We have to be careful about how we use Mana in this new world. There's no telling what it could do.")
sm.sendNext("(There's no way this will be enought to overthrow Nobunaga and rescue the princess. I'll have to train to become powerfull.)")
sm.lockInGameUI(False, False)
if not sm.canHold(MEDAL):
    sm.sendSayOkay("Please make space in your equipment inventory.")
    #sm.dispose()
else:
    sm.jobAdvance(4210)
    sm.giveItem(MEDAL)
    sm.completeQuest(parentID)
    sm.chatScript("Bạn đã nhận được một huy chương mới.")
    sm.showEffect("Effect/BasicEff.img/JobChangedKanna", 0, 0, 0, -2, -2, False, 0)
    #sm.dispose()