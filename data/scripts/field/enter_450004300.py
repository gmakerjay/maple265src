# Lucid Reward Room
sm.createQuestWithQRValue(34360, "boss=1")
chr = sm.getChr()
field = chr.getField()
lucidMode = chr.getLucidMode()
boxId = 8880156 # Hard
if lucidMode == 0:
    boxId = 8880177 # Easy
elif lucidMode == 1:
    boxId = 8880167 # Normal

if not field.hasMobById(boxId):
    field.spawnMob(boxId, 675, 43, False)
