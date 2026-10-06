from net.swordie.ms.constants import EventConstants
from net.swordie.ms.loaders import ItemData
from net.swordie.ms.util import FileTime
from java.lang import System
import time
import datetime

red_leaf_high_items = [
    [4000610, 100], #100 Big Spider Antenna
    [4000271, 100], #100 Destroyed Nest
    [4000622, 100], #100 Blue Pig's Ribbon
    [4000673, 100], #100 Grassy Mud Clump
    [4000327, 100], #100 Ragged Scarves
    [4000654, 100], #100 Dawn Pendants
    [4000655, 100], #100 Blaze Pendants
    [4000656, 100], #100 Night Pendants
    [4000657, 100], #100 Wind Pendants
    [4000658, 100], #100 Thunder Pendants
]

sengoku_pass = 4033766

def getDayFromLong(value):
    return int(datetime.datetime.fromtimestamp(value / 1000).strftime('%d'))

def isEnoughTime(quest):
    currentDay = getDayFromLong(System.currentTimeMillis())
    qrValue = sm.getQRValue(quest)
    if qrValue == "Quest is Null":
        return 1
    else:
        oldDay = getDayFromLong(long(sm.getQRValueByKey(quest, "time")))
        if oldDay != currentDay:
            return 2
        else:
            return 0

def isEnoughItems(items):
    result = True
    for item in items:
        if not sm.hasItem(item[0], item[1]):
            result = False
            break
    return result

def consumeItems(items):
    for item in items:
        sm.consumeItem(item[0], item[1])

def getMinuteLeft():
    day = datetime.datetime.fromtimestamp(System.currentTimeMillis() / 1000)
    today_hour = int(day.strftime("%H"))
    today_minute = int(day.strftime("%M"))
    return 1440 - (today_hour * 60 + today_minute)

def onRedLeafHighDaily():
    qrValue = sm.getQRValue(EventConstants.RED_LEAF_HIGH_MOB_KILLS_RECORD)
    if qrValue == "Quest is Null":
        sm.createQuestWithQRValue(EventConstants.RED_LEAF_HIGH_MOB_KILLS_RECORD, "time=" + str(System.currentTimeMillis()) + ";8642002=0")
        chr.saveToSQL()
    if not sm.hasQuestCompleted(EventConstants.RED_LEAF_HIGH_MOB_KILLS_RECORD):
        currentProcess = int(sm.getQRValueByKey(EventConstants.RED_LEAF_HIGH_MOB_KILLS_RECORD, "8642002"))
        dialog = "#e#r[RED LEAF HIGH]#k#n\r\n\r\n"
        dialog += "#e1. Please defeat the following monsters:#n\r\n\r\n"
        dialog += "\t#e- #o8642002# #b(%s/200)#k#n\r\n\r\n" % (currentProcess)
        dialog += "#e2. Please collect the following items and bring them to me:#n\r\n\r\n"
        for item in red_leaf_high_items:
            dialog += "\t#e- #z%s# #b(#c%s#/%s)#k#n\r\n" % (item[0], item[0], item[1])
        dialog += "\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n\t#e#i%s# #z%s# x 2.#n" % (sengoku_pass, sengoku_pass)
        if sm.sendAskAccept(dialog):
            if sm.getEmptyInventorySlots(4) >= 1 and currentProcess >= 200:
                if isEnoughItems(red_leaf_high_items):
                    consumeItems(red_leaf_high_items)
                    item = ItemData.getItemDeepCopy(sengoku_pass)
                    item.setQuantity(2)
                    item.setDateExpire(FileTime.fromEpochMillis(int(time.time()*1000) + 86400000*1))
                    chr.addItemToInventory(item)
                    sm.completeQuestNoRewards(EventConstants.RED_LEAF_HIGH_MOB_KILLS_RECORD)
                else:
                    sm.sendNext("You don't have enough items to complete the quest.")
            else:
                sm.sendSayOkay("Please check if there is enough space in your ETC inventory.")
        else:
            sm.sendSayOkay("Come back later.")

if EventConstants.RED_LEAF_HIGH_EVENT and chr.getLevel() >= 215:
    if sm.hasQuestCompleted(EventConstants.RED_LEAF_HIGH_MOB_KILLS_RECORD):
        if isEnoughTime(EventConstants.RED_LEAF_HIGH_MOB_KILLS_RECORD) == 2:
            sm.deleteQuest(EventConstants.RED_LEAF_HIGH_MOB_KILLS_RECORD)
            sm.deleteQuest(EventConstants.RED_LEAF_HIGH_RECORD)
            onRedLeafHighDaily()
        else:
            timeLeft = getMinuteLeft()
            response = sm.sendAskYesNo("You have completed the quest for today, please come back tomorrow.\r\nTime remaining: " + str(timeLeft) + " minutes.\r\n\r\nWould you like to visit #b#m"+ str(744000020) +"##k?")
            if response:
                sm.warp(744000020, 0)
    else:
        onRedLeafHighDaily()
else:
    chrLevel = chr.getLevel()
    sm.sendSayOkay("You are not at least level 215 (Your level is: " + str(chrLevel) + ") to participate in the #e#rRed Leaf High#k#n event.")