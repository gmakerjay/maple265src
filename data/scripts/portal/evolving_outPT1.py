from net.swordie.ms.constants import GameConstants

ESS = 9075200

sm.setSpeakerID(ESS)
if sm.hasQuestCompleted(1820):
    sm.sendNext("You have successfully completed the Warm-up program. Complete each link's Training Course to evolve your body into something more powerful.")
    
    sm.sendPrev("You have completed the Enhanced system warm-up. End the Evolution System program and re-connect.")
    
    sm.warp(GameConstants.EVOLVING_CENTRAL_CONTROL_MAP)
    sm.completeQuest(1821)
else:
    sm.sendSayOkay("You've to complete the Quest in order to get out of this Link!")