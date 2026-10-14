# Ollie - Esfera Daily Quest & Symbol Manager
from net.swordie.ms.scripts import ScriptType

NPC_ID = 3003530
START_QUEST = 38470
SUB_QUESTS = [38471, 38472, 38473]
SYMBOL_ID = 1712006
COUPON_ID = 2635509
STORY_QUEST_ID = 37871
STORY_QUESTS = list(range(34560, 34586)) + list(range(37851, 37872))
REGION_NAME = "Esfera"
GREETING_TEXT = "Hello, #h0#! I am Ollie, Knight of Cygnus stationed here at Esfera."

sm.setSpeakerID(NPC_ID)

# Check if any subquest is complete and ready to turn in
completedSubQuest = None
for qid in SUB_QUESTS:
    if sm.hasQuest(qid) and sm.isQuestComplete(qid):
        completedSubQuest = qid
        break

storylineCompleted = sm.hasQuestCompleted(STORY_QUEST_ID)

options = []
if completedSubQuest is not None:
    greeting = "Great job, #h0#! The reconnaissance on " + REGION_NAME + " went smoothly.\r\n\r\n"
    options.append(("Turn in today's " + REGION_NAME + " daily research.", "turnin"))
    options.append(("Exchange Arcane Symbol Selector Coupons.", "coupon"))
    if not storylineCompleted:
        options.append(("[Express Skip] Complete " + REGION_NAME + " storyline and receive Lv. 1 Arcane Symbol.", "skip"))
    options.append(("Receive Arcane Symbol: " + REGION_NAME + ".", "symbol"))
elif any(sm.hasQuest(qid) for qid in SUB_QUESTS):
    greeting = "You are currently carrying out " + REGION_NAME + " Research Orders.\r\nPlease defeat the required monsters and report back before midnight!\r\n\r\n"
    options.append(("Exchange Arcane Symbol Selector Coupons.", "coupon"))
    if not storylineCompleted:
        options.append(("[Express Skip] Complete " + REGION_NAME + " storyline and receive Lv. 1 Arcane Symbol.", "skip"))
    options.append(("Receive Arcane Symbol: " + REGION_NAME + ".", "symbol"))
else:
    greeting = GREETING_TEXT + "\r\n\r\n"
    options.append(("Begin today's " + REGION_NAME + " daily research.", "start"))
    options.append(("Exchange Arcane Symbol Selector Coupons.", "coupon"))
    options.append(("Receive Arcane Symbol: " + REGION_NAME + ".", "symbol"))
    if not storylineCompleted:
        options.append(("[Express Skip] Complete " + REGION_NAME + " storyline and receive Lv. 1 Arcane Symbol.", "skip"))

text = greeting
for i, (label, _) in enumerate(options):
    text += "#b#L" + str(i) + "#" + label + "#l\r\n"
text += "#k"

sel = sm.sendNext(text)
if 0 <= sel < len(options):
    action = options[sel][1]
    if action == "turnin":
        sm.startScript(chr, completedSubQuest, "q" + str(completedSubQuest) + "e", ScriptType.Quest)
    elif action == "start":
        sm.startScript(chr, START_QUEST, "q" + str(START_QUEST) + "s", ScriptType.Quest)
    elif action == "coupon":
        sm.startScript(chr, COUPON_ID, "consume_" + str(COUPON_ID), ScriptType.Item)
    elif action == "skip":
        if sm.sendAskYesNo("Would you like to skip the #b" + REGION_NAME + "#k storyline quests?\r\n\r\nAll prequests will be marked as complete, and you will receive your #b#i" + str(SYMBOL_ID) + "# #z" + str(SYMBOL_ID) + "##k (Lv. 1) immediately."):
            if sm.getEmptyInventorySlots(1) < 1:
                sm.sendSayOkay("Please make sure you have at least 1 empty slot in your #bEQUIP#k inventory.")
            else:
                for q in STORY_QUESTS:
                    sm.startQuest(q)
                    sm.completeQuest(q)
                sm.createQuestWithQRValue(34560, "30=h1;31=h1;32=h1;33=h1;40=h0;41=h0;42=h0;44=h0;45=h0;46=h0;47=h0;48=h0;49=h0;50=h0;51=h0;52=h0;53=h0;54=h0;55=h0;56=h0;57=h0;58=h0;77=h0;78=h0;79=h0;80=h0")
                sm.createQuestWithQRValue(37900, "01=h1")
                if not sm.hasItem(SYMBOL_ID):
                    sm.giveSymbol(SYMBOL_ID, 1, STORY_QUEST_ID)
                    sm.sendSayOkay("The " + REGION_NAME + " storyline has been completed!\r\nYou have received your #b#i" + str(SYMBOL_ID) + "# #z" + str(SYMBOL_ID) + "##k (Lv. 1). You may now accept daily quests!")
                else:
                    sm.sendSayOkay("The " + REGION_NAME + " storyline has been completed! You may now accept daily quests!")
    elif action == "symbol":
        if not sm.hasItem(SYMBOL_ID):
            if sm.canHold(SYMBOL_ID, 1):
                sm.giveSymbol(SYMBOL_ID, 1, STORY_QUEST_ID)
                sm.sendSayOkay("Here is your #b#i" + str(SYMBOL_ID) + "# #z" + str(SYMBOL_ID) + "##k!")
            else:
                sm.sendSayOkay("Please free up a slot in your EQUIP inventory.")
        else:
            sm.sendSayOkay("You already have an #b#i" + str(SYMBOL_ID) + "# #z" + str(SYMBOL_ID) + "##k!")
