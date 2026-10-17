from net.swordie.ms.world.boss import BossEntry
from net.swordie.ms.enums import BossPartyType

# Dr. Zindelblarp (닥터 진델블라프) / Caoong Entrance [2052044]
sm.setSpeakerID(2052044)
sm.setBoxChat()

text = "#e[Omega Sector: OMNI-CLN Battle]#n\r\n"
text += "Greetings, traveler! I am #bDr. Zindelblarp#k.\r\n"
text += "The giant cleaner robot #rOMNI-CLN#k has malfunctioned and is on a rampage in the air duct!\r\n\r\n"
text += "Will you venture inside to take it down?\r\n\r\n"
text += "#b#L0#Enter OMNI-CLN Battle (Normal - Lv. 180+)#l\r\n"
text += "#L1#I need more time to prepare.#l"

choice = sm.sendNext(text)
if choice == 0:
    BossEntry.enter(chr, BossPartyType.OMNI_CLN_NORMAL, False)
