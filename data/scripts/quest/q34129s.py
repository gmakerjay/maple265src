from net.swordie.ms.constants import QuestConstants
from datetime import datetime

sm.setSpeakerID(3003104)

questID = QuestConstants.VANISHING_JOURNEY_DAILY_QUEST
count = QuestConstants.VANISHING_JOURNEY_DAILY_QUEST_COUNT
quest = chr.getAccount().getQuestById(questID)

def accept():
    now = datetime.now()
    sm.setQuestStatus(questID, 1)
    sm.setQRValueByKey(questID, "date", str(now.strftime("%y/%m/%d")))
    sm.createQuestWithQRValue(count, "count=0")
    sm.startQuest(int(sm.getQRValueByKey(questID, "q1")))
    sm.startQuest(int(sm.getQRValueByKey(questID, "q2")))
    sm.startQuest(int(sm.getQRValueByKey(questID, "q3")))
    sm.startQuest(int(sm.getQRValueByKey(questID, "q4")))
    sm.startQuest(int(sm.getQRValueByKey(questID, "q5")))
    sm.sendSayOkay("Come to me when you've finished your missions. Remember, you have to turn them in before midnight. Well then, see you later.")

def random(selection):
    if selection == 0:
        sm.setQRValueByKey(questID, "q1", str(sm.randomDailyQuest(questID, selection)))
    elif selection == 1:
        sm.setQRValueByKey(questID, "q2", str(sm.randomDailyQuest(questID, selection)))
    elif selection == 2:
        sm.setQRValueByKey(questID, "q3", str(sm.randomDailyQuest(questID, selection)))
    elif selection == 3:
        sm.setQRValueByKey(questID, "q4", str(sm.randomDailyQuest(questID, selection)))
    elif selection == 4:
        sm.setQRValueByKey(questID, "q5", str(sm.randomDailyQuest(questID, selection)))

if quest is None:
    chr.initDailyQuestSymbol()
if sm.sendAskAccept("Hi, #h0#. I have 5 missions for you today. Would you like to take care of them now? If there is a mission you don't like, you can press the Exchange button to trade it for something else.\r\n\r\n#e#b " + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q1"))) + " \r\n " + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q2"))) + " \r\n " + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q3"))) + " \r\n " + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q4"))) + " \r\n " + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q5"))) + " #k#n"):
    accept()
else:
    if sm.sendAskYesNo("Is there a mission on the list you aren't up for? Why not Exchange it for another one?\r\n\r\n#b(You can swap out the missions of your choice, but it is possible to receive the same missions as the one being exchanged.)#k"):
        sel = sm.sendNext("Select the mission you would like to replace.\r\n\r\n"
        + "#b"
        + "#L0# " + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q1"))) + " #l\r\n"
        + "#L1# " + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q2"))) + " #l\r\n"
        + "#L2# " + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q3"))) + " #l\r\n"
        + "#L3# " + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q4"))) + " #l\r\n"
        + "#L4# " + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q5"))) + " #l"
        + "#k")
            
        if sel == 0:
            random(sel)
            if sm.sendAskAccept("All right. To replace the 1 mission you don't want, I've found 1 new mission. Here are your 5 tasks for today.\r\n\r\n"
            + "#b"
            + "#e"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q1"))) + " #r[NEW]#k#l\r\n"
            + "#n"
            + "#b"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q2"))) + " \r\n"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q3"))) + " \r\n"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q4"))) + " \r\n"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q5")))
            + "#k"):
                accept()
        elif sel == 1:
            random(sel)
            if sm.sendAskAccept("All right. To replace the 1 mission you don't want, I've found 1 new mission. Here are your 5 tasks for today.\r\n\r\n"
            + "#b"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q1"))) + " \r\n"
            + "#e"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q2"))) + " #r[NEW]#k\r\n"
            + "#n"
            + "#b"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q3"))) + " \r\n"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q4"))) + " \r\n"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q5")))
            + "#k"):
                accept()
        elif sel == 2:
            random(sel)
            if sm.sendAskAccept("All right. To replace the 1 mission you don't want, I've found 1 new mission. Here are your 5 tasks for today.\r\n\r\n"
            + "#b"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q1"))) + " \r\n"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q2"))) + " \r\n"
            + "#e"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q3"))) + " #r[NEW]#k\r\n"
            + "#n"
            + "#b"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q4"))) + " \r\n"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q5")))
            + "#k"):
                accept()
        elif sel == 3:
            random(sel)
            if sm.sendAskAccept("All right. To replace the 1 mission you don't want, I've found 1 new mission. Here are your 5 tasks for today.\r\n\r\n"
            + "#b"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q1"))) + " \r\n"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q2"))) + " \r\n"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q3"))) + " \r\n"
            + "#e"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q4"))) + " #r[NEW]#k\r\n"
            + "#n"
            + "#b"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q5")))
            + "#k"):
                accept()
        elif sel == 4:
            random(sel)
            if sm.sendAskAccept("All right. To replace the 1 mission you don't want, I've found 1 new mission. Here are your 5 tasks for today.\r\n\r\n"
            + "#b"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q1"))) + " \r\n"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q2"))) + " \r\n"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q3"))) + " \r\n"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q4"))) + " \r\n"
            + "#e"
            + str(sm.getQuestNameByQuestId(sm.getQRValueByKey(questID, "q5"))) + " #r[NEW]#k"
            + "#n"
            + "#k"):
                accept()