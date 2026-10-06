#Sensittive Squaroid - AbsoLab Coin Exchange
#npc_2155009

DIFFUSION_LINE_ENERGY_CORE = 4001842
EXTRAORDIAARY_ENERGY_CORE = 4001843
ABSOLAB_COIN = 4310156

REQUIRED_DIFFUSION_LINE_ENERGY_CORE = 20
REQUIRED_EXTRAORDIAARY_ENERGY_CORE  = 1

sm.flipSpeaker()
selection = sm.sendNext("Give me 20 #i4001842# #z4001842# \r\nitems and 1 #i4001843# #z4001843#, \r\n I'll give u 1 #i4310156# #z4310156#. Do we have a deal? \r\n"
            "#L0# I want to exchange those to #i4310156# #z4310156##l\r\n#L1# I want to exchange #i4001877# #z4001877# to #i1672082# #z1672082# for 20 days.#l")
if selection == 0:
     if sm.hasItem(DIFFUSION_LINE_ENERGY_CORE,REQUIRED_DIFFUSION_LINE_ENERGY_CORE) and sm.hasItem(EXTRAORDIAARY_ENERGY_CORE,REQUIRED_EXTRAORDIAARY_ENERGY_CORE):
        if not sm.canHold(ABSOLAB_COIN, 1):
               sm.sendSayOkay("Make sure you have space in your inventory.")
        else:
             sm.consumeItem(DIFFUSION_LINE_ENERGY_CORE, REQUIRED_DIFFUSION_LINE_ENERGY_CORE)
             sm.consumeItem(EXTRAORDIAARY_ENERGY_CORE, REQUIRED_EXTRAORDIAARY_ENERGY_CORE)
             sm.giveItem(ABSOLAB_COIN)             
             sm.flipSpeaker()
             sm.sendNext("Thanks #r#h0# #k! Good luck and have fun with it.")
     else:
          say = "You need at least 20 #i4001842# #z4001842# \r\nand 1 #i4001843# #z4001843#.\r\n" + "You only have " + "#r" + "#c4001842# " + "#k" +"#i4001842# #z4001842# \r\n" + " and " + "#r" + "#c4001843#" + "#k" +"#i4001843# #z4001843#"
          sm.sendSayOkay(say)
elif selection == 1:
     if sm.hasItem(4001877,1) and sm.getEmptyInventorySlots(1) >= 1:
        sm.consumeItem(4001877, 1)
        chr.addItemToInventory(1672082, 1, "day", 20)
        sm.flipSpeaker()
        sm.sendNext("Thanks #r#h0# #k! Good luck and have fun with it.")
     else:
          say = "You need at least 1 #i4001877# #z4001877# and 1 EQUIP empty slot."
          sm.sendSayOkay(say)
