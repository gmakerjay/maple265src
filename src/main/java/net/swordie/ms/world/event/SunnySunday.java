package net.swordie.ms.world.event;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.swordie.ms.ServerConstants;
import net.swordie.ms.connection.OutPacket;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static net.swordie.ms.ServerConfig.ZONE;

public class SunnySunday {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class SunnySundayConfig {
        public List<SunnySundayEntry> entries;
        public SunnySundayConfig() {}
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class SunnySundayEntry {
        public String date;
        public String uiPath;
        public String uiName;
        public String title;
        public String desc;
        public String dateText;
        public int val1;
        public int val2;
        public int mpIncEXP;
        public SunnySundayEntry() {}
    }

    private static SunnySundayConfig config;

    private SunnySunday() {}

    public static void load() {
        ObjectMapper mapper = new ObjectMapper();
        Path path = Path.of(ServerConstants.RESOURCES_DIR, "sunnysunday.json");

        try (InputStream in = Files.newInputStream(path)) {
            config = mapper.readValue(in, SunnySundayConfig.class);
        } catch (Exception e) {
            e.printStackTrace();
            config = new SunnySundayConfig();
            config.entries = List.of();
        }
    }

    public static SunnySundayConfig get() {
        return config;
    }

    public final class SunnySundayLogic {
        private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        private SunnySundayLogic() {}

        public static SunnySundayEntry get() {
            LocalDate today = LocalDate.now(ZONE);
            String key = today.format(FMT);

            var cfg = SunnySunday.get();
            if (cfg == null || cfg.entries == null) return null;

            for (SunnySundayEntry e : cfg.entries) {
                if (e != null && key.equals(e.date)) {
                    return e;
                }
            }
            return null;
        }
    }

    public static void encode(OutPacket outPacket) {
        SunnySundayEntry entry = SunnySundayLogic.get();

        boolean enabled = (entry != null);
        outPacket.encodeByte(enabled);

        if (!enabled) return;

        outPacket.encodeByte(false); // flag client yêu cầu
        outPacket.encodeString(entry.uiPath);
        outPacket.encodeString(entry.uiName);
        outPacket.encodeString(entry.title);
        outPacket.encodeString(entry.desc);
        outPacket.encodeString(entry.dateText);
        outPacket.encodeInt(entry.val1);
        outPacket.encodeInt(entry.val2);
    }
}
