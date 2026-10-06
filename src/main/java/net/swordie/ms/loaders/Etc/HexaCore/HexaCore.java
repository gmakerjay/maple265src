package net.swordie.ms.loaders.Etc.HexaCore;

import net.swordie.ms.ServerConstants;
import net.swordie.ms.util.XMLApi;
import net.swordie.ms.util.container.Tuple;
import org.w3c.dom.Node;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HexaCore {

    public static final List<HexaSkillCoreData> hexaSkillCoreDatas = new ArrayList<>();
    public static final List<HexaSkillJobCore> hexaSkillJobCores = new ArrayList<>();
    public static final List<HexaStatCoreData> hexaStatCoreData = new ArrayList<>();
    public static final HexaStatInfo hexaStatInfo = new HexaStatInfo();

    public static class HexaSkillCoreData {
        public int coreID = 0;
        public String name = "";
        public String desc = "";
        public int type = 0;
        public int maxLevel = 0;
        public List<Integer> connectSkills = new ArrayList<>();

        public HexaSkillCoreData() {}

        public HexaSkillCoreData(int coreID) {
            this.coreID = coreID;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDesc() {
            return desc;
        }

        public void setDesc(String desc) {
            this.desc = desc;
        }

        public int getType() {
            return type;
        }

        public void setType(int type) {
            this.type = type;
        }

        public int getMaxLevel() {
            return maxLevel;
        }

        public void setMaxLevel(int maxLevel) {
            this.maxLevel = maxLevel;
        }

        public int getCoreID() {
            return coreID;
        }

        public void setCoreID(int coreID) {
            this.coreID = coreID;
        }

        public List<Integer> getConnectSkills() {
            return connectSkills;
        }
    }

    public static class HexaSkillJobCore {
        public int jobID = 0;
        public List<Integer> activateSkills = new ArrayList<>();
        public List<Integer> masterySkills = new ArrayList<>();
        public List<Integer> enforceSkills = new ArrayList<>();
        public List<Integer> commonSkills = new ArrayList<>();

        public HexaSkillJobCore() {}

        public HexaSkillJobCore(int jobID) {
            this.jobID = jobID;
        }

        public int getJobID() {
            return jobID;
        }

        public void setJobID(int jobID) {
            this.jobID = jobID;
        }

        public List<Integer> getActivateSkills() {
            return activateSkills;
        }

        public List<Integer> getMasterySkills() {
            return masterySkills;
        }

        public List<Integer> getEnforceSkills() {
            return enforceSkills;
        }

        public List<Integer> getCommonSkills() {
            return commonSkills;
        }
    }

    public static class HexaStatCoreData {
        public int coreID = 0;
        public String name = "";
        public String desc = "";
        public int reqLevel = 0;
        public int maxLevel = 0;
        public int reqCore = 0;

        public HexaStatCoreData(int coreID) {
            this.coreID = coreID;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDesc() {
            return desc;
        }

        public void setDesc(String desc) {
            this.desc = desc;
        }

        public int getReqLevel() {
            return reqLevel;
        }

        public void setReqLevel(int reqLevel) {
            this.reqLevel = reqLevel;
        }

        public int getMaxLevel() {
            return maxLevel;
        }

        public void setMaxLevel(int maxLevel) {
            this.maxLevel = maxLevel;
        }

        public int getReqCore() {
            return reqCore;
        }

        public void setReqCore(int reqCore) {
            this.reqCore = reqCore;
        }

        public int getCoreID() {
            return coreID;
        }

        public void setCoreID(int coreID) {
            this.coreID = coreID;
        }
    }

    public static class HexaStatInfo {
        public Tuple<Stat, Stat> stats = new Tuple<>(new Stat("main"), new Stat("additional"));

        public HexaStatInfo() {}

        public Tuple<Stat, Stat> getStats() {
            return stats;
        }

        public void setStats(Tuple<Stat, Stat> stats) {
            this.stats = stats;
        }

        public class Stat {
            public String name;
            public int maxLevel = 0;
            public Map<Integer, Map<Integer, Tuple<HexaStatType, Integer>>> datas = new HashMap<>();

            public Stat(String name) {
                this.name = name;
            }

            public int getMaxLevel() {
                return maxLevel;
            }

            public Map<Integer, Map<Integer, Tuple<HexaStatType, Integer>>> getDatas() {
                // Type , level + tuple
                return datas;
            }
        }
    }

    public enum HexaStatType {
        cdPerM(0),
        bdRPerM(1),
        ignoreMobpdpRPerM(2),
        damRPerM(3),
        padX(4),
        madX(5),
        indieStat(6),
        ;
        private final int type;

        HexaStatType(int type) {
            this.type = type;
        }

        public static HexaStatType getValByType(int type) {
            for (HexaStatType hexaStatType : HexaStatType.values()) {
                if (hexaStatType.type == type) {
                    return hexaStatType;
                }
            }
            return null;
        }
    }

    public static void load() {
        String wzDir = ServerConstants.WZ_DIR + "/Etc.wz/HexaCore.img.xml";
        File file = new File(wzDir);
        Node node = XMLApi.getAllChildren(XMLApi.getRoot(file)).getFirst();
        List<Node> nodes = XMLApi.getAllChildren(node);
        for (Node mainNode : nodes) {
            String mainName = XMLApi.getNamedAttribute(mainNode, "name");
            switch (mainName) {
                case "hexaSkill":
                    for (Node skillNode : XMLApi.getAllChildren(mainNode)) {
                        String nName = XMLApi.getNamedAttribute(skillNode, "name");
                        switch (nName) {
                            case "coreData":
                                for (Node dataNode : XMLApi.getAllChildren(skillNode)) {
                                    String dataName = XMLApi.getNamedAttribute(dataNode, "name");
                                    int coreID = Integer.parseInt(dataName);
                                    HexaSkillCoreData hexaCoreInfo = new HexaSkillCoreData(coreID);
                                    for (Node dataInfoNode : XMLApi.getAllChildren(dataNode)) {
                                        String dataInfoName = XMLApi.getNamedAttribute(dataInfoNode, "name");
                                        String dataInfoValue = XMLApi.getNamedAttribute(dataInfoNode, "value");
                                        switch (dataInfoName) {
                                            case "name":
                                                hexaCoreInfo.setName(dataInfoValue);
                                                break;
                                            case "desc":
                                                hexaCoreInfo.setDesc(dataInfoValue);
                                                break;
                                            case "type":
                                                hexaCoreInfo.setType(Integer.parseInt(dataInfoValue));
                                                break;
                                            case "maxLevel":
                                                hexaCoreInfo.setMaxLevel(Integer.parseInt(dataInfoValue));
                                                break;
                                            case "connectSkill":
                                                for (Node connectSkillNode : XMLApi.getAllChildren(dataInfoNode)) {
                                                    hexaCoreInfo.getConnectSkills().add(Integer.parseInt(XMLApi.getNamedAttribute(connectSkillNode, "value")));
                                                }
                                                break;
                                        }
                                    }
                                    hexaSkillCoreDatas.add(hexaCoreInfo);
                                }
                                break;
                            case "jobCore":
                                for (Node dataNode : XMLApi.getAllChildren(skillNode)) {
                                    String dataName = XMLApi.getNamedAttribute(dataNode, "name");
                                    int jobID = Integer.parseInt(dataName);
                                    HexaSkillJobCore hexaJobCore = new HexaSkillJobCore(jobID);
                                    for (Node dataInfoNode : XMLApi.getAllChildren(dataNode)) {
                                        String dataInfoName = XMLApi.getNamedAttribute(dataInfoNode, "name");
                                        switch (dataInfoName) {
                                            case "mastery":
                                                for (Node coreNode : XMLApi.getAllChildren(dataInfoNode)) {
                                                    hexaJobCore.getMasterySkills().add(Integer.parseInt(XMLApi.getNamedAttribute(coreNode, "value")));
                                                }
                                                break;
                                            case "enforce":
                                                for (Node coreNode : XMLApi.getAllChildren(dataInfoNode)) {
                                                    hexaJobCore.getEnforceSkills().add(Integer.parseInt(XMLApi.getNamedAttribute(coreNode, "value")));
                                                }
                                                break;
                                            case "skill":
                                                for (Node coreNode : XMLApi.getAllChildren(dataInfoNode)) {
                                                    hexaJobCore.getActivateSkills().add(Integer.parseInt(XMLApi.getNamedAttribute(coreNode, "value")));
                                                }
                                                break;
                                            case "common":
                                                for (Node coreNode : XMLApi.getAllChildren(dataInfoNode)) {
                                                    hexaJobCore.getCommonSkills().add(Integer.parseInt(XMLApi.getNamedAttribute(coreNode, "value")));
                                                }
                                                break;
                                        }
                                    }
                                    hexaSkillJobCores.add(hexaJobCore);
                                }
                                break;
                        }
                    }
                    break;
                case "hexaStat":
                    for (Node skillNode : XMLApi.getAllChildren(mainNode)) {
                        String nName = XMLApi.getNamedAttribute(skillNode, "name");
                        switch (nName) {
                            case "coreData":
                                for (Node dataNode : XMLApi.getAllChildren(skillNode)) {
                                    String dataName = XMLApi.getNamedAttribute(dataNode, "name");
                                    int coreID = Integer.parseInt(dataName);
                                    HexaStatCoreData hexaCoreInfo = new HexaStatCoreData(coreID);
                                    for (Node dataInfoNode : XMLApi.getAllChildren(dataNode)) {
                                        String dataInfoName = XMLApi.getNamedAttribute(dataInfoNode, "name");
                                        String dataInfoValue = XMLApi.getNamedAttribute(dataInfoNode, "value");
                                        switch (dataInfoName) {
                                            case "name":
                                                hexaCoreInfo.setName(dataInfoValue);
                                                break;
                                            case "desc":
                                                hexaCoreInfo.setDesc(dataInfoValue);
                                                break;
                                            case "reqLevel":
                                                hexaCoreInfo.setReqLevel(Integer.parseInt(dataInfoValue));
                                                break;
                                            case "maxLevel":
                                                hexaCoreInfo.setMaxLevel(Integer.parseInt(dataInfoValue));
                                                break;
                                            case "reqCore":
                                                hexaCoreInfo.setReqCore(Integer.parseInt(dataInfoValue));
                                                break;
                                        }
                                    }
                                    hexaStatCoreData.add(hexaCoreInfo);
                                }
                                break;
                            case "stat":
                                for (Node dataNode : XMLApi.getAllChildren(skillNode)) {
                                    String dataName = XMLApi.getNamedAttribute(dataNode, "name");
                                    if (dataName.equals("main")) {
                                        for (Node mainStatNode : XMLApi.getAllChildren(dataNode)) {
                                            String dataInfoName = XMLApi.getNamedAttribute(mainStatNode, "name");
                                            String dataInfoValue = XMLApi.getNamedAttribute(mainStatNode, "value");
                                            switch (dataInfoName) {
                                                case "maxLevel":
                                                    hexaStatInfo.stats.getLeft().maxLevel = Integer.parseInt(dataInfoValue);
                                                    break;
                                                case "type":
                                                    Map<Integer, List<Tuple<HexaStatType, Integer>>> typeValues = new HashMap<>();
                                                    for (Node typeNode : XMLApi.getAllChildren(mainStatNode)) {
                                                        int type = Integer.parseInt(XMLApi.getNamedAttribute(typeNode, "name"));
                                                        Map<Integer, Tuple<HexaStatType, Integer>> map = new HashMap<>();
                                                        for (Node levelNode : XMLApi.getAllChildren(typeNode)) { // level
                                                            for (Node levelValueNode : XMLApi.getAllChildren(levelNode)) {
                                                                int level = Integer.parseInt(XMLApi.getNamedAttribute(levelValueNode, "name"));
                                                                Tuple<HexaStatType, Integer> tuple = new Tuple<>(null, 0);
                                                                for (Node levelValueTypeNode : XMLApi.getAllChildren(levelValueNode)) {
                                                                    String typeName = XMLApi.getNamedAttribute(levelValueTypeNode, "name");
                                                                    String typeValue = XMLApi.getNamedAttribute(levelValueTypeNode, "value");
                                                                    switch (typeName) {
                                                                        case "cdPerM":
                                                                            tuple.setLeft(HexaStatType.cdPerM);
                                                                            tuple.setRight(Integer.parseInt(typeValue));
                                                                            break;
                                                                        case "bdRPerM":
                                                                            tuple.setLeft(HexaStatType.bdRPerM);
                                                                            tuple.setRight(Integer.parseInt(typeValue));
                                                                            break;
                                                                        case "ignoreMobpdpRPerM":
                                                                            tuple.setLeft(HexaStatType.ignoreMobpdpRPerM);
                                                                            tuple.setRight(Integer.parseInt(typeValue));
                                                                            break;
                                                                        case "damRPerM":
                                                                            tuple.setLeft(HexaStatType.damRPerM);
                                                                            tuple.setRight(Integer.parseInt(typeValue));
                                                                            break;
                                                                        case "padX":
                                                                            tuple.setLeft(HexaStatType.padX);
                                                                            tuple.setRight(Integer.parseInt(typeValue));
                                                                            break;
                                                                        case "madX":
                                                                            tuple.setLeft(HexaStatType.madX);
                                                                            tuple.setRight(Integer.parseInt(typeValue));
                                                                            break;
                                                                        case "indieStat":
                                                                            tuple.setLeft(HexaStatType.indieStat);
                                                                            tuple.setRight(Integer.parseInt(typeValue));
                                                                            break;
                                                                    }
                                                                }
                                                                map.put(level, tuple);
                                                            }
                                                        }
                                                        hexaStatInfo.stats.getLeft().getDatas().put(type, map);
                                                    }
                                                    break;
                                            }
                                        }
                                    } else if (dataName.equals("additional")) {
                                        for (Node mainStatNode : XMLApi.getAllChildren(dataNode)) {
                                            String dataInfoName = XMLApi.getNamedAttribute(mainStatNode, "name");
                                            String dataInfoValue = XMLApi.getNamedAttribute(mainStatNode, "value");
                                            switch (dataInfoName) {
                                                case "maxLevel":
                                                    hexaStatInfo.stats.getLeft().maxLevel = Integer.parseInt(dataInfoValue);
                                                    break;
                                                case "type":
                                                    Map<Integer, List<Tuple<HexaStatType, Integer>>> typeValues = new HashMap<>();
                                                    for (Node typeNode : XMLApi.getAllChildren(mainStatNode)) {
                                                        int type = Integer.parseInt(XMLApi.getNamedAttribute(typeNode, "name"));
                                                        Map<Integer, Tuple<HexaStatType, Integer>> map = new HashMap<>();
                                                        for (Node levelNode : XMLApi.getAllChildren(typeNode)) { // level
                                                            for (Node levelValueNode : XMLApi.getAllChildren(levelNode)) {
                                                                int level = Integer.parseInt(XMLApi.getNamedAttribute(levelValueNode, "name"));
                                                                Tuple<HexaStatType, Integer> tuple = new Tuple<>(null, 0);
                                                                for (Node levelValueTypeNode : XMLApi.getAllChildren(levelValueNode)) {
                                                                    String typeName = XMLApi.getNamedAttribute(levelValueTypeNode, "name");
                                                                    String typeValue = XMLApi.getNamedAttribute(levelValueTypeNode, "value");
                                                                    switch (typeName) {
                                                                        case "cdPerM":
                                                                            tuple.setLeft(HexaStatType.cdPerM);
                                                                            tuple.setRight(Integer.parseInt(typeValue));
                                                                            break;
                                                                        case "bdRPerM":
                                                                            tuple.setLeft(HexaStatType.bdRPerM);
                                                                            tuple.setRight(Integer.parseInt(typeValue));
                                                                            break;
                                                                        case "ignoreMobpdpRPerM":
                                                                            tuple.setLeft(HexaStatType.ignoreMobpdpRPerM);
                                                                            tuple.setRight(Integer.parseInt(typeValue));
                                                                            break;
                                                                        case "damRPerM":
                                                                            tuple.setLeft(HexaStatType.damRPerM);
                                                                            tuple.setRight(Integer.parseInt(typeValue));
                                                                            break;
                                                                        case "padX":
                                                                            tuple.setLeft(HexaStatType.padX);
                                                                            tuple.setRight(Integer.parseInt(typeValue));
                                                                            break;
                                                                        case "madX":
                                                                            tuple.setLeft(HexaStatType.madX);
                                                                            tuple.setRight(Integer.parseInt(typeValue));
                                                                            break;
                                                                        case "indieStat":
                                                                            tuple.setLeft(HexaStatType.indieStat);
                                                                            tuple.setRight(Integer.parseInt(typeValue));
                                                                            break;
                                                                    }
                                                                }
                                                                map.put(level, tuple);
                                                            }
                                                        }
                                                        hexaStatInfo.stats.getRight().getDatas().put(type, map);
                                                    }
                                                    break;
                                            }
                                        }
                                    }
                                }
                                break;
                        }
                    }
                    break;
            }
        }
    }

    public static boolean hasSkillCoreByJob(int coreType, int coreID, int jobID) {
        for (HexaSkillJobCore jobCore : hexaSkillJobCores) {
            if (jobCore.getJobID() == jobID) {
                switch (coreType) {
                    case 1:
                        return jobCore.activateSkills.contains(coreID);
                    case 2:
                        return jobCore.masterySkills.contains(coreID);
                    case 3:
                        return jobCore.enforceSkills.contains(coreID);
                    case 4:
                        return jobCore.commonSkills.contains(coreID);
                }
            }
        }
        return false;
    }

    public static HexaSkillCoreData getSkillCoreData(int coreID) {
        for (HexaSkillCoreData coreData : hexaSkillCoreDatas) {
            if (coreData.getCoreID() == coreID) {
                return coreData;
            }
        }
        return null;
    }

    public static HexaStatCoreData getStatCoreData(int coreID) {
        for (HexaStatCoreData coreData : hexaStatCoreData) {
            if (coreData.getCoreID() == coreID) {
                return coreData;
            }
        }
        return null;
    }
}
