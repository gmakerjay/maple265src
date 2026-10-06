# End [Arcana] The Song of the Forest

SMALL_SPIRIT = 3003301
WIND_SPIRIT = 3003302

sm.lockUI()

sm.removeNpc(WIND_SPIRIT)
sm.spawnNpc(WIND_SPIRIT, -600, 39)

sm.setNpcBoxChat(SMALL_SPIRIT)
sm.sendNext("#face7#I believe the Spirit Tree will restore its if only the Song of the Forest were played once more. I tried to revive the Songblooms, but...")
sm.sendNext("#face4#It didn't work. Wahhh...!")
sm.sendNext("#face4#...I-I'm sorry I'm such a crybaby. Wah...")
sm.setNpcBoxChat(WIND_SPIRIT)
sm.sendNext("#face2#It can be felt, but not seen. You cannot hear it, but you know it is there. What is it?")
sm.sendNext("#face2#Friendship, love, kindness. It goes by many names.")
sm.sendNext("#face2#Your tale tugs at my heart, like the breeze on one's tendrils. Very well, I will assist you.")
sm.setNpcBoxChat(SMALL_SPIRIT)
sm.sendNext("#face7#Ah, Wind Spirit! (Sniffs) That's Wind Spirit. He's a little unusual.")
sm.setNpcBoxChat(WIND_SPIRIT)
sm.sendNext("#face2#My song is mine alone, but you may sing it.")
sm.setPlayerBoxChat()
sm.sendNext("Uhh, right... We're going to revive the Songblooms and restore the Song of the Forest. Will you help us?")
sm.setNpcBoxChat(SMALL_SPIRIT)
sm.sendNext("#face7#We might be able to revive the Spirit Tree and put everything back the way it was! What do you say, Wind Spirit?")
sm.setNpcBoxChat(WIND_SPIRIT)
sm.sendNext("#face2#Hahaha, you have my assistance. Just tell me what to do! I wait with baited breath.")
sm.sendNext("#face2#Ah! An urgent quest. I pulsate with excitement.")
sm.unlockUI()
sm.completeQuest(34453)