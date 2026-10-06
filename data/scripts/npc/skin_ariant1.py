# Lila (2100007) | Ariant (260000000)

options = []
#These values will crash the client when attempting to load them onto character
nullSkins = [6, 7, 8]

for skin in range(14):
    #Skip past null skin values
    if skin in nullSkins:
        continue
    options.append(skin)

answer = sm.sendAskAvatar("We have the latest in beauty equipment."
"With our technology, you can preview what your skin will look like in advance!"
"Which treatment would you like?", False, False, options)
if answer < len(options):
    if sm.getMesos() >= 5000000:
        sm.deductMesos(5000000)
        sm.changeCharacterLook(options[answer])
    else:
        sm.sendSayOkay("You don't have enough 5,000,000 mesos to change your look!")
