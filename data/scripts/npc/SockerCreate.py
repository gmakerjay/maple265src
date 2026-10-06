from net.swordie.ms.enums import UIType

NEBULITE_FUSION = 80001152

sm.setSpeakerID(9010038)
sel = sm.sendNext("I am Bo, the greatest socket master in the world! I am also the only specialist on alien technology! "
                  "Sockets are my specialty, and with them, I can infuse your items with powerful Nebulites!\r\n"
                  "#L0##bWhat exactly are sockets?#l\r\n"
                  "#L1#What are Nebulites?#l\r\n"
                  "#L2#I want a socket! Can I get one?#l\r\n"
                  "#L3#I want to fuse Nebulites.#l\r\n"
                  "#L4#Unlock a socket on my equipment.#l\r\n"
                  "#L5#Insert a Nebulite into my equipment.#l\r\n"
                  "#L6#Remove a Nebulite from my equipment.#k")

if sel == 0:
    sm.sendPrev("The alien Socket system is a way to enhance your weapons and armor. "
                "To upgrade, you need a socket on your equipment. If your item has no socket, you can't upgrade it.\r\n"
                "#e#bA socket is essentially an empty slot on an item!#k#n")
elif sel == 1:
    sm.sendPrev("#e#bNebulites#k#n are upgrade stones that can be found from various monsters, each with different strengths "
                "and levels: #e#bS #v3064000#, A #v3063000#, B #v3062000#, C #v3061000#, or D #v3060000##n#k.\r\n\r\n"
                "You can use Nebulites in two ways: Upgrade or Insert them into your equipment. You can upgrade and "
                "reset Nebulites using an #bAlien Cube#k (cash item). Each Alien Cube comes with an Alien Diffuser piece. "
                "Collect 10 to receive a #bNebulite Diffuser#k, which allows you to remove Nebulites and reset sockets.")
elif sel == 2:
    if sm.getMesos() >= 5000:
        if sm.canHold(2930000):
            sm.giveMesos(-5000)
            sm.giveItem(2930000)
            sm.sendSayOkay("Use it wisely!")
        else:
            sm.sendSayOkay("Please free up some space in your USE inventory.")
    else:
        sm.sendSayOkay("What? You don’t have 5,000 mesos? I can't give #t2930000# for free!")
elif sel == 3:
    sm.nebuliteFusion()  # Opens the Nebulite fusion interface
elif sel == 4:
    sm.nebuliteUnlock()  # Unlocks a socket on the item
elif sel == 5:
    sm.nebuliteInsert()  # Inserts a Nebulite into an item socket
elif sel == 6:
    sm.nebuliteDelete()  # Removes a Nebulite from an item socket
