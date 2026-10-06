package net.swordie.ms.enums;

import net.swordie.ms.util.Util;

import java.util.Arrays;

public enum DimensionMirrorType {
    MulungDojo(0, 925020000, "Mu Lung Dojo", "Challenge Mu Lung Dojo and see how strong you REALLY are.", 105, 0, 1207, new int[]{1082392, 1082393, 1082394}, false),
    EreveConferencePavilion(1, 913050010, "Ereve Conference Pavilion", "The Maple Alliance has been formed at the Continental Conference. \nBattle the Black Mage in 'Black Heaven' and 'Heroes of Maple'!", 75, 0, 7998, new int[]{1142769, 1142804, 3015030, 3700350, 3017016}, false),
    FightForAzwan(2, 262010000, "Fight for Azwan", "Eliminate the remainder of Hilla's forces in the Azwan area.", 120, 0, 7892, new int[]{1162009, 2430690, 1032136}, false),
    EvolutionLab(3, 957000000, "Evolution Lab", "Ready for the wonders of the Evolution System?", 105, 1801, 1819, new int[]{1162013, 4001832, 2431935, 2431936}, false),
    DimensionalInvasion(4, 940020000, "Dimension Invasion", "Defeat the invaders before it's too late!", 140, 0, 31836, new int[]{1082488, 1082489, 1142527, 1142528, 1142529, 1142530}, false),
    CrimsonwoodCastle(5, 610030010, "Crimsonheart Castle", "A message from Masteria... What's going on?", 130, 31241, 31265, new int[]{1142619, 2431935, 2431936}, false),
    GrandAthanaeum(6, 302000000, "Grand Athenaeum", "Head to the Grand Athenaeum to get a glipse of the past.", 100, 0, 32670, new int[]{1122263, 2431892}, false),
    PartyQuestHub(7, 910002000, "Party Quest Entrance", "It's more fun when you play with friends! Create a party \nto participate in a special mission.", 50, 0, 7887, new int[]{1003762, 1022073, 1132013, 1022175, 1902048, 2432131}, true),
    TowerOfOz(8, 992000000, "Tower of Oz", "Conquer the underwater tower known as the Tower of Oz to help Alicia's Soul.", 140, 42009, 7839, new int[]{2028263, 2432465}, false),
    FriendStory(9, 100000004, "FriendStory", "Experience FriendStory, the first spin-off of MapleStory!", 100, 32707, 33041, new int[]{1182079, 3015119, 3010875, 2432776, 2432788}, false),
    MonsterPark(10, 951000000, "Monster Park", "Massive EXP and different daily rewards await you!", 105, 0, 7900, new int[]{2434746, 2434747, 2434748, 2434749, 2434750, 2434751, 2434745}, false),
    //Maplerunner(11, 993001000, "Maple Runner", "See how quickly you can run and jump through 40 fun stages in the all-new Maple Runner!", 30, 34555, 18837, new int[] { 1142957, 1142958, 1142959 , 4310195 }, false),
    RootAbyss(11, 910700200, "Root Abyss", "Battle the seal guardians to weaken them. \nThe future of Maple World is in your hands.", 125, 30000, 30028, new int[]{1003715, 1003716, 1003717, 1003718}, false),
    Ursus(12, 970072200, "Ursus", "Think you can take on Ursus the Destroyer?", 100, 0, 33553, new int[]{3015279, 2434509, 2434389, 3700334, 1142879}, true),
    GhostPark(13, 100000000, "Ghost Park", "", 1, 0, 0, new int[]{}, false), // new
    //Alishan(15, 749080900, 1, "Alishan", "Do you want to move to Alishan?", 33, 55234, 55255, new int[] { 1202160, 2434004 }, false),
    //TwistedAquaRoad(19, 860000000, "Twisted Aqua Road", "Do you want to move to Twisted Aqua Road?", 200, 17100, 17132, new int[] {}, false),
    //Momijigaoka(20, 807000000, 4, "Momijigaoka", "Do you want to move to Momijigaoka?", 10, 0, 7844, new int[] {}, false),
    //BlackgateCity(21, 610050000, "Blackgate City", "Do you want to move to Blackgate City?", 100, 0, 61132, new int[] {1012535, 1122312, 1132289, 1152191, 1113185}, false),
    PrincessNoPQ(501, 811000000, "Princess No Party Quest", "Do you want to challenge Princess No?", 140, 58913, 58971, new int[]{2432755, 2432754, 2432753, 3010864}, false),
    EventHall(503, 820000000, 2, "Event Hall", "Do you want to move to Event Hall?", 1, 0, 5399, new int[]{}, false),
    AlienVisitor(504, 861000000, "Alien Visitor", "Do you want to move to Alien Visitor?", 200, 0, 17201, new int[]{1113038, 1122256, 1032191, 1132230, 1003893}, false),
    CommerciRepublic(505, 865000001, "Theme Dungeon:\r\n Commerci Republic", "Do you want to move to Commerci Republic?", 140, 17600, 17699, new int[]{1142981, 1302299, 1382232, 1452227, 1332249, 1492200}, false),
    HyperspaceCube(506, 100000000, "Hyperspace Cube", "", 1, 0, 0, new int[]{}, false), // new
    Afterlands(508, "Afterlands", "Do you want to move to Afterlands?", 75, 63020, 63255, new int[]{1202237, 1202238, 1202239, 1202240}, false),
    MushroomShrine(509, 800000000, "Mushroom Shrine", "", 1, 0, 0, new int[]{}, false), // new
    AbrupBaseCamp(510, 100000000, "Abrup Base Camp", "", 1, 0, 0, new int[]{}, false), // new
    NewLeafCity(511, 600000000, "New Leaf City", "", 1, 0, 0, new int[]{}, false), // new
    Gollux(512, 863010000, "Gollux", "", 1, 0, 0, new int[]{}, false), // new
    MapleTour(513, 100000000, "Maple Tour", "", 1, 0, 0, new int[]{}, false), // new
    ;

    private final String name;
    private final String desc;
    private final int id;
    private final int mapId;
    private final int portal;
    private final int reqLevel;
    private final int reqQuest;
    private final int questToSave;
    private final int[] rewards;
    private final boolean squad;

    DimensionMirrorType(int id, int mapId, int portal, String name, String desc, int reqLevel, int reqQuest, int questToSave, int[] rewards, boolean squad) {
        this.id = id;
        this.mapId = mapId;
        this.portal = portal;
        this.name = name;
        this.desc = desc;
        this.reqLevel = reqLevel;
        this.reqQuest = reqQuest;
        this.questToSave = questToSave;
        this.rewards = rewards;
        this.squad = squad;
    }

    DimensionMirrorType(int id, int mapId, String name, String desc, int reqLevel, int reqQuest, int questToSave, int[] rewards, boolean squad) {
        this.id = id;
        this.mapId = mapId;
        this.portal = 0;
        this.name = name;
        this.desc = desc;
        this.reqLevel = reqLevel;
        this.reqQuest = reqQuest;
        this.questToSave = questToSave;
        this.rewards = rewards;
        this.squad = squad;
    }

    DimensionMirrorType(int id, String name, String desc, int reqLevel, int reqQuest, int questToSave, int[] rewards, boolean squad) {
        this.id = id;
        this.mapId = 0;
        this.portal = 0;
        this.name = name;
        this.desc = desc;
        this.reqLevel = reqLevel;
        this.reqQuest = reqQuest;
        this.questToSave = questToSave;
        this.rewards = rewards;
        this.squad = squad;
    }

    public static DimensionMirrorType getByMapId(int mapId) {
        return Util.findWithPred(Arrays.asList(values()), csat -> csat.getMapId() == mapId);
    }

    public static DimensionMirrorType getByID(int id) {
        return Util.findWithPred(Arrays.asList(values()), csat -> csat.getId() == id);
    }

    public String getName() {
        return name;
    }

    public String getDesc() {
        return desc;
    }

    public int getId() {
        return id;
    }

    public int getReqLevel() {
        return reqLevel;
    }

    public int getReqQuest() {
        return reqQuest;
    }

    public int[] getRewards() {
        return rewards;
    }

    public boolean isSquad() {
        return squad;
    }

    public int getQuestToSave() {
        return questToSave;
    }

    public int getMapId() {
        return mapId;
    }

    public int getPortal() {
        return portal;
    }
}
