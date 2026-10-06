package net.swordie.ms.client.character;

import net.swordie.ms.connection.hikariCP.DatabaseManager;
import net.swordie.ms.connection.packet.Effect;
import net.swordie.ms.connection.packet.UserPacket;
import net.swordie.ms.constants.MonsterCollectionGroup;
import net.swordie.ms.constants.MonsterCollectionRegion;
import net.swordie.ms.constants.MonsterCollectionSession;
import net.swordie.ms.loaders.MonsterCollectionData;
import net.swordie.ms.loaders.containerclasses.MonsterCollectionMobInfo;
import net.swordie.ms.util.DataPrinter;
import net.swordie.ms.util.FileTime;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

public class MonsterCollection {

    private static final int EXPLORATION_POSITION_START = 20;

    private int id;
    private Map<Integer, MonsterCollectionRegion> collection = new HashMap<>();
    private Set<Integer> mobs = new HashSet<>();
    private Set<MonsterCollectionReward> monsterCollectionRewards = new HashSet<>();
    private Set<MonsterCollectionExploration> monsterCollectionExplorations = new HashSet<>();

    public static MonsterCollection getMonsterCollectionFromSQLByID(int monsterCollectionID) {
        MonsterCollection monsterCollection = null;
        String query = String.format("SELECT * FROM monster_collection WHERE id = %d", monsterCollectionID);
        Connection connection = null;
        Statement st = null;
        ResultSet rs = null;
        try {
            connection = DatabaseManager.getConnection();
            st = connection.createStatement();
            rs = st.executeQuery(query);
            while (rs.next()) {
                int mobID = rs.getInt("mobid");
                int region = rs.getInt("region");
                int session = rs.getInt("session");
                int position = rs.getInt("position");
                //7 table for this system fck you.
            }
            connection.close();
            st.close();
            rs.close();
        } catch (Exception exception) {
            DataPrinter.send(DataPrinter.HIKARICP_ERROR, exception);
        } finally {
            DatabaseManager.closeQuery(rs, st, connection, query);
        }
        return monsterCollection;
    }

    public void init(Char chr) {
        for (int mob : getMobs()) {
            addMob(mob);
        }
        for (MonsterCollectionReward mcr : getMonsterCollectionRewards()) {
            int region = mcr.getRegion();
            int session = mcr.getSession();
            int group = mcr.getGroup();
            if (session == -1) {
                collection.get(region).setClaimedReward(true);
            } else if (group == -1) {
                collection.get(region).getMonsterCollectionSessions().get(session).setRewardClaimed(true);
            } else {
                collection.get(region).getMonsterCollectionSessions().get(session)
                        .getMonsterCollectionGroups().get(group).setRewardClaimed(true);
            }
        }
        sendCompleteInfo(chr);
    }

    public boolean hasMob(int templateID) {
        MonsterCollectionMobInfo mcmi = MonsterCollectionData.getMobInfoByID(templateID);
        return mcmi != null && collection.containsKey(mcmi.getRegion()) &&
                collection.get(mcmi.getRegion()).hasMob(templateID, mcmi);
    }

    public void addMob(int templateID) {
        MonsterCollectionMobInfo mcmi = MonsterCollectionData.getMobInfoByID(templateID);
        if (mcmi == null) {
            return;
        }
        if (!collection.containsKey(mcmi.getRegion())) {
            collection.put(mcmi.getRegion(), new MonsterCollectionRegion());
        }
        collection.get(mcmi.getRegion()).addMob(mcmi);
        getMobs().add(templateID);
    }

    public Set<Integer> getMobs() {
        return mobs;
    }

    public void setMobs(Set<Integer> mobs) {
        this.mobs = mobs;
    }

    public void sendCompleteInfo(Char chr) {
        for (Map.Entry<Integer, MonsterCollectionRegion> entry : collection.entrySet()) {
            entry.getValue().sendCompleteInfo(chr, entry.getKey());
        }
    }

    public void addMobAndUpdateClient(int templateID, Char chr) {
        if (!chr.getAccount().getMonsterCollection().hasMob(templateID)) {
            addMob(templateID);
            MonsterCollectionMobInfo mcmi = MonsterCollectionData.getMobInfoByID(templateID);
            if (mcmi == null) {
                return;
            }
            collection.get(mcmi.getRegion()).getMonsterCollectionSessions().get(mcmi.getSession()).sendCompletionInfo(chr,
                    100000 + mcmi.getRegion() * 100 + mcmi.getSession());
            chr.write(UserPacket.effect(Effect.effectFromWZ("Effect/BasicEff.img/monsterCollectionGet")));
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Set<MonsterCollectionReward> getMonsterCollectionRewards() {
        return monsterCollectionRewards;
    }

    public void setMonsterCollectionRewards(Set<MonsterCollectionReward> monsterCollectionRewards) {
        this.monsterCollectionRewards = monsterCollectionRewards;
    }

    public MonsterCollectionRegion getRegion(int region) {
        return collection.getOrDefault(region, null);
    }

    public MonsterCollectionSession getSession(int region, int session) {
        if (getRegion(region) != null) {
            return getRegion(region).getMonsterCollectionSessions().getOrDefault(session, null);
        }
        return null;
    }

    public MonsterCollectionGroup getGroup(int region, int session, int group) {
        if (getSession(region, session) != null) {
            return getSession(region, session).getMonsterCollectionGroups().getOrDefault(group, null);
        }
        return null;
    }

    public boolean isComplete(int region, int session, int groupID) {
        MonsterCollectionGroup group = getGroup(region, session, groupID);
        if (groupID == -1) {
            boolean complete = true;
            for (Map.Entry<Integer, MonsterCollectionGroup> entry : getSession(region, session).getMonsterCollectionGroups().entrySet()) {
                complete &= isComplete(region, session, entry.getKey());
            }
            return complete;
        }
        return group != null && group.getMobs().size() >= MonsterCollectionData.getRequiredMobs(region, session, groupID);
    }

    public MonsterCollectionExploration getExploration(int region, int session, int group) {
        int collectionKey = region * 10000 + session * 100 + group;
        return getMonsterCollectionExplorations().stream().filter(mce -> mce.getCollectionKey() == collectionKey)
                .findAny().orElse(null);
    }

    public Set<MonsterCollectionExploration> getMonsterCollectionExplorations() {
        return monsterCollectionExplorations;
    }

    public void setMonsterCollectionExplorations(Set<MonsterCollectionExploration> monsterCollectionExplorations) {
        this.monsterCollectionExplorations = monsterCollectionExplorations;
    }

    public MonsterCollectionExploration createExploration(int region, int session, int group) {
        int collectionKey = region * 10000 + session * 100 + group;
        int minutes = MonsterCollectionData.getExplorationMinutes(region, session, group);
        FileTime ft = FileTime.fromDate(LocalDateTime.now().plusMinutes(minutes));
        MonsterCollectionExploration mce = new MonsterCollectionExploration(collectionKey, ft);
        mce.setMonsterKey(String.format("%d:%d:%d:0", region, session, group));
        mce.setPosition(getFirstOpenSlot());
        return mce;
    }

    private int getFirstOpenSlot() {
        List<MonsterCollectionExploration> mces = getMonsterCollectionExplorations().stream()
                .sorted(Comparator.comparingInt(MonsterCollectionExploration::getPosition))
                .collect(Collectors.toList());
        int i;
        for (i = 0; i < mces.size(); i++) {
            MonsterCollectionExploration mce = mces.get(i);
            int pos = i + EXPLORATION_POSITION_START;
            if (mce.getPosition() != pos) {
                return pos;
            }
        }
        return EXPLORATION_POSITION_START + i;
    }

    public void addExploration(MonsterCollectionExploration mce) {
        getMonsterCollectionExplorations().add(mce);
    }

    public void removeExploration(MonsterCollectionExploration mce) {
        getMonsterCollectionExplorations().remove(mce);
    }

    private int getTotalAmountOfSlots() {
        int num;
        int mobs = getMobs().size();
        if (mobs >= 600) {
            num = 5;
        } else if (mobs >= 300) {
            num = 4;
        } else if (mobs >= 150) {
            num = 3;
        } else {
            num = 2;
        }
        return num;
    }

    public int getOpenExplorationSlots() {
        return getTotalAmountOfSlots() - getMonsterCollectionExplorations().size();
    }
}
