# Botoxie (2150005) | Edelstein (310000000)

from net.swordie.ms.loaders import StringData

options = []

al = chr.getAvatarData().getAvatarLook()
faceColour = al.getFace() % 1000 - al.getFace() % 100

if al.getGender() == 0:
    baseID = 23000
else:
    baseID = 24000

for i in range(100):
    face = baseID + faceColour + i
    if not StringData.getItemStringById(face) is None:
        options.append(face)

answer = sm.sendAskAvatar("With our specialized machine, you can see the results of your potential treatment in advance. What kind of Faces would you like to wear? Please choose the style of your liking.", False, False, options)

if answer < len(options):
    if sm.getMesos() >= 5000000:
        sm.deductMesos(5000000)
        sm.changeCharacterLook(options[answer])
    else:
        sm.sendSayOkay("You don't have enough 5,000,000 mesos to change your look!")
