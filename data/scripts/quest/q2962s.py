Tofu = 1082203

sm.setSpeakerID(Tofu)
if sm.sendAskYesNo("I did see some Black Slime, but I don't know if what I saw was what I think it was I suppose I can tell you about it, if that would get you to stop talking to me."):
    sm.sendNext("I'll need some time to get my mind on the right track. I was sitting by the water, rubbing oil on my belly in the light of the moon, when I saw something move...")
    sm.showFieldEffect("Map/Effect.img/goldBeach/submarine")
    sm.startQuest(parentID)