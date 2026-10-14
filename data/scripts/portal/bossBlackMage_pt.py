# Black Mage entry portal (Unrestricted Level 1+ Mode: Hard & Extreme)
destinations = [
    ["Hard", 1, 450013100, 12, 8880500, 8880501, 63000000000000],
    ["Extreme", 1, 450013910, 12, 8880530, 8880531, 650000000000000],
]

sm.flipSpeaker()
sm.flipDialoguePlayerAsSpeaker()
sm.setBoxChat()

dialog = "Do you want to head to the #rTemple of Darkness#k to fight the Black Mage?\r\n"

for i in range(len(destinations)):
    dialog += "#L%d#Go to the Temple of Darkness (%s Mode).#l\r\n" % (i, destinations[i][0])

dialog += "#L99#Never mind."
response = sm.sendSay(dialog)

if response != 99 and 0 <= response < len(destinations):
    dest = destinations[response]
    sm.warpInstanceIn(chr, dest[2], True)
    sm.setDeathCount(dest[3])
    sm.setInstanceTime(60 * 60, 450012500)
    field = chr.getField()
    if not field.hasMobById(dest[4]) and not field.hasMobById(dest[5]):
        field.spawnMob(dest[4], -350, 85, False, dest[6])
        field.spawnMob(dest[5], 350, 85, False, dest[6])
