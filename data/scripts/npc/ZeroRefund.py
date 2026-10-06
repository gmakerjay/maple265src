from net.swordie.ms.connection.packet import WvsContext
from net.swordie.ms.client.character.items import BodyPart
from net.swordie.ms.client.character.items.Item import Type

from net.swordie.ms.loaders import ItemData

NPC_LAPIS = 2400009
NPC_LAZULI = 2400010

currentWeaponType = sm.getZeroWeaponType() - 10000
weapon1 = chr.getEquippedInventory().getFirstItemByBodyPart(BodyPart.Weapon)
weapon2 = chr.getEquippedInventory().getFirstItemByBodyPart(BodyPart.Shield)

chr.consumeItem(weapon1)
chr.consumeItem(weapon2)


refundWeapon1 = ItemData.getEquipById(weapon1.getItemId())
refundWeapon2 = ItemData.getEquipById(weapon2.getItemId())

refundWeapon1.setBagIndex(weapon1.getBagIndex())
refundWeapon2.setBagIndex(weapon2.getBagIndex())

refundWeapon1.setType(Type.EQUIP)
refundWeapon2.setType(Type.EQUIP)

# if currentWeaponType == 8 or currentWeaponType == 9:
# 	refundWeapon1 = ItemData.getItemIn


sm.removeEscapeButton()
sm.setSpeakerID(NPC_LAPIS)
sm.setBoxChat(False)
sm.sendNext("It totally crumbled to #bdust#k! What have you done?! What am I going to do now?! Game over, man, #rGAME OVER#k! Put her in charge! I'm done for! Peace out!")
sm.sendNext("I'm sorry, I don't wanna hurt your feelings, you know? I mean just because I'm awesome doesn't mean I'm totally insensitive")
sm.sendNext("That weapon is just a vessel for my amazing power, and we can fix it, as long as me and Lazuli stay safe. Let's just get a little Time Power in here, and we'll be good as new.")

chr.equip(refundWeapon1)
refundWeapon1.updateToChar(chr)

chr.equip(refundWeapon2)
refundWeapon2.updateToChar(chr)

sm.sendNext("BOOM! Look at what I have done. It's perfect again! Ready to rain destruction! But don't think you can just go back to enhancing it all willy-nilly...")

sm.setSpeakerID(NPC_LAZULI);
sm.setBoxChat(False);
sm.sendNext("We're supposed to break our enemies. NOT the other way around. How am I supposed to cut faces when I'm snapped in half?")

sm.setSpeakerID(NPC_LAPIS);
sm.setBoxChat(False);
sm.sendNext("The psycho's right. Even if you repair us, we'll lose our #bBonus Stats and Potential#k after we break. So be careful with the goods, all right?")