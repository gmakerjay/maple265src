# Black Mage entry NPC (Unrestricted Offline Mode)
destinations = [
    ["Normal", 1, 450013100, 15],
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
    sm.warpInstanceIn(chr, destinations[response][2], True)
    sm.setDeathCount(destinations[response][3])
    sm.setInstanceTime(30 * 60, 100000000)
    field = chr.getField()
    if not field.hasMobById(8880500) and not field.hasMobById(8880501):
        field.spawnMob(8880500, -600, 85, False, 32500000000000L)
        field.spawnMob(8880501, 600, 85, False, 32500000000000L)