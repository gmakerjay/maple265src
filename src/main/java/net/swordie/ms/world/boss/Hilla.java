package net.swordie.ms.world.boss;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.constants.BossConstants;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.world.field.Field;

public class Hilla {

    public static void check(Char chr) {
        if (BossHelper.checkInstance(chr)) {
            return;
        }

        ScriptManagerImpl sm = chr.getScriptManager();
        Field field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());
        Party party = chr.getParty();
        boolean isLeader = (party == null || party.isLeader(chr));
        if (isLeader) {
            if (field.getMobs().isEmpty()) {
                switch (field.getId()) {
                    case 262030100 -> {
                        if (party != null) sm.warpParty(chr, 262030200, party);
                        else chr.warp(262030200);
                    }
                    case 262030200 -> {
                        if (party != null) sm.warpParty(chr, 262030300, party);
                        else chr.warp(262030300);
                    }
                    case 262031100 -> {
                        if (party != null) sm.warpParty(chr, 262031200, party);
                        else chr.warp(262031200);
                    }
                    case 262031200 -> {
                        if (party != null) sm.warpParty(chr, 262031300, party);
                        else chr.warp(262031300);
                    }
                }
            } else {
                sm.chat("Please eliminate all monsters before moving to the next stage.");
            }
        } else {
            sm.chat("Only Leader of your party can do this.");
        }
    }
}
