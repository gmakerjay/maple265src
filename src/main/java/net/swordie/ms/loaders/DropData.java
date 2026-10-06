package net.swordie.ms.loaders;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.unimi.dsi.fastutil.ints.Int2ObjectMap;
import it.unimi.dsi.fastutil.ints.Int2ObjectOpenHashMap;
import it.unimi.dsi.fastutil.objects.ObjectOpenHashSet;
import net.swordie.ms.ServerConstants;
import net.swordie.ms.life.drop.DropInfo;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

public class DropData {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private static final int GLOBAL_MOB_ID = -1;
    private static final boolean ENABLE_GLOBAL_DROPS = true;

    // mobId -> immutable Set<DropInfo>
    private static volatile Int2ObjectMap<Set<DropInfo>> DROP_BY_MOB = new Int2ObjectOpenHashMap<>();
    private static volatile Set<DropInfo> GLOBAL_DROPS = Collections.emptySet();
    private static volatile boolean LOADED = false;

    private DropData() {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class DropRow {
        public long id;
        public int mobId;
        public String mobName;
        public int itemId;
        public String itemName;
        public int chance;
        public int minQuant;
        public int maxQuant;
        public boolean reactorDrop;
    }

    public static void load() throws IOException {
        byte[] bytes = Files.readAllBytes(Path.of(ServerConstants.RESOURCES_DIR + "/mob_drops.json"));
        List<DropRow> rows = MAPPER.readValue(bytes, new TypeReference<List<DropRow>>() {});
        Int2ObjectOpenHashMap<Set<DropInfo>> map = new Int2ObjectOpenHashMap<>(Math.max(16, rows.size() / 3));
        ObjectOpenHashSet<DropInfo> global = new ObjectOpenHashSet<>();
        for (DropRow r : rows) {
            DropInfo di = new DropInfo();
            di.setId(r.id);
            di.setItemID(r.itemId);
            di.setChance(r.chance);
            di.setMinMoney(r.minQuant);   // your old code uses setMinMoney for minQuant
            di.setMaxQuant(r.maxQuant);
            di.setReactorDrop(r.reactorDrop);
            if (r.mobId == GLOBAL_MOB_ID) {
                global.add(di);
                continue;
            }
            Set<DropInfo> set = map.get(r.mobId);
            if (set == null) {
                set = new ObjectOpenHashSet<>();
                map.put(r.mobId, set);
            }
            set.add(di);
        }
        for (Int2ObjectMap.Entry<Set<DropInfo>> e : map.int2ObjectEntrySet()) {
            e.setValue(Collections.unmodifiableSet(e.getValue()));
        }
        DROP_BY_MOB = map;
        GLOBAL_DROPS = global.isEmpty() ? Collections.emptySet() : Collections.unmodifiableSet(global);
        LOADED = true;
    }

    public static Set<DropInfo> getDropInfoByIdFromJson(int mobID) {
        if (!LOADED) return Collections.emptySet();
        Set<DropInfo> s = DROP_BY_MOB.get(mobID);
        if (!ENABLE_GLOBAL_DROPS || GLOBAL_DROPS.isEmpty()) {
            return (s != null) ? s : Collections.emptySet();
        }
        if (s == null || s.isEmpty()) return GLOBAL_DROPS;
        ObjectOpenHashSet<DropInfo> merged = new ObjectOpenHashSet<>(s.size() + GLOBAL_DROPS.size());
        merged.addAll(s);
        merged.addAll(GLOBAL_DROPS);
        return merged;
    }

    public static boolean isLoaded() {
        return LOADED;
    }

    public static Set<DropInfo> getDropInfoByID(int mobTemplateID) {
        return DropData.getDropInfoByIdFromJson(mobTemplateID);
    }
}
