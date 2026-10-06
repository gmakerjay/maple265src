# Rare Collection [Tang Dynasty Horseback Riding Doll] (62128)
import time

from net.swordie.ms.loaders import ItemData
from net.swordie.ms.util import FileTime

huiKoonKit = 9310537
horsebackDoll = 4001857
horsebackTotem = 1202173

def generateTotem():
    sm.consumeItem(horsebackDoll)
    timedTotem = ItemData.getItemDeepCopy(horsebackTotem)
    # Expires in 30 days from now
    timedTotem.setDateExpire(FileTime.fromEpochMillis(int(time.time()*1000) + 86400000*30))
    chr.addItemToInventory(timedTotem)

sm.removeEscapeButton()
sm.setNpcBoxChat(huiKoonKit)
sm.sendNext("What are you looking at? You want to buy something?")
sm.setPlayerBoxChat()
sm.sendNext("I found this #eTang Dynasty Horseback Riding Doll#n while hunting!")
sm.setNpcBoxChat(huiKoonKit)
sm.sendNext("If it's what you say it is, you've hit the jackpot! Let me take a look!")

if sm.hasItem(horsebackDoll):
    sm.sendNext("Wait a second... Could this really be...?!")
    sm.setPlayerBoxChat()
    sm.sendNext("It's real, isn't it? It's really a #eHorseback Riding Doll from the Tang Dynasty#n, right?!")
    sm.setNpcBoxChat(huiKoonKit)
    sm.sendNext("I'm pretty sure they sell these knockoffs at the museum gift shop. \r\nYou did try really hard, so I'll make it into something useful.")
    sm.sendNext(''.join(["Here you go. It's a #i", repr(horsebackTotem), "# #z", repr(horsebackTotem), "#!"]))
    if sm.canHold(horsebackTotem):
        sm.completeQuestNoRewards(parentID)
        generateTotem()
        sm.setPlayerBoxChat()
        sm.sendNext("...")
        sm.setNpcBoxChat(huiKoonKit)
        sm.sendSayOkay("Ha, kidding, kidding. Now you get back out there, and if you find something rare, you bring it to ME, got it?")
    else:
        sm.sendSayOkay("Hm...Can you make some space in your Equip inventory first, just in case?")
