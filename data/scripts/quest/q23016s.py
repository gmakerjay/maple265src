sm.setSpeakerID(2151004)
if sm.sendAskYesNo("Have you made your decision to become a Mechanic? You can still change your mind, you know. Just stop the conversation, forheit this quest, and talk to another job trainer. So, are you certain becoming a Mechanic is the best way for you to serve the Resistance?"):
    sm.sendNext("Welcome to the Resistance, From now on, you are a Mechanic. As one who works with machines, use every method available to defeat the enemies before you!")
    sm.completeQuestNoRewards(23016)