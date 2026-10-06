from net.swordie.ms.connection.packet import WvsContext

NPC_LAPIS = 2400009
NPC_LAZULI = 2400010

sm.removeEscapeButton()
sm.setSpeakerID(NPC_LAPIS)
sm.setBoxChat(False)
sm.sendNext("For us to get stronger from this point on, we're going to need something special.")

sm.setSpeakerID(NPC_LAZULI)
sm.setBoxChat(False)
sm.sendNext("Wow, we're worth quite a bit now, aren't we?")

sm.addEscapeButton()
sm.setSpeakerID(NPC_LAPIS)

currentWeaponType = sm.getZeroWeaponType() - 10000
if currentWeaponType > 8:
    sm.sendNext("Your Lapis and Lazuli Weapon reach Max Level.")
else:
    sm.setSpeakerID(NPC_LAZULI)
    sm.setBoxChat(False)
    selection = sm.sendNext("Alright, " + sm.getChr().getName() + ". What do you want?\r\n" + "#L0##b Lapis and Lazuli upgraded to Type " + str(currentWeaponType + 1) + ".#l")
    sm.setSpeakerID(NPC_LAZULI)
    sm.setBoxChat(False)
    if selection == 0:
        if currentWeaponType >= 0 and currentWeaponType < 7:
            sm.getUpgradeZeroWeaponInfo(0)
        elif currentWeaponType == 7:
            sm.sendNext("To upgrade further, you need at least 1 AbsoLab Essence.")
            sm.getUpgradeZeroWeaponInfo(1)
        elif currentWeaponType == 8:
            sm.sendNext("To upgrade further, you need at least 1 Arcane Umbra Essence.")
            sm.getUpgradeZeroWeaponInfo(2)


