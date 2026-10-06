# Salon Seamus (9201016) | Amoria (680000000)

options = []

al = chr.getAvatarData().getAvatarLook()
hairColour = al.getHair() % 10
baseHair = al.getHair() - hairColour

for colour in range(8):
    colourOption = baseHair + colour
    options.append(colourOption)

answer = sm.sendAskAvatar("Choose your new hair colour!", False, False, options)
if answer < len(options):
    if sm.getMesos() >= 5000000:
        sm.deductMesos(5000000)
        sm.changeCharacterLook(options[answer])
    else:
        sm.sendSayOkay("You don't have enough 5,000,000 mesos to change your look!")