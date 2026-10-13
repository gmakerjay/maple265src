# Rona - Vanishing Journey Daily Quest & Symbol Manager
NPC_ID = 3003104
START_QUEST = 38450
SUB_QUESTS = [38451, 38452, 38453]
SYMBOL_ID = 1712001
COUPON_ID = 2635509

sm.setSpeakerID(NPC_ID)

# Check if any subquest is complete and ready to turn in
completedSubQuest = None
for qid in SUB_QUESTS:
    if sm.hasQuest(qid):
        q = sm.getQuestById(qid)
        if q != null and q.isComplete(chr):
            completedSubQuest = qid
            break

if completedSubQuest is not None:
    text = "Welcome back, #h0#! Have you finished today's research?\r\n\r\n"
    text += "#b#L0#Turn in today's Vanishing Journey daily research.#l\r\n"
    text += "#L1#Exchange Arcane Symbol Selector Coupons.#l#k"
    sel = sm.sendNext(text)
    if sel == 0:
        sm.startScript(chr, completedSubQuest, "q" + str(completedSubQuest) + "e", ScriptType.Quest)
    elif sel == 1:
        sm.startScript(chr, COUPON_ID, "consume_" + str(COUPON_ID), ScriptType.Item)
elif any(sm.hasQuest(qid) for qid in SUB_QUESTS):
    text = "You are currently investigating the Vanishing Journey.\r\nPlease defeat the required monsters and report back before midnight!\r\n\r\n"
    text += "#b#L0#Exchange Arcane Symbol Selector Coupons.#l\r\n"
    text += "#L1#I need my Arcane Symbol: Vanishing Journey.#l#k"
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
    # Not started or already finished
    text = "Greetings, #h0#! I am Rona, studying the mysterious flow of Erda in the Vanishing Journey.\r\n\r\n"
    text += "#b#L0#Begin today's Vanishing Journey daily research.#l\r\n"
    text += "#L1#Exchange Arcane Symbol Selector Coupons.#l\r\n"
    text += "#L2#Receive Arcane Symbol: Vanishing Journey.#l#k"
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
