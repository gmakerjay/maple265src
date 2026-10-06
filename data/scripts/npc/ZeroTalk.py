from net.swordie.ms.connection.packet import WvsContext

NPC_LAPIS = 2400009
NPC_LAZULI = 2400010

sm.setSpeakerID(NPC_LAPIS)
sm.setBoxChat(False)
sm.sendNext("Zero uses a unique evolving weapon that grows with them. Alpha wields the long sword Lazuli, while Beta wields the heavy sword Lapis. These weapons upgrade every 10 levels up to level 170. AbsoLab Essence and Arcane Umbra Essence are required to upgrade the weapon to Level 180 and 200 respectively.")
sm.setSpeakerID(NPC_LAZULI)
sm.setBoxChat(False)
sm.sendNext("After completing Chapter 1 of the main story, Lazuli and Lapis can only be enhanced through a special weapon UI accessible from the weapon button on the bottom left of the equipment inventory window.")
sm.setSpeakerID(NPC_LAPIS)
sm.setBoxChat(False)
sm.sendNext("Only 1 scroll or enhancement item is needed to upgrade both weapons. When the weapon evolves, you will have the option to carry over all enhancements or to reset the weapon. If the weapon is destroyed, the weapon can be repurchased without any enhancements.")
sm.setSpeakerID(NPC_LAZULI)
sm.setBoxChat(False)
sm.sendNext("By defeating enemies and completing dungeons in Mirror World, Zero will also accumulate WP (Weapon Point), which, with a small meso fee, can be used to reset and possible upgrade both Lazuli and Lapis' potential.")
sm.setSpeakerID(NPC_LAPIS)
sm.setBoxChat(False)
sm.sendNext("Because Zero is unable to unequip their weapons, Lucky Item Scrolls have been added to turn Lazuli and Lapis into a piece for another equipment set. These scrolls will not change the stats of the weapons but will instead count the weapons towards the set bonus of the scroll used. Visit Cello in Zero's Temple to obtain a few of these Lucky Item Scrolls.")

