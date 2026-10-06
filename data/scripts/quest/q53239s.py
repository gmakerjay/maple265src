# ParentID: 53238
# ObjectID: 0
THUNDERHAMMER = 9270091
sm.removeEscapeButton()
sm.setSpeakerID(THUNDERHAMMER)
sm.setBoxChat()
sm.sendNext("Ah,#b#h0##k. I'm sure your core is better than it ever was.\r\nMy calculations must have improved it ten--")
sm.setPlayerBoxChat()
sm.sendNext("It's a mess,#bThunder Hammer#k. I was coming to see you.")
sm.setSpeakerID(THUNDERHAMMER)
sm.setBoxChat()
if sm.sendAskYesNo("Are you trying to tell me that you broke the item I so perfectly fixed for you?"):
    sm.setPlayerBoxChat()
    sm.sendNext("It's been stable for a while, but I've noticed a lot more cracks showing up lately under the strain...")
    sm.setSpeakerID(THUNDERHAMMER)
    sm.setBoxChat()
    sm.sendNext("Blast it! #bBlue Ore#k isn't strong enough to handle the power output on this device! i should have known... You are going to need a much stronger compound to channel that energy.")
    sm.setPlayerBoxChat()
    sm.sendNext("Can we do something about it?")
    sm.setSpeakerID(THUNDERHAMMER)
    sm.setBoxChat()
    sm.sendNext("Of course it can! A smithy always find a way. But we will need stronger bonding agents to harden the coating...")
    sm.setPlayerBoxChat()
    sm.sendNext("What do we nned? I'm not about to let the core break again.")
    sm.setSpeakerID(THUNDERHAMMER)
    sm.setBoxChat()
    sm.sendNext("#bFire Ore#k has some very unique strengtheing properties. It develops in the #bBlast Furnace#k, but it's quite hard to get in proper quantilies..")
    sm.setPlayerBoxChat()
    sm.sendNext("I'll head into the #bBlast Furnace#k. What's a little furnace gonna do to me that space hasn't already?")
    sm.setSpeakerID(THUNDERHAMMER)
    sm.setBoxChat()
    if sm.sendAskYesNo("A foolish anecdote at best, but I'm sure you know your limits. Remember to take enough potions, because if you have to quit before you succeed.#bYou must forfeit the quest and start again."):
        sm.startQuest(parentID)
        sm.warp(552000073,0)
        #sm.dispose()
    

    
    
    
    
    
    