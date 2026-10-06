package net.swordie.ms;

import net.swordie.ms.constants.JobConstants;

import java.io.File;
import java.io.FileInputStream;
import java.util.Properties;

public class ServerConstants {

    public static final int UnkValue = -1;

    public static final short version = 265;
    public static final String patch = "3";

    public static final byte WORLD_ID = 19; // Scania
    public static String SERVER_NAME = "MapleStoryVN";
    public static String EVENT_MSG = "Chào mừng đến với MapleStoryVN";

    public static final String DIR = System.getProperty("user.dir");
    public static final byte LOCALE = 8;
    public static final String WZ_DIR = STR."\{DIR}/data/wz\{version}";
    public static final String DAT_DIR = STR."\{DIR}/data/dat\{version}";
    public static final int MAX_CHARACTERS = JobConstants.LoginJob.values().length * 3;
    public static final String SCRIPT_DIR = STR."\{DIR}/data/scripts";
    public static final String RESOURCES_DIR = STR."\{DIR}/data/resources";
    public static final String HANDLERS_DIR = STR."\{DIR}/src/main/java/net/swordie/ms/handlers";
    public static int LOGIN_PORT = 8484;
    public static int API_PORT = 8483;
    public static byte[] CHANNEL_IP = {127, 0, 0, 1};
    public static final short CHAT_PORT = 0;
    public static final short AUCTION_HOUSE_PORT = 0;
    public static final int BCRYPT_ITERATIONS = 10;
    public static final long TOKEN_EXPIRY_TIME = 60 * 24; // minutes
    public static final int FIELD_DEPRECATION_TIME_IN_MIN = 20;
    public static boolean LOCAL_HOST_SERVER = true;
    public static final long EXPIRED_SCRIPT_TIME = 3600000L; // 1 giờ

    static {
        loadConfig();
    }

    public static void loadConfig() {
        File propFile = new File("server.properties");
        if (propFile.exists()) {
            try (FileInputStream fis = new FileInputStream(propFile)) {
                Properties props = new Properties();
                props.load(fis);
                String ip = props.getProperty("server.ip", "127.0.0.1").trim();
                String[] parts = ip.split("\\.");
                if (parts.length == 4) {
                    CHANNEL_IP = new byte[] {
                        (byte) Integer.parseInt(parts[0]),
                        (byte) Integer.parseInt(parts[1]),
                        (byte) Integer.parseInt(parts[2]),
                        (byte) Integer.parseInt(parts[3])
                    };
                }
                LOGIN_PORT = Integer.parseInt(props.getProperty("server.loginPort", String.valueOf(LOGIN_PORT)).trim());
                API_PORT = Integer.parseInt(props.getProperty("server.apiPort", String.valueOf(API_PORT)).trim());
                SERVER_NAME = props.getProperty("server.name", SERVER_NAME);
                EVENT_MSG = props.getProperty("server.eventMsg", EVENT_MSG);
                LOCAL_HOST_SERVER = "127.0.0.1".equals(ip) || "localhost".equalsIgnoreCase(ip);
                System.out.printf("[ServerConstants] Config loaded: IP=%s, LoginPort=%d, Localhost=%b%n", ip, LOGIN_PORT, LOCAL_HOST_SERVER);
            } catch (Exception e) {
                System.err.println("[ServerConstants] Error loading server.properties: " + e.getMessage());
            }
        }
    }
}
