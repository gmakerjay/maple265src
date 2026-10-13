# Gray Mask - Lachelein Daily Quest & Symbol Manager
NPC_ID = 3003209
START_QUEST = 38458
SUB_QUESTS = [38459, 38460, 38461]
SYMBOL_ID = 1712003
COUPON_ID = 2635509

sm.setSpeakerID(NPC_ID)

completedSubQuest = None
for qid in SUB_QUESTS:
    if sm.hasQuest(qid):
        q = sm.getQuestById(qid)
        if q != null and q.isComplete(chr):
            completedSubQuest = qid
            break

if completedSubQuest is not None:
    text = "The festival is calming down thanks to your efforts, #h0#.\r\n\r\n"
    text += "#b#L0#Turn in today's Lachelein daily research.#l\r\n"
    text += "#L1#Exchange Arcane Symbol Selector Coupons.#l#k"
    sel = sm.sendNext(text)
    if sel == 0:
        sm.startScript(chr, completedSubQuest, "q" + str(completedSubQuest) + "e", ScriptType.Quest)
    elif sel == 1:
        sm.startScript(chr, COUPON_ID, "consume_" + str(COUPON_ID), ScriptType.Item)
elif any(sm.hasQuest(qid) for qid in SUB_QUESTS):
    text = "You are currently working to bring peace to Lachelein.\r\nPlease defeat the required monsters and report back before midnight!\r\n\r\n"
    text += "#b#L0#Exchange Arcane Symbol Selector Coupons.#l\r\n"
    text += "#L1#I need my Arcane Symbol: Lachelein.#l#k"
    sel = sm.sendNext(text)
    if sel == 0:
        sm.startScript(chr, COUPON_ID, "consume_" + str(COUPON_ID), ScriptType.Item)
    elif sel == 1:
        if not sm.hasItem(SYMBOL_ID):
            if sm.canHold(SYMBOL_ID, 1):
                sm.giveSymbol(SYMBOL_ID, 1)
                sm.sendSayOkay("Here is your #b#i" + str(SYMBOL_ID) + "# #z" + str(SYMBOL_ID) + "##k!")
            else:
                sm.sendSayOkay("Please free up a slot in your EQUIP inventory.")
        else:
            sm.sendSayOkay("You already have an #b#i" + str(SYMBOL_ID) + "# #z" + str(SYMBOL_ID) + "##k!")
else:
    text = "Greetings, #h0#. I am the Gray Mask, seeking quiet in the Dreaming City of Lachelein.\r\n\r\n"
    text += "#b#L0#Begin today's Lachelein daily research.#l\r\n"
    text += "#L1#Exchange Arcane Symbol Selector Coupons.#l\r\n"
    text += "#L2#Receive Arcane Symbol: Lachelein.#l#k"
    sel = sm.sendNext(text)
    if sel == 0:
        sm.startScript(chr, START_QUEST, "q" + str(START_QUEST) + "s", ScriptType.Quest)
    elif sel == 1:
        sm.startScript(chr, COUPON_ID, "consume_" + str(COUPON_ID), ScriptType.Item)
    elif sel == 2:
        if not sm.hasItem(SYMBOL_ID):
            if sm.canHold(SYMBOL_ID, 1):
                sm.giveSymbol(SYMBOL_ID, 1)
                sm.sendSayOkay("Here is your #b#i" + str(SYMBOL_ID) + "# #z" + str(SYMBOL_ID) + "##k!")
            else:
                sm.sendSayOkay("Please free up a slot in your EQUIP inventory.")
        else:
            sm.sendSayOkay("You already have an #b#i" + str(SYMBOL_ID) + "# #z" + str(SYMBOL_ID) + "##k!")
