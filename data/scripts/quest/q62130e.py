# Rare Collection [Ming Dynasty Bronze Incense Burner] (62130)
import time

from net.swordie.ms.loaders import ItemData
from net.swordie.ms.util import FileTime

huiKoonKit = 9310537
incenseBurner = 4001859
incenseBurnerTotem = 1202175

def generateTotem():
    sm.consumeItem(incenseBurner)
    timedTotem = ItemData.getItemDeepCopy(incenseBurnerTotem)
    # Expires in 30 days from now
    timedTotem.setDateExpire(FileTime.fromEpochMillis(int(time.time()*1000) + 86400000*30))
    chr.addItemToInventory(timedTotem)

sm.removeEscapeButton()
sm.setNpcBoxChat(huiKoonKit)
sm.sendNext("What are you looking at? You want to buy something?")
sm.setPlayerBoxChat()
sm.sendNext("I found this #eMing Dynasty Bronze Incense Burner#n while hunting!")
sm.setNpcBoxChat(huiKoonKit)
sm.sendNext("If it's what you say it is, you've hit the jackpot! Let me take a look!")

if sm.hasItem(incenseBurner):
    sm.sendNext("Wait a second... Could this really be...?!")
    sm.setPlayerBoxChat()
    sm.sendNext("It's real, isn't it? It's a #eBronze Incense Burner from the Ming Dynasty#n, right?!")
    sm.setNpcBoxChat(huiKoonKit)
    sm.sendNext("Well, actually, it appears to be an incense burner from a high-class hotel on the Bund. They use them as decor for their hallways. \r\nDon't be too sad, though. I'll turn it into something useful.")
    sm.sendNext(''.join(["Here you go! I made it into a #i", repr(incenseBurnerTotem), "# #z", repr(incenseBurnerTotem), "#!"]))
    if sm.canHold(incenseBurnerTotem):
        sm.completeQuestNoRewards(parentID)
        generateTotem()
        sm.setPlayerBoxChat()
        sm.sendNext("...")
        sm.setNpcBoxChat(huiKoonKit)
        sm.sendSayOkay("Ha, kidding, kidding. Now you get back out there, and if you find something rare, you bring it to ME, got it?")
    else:
        sm.sendNext("Hm...Can you make some space in your Equip inventory first, just in case?")