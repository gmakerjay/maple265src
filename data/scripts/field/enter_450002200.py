from net.swordie.ms.client.character.skills.temp import CharacterTemporaryStat

sm.lockUI()
sm.removeAdditionalEffect()
sm.removeEscapeButton()
sm.hideUser(True)
sm.blind(1, 255, 0, 0)
sm.sendDelay(1000)

sm.OnOffLayer_On(2000, "0", 0, 0, 0, "Map/Effect2.img/ArcaneRiver2/drop1", 4, 1, -1, 0)

sm.setPlayerBoxChat()
sm.sendNext("AHHHHHHHHHHHHHHHH! How did I get so high up!?")

sm.OnOffLayer_Off(1000, "0", 0)
sm.sendDelay(2000)
sm.showFade(500)

sm.OnOffLayer_On(2000, "0", 0, 0, 0, "Map/Effect2.img/ArcaneRiver2/drop2", 4, 1, -1, 0)

sm.sendNext("W-what?!")

sm.OnOffLayer_Off(1000, "0", 0)
sm.sendDelay(1500)
sm.showFade(500)

sm.OnOffLayer_On(2000, "0", 0, 0, 0, "Map/Effect2.img/ArcaneRiver2/drop3", 4, 1, -1, 0)

sm.sendNext("OOF!")

sm.OnOffLayer_Off(1000, "0", 0)
sm.sendDelay(4000)

sm.blind(0, 0, 0, 1000)
sm.hideUser(False)
sm.rideVehicleExpire(80002204, 1932399)

sm.forcedInput(3)

sm.sendDelay(1300)

sm.forcedInput(2)

sm.sendNext("Wha? I'm... alive?! I wait... am I riding #ba f-flying fish?!#k\r\nYou know what? I doesn't even matter. Flying Fish, you're my best friend right now.")

sm.sendDelay(1000)

sm.sendNext("Maybe you're one of the #bmany allies#k Kao spoke of.")

sm.sendDelay(1000)

sm.sendNext("All right, Flying Fish! Swim-fly me straight to the #rBlack Mage#k!")

sm.sendDelay(2000)

sm.forcedInput(0)

sm.sendNext("Huh? Flying Fish, why did you stop?")

sm.forcedInput(4)

sm.sendDelay(800)

sm.forcedInput(0)

sm.sendNext("I don't have time for this. I've got to get to the end of the #bArcane River#k!\r\n Don't you speak English?")

sm.sendNext("W-woah!")

sm.unlockUI()
sm.removeBuffBySkill(80002204)
sm.warpInstanceIn(chr, 450002201)