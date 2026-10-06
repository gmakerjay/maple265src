from net.swordie.ms.constants import GuildConstants
guild = chr.getGuild()

if chr.isGuildMaster():
    if guild.getMaxMembers() < GuildConstants.MAX_GUILD_MEMBERS:
        if sm.sendAskYesNo("Would you like to increase the maximum number of members in your guild? You currently have "
                           + str(guild.getMaxMembers()) + " members, but I can add 5 more members for 500 million mesos."):
            if sm.getMesos() < 500000000:
                sm.sendSayOkay("You don't have enough mesos.")
            else:
                sm.incrementMaxGuildMembers(5)
                sm.deductMesos(500000000)
    else:
        sm.sendSayOkay("Please come back if you change your mind!")

elif guild is None:
    if sm.sendAskYesNo("Would you like to create a guild? It will cost 100 million mesos."):
        if sm.getMesos() < 100000000:
            sm.sendSayOkay("You don't have enough mesos.")
        else:
            sm.showGuildCreateWindow()
else:
    sm.sendSayOkay("I'm responsible for matters related to guilds. If you want something done with your guild, you may ask your guild leader to come see me.")