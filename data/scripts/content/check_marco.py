import random
from net.swordie.ms.connection.packet import AutoBanPacket

sm.removeEscapeButton()
sm.setPlayerAsSpeaker()
a = random.randint(1, 1000)
b = random.randint(1, 1000)
result = sm.sendAskNumber("Please enter the result of the following calculation:\r\n#e#b" + str(a) + " + " + str(b) + " = ?#k#n", 0, 0, 9999)
if result != (a + b):
    sm.sendSayOkay("You entered the wrong result! You will be disconnected immediately!")
    chr.write(AutoBanPacket.send())