# Grandpa Luo (1012103) | Mu Lung Hair Salon (250000003)
# 32000 - 32990

from net.swordie.ms.loaders import StringData

options = []

al = chr.getAvatarData().getAvatarLook()
hairColour = al.getHair() % 10
baseID = 32000

for i in range(0, 1000, 10):
    hair = baseID + i + hairColour
    if not StringData.getItemStringById(hair) is None:
        options.append(hair)

answer = sm.sendAskAvatar("Choose your new hairstyle!", False, False, options)

if answer < len(options):
    if sm.getMesos() >= 5000000:
        sm.deductMesos(5000000)
        sm.changeCharacterLook(options[answer])
    else:
        sm.sendSayOkay("You don't have enough 5,000,000 mesos to change your look!")
