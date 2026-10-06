# Hidden Street - Ardentmill :: 910001000
# Intaglio :: Master of Accessory Crafting :: 9031004

MINING_SKILL = 92010000
SMITHING_CRAFT_SKILL = 92020000
ACCESSORY_CRAFT_SKILL = 92030000
ALCHEMY_CRAFT_SKILL = 92040000
FEE = [500000, 1500000, 2500000, 4000000, 6000000, 8500000, 11500000, 15000000, 19000000, 23500000]

if not sm.hasSkill(ACCESSORY_CRAFT_SKILL):
    selection = sm.sendSay("Shining brilliance! Pure essence combined! The elegance of form! Are you also a master of jewelry crafting, my friend? Let us together uncover the secrets of accessory crafting!\r\n#L0#Hear an explanation about #b#eAccessory Crafting#n.#l\r\n#L1#Learn #eAccessory Crafting#n.#k#l")
    if selection == 0:
        sm.sendNext("Begin with basics, begin with basics? I could tell you about the vast elegance of accessories, but... there may be some mystery left to it.\r\nIn short, Accessory Crafting is the art of taking a rough gemstone or raw mineral and shaping it until it radiates its true beauty. Even the simplest rough gem can be powerful yet refined.")
    elif selection == 1:
        if not sm.hasSkill(MINING_SKILL):
            sm.sendSayOkay("Oh no. You absolutely MUST learn Mining from #bCole#k before I can train you to become a jeweler. He will teach you how to extract the minerals and gems needed to create shiny accessories.")
        if sm.hasSkill(SMITHING_CRAFT_SKILL) or sm.hasSkill(ALCHEMY_CRAFT_SKILL):
            sm.sendNext("Don’t you know you can’t learn Accessory Crafting if you’ve already studied Smithing and Alchemy? All you need to do is remove one of your current professions, and we can start on Accessory Crafting!")
        learn = sm.sendAskYesNo("Oh, are you ready to learn #bAccessory Crafting#k? Since you’re such an excellent prospect, I’ll offer a discount: #b5,000,000 Mesos#k to become my student.")
        if learn:
            if sm.getMesos() >= 5000000:
                sm.giveMesos(-5000000)
                sm.giveSkill(ACCESSORY_CRAFT_SKILL, 0x1000000, 13)
                sm.playSound("skill/levelup")
                sm.sendNext("Oh! Wonderful! Here’s how you practice Accessory Crafting. Train, train, train, and once you reach the Master level, I’ll teach you even more.")
            else:
                sm.sendNext("You don’t have #b5,000,000 Mesos#k? I wish I could, but I can’t teach you for free.")
        else:
            sm.sendNext("Huh? Why not?! I was so looking forward to sharing my knowledge with you!")
else:
    selection = sm.sendSay("Shining brilliance! Pure essence combined! The elegance of form! Are you also a master of jewelry crafting, my friend? Let us together uncover the secrets of accessory crafting!\r\n#L2#Upgrade #eAccessory Crafting#n to Level.#l\r\n#L3#Forget accessory crafting.#k#l")
    if selection == 2:
        if sm.isAbleToLevelUpMakingSkill(ACCESSORY_CRAFT_SKILL):
            levelup = sm.sendAskYesNo("It seems you’re ready to upgrade your Accessory Crafting skill. I will charge #b" + str(FEE[sm.getMakingSkillLevel(ACCESSORY_CRAFT_SKILL)]) + " Mesos#k as a tuition fee. Ready to train?")
            if levelup:
                if sm.getMesos() >= FEE[sm.getMakingSkillLevel(ACCESSORY_CRAFT_SKILL)]:
                    sm.giveMesos(-FEE[sm.getMakingSkillLevel(ACCESSORY_CRAFT_SKILL)])
                    sm.makingSkillLevelUp(ACCESSORY_CRAFT_SKILL)
                    sm.sendNext("Your Accessory Crafting skill is now Lv. " + str(sm.getMakingSkillLevel(ACCESSORY_CRAFT_SKILL)) + ".")
                else:
                    sm.sendNext("You don’t have enough mesos.")
            else:
                sm.sendNext("Sure, take some time to think about it. I’ll be here.")
        else:
            sm.sendNext("Oh, it seems you’re not quite ready to upgrade your skill level yet.")
    elif selection == 3:
        unlearn = sm.sendAskYesNo("Do you wish to remove Accessory Crafting? Have you grown tired of me? All the effort you put into advancing and mastering this skill will be lost... all of it... Are you really sure about this?")
        if unlearn:
            sm.removeSkill(ACCESSORY_CRAFT_SKILL)
            sm.sendNext("It has been reset... You are so cold... But if you change your mind, I’ll be here.")
        else:
            sm.sendSayOkay("Oh, thank you, thank you, thank you!")