# Hidden Street - Ardentmill :: 910001000
# Ally :: Master of Alchemy :: 9031005

HERBALISM_SKILL = 92000000
MINING_SKILL = 92010000
SMITHING_CRAFT_SKILL = 92020000
ACCESSORY_CRAFT_SKILL = 92030000
ALCHEMY_CRAFT_SKILL = 92040000
FEE = [500000, 1500000, 2500000, 4000000, 6000000, 8500000, 11500000, 15000000, 19000000, 23500000]

if not sm.hasSkill(ALCHEMY_CRAFT_SKILL):
    selection = sm.sendSay("Hello. Are you interested in learning Alchemy?\r\n#L0##bHear an explanation about #Alchemy#.#l\r\n#L1#Learn #eAlchemy#.#k#l")
    if selection == 0:
        sm.sendNext("Alchemy is the science of transforming herbs into potions. You can create HP and MP recovery potions, as well as potions that make you stronger—potions like you’ve never experienced before.")
    elif selection == 1:
        if not sm.hasSkill(HERBALISM_SKILL):
            sm.sendSayOkay("You cannot learn Alchemy without first learning Herbalism.")
        if sm.hasSkill(SMITHING_CRAFT_SKILL) or sm.hasSkill(ACCESSORY_CRAFT_SKILL):
            sm.sendNext("You cannot learn Alchemy if you have already learned Smithing and Accessory Crafting. You must forget one of them if you wish to learn Alchemy.")
        learn = sm.sendAskYesNo("Are you sure you want to learn #bAlchemy#k? You will need to pay #b5,000,000 Mesos#k for this course.")
        if learn:
            if sm.getMesos() >= 5000000:
                sm.giveMesos(-5000000)
                sm.giveSkill(ALCHEMY_CRAFT_SKILL, 0x1000000, 13)
                sm.playSound("skill/levelup")
                sm.sendNext("Congratulations! You are now an Alchemist. Brew some potions to increase your Mastery. When you are ready, I’ll teach you more advanced techniques.")
            else:
                sm.sendNext("Umm... I don’t think you have enough money... I’m sorry, but please bring #b5,000,000 Mesos#k.")
        else:
            sm.sendNext("Think carefully before choosing a profession. After all, things like this require effort and time. Come back when you’re ready.")
else:
    selection = sm.sendSay("Hello. Are you interested in learning Alchemy?\r\n#L2#Raise #eAlchemy# level.#l\r\n#L3#Forget Alchemy.#k#l")
    if selection == 2:
        if sm.isAbleToLevelUpMakingSkill(ALCHEMY_CRAFT_SKILL):
            levelup = sm.sendAskYesNo("It seems you’re ready to upgrade your Alchemy skill. I will charge #b" + str(FEE[sm.getMakingSkillLevel(ALCHEMY_CRAFT_SKILL)]) + " Mesos#k as a tuition fee. Ready to train?")
            if levelup:
                if sm.getMesos() >= FEE[sm.getMakingSkillLevel(ALCHEMY_CRAFT_SKILL)]:
                    sm.giveMesos(-FEE[sm.getMakingSkillLevel(ALCHEMY_CRAFT_SKILL)])
                    sm.makingSkillLevelUp(ALCHEMY_CRAFT_SKILL)
                    sm.sendNext("Your Alchemy skill is now Lv. " + str(sm.getMakingSkillLevel(ALCHEMY_CRAFT_SKILL)) + ".")
                else:
                    sm.sendNext("You don’t have enough mesos.")
            else:
                sm.sendNext("Sure, take some time to think about it. I’ll be here.")
        else:
            sm.sendNext("You’re not ready to advance further in Alchemy. Practice more to improve your Mastery.")
    elif selection == 3:
        unlearn = sm.sendAskYesNo("All your knowledge in Alchemy will be erased. Your Alchemy level and Mastery will reset to 0. Are you sure you want to do this?")
        if unlearn:
            sm.removeSkill(ALCHEMY_CRAFT_SKILL)
            sm.sendNext("Your Alchemy skill has been reset. Come back if you want to learn again.")
        else:
            sm.sendSayOkay("Indeed. It would be a shame to lose all the hard work you’ve put in.")
