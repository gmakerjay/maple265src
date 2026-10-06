sm.sendNext("What? You threw away the coins without finishing the tutorial? (Signs) I suppose I can give you some more coins so that you can complete the tutorial.")

sm.sendSay("Just remember, you can't trade without gold!")

sm.sendPrev("Check to make sure there you have coins in your inventory.")

if not sm.hasItem(4310100):
    sm.giveItem(4310100, 30)
