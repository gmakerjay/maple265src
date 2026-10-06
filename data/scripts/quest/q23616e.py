# ParentID: 23612
# ObjectID: 0
# Character field ID when accessed: 230050000
ROO_D = 2300000

sm.setSpeakerID(ROO_D)
sm.setBoxChat()    
sm.sendNext("Why the serious face? Wait, you always look serious. Why more-serious face?")  

sm.setPlayerBoxChat()   
sm.sendNext("Roo-D, what if I never get my memories back? What if I threw away my whole life for something I'll never see?")

sm.setSpeakerID(ROO_D)
sm.setBoxChat()    
sm.sendNext("What? That's crazy! If you had stayed in that lab, Gelimer would have you...stomping on puppies or something! What if he'd ordered you to destroy Edelstein?! That could have been you!")

sm.setPlayerBoxChat()   
sm.sendNext("I know that. I don't regreat leaving. But I feel an emptiness inside that i do not know how to deal with. You and Beryl do not seem to care about your past at all. Why does it trouble me so much? Am i ....broken?")

sm.setSpeakerID(ROO_D)
sm.setBoxChat()    
sm.sendNext("No! You're great, just the way you are. There's nothing wrong with wanting to know who you are, nTaunt. But you and I are different, you know? Not everybody wants the same thing.")

sm.setPlayerBoxChat()   
sm.sendNext("......")

sm.setSpeakerID(ROO_D)
sm.setBoxChat()    
sm.sendNext("You taught me that Xenoroids are different. You and Beryl couldn't be less alike. That means we were meant to have different personalitites. If anything, you wanting to find your memories make you MORE human than the rest of us.")
sm.sendNext("I know you're stuggling. This isn't gonna be easy for you. It could take years. But if it's something you want, I know you'll make the decision to pursue it, no matter how much pain it comes with. And that decision will always be yours to make. You're free now.")
sm.sendNext("Everybody can see that you're doing the right thing. That's why we all help you. It's not because they feel sorry for you, it's because they belive it's the right thing to do. Don't ever forget the friends you've found. You might have been enemies if you hadn't left the lab")
if sm.canHold(1142578):
    sm.jobAdvance(3612)
    sm.giveItem(1142578)
    sm.chatScript("<Border Patrol> has been awarded.")
    sm.chatScript("Earned Forever Single title!")
    sm.completeQuest(parentID)
    sm.setPlayerBoxChat()   
    sm.sendNext("Thank you for standing beside me, Roo-D I hope that the choices I make will help you as much as they help me.")

else:
    sm.sendSayOkay("Please make more space in your EQUIP inventory.") 



 
   