package net.swordie.ms.util;

import net.swordie.ms.DiscordAPI;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class DataPrinter {

    public static final String
            ALL_IN_ONE = "discord/all.txt",
            REGISTER = "discord/register.txt",
            VOTE = "discord/vote.txt",
            LOGIN = "discord/login.txt",
            LOG_TRADE = "discord/trade.txt",
            LOG_RPS = "discord/rps.txt",
            LOG_CHAT = "discord/chat.txt",
            AUCTION = "discord/auction.txt",
            DONATION_POINT_LOG = "discord/donate.txt",
            AUTOBAN_WARNING = "discord/hack.txt",
            STORAGE = "discord/storage.txt",
            FREEXUVANG = "discord/xuvang.txt",
            ITEM = "Items.txt",
            TIMER = "Timer.txt",
            HIKARICP = "HikariCP/Log.txt",
            HIKARICP_ERROR = "HikariCP/Error.txt",
            EXCEPTION_CAUGHT = "ExceptionCaught/All.txt",
            EXCEPTION_CAUGHT_TIMER = "ExceptionCaught/Timer.txt",
            EXCEPTION_CAUGHT_INPACKET = "ExceptionCaught/InPacket.txt",
            EXCEPTION_CAUGHT_MIGRATION = "ExceptionCaught/Migration.txt",
            EXCEPTION_CAUGHT_SKILL = "ExceptionCaught/Skills.txt",
            EXCEPTION_CAUGHT_ATTACK = "ExceptionCaught/Attacks.txt",
            SCRIPTS = "Scripts.txt",
            AUTOSTART_QUESTS = "AutoStart_Quests.txt",
            CLIENT_ERROR = "Client_Error.txt",
            INSTANCE_FIELD = "Instance_Fields.txt",
            PACKET_LOG = "Packets/",
            PACKET_LOG_ERR = "Packets/errors.txt";

    private static final SimpleDateFormat sdf = new SimpleDateFormat("dd MMMM yyyy"); //for file system purposes, it's nice to use yyyy-MM-dd
    private static final SimpleDateFormat sdf4P = new SimpleDateFormat("dd MM yyyy HH:mm:ss"); //for file system purposes, it's nice to use yyyy-MM-dd
    private static final String FILE_PATH = "logs/" + sdf.format(Calendar.getInstance().getTime()) + "/"; // + sdf.format(Calendar.getInstance().getTime()) + "/"

    public static void send(final String name, final Exception e) {
        send(name, (Throwable) e);
    }

    public static void send(final String name, final Throwable e) {
        if (e == null) return;
        final Writer result = new StringWriter();
        final PrintWriter printWriter = new PrintWriter(result);
        e.printStackTrace(printWriter);

        // Print highlighted error to System.err so bugs are immediately visible
        System.err.println("\n[ERROR LOG] " + name + " -> " + e.getClass().getName() + (e.getMessage() != null ? (": " + e.getMessage()) : ""));
        int shown = 0;
        for (StackTraceElement elem : e.getStackTrace()) {
            if (elem.getClassName().startsWith("net.swordie.ms")) {
                System.err.printf("   at %s.%s(%s:%d)%n", elem.getClassName(), elem.getMethodName(), elem.getFileName(), elem.getLineNumber());
                shown++;
                if (shown >= 8) break;
            }
        }
        if (shown == 0) {
            for (int i = 0; i < Math.min(4, e.getStackTrace().length); i++) {
                System.err.printf("   at %s%n", e.getStackTrace()[i]);
            }
        }
        if (e.getCause() != null) {
            System.err.println("   Caused by: " + e.getCause().getClass().getName() + (e.getCause().getMessage() != null ? (": " + e.getCause().getMessage()) : ""));
            for (StackTraceElement elem : e.getCause().getStackTrace()) {
                if (elem.getClassName().startsWith("net.swordie.ms")) {
                    System.err.printf("      at %s.%s(%s:%d)%n", elem.getClassName(), elem.getMethodName(), elem.getFileName(), elem.getLineNumber());
                }
            }
        }

        writeToFile(name, result.toString(), true);
    }

    public static void send(final String name, final String s) {
        //DiscordAPI.send(name, "``` [" + sdf4P.format(Calendar.getInstance().getTime()) + "] " + s + " ```", DiscordAPI.staffGuildServer);
        System.out.println(s);
        writeToFile(name, s, true);
    }

    public static void send(String name, final String s, boolean line) {
        if (name != null && (name.contains("Exception") || name.contains("Error") || name.contains("error") || name.contains("hack.txt") || name.contains("Scripts.txt"))) {
            System.err.println("[" + name + "] " + s);
        }
        writeToFile(name, s, line);
    }

    private static void writeToFile(String name, final String s, boolean line) {
        FileOutputStream out = null;
        String result = null;
        String file = FILE_PATH + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            } else {
                outputFile.createNewFile();
            }
            out = new FileOutputStream(file, true);
            result = "[" + sdf4P.format(Calendar.getInstance().getTime()) + "] " + s;
            out.write(result.getBytes());
            if (line) {
                out.write("\r\n---------------------------------\r\n".getBytes());
            } else {
                out.write("\r\n".getBytes());
            }
        } catch (IOException ess) {
            System.err.println("[DataPrinter IO Error] " + ess.getMessage());
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException e) {
                System.err.println("[DataPrinter Close Error] " + e.getMessage());
            }
        }
    }
}