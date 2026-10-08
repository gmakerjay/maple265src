package net.swordie.ms;

import java.time.ZoneId;
import java.util.Properties;

public class ServerConfig {

    public static boolean DEBUG_MODE = true;
    public static boolean PACKET_LOG = true;

    public static boolean IP_LOG = true;
    public static boolean SQL_DEBUG = false;
    public static boolean ADMIN_LOGIN = false;
    public static boolean AUTO_EVENT = false;

    public static int EXP_RATE = 100;
    public static int EXP_RATE_BELOW_100 = 100;
    public static int EXP_RATE_101_210 = 500;
    public static int MESO_RATE = 100;
    public static int DROP_RATE = 20;
    public static int QUEST_EXP_RATE = 1;

    public static final char ADMIN_COMMAND = '!';
    public static final char ADMIN_COMMAND_2 = '#';
    public static final char PLAYER_COMMAND = '@';

    public static final ZoneId ZONE = ZoneId.of("Asia/Bangkok");

    public static void loadConfig(Properties props) {
        if (props == null) return;
        try {
            DEBUG_MODE = Boolean.parseBoolean(props.getProperty("server.debugMode", String.valueOf(DEBUG_MODE)).trim());
            PACKET_LOG = Boolean.parseBoolean(props.getProperty("server.packetLog", String.valueOf(PACKET_LOG)).trim());
            IP_LOG = Boolean.parseBoolean(props.getProperty("server.ipLog", String.valueOf(IP_LOG)).trim());
            SQL_DEBUG = Boolean.parseBoolean(props.getProperty("server.sqlDebug", String.valueOf(SQL_DEBUG)).trim());
            ADMIN_LOGIN = Boolean.parseBoolean(props.getProperty("server.adminLoginOnly", String.valueOf(ADMIN_LOGIN)).trim());
            AUTO_EVENT = Boolean.parseBoolean(props.getProperty("server.autoEvent", String.valueOf(AUTO_EVENT)).trim());

            EXP_RATE = Integer.parseInt(props.getProperty("server.expRate", String.valueOf(EXP_RATE)).trim());
            EXP_RATE_BELOW_100 = Integer.parseInt(props.getProperty("server.expRateBelow100", String.valueOf(EXP_RATE_BELOW_100)).trim());
            EXP_RATE_101_210 = Integer.parseInt(props.getProperty("server.expRate101to210", String.valueOf(EXP_RATE_101_210)).trim());
            MESO_RATE = Integer.parseInt(props.getProperty("server.mesoRate", String.valueOf(MESO_RATE)).trim());
            DROP_RATE = Integer.parseInt(props.getProperty("server.dropRate", String.valueOf(DROP_RATE)).trim());
            QUEST_EXP_RATE = Integer.parseInt(props.getProperty("server.questExpRate", String.valueOf(QUEST_EXP_RATE)).trim());

            System.out.printf("[ServerConfig] Rates: EXP=x%d (Lv<100: x%d, 101-210: x%d), MESO=x%d, DROP=x%d, QUEST=x%d%n",
                    EXP_RATE, EXP_RATE_BELOW_100, EXP_RATE_101_210, MESO_RATE, DROP_RATE, QUEST_EXP_RATE);
        } catch (Exception e) {
            System.err.println("[ServerConfig] Error parsing rates from server.properties: " + e.getMessage());
        }
    }
}
