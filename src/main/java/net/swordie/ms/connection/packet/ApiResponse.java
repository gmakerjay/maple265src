package net.swordie.ms.connection.packet;

import net.swordie.ms.connection.OutPacket;
import net.swordie.ms.connection.api.ApiOutHeader;
import net.swordie.ms.enums.AccountCreateResult;
import net.swordie.ms.enums.ApiTokenResultType;

public class ApiResponse {

    public static OutPacket tokenRequestResult(ApiTokenResultType atrt, String token) {
        OutPacket outPacket = new OutPacket(ApiOutHeader.REQUEST_TOKEN_RESULT);

        outPacket.encodeByte(atrt.getVal());
        if (atrt == ApiTokenResultType.Success) {
            outPacket.encodeString(token);
        }

        return outPacket;
    }

    public static OutPacket tokenRequestResult(ApiTokenResultType atrt, int token) {
        OutPacket outPacket = new OutPacket(ApiOutHeader.REQUEST_TOKEN_RESULT_X64);

        outPacket.encodeByte(atrt.getVal());
        if (atrt == ApiTokenResultType.Success) {
            outPacket.encodeInt(token);
        }

        return outPacket;
    }

    public static OutPacket createAccountResult(AccountCreateResult acr) {
        OutPacket outPacket = new OutPacket(ApiOutHeader.CREATE_ACCOUNT_RESULT);

        outPacket.encodeByte(acr.ordinal());

        return outPacket;
    }

    public static OutPacket accountDataResult(byte result, int nx, int dp, int vp, java.util.List<net.swordie.ms.handlers.ApiRequestHandler.CharSummaryData> characters) {
        OutPacket outPacket = new OutPacket(ApiOutHeader.ACCOUNT_DATA_RESULT_X64);
        outPacket.encodeByte(result);
        if (result == 0) {
            outPacket.encodeInt(nx);
            outPacket.encodeInt(dp);
            outPacket.encodeInt(vp);
            outPacket.encodeByte(characters != null ? (byte) characters.size() : (byte) 0);
            if (characters != null) {
                for (net.swordie.ms.handlers.ApiRequestHandler.CharSummaryData chr : characters) {
                    outPacket.encodeString(chr.name != null ? chr.name : "");
                    outPacket.encodeInt(chr.level);
                    outPacket.encodeInt(chr.job);
                    outPacket.encodeString(chr.jobName != null ? chr.jobName : "Beginner");
                    outPacket.encodeInt(chr.field);
                }
            }
        }
        return outPacket;
    }
}
