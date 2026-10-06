from net.swordie.ms.client.character.items import BodyPart
from net.swordie.ms.constants import JobConstants
from net.swordie.ms.constants import ItemConstants

sel = sm.sendNext("Have you heard of #bSoul Weapons#k? I can tell you about them, if you want...\r\n\r\n#b#L0#Who are you?#l\r\n#L1#What are Soul Weapons?#l\r\n#L2#I want to revert my Soul Weapon into a regular one.#l\r\n#L3#No, not right now.#l")
if sel == 0:
    sm.sendNext("Ah, I am the creator of #bSoul Weapons#k. I'm from...another world, but I came here to share my discoveries.")
    sm.setPlayerAsSpeaker()
    sm.sendSay("Another world? Hm... You look pretty normal to me.")
    sm.setSpeakerID(9000178)
    sm.sendSay("Oh, this isn't my true appearance. I wanted to enter town as myself, but everyone started screaming and running. So, I disguised myself to look like them.")
    sm.setPlayerAsSpeaker()
    sm.sendSay("A disguise? What do you look like?")
    sm.setSpeakerID(9000178)
    sm.sendSay("Are you curious?\r\n(He hesitates for a second.) All right, I'll show you. Try not to scream. I'm a pretty sensitive guy.")
    sm.setPlayerAsSpeaker()
    sm.sendSay("Don't worry. I've seen a lot. How bad can it be?")
    sm.setSpeakerID(9000174)
    sm.flipDialogue()
    sm.sendSay("Judge for yourself.")
    sm.setPlayerAsSpeaker()
    sm.sendSay("GAH! Holy...! My eyes!")
elif sel == 1:
    sm.sendNext("Do you want to know about #bSoul Weapons#k?\r\nSoul Weapons, as the name suggests, #bhave souls infused into them#k. You need a #bSoul Enchanter#k to make a regular weapon into a Soul Weapon.")
    sm.sendSay("The #bSoul Enchanter#k is a magical item that allows a weapon and a soul to join.\r\nUsing this item changes a weapon into a Soul Weapon. Soul Weapons #bwill increase in Attack Power and Magic ATT whenever they absorb a soul.#k")
    sm.sendSay("That's not all. Equipping a #bsoul#k on the Soul Weapon will give it #badditional Potential#k, and #bwhen you collect enough souls, you can summon that creature to use a powerful skill.#k")
    sm.setPlayerAsSpeaker()
    sm.sendPrev("Wow, that's pretty cool!")
elif sel == 2:
    sm.sendNext("Are you sure? Once you decide, there's no changing your mind.\r\n\r\nDo you want to revert the #e#bcurrently equipped Soul Weapon#k#n to its original form?")
    if sm.sendAskYesNo("Do you want to revert the #e#bcurrently equipped Soul Weapon#k#n to its original form?\r\n\r\nIf you revert it, #e#rthe Soul currently equipped will be destroyed#k#n. Think carefully.\r\n\r\n(The equipped Soul Weapon will be reset immediately upon accepting.)"):
        if JobConstants.isZero(chr.getJob()):
            sm.sendNext("Unable to revert from Zero Character.")
        else:
            weapon = chr.getEquippedInventory().getFirstItemByBodyPart(BodyPart.Weapon)
            if weapon is not None:
                if weapon.getSoulItemId() != 0:
                    sm.sendNext("There you go! #i" + str(weapon.getSoulItemId()) + "# #z" + str(weapon.getSoulItemId()) + "# has been reverted from your weapon!")
                    weapon.setSoulSocketId(2590009 % ItemConstants.SOUL_ENCHANTER_BASE_ID)
                    weapon.setSoulOptionId(0)
                    weapon.setSoulOption(0)
                    weapon.setSoulItemId(0)
                    weapon.updateToChar(chr)
                    chr.initSoulMP()
                else:
                    sm.sendNext("The weapon you have equipped is not a Soul Weapon. What do you expect me to do?")
            else:
                sm.sendNext("You don't have a weapon on. What do you expect me to do?")