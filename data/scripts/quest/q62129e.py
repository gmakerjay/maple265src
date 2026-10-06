# Rare Collection [Qing Dynasty Jade Kettle] (62129)
import time

from net.swordie.ms.loaders import ItemData
from net.swordie.ms.util import FileTime

huiKoonKit = 9310537
jadeKettle = 4001858
kettleTotem = 1202174

def generateTotem():
    sm.consumeItem(jadeKettle)
    timedTotem = ItemData.getItemDeepCopy(kettleTotem)
    # Expires in 30 days from now
    timedTotem.setDateExpire(FileTime.fromEpochMillis(int(time.time()*1000) + 86400000*30))
    chr.addItemToInventory(timedTotem)

sm.removeEscapeButton()
sm.setNpcBoxChat(huiKoonKit)
sm.sendNext("What are you looking at? You want to buy something?")
sm.setPlayerBoxChat()
sm.sendNext("I picked up this #eQing Dynasty Jade Kettle#n while hunting!")
sm.setNpcBoxChat(huiKoonKit)
sm.sendNext("If it's what you say it is, you've hit the jackpot! Let me take a look!")

if sm.hasItem(jadeKettle):
    sm.sendNext("Wait a second... Could this really be...?!")
    sm.setPlayerBoxChat()
    sm.sendNext("It's authentic, isn't it? It's a #eJade Kettle from the great Qing Empire#n, right?!")
    sm.setNpcBoxChat(huiKoonKit)
    sm.sendNext("I think this is a knockoff kettle from the traditional eatery on Nanjing Road. Don't feel too bad. That place is delicious. And I'll make it into something useful...")
    sm.sendNext(''.join(["Here you go. I made it into a #i", repr(kettleTotem), "# #z", repr(kettleTotem), "#!"]))
    if sm.canHold(kettleTotem):
        sm.completeQuestNoRewards(parentID)
        generateTotem()
        sm.setPlayerBoxChat()
        sm.sendNext("...")
        sm.setNpcBoxChat(huiKoonKit)
        sm.sendSayOkay("Ha, kidding, kidding. Now you get back out there, and if you find something rare, you bring it to ME, got it?")
    else:
        sm.sendNext("Hm...Can you make some space in your Equip inventory first, just in case?")