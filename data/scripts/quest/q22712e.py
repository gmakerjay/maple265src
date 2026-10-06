# ObjectID: 0
# ParentID: 22712
import net.swordie.ms.constants.JobConstants
JAY = 1531001
KINESIS = 1531000

#currentSP = chr.getAvatarData().getCharacterStat().getExtendSP()
currentAP = chr.getAvatarData().getCharacterStat().getAp()
sm.setSpeakerID(JAY)
sm.setBoxChat()
sm.sendNext("All right, lastly we'll check your condition.")
if currentAP > 0:
    
    sm.setSpeakerID(JAY)
    sm.setBoxChat()
    sm.sendNext("By the way, Kinesis. \r\nYou havent't improved your abilities.")
    sm.sendNext("With every new Level, you can improve your #gstats#k and #gskills#k, and you should do that as soon as you can.")
    sm.sendNext("You use telekinetic power, so you should invest in Intelligence #g(INT)#k. If you don't want the hassle, then you can yse the Auto-assign menu.")
    
    sm.setSpeakerID(KINESIS)
    sm.setBoxChat()
    sm.sendNext("Sigh, do I really have to do this? I don't think I can be smarter than I already am.\r\n\r\n#b(Invest all AP in stats, and then talk to him again)")
    sm.playExclSoundWithDownBGM("Voice3.img/Kinesis/guide_03", 100)
    sm.chatScript("With every new Level you can improve your stats and skills.")
    
  
#if currentSP > 0:
    
        
    #sm.setSpeakerID(JAY)
    #sm.setBoxChat()
    #sm.sendNext("By the way, Kinesis, you forgot something and it's not like you. You haven't improved your #bskills#k.")
    #sm.sendNext("You know you can register skills to quick slot, right?")
    
    #sm.setSpeakerID(KINESIS)
    #sm.setBoxChat()
    #sm.sendNext("Sure, sure. As you wish.\r\n\r\n#b(Invest all SP in skills, and then talk to him again.)")
    #sm.playExclSoundWithDownBGM("Voice3.img/Kinesis/guide_03", 100)
    #sm.chatScript("With every new Level you can improve your stats and skills.")
   
elif currentAP == 0:
    sm.completeQuest(parentID)
    sm.sendNext("You've recovered more quickly than I thought. You have high stamina.")