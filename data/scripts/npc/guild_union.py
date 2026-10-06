# Lenario - Manager of Guild Union

#GUILD_ALLIANCE_COST = 5000000
#otherMember = None

sm.sendSayOkay("The alliance system is currently locked!")

#if chr.getParty() is not None:
#    for pm in chr.getParty().getOnlineMembers():
#        other = pm.getChr()
#        if other is not None and other is not chr and other.getGuild() is not None \
#                and other.getGuild().getAlliance() is None and other.getGuild().isGuildMaster(other):
#            otherMember = other
#if chr.getGuild() is None or chr.getGuild().getAlliance() is not None or not chr.getGuild().isGuildMaster(chr) \
#    or chr.getParty() is None or otherMember is None:
#    sm.sendSayOkay("I manage guild alliances. If you wish to form an alliance, please form a party with another guild leader and speak with me again. It will cost 5 million mesos.")
#else:
# for chr + other: guild exists, has no alliance, and have the party members as masters
#    if sm.sendAskYesNo("I see that you have another guild leader in your party. Would you like to form an alliance with them?"):
#        if sm.getMesos() < GUILD_ALLIANCE_COST:
#            sm.sendSayOkay("It seems that you are short on mesos. Please make sure you have at least 5 million mesos before attempting to create a guild alliance.")
#        else:
#            text = sm.sendAskText("Please enter your desired alliance name.", "", 4, 20)
#            while not sm.checkAllianceName(text):
#                sm.sendAskText("The alliance name you entered is already in use.", "", 4, 20)
#            else:
#                sm.createAlliance(text, otherMember)
#                sm.sendSayOkay("Your alliance has been successfully created!")