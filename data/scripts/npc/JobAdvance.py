EXPLORER = 2470018
EXPLORER2 = 1540828


#SENGOKU
KANNA = 9400033
HAYATO = 9400032
#NOVA


JETT = 9400034
TEMP = 1540828





Job = sm.getChr().getJob()
Level = chr.getLevel()
Req_Level_1stJob = 10
Req_Level_2ndJob = 30
Req_Level_3rdJob = 60
Req_Level_4thJob = 100
sm.removeEscapeButton()

if (3200 <= Job <= 3212):
    sm.setSpeakerID(BATTLE_MAGE)
    sm.setBoxChat()
if (3300 <= Job <= 3312):
    sm.setSpeakerID(WILD_HUNTER)
    sm.setBoxChat()
if (3500 <= Job <= 3512):
    sm.setSpeakerID(MECHANIC)
    sm.setBoxChat()
if (3700 <= Job <= 3712):
    sm.setSpeakerID(CLAUDIN)
    sm.setBoxChat()






else:
    sm.flipSpeaker()
    sm.sendSayOkay("#eYou may not advance at the current state.")


        

            