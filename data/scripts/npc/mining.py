# Hidden Street - Ardentmill :: 910001000
# Gere :: Master of Mining :: 9031002

MINING_SKILL = 92010000
FEE = [500000, 1500000, 2500000, 4000000, 6000000, 8500000, 11500000, 15000000, 19000000, 23500000]

if not sm.hasSkill(MINING_SKILL):
    selection = sm.sendSay("What can I do for you today?\r\n#L0##bLearn about #eMining#n.#l\r\n#L1#Learn #eMining#n.#k#l")
    if selection == 0:
        sm.sendNext("If you are looking to acquire some ores for yourself, all you need is Mining skill. Refine the ores you collect at one of the forges #p9031006# sells, then use them to craft various useful items.")
    elif selection == 1:
        learn = sm.sendAskYesNo("Do you really want to learn #bMining#k? It will cost you some money... precisely #b5,000,000 Mesos#k.\r\n")
        if learn:
            if sm.getMesos() >= 5000000:
                sm.giveMesos(-5000000)
                sm.giveSkill(MINING_SKILL, 0x1000000, 10)
                sm.playSound("skill/levelup")
                sm.sendNext("All set! This is what it means to have the basics of Mining. Increase your Mastery, and I'll teach you even more.")
            else:
                sm.sendNext("You don't have enough Mesos. I require #b5,000,000 Mesos#k for my students, no exceptions.")
                #sm.dispose()
        else:
            sm.sendNext("Thinking it over is good. Come back after you've given it some thought.")
else:
    selection = sm.sendSay("What can I do for you today?\r\n#L2##bLevel up #eMining#n.#l\r\n#L3##bTrade #t4011010#.#k#l")
    if selection == 2:
        if sm.isAbleToLevelUpMakingSkill(MINING_SKILL):
            levelup = sm.sendAskYesNo("It seems you are ready to level up your Mining skill. I'll charge you #b" + str(FEE[sm.getMakingSkillLevel(MINING_SKILL)]) + " Mesos#k for the tuition fee. Ready to train?")
            if levelup:
                if sm.getMesos() >= FEE[sm.getMakingSkillLevel(MINING_SKILL)]:
                    sm.giveMesos(-FEE[sm.getMakingSkillLevel(MINING_SKILL)])
                    sm.makingSkillLevelUp(MINING_SKILL)
                    sm.sendNext("Your Mining skill is now Lv. " + str(sm.getMakingSkillLevel(MINING_SKILL)) + ".")
                else:
                    sm.sendNext("You don't have enough mesos.")
                    #sm.dispose()
            else:
                sm.sendNext("Are you sure? Take some time to think it over. I'll be here.")
                #sm.dispose()
        else:
            sm.sendNext("You're not ready to level up your profession yet. Come back after you've increased your Mastery.")
    elif selection == 3:
        sm.sendSayOkay("#b100 #t4011010#s#k can be exchanged for 1 #i2028067:##b#t2028067##k. Keep mining #t4011010#s.")
