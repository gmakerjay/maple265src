# Hidden Street - Ardentmill :: 910001000
# Gere :: Master of Smithing :: 9031003

MINING_SKILL = 92010000
SMITHING_CRAFT_SKILL = 92020000
ACCESSORY_CRAFT_SKILL = 92030000
ALCHEMY_CRAFT_SKILL = 92040000
FEE = [500000, 1500000, 2500000, 4000000, 6000000, 8500000, 11500000, 15000000, 19000000, 23500000]

if not sm.hasSkill(SMITHING_CRAFT_SKILL):
    selection = sm.sendSay("I am #bGere#k, the master blacksmith. What do you want?\r\n#L0#Hear about #b#eSmithing#n.#l\r\n#L1#Learn #eSmithing#n.#k#l")
    if selection == 0:
        sm.sendNext("Smithing is the art of forging the minerals and gems you've obtained through Mining into powerful armor and weapons. I’ll show you how to turn these raw materials into equipment you’ve never seen before.")
    elif selection == 1:
        if not sm.hasSkill(MINING_SKILL):
            sm.sendSayOkay("How do you plan to learn Smithing if you don’t know Mining? Seek out #bCole#k and learn what he has to teach. After that, you may be ready.")

        if sm.hasSkill(ACCESSORY_CRAFT_SKILL) or sm.hasSkill(ALCHEMY_CRAFT_SKILL):
            sm.sendNext("It seems you’ve already learned Accessory Crafting or Alchemy. Your hands may be a bit full, don’t you think? If you really want to learn Smithing, you need to forget one of your other professions.")

        learn = sm.sendAskYesNo("Do you want to learn #bSmithing#k? Show me how serious you are by putting down some money!\r\n That will be #b5,000,000 Mesos#k... Are you really ready to do this?\r\n")
        if learn:
            if sm.getMesos() >= 5000000:
                sm.giveMesos(-5000000)
                sm.giveSkill(SMITHING_CRAFT_SKILL, 0x1000000, 13)
                sm.playSound("skill/levelup")
                sm.sendNext("Honestly, I didn't think you could learn Smithing. Well, you've now unlocked the basic skill level. If you want to gain further mastery, I can teach you even more.")
            else:
                sm.sendNext("If you’re not even able to gather #b5,000,000 Mesos#k, how do you hope to become a blacksmith?")
        else:
            sm.sendNext("Being cautious is good. Come back after you’ve given it some thought.")
else:
    selection = sm.sendSay("I am #bGere#k, the master blacksmith. What do you want?\r\n#L2##bUpgrade #eSmithing#n to the next level.#l\r\n#L3#Forget Smithing.#k#l")
    if selection == 2:
        if sm.isAbleToLevelUpMakingSkill(SMITHING_CRAFT_SKILL):
            levelup = sm.sendAskYesNo("It seems you’re ready to upgrade your Smithing skill. I’ll charge #b" + str(FEE[sm.getMakingSkillLevel(SMITHING_CRAFT_SKILL)]) + " Mesos#k as a tuition fee. Ready to train?")
            if levelup:
                if sm.getMesos() >= FEE[sm.getMakingSkillLevel(SMITHING_CRAFT_SKILL)]:
                    sm.giveMesos(-FEE[sm.getMakingSkillLevel(SMITHING_CRAFT_SKILL)])
                    sm.makingSkillLevelUp(SMITHING_CRAFT_SKILL)
                    sm.sendNext("Your Smithing skill is now Lv. " + str(sm.getMakingSkillLevel(SMITHING_CRAFT_SKILL)) + ".")
                else:
                    sm.sendNext("You don’t have enough mesos.")
            else:
                sm.sendNext("Take some time to think it over. I’ll be here.")
        else:
            sm.sendNext("You’re not ready to upgrade your profession yet. Come back after increasing your Mastery.")
    elif selection == 3:
        unlearn = sm.sendAskYesNo("You will forget everything I've taught you about Smithing. All the hard work you’ve put in will be erased. Are you really sure you want to do this?")
        if unlearn:
            sm.removeSkill(SMITHING_CRAFT_SKILL)
            sm.sendNext("Very well. You’re no longer a blacksmith.")
        else:
            sm.sendSayOkay("Indeed, it would be a shame to lose all the skills you've gained.")