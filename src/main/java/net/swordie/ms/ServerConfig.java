package net.swordie.ms;

import java.time.ZoneId;

public class ServerConfig {

    public static boolean DEBUG_MODE = true;
    public static boolean PACKET_LOG = true;

    public static boolean IP_LOG = true;
    public static boolean SQL_DEBUG = false;
    public static boolean ADMIN_LOGIN = false;
    public static final boolean AUTO_EVENT = false;

    public static final int EXP_RATE = DEBUG_MODE ? 100 : 1;
    public static final int EXP_RATE_BELOW_100 = DEBUG_MODE ? 100 : 50;
    public static final int EXP_RATE_101_210 = DEBUG_MODE ? 500 : 25;
    public static final int MESO_RATE = 100;
    public static final int DROP_RATE = DEBUG_MODE ? 20 : 1;
    public static final int QUEST_EXP_RATE = 1;

    public static final char ADMIN_COMMAND = '!';
    public static final char ADMIN_COMMAND_2 = '#';
    public static final char PLAYER_COMMAND = '@';

    public static final ZoneId ZONE = ZoneId.of("Asia/Ho_Chi_Minh");
}
