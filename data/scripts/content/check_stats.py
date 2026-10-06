from java.text import NumberFormat
from java.util import Locale

sm.setSpeakerID(9010100)
sm.sendNext("#fs16##e#rDetailed Information of #h0# #k#n\r\n"
    + "#fs11#-#e#b Level#k: " + str(chr.getLevel()) + "#n\r\n"
    + "-#e#b Mesos#k: " + str(NumberFormat.getNumberInstance(Locale.US).format(chr.getMoney() + chr.getAccount().getTrunk().getMoney())) + " (In storage: " + str(NumberFormat.getNumberInstance(Locale.US).format(chr.getAccount().getTrunk().getMoney())) + ")#n\r\n"
    + "-#e#b Maple Points#k: " + str(NumberFormat.getNumberInstance(Locale.US).format(chr.getUser().getMaplePoints())) + "#n\r\n"
    + "-#e#b Donation Points#k: " + str(NumberFormat.getNumberInstance(Locale.US).format(chr.getUser().getDonationPoints())) + "#n\r\n"
    + "-#e#b Activity Points#k: " + str(NumberFormat.getNumberInstance(Locale.US).format(chr.getUser().getVotePoints())) + "#n\r\n"
    + "-#e#b Location#k: " + str(chr.getFieldID()) + " (#m" + str(chr.getFieldID()) + "#)#n\r\n"
    + "-#e#b Position#k: (" + str(chr.getPosition().getX()) + ", " + str(chr.getPosition().getY()) + ")#n\r\n"
    + "-#e#b Character's Basic Stats#k#n:\r\n"
    + "#e#L0#View More#l#n")
sm.sendSayOkay(chr.checkBaseStats())