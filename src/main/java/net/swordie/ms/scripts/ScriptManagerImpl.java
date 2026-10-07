package net.swordie.ms.scripts;

import net.swordie.ms.Server;
import net.swordie.ms.ServerConfig;
import net.swordie.ms.ServerConstants;
import net.swordie.ms.client.AccountQuest;
import net.swordie.ms.client.Client;
import net.swordie.ms.client.User;
import net.swordie.ms.client.character.*;
import net.swordie.ms.client.character.avatar.AvatarLook;
import net.swordie.ms.client.character.damage.DamageSkinSaveData;
import net.swordie.ms.client.character.damage.DamageSkinType;
import net.swordie.ms.client.character.items.*;
import net.swordie.ms.client.character.potential.CharacterPotential;
import net.swordie.ms.client.character.quest.Quest;
import net.swordie.ms.client.character.scene.Scene;
import net.swordie.ms.client.character.skills.Option;
import net.swordie.ms.client.character.skills.Skill;
import net.swordie.ms.client.character.skills.matrix.MatrixCore;
import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;
import net.swordie.ms.client.character.skills.temp.TemporaryStatBase;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.client.character.union.Union;
import net.swordie.ms.client.character.union.UnionMember;
import net.swordie.ms.client.jobs.nova.Kaiser;
import net.swordie.ms.client.social.Alliance.Alliance;
import net.swordie.ms.client.social.Alliance.AllianceResult;
import net.swordie.ms.client.social.Guild.Guild;
import net.swordie.ms.client.social.Guild.GuildMember;
import net.swordie.ms.client.social.Guild.GuildResult;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.client.social.Party.PartyMember;
import net.swordie.ms.client.trunk.TrunkOpen;
import net.swordie.ms.connection.OutPacket;
import net.swordie.ms.connection.packet.*;
import net.swordie.ms.constants.*;
import net.swordie.ms.enums.*;
import net.swordie.ms.enums.social.Event.InGameEventType;
import net.swordie.ms.enums.social.Guild.GuildType;
import net.swordie.ms.handlers.GlobalTimerManager;
import net.swordie.ms.handlers.social.RoomHandler;
import net.swordie.ms.handlers.ui.EventNameTagHandler;
import net.swordie.ms.life.Life;
import net.swordie.ms.life.Reactor;
import net.swordie.ms.life.drop.Drop;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.life.mob.MobZoneInfo;
import net.swordie.ms.life.mob.skill.MobSkill;
import net.swordie.ms.life.mob.skill.MobSkillID;
import net.swordie.ms.life.npc.Npc;
import net.swordie.ms.life.npc.NpcMessageType;
import net.swordie.ms.life.npc.NpcScriptInfo;
import net.swordie.ms.loaders.Etc.VCore.VCore;
import net.swordie.ms.loaders.Etc.VCore.VCoreData;
import net.swordie.ms.loaders.*;
import net.swordie.ms.loaders.containerclasses.ItemInfo;
import net.swordie.ms.loaders.containerclasses.MobSkillInfo;
import net.swordie.ms.util.*;
import net.swordie.ms.world.World;
import net.swordie.ms.world.boss.BossHelper;
import net.swordie.ms.world.boss.BossManager;
import net.swordie.ms.world.event.*;
import net.swordie.ms.world.field.*;
import net.swordie.ms.world.field.fieldeffect.FieldEffect;
import net.swordie.ms.world.field.fieldeffect.GreyFieldType;
import net.swordie.ms.world.field.obtacleatom.ObtacleAtomInfo;
import net.swordie.ms.world.field.obtacleatom.ObtacleInRowInfo;
import net.swordie.ms.world.field.obtacleatom.ObtacleRadianInfo;
import net.swordie.ms.world.gach.result.GachaponDlgType;
import net.swordie.ms.world.shop.NpcShopDlg;

import javax.script.*;
import java.io.File;
import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat.*;
import static net.swordie.ms.enums.ChatType.*;
import static net.swordie.ms.enums.EquipBaseStat.*;
import static net.swordie.ms.enums.InvType.*;
import static net.swordie.ms.enums.InventoryOperation.*;
import static net.swordie.ms.life.mob.skill.MobSkillStat.*;
import static net.swordie.ms.life.npc.NpcMessageType.*;

public class ScriptManagerImpl implements ScriptManager {

    private static final ExecutorService service = Executors.newVirtualThreadPerTaskExecutor();

    public static final String SCRIPT_ENGINE_NAME = "python";
    public static final String SCRIPT_ENGINE_EXTENSION = ".py";
    private static final ScriptEngine scriptEngine = new ScriptEngineManager().getEngineByName(SCRIPT_ENGINE_NAME);

    public static final String QUEST_START_SCRIPT_END_TAG = "s";
    public static final String QUEST_COMPLETE_SCRIPT_END_TAG = "e";

    private static final String DEFAULT_SCRIPT = "undefined";
    public static final String INTENDED_NPE_MSG = "Intended NPE by forceful script stop.";

    private String lastActiveScriptName;
    private ScriptType lastActiveScriptType;
    private ScriptMemory memory = new ScriptMemory();

    private Char chr;
    private Field field;
    private NpcScriptInfo npcScriptInfo;
    private Map<ScriptType, ScriptInfo> scripts;
    private Set<ScheduledFuture> events = new HashSet<>();

    private int returnField = 0;
    private int returnPortal = 0;
    private int objectID;

    private FieldTransferInfo fieldTransferInfo;

    private boolean isField;
    private boolean curNodeEventEnd;

    private ScriptManagerImpl(Char chr, Field field) {
        this.chr = chr;
        this.field = field;
        this.npcScriptInfo = new NpcScriptInfo();
        this.scripts = new HashMap<>();
        this.isField = chr == null;
        this.lastActiveScriptName = "Unknown";
        this.lastActiveScriptType = ScriptType.None;
        this.fieldTransferInfo = new FieldTransferInfo();
    }

    public ScriptManagerImpl(Char chr) {
        this(chr, chr.getField());
    }

    public ScriptManagerImpl(Field field) {
        this(null, field);
    }

    private Bindings getBindingsByType(ScriptType scriptType) {
        ScriptInfo si = getScriptInfoByType(scriptType);
        return si == null ? null : si.getBindings();
    }

    public ScriptInfo getScriptInfoByType(ScriptType scriptType) {
        return scripts.getOrDefault(scriptType, null);
    }

    @Override
    public Char getChr() {
        return chr;
    }

    public void setCharacter(Char chr) {
        this.chr = chr;
    }

    public void setField(Field field) {
        this.field = field;
    }

    public String getScriptNameByType(ScriptType scriptType) {
        return getScriptInfoByType(scriptType).getScriptName();
    }

    public Invocable getInvocableByType(ScriptType scriptType) {
        return getScriptInfoByType(scriptType).getInvocable();
    }

    public int getParentIDByScriptType(ScriptType scriptType) {
        return getScriptInfoByType(scriptType) != null ? getScriptInfoByType(scriptType).getParentID() : 2007;
    }

    public int getObjectIDByScriptType(ScriptType scriptType) {
        return getScriptInfoByType(scriptType) != null ? getScriptInfoByType(scriptType).getObjectID() : 0;
    }

    private boolean isQuestScriptAllowed() {
        return getLastActiveScriptType() == ScriptType.None;
    }

    private void notifyMobDeath(Mob mob) {
        if (isActive(ScriptType.FirstEnterField)) {
            getScriptInfoByType(ScriptType.FirstEnterField).addResponseMob(mob);
        } else if (isActive(ScriptType.Field)) {
            getScriptInfoByType(ScriptType.Field).addResponseMob(mob);
        }
    }

    public boolean startScript(Char chr, int parentID, String scriptName, ScriptType scriptType) {
        if (!BossManager.handle(chr, parentID, scriptName)) {
            if (BossManager.check(parentID, scriptName)) {
                scriptType = ScriptType.Boss;
            }
            return start(chr, parentID, 0, scriptName, scriptType);
        }
        return start(chr, parentID, 0, scriptName, scriptType);
    }

    public boolean startScript(Char chr, int parentID, int objID, String scriptName, ScriptType scriptType) {
        if (!BossManager.handle(chr, parentID, scriptName)) {
            if (BossManager.check(parentID, scriptName)) {
                scriptType = ScriptType.Boss;
            }
            return start(chr, parentID, objID, scriptName, scriptType);
        }
        return false;
    }

    public boolean start(Char chr, int parentID, int objID, String scriptName, ScriptType scriptType) {
        if (!isField()) {
            System.out.printf("%s: Starting script %s, scriptType %s.%n", chr.getName(), scriptName, scriptType);
        }
        if (scriptType == ScriptType.None || (scriptType == ScriptType.Quest && !isQuestScriptAllowed())) {
            return false;
        }
        if (scriptType == ScriptType.Item && ScriptHandlers.handleItemScripts(chr, parentID, objID, scriptName, scriptType)) {
            chr.dispose();
            return true;
        }
        boolean exists = new File(String.format("%s/%s/%s%s", ServerConstants.SCRIPT_DIR, scriptType.getDir().toLowerCase(), scriptName, SCRIPT_ENGINE_EXTENSION)).exists();
        if (!exists) {
            undefined(scriptType, parentID);
            return true;
        }
        if (isActive(scriptType) && scriptType != ScriptType.Field) { // because Field Scripts don't get disposed.
            progressMessageFont(3, 17, 7, 1000, "You are doing it too fast! Please try again.");
            return false;
        }
        if (chr != null) {
            setCharacter(chr);
            setField(chr.getField());
        }
        setLastActiveScriptType(scriptType);
        setLastActiveScriptName(scriptName);
        setObjectID(objID);
        resetParam();
        Bindings bindings = scriptEngine.createBindings();
        bindings.put("sm", chr == null ? this : chr.getScriptManager());
        bindings.put("chr", chr);
        bindings.put("field", chr == null ? getField() : chr.getField());
        bindings.put("parentID", parentID);
        bindings.put("scriptType", scriptType);
        bindings.put("objectID", objID);
        if (scriptType == ScriptType.Reactor) {
            bindings.put("reactor", chr == null ? getField().getLifeByObjectID(objID) : chr.getField().getLifeByObjectID(objID));
        }
        if (scriptType == ScriptType.Quest) {
            bindings.put("startQuest", scriptName.charAt(scriptName.length() - 1) == QUEST_START_SCRIPT_END_TAG.charAt(0)); // biggest hack eu
        }
        ScriptInfo si = new ScriptInfo(scriptType, bindings, parentID, scriptName);
        if (scriptType == ScriptType.Npc || scriptType == ScriptType.Boss) {
            getNpcScriptInfo().setTemplateID(parentID);
        }
        getNpcScriptInfo().setObjectID(objID);
        si.setObjectID(objID);
        getScripts().put(scriptType, si);
        service.execute(() -> start(scriptName, si));
        return true;
    }

    private void start(String name, ScriptInfo si) {
        if (si == null) {
            return;
        }
        final ScriptType scriptType = si.getScriptType();
        final String dir = String.format("%s/%s/%s%s", ServerConstants.SCRIPT_DIR, scriptType.getDir().toLowerCase(), name, SCRIPT_ENGINE_EXTENSION);
        si.setActive(true);
        si.setFileDir(dir);
        CompiledScript cs;
        StringBuilder script = new StringBuilder();
        ScriptEngine se = scriptEngine;
        Bindings bindings = getBindingsByType(scriptType);
        si.setInvocable((Invocable) se);
        try {
            String context = Util.readFile(dir, StandardCharsets.UTF_8);
            script.append(context);
        } catch (IOException e) {
            DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, e);
            unlockUI();
        }
        try {
            if (!script.isEmpty()) {
                cs = ((Compilable) se).compile(script.toString());
                cs.eval(bindings);
            }
        } catch (ScriptException e) {
            if (!isIntendedStop(e)) {
                DataPrinter.send(DataPrinter.SCRIPTS,
                        String.format("Không thể chạy script [%s]! Exception [%s] ở dòng %s.",
                                name, e.getMessage(), e.getLineNumber()), true);
                unlockUI();
                progressMessageFont(3, 20, 9, 1000,
                        "Unknown error! Please type @sualoi or @dispose.");
            }
        } finally {
            stop(scriptType);
            FieldTransferInfo fti = getFieldTransferInfo();
            if (!fti.isInit()) {
                if (fti.isField()) {
                    fti.warp(field);
                } else {
                    fti.warp(chr);
                }
            }
            System.out.printf("%s: Completed script %s, scriptType %s.%n", chr != null ? chr.getName() : "Null", name, scriptType);
            chr.dispose();
        }
    }

    private boolean isIntendedStop(ScriptException e) {
        String msg = e.getMessage();
        if (msg != null && msg.contains(INTENDED_NPE_MSG)) {
            return true;
        }
        Throwable t = e.getCause();
        while (t != null) {
            String m = t.getMessage();
            if (m != null && m.contains(INTENDED_NPE_MSG)) {
                return true;
            }
            t = t.getCause();
        }
        return false;
    }

    public void stop(ScriptType scriptType) {
        for (Map.Entry<ScriptType, ScriptInfo> entry : getScripts().entrySet()) {
            if (entry.getKey() == scriptType && entry.getValue() != null) {
                entry.getValue().reset();
            }
        }
        setSpeakerID(0);
        if (getLastActiveScriptType() == scriptType) {
            setLastActiveScriptType(ScriptType.None);
            setLastActiveScriptName(null);
        }
        getNpcScriptInfo().reset();
        getMemory().clear();
        unlockUI();
    }

    private void undefined(ScriptType scriptType, int parentID) {
        switch (scriptType) {
            case Item:
                chat("Vật phẩm chưa được làm, vui lòng báo cho đội ngũ Developer. ID: " + parentID);
                chr.dispose();
                break;
            case Portal:
                chat("Cánh cổng chưa được làm, vui lòng báo cho đội ngũ Developer. ID: " + parentID);
                chr.dispose();
                break;
            case Quest:
                chat("Nhiệm vụ chưa được làm, vui lòng báo cho đội ngũ Developer. ID: " + parentID);
                chr.dispose();
                break;
            case Reactor:
                chat("Reactor chưa được làm, vui lòng báo cho đội ngũ Developer. ID: " + parentID);
                chr.dispose();
                break;
            case Field:
                chat("Bản đồ chưa được làm, vui lòng báo cho đội ngũ Developer. ID: " + parentID);
                chr.dispose();
                break;
            case Npc:
                String[] dialogues = new String[]{"Coi chừng! Mấy con Slime dạo này mạnh hơn bình thường đó.",
                        "Bạn có thấy con lợn vàng nào chạy qua đây không? Tôi bị mất một con rồi!",
                        "Tôi vừa thấy một con Golem Đất đá đang canh giữ một kho báu. Cẩn thận, nó rất cứng đầu.",
                        "Ồ, bạn có vẻ là một Thợ Săn tiền thưởng. Liệu bạn có thể giúp tôi dọn dẹp một vài con quái vật?",
                        "Những con Nấm Sừng đang lảng vảng gần rìa thị trấn. Hy vọng chúng không làm phiền ai.",
                        "Bạn đã bao giờ thấy một con Yeti chưa? Chúng to lớn hơn tôi tưởng tượng nhiều.",
                        "Tôi đã mất con dao yêu quý của mình ở gần Cây Ma. Chắc một con Quái Vật Ma Thuật đã lấy nó đi rồi.",
                        "Bạn có mang theo một vài viên đạn không? Tôi đã dùng hết của mình để chiến đấu với lũ Rồng Đá.",
                        "Đừng đánh giá thấp mấy con Slime xanh. Chúng có thể vô hại, nhưng khi chúng đi theo đàn...",
                        "Mũ của bạn bị rách rồi, chắc là do mấy con lợn rừng gặm phải?",
                        "Tôi cần một vài chiếc Sừng Mềm từ đám Nấm Xanh. Liệu bạn có thể giúp tôi không?",
                        "Hãy giúp tôi tìm Lõi Quái Vật từ lũ Gấu Xanh. Tôi sẽ thưởng cho bạn một món quà xứng đáng.",
                        "Chẳng may tôi làm rơi cuộn giấy phép thuật của mình. Nó có thể ở đâu đó gần khu rừng Phép Thuật.",
                        "Bạn có đủ Băng Tuyết để tôi có thể làm ra món kem không? Sẽ rất khó để tìm được.",
                        "Để chế tạo vũ khí này, tôi cần 10 Mảnh Vỡ Tinh Thể. Bạn có thể tìm thấy chúng trong mỏ.",
                        "Tôi cần thêm một vài viên ngọc quý. Nghe nói chúng chỉ rơi ra từ những con Golem Đá đặc biệt.",
                        "Hãy mang cho tôi một cái Cánh Dơi. Tôi cần nó để hoàn thành một nhiệm vụ bí mật.",
                        "Bạn đã tìm thấy chiếc nhẫn mà tôi làm mất chưa? Nó có biểu tượng của một con Rồng.",
                        "Tôi cần 20 chiếc Lông Chim để làm một cái gối. Liệu bạn có thể giúp tôi không?",
                        "Tôi sẽ trả cho bạn một khoản tiền lớn nếu bạn mang về cho tôi Bùa Cấm Thuật từ Hang Rồng.",
                        "Bạn cần một thanh kiếm mạnh hơn để đối phó với kẻ thù chứ? Tôi có thể rèn cho bạn một cái.",
                        "Sắp tới, bạn có định chuyển nghề không? Cần phải suy nghĩ thật kĩ.",
                        "Tôi đã chế tạo ra một lọ thuốc mới, nó có thể tăng sức mạnh của bạn trong thời gian ngắn.",
                        "Bạn có đủ kinh nghiệm để học kĩ năng mới chưa?",
                        "Kinh nghiệm là tất cả. Đừng chỉ tập trung vào việc kiếm tiền.",
                        "Hãy học hỏi thật nhiều để trở nên mạnh mẽ hơn. Đó là lời khuyên của tôi.",
                        "Tài năng thiên bẩm chỉ chiếm một phần nhỏ thôi. Sự chăm chỉ mới là điều quan trọng.",
                        "Tôi đã từng là một thợ rèn danh tiếng. Nhưng bây giờ thì chỉ còn là quá khứ.",
                        "Thế giới này luôn cần những người thợ thủ công giỏi. Bạn có muốn học nghề không?",
                        "Lên cấp là một hành trình dài. Chúc may mắn.",
                        "Bạn có kế hoạch đến Đảo Victoria không? Nơi đó có rất nhiều bí mật.",
                        "Đừng bao giờ đến Bến Cảng Lith. Nơi đó quá nguy hiểm cho một người mới như bạn.",
                        "Tôi đã nghe những câu chuyện về một thành phố trên trời. Có lẽ bạn sẽ khám phá được điều gì đó.",
                        "Hãy cẩn thận khi đến Tháp Hỗn Độn. Nghe đồn những con quái vật ở đó rất đáng sợ.",
                        "Bạn có thấy Lâu Đài Chuỗi Không Vận chưa? Nghe nói đó là nơi của những hiệp sĩ huyền thoại.",
                        "Hãy đi đến vùng đất Tuyết của El Nath, ở đó có một ông già rất giỏi ma thuật.",
                        "Thị trấn Perion luôn bận rộn với các chiến binh.",
                        "Tôi nghĩ bạn nên đến Mỏ Ant Tunnel. Đó là nơi tuyệt vời để luyện cấp.",
                        "Có rất nhiều nơi để khám phá. Hãy chuẩn bị hành trang của bạn thật kỹ.",
                        "Bạn đã nghe về thành phố dưới biển Aquario chưa? Nghe nói rất đẹp.",
                        "Chắc chắn là do tôi đã ăn quá nhiều lợn rừng. Bây giờ tôi chỉ muốn ngủ thôi.",
                        "Bạn có một cái đầu nấm giống hệt một con nấm sừng đó!",
                        "Tôi vừa bị một con Slime trượt chân làm té. Thật là xấu hổ.",
                        "Có vẻ như tôi đã bị lạc. Bạn có thể giúp tôi tìm đường về không?",
                        "Tôi đã nói với bạn rồi, tôi không phải là một NPC làm nhiệm vụ!",
                        "Mũ của bạn trông thật buồn cười. Nó là một cái mũ nấm à?",
                        "Món bánh ngọt ở đây ngon tuyệt vời! Bạn có muốn thử không?",
                        "Tôi không thể giúp bạn đâu, tôi chỉ là một người qua đường thôi.",
                        "Tôi đã thấy bạn đánh rơi một món đồ. À không, đó chỉ là một viên đá thôi.",
                        "Ồ, tôi đang bận đếm số lá trên cây. Bạn có thể quay lại sau không?"};
                sendOK(Util.getRandomFromCollection(dialogues), parentID);
                break;
            default:
                chr.dispose();
                break;
        }
    }

    @Override
    public void update(Observable o, Object arg) {
        if (o instanceof Mob mob) {
            notifyMobDeath(mob);
        }
    }

    public void handleAction(ScriptType scriptType, NpcMessageType lastType, byte response, int answer, String text) {
        switch (response) {
            case -1, 5 -> stop(scriptType);
            default -> {
                ScriptMemory sm = getMemory();
                if (lastType.isPrevPossible() && response == 0) {
                    // back button pressed
                    NpcScriptInfo prev = sm.getPreviousScriptInfo();
                    chr.write(ScriptMan.scriptMessage(prev, prev.getMessageType()));
                } else {
                    if (getMemory().isInMemory()) {
                        NpcScriptInfo next = sm.getNextScriptInfo();
                        chr.write(ScriptMan.scriptMessage(next, next.getMessageType()));
                    } else {
                        ScriptInfo si = getScriptInfoByType(scriptType);
                        if (isActive(scriptType)) {
                            switch (lastType.getResponseType()) {
                                case Response -> si.addResponseInteger((int) response);
                                case Answer -> si.addResponseInteger(answer);
                                case Text -> si.addResponseString(text);
                            }
                        }
                    }
                }
            }
        }
    }

    public boolean isActive(ScriptType scriptType) {
        return getScriptInfoByType(scriptType) != null && getScriptInfoByType(scriptType).isActive();
    }

    public NpcScriptInfo getNpcScriptInfo() {
        return npcScriptInfo;
    }

    public Map<ScriptType, ScriptInfo> getScripts() {
        return scripts;
    }

    public int getParentID() {
        int res = 0;
        for (ScriptType type : ScriptType.values()) {
            if (getScriptInfoByType(type) != null) {
                res = getScriptInfoByType(type).getParentID();
            }
        }
        return res;
    }

    public boolean isField() {
        return isField;
    }

    public Field getField() {
        if (field == null) {
            return getChr().getField();
        }
        return field;
    }

    public String getLastActiveScriptName() {
        return lastActiveScriptName;
    }

    public void setLastActiveScriptName(String lastActiveScriptName) {
        this.lastActiveScriptName = lastActiveScriptName;
    }

    public ScriptType getLastActiveScriptType() {
        return lastActiveScriptType;
    }

    public void setLastActiveScriptType(ScriptType lastActiveScriptType) {
        this.lastActiveScriptType = lastActiveScriptType;
    }

    public FieldTransferInfo getFieldTransferInfo() {
        return fieldTransferInfo;
    }

    public void setFieldTransferInfo(FieldTransferInfo fieldTransferInfo) {
        this.fieldTransferInfo = fieldTransferInfo;
    }

    // Start of the sends/asks -----------------------------------------------------------------------------------------

    @Override
    public int sendSay(String text) {
        if (getLastActiveScriptType() == ScriptType.None) {
            return 0;
        }
        return sendGeneralSay(text, Say);
    }

    public int sendSayIllustration(String text, int faceIndex, boolean isLeft) {
        if (getLastActiveScriptType() == ScriptType.None) {
            return 0;
        }
        getNpcScriptInfo().setFaceIndex(faceIndex);
        getNpcScriptInfo().setLeft(isLeft);
        return sendGeneralSay(text, SayIllustration);
    }

    /**
     * Helper function that ensures that selections have the appropriate type (AskMenu).
     *
     * @param text
     * @param nmt
     */
    private int sendGeneralSay(String text, NpcMessageType nmt) throws NullPointerException {
        NpcScriptInfo nsi = getNpcScriptInfo();
        nsi.setText(text);
        if (text.contains("#L")) {
            nmt = AskMenu;
        }
        nsi.setMessageType(nmt);
        chr.write(ScriptMan.scriptMessage(nsi, nmt));
        getMemory().addMemoryInfo(nsi);
        Integer response = null;
        if (!isActive(getLastActiveScriptType())) {
            throw new NullPointerException(INTENDED_NPE_MSG);
        }
        if (isActive(getLastActiveScriptType())) {
            ScriptInfo si = getScriptInfoByType(getLastActiveScriptType());
            if (si == null) {
                throw new NullPointerException(INTENDED_NPE_MSG);
            }
            response = si.awaitResponseInteger(0);
        }
        if (response == null) {
            throw new NullPointerException(INTENDED_NPE_MSG);
        }
        return response;
    }

    @Override
    public int sendNext(String text) {
        return sendGeneralSay(text, SayNext);
    }

    @Override
    public int sendPrev(String text) {
        return sendGeneralSay(text, SayPrev);
    }

    @Override
    public int sendSayOkay(String text) {
        return sendGeneralSay(text, SayOk);
    }

    public int sendSayNextIllustration(String text, int faceIndex, boolean isLeft) {
        getNpcScriptInfo().setFaceIndex(faceIndex);
        getNpcScriptInfo().setLeft(isLeft);
        return sendGeneralSay(text, SayIllustrationNext);
    }

    public int sendSayPrevIllustration(String text, int faceIndex, boolean isLeft) {
        getNpcScriptInfo().setFaceIndex(faceIndex);
        getNpcScriptInfo().setLeft(isLeft);
        return sendGeneralSay(text, SayIllustrationPrev);
    }

    public int sendSayOkayIllustration(String text, int faceIndex, boolean isLeft) {
        getNpcScriptInfo().setFaceIndex(faceIndex);
        getNpcScriptInfo().setLeft(isLeft);
        return sendGeneralSay(text, SayIllustrationOk);
    }

    @Override
    public int sendSayImage(String image) {
        return sendSayImage(new String[]{image});
    }

    @Override
    public int sendSayImage(String[] images) {
        getNpcScriptInfo().setImages(images);
        getNpcScriptInfo().setMessageType(SayImage);
        return sendGeneralSay("", SayImage);
    }

    @Override
    public boolean sendAskYesNo(String text) {
        return sendGeneralSay(text, AskYesNo) != 0;
    }

    @Override
    public boolean sendAskAccept(String text) {
        return sendGeneralSay(text, AskAccept) != 0;
    }

    @Override
    public String sendAskText(String text, String defaultText, short minLength, short maxLength) throws NullPointerException {
        NpcScriptInfo nsi = getNpcScriptInfo();
        nsi.setMin(minLength);
        nsi.setMax(maxLength);
        nsi.setDefaultText(defaultText);
        nsi.setText(text);
        nsi.setMessageType(AskText);
        chr.write(ScriptMan.scriptMessage(nsi, AskText));
        getMemory().addMemoryInfo(nsi);
        ScriptInfo si = getScriptInfoByType(getLastActiveScriptType());
        if (si == null) {
            throw new NullPointerException(INTENDED_NPE_MSG);
        }
        String response = si.awaitResponseString(0);
        if (response == null) {
            throw new NullPointerException(INTENDED_NPE_MSG);
        }
        return response;
    }

    public int sendAskStoryUI(String text, String key, byte type) {
        NpcScriptInfo nsi = getNpcScriptInfo();
        nsi.setText(text);
        nsi.setHintText(key);
        nsi.setType(type);
        return sendGeneralSay(text, AskStoryUI);
    }

    @Override
    public int sendAskNumber(String text, int defaultNum, int min, int max) {
        NpcScriptInfo nsi = getNpcScriptInfo();
        nsi.setDefaultNumber(defaultNum);
        nsi.setMin(min);
        nsi.setMax(max);
        return sendGeneralSay(text, AskNumber);
    }

    @Override
    public int sendInitialQuiz(byte type, String title, String problem, String hint, int min, int max, int time) {
        NpcScriptInfo nsi = getNpcScriptInfo();
        nsi.setType(type);
        if (type != 1) {
            nsi.setTitle(title);
            nsi.setProblemText(problem);
            nsi.setHintText(hint);
            nsi.setMin(min);
            nsi.setMax(max);
            nsi.setTime(time);
        }
        return sendGeneralSay(title, InitialQuiz);
    }

    @Override
    public int sendInitialSpeedQuiz(byte type, int quizType, int answer, int correctAnswers, int remaining, int time) {
        NpcScriptInfo nsi = getNpcScriptInfo();
        nsi.setType(type);
        if (type != 1) {
            nsi.setQuizType(quizType);
            nsi.setAnswer(answer);
            nsi.setCorrectAnswers(correctAnswers);
            nsi.setRemaining(remaining);
            nsi.setTime(time);
        }
        return sendGeneralSay("", InitialSpeedQuiz);
    }

    @Override
    public int sendICQuiz(byte type, String text, String hintText, int time) {
        NpcScriptInfo nsi = getNpcScriptInfo();
        nsi.setType(type);
        nsi.setHintText(hintText);
        nsi.setTime(time);
        return sendGeneralSay(text, ICQuiz);
    }

    @Override
    public int sendAskAvatar(String text, boolean angelicBuster, boolean zeroBeta, int... options) {
        NpcScriptInfo nsi = getNpcScriptInfo();
        nsi.setAngelicBuster(angelicBuster);
        nsi.setZeroBeta(zeroBeta);
        nsi.setOptions(options);
        return sendGeneralSay(text, AskAvatar);
    }

    public int sendAskSlideMenu(int dlgType) {
        NpcScriptInfo nsi = getNpcScriptInfo();
        nsi.setDlgType(dlgType);
        return sendGeneralSay("", AskSlideMenu);
    }

    public int sendAskSelectMenu(int dlgType, int defaultSelect) {
        return sendAskSelectMenu(dlgType, defaultSelect, new String[]{});
    }

    public int sendAskSelectMenu(int dlgType, int defaultSelect, String[] text) {
        NpcScriptInfo nsi = getNpcScriptInfo();
        nsi.setDlgType(dlgType);
        nsi.setDefaultSelect(defaultSelect);
        nsi.setSelectText(text);
        return sendGeneralSay("", AskSelectMenu);
    }

    public int sendAskCustomMixHair(String text, boolean zeroBeta) {
        NpcScriptInfo nsi = getNpcScriptInfo();
        nsi.setAngelicBuster(JobConstants.isAngelicBuster(chr.getJob()));
        nsi.setZeroBeta(zeroBeta);
        return sendGeneralSay(text, AskCustomMixHair);
    }


    // Start of param methods ------------------------------------------------------------------------------------------

    public void setParam(int param) {
        getNpcScriptInfo().setParam((short) param);
    }

    public void setColor(int color) {
        getNpcScriptInfo().setColor((byte) color);
    }

    public void resetParam() {
        getNpcScriptInfo().resetParam();
    }

    public void removeEscapeButton() {
        getNpcScriptInfo().addParam(NpcScriptInfo.Param.NotCancellable);
    }

    public void addEscapeButton() {
        if (getNpcScriptInfo().hasParam(NpcScriptInfo.Param.NotCancellable)) {
            getNpcScriptInfo().removeParam(NpcScriptInfo.Param.NotCancellable);
        }
    }

    public void flipSpeaker() {
        getNpcScriptInfo().addParam(NpcScriptInfo.Param.FlipSpeaker);
    }

    public void flipDialogue() {
        getNpcScriptInfo().addParam(NpcScriptInfo.Param.OverrideSpeakerID);
    }

    public void flipDialoguePlayerAsSpeaker() {
        getNpcScriptInfo().addParam(NpcScriptInfo.Param.PlayerAsSpeakerFlip);
    }

    public void setPlayerAsSpeaker() {
        getNpcScriptInfo().addParam(NpcScriptInfo.Param.PlayerAsSpeaker);
    }

    public void setColor(byte color) {
        getNpcScriptInfo().setColor(color);
    }

    public void setBoxChat() {
        setBoxChat(true);
    }

    public void setBoxChat(boolean color) { // true = Standard BoxChat  |  false = Zero BoxChat
        getNpcScriptInfo().setColor((byte) (color ? 1 : 0));
        getNpcScriptInfo().addParam(NpcScriptInfo.Param.BoxChat);
    }

    public void setNpcBoxChat(int npcID) {
        setSpeakerID(npcID);
        getNpcScriptInfo().setColor((byte) 1);
        getNpcScriptInfo().addParam(NpcScriptInfo.Param.BoxChatOverrideSpeakerNoEndChat);
    }

    public void setPlayerBoxChat() {
        setBoxChat();
        flipBoxChat();
        flipBoxChatPlayerAsSpeaker();
    }

    public void setNpcOverrideBoxChat(int npcID) {
        setSpeakerID(npcID);
        getNpcScriptInfo().setColor((byte) 1);
        getNpcScriptInfo().addParam(NpcScriptInfo.Param.BoxChatOverrideSpeakerNoEndChat);
    }

    public void setBoxOverrideSpeaker() {
        getNpcScriptInfo().addParam(NpcScriptInfo.Param.BoxChatOverrideSpeaker);
    }

    public void flipBoxChat() {
        getNpcScriptInfo().addParam(NpcScriptInfo.Param.FlipBoxChat);
    }

    public void boxChatPlayerAsSpeaker() {
        getNpcScriptInfo().addParam(NpcScriptInfo.Param.BoxChatAsPlayer);
    }

    public void flipBoxChatPlayerAsSpeaker() {
        getNpcScriptInfo().addParam(NpcScriptInfo.Param.FlipBoxChatAsPlayer);
    }

    public void flipBoxChatPlayerNoEscape() {
        getNpcScriptInfo().addParam(NpcScriptInfo.Param.FlipBoxChatAsPlayerNoEscape);
    }

    public final String options(final String... vals) {
        final StringBuilder menu = new StringBuilder();
        for (int i = 0; i < vals.length; i++) {
            menu.append("#L").append(i).append("#").append(vals[i]).append("#l").append(i == vals.length - 1 ? "" : "\r\n");
        }
        return menu.toString();
    }

    public void sendOK(String text, int npcTemplateID) {
        chr.write(UserLocal.setUtilDlg(text, npcTemplateID));
    }
    // Start helper methods for scripts --------------------------------------------------------------------------------

    @Override
    public void dispose() {
        getNpcScriptInfo().reset();
        getMemory().clear();
        stop(ScriptType.Npc);
        stop(ScriptType.Portal);
        stop(ScriptType.Item);
        stop(ScriptType.Quest);
        stop(ScriptType.Reactor);
        stop(ScriptType.Field);
        setCurNodeEventEnd(false);
        getScripts().clear();
    }

    public Position getPosition(int objId) {
        return chr.getField().getLifeByObjectID(objId).getPosition();
    }


    // Character Stat-related methods ----------------------------------------------------------------------------------

    @Override
    public String getJob() {
        return JobConstants.getJobEnumById(chr.getJob()).toString();
    }

    @Override
    public void setJob(short jobID) {
        chr.setJob(jobID);
        Map<Stat, Object> stats = new HashMap<>();
        stats.put(Stat.job, jobID);
        chr.sendStatsPacket(stats);
    }

    public void addSPJobAdv(short job, int amount) {
        chr.addSpToSpecificJob(job, amount);
        Map<Stat, Object> stats = new HashMap<>();
        stats.put(Stat.sp, chr.getAvatarData().getCharacterStat().getExtendSP());
        chr.sendStatsPacket(stats);
        chr.write(WvsContext.incSpMessage(chr.getJob(), (byte) amount));
    }

    @Override
    public void addSP(int amount, boolean jobAdv) {
        byte jobLevel = (byte) JobConstants.getJobLevel(chr.getJob());
        int currentSP = chr.getAvatarData().getCharacterStat().getExtendSP().getSpByJobLevel(jobLevel);
        setSP(currentSP + amount);
        if (jobAdv) {
            chr.write(WvsContext.incSpMessage(chr.getJob(), (byte) amount));
        }
    }

    @Override
    public void setSP(int amount) {
        chr.setSpToCurrentJob(amount);
        Map<Stat, Object> stats = new HashMap<>();
        stats.put(Stat.sp, chr.getAvatarData().getCharacterStat().getExtendSP());
        chr.sendStatsPacket(stats);
    }

    @Override
    public void addAP(int amount) {
        int currentAP = chr.getAvatarData().getCharacterStat().getAp();
        setAP(currentAP + amount);
    }

    @Override
    public void setAP(int amount) {
        chr.setStat(Stat.ap, (short) amount);
        Map<Stat, Object> stats = new HashMap<>();
        stats.put(Stat.ap, (short) amount);
        chr.sendStatsPacket(stats);
    }

    @Override
    public void resetAP(boolean hpmp) {
        resetAP(hpmp, (short) 0);
    }

    @Override
    public void resetAP(boolean hpmp, short jobID) {
        Map<Stat, Object> stats = new HashMap<>();
        stats.put(Stat.str, chr.getAvatarData().getCharacterStat().getStr());
        stats.put(Stat.dex, chr.getAvatarData().getCharacterStat().getDex());
        stats.put(Stat.luk, chr.getAvatarData().getCharacterStat().getLuk());
        stats.put(Stat.inte, chr.getAvatarData().getCharacterStat().getInt());
        stats.put(Stat.ap, chr.getAvatarData().getCharacterStat().getAp());

        // Identify Primary Stat, special case only exist for Thief (Xenon) & Pirates (Also including Xenon)
        Stat primaryStat = JobConstants.isWarriorEquipJob(jobID) ? Stat.str : JobConstants.isArcherEquipJob(jobID) ? Stat.dex : JobConstants.isMageEquipJob(jobID) ? Stat.inte : JobConstants.isThiefEquipJob(jobID) ? Stat.luk : Stat.ap;
        if (JobConstants.isXenon(jobID) || JobConstants.isAdventurerPirate(jobID) && !JobConstants.isBuccaneer(jobID) && !JobConstants.isCorsair(jobID) && !JobConstants.isCannoneer(jobID)) {
            primaryStat = Stat.ap; // If we are a xenon or a 1st job adventurer pirate put points back into AP
        } else if (JobConstants.isBuccaneer(jobID) || JobConstants.isThunderBreaker(jobID) || JobConstants.isShade(jobID) || JobConstants.isCannoneer(jobID)) {
            primaryStat = Stat.str; // Handle STR pirates
        } else if (JobConstants.isPirateEquipJob(jobID)) {
            primaryStat = Stat.dex; // if none of the above conditions apply & we're a pirate, only remaining choice is DEX, otherwise we leave primary stat as AP
        }
        int buffer = 0; // Difference between the stat's current value and its minimum (0 for AP, 4 for the four traditional stats)
        for (Map.Entry<Stat, Object> stat : stats.entrySet()) {
            if (stat.getKey() != primaryStat) {
                buffer = ((short) stat.getValue() - (stat.getKey() != Stat.ap ? 4 : 0));
                if (buffer > 0) {
                    stat.setValue((short) ((short) stat.getValue() - buffer));
                    stats.put(primaryStat, (short) ((short) stats.get(primaryStat) + buffer));
                    chr.setStat(stat.getKey(), (short) stats.get(stat.getKey()));
                    chr.setStat(primaryStat, (short) stats.get(primaryStat));
                }
            }
        }
        chr.sendStatsPacket(stats);
    }

    @Override
    public void setSTR(short amount) {
        chr.setStat(Stat.str, amount);
        Map<Stat, Object> stats = new HashMap<>();
        stats.put(Stat.str, amount);
        chr.sendStatsPacket(stats);
    }

    @Override
    public void setINT(short amount) {
        chr.setStat(Stat.inte, amount);
        Map<Stat, Object> stats = new HashMap<>();
        stats.put(Stat.inte, amount);
        chr.sendStatsPacket(stats);
    }

    @Override
    public void setDEX(short amount) {
        chr.setStat(Stat.dex, amount);
        Map<Stat, Object> stats = new HashMap<>();
        stats.put(Stat.dex, amount);
        chr.sendStatsPacket(stats);
    }

    @Override
    public void setLUK(short amount) {
        chr.setStat(Stat.luk, amount);
        Map<Stat, Object> stats = new HashMap<>();
        stats.put(Stat.luk, amount);
        chr.sendStatsPacket(stats);
    }

    public void incCharismaEXP(short amount) {
        chr.addTraitExp(Stat.charismaEXP, amount);
    }

    public void incInsightEXP(short amount) {
        chr.addTraitExp(Stat.insightEXP, amount);
    }

    public void incWillEXP(short amount) {
        chr.addTraitExp(Stat.willEXP, amount);
    }

    public void incCraftEXP(short amount) {
        chr.addTraitExp(Stat.craftEXP, amount);
    }

    public void incSenseEXP(short amount) {
        chr.addTraitExp(Stat.senseEXP, amount);
    }

    public void incCharmEXP(short amount) {
        chr.addTraitExp(Stat.charmEXP, amount);
    }

    public void incTraitExp(Stat stat, short amount) {
        chr.addTraitExp(stat, amount);
    }

    public void addMaxHP(int amount) {
        chr.addStatAndSendPacket(Stat.mhp, amount);
    }

    @Override
    public void setMaxHP(int amount) {
        chr.setStat(Stat.mhp, amount);
        chr.setStat(Stat.hp, amount);
        Map<Stat, Object> stats = new HashMap<>();
        stats.put(Stat.mhp, amount);
        stats.put(Stat.hp, amount);
        chr.sendStatsPacket(stats);
    }

    public void addMaxMP(int amount) {
        if (!JobConstants.isNoManaJob(chr.getJob())) {
            chr.addStatAndSendPacket(Stat.mmp, amount);
        }
    }

    @Override
    public void setMaxMP(int amount) {
        if (!JobConstants.isNoManaJob(chr.getJob())) {
            chr.setStat(Stat.mmp, amount);
            chr.setStat(Stat.mp, amount);
            Map<Stat, Object> stats = new HashMap<>();
            stats.put(Stat.mmp, amount);
            stats.put(Stat.mp, amount);
            chr.sendStatsPacket(stats);
        }
    }

    @Override
    public void jobAdvance(short jobID) {
        setJob(jobID);

        int apAmount = 0;
        int spAmount = 0;

        switch (JobConstants.getJobLevel(jobID)) {
            case 1: {
                spAmount = 5;
                if (JobConstants.isCygnusKnight(jobID)) {
                    --spAmount;
                }
                if (JobConstants.isDemonSlayer(jobID)) {
                    spAmount = 8;
                }
                if (JobConstants.isKanna(jobID)) {
                    spAmount = 6;
                }
                break;
            }
            case 2: {
                int incSP = 3 * (chr.getLevel() > 60 ? 29 : chr.getLevel() - 31);
                spAmount = 8 + incSP;
                break;
            }
            case 3: {
                int incSP = 3 * (chr.getLevel() > 100 ? 39 : chr.getLevel() - 61);
                spAmount = 8 + incSP;
                apAmount = 5;
                break;
            }
            case 4:
                spAmount = 6;
                apAmount = 10;
                break;
        }

        addAP(apAmount); //Standard added AP upon Job Advancing
        addSPJobAdv(jobID, spAmount); //Standard added SP upon Job Advancing
    }

    @Override
    public void jobAdvanceForDB(short jobID) {
        setJob(jobID);

        int apAmount = 0;
        int spAmount = 0;

        switch (JobConstants.getJobLevel(jobID)) {
            case 1: {
                spAmount = 5;
                break;
            }
            case 2: {
                spAmount = 8;
                break;
            }
            case 3: {
                spAmount = 20;
                break;
            }
            case 4:
                spAmount = 10;
                break;
            case 5:
                apAmount = 5;
                spAmount = 3;
                break;
            case 6:
                apAmount = 5;
                spAmount = 3;
                break;
        }

        addAP(apAmount); //Standard added AP upon Job Advancing
        addSPJobAdv(jobID, spAmount); //Standard added SP upon Job Advancing
        modifiedCharacter();
    }

    @Override
    public void giveExp(long expGiven) {
        chr.addExp(expGiven, true);
    }

    public void giveExpNoAffectedByExpRate(long expGiven) {
        chr.addExp(expGiven, false);
    }

    @Override
    public void giveExpNoMsg(long expGiven) {
        chr.addExpNoMsg(expGiven);
    }

    @Override
    public void changeCharacterLook(int look) {
        AvatarLook al = chr.getAvatarData().getAvatarLook();
        if (look <= ItemConstants.MAX_SKIN) { // skin
            al.setSkin(look);
            chr.setStatAndSendPacket(Stat.skin, look);
        } else if ((ItemConstants.MIN_FACE <= look && look < ItemConstants.MAX_FACE) || (ItemConstants.MIN_FACE_2 <= look && look < ItemConstants.MAX_FACE_2)) {
            if (StringData.getItemStringById(look) != null) {
                al.setFace(look);
                chr.setStatAndSendPacket(Stat.face, look);
            } else {
                System.out.printf("Tried changing a look with invalid id (%d)", look);
            }
        } else if (ItemConstants.MIN_HAIR <= look && look < ItemConstants.MAX_HAIR) {
            if (StringData.getItemStringById(look) != null) {
                al.setHair(look);
                chr.setStatAndSendPacket(Stat.hair, look);
            } else {
                System.out.printf("Tried changing a look with invalid id (%d)", look);
            }
        } else {
            System.out.printf("Tried changing a look with invalid id (%d)", look);
        }
        byte maskValue = AvatarModifiedMask.AvatarLook.getVal();
        chr.getField().broadcast(UserRemote.avatarModified(chr, maskValue, (byte) 0), chr);
        chr.dispose();
    }

    public void changeCharacterLookByCoupon() {
        AvatarLook al = chr.getAvatarData().getAvatarLook();
        Integer[] skins = {0, 1, 2, 3, 4, 5, 9, 10, 11, 12, 13};
        int skin = Util.getRandomFromCollection(skins);
        int face = Util.getRandomFromCollection(ItemData.getValidFaces());
        int hair = Util.getRandomFromCollection(ItemData.getValidHairs());
        al.setSkin(skin);
        chr.setStatAndSendPacket(Stat.skin, skin);
        al.setFace(face);
        chr.setStatAndSendPacket(Stat.face, face);
        al.setHair(hair);
        chr.setStatAndSendPacket(Stat.hair, hair);
        consumeItem(2430182);
    }

    public void giveCharacterLookByXuVang(boolean isHair) {
        setSpeakerID(9010038);
        if (isHair) {
            List<Integer> option1 = new ArrayList<>();
            List<Integer> option2 = new ArrayList<>();
            List<Integer> option3 = new ArrayList<>();
            List<Integer> option4 = new ArrayList<>();
            List<Integer> option5 = new ArrayList<>();
            List<Integer> option6 = new ArrayList<>();
            List<Integer> option7 = new ArrayList<>();
            List<Integer> option8 = new ArrayList<>();
            List<Integer> option9 = new ArrayList<>();
            List<Integer> option10 = new ArrayList<>();
            List<Integer> option11 = new ArrayList<>();
            for (int i = 35000; i <= 49999; i++) {
                if (StringData.getItemStringById(i) != null && StringData.getItemStringById(i).startsWith("Black")) {
                    if (option1.size() < 50) {
                        option1.add(i);
                    } else if (option2.size() < 50) {
                        option2.add(i);
                    } else if (option3.size() < 50) {
                        option3.add(i);
                    } else if (option4.size() < 50) {
                        option4.add(i);
                    } else if (option5.size() < 50) {
                        option5.add(i);
                    } else if (option6.size() < 50) {
                        option6.add(i);
                    } else if (option7.size() < 50) {
                        option7.add(i);
                    } else if (option8.size() < 50) {
                        option8.add(i);
                    } else if (option9.size() < 50) {
                        option9.add(i);
                    } else if (option10.size() < 50) {
                        option10.add(i);
                    } else if (option11.size() < 50) {
                        option11.add(i);
                    }
                }
            }
            int sel = sendNext("#fs13#There are many hairstyles to choose from. Please select a category below (50 styles per category).\r\n" +
                    "#b" +
                    "#L0# Hairstyle Category 1 #l\r\n" +
                    "#L1# Hairstyle Category 2 #l\r\n" +
                    "#L2# Hairstyle Category 3 #l\r\n" +
                    "#L3# Hairstyle Category 4 #l\r\n" +
                    "#L4# Hairstyle Category 5 #l\r\n" +
                    "#L5# Hairstyle Category 6 #l\r\n" +
                    "#L6# Hairstyle Category 7 #l\r\n" +
                    "#L7# Hairstyle Category 8 #l\r\n" +
                    "#L8# Hairstyle Category 9 #l\r\n" +
                    "#L9# Hairstyle Category 10 #l\r\n" +
                    "#L10# Hairstyle Category 11 #l\r\n" +
                    "#k"
            );
            List<Integer> options = new ArrayList<>();
            if (sel == 0) {
                options.addAll(option1);
            } else if (sel == 1) {
                options.addAll(option2);
            } else if (sel == 2) {
                options.addAll(option3);
            } else if (sel == 3) {
                options.addAll(option4);
            } else if (sel == 4) {
                options.addAll(option5);
            } else if (sel == 5) {
                options.addAll(option6);
            } else if (sel == 6) {
                options.addAll(option7);
            } else if (sel == 7) {
                options.addAll(option8);
            } else if (sel == 8) {
                options.addAll(option9);
            } else if (sel == 9) {
                options.addAll(option10);
            } else if (sel == 10) {
                options.addAll(option11);
            }
            if (!options.isEmpty()) {
                int[] result = options.stream().mapToInt(Integer::intValue).toArray();
                int answer = sendAskAvatar("Changing your hairstyle costs #e10,000 Donation Points per change#n. Please select your favorite style!", false, false, result);
                if (answer < result.length) {
                    if (chr.getUser().getDonationPoints() >= 10000) {
                        chr.getUser().deductDonationPoints(10000);
                        changeCharacterLook(result[answer]);
                    } else {
                        sendSayOkay("You do not have enough Donation Points (10,000 DP required) to change your hairstyle!");
                    }
                }
            } else {
                chr.chatMessage("An unknown error has occurred.");
            }
        } else {
            List<String> names = new ArrayList<>();
            List<Integer> option1 = new ArrayList<>();
            List<Integer> option2 = new ArrayList<>();
            List<Integer> option3 = new ArrayList<>();
            List<Integer> option4 = new ArrayList<>();
            for (int i = 25000; i <= 29999; i++) {
                if (StringData.getItemStringById(i) != null && !names.contains(StringData.getItemStringById(i))) {
                    names.add(StringData.getItemStringById(i));
                    if (option1.size() < 50) {
                        option1.add(i);
                    } else if (option2.size() < 50) {
                        option2.add(i);
                    } else if (option3.size() < 50) {
                        option3.add(i);
                    } else {
                        option4.add(i);
                    }
                }
            }
            int sel = sendNext("#fs13#There are many face styles to choose from. Please select a category below (50 styles per category).\r\n" +
                    "#b" +
                    "#L0# Face Style Category 1 #l\r\n" +
                    "#L1# Face Style Category 2 #l\r\n" +
                    "#L2# Face Style Category 3 #l\r\n" +
                    "#L3# Face Style Category 4 #l\r\n" +
                    "#k"
            );
            List<Integer> options = new ArrayList<>();
            if (sel == 0) {
                options.addAll(option1);
            } else if (sel == 1) {
                options.addAll(option2);
            } else if (sel == 2) {
                options.addAll(option3);
            } else if (sel == 3) {
                options.addAll(option4);
            }
            if (!options.isEmpty()) {
                int[] result = options.stream().mapToInt(Integer::intValue).toArray();
                int answer = sendAskAvatar("Changing your face style costs #e10,000 Donation Points per change#n. Please select your favorite style!", false, false, result);
                if (answer < result.length) {
                    if (chr.getUser().getDonationPoints() >= 10000) {
                        chr.getUser().deductDonationPoints(10000);
                        changeCharacterLook(result[answer]);
                    } else {
                        sendSayOkay("You do not have enough Donation Points (10,000 DP required) to change your face style!");
                    }
                }
            } else {
                chr.chatMessage("An unknown error has occurred");
            }
        }
    }

    public void giveSkill(int skillId) {
        giveSkill(skillId, 1);
    }

    public void giveSkill(int skillId, int slv) {
        giveSkill(skillId, slv, slv);
    }

    @Override
    public void giveSkill(int skillId, int slv, int maxLvl) {
        List<Skill> skills = new ArrayList<>();
        Skill skill = SkillData.getSkillDeepCopyById(skillId);
        skill.setCurrentLevel(slv);
        skill.setMasterLevel(maxLvl);
        skills.add(skill);
        chr.addSkill(skill);
        chr.getClient().write(WvsContext.changeSkillRecordResult(skills, true, false, false));
    }

    public void removeSkill(int skillId) {
        List<Skill> skills = new ArrayList<>();
        Skill skill = chr.getSkill(skillId);
        skill.setCurrentLevel(-1);
        skill.setMasterLevel(-1);
        skills.add(skill);
        chr.removeSkill(skillId);
        chr.getClient().write(WvsContext.changeSkillRecordResult(skills, true, false, false));
    }

    public int getSkillByItem() {
        return getSkillByItem(getParentID());
    }

    public int getSkillByItem(int itemId) {
        ItemInfo itemInfo = ItemData.getItemInfoByID(itemId);
        return itemInfo.getSkillId();
    }

    public boolean hasSkill(int skillId) {
        return chr.hasSkill(skillId);
    }

    public void heal() {
        chr.heal(chr.getMaxHP());
        chr.healMP(chr.getMaxMP());
    }

    public int getCurrentLevel() {
        return chr.getLevel();
    }

    public void addLevel(int level) {
        int curLevel = chr.getLevel();
        for (int i = curLevel + 1; i <= curLevel + level; i++) {
            chr.setStat(Stat.level, i);
            Map<Stat, Object> stats = new HashMap<>();
            stats.put(Stat.level, i);
            stats.put(Stat.exp, (long) 0);
            chr.sendStatsPacket(stats);
            chr.getJobHandler().handleLevelUp((short) i);
            chr.getField().broadcast(UserRemote.effect(chr.getId(), Effect.levelUpEffect()), chr);
        }
    }

    public void setInGameDirectionMode(boolean lockUI, boolean blackFrame, boolean forceMouseOver, boolean showUI) {
        if (chr != null) {
            chr.write(UserLocal.setInGameDirectionMode(lockUI, blackFrame, forceMouseOver, showUI));
        }
    }

    public void lockInGameUI(boolean lock) {
        lockInGameUI(lock, true);
    }

    /**
     * Removes the game's UI and completely prevents the character from moving via player input.
     * InGameDirectionEvent methods, such as forcedInput and moveCamera, won't take effect without locking the UI.
     *
     * @param lock       Whether to lock the game UI; false will unlock the UI and re-enable player input to char
     * @param blackFrame Whether black bars should appear while the UI is locked. Many older cutscenes set this to true
     */
    public void lockInGameUI(boolean lock, boolean blackFrame) {
        if (chr != null) {
            chr.write(UserLocal.setInGameDirectionMode(lock, blackFrame, false, !lock));
        }
    }

    public void curNodeEventEnd(boolean enable) {
        setCurNodeEventEnd(enable);
        chr.write(FieldPacket.curNodeEventEnd(enable));
    }

    public void setCurNodeEventEnd(boolean curNodeEventEnd) {
        this.curNodeEventEnd = curNodeEventEnd;
    }

    public void setTemporarySkillSet(int skillSet) {
        if (chr != null) {
            chr.write(TemporarySkillMan.setTemporarySkillSet(skillSet, 0));
        }
    }

    public void setStandAloneMode(boolean enable) {

    }

    public void setDirectionMode(boolean show, int unk) {
        chr.write(UserLocal.setDirectionMode(show, unk));
    }

    public void lockUI() {
        curNodeEventEnd(true);
        setTemporarySkillSet(0);
        lockInGameUI(true, false);
    }

    public void unlockUI() {
        curNodeEventEnd(false);
        setTemporarySkillSet(0);
        lockInGameUI(false, true);
    }

    public void progressMessageFont(String msg) {
        progressMessageFont(3, 20, 20, 0, msg);
    }

    /**
     * @fontNameType 1 -> 9
     * @fontColorType 0: white; 1,3: Black; 2: Brown; 4: yellow; 5,6: blue; 7: Red; 9: Pink; 10: Orange; 20: Green
     */
    public void progressMessageFont(int fontNameType, int fontSize, int fontColorType, int fadeOutDelay, String message) {
        chr.write(WvsContext.progressMessageFont(fontNameType, fontSize, fontColorType, fadeOutDelay, message));
    }

    /**
     * Applies the specified emotion to the character locally.
     *
     * @param emotion      The emotion to use, from 1-44. All cash emotes adhere to wz ordering.
     *                     Order is as follows: 1-7: standard, 8-22 and 23-37: original cash emotes, 38: Ursus KO, 39-44: foreign cash emotes.
     * @param duration     The time (in ms) the emotion is active on the character if it's not overwritten
     * @param byItemOption Specifies if the emotion was triggered from using an item (e.g. Lamb Kebabs [2010048])
     */
    public void localEmotion(int emotion, int duration, boolean byItemOption) {
        chr.write(UserLocal.emotion(emotion, duration, byItemOption));
    }


    // Field-related methods -------------------------------------------------------------------------------------------

    @Override
    public void warp(int id) {
        warp(id, 0);
    }

    public void warp(int id, boolean executeAfterScript) {
        warp(id, 0, executeAfterScript, false);
    }

    @Override
    public void warp(int id, int pid) {
        warp(id, pid, true, false);
    }

    public void warp(int id, int pid, boolean instanceField) {
        warp(id, pid, true, instanceField);
    }

    public void warp(int mid, int pid, boolean executeAfterScript, boolean instanceField) {
        if (executeAfterScript) {
            FieldTransferInfo fti = getFieldTransferInfo();
            fti.setFieldId(mid);
            fti.setPortal(pid);
            fti.setIsInstanceField(instanceField);
        } else {
            chr.warp(mid, pid);
        }
    }

    public void warpParty(int id, Party party) {
        int fieldID = chr.getFieldID();
        for (Char onlineChar : party.getOnlineChars()) {
            if (onlineChar.getField().getId() == fieldID) {
                onlineChar.warp(id);
            }
        }
    }

    public void warpParty(Char chr, int id, Party party) {
        int fieldID = chr.getFieldID();
        for (Char onlineChar : party.getOnlineChars()) {
            if (onlineChar.getField().getId() == fieldID) {
                onlineChar.warp(id);
            }
        }
    }

    public void warpField(int id, Field field) {
        for (Char charInField : field.getChars()) {
            charInField.warp(id);
        }
    }

    public void changeChannelAndWarp(int channel, int fieldID, boolean executeAfterScript, boolean instanceField) {
        if (executeAfterScript) {
            FieldTransferInfo fti = getFieldTransferInfo();
            fti.setChannel(channel);
            fti.setFieldId(fieldID);
            fti.setIsInstanceField(instanceField);
        } else {
            Client c = chr.getClient();
            c.setOldChannel(c.getChannel());
            chr.changeChannelAndWarp((byte) channel, fieldID);
        }
    }

    public void warpField(int fieldId) {
        warp(fieldId, 0);
    }

    public void warpField(int fieldId, int portalId) {
        // only warp after script has ended
        FieldTransferInfo fti = getFieldTransferInfo();
        fti.setFieldId(fieldId);
        fti.setPortal(portalId);
    }

    public void changeChannelAndWarp(int channel, int fieldID) {
        changeChannelAndWarp(channel, fieldID, true, false);
    }

    @Override
    public int getFieldID() {
        return chr.getField().getId();
    }

    public void modifiedCharacter() {
        chr.write(WvsContext.characterModified(chr));
        chr.initialize();
    }

    @Override
    public void warpInstanceIn(Char chr, int id) {
        warpInstance(chr, id, true, 0, false);
    }

    public void warpInstanceIn(Char chr, int id, int portal) {
        warpInstance(chr, id, true, portal, false);
    }

    public void warpInstanceIn(Char chr, int id, boolean partyAllowed) {
        warpInstance(chr, id, true, 0, partyAllowed);
    }

    public void warpInstanceIn(Char chr, int id, int portalId, boolean partyAllowed) {
        warpInstance(chr, id, true, portalId, partyAllowed);
    }

    @Override
    public void warpInstanceOut(Char chr, int id) {
        warpInstanceOut(chr, id, 0);
    }

    public void warpInstanceOut(Char chr, int id, int portalId) {
        warpInstance(chr, id, false, portalId, false);
    }

    private void warpInstance(Char chr, int fieldId, boolean in, int portalId, boolean partyAllowed) {
        Instance instance;
        Party party = chr.getParty();
        boolean SOLO = party == null;
        if (in) {
            // warp party in if there is a party and party is allowed, solo instance otherwise
            if (partyAllowed) {
                if (SOLO) {
                    instance = new Instance(chr);
                } else {
                    instance = new Instance(party);
                    party.setInstance(instance);
                }
            } else {
                instance = new Instance(chr);
            }
            // setup the instance & warp
            instance.setup(fieldId, portalId);
            DataPrinter.send(DataPrinter.INSTANCE_FIELD, "[Instance In] " + chr.getName() + " warp in Field " + fieldId);
        } else {
            if (SOLO) {
                instance = chr.getInstance();
                stopEvents();
                if (instance == null) {
                    chr.setInstance(null);
                    chr.warp(fieldId, portalId, false);
                } else {
                    // remove chr from eligible instance members
                    int forcedReturn;
                    int forcedReturnPortal;
                    if (fieldId >= 0) {
                        forcedReturn = fieldId;
                        forcedReturnPortal = -1;
                    } else {
                        forcedReturn = instance.getForcedReturn();
                        forcedReturnPortal = instance.getForcedReturnPortalId();
                    }
                    instance.stopEvents();
                    instance.getFields().clear();
                    instance.getChars().clear();
                    instance.getProperties().clear();
                    chr.setInstance(null);
                    chr.warp(forcedReturn, Math.max(forcedReturnPortal, 0), false);
                }
            }
            else {
                instance = party.getInstance();
                stopEvents();
                if (instance == null) {
                    for (Char x : party.getOnlineChars()) {
                        x.setInstance(null);
                        x.warp(fieldId, portalId, false);
                    }
                } else {
                    // remove chr from eligible instance members
                    int forcedReturn;
                    int forcedReturnPortal;
                    if (fieldId >= 0) {
                        forcedReturn = fieldId;
                        forcedReturnPortal = -1;
                    } else {
                        forcedReturn = instance.getForcedReturn();
                        forcedReturnPortal = instance.getForcedReturnPortalId();
                    }
                    instance.stopEvents();
                    instance.getFields().clear();
                    instance.getChars().clear();
                    instance.getProperties().clear();
                    for (Char x : party.getOnlineChars()) {
                        x.setInstance(null);
                        x.warp(forcedReturn, Math.max(forcedReturnPortal, 0), false);
                    }
                    party.setInstance(null);
                }
            }
            DataPrinter.send(DataPrinter.INSTANCE_FIELD, "[Instance Out] " + chr.getName() + " warp out Field " + fieldId);
        }
    }

    public void setInstanceTime(int seconds, boolean showClock) {
        setInstanceTime(seconds, 0, 0, showClock);
    }

    public void setInstanceTime(int seconds, int forcedReturnFieldId, boolean showClock) {
        Instance instance = chr.getInstance();
        if (instance != null) {
            if (forcedReturnFieldId != 0) {
                instance.setForcedReturn(forcedReturnFieldId);
            }
            if (instance.getRemainingTime() < System.currentTimeMillis()) {
                // don't override old timeout value
                instance.setTimeout(seconds, showClock);
            }
        }
    }

    public void setInstanceTime(int seconds, int forcedReturnFieldId, int portalId, boolean showClock) {
        Instance instance = chr.getInstance();
        if (instance != null) {
            if (forcedReturnFieldId != 0) {
                instance.setForcedReturn(forcedReturnFieldId);
            }
            if (portalId != 0) {
                instance.setForcedReturnPortalId(portalId);
            }
            if (instance.getRemainingTime() < System.currentTimeMillis()) {
                // don't override old timeout value
                instance.setTimeout(seconds, showClock);
            }
        }
    }

    public void setInstanceTime(int seconds) {
        setInstanceTime(seconds, 0, 0, true);
    }

    public void setInstanceTime(int seconds, int forcedReturnFieldId) {
        setInstanceTime(seconds, forcedReturnFieldId, true);
    }

    public void setInstanceTime(int seconds, int forcedReturnFieldId, int portalId) {
        setInstanceTime(seconds, forcedReturnFieldId, portalId, true);
    }

    @Override
    public int getReturnField() {
        return returnField;
    }

    @Override
    public void setReturnField(int returnField) {
        this.returnField = returnField;
    }

    @Override
    public void setReturnField() {
        setReturnField(chr.getFieldID());
    }

    @Override
    public int getReturnPortal() {
        return returnPortal;
    }

    @Override
    public void setReturnPortal(int returnPortal) {
        this.returnPortal = returnPortal;
    }

    @Override
    public void setReturnPortal() {
        setReturnPortal(getParentID());
    }

    @Override
    public boolean hasMobsInField() {
        return hasMobsInField(chr.getFieldID());
    }

    public Mob waitForMobDeath() {
        Mob response = null;
        if (isActive(ScriptType.FirstEnterField)) {
            ScriptInfo si = getScriptInfoByType(ScriptType.FirstEnterField);
            if (si == null) {
                throw new NullPointerException(INTENDED_NPE_MSG);
            }
            response = si.awaitResponseMob(30 * 60 * 1000);
        } else if (isActive(ScriptType.Field)) {
            ScriptInfo si = getScriptInfoByType(ScriptType.Field);
            if (si == null) {
                throw new NullPointerException(INTENDED_NPE_MSG);
            }
            response = si.awaitResponseMob(30 * 60 * 1000);
        } else if (isActive(ScriptType.Quest)) {
            ScriptInfo si = getScriptInfoByType(ScriptType.Quest);
            if (si == null) {
                throw new NullPointerException(INTENDED_NPE_MSG);
            }
            response = si.awaitResponseMob(30 * 60 * 1000);
        }
        if (response == null) {
            throw new NullPointerException(INTENDED_NPE_MSG);
        }
        return (Mob) response;
    }

    public Mob waitForMobDeath(int... possibleMobs) {
        Mob mob = waitForMobDeath();
        while (true) {
            if (mob == null) {
                throw new NullPointerException(INTENDED_NPE_MSG);
            } else {
                for (int mobID : possibleMobs) {
                    if (mob.getTemplateId() == mobID) {
                        return mob;
                    }
                }
                mob = waitForMobDeath();
            }
        }
    }

    @Override
    public boolean hasMobsInField(int fieldid) {
        Field field = chr.getOrCreateFieldByCurrentInstanceType(fieldid);
        return field.getMobs().size() > 0;
    }

    public boolean hasMobsInField(int fieldid, int mobTemplateId) {
        return getAmountOfMobsInField(fieldid, mobTemplateId) > 0;
    }

    @Override
    public int getAmountOfMobsInField() {
        return getAmountOfMobsInField(chr.getFieldID());
    }

    public int getAmountOfMobsInField(int fieldid, int mobTemplateId) {
        Field field = chr.getOrCreateFieldByCurrentInstanceType(fieldid);
        return (int) field.getMobs().stream().filter(mob -> mob.getTemplateId() == mobTemplateId).count();
    }

    @Override
    public int getAmountOfMobsInField(int fieldid) {
        Field field = FieldData.getFieldById(fieldid);
        return field.getMobs().size();
    }

    public void killMobs() {
        chr.getField().killMobs();
    }

    /**
     * Kill one or all mobs with the given mob ID in the characters map
     *
     * @param mobId   mob id to kill
     * @param killAll whether or not to kill all of them or just the first one
     */
    public void killMob(int mobId, boolean killAll) {
        Field field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());
        for (Mob m : field.getMobs()) {
            if (m.getTemplateId() == mobId) {
                m.remove(false);
                if (!killAll) {
                    return;
                }
            }
        }
    }

    public void showWeatherNoticeToField(String text, WeatherEffNoticeType type) {
        showWeatherNoticeToField(text, type, 7000); // 7 seconds
    }

    public void showWeatherNoticeToField(String text, WeatherEffNoticeType type, int duration) {
        Field field = chr.getField();
        field.broadcast(WvsContext.weatherEffectNotice(type, text, duration));
    }

    public void showEffectToField(String dir) {
        showEffectToField(dir, 0);
    }

    public void showEffectToField(String dir, int delay) {
        showEffectToField(dir, 4, delay);
    }

    public void showEffectToField(String dir, int placement, int delay) {
        Field field = chr.getField();
        field.broadcast(UserPacket.effect(Effect.effectFromWZ(dir, false, delay, placement, 0)));
    }

    public void showFieldEffect(String dir) {
        showFieldEffect(dir, 0);
    }

    @Override
    public void showFieldEffect(String dir, int delay) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.getFieldEffectFromWz(dir, delay)));
    }

    public void showFieldEffectToField(String dir) {
        showFieldEffectToField(dir, 0);
    }

    public void showFieldEffectToField(String dir, int delay) {
        Field field = chr.getField();
        field.broadcast(FieldPacket.fieldEffect(FieldEffect.getFieldEffectFromWz(dir, delay)));
    }

    public void showOffFieldEffect(String dir) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.getOffFieldEffectFromWz(dir, 0)));
    }

    public void showFieldBackgroundEffect(String dir) {
        showFieldBackgroundEffect(dir, 0);
    }

    public void showFieldBackgroundEffect(String dir, int delay) {
        Field field = chr.getField();
        chr.write(FieldPacket.fieldEffect(FieldEffect.getFieldBackgroundEffectFromWz(dir, delay)));
    }

    public void showFadeTransition(int duration, int fadeInTime, int fadeOutTime) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.takeSnapShotOfClient2(fadeInTime, duration, fadeOutTime, true)));
    }

    public void screen(String string) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.screen(string)));
    }

    public void showFade(int duration) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.takeSnapShotOfClient(duration)));
    }

    public void setFieldColour(GreyFieldType colorFieldType, short red, short green, short blue, int time) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.setFieldColor(colorFieldType, red, green, blue, time)));
    }

    public void setFieldGrey(GreyFieldType colorFieldType, boolean show) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.setFieldGrey(colorFieldType, show)));
    }

    public void removeOverlapScreen(int duration) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.removeOverlapScreen(duration)));
    }

    public void teraBlinkWarp(int arg1, String string, int arg2, int arg3, int arg4, int arg5, int arg6, int arg7, int arg8) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.teraBlinkWarp(arg1, string, arg2, arg3, arg4, arg5, arg6, arg7, arg8)));
    }

    public void teraBlinkEff(int arg1, String string, String string2, int arg2, int arg3) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.teraBlinkEff(arg1, string, string2, arg2, arg3)));
    }

    @Override
    public void dropItem(int itemId, int x, int y) {
        Field field = chr.getField();
        Drop drop = new Drop(field.getNewObjectID());
        drop.setItem(ItemData.getItemDeepCopy(itemId));
        Position position = new Position(x, y);
        drop.setPosition(position);
        field.drop(drop, position, true);
    }

    @Override
    public void teleportInField(Position position) {
        chr.write(FieldPacket.teleport(position, chr));
    }

    @Override
    public void teleportInField(int x, int y) {
        teleportInField(new Position(x, y));
    }

    @Override
    public void teleportToPortal(int portalId) {
        Portal portal = chr.getField().getPortalByID(portalId);
        if (portal != null) {
            Position position = new Position(portal.getX(), portal.getY());
            chr.write(FieldPacket.teleport(position, chr));
        }
    }

    public Drop getDropInRect(int itemID, Rect rect) {
        Field field = getField();
        if (field == null) {
            field = chr.getField();
        }
        return field.getDropsInRect(rect).stream()
                .filter(drop -> drop.getItem() != null && drop.getItem().getItemId() == itemID)
                .findAny().orElse(null);
    }

    @Override
    public Drop getDropInRect(int itemID, int rectRange) {
        return getDropInRect(itemID, new Rect(
                new Position(
                        chr.getPosition().getX() - rectRange,
                        chr.getPosition().getY() - rectRange),
                new Position(
                        chr.getPosition().getX() + rectRange,
                        chr.getPosition().getY() + rectRange))
        );

    }

    public void setObjectState(String objName, int curState) {
        chr.getField().broadcast(FieldPacket.setObjectState(objName, curState));
    }

    // Life-related methods --------------------------------------------------------------------------------------------


    // NPC methods
    @Override
    public void spawnNpc(int npcId, int x, int y) {
        Npc npc = NpcData.getNpcDeepCopyById(npcId);
        Position position = new Position(x, y);
        npc.setPosition(position);
        npc.setCy(y);
        npc.setRx0(x + 50);
        npc.setRx1(x - 50);
        npc.setFh(chr.getField().findFootHoldBelow(new Position(x, y - 2)).getId());
        npc.setNotRespawnable(true);
        if (npc.getField() == null) {
            npc.setField(field);
        }
        chr.getField().spawnLife(npc, chr);
    }

    public void spawnNpc(int npcId, int x, int y, boolean left) {
        Npc npc = NpcData.getNpcDeepCopyById(npcId);
        Position position = new Position(x, y);
        npc.setPosition(position);
        npc.setCy(y);
        npc.setRx0(x + 50);
        npc.setRx1(x - 50);
        npc.setFh(chr.getField().findFootHoldBelow(new Position(x, y - 2)).getId());
        npc.setNotRespawnable(true);
        if (npc.getField() == null) {
            npc.setField(field);
        }
        chr.getField().spawnLife(npc, chr);
        chr.write(NpcPool.npcSetForceFlip(npc.getObjectId(), left));
    }

    @Override
    public void removeNpc(int npcId) {
        chr.getField().getNpcs().stream()
                .filter(npc -> npc.getTemplateId() == npcId)
                .findFirst()
                .ifPresent(npc -> chr.getField().removeLife(npc));
    }

    public void removeNpcs(int npcId) {
        for (Npc npc : chr.getField().getNpcs()) {
            if (npc.getTemplateId() == npcId) {
                chr.getField().removeLife(npc);
            }
        }
    }

    @Override
    public void openNpc(int npcId) {
        Npc npc = NpcData.getNpcDeepCopyById(npcId);
        String script;
        if (npc.getScripts().size() > 0) {
            script = npc.getScripts().get(0);
        } else {
            script = String.valueOf(npc.getTemplateId());
        }
        startScript(chr, npc.getTemplateId(), npcId, script, ScriptType.Npc);
    }

    @Override
    public void openShop(int shopID) {
        NpcShopDlg nsd = NpcData.getShopById(shopID);
        if (nsd != null) {
            if (shopID == 9010038) { // Donation Shop
                createQuestWithQRValue(QuestConstants.DONATION_POINT, "point=" + chr.getUser().getDonationPoints());
            } else if (shopID == 9010040) { // Vote Shop
                createQuestWithQRValue(QuestConstants.VOTE_POINT, "point=" + chr.getUser().getVotePoints());
            }
            nsd.setChar(chr);
            chr.setShop(nsd);
            chr.write(ShopDlg.openShop(0, nsd));
        } else {
            chat(String.format("Không tìm thấy cửa hàng của npc %d.", shopID));
            System.out.printf("Could not find shop with id %d.", shopID);
        }
    }

    // Open Shop but with different NPC ID
    public void openShop(int templateID, int shopID) {
        NpcShopDlg nsd = NpcData.getShopById(shopID);
        if (nsd != null) {
            nsd.setChar(chr);
            chr.setShop(nsd);
            nsd.setNpcTemplateID(templateID);
            chr.write(ShopDlg.openShop(0, nsd));
        } else {
            chat(String.format("Không tìm thấy cửa hàng của npc %d.", shopID));
            System.out.printf("Could not find shop with id %d.", shopID);
        }
    }

    @Override
    public void openTrunk(int npcTemplateID) {
        chr.write(FieldPacket.trunkDlg(new TrunkOpen(npcTemplateID, chr.getAccount().getTrunk())));
    }

    @Override
    public void setSpeakerID(int templateID) {
        NpcScriptInfo nsi = getNpcScriptInfo();
        boolean isNotCancellable = nsi.hasParam(NpcScriptInfo.Param.NotCancellable);
        nsi.resetParam();
        nsi.setOverrideSpeakerTemplateID(templateID);
        if (isNotCancellable) {
            nsi.addParam(NpcScriptInfo.Param.NotCancellable);
        }
    }

    @Override
    public void setSpeakerType(byte speakerType) {
        NpcScriptInfo nsi = getNpcScriptInfo();
        nsi.setSpeakerType(speakerType);
    }

    public void hideNpcByTemplateId(int npcTemplateId, boolean hide) {
        hideNpcByTemplateId(npcTemplateId, hide, hide);
    }

    @Override
    public void hideNpcByTemplateId(int npcTemplateId, boolean hideTemplate, boolean hideNameTag) {
        Field field = chr.getField();
        Life life = field.getLifeByTemplateId(npcTemplateId);
        if (!(life instanceof Npc)) {
            System.out.printf("npc %d is null or not an instance of Npc", npcTemplateId);
            return;
        }
        chr.write(NpcPool.npcViewOrHide(life.getObjectId(), !hideTemplate, !hideNameTag));
    }

    public void hideNpcByObjectId(int npcObjId, boolean hide) {
        hideNpcByObjectId(npcObjId, hide, hide);
    }

    @Override
    public void hideNpcByObjectId(int npcObjId, boolean hideTemplate, boolean hideNameTag) {
        Field field = chr.getField();
        Life life = field.getLifeByObjectID(npcObjId);
        if (!(life instanceof Npc)) {
            System.out.printf("npc %d is null or not an instance of Npc", npcObjId);
            return;
        }
        chr.write(NpcPool.npcViewOrHide(life.getObjectId(), !hideTemplate, !hideNameTag));
    }

    @Override
    public void moveNpcByTemplateId(int npcTemplateId, boolean left, int distance, int speed) {
        Field field = chr.getField();
        Life life = field.getLifeByTemplateId(npcTemplateId);
        if (!(life instanceof Npc)) {
            System.out.printf("npc %d is null or not an instance of Npc", npcTemplateId);
            return;
        }
        chr.write(NpcPool.npcSetForceMove(life.getObjectId(), left, distance, speed));
    }

    @Override
    public void moveNpcByObjectId(int npcObjId, boolean left, int distance, int speed) {
        Field field = chr.getField();
        Life life = field.getLifeByObjectID(npcObjId);
        if (!(life instanceof Npc)) {
            System.out.printf("npc %d is null or not an instance of Npc", npcObjId);
            return;
        }
        chr.write(NpcPool.npcSetForceMove(life.getObjectId(), left, distance, speed));
    }

    @Override
    public void flipNpcByTemplateId(int npcTemplateId, boolean left) {
        Field field = chr.getField();
        Life life = field.getLifeByTemplateId(npcTemplateId);
        if (!(life instanceof Npc)) {
            System.out.printf("npc %d is null or not an instance of Npc", npcTemplateId);
            return;
        }
        chr.write(NpcPool.npcSetForceFlip(life.getObjectId(), left));
    }

    @Override
    public void flipNpcByObjectId(int npcObjId, boolean left) {
        Field field = chr.getField();
        Life life = field.getLifeByObjectID(npcObjId);
        if (!(life instanceof Npc)) {
            System.out.printf("npc %d is null or not an instance of Npc", npcObjId);
            return;
        }
        chr.write(NpcPool.npcSetForceFlip(life.getObjectId(), left));
    }

    public void showNpcSpecialActionByTemplateId(int npcTemplateId, String effectName) {
        showNpcSpecialActionByTemplateId(npcTemplateId, effectName, 0);
    }

    @Override
    public void showNpcSpecialActionByTemplateId(int npcTemplateId, String effectName, int duration) {
        Field field = chr.getField();
        Life life = field.getLifeByTemplateId(npcTemplateId);
        if (!(life instanceof Npc)) {
            System.out.printf("npc %d is null or not an instance of Npc", npcTemplateId);
            return;
        }
        chr.write(NpcPool.npcSetSpecialAction(life.getObjectId(), effectName, duration));
    }

    public void showNpcSpecialActionByObjectId(int npcObjId, String effectName) {
        showNpcSpecialActionByObjectId(npcObjId, effectName, 0);

    }

    @Override
    public void showNpcSpecialActionByObjectId(int npcObjId, String effectName, int duration) {
        Field field = chr.getField();
        Life life = field.getLifeByObjectID(npcObjId);
        if (!(life instanceof Npc)) {
            System.out.printf("npc %d is null or not an instance of Npc", npcObjId);
            return;
        }
        chr.write(NpcPool.npcSetSpecialAction(life.getObjectId(), effectName, duration));
    }

    public void stopNpcSpecialActionByTemplateId(int npcTemplateId) {
        Field field = chr.getField();
        Life life = field.getLifeByTemplateId(npcTemplateId);
        if (!(life instanceof Npc)) {
            System.out.printf("npc %d is null or not an instance of Npc", npcTemplateId);
            return;
        }
        chr.write(NpcPool.npcResetSpecialAction(life.getObjectId()));
    }

    public int getNpcObjectIdByTemplateId(int npcTemplateId) {
        Field field = chr.getField();
        Life life = field.getLifeByTemplateId(npcTemplateId);
        if (!(life instanceof Npc)) {
            System.out.printf("npc %d is null or not an instance of Npc", npcTemplateId);
            return 0;
        }
        return life.getObjectId();
    }

    // Mob methods
    @Override
    public Mob spawnMob(int id) {
        return spawnMob(id, 0, 0, false);
    }

    @Override
    public Mob spawnMob(int id, boolean respawnable) {
        return spawnMob(id, 0, 0, respawnable);
    }

    @Override
    public Mob spawnMobOnChar(int id) {
        return spawnMob(id, chr.getPosition().getX(), chr.getPosition().getY(), false);
    }

    @Override
    public Mob spawnMobOnChar(int id, boolean respawnable) {
        return spawnMob(id, chr.getPosition().getX(), chr.getPosition().getY(), respawnable);
    }

    @Override
    public Mob spawnMob(int id, int x, int y, boolean respawnable) {
        return spawnMob(id, x, y, respawnable, 0);
    }

    public Mob spawnMob(int id, int x, int y, boolean respawnable, long hp) {
        return chr.getField().spawnMob(id, x, y, respawnable, hp);
    }

    public Mob spawnMob(int id, int x, int y, boolean respawnable, long hp, long exp) {
        return chr.getField().spawnMob(id, x, y, respawnable, hp, exp);
    }

    public Mob spawnMobWithAppearType(int id, int x, int y, int appearType, int option) {
        return chr.getField().spawnMobWithAppearType(id, x, y, appearType, option);
    }

    public void spawnMobsForSubZeroHunt(Char chr) {
        if (chr.isSubZeroHunt()) {
            if (sendAskYesNo("Do you want to change to another monsters within your level range (20 levels below and 20 levels above)?")) {
                chr.getField().removeMobsByOnlyChar(chr);
                handleMobsForSubZeroHunt(chr);
            }
            return;
        }
        if (!hasItem(4001884, 1)) {
            sendSayOkay("You don't have #b#z4001884#!#k");
            return;
        }
        boolean bool = handleMobsForSubZeroHunt(chr);
        if (bool) {
            consumeItem(4001884);
            sendSayOkay("Thank you, valued customer! #b3,000 new monsters#k have been added to your hunting grounds! They're waiting for you in the #bSub-Zero Hunt#k right now.\r\n\r\nI can also #bchange the type of summoned monsters#k while hunting, if you like, or move them around within your #blevel range#k.");
        }
    }

    public boolean handleMobsForSubZeroHunt(Char chr) {
        short charLevel = chr.getLevel();
        int id = MobData.getMobByCharLevel(charLevel);
        if (id == 0) {
            sendSayOkay("Unable to find a monsters within your level range (20 levels below and 20 levels above). Please try again!");
            return false;
        }
        final LocalDateTime now = LocalDateTime.now();
        int questID = EventConstants.SUB_ZERO_HUNT;
        if (hasQuest(questID)) {
            final String date = getQRValueByKey(questID, "date"); // yy/MM/dd
            final String count = getQRValueByKey(questID, "count");
            if (date != null && count != null) {
                DateTimeFormatter dtf_d = DateTimeFormatter.ofPattern("dd");
                int day = Integer.parseInt(dtf_d.format(now));
                int lastDay = Integer.parseInt(date.substring(6, 8));
                if (lastDay != day) {
                    chr.setSubZeroHunt(true);
                    createQuestWithQRValue(EventConstants.SUB_ZERO_HUNT, "date=" + DateTimeFormatter.ofPattern("yy/MM/dd").format(now) + ";count=0");
                } else if (Integer.parseInt(count) == 3000) {
                    sendSayOkay("You have reached your daily limit for today.");
                    return false;
                } else {
                    chr.setSubZeroHunt(true);
                }
            }
        } else {
            chr.setSubZeroHunt(true);
            createQuestWithQRValue(EventConstants.SUB_ZERO_HUNT, "date=" + DateTimeFormatter.ofPattern("yy/MM/dd").format(now) + ";count=0");
        }
        // Up
        for (int i = 1698; i <= 2698; i+=200) {
            chr.getField().spawnMobForOnlyChar(chr, id, i, -81, true);
        }
        // Middle
        for (int i = 1798; i <= 2798; i+=200) {
            chr.getField().spawnMobForOnlyChar(chr, id, i, 164, true);
        }
        // Down
        for (int i = 1524; i <= 2724; i+=200) {
            chr.getField().spawnMobForOnlyChar(chr, id, i, 399, true);
        }
        return true;
    }

    @Override
    public void removeMobByObjId(int id) {
        chr.getField().removeMob(id);
    }

    @Override
    public void removeMobByTemplateId(int id) {
        Field field = chr.getField();
        Life life = field.getLifeByTemplateId(id);
        if (life == null) {
            System.out.printf("Could not find Mob by template id %d.", id);
            return;
        }
        removeMobByObjId(life.getObjectId());
    }

    public boolean isFinishedEscort(int templateID) {
        Field field = chr.getField();
        Life life = field.getLifeByTemplateId(templateID);
        if (!(life instanceof Mob mob)) {
            chr.dispose();
            return false;
        }
        boolean finished = mob.isFinishedEscort();
        if (!finished) {
            chr.dispose();
        }
        return finished;
    }

    @Override
    public void showHP(int templateID) {
        chr.getField().getMobs().stream()
                .filter(m -> m.getTemplateId() == templateID)
                .findFirst()
                .ifPresent(mob -> chr.getField().broadcast(FieldPacket.fieldEffect(FieldEffect.mobHPTagFieldEffect(mob))));
    }

    @Override
    public void showHP() {
        chr.getField().getMobs().stream()
                .filter(m -> m.getHp() > 0)
                .findFirst()
                .ifPresent(mob -> chr.getField().broadcast(FieldPacket.fieldEffect(FieldEffect.mobHPTagFieldEffect(mob))));
    }


    // Reactor methods
    @Override
    public void removeReactor() {
        Field field = chr.getField();
        int reactorID = getObjectIDByScriptType(ScriptType.Reactor);
        field.broadcast(ReactorPool.reactorRemove(reactorID));
        Life life = field.getLifeByObjectID(reactorID);
        if (life == null) {
            return;
        }
        if (life instanceof Reactor) {
            field.removeLife(life.getObjectId(), false);
        }
    }

    public void removeReactorByID(int reactorID) {
        Field field = chr.getField();
        field.broadcast(ReactorPool.reactorRemove(reactorID));
        Life life = field.getLifeByTemplateId(reactorID);
        if (life == null) {
            return;
        }
        if (life instanceof Reactor) {
            field.removeLife(life.getObjectId(), false);
        }
    }

    public void removeReactorByObjectID(int objectID) {
        Field field = chr.getField();
        field.broadcast(ReactorPool.reactorRemove(objectID));
        Life life = field.getLifeByObjectID(objectID);
        if (life == null) {
            return;
        }
        if (life instanceof Reactor) {
            field.removeLife(objectID, false);
        }
    }

    @Override
    public void spawnReactor(int reactorId, int x, int y) {
        Field field = chr.getField();
        Reactor reactor = ReactorData.getReactorByID(reactorId);
        Position position = new Position(x, y);
        reactor.setPosition(position);
        reactor.setHomePosition(position);
        field.addLife(reactor);
        field.broadcast(ReactorPool.reactorEnterField(reactor));
    }

    public void spawnReactorInState(int reactorId, int x, int y, byte state) {
        Field field = chr.getField();
        Reactor reactor = ReactorData.getReactorByID(reactorId);
        reactor.setState(state);
        Position position = new Position(x, y);
        reactor.setPosition(position);
        reactor.setHomePosition(position);
        field.addLife(reactor);
        field.broadcast(ReactorPool.reactorEnterField(reactor));
    }

    @Override
    public boolean hasReactors() {
        Field field = chr.getField();
        return field.getReactors().size() > 0;
    }

    @Override
    public int getReactorQuantity() {
        Field field = chr.getField();
        return field.getReactors().size();
    }

    public int getReactorState(int reactorId) {
        Field field = chr.getField();
        Life life = field.getLifeByTemplateId(reactorId);
        if (life instanceof Reactor reactor) {
            return reactor.getState();
        }
        return -1;
    }

    public void changeReactorState(int reactorId, byte state) {
        changeReactorState(reactorId, state, (short) 0, (byte) 0);
    }

    public void changeReactorState(int reactorId, byte state, short delay, int stateLength) {
        Field field = chr.getField();
        Life life = field.getLifeByTemplateId(reactorId);
        if (life instanceof Reactor reactor) {
            reactor.setState(state);
            field.broadcast(ReactorPool.reactorChangeState(reactor, delay, stateLength));
        }
    }

    public void increaseReactorState(int reactorId, int stateLength) {
        chr.getField().increaseReactorState(reactorId, stateLength);
    }

    public void changeReactorStateByObjectID(int objectID, byte state, short delay, int stateLength) {
        Field field = chr.getField();
        Life life = field.getLifeByObjectID(objectID);
        if (life instanceof Reactor reactor) {
            reactor.setState(state);
            field.broadcast(ReactorPool.reactorChangeState(reactor, delay, stateLength));
        }
    }


    // Party-related methods -------------------------------------------------------------------------------------------

    @Override
    public Party getParty() {
        return chr.getParty();
    }

    @Override
    public int getPartySize() {
        return getParty().getMembers().size();
    }

    @Override
    public void setPartyField() {
        chr.setFieldInstanceType(FieldInstanceType.PARTY);
    }

    @Override
    public void setChannelField() {
        chr.setFieldInstanceType(FieldInstanceType.CHANNEL);
    }

    @Override
    public boolean isPartyLeader() {
        return chr.getParty() != null && chr.getParty().getPartyLeaderID() == chr.getId();
    }

    @Override
    public boolean checkParty() {
        Party party = chr.getParty();
        if (party == null) {
            chat("You are not in a party.");
            return false;
        } else if (!isPartyLeader()) {
            chat("You are not the party leader.");
            return false;
        }
        boolean res = true;
        Char leader = chr.getWorld().getCharById(party.getPartyLeaderID());
        if (leader == null) {
            chat("Your party leader is offline.");
        } else {
            int fieldID = leader.getFieldID();
            for (PartyMember pm : party.getMembers()) {
                if (pm != null) {
                    Char pmChr = chr.getWorld().getCharById(pm.getCharID());
                    res &= pmChr != null && pmChr.isOnline() && pmChr.getField().getId() == fieldID;
                }
            }
        }
        if (!res) {
            chat("Make sure your whole party is online and in the same map as the leader.");
        }
        return res;
    }

    public boolean checkPartyForPQ() {
        Party party = chr.getParty();
        if (party == null) {
            chat("You are not in a party.");
            return false;
        } else if (!isPartyLeader()) {
            chat("You are not the party leader.");
            return false;
        }
        int count = 0;
        Char leader = chr.getWorld().getCharById(party.getPartyLeaderID());
        if (leader == null) {
            chat("Your party leader is offline.");
        } else {
            int fieldID = leader.getField().getId();
            for (PartyMember pm : party.getMembers()) {
                if (pm != null) {
                    Char pmChr = chr.getWorld().getCharById(pm.getCharID());
                    if (pmChr != null && pmChr.isOnline() && pmChr.getField().getId() == fieldID) {
                        count += 1;
                    }
                }
            }
        }
        if (count < 2) {
            chat("Please ensure that a minimum of 2 people in your party are online and on the same map as your party leader.");
            return false;
        }
        return true;
    }

    private static boolean isPartyEligible(short lowLevel, short highLevel, Char owner, Party party, BossPartyType bpt) {
        for (Char chr : party.getPartyMembersInSameFieldWithChr(owner)) {
            if (chr.getLevel() < lowLevel || chr.getLevel() > highLevel) {
                return false;
            }
            if (bpt.getPreQuest() != 0 && !chr.getScriptManager().hasQuestCompleted(bpt.getPreQuest())) {
                return false;
            }
        }
        return true;
    }

    public List<Char> getPartyMembersInSameField(Char chr) {
        Party party = getParty();
        if (party == null) {
            return new ArrayList<>();
        }
        List<Char> list = new ArrayList<>(party.getPartyMembersInSameField(chr));
        list.add(chr);
        return new ArrayList<>(list);
    }

    public void resetPartyQRValue(int qId) {
        setPartyQRValue(qId, "0");
    }

    public void setPartyQRValue(int qId, String value) {
        for (Char c : chr.getParty().getOnlineChars()) {
            createQuestWithQRValue(c, qId, value, true);
        }
    }

    // Guild/Alliance related methods -------------------------------------------------------------------------------------------

    @Override
    public void showGuildCreateWindow() {
        chr.write(WvsContext.guildResult(GuildResult.msg(GuildType.Request_GuildNameInput)));
    }

    @Override
    public boolean checkAllianceName(String name) {
        World world = chr.getClient().getWorld();
        return world.getAlliance(name) == null;
    }

    public void incrementMaxGuildMembers(int amount) {
        Guild guild = chr.getGuild();
        guild.setMaxMembers(guild.getMaxMembers() + amount);
        guild.broadcast(WvsContext.guildResult(GuildResult.response_MaxMemberIncrease_Success(guild)));
        guild.updateGuildToSQL();
    }

    public void createAlliance(String name, Char other) {
        Alliance alliance = new Alliance();
        alliance.setName(name);
        alliance.addGuild(chr.getGuild());
        alliance.addGuild(other.getGuild());
        GuildMember chrMember = chr.getGuild().getMemberByCharID(chr.getId());
        chrMember.setAllianceRank(1);
        GuildMember otherMember = other.getGuild().getMemberByCharID(other.getId());
        otherMember.setAllianceRank(2);
        chr.getGuild().setAlliance(alliance);
        other.getGuild().setAlliance(alliance);
        alliance.broadcast(WvsContext.allianceResult(AllianceResult.createDone(alliance)));
        chr.deductMoney(5000000);
    }


    // Chat-related methods --------------------------------------------------------------------------------------------

    @Override
    public void chat(String text) {
        chatRed(text);
    }

    @Override
    public void chatRed(String text) {
        chr.chatMessage(SystemNotice, text);
    }

    @Override
    public void chatBlue(String text) {
        chr.chatMessage(Notice2, text);
    }

    public void systemMessage(String message) {
        chr.write(WvsContext.message(MessageType.SYSTEM_MESSAGE, 0, message, (byte) 0));
    }

    @Override
    public void chatScript(String text) {
        chr.chatScriptMessage(text);
    }

    public void showWeatherNotice(String text, WeatherEffNoticeType type) {
        showWeatherNotice(text, type, 7000); // 7 seconds
    }

    @Override
    public void showWeatherNotice(String text, WeatherEffNoticeType type, int duration) {
        chr.write(WvsContext.weatherEffectNotice(type, text, duration));
    }


    // Inventory-related methods ---------------------------------------------------------------------------------------

    @Override
    public void giveMesos(long mesos) {
        chr.addMoney(mesos);
        chr.write(WvsContext.incMoneyMessage((int) mesos));
    }

    @Override
    public void deductMesos(long mesos) {
        chr.deductMoney(mesos);
        chr.write(WvsContext.incMoneyMessage((int) -mesos));
    }

    @Override
    public long getMesos() {
        return chr.getMoney();
    }

    @Override
    public void giveItem(int id) {
        giveItem(id, 1);
    }

    @Override
    public void giveItem(int id, int quantity) {
        chr.addItemToInventory(id, quantity);
    }

    public void giveItem(int id, int quantity, String expiredType, long expires) {
        chr.addItemToInventory(id, quantity, expiredType, expires);
    }

    public void giveSymbol(int itemId) {
        giveSymbol(itemId, 1, 0);
    }

    public void giveSymbol(int itemId, int quantity) {
        giveSymbol(itemId, quantity, 0);
    }

    public void giveSymbol(int itemId, int quantity, int questId) {
        giveSymbol(itemId, quantity, questId, 1);
    }

    public void giveSymbol(int itemId, int quantity, int questId, int level) {
        for (int i = 0; i < quantity; i++) {
            Equip equip = ItemData.getEquipDeepCopyFromID(itemId, false);
            equip.getSymbol().setLevel(level);
            equip.getSymbol().setExp(1);
            if (ItemConstants.isArcaneSymbol(itemId)) {
                equip.getSymbol().setInc((short) Math.min(220, 10 * level + 20));
            } else {
                equip.getSymbol().setInc((short) Math.min(110, 10 * level));
            }
            if (JobConstants.isDemonAvenger(chr.getJob())) {
                if (ItemConstants.isArcaneSymbol(itemId)) {
                    equip.setiMaxHp((short) (itemId == 1712000 ? 4200 : 5250 + (level - 1) * 2100));
                } else {
                    equip.setiMaxHp((short) (10500 + (level - 1) * 4200));
                }
            } else if (JobConstants.isXenon(chr.getJob())) {
                if (ItemConstants.isArcaneSymbol(itemId)) {
                    equip.setiStr((short) (117 + (level - 1) * 48));
                    equip.setiDex((short) (117 + (level - 1) * 48));
                    equip.setiLuk((short) (117 + (level - 1) * 48));
                } else {
                    equip.setiStr((short) (240 + (level - 1) * 96));
                    equip.setiDex((short) (240 + (level - 1) * 96));
                    equip.setiLuk((short) (240 + (level - 1) * 96));
                }
            } else {
                if (ItemConstants.isArcaneSymbol(itemId)) {
                    equip.setBaseStat(chr.calculateMainStatForChar(), 300 + (level - 1) * 100L);
                } else {
                    equip.setBaseStat(chr.calculateMainStatForChar(), 500 + (level - 1) * 200L);
                }
            }
            chr.addItemToInventory(equip.getInvType(), equip, false, false);
            chr.getClient().write(WvsContext.inventoryOperation(true, false, Add, (short) equip.getBagIndex(), (byte) -1, 0, equip));
            chr.write(WvsContext.dropPickupMessage(itemId, (short) 1));
        }
        if (questId != 0) {
            for (Char other : chr.getAccount().getCharacters()) {
                if (other.getId() != chr.getId()) {
                    if (other.getRewardSystem() == null) {
                        other.initRewardSystem();
                    }
                    other.sendRewardToChar(itemId, quantity, 0,"Nhân vật " + chr.getName() + " đã hoàn thành nhiệm vụ " + getQuestNameByQuestId(questId) + ".", 30);
                }
            }
        }
    }

    public void giveAndEquip(int id) {
        if (!ItemConstants.isEquip(id)) {
            giveItem(id);
        }
        Item equip = ItemData.getItemDeepCopy(id);
        if (equip == null) {
            System.out.println("Unable to give and equip null item id " + id);
            return;
        }
        // replace the old equip if there was any
        int oldChuc = 0;
        int newChuc = 0;
        Inventory equipInv = chr.getEquipInventory();
        Inventory equippedInv = chr.getEquippedInventory();
        int bodyPart = ItemConstants.getBodyPartFromItem(id, chr.getAvatarData().getAvatarLook().getGender());
        Item oldEquip = equippedInv.getItemBySlot((short) bodyPart);
        if (oldEquip != null) {
            if (equipInv.getEmptySlots() > 0) {
                oldEquip.setInventoryID(chr.getEquipInventory().getId());
                oldEquip.setInvType(InvType.EQUIP);
                chr.unequip(oldEquip, equipInv.getFirstOpenSlot());
                oldEquip.updateToChar(chr);
                if (oldEquip instanceof Equip) {
                    oldChuc = ((Equip) oldEquip).getChuc();
                }
            } else {
                chr.consumeItem(oldEquip);
                chr.chatMessage("Trang bị " + StringData.getItemStringById(id) + " đã bị xoá do bạn không đủ ô chứa ở túi EQUIP.");
            }
        }
        equip.setInventoryID(chr.getEquippedInventory().getId());
        equip.setInvType(InvType.EQUIPPED);
        chr.equip(equip, bodyPart);
        equip.updateToChar(chr);
        Equip.notifyUnionChuc(chr, newChuc - oldChuc);
    }

    @Override
    public boolean hasItem(int id) {
        return hasItem(id, 1);
    }

    @Override
    public boolean isEquipped(int id) {
        return chr.getInventoryByType(InvType.EQUIPPED).getItems().stream().anyMatch(item -> item.getItemId() == id);
    }

    @Override
    public boolean hasItem(int id, int quantity) {
        return getQuantityOfItem(id) >= quantity;
    }

    @Override
    public void consumeItem(int itemID) {
        chr.consumeItem(itemID, 1);
    }

    @Override
    public void consumeItem(int itemID, int amount) {
        chr.consumeItem(itemID, amount);
    }

    @Override
    public void useItem(int id) {
        ItemBuffs.giveItemBuffsFromItemID(chr, chr.getTemporaryStatManager(), id);
    }

    @Override
    public int getQuantityOfItem(int id) {
        int quantity = 0;
        if (ItemConstants.isEquip(id)) {
            List<Item> equips = chr.getInventoryByType(InvType.EQUIP).getItems();
            for (Item equip : equips) {
                if (equip != null) {
                    if (equip.getItemId() == id) {
                        quantity += equip.getQuantity();
                    }
                }
            }
            return quantity;
        } else {
            Item sampleItem = ItemData.getItemDeepCopy(id);
            InvType invType = sampleItem.getInvType();
            List<Item> items = chr.getInventoryByType(invType).getItems();
            for (Item item : items) {
                if (item != null) {
                    if (item.getItemId() == id) {
                        quantity += item.getQuantity();
                    }
                }
            }
            return quantity;
        }
    }

    @Override
    public boolean canHold(int id) {
        return chr.canHold(id);
    }

    @Override
    public boolean canHold(int id, int quantity) {
        return chr.canHold(id, quantity);
    }

    @Override
    public int getEmptyInventorySlots(InvType invType) {
        return chr.getInventoryByType(invType).getEmptySlots();
    }

    public int getEmptyInventorySlots(int invType) {
        return chr.getInventoryByType(InvType.getInvTypeByVal(invType)).getEmptySlots();
    }

    // Quest-related methods -------------------------------------------------------------------------------------------
    @Override
    public void completeQuest(int questId) {
        chr.completeQuest(questId, false);
    }

    @Override
    public void completeQuestNoRewards(int questId) {
        chr.completeQuest(questId, true);
    }

    @Override
    public void startQuestNoCheck(int questId) {
        if (QuestConstants.isAccountQuest(questId)) {
            chr.getAccount().addQuest(QuestData.createAccQuestFromId(questId, chr.getAccount().getId()));
        } else {
            chr.addQuest(QuestData.createQuestFromId(questId, chr.getId()));
        }
    }

    @Override
    public void startQuest(int questId) {
        if (chr.canStartQuest(questId)) {
            if (QuestConstants.isAccountQuest(questId)) {
                chr.getAccount().addQuest(QuestData.createAccQuestFromId(questId, chr.getAccount().getId()));
            } else {
                chr.addQuest(QuestData.createQuestFromId(questId, chr.getId()));
            }
        }
    }

    public void setQuestStatus(int questId, int status) {
        if (QuestConstants.isAccountQuest(questId)) {
            AccountQuest q = chr.getAccount().getQuestById(questId);
            if (q != null) {
                q.setStatus(QuestStatus.getValByNum(status));
                chr.write(WvsContext.questRecordMessage(q));
                chr.write(WvsContext.questWorldShareMessage(q));
            } else {
                startQuest(questId);
            }
        } else {
            Quest q = chr.getQuestById(questId);
            if (q != null) {
                q.setStatus(QuestStatus.getValByNum(status));
                chr.write(WvsContext.questRecordMessage(q));
            } else {
                startQuest(questId);
            }
        }
    }

    @Override
    public boolean hasQuest(int questId) {
        return chr.hasQuestInProgress(questId);
    }

    @Override
    public boolean hasQuestCompleted(int questId) {
        return chr.hasQuestCompleted(questId);
    }

    public boolean hasHadQuest(int questId) {
        return hasQuest(questId) || hasQuestCompleted(questId);
    }

    public void createQuestWithQRValue(int questId, String qrValue, boolean ex) {
        chr.createQuestWithQRValue(questId, qrValue, ex);
    }

    public void createQuestWithQRValue(int questId, String qrValue) {
        chr.createQuestWithQRValue(questId, qrValue);
    }

    public void createQuestWithQRValue(Char chr, int questId, String qrValue, boolean ex) {
        chr.createQuestWithQRValue(chr, questId, qrValue, ex);
    }

    public void deleteQuest(int questId) {
        chr.deleteQuest(questId);
    }

    public String getQRValue(int questId) {
        return chr.getQRValue(questId);
    }

    public void setQRValue(int questId, String qrValue) {
        chr.setQRValue(questId, qrValue);
    }

    public void setQRValue(int questId, String qrValue, boolean ex) {
        chr.setQRValue(questId, qrValue, ex);
    }

    public void addQRValue(int questId, String qrValue) {
        chr.addQRValue(questId, qrValue);
    }

    public void addQRValue(int questId, String qrValue, boolean ex) {
        chr.addQRValue(questId, qrValue, ex);
    }

    public void updateQRValue(int questId, boolean ex) {
        chr.updateQRValue(questId, ex);
    }

    public String getQRValueByKey(int questId, String key) {
        return chr.getQRValueByKey(questId, key);
    }

    public void setQRValueByKey(int questId, String key, String value) {
        chr.setQRValueByKey(questId, key, value);
    }

    public String getQuestNameByQuestId(String questId) {
        int q = Integer.parseInt(questId);
        return QuestData.getQuestInfoById(q).getQuestName();
    }

    public String getQuestNameByQuestId(int questId) {
        return QuestData.getQuestInfoById(questId).getQuestName();
    }

    public String getCurrentDateAsString() {
        return FileTime.currentTime().toYYMMDD();
    }

    // Party Quest-related methods -------------------------------------------------------------------------------------

    public void givePQRewards(Party party) {
        showEffectToField(WzConstants.EFFECT_PQ_CLEAR);
        playSound(WzConstants.EFFECT_PQ_CLEAR, true);
        for (Char player : party.getPartyMembersInSameFieldWithChr(chr)) {
            ScriptManagerImpl sm = player.getScriptManager();
            sm.incWillEXP((short) 6);
            sm.incInsightEXP((short) 3);
            sm.addPartyPoint(10);
            sm.showClearStageExpWindow(getPQExp());
        }
    }

    // For Party
    public boolean checkAttempt(int entryQuest, Party party, int maximumCount) {
        DateTimeFormatter dtf_d = DateTimeFormatter.ofPattern("dd");
        final LocalDateTime now = LocalDateTime.now();
        int day = Integer.parseInt(dtf_d.format(now));
        if (party != null) {
            for (Char chr : chr.getParty().getPartyMembersInSameFieldWithChr(chr)) {
                ScriptManagerImpl sm = chr.getScriptManager();
                if (hasQuest(entryQuest)) {
                    final String date = sm.getQRValueByKey(entryQuest, "date"); // yy/MM/dd
                    if (date != null) {
                        final String count = sm.getQRValueByKey(entryQuest, "count");
                        if (count != null) {
                            int lastDay = Integer.parseInt(date.substring(6, 8));
                            if (lastDay == day) {
                                if (Integer.parseInt(count) >= maximumCount) {
                                    return false;
                                }
                            } else {
                                sm.setQRValueByKey(entryQuest, "count", "0");
                            }
                        }
                    }
                }
            }
            return true;
        }
        return false;
    }

    // For Party
    public boolean checkAttempt(int entryQuest, Party party) {
        return checkAttempt(entryQuest, party, 5);
    }

    // For Party
    public void addAttempt(int entryQuest, Party party) {
        final LocalDateTime now = LocalDateTime.now();
        for (Char player : party.getOnlineChars()) {
            ScriptManagerImpl sm = player.getScriptManager();
            if (sm.hasQuest(entryQuest) || sm.hasQuestCompleted(entryQuest)) {
                sm.setQRValueByKey(entryQuest, "count", sm.getQRValueByKey(entryQuest, "count").equals("5") ? "1" : String.valueOf(Integer.parseInt(sm.getQRValueByKey(entryQuest, "count")) + 1));
                sm.setQRValueByKey(entryQuest, "date", DateTimeFormatter.ofPattern("yy/MM/dd").format(now));
            } else {
                sm.createQuestWithQRValue(entryQuest, String.format("count=%d;date=%s", 1, DateTimeFormatter.ofPattern("yy/MM/dd").format(now)));
            }
        }
    }

    // For Single Character
    public boolean checkAttempt(int entryQuest, int maximumCount) {
        if (hasQuest(entryQuest) || hasQuestCompleted(entryQuest)) {
            final String date = getQRValueByKey(entryQuest, "date"); // yy/MM/dd
            if (date != null) {
                final String count = getQRValueByKey(entryQuest, "count");
                if (count != null) {
                    DateTimeFormatter dtf_d = DateTimeFormatter.ofPattern("dd");
                    final LocalDateTime now = LocalDateTime.now();
                    int day = Integer.parseInt(dtf_d.format(now));
                    int lastDay = Integer.parseInt(date.substring(6, 8));
                    if (lastDay == day) {
                        return Integer.parseInt(count) < maximumCount;
                    }
                }
            }
        }
        return true;
    }

    // For Single Character
    public void addAttempt(int entryQuest, int maximumCount) {
        final LocalDateTime now = LocalDateTime.now();
        if (hasQuest(entryQuest) || hasQuestCompleted(entryQuest)) {
            setQRValueByKey(entryQuest, "count", getQRValueByKey(entryQuest, "count").equals("" + maximumCount) ? "1" : String.valueOf(Integer.parseInt(getQRValueByKey(entryQuest, "count")) + 1));
            setQRValueByKey(entryQuest, "date", DateTimeFormatter.ofPattern("yy/MM/dd").format(now));
        } else {
            createQuestWithQRValue(entryQuest, String.format("count=%d;date=%s", 1, DateTimeFormatter.ofPattern("yy/MM/dd").format(now)));
        }
    }

    public void addAttemptChuChuPQ(int entryQuest) {
        final LocalDateTime now = LocalDateTime.now();
        ScriptManagerImpl sm = chr.getScriptManager();
        if (sm.hasQuest(entryQuest) || hasQuestCompleted(entryQuest)) {
            sm.setQRValueByKey(entryQuest, "diff", sm.getFieldID() == GameConstants.HUNGRY_MUTO_HARD_STAGE ? "hard" : "normal");
            sm.setQRValueByKey(entryQuest, "count", sm.getQRValueByKey(entryQuest, "count").equals("3") ? "1" : String.valueOf(Integer.parseInt(sm.getQRValueByKey(entryQuest, "count")) + 1));
            sm.setQRValueByKey(entryQuest, "inGame", "1");
            sm.setQRValueByKey(entryQuest, "date", DateTimeFormatter.ofPattern("yy/MM/dd").format(now));
            sm.setQRValueByKey(entryQuest, "score", "0");
            sm.setQRValueByKey(entryQuest, "ptime", "0");
            sm.setQRValueByKey(entryQuest, "clear", "0");
        } else {
            sm.createQuestWithQRValue(entryQuest, String.format("diff=%s;count=%d;ingame=%d;date=%s;score=%d;ptime=%d;clear=%d", sm.getFieldID() == GameConstants.HUNGRY_MUTO_HARD_STAGE ? "hard" : "normal", 1, 1, DateTimeFormatter.ofPattern("yy/MM/dd").format(now), 0, 0, 0));
        }
    }

    public void sendDojoStart(int stage) {
        if (chr.getDojoStartTime() == 0 || getFieldID() == 925070100) {
            chr.setDojoStartTime(System.currentTimeMillis());
        }
        chr.getField().broadcast(FieldPacket.clock(ClockPacket.timerInfoEx(900,
                (int) ((System.currentTimeMillis() - chr.getDojoStartTime() - chr.getDojoCoolTime()) / 1000))));
        //int entry = Integer.parseInt(String.valueOf(getQRValue(1213).charAt(4)));
        //createQuestWithQRValue(1213, "try=" + entry + 1);
        playSound("Dojang/start", 100);
        showEffectToField(WzConstants.EFFECT_DOJO_STAGE);
        showEffectToField(WzConstants.EFFECT_DOJO_STAGE_NUMBER + stage);
    }

    public void addEventPoint(int amount) {
        addPoint(QuestConstants.EVENT_POINT, amount);
        progressMessageFont("Bạn đã nhận được " + amount + " điểm event");
    }

    public void addDojoPoint(int amount) {
        addPoint(QuestConstants.MULUNG_POINT, amount);
        progressMessageFont("Bạn đã nhận được " + amount + " điểm dojo");
    }

    public void addPartyPoint(int amount) {
        addPoint(QuestConstants.PARTY_POINT, amount);
        progressMessageFont("Bạn đã nhận được " + amount + " điểm party");
    }

    public void addOzPoint(int amount) {
        addPoint(QuestConstants.TOWEROFOZ_POINT, amount);
        progressMessageFont("Bạn đã nhận được " + amount + " điểm oz");
    }

    public void addPoint(int questID, int amount) {
        if (questID == QuestConstants.UNION_COIN) {
            addUnionCoin(amount);
        } else if (hasQuest(questID)) {
            int point = Integer.parseInt(getQRValue(questID).substring(6));
            point += amount;
            setQRValue(questID, String.format(QuestConstants.POINT_SETTING_FORMAT, point));
            updateQRValue(questID, true);
        } else {
            createQuestWithQRValue(questID, String.format(QuestConstants.POINT_SETTING_FORMAT, amount));
        }
    }

    public void decPoint(int questID, int amount) {
        if (questID == QuestConstants.DONATION_POINT) {
            chr.getUser().deductDonationPoints(amount);
        } else if (questID == QuestConstants.VOTE_POINT) {
            chr.getUser().deductVotePoints(amount);
        } else if (questID == QuestConstants.UNION_COIN) {
            addUnionCoin(-amount);
            return;
        } else if (questID == QuestConstants.STARDUST_POINT) {
            chr.getDailyCoin().decCoin(chr, amount);
        }
        int point = Integer.parseInt(getQRValue(questID).substring(6));
        int newPoint = Math.max(point - amount, 0);
        setQRValue(questID, String.format(QuestConstants.POINT_SETTING_FORMAT, newPoint));
        updateQRValue(questID, true);
    }

    public Instance getInstance() {
        if (chr.getParty() != null) {
            return chr.getParty().getInstance();
        } else {
            if (chr.getInstance() != null) {
                return chr.getInstance();
            }
        }
        return null;
    }

    public void setAchieveRatio(int ratio, boolean isParty) {
        if (getParty() != null && isParty) {
            Instance instance = getParty().getInstance();
            if (instance != null) {
                instance.setAchieveRatio(ratio);
                if (ratio == 0) {
                    getParty().broadcast((FieldPacket.setAchieveRate(getParty().getInstance().getAchieveRatio())));
                }
            }
        } else {
            Instance instance = chr.getInstance();
            if (instance != null) {
                instance.setAchieveRatio(ratio);
                if (ratio == 0) {
                    chr.write(FieldPacket.setAchieveRate(getParty().getInstance().getAchieveRatio()));
                }
            }
        }
    }

    public void setAchieveRatio(int ratio) {
        setAchieveRatio(ratio, true);
    }

    public void startGhostPark() {
        NpcScriptInfo nsi = getNpcScriptInfo();
        nsi.setMessageType(NpcMessageType.GhostParkEnter);
        chr.write(ScriptMan.scriptMessage(getNpcScriptInfo(), NpcMessageType.GhostParkEnter));
    }

    public void incrementMonsterParkCount() {
        chr.setMonsterParkCount((byte) (chr.getMonsterParkCount() + 1));
    }

    public byte getMonsterParkCount() {
        return chr.getMonsterParkCount();
    }

    public String getDay() {
        return new SimpleDateFormat("EEEE", Locale.ENGLISH).format(System.currentTimeMillis());
    }

    public int getMPExpByMobId(int templateId) {
        return MonsterPark.getExpByMobId(templateId);
    }

    public int getMPReward() {
        return MonsterPark.getRewardByDay();
    }

    public long getPQExp() {
        return getPQExp(chr);
    }

    public long getPQExp(Char chr) {
        return GameConstants.PARTY_QUEST_EXP_FORMULA(chr);
    }

    public boolean rectangleStages(int stage) {
        int correctAnswer = 0;
        if (stage == 2) {
            int[][] answers = {{0, 1, 1, 1}, {1, 0, 1, 1}, {1, 1, 0, 1}, {1, 1, 1, 0}};
            int[] answer = answers[(int) Math.floor(Math.random() * answers.length)];
            int[] playerPlacement = {0, 0, 0, 0};
            Rect[] areas = {new Rect(-971, -132, -948, 42), new Rect(-800, -143, -772, 40),
                    new Rect(-662, -138, -636, 37), new Rect(-522, -142, -493, 33)};
            for (Char pm : getParty().getOnlineChars()) {
                for (int i = 0; i < areas.length; i++) {
                    if (areas[i].hasPositionInside(pm.getPosition())) {
                        playerPlacement[i] += 1;
                    }
                }
            }
            for (int i = 0; i < answer.length; i++) {
                if (playerPlacement[i] == answer[i]) {
                    correctAnswer++;
                }
            }
            if (correctAnswer == 3) {
                return true;
            } else {
                chr.chatScriptMessage("You currently selected " + correctAnswer + " correct rope(s).");
            }
        } else if (stage == 3) {
            int[][] answers = {{0, 0, 1, 1, 1}, {0, 1, 0, 1, 1}, {0, 1, 1, 0, 1}, {0, 1, 1, 1, 0}, {1, 0, 0, 1, 1},
                    {1, 0, 1, 0, 1}, {1, 0, 1, 1, 0}, {1, 1, 0, 0, 1}, {1, 1, 0, 1, 0}, {1, 1, 1, 0, 0}};
            int[] answer = answers[(int) Math.floor(Math.random() * answers.length)];
            int[] playerPlacement = {0, 0, 0, 0, 0, 0};
            Rect[] areas = {new Rect(608, -185, 737, -125), new Rect(780, -120, 918, -66),
                    new Rect(969, -183, 1096, -122), new Rect(880, -243, 1005, -186),
                    new Rect(698, -243, 826, -18)};
            for (Char pm : getParty().getOnlineChars()) {
                for (int i = 0; i < areas.length; i++) {
                    if (areas[i].hasPositionInside(pm.getPosition())) {
                        playerPlacement[i] += 1;
                    }
                }
            }
            for (int i = 0; i < answer.length; i++) {
                if (playerPlacement[i] == answer[i]) {
                    correctAnswer++;
                }
            }
            if (correctAnswer == 3) {
                return true;
            } else {
                chr.chatScriptMessage("You currently selected " + correctAnswer + " correct platform(s).");
            }
        }
        return false;
    }

    // Boss-related methods --------------------------------------------------------------------------------------------

    @Override
    public void setDeathCount(int deathCount) {
        chr.setDeathCount(deathCount);
        //chr.write(UserLocal.deathCountInfo(deathCount));
        chr.write(UserLocal.deathCountInfo(chr.getId(), deathCount));
    }

    @Override
    public void setPartyDeathCount(int deathCount) {
        Party party = chr.getParty();
        if (party != null) {
            for (Char pmChr : party.getPartyMembersInSameFieldWithChr(chr)) {
                pmChr.setDeathCount(deathCount);
            }
        }
    }

    public void createObstacleAtom(ObtacleAtomEnum oae, int key, int damage, int velocity, int amount, int proc) {
        createObstacleAtom(oae, key, damage, velocity, 0, amount, proc);
    }

    @Override
    public void createObstacleAtom(ObtacleAtomEnum oae, int key, int damage, int velocity, int angle, int amount, int proc) {
        Field field = chr.getField();
        createObstacleAtom(field, oae, key, damage, velocity, angle, amount, proc);
    }

    public void createObstacleAtom(Field field, ObtacleAtomEnum oae, int key, int damage, int velocity, int angle, int amount, int proc) {
        int xLeft = field.getVrLeft();
        int yTop = field.getVrTop();

        ObtacleInRowInfo obtacleInRowInfo = new ObtacleInRowInfo(4, false, 5000, 0, 0, 0);
        ObtacleRadianInfo obtacleRadianInfo = new ObtacleRadianInfo(4, 0, 0, 0, 0);
        Set<ObtacleAtomInfo> obtacleAtomInfosSet = new HashSet<>();

        for (int i = 0; i < amount; i++) {
            if (Util.succeedProp(proc)) {
                int randomX = new Random().nextInt(field.getWidth()) + xLeft;
                Position position = new Position(randomX, yTop);
                Foothold foothold = field.findFootHoldBelow(position);
                if (foothold != null) {
                    int footholdY = foothold.getYFromX(position.getX());
                    int height = position.getY() - footholdY;
                    height = height < 0 ? -height : height;

                    obtacleAtomInfosSet.add(new ObtacleAtomInfo(oae.getType(), key, position, new Position(), oae.getHitBox(),
                            damage, 0, 0, height, 0, velocity, height, angle));
                }
            }
        }

        field.broadcast(FieldPacket.createObtacle(ObtacleAtomCreateType.NORMAL, obtacleInRowInfo, obtacleRadianInfo, obtacleAtomInfosSet));
    }

    public void stopEvents() {
        Set<ScheduledFuture> events = getEvents();
        events.forEach(st -> st.cancel(true));
        events.clear();
        Field field;
        if (chr != null) {
            field = chr.getField();
        } else {
            field = this.field;
        }
        if (field != null) {
            field.broadcast(FieldPacket.clearObtacle());
            field.broadcast(FieldPacket.destroy());
        }
    }

    private Set<ScheduledFuture> getEvents() {
        return events;
    }

    public void addEvent(ScheduledFuture<?> event) {
        getEvents().add(event);
    }

    public void cancelTimer() {
        for (ScheduledFuture sf : getEvents()) {
            if (sf != null) {
                sf.cancel(true);
            }
        }
    }

    // Character Temporary Stat-related methods ------------------------------------------------------------------------

    @Override
    public void giveCTS(CharacterTemporaryStat cts, int nOption, int rOption, int time) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o = new Option();
        o.nOption = nOption;
        o.rOption = rOption;
        o.tOption = time;
        tsm.sendStat(cts, o);
    }

    @Override
    public void removeCTS(CharacterTemporaryStat cts) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        tsm.removeStat(cts);
    }

    @Override
    public void removeBuffBySkill(int skillId) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        tsm.removeStatsBySkill(skillId);
    }

    @Override
    public boolean hasCTS(CharacterTemporaryStat cts) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        return tsm.hasStat(cts);
    }

    @Override
    public int getnOptionByCTS(CharacterTemporaryStat cts) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        return hasCTS(cts) ? tsm.getOption(cts).nOption : 0;
    }

    @Override
    public void rideVehicle(int mountID) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        TemporaryStatBase tsb = tsm.getTSBByTSIndex(TSIndex.RideVehicle);

        tsb.setNOption(mountID);
        tsb.setROption(Kaiser.FINAL_TRANCE);
        tsm.sendStat(RideVehicle, tsb.getOption());
    }

    public void rideVehicleExpire(int skillID, int mountID) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o = new Option();
        TemporaryStatBase tsb = tsm.getTSBByTSIndex(TSIndex.RideVehicleExpire);
        tsb.setNOption(mountID);
        tsb.setROption(skillID);
        tsb.setExpireTerm(0);
        tsm.sendStat(RideVehicleExpire, tsb.getOption());
        o.nOption = 1;
        o.rOption = skillID;
        o.tOption = 0;
        tsm.sendStat(NewFlying, o);
    }

    // InGameDirectionEvent methods ------------------------------------------------------------------------------------

    @Override
    public int moveCamera(boolean back, int speed, int x, int y) {
        getNpcScriptInfo().setMessageType(AskIngameDirection);
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.cameraMove(back, speed, new Position(x, y))));
        ScriptInfo si = getScriptInfoByType(getLastActiveScriptType());
        if (si == null) {
            throw new NullPointerException(INTENDED_NPE_MSG);
        }
		Integer response = si.awaitResponseInteger(0);
        if (response == null) {
            throw new NullPointerException(INTENDED_NPE_MSG);
        }
        return (int) response;
    }

    public void moveCamera(int speed, int x, int y) {
        moveCamera(false, speed, x, y);
    }

    public void moveCameraBack(int speed) {
        moveCamera(true, speed, chr.getPosition().getX(), chr.getPosition().getY());
    }

    @Override
    public int zoomCamera(int inZoomDuration, int scale, int x, int y) {
        return zoomCamera(inZoomDuration, scale, 1000, x, y);
    }

    public int zoomCamera(int inZoomDuration, int scale, int timePos, int x, int y) {
        getNpcScriptInfo().setMessageType(NpcMessageType.AskIngameDirection);
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.cameraZoom(inZoomDuration, scale, timePos, new Position(x, y))));
        ScriptInfo si = getScriptInfoByType(getLastActiveScriptType());
        if (si == null) {
            throw new NullPointerException(INTENDED_NPE_MSG);
        }
        Integer response = si.awaitResponseInteger(0);
        if (response == null) {
            throw new NullPointerException(INTENDED_NPE_MSG);
        }
        return (int) response;
    }

    @Override
    public void resetCamera() {
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.cameraOnCharacter(0))); // 0 resets the Camera
    }

    public void setCameraOnNpc(int npcTemplateId) {
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.cameraOnCharacter(npcTemplateId)));
    }

    @Override
    public int sendDelay(int delay) {
        getNpcScriptInfo().setMessageType(NpcMessageType.AskIngameDirection);
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.delay(delay)));
        Object response = null;
        var lastActiveScriptType = getLastActiveScriptType();
        if (isActive(lastActiveScriptType)) {
            response = getScriptInfoByType(lastActiveScriptType).awaitResponseInteger(0);
        }
        if (response == null) {
            throw new NullPointerException(INTENDED_NPE_MSG);
        }
        return (int) response;
    }

    @Override
    public void doEventAndSendDelay(int delay, String methodName, Object... args) {
        invoke(chr.getScriptManager(), methodName, args);
        sendDelay(delay);
    }

    @Override
    public void forcedMove(boolean left, int distance) {
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.forcedMove(left, distance)));
    }

    @Override
    public void forcedFlip(boolean left) {
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.forcedFlip(left)));
    }

    @Override
    public void forcedAction(int type, int duration) {
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.forcedAction(type, duration)));
    }

    @Override
    public void forcedInput(int type) {
        ForcedInputType fit = ForcedInputType.getByVal(type);
        if (fit == null) {
            System.out.printf("Unknown Forced Input Type %d", type);
            return;
        }
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.forcedInput(type)));
    }

    public void patternInputRequest(String pattern, int act, int requestCount, int time) {
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.patternInputRequest(pattern, act, requestCount, time)));
    }

    @Override
    public void hideUser(boolean hide) {
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.vansheeMode(hide)));
    }

    public void showEffect(String path, int duration, int x, int y) {
        showEffect(path, duration, x, y, 0, 0, true, 0);
    }

    @Override
    public void showEffect(String path, int duration, int x, int y, int z, int npcIdForExtend, boolean onUser, int idk2) {
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.effectPlay(path, duration, new Position(x, y), z, npcIdForExtend, onUser, idk2)));
    }

    public void showEffectOnPosition(String path, int duration, int x, int y) {
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.effectPlay(path, duration,
                new Position(x, y), 0, 1, false, 0)));
    }

    public void showBalloonMsgOnNpc(String path, int duration, int x, int y, int templateID) {
        int objectID = getNpcObjectIdByTemplateId(templateID);
        if (objectID == 0) return;
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.effectPlay(path, duration,
                new Position(x, y), 0, objectID, false, 0)));
    }

    public void showBalloonMsgOnNpc(String path, int duration, int templateID) {
        showBalloonMsgOnNpc(path, duration, 0, -100, templateID);
    }

    public void showNpcEffectOnPosition(String path, int x, int y, int templateID) {
        int objectID = getNpcObjectIdByTemplateId(templateID);
        if (objectID == 0) return;
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.effectPlay(path, 0,
                new Position(x, y), 0, objectID, false, 0)));
    }

    public void showBalloonMsg(String path, int duration) {
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.effectPlay(path, duration,
                new Position(0, -100), 0, 0, true, 0)));
    }

    public int sayMonologue(String text, boolean isEnd) {
        getNpcScriptInfo().setMessageType(Monologue);
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.monologue(text, isEnd)));
        Object response = null;
        var lastActiveScriptType = getLastActiveScriptType();
        if (isActive(lastActiveScriptType)) {
            response = getScriptInfoByType(lastActiveScriptType).awaitResponseInteger(0);
        }
        if (response == null) {
            throw new NullPointerException(INTENDED_NPE_MSG);
        }
        return (int) response;
    }

    public void avatarLookSet(int[] equipIDs) {
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.avatarLookSet(equipIDs)));
    }

    public void removeAdditionalEffect() {
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.removeAdditionalEffect()));
    }

    public void faceOff(int faceItemID) {
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.faceOff(faceItemID)));
    }

    public void monologueScroll(String msg, boolean stayModal, short align, int updateSpeedTime, int decTic) {
        chr.write(UserLocal.inGameDirectionEvent(InGameDirectionEvent.monologueScroll(msg, stayModal, align,
                updateSpeedTime, decTic)));
    }

    public void startRoute(int fieldID) {
        int navigationQRKey = 1951;
        if (!chr.hasQuest(navigationQRKey)) {
            chr.createQuestWithQRValue(navigationQRKey, "questID=0;targetMapID=" + fieldID);
        } else {
            chr.setQRValueByKey(navigationQRKey, "targetMapID", fieldID);
        }
        chr.write(UserLocal.createRoute(fieldID));
    }

    public void startNavigation(int fieldID) {
        int navigationQRKey = 1951;
        if (!chr.hasQuest(navigationQRKey)) {
            chr.createQuestWithQRValue(navigationQRKey, "questID=0;targetMapID=" + fieldID);
        } else {
            chr.setQRValueByKey(navigationQRKey, "targetMapID", fieldID);
        }
        chr.write(WvsContext.startNavigation(fieldID, 0, ""));
    }

    public void startNavigation(int questID, int fieldID) {
        int navigationQRKey = 1951;
        if (!chr.hasQuest(navigationQRKey)) {
            chr.createQuestWithQRValue(navigationQRKey, "questID="+questID+";targetMapID=" + fieldID);
        } else {
            chr.setQRValueByKey(navigationQRKey, "questID", questID);
            chr.setQRValueByKey(navigationQRKey, "targetMapID", fieldID);
        }
        chr.write(WvsContext.startNavigation(fieldID, 0, ""));
    }

    // Clock methods ---------------------------------------------------------------------------------------------------

    public Clock createStopWatch(int seconds) {
        return new Clock(ClockType.StopWatch, chr.getField(), seconds);
    }

    public Clock createClock(int seconds) {
        return new Clock(ClockType.SecondsClock, chr.getField(), seconds);
    }

    public void createClock(int hours, int minutes, int seconds) {
        chr.write(FieldPacket.clock(ClockPacket.hmsClock((byte) hours, (byte) minutes, (byte) seconds)));
        addEvent(chr.getTimer().addEvent(this::removeClock, seconds + minutes * 60L + hours * 3600L, TimeUnit.SECONDS));
    }

    public void createClockForMultiple(int seconds, int... fieldIDs) {
        for (int fieldID : fieldIDs) {
            Field field = chr.getOrCreateFieldByCurrentInstanceType(fieldID);
            new Clock(ClockType.SecondsClock, field, seconds);
        }
    }

    public void removeClock() {
        chr.write(FieldPacket.destroy());
    }

    public Clock createTimerGauge(int seconds) {
        return new Clock(ClockType.TimerGauge, chr.getField(), seconds);
    }


    // Other methods ---------------------------------------------------------------------------------------------------

    public void sendGachaponDlg(GachaponDlgType type) {
        chr.write(chr.getGachaponManager().encode(type));
        chr.dispose();
    }

    public void openAranSkillGuide() {
        chr.write(UserLocal.openSkillGuide());
    }

    public int getActivatedDamageSkin() {
        return chr.getActiveDamageSkin().getItemID();
    }

    public boolean hasDamageSkin(int itemID) {
        return chr.getDamageSkinByItemID(itemID) != null;
    }

    @Override
    public boolean addDamageSkin(int itemID) {
        DamageSkinType error = null;
        final List<DamageSkinSaveData> skins = chr.getDamageSkins().stream().filter(d -> d.getDamageSkinID() != 0).toList();
        if (skins.size() >= GameConstants.DAMAGE_SKIN_MAX_SIZE) {
            error = DamageSkinType.Res_Fail_SlotCount;
        } else if (chr.getDamageSkinByItemID(itemID) != null) {
            error = DamageSkinType.Res_Fail_AlreadyExist;
        }
        if (error != null) {
            chr.write(UserLocal.damageSkinSaveResult(DamageSkinType.Req_Reg, error, null));
        } else {
            Quest q = chr.getQuestById(QuestConstants.DAMAGE_SKIN);
            if (q == null) {
                q = new Quest(chr.getId(), QuestConstants.DAMAGE_SKIN, QuestStatus.Started);
                chr.addQuest(q);
            }
            chr.consumeItem(itemID, 1);
            DamageSkinSaveData dssd = DamageSkinSaveData.getByItemID(itemID);
            q.setQrValue(String.valueOf(dssd.getDamageSkinID()));
            dssd.setCharId(chr.getId());
            dssd.setActivateTime(FileTime.currentTime());
            chr.addDamageSkin(dssd);
            chr.setActiveDamageSkin(dssd);
            chr.write(UserLocal.damageSkinSaveResult(DamageSkinType.Req_Reg,
                    DamageSkinType.Res_Success, chr));
            chr.write(UserPacket.setActiveDamageSkin(chr));
            chr.write(WvsContext.questRecordMessage(q));
        }
        return error == null;
    }

    @Override
    public void openUI(UIType uiID) {
        int uiIDValue = uiID.getVal();
        chr.write(FieldPacket.openUI(uiIDValue));
    }

    public void openUI(int uiID) {
        chr.write(FieldPacket.openUI(uiID));
    }

    public void openUIWithOption(int uiID, int option) {
        chr.write(FieldPacket.openUIWithOption(uiID, option, new int[0]));
    }

    public void openUIWithOption(UIType uiID, int option) {
        openUIWithOption(uiID, option, new int[0]);
    }

    public void openUIWithOption(UIType uiID, int option, int[] minigameOptions) {
        int uiIDValue = uiID.getVal();
        chr.write(FieldPacket.openUIWithOption(uiIDValue, option, minigameOptions));
    }

    public void openUIWithFocus(int uiID, int option, int unk) {
        chr.write(FieldPacket.openUIWithFocus(uiID, option, unk));
    }

    public void openUIWithFocus(UIType uiID, int option, int unk) {
        int uiIDValue = uiID.getVal();
        chr.write(FieldPacket.openUIWithFocus(uiIDValue, option, unk));
    }

    public void closeUI(UIType uiID) {
        int uiIDValue = uiID.getVal();
        chr.write(FieldPacket.closeUI(uiIDValue));
    }

    public void closeUI(int uiID) {
        chr.write(FieldPacket.closeUI(uiID));
    }

    public void makeDescOnUI(int mapID, int type, String str, String str2, int... args) {
        chr.write(UserLocal.makeDescOnUI(mapID, type, str, str2, args));
    }

    @Override
    public void showClearStageExpWindow(long expGiven) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.showClearStageExpWindow((int) expGiven)));
        giveExpNoAffectedByExpRate(expGiven);
    }

    public void showClearStageExpWindowToParty(long expGiven) {
        for (Char player : getParty().getPartyMembersInSameFieldWithChr(chr)) {
            player.write(FieldPacket.fieldEffect(FieldEffect.showClearStageExpWindow((int) expGiven)));
            player.addExp(expGiven, false);
        }
    }

    public void playSound(String sound) {
        playSound(sound, 100);
    }

    public void playSound(String sound, boolean sendField) {
        playSound(sound, 100, sendField);
    }

    public void playSound(String sound, int vol) {
        playSound(sound, vol, false);
    }

    public void playSound(String sound, int vol, boolean sendField) {
        if (sendField) {
            Field field = chr.getField();
            field.broadcast(FieldPacket.fieldEffect(FieldEffect.playSound(sound, vol)));
        } else {
            chr.write(FieldPacket.fieldEffect(FieldEffect.playSound(sound, vol)));
        }
    }

    public void playSoundToField(String sound, int vol) {

    }

    public void blind(int enable, int x, int color, int time) {
        blind(enable, x, color, 0, 0, time);
    }

    public void blind(int enable, int x, int color, int unk1, int unk2, int time) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.blind(enable, x, color, unk1, unk2, time)));
    }

    public void OnOffLayer_On(int term, String key, int x, int y, int z, String path, int origin, int unk5, int unk6, int unk7) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.OnOffLayer_On(term, key, x, y, z, path, origin, unk5, unk6, unk7)));
    }

    public void OnOffLayer_Move(int term, String key, int dx, int dy) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.OnOffLayer_Move(term, key, dx, dy)));
    }

    public void OnOffLayer_Off(int term, String key, int unk) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.OnOffLayer_Off(term, key, unk)));
    }

    public void onLayer(int duration, String key, int x, int y, int z, String origin, int org, boolean postRender, int idk, boolean repeat) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.OnOffLayer_On(duration, key, x, y, z, origin, org, postRender, idk, repeat)));
    }

    public void moveLayer(int duration, String key, int x, int y) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.OnOffLayer_Move(duration, key, x, y)));
    }

    public void offLayer(int duration, String key, boolean repeat) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.OnOffLayer_Off(duration, key, repeat)));
    }

    @Override
    public int getRandomIntBelow(int upBound) {
        return new Random().nextInt(upBound);
    }

    public void showEffect(String dir) {
        showEffect(dir, 0);
    }

    public void showEffect(String dir, int delay) {
        showEffect(dir, 4, delay);
    }

    public void showScene(String xmlPath, String sceneName, String sceneNumber) {
        Scene scene = new Scene(chr, xmlPath, sceneName, sceneNumber);
        scene.createScene();
    }

    @Override
    public void showEffect(String dir, int placement, int delay) {
        chr.write(UserPacket.effect(Effect.effectFromWZ(dir, false, delay, placement, 0)));
    }

    public void fieldItemConsumed(long expGain) {
        chr.write(UserPacket.effect(Effect.fieldItemConsumed((int) (expGain > Integer.MAX_VALUE ? Integer.MAX_VALUE : expGain))));
    }

    public void createFieldTextEffect(String msg, int letterDelay, int showTime, int clientPosition, int boxPosX,
                                      int boxPosY, int align, int lineSpace, TextEffectType type, int enterType, int leaveType) {
        chr.write(UserPacket.effect(Effect.createFieldTextEffect(msg, letterDelay, showTime, clientPosition,
                new Position(boxPosX, boxPosY), align, lineSpace, type, enterType, leaveType)));
    }

    public void createFieldTextEffect(String msg, int letterDelay, int showTime, int clientPosition, int boxPosX,
                                      int boxPosY, int align, int lineSpace, int type, int enterType, int leaveType) {
        chr.write(UserPacket.effect(Effect.createFieldTextEffect(msg, letterDelay, showTime, clientPosition,
                new Position(boxPosX, boxPosY), align, lineSpace, TextEffectType.TextNoBackground, enterType, leaveType)));
    }

    public void playPortalSound() {
        chr.write(UserPacket.effect(Effect.playPortalSound()));
    }

    public void playPortalSoundToField() {
        chr.getField().broadcast(UserPacket.effect(Effect.playPortalSound()));
    }

    public void avatarOriented(String effectPath) {
        chr.write(UserPacket.effect(Effect.avatarOriented(effectPath)));
    }

    public void reservedEffect(String effectPath) {
        chr.write(UserPacket.effect(Effect.reservedEffect(effectPath)));

        String[] splitted = effectPath.split("/");
        String sceneName = splitted[splitted.length - 2];
        String sceneNumber = splitted[splitted.length - 1];
        String xmlPath = effectPath.replace("/" + sceneName, "").replace("/" + sceneNumber, "").replace("Effect/", "Effect.wz/");

        int fieldID = new Scene(chr, xmlPath, sceneName, sceneNumber).getTransferField();
        if (fieldID != 0) {
            chr.setTransferField(fieldID);
        }
    }

    public void reservedEffectRepeat(String effectPath, boolean start) {
        chr.write(UserPacket.effect(Effect.reservedEffectRepeat(effectPath, start)));
    }

    public void reservedEffectRepeat(String effectPath) {
        reservedEffectRepeat(effectPath, true);
    }

    public void playExclSoundWithDownBGM(String soundPath, int volume) {
        chr.write(UserPacket.effect(Effect.playExclSoundWithDownBGM(soundPath, volume)));
    }

    public void blindEffect(boolean blind) {
        chr.write(UserPacket.effect(Effect.blindEffect(blind)));
    }

    public void fadeInOut(int fadeIn, int delay, int fadeOut, int alpha) {
        chr.write(UserPacket.effect(Effect.fadeInOut(fadeIn, delay, fadeOut, alpha)));
    }

    public void speechBalloon(boolean normal, int range, int nameHeight, String speech, int time, int origin, int x, int y, int z, int lineSpace, int templateID) {
        chr.write(UserPacket.effect(Effect.speechBalloon(normal, range, nameHeight, speech, time, origin, x, y, z, lineSpace, templateID, chr.getId())));
    }

    public String formatNumber(String number) {
        return Util.formatNumber(number);
    }

    private Object invoke(Object invokeOn, String methodName, Object... args) {
        try {
            List<Class<?>> classList = Arrays.stream(args).map(Object::getClass).collect(Collectors.toList());
            Class<?>[] classes = classList.stream().map(Util::convertBoxedToPrimitiveClass).toArray(Class<?>[]::new);
            Method func;
            try {
                func = getClass().getMethod(methodName, classes);
                return func.invoke(invokeOn, args);
            } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
                DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, e);
            }
        } catch (Exception e) {
            DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, e);
        }
        return null;
    }

    public void invokeForParty(String methodName, Object... args) {
        if (chr.getParty() == null) {
            invoke(this, methodName, args);
            return;
        }
        for (PartyMember pm : chr.getParty().getMembers()) {
            if (pm.getChr() == null) {
                continue;
            }
            ScriptManagerImpl sm = pm.getChr().getScriptManager();
            invoke(sm, methodName, args);
        }
    }

    public void invokeForParty(long delay, String methodName, Object... args) {
        if (chr.getParty() == null) {
            invokeAfterDelay(delay, methodName, args);
            return;
        }
        for (PartyMember pm : chr.getParty().getMembers()) {
            if (pm.getChr() == null) {
                continue;
            }
            ScriptManagerImpl sm = pm.getChr().getScriptManager();
            sm.invokeAfterDelay(delay, methodName, args);
        }
    }

    public ScheduledFuture<?> invokeAfterDelay(long delay, String methodName, Object... args) {
        ScheduledFuture<?> sf = chr.getTimer().addEvent(() -> invoke(this, methodName, args), delay);
        addEvent(sf);
        return sf;
    }

    public ScheduledFuture<?> invokeAtFixedRate(long initialDelay, long delayBetweenExecutions,
                                                int executes, String methodName, Object... args) {
        ScheduledFuture<?> sf;
        if (executes == 0) {
            sf = chr.getTimer().addFixedRateEvent(() -> invoke(this, methodName, args),
                    initialDelay,
                    delayBetweenExecutions, false);
        } else {
            sf = chr.getTimer().addFixedRateEvent(() -> invoke(this, methodName, args),
                    initialDelay,
                    delayBetweenExecutions,
                    executes);
        }
        addEvent(sf);
        if (executes == 0) {
            if (chr != null) {
                GlobalTimerManager.addCharTimer(chr.getId(), sf);
            } else if (field != null) {
                GlobalTimerManager.addFieldTimer(field.getSN(), sf);
            }
        }
        return sf;
    }

    public int playVideoByScript(String videoPath) {
        getNpcScriptInfo().setMessageType(PlayMovieClip);
        chr.write(UserLocal.videoByScript(videoPath, true));
        Object response = null;
        var lastActiveScriptType = getLastActiveScriptType();
        if (isActive(lastActiveScriptType)) {
            response = getScriptInfoByType(lastActiveScriptType).awaitResponseInteger(0);
        }
        if (response == null) {
            throw new NullPointerException(INTENDED_NPE_MSG);
        }
        return (int) response;
    }

    public void setFuncKeyByScript(boolean add, int action, int key) {
        chr.write(UserLocal.setFuncKeyByScript(add, action, key));
        chr.getFuncKeyMap().putKeyBinding(chr.getId(), key, add ? (byte) 1 : (byte) 0, action);
    }

    public void addPopUpSay(int npcID, int duration, String message, String effect) {
        chr.write(UserLocal.addPopupSay(npcID, duration, message, effect));
    }

    public void setFieldFloating(int fieldID, int x, int y, int term) {
        chr.write(UserLocal.setFieldFloating(fieldID, x, y, term));
    }

    public void moveParticleEff(String type, int startX, int startY, int endX, int endY, int moveTime, int totalCount, int oneSprayMin, int oneSprayMax) {
        chr.write(UserLocal.moveParticleEff(type, new Position(startX, startY), new Position(endX, endY), moveTime, totalCount, oneSprayMin, oneSprayMax));
    }

    public void levelUntil(int toLevel) {
        short level = chr.getLevel();
        if (level >= toLevel) {
            return;
        }
        while (level < toLevel) {
            addLevel(1);
            level++;
        }
    }

    public void ballonMsg(String message) {
        chr.write(UserLocal.balloonMsg(message, 100, 3, null));
    }

    public void hireTutor(boolean set) {
        chr.hireTutor(set);
    }

    public void tutorAutomatedMsg(int id) {
        tutorAutomatedMsg(id, 10000);
    }

    public void tutorAutomatedMsg(int id, int duration) {
        chr.tutorAutomatedMsg(id, duration);
    }

    public void tutorCustomMsg(String message, int width, int duration) {
        chr.tutorCustomMsg(message, width, duration);
    }

    public boolean hasTutor() {
        return chr.hasTutor();
    }

    public int getMakingSkillLevel(int skillID) {
        return chr.getMakingSkillLevel(skillID);
    }

    public boolean isAbleToLevelUpMakingSkill(int skillID) {
        int neededProficiency = SkillConstants.getNeededProficiency(chr.getMakingSkillLevel(skillID));
        if (neededProficiency <= 0) {
            return false;
        }
        return chr.getMakingSkillProficiency(skillID) >= neededProficiency;
    }

    public void makingSkillLevelUp(int skillID) {
        chr.makingSkillLevelUp(skillID);
    }

    private ScriptMemory getMemory() {
        return memory;
    }

    public void changeFootHold(String footholdName, boolean show) {
        changeFootHold(footholdName, show, 0, 0);
    }

    public void changeFootHold(String footholdName, boolean show, int x, int y) {
        chr.getField().broadcast(FieldPacket.syncDynamicFootHold(footholdName, show, new Position(x, y)));
    }

    public boolean hasMobById(int mobID) {
        return chr.getField().getLifeByTemplateId(mobID) != null;
    }

    public void spawnMobRespawnable(int id, int x, int y, boolean respawnable, long hp, int respawnTime) {
        chr.getField().spawnMobRespawnable(id, x, y, respawnable, hp, respawnTime);
    }

    public void createFallingCatcherOnCharacter(String name) {
        ArrayList<Position> positions = new ArrayList<>();
        positions.add(chr.getPosition());
        chr.getField().broadcast(FieldPacket.createFallingCatcher(name, 1, 1, positions));
    }

    public void getItemsFromTrunkEmployee() {
        chr.getItemsFromEmployeeTrunk();
    }

    public void respawnLotusLaser() {
        Field field = chr.getField();
        Mob mob;
        if (field.getId() == 350060700) {
            mob = (Mob) field.getLifeByTemplateId(8950000);
        } else {
            mob = (Mob) field.getLifeByTemplateId(8950100);
        }
        if (mob != null) {
            MobSkillInfo msi = SkillData.getMobSkillInfoByIdAndLevel(MobSkillID.LaserAttack.getVal(), 1);
            MobSkill mobSkill = new MobSkill();
            mobSkill.setLevel(5); //at this level there are 4 lasers and 100% damr
            mobSkill.setSkillID(MobSkillID.LaserAttack.getVal());
            mobSkill.setFixDamR(msi.getSkillStatIntValue(fixDamR));
            mobSkill.applyEffect(mob);
        }
    }

    public void addStorageSlots(byte amount) {
        chr.getAccount().getTrunk().addSlots(amount);
    }

    public void addInventorySlotsByInvType(byte amount, byte type) {
        Inventory inventory = chr.getInventoryByType(InvType.getInvTypeByVal(type));
        inventory.addSlots(amount);
        chr.write(WvsContext.expandInventory(type, (byte) inventory.getSlots()));
    }

    public int getSlotsLeftToAddByInvType(byte type) {
        return chr.getInventoryByType(getInvTypeByVal(type)).getEmptySlots();
    }

    // only for items with quantity
    public void dropItem(int itemId, int itemQuantity, Mob deadMob) {
        Field field = chr.getField();
        Drop drop = new Drop(field.getNewObjectID());
        drop.setItem(ItemData.getItemDeepCopy(itemId));
        if (ItemConstants.isEquip(itemId)) {
            drop.getItem().setQuantity(itemQuantity);
        }
        field.drop(drop, deadMob.getPosition());
    }

    public void dropItem(int itemId, int startPosX, int startPosY, int endPosX, int endPosY) {
        Field field = chr.getField();
        Drop drop = new Drop(field.getNewObjectID());
        drop.setItem(ItemData.getItemDeepCopy(itemId));
        Position startPos = new Position(startPosX, startPosY);
        Position endPos = new Position(endPosX, endPosY);
        field.drop(drop, startPos, endPos, true);
    }

    public void dropMeso(int mesoAmount, int startPosX, int startPosY, int endPosX, int endPosY) {
        Field field = chr.getField();
        Drop drop = new Drop(field.getNewObjectID(), mesoAmount);
        Position startPos = new Position(startPosX, startPosY);
        Position endPos = new Position(endPosX, endPosY);
        field.drop(drop, startPos, endPos, true);
    }

    public void spawnBalrog(boolean easy) {
        int[] spawns = {
                easy ? BossConstants.BALROG_EASY_BODY : BossConstants.BALROG_HARD_BODY,
                easy ? BossConstants.BALROG_EASY_LARM : BossConstants.BALROG_HARD_LARM,
                easy ? BossConstants.BALROG_EASY_RARM : BossConstants.BALROG_HARD_RARM,
                easy ? BossConstants.BALROG_EASY_DMGSINK : BossConstants.BALROG_HARD_DMGSINK,
        };

        for (int spawn : spawns) {
            spawnMob(spawn, BossConstants.BALROG_SPAWN_X, BossConstants.BALROG_SPAWN_Y, false);
        }
    }

    public void resetBossMap(int fieldId) {
        Field map = chr.getOrCreateFieldByCurrentInstanceType(fieldId);

        if (map.getClock() != null) {
            map.getClock().removeClock();
        }
        for (Mob m : map.getMobs()) {
            map.removeMob(m.getObjectId());
        }
        for (Drop d : map.getDrops()) {
            map.removeLife(d);
        }
        for (Char c : map.getChars()) {
            c.setDeathCount(0);
            c.write(UserLocal.deathCountInfo(0));
            c.write(UserLocal.deathCountInfo(c.getId(), 0));
        }
    }

    /**
     * Don't save return map on warp
     *
     * @param id  fieldId
     * @param pid portalId
     */
    public void warpNoReturn(int id, int pid) {
        chr.warp(id, pid, false);
    }

    public boolean zakumAlreadySpawned(int map) {
        field = chr.getClient().getChannelInstance().getFieldIfExists(map);
        return field != null && field.getProperties().containsKey("zakum") && field.getProperties().get("zakum").equals("1");
    }

    /**
     * ObjectID variable gets passed to script in constructor but is not accessible in this class.
     * This function solves that.
     * Doesn't work with map scripts.
     *
     * @return the map object ID of the script owner instance.
     */
    public int getObjectID() {
        return objectID;
    }

    public void setObjectID(int objectID) {
        this.objectID = objectID;
    }

    public int getObjectPositionX() {
        return chr.getField().getLifeByObjectID(getObjectID()).getX();
    }

    public int getObjectPositionY() {
        return chr.getField().getLifeByObjectID(getObjectID()).getY();
    }

    public void setDisableDropsInMap(int fieldId, boolean onoff) {
        Field map = chr.getOrCreateFieldByCurrentInstanceType(fieldId);
        map.setDropsDisabled(onoff);
    }

    public void sendAutoEventClock() {
        InGameEvent ige = InGameEventManager.getInstance().getActiveEvent();

        if (ige == null) {
            return;
        }

        if (ige.isActive() && ige.charInEvent(chr.getId())) {
            ige.sendLobbyClock(chr);
        }
    }

    public boolean isRouletteActive() {
        return InGameEventManager.getInstance().getActiveEvent() instanceof RussianRouletteEvent;
    }

    public boolean isPinkZakumActive() {
        return InGameEventManager.getInstance().getActiveEvent() instanceof PinkZakumEvent;
    }

    public boolean isOlaOlaActive() {
        return InGameEventManager.getInstance().getActiveEvent() instanceof OlaOlaEvent;
    }

    public boolean isPhysicalFitnessActive() {
        return InGameEventManager.getInstance().getActiveEvent() instanceof PhysicalFitnessEvent;
    }

    public boolean isPinkZakumOpen() {
        return isPinkZakumActive() && InGameEventManager.getInstance().getOpenEvent() instanceof PinkZakumEvent;
    }

    public boolean isOlaOlaOpen() {
        return isOlaOlaActive() && InGameEventManager.getInstance().getOpenEvent() instanceof OlaOlaEvent;
    }

    public boolean isPhysicalFitnessOpen() {
        return isPhysicalFitnessActive() && InGameEventManager.getInstance().getOpenEvent() instanceof PhysicalFitnessEvent;
    }

    public int getPreviousFieldID() {
        return chr.getPreviousFieldID();
    }

    public boolean isPinkZakumWinner() {
        PinkZakumEvent pze = ((PinkZakumEvent) InGameEventManager.getInstance().getEvent(InGameEventType.PinkZakumBattle));
        return pze.isWinner(chr) && !pze.getWinnerRewarded(chr);
    }

    public void returnPinkZakum() {
        InGameEvent e = InGameEventManager.getInstance().getActiveEvent();

        int warpMap = e instanceof PinkZakumEvent
                ? PinkZakumEvent.BATTLE_MAP
                : chr.getPreviousFieldID();

        chr.warp(warpMap, 0, false);
    }

    public int getPreviousPortalID() {
        return chr.getPreviousPortalID();
    }

    public boolean canWarpSilentCrusade(int targetFieldId) {
        return chr.getClient().getChannelInstance().tryEnterSilentCrusadePortal(chr, targetFieldId, chr.getClient().getChannelInstance().getChannelId());
    }

    public boolean canWarpAreaBoss(int targetFieldId) {
        return chr.getClient().getChannelInstance().canWarpAreaBoss(chr, targetFieldId, chr.getClient().getChannelInstance().getChannelId());
    }

    public void trySpawnAreaBoss() {
        chr.getClient().getChannelInstance().trySpawnAreaBoss(chr, getFieldID(), chr.getClient().getChannelInstance().getChannelId());
    }

    public void overrideAreaBossTimer(int targetFieldId) {
        chr.getClient().getChannelInstance().overrideAreaBossTimer(targetFieldId, chr.getClient().getChannelInstance().getChannelId());
    }

    public void openNodeWithCustomValue(int itemID, int quantity) {
        if (!hasQuestCompleted(1465)) {
            chr.write(WvsContext.broadcastMsg(BroadcastMsg.popUpMessage("B¢n c®n hoàn thi½n chu×i nhi½m vî chuyºn ngh¹ l®n 5 «º s÷ dîng.")));
            chr.dispose();
            return;
        }
        if (!hasItem(itemID, quantity)) {
            return;
        }
        int currentQuantity = chr.getInactiveMatrixCore().size();
        if (currentQuantity + quantity > MatrixConstants.SLOT_MAX) {
            chr.write(WvsContext.broadcastMsg(BroadcastMsg.popUpMessage("Túi chña Node cça b¢n «» «¢t sÑ lïæng tÑi «a.")));
            chr.dispose();
            return;
        }
        List<MatrixCore> cores = new ArrayList<>();
        quantity = MatrixConstants.SLOT_MAX - currentQuantity;
        for (int i = 0; i < quantity; i++) {
            int coreID = 0, skillID1 = 0, skillID2 = 0, skillID3 = 0;
            List<VCoreData> coreData = new LinkedList<>();
            byte type = 0;
            if (Randomizer.isSuccess(GameConstants.SKILL_CORE_CHANCE)) {
                coreData.addAll(VCore.getJobNodes());
                type = 1;
            } else if (Randomizer.isSuccess(GameConstants.BOOST_CORE_CHANCE)) {
                coreData.addAll(VCore.getBoostNodes());
                type = 2;
            } else {
                coreData.addAll(VCore.getSpecialNodes());
                type = 3;
            }
            VCoreData vCoreData = null;
            if (Randomizer.isSuccess(GameConstants.JOB_CORE_CHANCE) && type != 3) {
                List<VCoreData> jobVCoreData = new ArrayList<>();
                for (VCoreData v : coreData) {
                    if (Short.parseShort(v.getJobs().get(0)) == chr.getJob()) {
                        jobVCoreData.add(v);
                    }
                }
                vCoreData = jobVCoreData.get(Randomizer.nextInt(jobVCoreData.size()));
            } else {
                vCoreData = coreData.get(Randomizer.nextInt(coreData.size()));
            }
            coreID = vCoreData.getCoreID();
            if (type != 3) {
                skillID1 = vCoreData.getConnectSkills().get(0);
            }
            switch (vCoreData.getType()) {
                case VCore.BOOST:
                    short jobID = Short.parseShort(vCoreData.getJobs().get(0));
                    List<Integer> boostSkills = VCore.getBoostSkillByJobID(jobID);
                    boostSkills.remove((Integer) skillID1);
                    skillID2 = boostSkills.get(Randomizer.nextInt(boostSkills.size()));
                    boostSkills.remove((Integer) skillID2);
                    skillID3 = boostSkills.get(Randomizer.nextInt(boostSkills.size()));
                    boostSkills.remove((Integer) skillID3);
                    break;
                case VCore.SKILL:
                    break;
                case VCore.SPECIAL:
                    skillID1 = 0;
                    break;
            }
            MatrixCore core = new MatrixCore(chr.getId(), coreID, skillID1, skillID2, skillID3);
            cores.add(core);
            chr.write(WvsContext.nodeStoneResult(core));
        }
        MatrixCore.saveToSQL(cores);
        for (MatrixCore add : cores) {
            chr.getMatrixCore().add(add);
        }
        chr.write(WvsContext.updateVMatrix(chr, false, 0, 0));
        chr.consumeItem(itemID, quantity);
    }

    public boolean openNodeStonesInBulk(int kind, int itemID, int quantity) {
        if (quantity <= 0) return false;

        int cur = chr.getInactiveMatrixCore().size();
        int free = MatrixConstants.SLOT_MAX - cur;
        if (free <= 0) return false;

        int openCount = Math.min(quantity, free);

        List<MatrixCore> cores = new ArrayList<>(openCount);

        for (int n = 0; n < openCount; n++) {
            int coreID = 0, skillID1 = 0, skillID2 = 0, skillID3 = 0;

            // chọn pool
            List<VCoreData> coreData;
            byte type;
            if (Randomizer.isSuccess(GameConstants.SKILL_CORE_CHANCE)) {
                coreData = VCore.getJobNodes();
                type = 1;
            } else if (Randomizer.isSuccess(GameConstants.BOOST_CORE_CHANCE)) {
                coreData = VCore.getBoostNodes();
                type = 2;
            } else {
                coreData = VCore.getSpecialNodes();
                type = 3;
            }
            if (coreData == null || coreData.isEmpty()) continue;

            // chọn vCoreData (ưu tiên job nếu trúng JOB_CORE_CHANCE và không phải special)
            VCoreData vCoreData;
            if (type != 3 && Randomizer.isSuccess(GameConstants.JOB_CORE_CHANCE)) {
                short chrJob = chr.getJob();
                int pick = -1;
                int seen = 0;

                // reservoir sampling: không tạo jobVCoreData list
                for (int i = 0; i < coreData.size(); i++) {
                    VCoreData v = coreData.get(i);
                    if (v.getJobs() == null || v.getJobs().isEmpty()) continue;
                    short job;
                    try {
                        job = Short.parseShort(v.getJobs().get(0));
                    } catch (Exception e) {
                        continue;
                    }
                    if (job != chrJob) continue;

                    seen++;
                    if (Randomizer.nextInt(seen) == 0) pick = i;
                }

                vCoreData = (pick >= 0) ? coreData.get(pick)
                        : coreData.get(Randomizer.nextInt(coreData.size()));
            } else {
                vCoreData = coreData.get(Randomizer.nextInt(coreData.size()));
            }

            coreID = vCoreData.getCoreID();
            if (type != 3 && vCoreData.getConnectSkills() != null && !vCoreData.getConnectSkills().isEmpty()) {
                skillID1 = vCoreData.getConnectSkills().get(0);
            }

            switch (vCoreData.getType()) {
                case VCore.BOOST -> {
                    short jobID = Short.parseShort(vCoreData.getJobs().get(0));
                    List<Integer> boostSkills = VCore.getBoostSkillByJobID(jobID);
                    if (boostSkills == null || boostSkills.size() < 3) break;

                    int nSize = boostSkills.size();
                    int a, b, c;

                    do { a = boostSkills.get(Randomizer.nextInt(nSize)); } while (a == skillID1);
                    do { b = boostSkills.get(Randomizer.nextInt(nSize)); } while (b == skillID1 || b == a);
                    do { c = boostSkills.get(Randomizer.nextInt(nSize)); } while (c == skillID1 || c == a || c == b);

                    skillID2 = b;
                    skillID3 = c;
                }
                case VCore.SPECIAL -> skillID1 = 0;
                case VCore.SKILL -> { /* keep */ }
            }

            MatrixCore core = new MatrixCore(chr.getId(), coreID, skillID1, skillID2, skillID3);
            cores.add(core);
        }
        if (cores.isEmpty()) {
            return false;
        }
        MatrixCore.saveToSQL(cores);
        for (MatrixCore add : cores) {
            chr.getMatrixCore().add(add);
        }
        chr.write(WvsContext.updateVMatrix(chr, false, 0, 0));
        chr.write(WvsContext.nodeStoneResultInBulk(kind, cores));
        chr.consumeItem(itemID, cores.size());
        return true;
    }

    public boolean openNodeStone(int itemID) {
        int currentQuantity = chr.getInactiveMatrixCore().size();
        if (currentQuantity <= MatrixConstants.SLOT_MAX) {
            int coreID = 0, skillID1 = 0, skillID2 = 0, skillID3 = 0;
            List<VCoreData> coreData = new LinkedList<>();
            byte type = 0;
            if (Randomizer.isSuccess(GameConstants.SKILL_CORE_CHANCE)) {
                coreData.addAll(VCore.getJobNodes());
                type = 1;
            } else if (Randomizer.isSuccess(GameConstants.BOOST_CORE_CHANCE)) {
                coreData.addAll(VCore.getBoostNodes());
                type = 2;
            } else {
                coreData.addAll(VCore.getSpecialNodes());
                type = 3;
            }
            VCoreData vCoreData = null;
            if (Randomizer.isSuccess(GameConstants.JOB_CORE_CHANCE) && type != 3) {
                List<VCoreData> jobVCoreData = new ArrayList<>();
                for (VCoreData v : coreData) {
                    if (Short.parseShort(v.getJobs().get(0)) == chr.getJob()) {
                        jobVCoreData.add(v);
                    }
                }
                vCoreData = jobVCoreData.get(Randomizer.nextInt(jobVCoreData.size()));
            } else {
                vCoreData = coreData.get(Randomizer.nextInt(coreData.size()));
            }
            coreID = vCoreData.getCoreID();
            if (type != 3) {
                skillID1 = vCoreData.getConnectSkills().get(0);
            }
            switch (vCoreData.getType()) {
                case VCore.BOOST:
                    short jobID = Short.parseShort(vCoreData.getJobs().get(0));
                    List<Integer> boostSkills = VCore.getBoostSkillByJobID(jobID);
                    boostSkills.remove((Integer) skillID1);
                    skillID2 = boostSkills.get(Randomizer.nextInt(boostSkills.size()));
                    boostSkills.remove((Integer) skillID2);
                    skillID3 = boostSkills.get(Randomizer.nextInt(boostSkills.size()));
                    boostSkills.remove((Integer) skillID3);
                    break;
                case VCore.SKILL:
                    break;
                case VCore.SPECIAL:
                    skillID1 = 0;
                    break;
            }
            MatrixCore core = new MatrixCore(chr.getId(), coreID, skillID1, skillID2, skillID3);
            chr.addMatrixCore(core);
            core.saveToSQL();
            chr.write(WvsContext.updateVMatrix(chr, false, 0, 0));
            chr.write(WvsContext.nodeStoneResult(core));
            chr.consumeItem(itemID, 1);
            return true;
        }
        return false;
    }

    public boolean openSkillNodeStone(int itemID) {
        int currentQuantity = chr.getInactiveMatrixCore().size();
        if (currentQuantity <= MatrixConstants.SLOT_MAX) {
            int coreID = 0, skillID1 = 0, skillID2 = 0, skillID3 = 0;
            List<VCoreData> coreData = new LinkedList<>(VCore.getJobNodes());
            List<VCoreData> jobVCoreData = new ArrayList<>();
            for (VCoreData v : coreData) {
                if (Short.parseShort(v.getJobs().get(0)) == chr.getJob()) {
                    jobVCoreData.add(v);
                }
            }
            VCoreData vCoreData = jobVCoreData.get(Randomizer.nextInt(jobVCoreData.size()));
            if (vCoreData != null) {
                coreID = vCoreData.getCoreID();
                skillID1 = vCoreData.getConnectSkills().get(0);
                MatrixCore core = new MatrixCore(chr.getId(), coreID, skillID1, skillID2, skillID3);
                chr.addMatrixCore(core);
                core.saveToSQL();
                chr.write(WvsContext.updateVMatrix(chr, false, 0, 0));
                chr.write(WvsContext.nodeStoneResult(core));
                chr.consumeItem(itemID, 1);
                return true;
            }
        }
        return false;
    }

    public boolean openNodeStonesByRandomCoreIDsInBulk(int type, int itemID, int quantity, int[] coreIDs) {
        if (quantity <= 0) return false;
        if (coreIDs == null || coreIDs.length == 0) return false;
        int cur = chr.getInactiveMatrixCore().size();
        int free = MatrixConstants.SLOT_MAX - cur;
        if (free <= 0) return false;
        int openCount = Math.min(quantity, free);
        List<MatrixCore> cores = new ArrayList<>(openCount);
        for (int i = 0; i < openCount; i++) {
            int coreID = coreIDs[Util.getRandom(0, coreIDs.length - 1)];
            VCoreData vCoreData = VCore.getCore(coreID);
            if (vCoreData == null) {
                int guard = 0;
                while (vCoreData == null && guard++ < coreIDs.length * 2) {
                    coreID = coreIDs[Util.getRandom(0, coreIDs.length - 1)];
                    vCoreData = VCore.getCore(coreID);
                }
                if (vCoreData == null) break;
            }
            int skillID1 = 0;
            if (vCoreData.getConnectSkills() != null && !vCoreData.getConnectSkills().isEmpty()) {
                skillID1 = vCoreData.getConnectSkills().get(0);
            }
            MatrixCore core = new MatrixCore(chr.getId(), coreID, skillID1, 0, 0);
            cores.add(core);
        }
        if (cores.isEmpty()) {
            return false;
        }
        MatrixCore.saveToSQL(cores);
        for (MatrixCore add : cores) {
            chr.getMatrixCore().add(add);
        }
        chr.write(WvsContext.updateVMatrix(chr, false, 0, 0));
        chr.write(WvsContext.nodeStoneResultInBulk(type, cores));
        chr.consumeItem(itemID, cores.size());
        return true;
    }

    public boolean openNodeStonesByCoreIDInBulk(int type, int itemID, int quantity, int coreID) {
        if (quantity <= 0) return false;
        int cur = chr.getInactiveMatrixCore().size();
        int free = MatrixConstants.SLOT_MAX - cur;
        if (free <= 0) return false;
        int openCount = Math.min(quantity, free);
        VCoreData vCoreData = VCore.getCore(coreID);
        if (vCoreData == null) return false;
        int skillID1 = 0;
        if (vCoreData.getConnectSkills() != null && !vCoreData.getConnectSkills().isEmpty()) {
            skillID1 = vCoreData.getConnectSkills().get(0);
        }
        List<MatrixCore> cores = new ArrayList<>(openCount);
        for (int i = 0; i < openCount; i++) {
            MatrixCore core = new MatrixCore(chr.getId(), coreID, skillID1, 0, 0);
            cores.add(core);
        }
        MatrixCore.saveToSQL(cores);
        for (MatrixCore add : cores) {
            chr.getMatrixCore().add(add);
        }
        chr.write(WvsContext.updateVMatrix(chr, false, 0, 0));
        chr.write(WvsContext.nodeStoneResultInBulk(type, cores));
        chr.consumeItem(itemID, openCount);
        return true;
    }

    public boolean openNodeStoneByCoreID(int itemID, int coreID) {
        int skillID1 = 0;
        int currentQuantity = chr.getInactiveMatrixCore().size();
        if (currentQuantity <= MatrixConstants.SLOT_MAX) {
            VCoreData vCoreData = VCore.getCore(coreID);
            if (vCoreData != null) {
                skillID1 = vCoreData.getConnectSkills().get(0);
                MatrixCore core = new MatrixCore(chr.getId(), coreID, skillID1, 0, 0);
                chr.addMatrixCore(core);
                core.saveToSQL();
                chr.write(WvsContext.updateVMatrix(chr, false, 0, 0));
                chr.write(WvsContext.nodeStoneResult(core));
                chr.consumeItem(itemID, 1);
                return true;
            }
        }
        return false;
    }

    public void setSpineObjectEffectAlpha(boolean back, String key, int alpha, int delay) {
        chr.write(MapLoadable.setSpineObjectEffectAlpha(back, key, alpha, delay));
    }

    public void setObjectEffectAlpha(String key, int alpha, int delay) {
        setSpineObjectEffectAlpha(false, key, alpha, delay);
        setSpineObjectEffectAlpha(true, key, alpha, delay);
    }

    public void setSpineObjectEffectPlay(boolean back, String key, String name, boolean loop, boolean randomStart) {
        chr.write(MapLoadable.setSpineObjectEffectPlay(back, key, name, loop, randomStart));
    }

    public void setObjectEffectPlay(String key, String name, boolean loop, boolean randomStart) {
        setSpineObjectEffectPlay(false, key, name, loop, randomStart);
        setSpineObjectEffectPlay(true, key, name, loop, randomStart);
    }

    public void setSpineObjectEffectAddPlay(boolean back, String key, String name, boolean loop) {
        chr.write(MapLoadable.setSpineObjectEffectAddPlay(back, key, name, loop));
    }

    public void setObjectEffectAddPlay(String key, String name, boolean loop) {
        setSpineObjectEffectAddPlay(false, key, name, loop);
        setSpineObjectEffectAddPlay(true, key, name, loop);
    }

    public void setSpineObjectEffectClearTracks(boolean back, String key, boolean setupPose) {
        chr.write(MapLoadable.setSpineObjectEffectClearTracks(back, key, setupPose));
    }

    public void setObjectEffectClearTracks(String key, boolean setupPose) {
        setSpineObjectEffectClearTracks(false, key, setupPose);
        setSpineObjectEffectClearTracks(true, key, setupPose);
    }

    public void setSpineObjectEffectPlayrate(boolean back, String key, int scale) {
        chr.write(MapLoadable.setSpineObjectEffectPlayrate(back, key, scale));
    }

    public void setObjectEffectPlayrate(String key, int scale) {
        setSpineObjectEffectPlayrate(false, key, scale);
        setSpineObjectEffectPlayrate(true, key, scale);
    }

    public void setSpineObjectEffectStop(boolean back, String key, boolean setupPose) {
        chr.write(MapLoadable.setSpineObjectEffectStop(back, key, setupPose));
    }

    public void setObjectEffectStop(String key, boolean setupPose) {
        setSpineObjectEffectStop(false, key, setupPose);
        setSpineObjectEffectStop(true, key, setupPose);
    }

    public void cameraSwitchNormal(String targetName, int time) {
        chr.write(UserLocal.cameraSwitchNormal(targetName, time));
    }

    public void cameraSwitchByPosition(int x, int y, int time) {
        chr.write(UserLocal.cameraSwitchByPosition(new Position(x, y), time));
    }

    public void cameraSwitchBack() {
        chr.write(UserLocal.cameraSwitchBack());
    }

    public void cameraSwitchPosByCID(int cid, boolean setCamera, int resetTime, String name) {
        chr.write(UserLocal.cameraSwitchPosByCID(cid, setCamera, resetTime, name));
    }

    public void changeBGM(String sound, int startTime, int unk) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.changeBGM(sound, startTime, unk)));
    }

    public void setPartner(boolean add, int npcID, int skillID, boolean hasScript) {
        chr.write(UserLocal.setPartner(add, npcID, skillID, hasScript));
    }

    public void sendUnityPortalDialog() {
        startScript(chr, 9010022, "unityPortal", ScriptType.Npc);
    }

    public void setBGMVolume(int bgmVolume, int fadingDuration) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.setBGMVolume(bgmVolume, fadingDuration)));
    }

    public void setBGMVolumeOnly(boolean volumeOnly) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.bgmVolumeOnly(volumeOnly)));
    }

    public void spineScreen(boolean binary, boolean loop, boolean postRender, int endDelay, String path, String animationName, String keyName) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.spineScreen(binary, loop, postRender, endDelay, path, animationName, keyName)));
    }

    public void offSpineScreen(String keyName, int type, String aniName, int alphaTime) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.offSpineScreen(keyName, type, aniName, alphaTime)));
    }

    public void objectStateByString(String name) {
        chr.write(FieldPacket.fieldEffect(FieldEffect.objectStateByString(name)));
    }

    public void setMapTaggedObjectAnimation(String tagName, int type) {
        chr.write(MapLoadable.setMapTaggedObjectAnimation(tagName, type));
    }

    public void setMapTaggedObjectVisible(String tagName, boolean visible, int manual, int delay) {
        chr.write(MapLoadable.setMapTaggedObjectVisible(tagName, visible, manual, delay));
    }

    public void setBackEffect(byte effect, int fieldID, int pageID, int duration) {
        chr.write(MapLoadable.setBackEffect(effect, fieldID, pageID, duration));
    }

    public void openEventNameTag() {
        if (hasItem(2431754, 10)) {
            EventNameTag eventNameTag = chr.getEventNameTag();
            EventNameTagType eventNameTagType;
            while (true) {
                int nCategory = Randomizer.rand(0, 4);
                int nIdx = Randomizer.rand(0, 9);
                eventNameTagType = EventNameTagType.getNameTagTypeByVal(nCategory);
                String sEventNameTag = "";
                if (eventNameTag != null) {
                    sEventNameTag = EventNameTagHandler.getStringNameTagByType(eventNameTag, eventNameTagType);
                    if (!sEventNameTag.equals("")) {
                        StringBuilder sbEventNameTag = new StringBuilder(sEventNameTag);

                        if (!eventNameTag.getsRed().contains("0") && !eventNameTag.getsBlue().contains("0") && !eventNameTag.getsYellow().contains("0") && !eventNameTag.getsGreen().contains("0") && !eventNameTag.getsPurple().contains("0")) {
                            chr.write(WvsContext.broadcastMsg(BroadcastMsg.popUpMessage("Your Name Tag is full.")));
                            break;
                        } else {
                            if (sEventNameTag.charAt(nIdx) != '1') {
                                sbEventNameTag.setCharAt(nIdx, '1');
                                eventNameTag = EventNameTagHandler.setStringNameTagByType(eventNameTag, eventNameTagType, sbEventNameTag.toString());
                                chr.setEventNameTags(eventNameTag);
                                chr.write(WvsContext.acquireEventNameTag(nCategory, nIdx));
                                chr.write(WvsContext.updateEventNameTag(chr, eventNameTag.getActiveNameTags()));
                                consumeItem(2431754, 10);
                                break;
                            }
                        }
                    }
                }
            }
        } else {
            sendSayOkay("You need 10 Crown Fragment to make a Tag.");
        }
    }

    public int getZeroWeaponType() {
        return chr.getZeroWeaponType();
    }

    public boolean getSuccessProp(int chance) {
        return Util.succeedProp(chance);
    }

    // Party Boss methods ---------------------------------------------------------------------------------------------------

    public boolean checkPartyBossAttempt(BossPartyType bpt, Party party) {
        if (ServerConfig.DEBUG_MODE) {
            return true;
        }
        if (party != null) {
            if (party.getOnlineChars().size() != party.getMembers().size()) {
                return false;
            }
            for (Char chr : party.getOnlineChars()) {
                return !chr.hasBossPartyAttempt(bpt);
            }
            return true;
        }
        return false;
    }

    public void addPartyBoss(Party party, BossPartyType bpt) {
        if (party != null) {
            for (Char chr : party.getOnlineChars()) {
                try {
                    chr.addPartyboss(bpt);
                } catch (Exception e) {
                    DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, e);
                }
            }
        }
    }

    public boolean isPartyEligible(Char chr, short lowLevel, short highLevel, Party party, BossPartyType bpt) {
        if (party.getPartyMembersInSameFieldWithChr(chr).size() != party.getOnlineChars().size()) {
            return false;
        }
        for (Char pmChr : party.getPartyMembersInSameFieldWithChr(chr)) {
            if (pmChr.getLevel() < lowLevel || pmChr.getLevel() > highLevel) {
                return false;
            }
            if (bpt.getPreQuest() != 0 && !pmChr.getScriptManager().hasQuestCompleted(bpt.getPreQuest())) {
                return false;
            }
        }
        return true;
    }

    public GolluxDifficultyType getGolluxDifficulty() {
        Map<String, Object> golluxMaps = chr.getOrCreateFieldByCurrentInstanceType(BossConstants.GOLLUX_FIRST_MAP).getProperties();
        byte difficulty = 3;
        ArrayList<Integer> golluxMainParts = new ArrayList<>();
        golluxMainParts.add(BossConstants.GOLLUX_ABDOMEN);
        golluxMainParts.add(BossConstants.GOLLUX_RIGHT_SHOULDER);
        golluxMainParts.add(BossConstants.GOLLUX_LEFT_SHOULDER);
        for (Map.Entry<String, Object> entry : golluxMaps.entrySet()) {
            if (golluxMainParts.contains(Integer.valueOf(entry.getKey())) && Integer.parseInt(entry.getValue().toString()) == 2) {
                difficulty--;
            }
        }
        return GolluxDifficultyType.getByVal(difficulty);
    }

    public void translateZeroWeaponStats(Equip oldWeapon, Equip lazuliWeapon, Equip lapisWeapon, boolean isStatTrans) {
        Equip baseWeapon = ItemData.getEquipById(oldWeapon.getItemId());
        Map<EquipBaseStat, Integer> equipBaseStats = new HashMap<>() {{
            put(tuc, (int) lazuliWeapon.getTuc() - oldWeapon.getCuc()); // Slot Available = lazuliWeapon.getTuc() - oldWeapon.getTuc() _ when newWeapon.getTuc() > oldWeapon.getTuc()
            put(cuc, (int) oldWeapon.getCuc()); // Slot Applied
            put(iuc, (int) oldWeapon.getIuc()); //Total Hammer Applied
            put(iStr, (int) oldWeapon.getiStr() - baseWeapon.getiStr());
            put(iDex, (int) oldWeapon.getiDex() - baseWeapon.getiDex());
            put(iInt, (int) oldWeapon.getiInt() - baseWeapon.getiInt());
            put(iLuk, (int) oldWeapon.getiLuk() - baseWeapon.getiLuk());
            put(iMaxHP, (int) oldWeapon.getiMaxHp() - baseWeapon.getiMaxHp());
            put(iPAD, (int) oldWeapon.getiPad() - baseWeapon.getiPad());
            put(iMAD, (int) oldWeapon.getiMad() - baseWeapon.getiMad());
            put(iPDD, (int) oldWeapon.getiPDD() - baseWeapon.getiPDD());
            put(iMDD, (int) oldWeapon.getiMDD() - baseWeapon.getiMDD());
            put(iSpeed, (int) oldWeapon.getiSpeed() - baseWeapon.getiSpeed());
            put(iJump, (int) oldWeapon.getiJump() - baseWeapon.getiJump());
        }};
        short soulOptionID = oldWeapon.getSoulOptionId();
        short soulSocketID = oldWeapon.getSoulSocketId();
        short soulOption = oldWeapon.getSoulOption();
        int soulItemID = oldWeapon.getSoulItemId();
        int setItemID = oldWeapon.getSetItemID();
        short totalStar = oldWeapon.getChuc();
        EquipFlame equipFlame = oldWeapon.getFlameStat();
        java.util.List<Integer> potentials = oldWeapon.getOptions();

        if (isStatTrans) {
            for (Map.Entry<EquipBaseStat, Integer> equipBaseStatInfo : equipBaseStats.entrySet()) {
                if (equipBaseStatInfo.getKey() == tuc) {
                    lazuliWeapon.setTuc(equipBaseStatInfo.getValue().shortValue());
                    lapisWeapon.setTuc(equipBaseStatInfo.getValue().shortValue());
                } else if (equipBaseStatInfo.getKey() == cuc) {
                    lazuliWeapon.setCuc(equipBaseStatInfo.getValue().shortValue());
                    lapisWeapon.setCuc(equipBaseStatInfo.getValue().shortValue());
                } else {
                    lazuliWeapon.addStat(equipBaseStatInfo.getKey(), equipBaseStatInfo.getValue());
                    lapisWeapon.addStat(equipBaseStatInfo.getKey(), equipBaseStatInfo.getValue());
                }
            }
            lazuliWeapon.setSoulOptionId(soulOptionID);
            lazuliWeapon.setSoulSocketId(soulSocketID);
            lazuliWeapon.setSoulOption(soulOption);
            lazuliWeapon.setSoulItemId(soulItemID);
            lazuliWeapon.setSetItemID(setItemID);
            lazuliWeapon.setChuc(totalStar, true);
            lazuliWeapon.setFlameStat(equipFlame);

            lapisWeapon.setSoulOptionId(soulOptionID);
            lapisWeapon.setSoulSocketId(soulSocketID);
            lapisWeapon.setSoulOption(soulOption);
            lapisWeapon.setSoulItemId(soulItemID);
            lapisWeapon.setSetItemID(setItemID);
            lapisWeapon.setChuc(totalStar, true);
            lapisWeapon.setFlameStat(equipFlame);
        }
        lazuliWeapon.setOptions(potentials);
        lapisWeapon.setOptions(potentials);
        lazuliWeapon.setInventoryID(chr.getEquippedInventory().getId());
        lazuliWeapon.setInvType(EQUIPPED);
        lapisWeapon.setInventoryID(chr.getEquippedInventory().getId());
        lapisWeapon.setInvType(EQUIPPED);
        chr.equip(lazuliWeapon, -11);
        chr.equip(lapisWeapon, -10);
        lazuliWeapon.updateToChar(chr);
        lapisWeapon.updateToChar(chr);
    }

    public void upgradeZeroWeapon(int lazuliWeaponID, int lapisWeaponID, boolean isStatTrans) {
        //Lazuli always -11
        //Lapis always -10
        Item lazuliWeapon = ItemData.getItemDeepCopy(lazuliWeaponID);
        Item lapisWeapon = ItemData.getItemDeepCopy(lapisWeaponID);
        if (lazuliWeapon == null || lapisWeapon == null) {
            System.out.println("Unable to give and equip null item id ");
            return;
        }
        Inventory equippedInv = chr.getEquippedInventory();
        Item currentLazuli = equippedInv.getItemBySlot((short) -11);
        Item currentLapis = equippedInv.getItemBySlot((short) -10);
        if (currentLazuli != null && currentLapis != null) {
            chr.getAvatarData().getZeroAvatarLook().getHairEquips().removeIf(ItemConstants::isBigSword);
            chr.getAvatarData().getZeroAvatarLook().getHairEquips().add(lapisWeaponID);
            chr.getAvatarData().getZeroAvatarLook().setWeaponId(lapisWeaponID);
            chr.consumeItem(currentLazuli);
            chr.consumeItem(currentLapis);
        }
        translateZeroWeaponStats((Equip) currentLazuli, (Equip) lazuliWeapon, (Equip) lapisWeapon, isStatTrans);
        chr.dispose();
    }

    public void getUpgradeZeroWeaponInfo(int selectOption) {
        Equip lazuliWeapon = null;
        Equip lapisWeapon = null;
        if (ItemConstants.isLongSword(chr.getEquippedInventory().getItemBySlot(-10).getItemId())) {
            lazuliWeapon = (Equip) chr.getEquippedInventory().getItemBySlot(-10);
            lapisWeapon = (Equip) chr.getEquippedInventory().getItemBySlot(-11);
        } else if (!ItemConstants.isLongSword(chr.getEquippedInventory().getItemBySlot(-10).getItemId())) {
            lazuliWeapon = (Equip) chr.getEquippedInventory().getItemBySlot(-11);
            lapisWeapon = (Equip) chr.getEquippedInventory().getItemBySlot(-10);
        }
        if (lazuliWeapon == null || lapisWeapon == null) {
            chr.write(WvsContext.broadcastMsg(BroadcastMsg.popUpMessage("Could not find Lapis or Lazuli Weapon.")));
            chr.chatMessage(SystemNotice, "Could not find Lapis or Lazuli Weapon.");
            chr.dispose();
            return;
        }
        int currentLevel = -1;
        if (lazuliWeapon.getItemId() - 1572000 != lapisWeapon.getItemId() - 1562000) {
            //For Sure
            chr.write(WvsContext.broadcastMsg(BroadcastMsg.popUpMessage("Your Lapis and Lazuli Weapon not same level.")));
            chr.chatMessage(SystemNotice, "Your Lapis and Lazuli Weapon not same level.");
            chr.dispose();
            return;
        } else if (lazuliWeapon.getItemId() - 1572000 == lapisWeapon.getItemId() - 1562000) {
            currentLevel = lazuliWeapon.getItemId() - 1572000;
            if (currentLevel < 0) {
                chr.write(WvsContext.broadcastMsg(BroadcastMsg.popUpMessage("Could not get Level Lapis or Lazuli Weapon.")));
                chr.chatMessage(SystemNotice, "Could not get Level Lapis or Lazuli Weapon.");
                chr.dispose();
                return;
            }
            //Just For sure.
            else if (currentLevel >= 7 && selectOption == 0) {
                chr.write(WvsContext.broadcastMsg(BroadcastMsg.popUpMessage("Your Lapis and Lazuli Weapon cant upgrade with this option.")));
                chr.chatMessage(SystemNotice, "Your Lapis and Lazuli Weapon cant upgrade with this option.");
                chr.dispose();
            } else if (currentLevel == 9) {
                chr.write(WvsContext.broadcastMsg(BroadcastMsg.popUpMessage("Your Lapis and Lazuli Weapon reach Max Level.")));
                chr.chatMessage(SystemNotice, "Your Lapis and Lazuli Weapon reach Max Level.");
                chr.dispose();
                return;
            }
        }
        boolean isOpenUI = hasQuestCompleted(QuestConstants.ZERO_WEAPON_WINDOW_QUEST);
        int reqLevel = currentLevel * 10 + 110;
        boolean isEnableButton;
        if ((currentLevel >= 0 && currentLevel < 7) && selectOption == 0) {
            isEnableButton = chr.getLevel() >= reqLevel;
            chr.write(WvsContext.inheritanceInfo(isOpenUI, isEnableButton, currentLevel, currentLevel + 1, reqLevel, lazuliWeapon.getItemId() + 1, lapisWeapon.getItemId() + 1, 0, 0));
        } else if (currentLevel == 7 && selectOption == 1) {
            isEnableButton = chr.getLevel() >= reqLevel && hasItem(4310216, 1);
            chr.write(WvsContext.inheritanceInfo(isOpenUI, isEnableButton, currentLevel, 8, reqLevel, 1572008, 1562008, 4310216, 1));
        } else if (currentLevel == 8 && selectOption == 2) {
            isEnableButton = chr.getLevel() >= reqLevel && hasItem(4310217, 1);
            chr.write(WvsContext.inheritanceInfo(isOpenUI, isEnableButton, currentLevel, 9, reqLevel, 1572009, 1562009, 4310217, 1));
        }
        chr.dispose();
    }

    public void onDamienZoneHandle(Char chr, Mob mob) {
        if (mob == null) {
            if (chr.getMobZoneDebuff() != null) {
                chr.setMobZoneDebuff(null);
            }
            return;
        }
        MobZoneDebuff mobZoneDebuff = chr.getMobZoneDebuff();
        if (mobZoneDebuff == null) {
            chr.setMobZoneDebuff(new MobZoneDebuff(chr));
            return;
        }
        MobZoneInfo mobZoneInfo = mob.getMobZone();
        if (mobZoneInfo == null) {
            return;
        }
        Rect rect = mob.getMobZone().getMobZoneRect().get(mob.getCurZoneDataType());
        if (rect == null) {
            return;
        }
        for (Mob zone : chr.getField().getMobs()) {
            if (zone.getTemplateId() == 8880102) {
                if (zone.getRectAround(rect).hasPositionInside(chr.getPosition())) {
                    int hp = (int) (chr.getMaxHP() * (mobZoneInfo.getIn().getAutoDec() / 10000.0D));
                    chr.damage(hp);
                    if (mobZoneDebuff.getDamage() != mobZoneInfo.getIn().getDamage()) {
                        mobZoneDebuff.setDamage(mobZoneInfo.getIn().getDamage());
                    }
                    if (mobZoneDebuff.getHealRate() != mobZoneInfo.getIn().getHealRate()) {
                        mobZoneDebuff.setHealRate(mobZoneInfo.getIn().getHealRate());
                    }
                } else {
                    if (mobZoneDebuff.getDamage() != mobZoneInfo.getOut().getDamage()) {
                        mobZoneDebuff.setDamage(mobZoneInfo.getOut().getDamage());
                    }
                    if (mobZoneDebuff.getHealRate() != mobZoneInfo.getOut().getHealRate()) {
                        mobZoneDebuff.setHealRate(mobZoneInfo.getOut().getHealRate());
                    }
                }
            }
        }
    }

    public void gainMonsterParkReward(int itemID) {
        if (hasItem(itemID, 1)) {
            setSpeakerID(9000030);
            flipSpeaker();
            List<MonsterPark.MonsterParkReward> rewards = MonsterPark.getRewardListByItemID(itemID);
            if (rewards.isEmpty()) {
                chr.write(WvsContext.broadcastMsg(BroadcastMsg.popUpMessage("Có lỗi không xác định.")));
                return;
            }
            StringBuilder dialog = new StringBuilder();
            dialog.append("#eRewards the following:#n\r\n");
            dialog.append(String.format("#v%d# #z%d# x %d - %d\r\n\r\n", 4310020, 4310020, 15, 30));
            dialog.append("#eAlso rewards one of the following at random:#n\r\n");
            for (MonsterPark.MonsterParkReward reward : rewards) {
                if (reward.getItemID() == -1) {
                    dialog.append("Meso ");
                } else if (reward.getItemID() == -2) {
                    dialog.append("Honor Exp ");
                } else {
                    dialog.append(String.format("#v%d# #z%d# ", reward.getItemID(), reward.getItemID()));
                }
                if (reward.getMinQuantity() == reward.getMaxQuantity()) {
                    dialog.append(String.format("x %d ", reward.getMaxQuantity()));
                } else {
                    dialog.append(String.format("x %d - %d ", reward.getMinQuantity(), reward.getMaxQuantity()));
                }
                if (reward.getDay() != -1) {
                    dialog.append(String.format("for %d days", reward.getDay()));
                }
                dialog.append("\r\n");
            }
            if (sendAskYesNo(dialog.toString())) {
                int coinQuantity = Randomizer.rand(15, 30);
                int itemQuantity = 0;
                MonsterPark.MonsterParkReward reward = rewards.get(Randomizer.rand(0, rewards.size() - 1));
                System.out.println(reward.getItemID());
                itemQuantity = Randomizer.rand(reward.getMinQuantity(), reward.getMaxQuantity());
                if (!canHold(4310020, coinQuantity)) {
                    sendSayOkay("Please make more space in your inventory.");
                    return;
                }
                if (ItemConstants.isEquip(reward.getItemID())) {
                    if (!canHold(reward.getItemID())) {
                        sendSayOkay("Please make more space in your inventory.");
                        return;
                    }
                } else {
                    if (reward.getItemID() != -1 && reward.getItemID() != -2 && getEmptyInventorySlots(ItemData.getItemInfoByID(reward.getItemID()).getInvType()) <= 0) {
                        sendSayOkay("Please make more space in your inventory.");
                        return;
                    }
                }
                chr.addItemToInventory(4310020, coinQuantity);
                if (reward.getItemID() == -1) {
                    chr.addMoney(itemQuantity);
                } else if (reward.getItemID() == -2) {
                    chr.addHonorExp(itemQuantity);
                } else {
                    if (reward.getDay() != -1) {
                        chr.addItemToInventory(reward.getItemID(), itemQuantity, "day", reward.getDay());
                    } else {
                        chr.addItemToInventory(reward.getItemID(), itemQuantity);
                    }
                }
                consumeItem(itemID);
            }
        }
    }

    public List<Item> getEquips() {
        List<Item> items = new ArrayList<>();
        items.addAll(chr.getEquippedInventory().getItems());
        items.addAll(chr.getEquipInventory().getItems());
        return items;
    }

    public void checkMVPStatus() {
        setSpeakerID(9010038);

        User user = chr.getUser();
        if (user == null || chr == null) {
            return;
        }
        int xuvang = user.getDonationPoints();
        int currentVipPoints = user.getVipPoints();
        VIPGrade vipGrade = VIPGrade.getValByNum(user.getVipGrade());
        if (vipGrade == null) {
            return;
        }
        final LocalDateTime now = LocalDateTime.now();
        final LocalDateTime expiredDate = user.getVipExpiredDate().toLocalDateTime();
        boolean canRenew = (now.getDayOfYear() - expiredDate.getDayOfYear() <= 5 && now.getDayOfYear() - expiredDate.getDayOfYear() >= 0 && now.isAfter(expiredDate)) || now.getYear() > expiredDate.getYear();
        VIPGrade nexVipGrade = VIPGrade.getValByNum(user.getVipGrade() + 1);
        String icon = "";
        switch (vipGrade) {
            case None -> icon = "";
            case Bronze -> icon = "#fUI/UIWindow4.img/dailyGift/mvpMedal/1#";
            case Silver -> icon = "#fUI/UIWindow4.img/dailyGift/mvpMedal/5#";
            case Gold -> icon = "#fUI/UIWindow4.img/dailyGift/mvpMedal/6#";
            case Diamond -> icon = "#fUI/UIWindow4.img/dailyGift/mvpMedal/7#";
        }
        int selection = sendNext("Your current MVP tier is " + icon + " #e" + vipGrade + "#n.\r\nYou currently have #e" + Util.getNumberFormat(currentVipPoints) + "#n MVP points.\r\n" +
                "#b" +
                "#L0#I want to upgrade / renew my MVP tier.#l\r\n" +
                "#L1#I want to purchase MVP points with Donation Points!#l\r\n" +
                "#L2#What is MVP? What are the MVP benefits?#l\r\n" +
                "#k");
        switch (selection) {
            case 0:
                if (canRenew) {
                    if (vipGrade.getVal() == VIPGrade.Diamond.getVal()) {
                        if (currentVipPoints >= 750000) {
                            if (sendAskYesNo("Would you like to claim your #e#rDiamond#k#n MVP reward package using #e#r750,000#k#n MVP points (-75%)?")) {
                                if (getEmptyInventorySlots(InvType.CONSUME) < 1) {
                                    sendSayOkay("Please make sure you have at least 1 free slot in your USE inventory to claim the reward!");
                                    return;
                                }
                                chr.addItemToInventory(2434727, 1, "month", 1);
                                user.deductVipPoints(750000);
                                user.setVipExpiredDate(FileTime.fromDate(LocalDateTime.of(now.getYear(), now.getMonthValue(), now.getDayOfMonth(), 0, 0, 0).plusMonths(1)));
                                user.saveToSQL(false);
                                sendSayOkay("Congratulations! You have successfully renewed your #e#rDiamond#k#n MVP membership!");
                            } else {
                                sendSayOkay("Please make sure you have at least 1 free slot in your USE inventory to claim the reward!");
                            }
                        } else {
                            sendSayOkay("You do not have enough MVP points to renew your MVP membership.\r\nRequired MVP Points: #r"
                                    + Util.getNumberFormat(currentVipPoints)
                                    + "#k/#b"
                                    + Util.getNumberFormat(750000)
                                    + "#k"
                            );
                        }
                    } else if (vipGrade.getVal() < VIPGrade.Diamond.getVal()) {
                        int reqVipPoints = 0;
                        switch (nexVipGrade) {
                            case Bronze -> reqVipPoints = 249000;
                            case Silver -> reqVipPoints = 350000;
                            case Gold -> reqVipPoints = 600000;
                            case Diamond -> reqVipPoints = 1000000;
                        }
                        if (currentVipPoints >= reqVipPoints) {
                            if (sendAskYesNo("Would you like to upgrade your MVP tier to #e#r" + nexVipGrade + "#k#n using #e#r"
                                    + Util.getNumberFormat(reqVipPoints) + "#k#n MVP points?")) {
                                if (getEmptyInventorySlots(InvType.CONSUME) < 1) {
                                    sendSayOkay("Please make sure you have at least 1 free slot in your USE inventory to claim the reward!");
                                    return;
                                }
                                chr.addItemToInventory(2434723 + nexVipGrade.getVal(), 1, "month", 1);
                                user.setVipGrade(nexVipGrade.getVal());
                                user.deductVipPoints(reqVipPoints);
                                user.setVipExpiredDate(FileTime.fromDate(LocalDateTime.of(now.getYear(), now.getMonthValue(), now.getDayOfMonth(), 0, 0, 0).plusMonths(1)));
                                user.saveToSQL(false);
                                sendSayOkay("Congratulations! You have successfully upgraded to #e#r" + nexVipGrade + "#k#n MVP tier!");
                            } else {
                                sendSayOkay("Please make sure you have at least 1 free slot in your USE inventory to claim the reward!");
                            }
                        } else {
                            sendSayOkay("You do not have enough MVP points to upgrade your MVP tier.\r\nRequired MVP Points to upgrade: #r"
                                    + Util.getNumberFormat(currentVipPoints)
                                    + "#k/#b"
                                    + Util.getNumberFormat(reqVipPoints)
                                    + "#k"
                            );
                        }
                    } else {
                        sendSayOkay("An unknown error has occurred.");
                    }
                } else {
                    LocalDateTime max = expiredDate.plusDays(5);
                    sendSayOkay("It is not time to renew your MVP tier yet.\r\nYou can renew within #e#r5 days#k#n from your MVP expiration date. #eDeadline: 23:59:59 on " + max.getDayOfMonth() + "/" + max.getMonthValue() + "/" + max.getYear() + ".#n");
                }
                break;
            case 1:
                int amount = sendAskNumber("How many #eMVP points#n would you like to purchase? (Max: #r" + Util.getNumberFormat(xuvang) + "#k points)", 1, 1, xuvang);
                if (amount > 0 && amount <= xuvang) {
                    if (sendAskYesNo("Would you like to purchase #e" + amount + "#n MVP points?")) {
                        user.deductDonationPoints(amount);
                        user.addVipPoints(amount);
                        user.updateUserVipPointToSQL();
                        if (EventConstants.DONATION_POINT_EVENT) {
                            if (amount >= 1000000) {
                                chr.getScriptManager().addEventPoint(100);
                                chr.sendRewardToChar(ItemConstants.VIOLET_CUBE, 20, 0, "Reward for purchasing 1,000,000 MVP points event.", 30);
                            }
                            if (amount >= 500000) {
                                chr.getScriptManager().addEventPoint(50);
                                chr.sendRewardToChar(ItemConstants.VIOLET_CUBE, 10, 0, "Reward for purchasing 500,000 MVP points event.", 30);
                            }
                            if (amount >= 100000) {
                                chr.sendRewardToChar(ItemConstants.VIOLET_CUBE, 2, 0, "Reward for purchasing 100,000 MVP points event.", 30);
                            }
                            chr.sendPacketRewards();
                        }
                        sendSayOkay("You have successfully purchased #e" + amount + "#n MVP points!\r\nYou currently have #e#r" + user.getVipPoints() + "#k#n MVP points!");
                    }
                }
                break;
            case 2:
                sendNext("#eMaple Value Points (MVP) Service Introduction#n\r\n" +
                        "#e1. #fUI/UIWindow4.img/dailyGift/mvpMedal/1# Bronze ; #n " +
                        "#e2. #fUI/UIWindow4.img/dailyGift/mvpMedal/5# Silver#n \r\n" +
                        "#e3. #fUI/UIWindow4.img/dailyGift/mvpMedal/6# Gold#n ; " +
                        "#e4. #fUI/UIWindow4.img/dailyGift/mvpMedal/7# Diamond#n\r\n" +
                        "- Each tier is valid for 30 days. You may renew and upgrade during the last 3 days of your tier period.\r\n" +
                        "- If you do not renew on time, your tier will reset to Bronze on your next tier cycle.\r\n" +
                        "- Each tier grants unique tier-specific rewards and exclusive perks.\r\n" +
                        "- Enjoy various MVP discounts, bonuses, and quality-of-life benefits!");
                sendPrev("#eSpecial Benefits of the MVP Service#n\r\n" +
                        "#e- Valuable gift packages in the MVP Reward Box#n.\r\n" +
                        "#e- Bonus Boss Entry Counts:#n Applicable to Gold tier and above (Gold: +1 extra entry, Diamond: +2 extra entries).\r\n" +
                        "#e- Star Force Enhancement Perks:#n\r\n" +
                        "+ Star Force success rate increases by 2.5% / 5% / 7.5% / 10% for Bronze / Silver / Gold / Diamond tiers respectively.\r\n" +
                        "+ Meso cost for Star Force enhancement reduced by 5% / 10% / 15% / 20% for Bronze / Silver / Gold / Diamond tiers.\r\n" +
                        "#e- Base Meso Drop Rate Bonus:#n Increases character base meso drop rate by 25 / 50 / 75 / 100 for Bronze / Silver / Gold / Diamond tiers.\r\n" +
                        "- Auction House: Listing slots increased by 2 / 4 / 6 / 8 slots for Bronze / Silver / Gold / Diamond tiers.#n");
                break;
        }
    }

    public void upgradeMechanicalHeart() {
        setSpeakerID(9010038);

        User user = chr.getUser();
        if (user == null || chr == null) {
            return;
        }
        int dp = user.getDonationPoints();
        List<Item> currentHearts = new ArrayList<>();
        for (Item item : chr.getEquipInventory().getItems()) {
            if (item.getItemId() == 1672020 || item.getItemId() == 1672027 || item.getItemId() == 1672040) {
                currentHearts.add(item);
            }
        }
        if (!currentHearts.isEmpty()) {
            currentHearts.sort(Comparator.comparingInt(Item::getItemId));
            StringBuilder choose = new StringBuilder("#r#eNote:#n Your Mechanical Heart will lose all scroll stats, potential, and enhancements upon upgrading.#k\r\n#ePlease select the Mechanical Heart you wish to upgrade:#n\r\n");
            for (int i = 0; i < currentHearts.size(); i++) {
                int itemID = currentHearts.get(i).getItemId();
                int nextItemID = itemID == 1672020 ? 1672027 : itemID == 1672027 ? 1672040 : 1672069;
                choose.append("#L").append(i).append("# #i").append(itemID).append("# #b#z").append(itemID).append("##k #e to #n ").append("#i").append(nextItemID).append("# #b#z").append(nextItemID).append("##k").append(".#l\r\n");
            }
            int selectedItem = sendNext(choose.toString());
            int selectedItemID = currentHearts.get(selectedItem).getItemId();
            int nextItemID = selectedItemID == 1672020 ? 1672027 : selectedItemID == 1672027 ? 1672040 : 1672069;
            int cost = (selectedItemID == 1672040 ? 500000 : 300000);
            if (dp >= cost) {
                if (sendAskYesNo("Are you sure you want to upgrade #b#z" + selectedItemID + "##k to #b#z" + nextItemID + "##k for " + (selectedItemID == 1672040 ? "500,000" : "300,000") + " Donation Points?")) {
                    if (canHold(nextItemID)) {
                        user.deductDonationPoints(cost);
                        chr.consumeItem(currentHearts.get(selectedItem));
                        giveItem(nextItemID);
                    } else {
                        sendSayOkay("Please make sure you have enough free slots in your EQUIP inventory.");
                    }
                }
            } else {
                sendSayOkay("You do not have enough Donation Points to upgrade your Mechanical Heart.");
            }
        } else {
            sendSayOkay("You do not have an eligible Mechanical Heart to upgrade.");
        }
    }

    public void removeCashItems() {
        setSpeakerID(9010038);

        User user = chr.getUser();
        if (user == null || chr == null) {
            return;
        }

        long money = chr.getMoney();
        List<Item> currentCashItems = new ArrayList<>();
        for (Item item : chr.getEtcInventory().getItems()) {
            if (item.getItemId() == 4033766) {
                currentCashItems.add(item);
            }
        }
        for (Item item : chr.getEquipInventory().getItems()) {
            if (item.isCash()) {
                currentCashItems.add(item);
            }
        }
        if (!currentCashItems.isEmpty()) {
            currentCashItems.sort(Comparator.comparingInt(Item::getBagIndex));
            StringBuilder choose = new StringBuilder("#ePlease choose your cash Items to remove:#n\r\n");
            for (int i = 0; i < currentCashItems.size(); i++) {
                choose.append("#L").append(i).append("# #i").append(currentCashItems.get(i).getItemId()).append("# #b#z").append(currentCashItems.get(i).getItemId()).append("##k.#l\r\n");
            }
            int selectItems = sendNext(choose.toString());
            if (money >= 50000) {
                if (sendAskYesNo("Do you really want to remove #i" + currentCashItems.get(selectItems).getItemId() + "# #b#z" + currentCashItems.get(selectItems).getItemId() + "##k?")) {
                    chr.deductMoney(50000);
                    chr.consumeItem(currentCashItems.get(selectItems));
                    removeCashItems();
                } else {
                    sendSayOkay("See you later!");
                }
            } else {
                sendPrev("You don't have enough Meso(s) to remove this item.");
            }
        } else {
            sendSayOkay("You don't have any cash items to remove.");
        }
    }

    public void handleInfernoWolf(int objectID) {
        final LocalDateTime now = LocalDateTime.now();
        if (chr.getQuestById(QuestConstants.INFERNO_WOLF_MOB_DEAD) != null) {
            int count = Integer.parseInt(getQRValueByKey(QuestConstants.INFERNO_WOLF_MOB_DEAD, "count"));
            final String date = getQRValueByKey(QuestConstants.INFERNO_WOLF_MOB_DEAD, "date"); // yy/MM/dd
            DateTimeFormatter dtf_d = DateTimeFormatter.ofPattern("dd");
            int day = Integer.parseInt(dtf_d.format(now));
            int lastDay = Integer.parseInt(date.substring(6, 8));
            if (lastDay != day) {
                if (count <= 5) {
                    setQuestStatus(QuestConstants.INFERNO_WOLF_MOB_DEAD, 0);
                    setQRValueByKey(QuestConstants.INFERNO_WOLF_MOB_DEAD, "count", "1");
                    setQRValueByKey(QuestConstants.INFERNO_WOLF_MOB_DEAD, "date", DateTimeFormatter.ofPattern("yy/MM/dd").format(now));
                    createQuestWithQRValue(QuestConstants.INFERNO_WOLF_MOB_DEAD_, "mobDead=0");
                    chr.setPreviousFieldID(chr.getFieldID());
                    warp(993000500);
                    chr.getField().removeLife(objectID, false);
                } else {
                    sendSayOkay("You can enter Inferno Wolf's Den up to 5 times per day.");
                }
            } else if (count < 5) {
                setQuestStatus(QuestConstants.INFERNO_WOLF_MOB_DEAD, 0);
                setQRValueByKey(QuestConstants.INFERNO_WOLF_MOB_DEAD, "count", "" + (count + 1));
                createQuestWithQRValue(QuestConstants.INFERNO_WOLF_MOB_DEAD_, "mobDead=0");
                chr.setPreviousFieldID(chr.getFieldID());
                warp(993000500);
                chr.getField().removeLife(objectID, false);
            } else {
                sendSayOkay("You can enter Inferno Wolf's Den up to 5 times per day.");
            }
        } else {
            createQuestWithQRValue(QuestConstants.INFERNO_WOLF_MOB_DEAD, "count=1;date=" + DateTimeFormatter.ofPattern("yy/MM/dd").format(now));
            createQuestWithQRValue(QuestConstants.INFERNO_WOLF_MOB_DEAD_, "mobDead=0");
            setQuestStatus(QuestConstants.INFERNO_WOLF_MOB_DEAD, 0);
            chr.setPreviousFieldID(chr.getFieldID());
            warp(993000500);
            chr.getField().removeLife(objectID, false);
        }
    }

    public Integer randomDailyQuest(int questID, int sel) {
        List<Integer> randomQuests = new ArrayList<>();
        if (questID == QuestConstants.VANISHING_JOURNEY_DAILY_QUEST) {
            List<Integer> newDailyQuests = new ArrayList<>(5);
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q1")));
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q2")));
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q3")));
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q4")));
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q5")));
            for (int i = 34130; i <= 34150; i++) {
                if (!newDailyQuests.contains(i) && newDailyQuests.get(sel) != i) {
                    randomQuests.add(i);
                }
            }
        } else if (questID == QuestConstants.CHU_CHU_DAILY_QUEST) {
            List<Integer> newDailyQuests = new ArrayList<>(3);
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q1")));
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q2")));
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q3")));
            for (int i = 39017; i <= 39032; i++) {
                if (!newDailyQuests.contains(i) && newDailyQuests.get(sel) != i) {
                    randomQuests.add(i);
                }
            }
        } else if (questID == QuestConstants.LACHELEIN_DAILY_QUEST) {
            List<Integer> newDailyQuests = new ArrayList<>(3);
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q1")));
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q2")));
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q3")));
            for (int i = 34381; i <= 34393; i++) {
                if (!newDailyQuests.contains(i) && newDailyQuests.get(sel) != i) {
                    randomQuests.add(i);
                }
            }
        } else if (questID == QuestConstants.ARCANA_DAILY_QUEST) {
            List<Integer> newDailyQuests = new ArrayList<>(3);
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q1")));
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q2")));
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q3")));
            for (int i = 39038; i <= 39048; i++) {
                if (!newDailyQuests.contains(i) && newDailyQuests.get(sel) != i) {
                    randomQuests.add(i);
                }
            }
        } else if (questID == QuestConstants.MORASS_DAILY_QUEST) {
            List<Integer> newDailyQuests = new ArrayList<>(3);
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q1")));
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q2")));
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q3")));
            for (int i = 34276; i <= 34293; i++) {
                if (!newDailyQuests.contains(i) && newDailyQuests.get(sel) != i) {
                    randomQuests.add(i);
                }
            }
        } else if (questID == QuestConstants.ESFERA_DAILY_QUEST) {
            List<Integer> newDailyQuests = new ArrayList<>(3);
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q1")));
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q2")));
            newDailyQuests.add(Integer.valueOf(getQRValueByKey(questID, "q3")));
            for (int i = 34780; i <= 34799; i++) {
                if (!newDailyQuests.contains(i) && newDailyQuests.get(sel) != i) {
                    randomQuests.add(i);
                }
            }
        }
        return Util.getRandomFromCollection(randomQuests);
    }

    public void randomDailyQuest(List<Integer> newDailyQuests, int min, int max) {
        if (min > max) {
            throw new IllegalArgumentException("Giá trị 'min' phải nhỏ hơn hoặc bằng 'max'.");
        }
        int range = max - min + 1;
        if (newDailyQuests.size() >= range) {
            // Đã có tất cả các nhiệm vụ khả thi, không thể thêm mới.
            // Bạn có thể xử lý lỗi hoặc trả về tùy ý.
            return;
        }
        int randomQuest;
        do {
            randomQuest = Util.getRandom(min, max);
        } while (newDailyQuests.contains(randomQuest));

        newDailyQuests.add(randomQuest);
    }

    public void addDailyQuestCount(int questID) {
        int max = questID == QuestConstants.VANISHING_JOURNEY_DAILY_QUEST_COUNT ? 5 : 3;
        AccountQuest q = chr.getAccount().getQuestById(questID);
        if (q == null) {
            q = new AccountQuest(chr.getAccount().getId(), questID, QuestStatus.Started);
            q.setQrValue("count=1");
            chr.getAccount().addCustomQuest(q);
            updateQRValue(questID, true);
        } else {
            q.convertQRValueToProperties();
            int count = Integer.parseInt(q.getProperty("count"));
            if (count < max) {
                count += 1;
            }
            q.setQrValue("count=" + count);
            updateQRValue(questID, true);
        }
    }

    public void openYuGardenDailyQuest() {
        final LocalDateTime now = LocalDateTime.now();
        final String date = getQRValueByKey(62150, "date"); // yy/MM/dd
        if (date == null) {
            List<Integer> newDailyQuests = new ArrayList<>(2);
            for (int i = 0; i < 2; i++) {
                randomDailyQuest(newDailyQuests, 62170, 62179);
            }
            List<Integer> newDailyQuests2 = new ArrayList<>(2);
            for (int i = 0; i < 2; i++) {
                randomDailyQuest(newDailyQuests2, 62182, 62192);
            }
            int lastQuestID = Util.getRandom(62193, 62199);
            String qrValue = "q1=" + newDailyQuests.get(0)
                    + ";q2=" + newDailyQuests.get(1)
                    + ";q3=" + newDailyQuests2.get(0)
                    + ";q4=" + newDailyQuests2.get(1)
                    + ";q5=" + lastQuestID
                    + ";date=" + DateTimeFormatter.ofPattern("yy/MM/dd").format(now);
            createQuestWithQRValue(62150, qrValue);
            modifiedCharacter();
            chr.write(UIContextPacket.openDailyQuestBoard(chr));
            return;
        }
        DateTimeFormatter dtf_d = DateTimeFormatter.ofPattern("dd");
        int day = Integer.parseInt(dtf_d.format(now));
        int lastDay = Integer.parseInt(date.substring(6, 8));
        if ((lastDay != day) || getQRValueByKey(62150, "q1") == null) {
            for (int i = 62170; i <= 62199; i++) {
                chr.removeQuest(i);
            }
            List<Integer> newDailyQuests = new ArrayList<>(2);
            for (int i = 0; i < 2; i++) {
                randomDailyQuest(newDailyQuests, 62170, 62179);
            }
            List<Integer> newDailyQuests2 = new ArrayList<>(2);
            for (int i = 0; i < 2; i++) {
                randomDailyQuest(newDailyQuests2, 62182, 62192);
            }
            int lastQuestID = Util.getRandom(62193, 62199);
            setQRValueByKey(62150, "q1", String.valueOf(newDailyQuests.get(0)));
            setQRValueByKey(62150, "q2", String.valueOf(newDailyQuests.get(1)));
            setQRValueByKey(62150, "q3", String.valueOf(newDailyQuests2.get(0)));
            setQRValueByKey(62150, "q4", String.valueOf(newDailyQuests2.get(1)));
            setQRValueByKey(62150, "q5", String.valueOf(lastQuestID));
            setQRValueByKey(62150, "date", DateTimeFormatter.ofPattern("yy/MM/dd").format(now));
            modifiedCharacter();
        }
        chr.write(UIContextPacket.openDailyQuestBoard(chr));
    }

    public void getServerInformation() {
        StringBuilder result = new StringBuilder("#fs20##e#bServer Information:#k#n\r\n#fs11#");
        Duration duration = Duration.ofMillis(ManagementFactory.getRuntimeMXBean().getUptime());
        result.append("#e1. Server Uptime:#n ").append(duration.toHours()).append(" hrs ").append(duration.toMinutes()).append(" min ").append(duration.toSeconds()).append(" sec\r\n");
        result.append("#e2. EXP Rate:#n x").append(ServerConfig.EXP_RATE).append("\r\n");
        result.append("#e3. MESO Rate:#n x").append(ServerConfig.MESO_RATE).append("\r\n");
        result.append("#e4. DROP Rate:#n x").append(ServerConfig.DROP_RATE).append("\r\n");
        result.append("#e5. Total Players Online:#n ").append(Server.get().getClients().size()).append("\r\n");
        Map<Integer, Char> chars = new HashMap<>();
        int i = 0;
        for (Client client : Server.get().getClients()) {
            if (client.getChr() != null) {
                chars.put(i, client.getChr());
                result.append(String.format("#L%d#IP: #e%s#n | Name: #e%s#n | Lv. #e%d#n | Job: #e%s#n | Channel: #e%d#n | Field: #e#m%d##n#l\r\n\r\n", i, (client.getIP() + ":" + client.getPort()), client.getChr().getName(), client.getChr().getLevel(), JobConstants.JobEnum.getJobById(client.getChr().getJob()).name().charAt(0) + JobConstants.JobEnum.getJobById(client.getChr().getJob()).name().substring(1).toLowerCase(), client.getChr().getClient().getChannel(), client.getChr().getFieldID()));
                i++;
            }
        }
        Char player = chars.get(sendNext(result.toString()));
        if (player != null) {
            if (player.getClient().getChannel() == player.getClient().getChannel()) {
                final Field toField = player.getField();
                chr.warp(toField, toField.getPortalByName("sp"), false, true, true);
            } else {
                chr.changeChannelAndWarp(player.getClient().getChannel(), player.getFieldID());
            }
        }
    }

    public void tradeCashItems() {
        flipSpeaker();
        flipDialoguePlayerAsSpeaker();

        TradeRoom tradeRoom = chr.getTradeRoom();
        if (tradeRoom == null) {
            chr.chatMessage("B¢n hi½n không giao dÅch vÜi ai.");
            return;
        }

        List<Item> currentCashItems = new ArrayList<>();
        for (Item item : chr.getEquipInventory().getItems()) {
            if (item.isCash()) {
                currentCashItems.add(item);
            }
        }
        for (Item item : chr.getCashInventory().getItems()) {
            if (item.isCash()) {
                currentCashItems.add(item);
            }
        }
        Char other = tradeRoom.getOtherChar(chr.getId());
        if (other == null) {
            tradeRoom.cancelTrade();
            chr.write(MiniroomPacket.cancelTrade());
            chr.chatMessage("Đối tác giao dịch của bạn đã ngắt kết nối.");
            return;
        }
        if (!currentCashItems.isEmpty()) {
            currentCashItems.sort(Comparator.comparingInt(Item::getItemId));
            StringBuilder choose = new StringBuilder("#eVui lòng chọn vật phẩm bạn muốn giao dịch:#n\r\n");
            for (int i = 0; i < currentCashItems.size(); i++) {
                choose.append("#L").append(i).append("# #i").append(currentCashItems.get(i).getItemId()).append("# #b#z").append(currentCashItems.get(i).getItemId()).append("# (SÑ lïæng: ").append(currentCashItems.get(i).getQuantity()).append(")").append("#k.#l\r\n");
            }
            int selectItems = sendNext(choose.toString());
            Item item = currentCashItems.get(selectItems);
            if (item != null) {
                if (item.getQuantity() > 1) {
                    int amount = sendAskNumber("Bạn muốn giao dịch bao nhiêu #e#b#z" + item.getItemId() + "# (Số lượng: " + item.getQuantity() + ")#k#n?", 1, 1, item.getQuantity());
                    if (amount <= item.getQuantity()) {
                        RoomHandler.putItem(chr, chr.getInventoryByType(item.getInvType()), tradeRoom, tradeRoom.getTradeSlot(chr), item, (short) amount, true);
                        String msg = String.format("đã đặt vào vật phẩm %s x %d.", StringData.getItemStringById(item.getItemId()), amount);
                        chr.write(MiniroomPacket.chat(chr, other, 1, msg));
                        other.write(MiniroomPacket.chat(chr, other,0, msg));
                    } else {
                        chr.chatMessage("Lỗi không xác định đã xảy ra.");
                    }
                } else {
                    RoomHandler.putItem(chr, chr.getInventoryByType(item.getInvType()), tradeRoom, tradeRoom.getTradeSlot(chr), item, (short) 1, true);
                    String msg = String.format("đã đặt vào vật phẩm %s x 1.", StringData.getItemStringById(item.getItemId()));
                    chr.write(MiniroomPacket.chat(chr, other, 1, msg));
                    other.write(MiniroomPacket.chat(chr, other, 0, msg));
                }
            }
        }
    }

    public int getUnionCoin() {
        return chr.getUnion().getUnionCoin();
    }

    public void addUnionCoin(int amount) {
        Union union = chr.getUnion();
        union.addUnionCoin(amount);
        chr.write(UnionPacket.unionCoin(union.getUnionCoin()));
        chr.setQRValueByKey(QuestConstants.UNION_POINT, "point", union.getUnionCoin());
    }

    public void updateAvailableUnionCoin(int amount) {
        chr.createQuestWithQRValue(QuestConstants.UNION_COIN, "lastTime=" + FileTime.currentTime().toYYMMDDHHMMSS() + ";coin=" + amount);
    }

    public int getUnionRank() {
        return chr.getUnion().getUnionRank();
    }

    private int getUnionRankIndex() {
        int high = getUnionRank() / 100;
        int low = getUnionRank() % 100;
        return (low - 1) + (high - 1) * 5;
    }

    private boolean isMaxUnionRank() {
        return getUnionRank() == 405;
    }

    public String getUnionRankName() {
        return UnionMember.ranks[getUnionRankIndex()];
    }

    public String getUnionNextRankName() {
        return UnionMember.ranks[isMaxUnionRank() ? getUnionRankIndex() : getUnionRankIndex() + 1];
    }

    public int getUnionCoinReq() {
        return UnionMember.reqCoin[getUnionRankIndex()];
    }

    public int getUnionLevelReq() {
        return UnionMember.reqLev[getUnionRankIndex()];
    }

    public int getUnionLevel() {
        int total = 0;
        for (Char chr : chr.getAccount().getEligibleUnionChars()) {
            total += chr.getLevel();
        }
        return total;
    }

    public int getUnionCharacterCount() {
        return chr.getAccount().getEligibleUnionChars().size();
    }

    public int getUnionAssignedCharacterCount() {
        return chr.getUnion().getActiveUnionChars(chr.getActiveUnionPreset()).size();
    }

    public int getUnionAssignedMaxCharacterCount() {
        return UnionMember.attackerCount[getUnionRankIndex()];
    }

    public int getUnionAssignedNextMaxCharacterCount() {
        return UnionMember.attackerCount[isMaxUnionRank() ? getUnionRankIndex() : getUnionRankIndex() + 1];
    }

    public void incrementUnionRank() {
        chr.incrementUnionRank();
    }

    public int getUnionCoinByRaid() {
        return Integer.parseInt(getQRValueByKey(QuestConstants.UNION_RAID, "coin"));
    }

    public void spawnLinkMobsetHP(int id, int x, int y, long nowhp, long maxhp) {
        Mob mob = MobData.getMobDeepCopyById(id);
        Position pos = new Position(x, y);
        mob.setPosition(pos.deepCopy());
        mob.setPrevPos(pos.deepCopy());
        mob.setPosition(pos.deepCopy());
        mob.setHp(nowhp);
        mob.setMaxHp(maxhp);
        mob.setNotRespawnable(false);
        mob.setField(chr.getField());
        mob.setControllerID(chr.getId());
        chr.getField().spawnLife(mob, null);
    }

    public List<Equip> getEquipsForSell() {
        List<Equip> equips = new ArrayList<>();
        for (Item item : chr.getEquipInventory().getItems()) {
            if (item instanceof Equip equip) {
                if (!equip.hasAttribute(EquipAttribute.Locked)) {
                    equips.add(equip);
                }
            }
        }
        return equips;
    }

    public void initCharacterPotential(int questID) {
        final var charID = chr.getId();
        if (chr.getLevel() >= 30) {
            final var firstAbility = 12394;
            if (questID == firstAbility && !chr.hasQuestCompleted(firstAbility)) { // First Ability - The Eye Opener
                chr.getPotentials().add(new CharacterPotential(charID, 0, (byte) 1, 70000044, (byte) 5, (byte) 0));
                chr.getPotentials().add(new CharacterPotential(charID, 1, (byte) 1, 70000044, (byte) 5, (byte) 0));
                chr.getPotentials().add(new CharacterPotential(charID, 2, (byte) 1, 70000044, (byte) 5, (byte) 0));
                completeQuestNoRewards(firstAbility);
            }
        }
        if (chr.getLevel() >= 50) {
            final var secondAbility = 12395;
            if (questID == secondAbility && !chr.hasQuestCompleted(secondAbility)) { // Second Ability - Power, Strength
                chr.getPotentials().add(new CharacterPotential(charID, 0, (byte) 2, 70000044, (byte) 5, (byte) 0));
                chr.getPotentials().add(new CharacterPotential(charID, 1, (byte) 2, 70000044, (byte) 5, (byte) 0));
                chr.getPotentials().add(new CharacterPotential(charID, 2, (byte) 2, 70000044, (byte) 5, (byte) 0));
                completeQuestNoRewards(secondAbility);
            }
            final var thirdAbility = 12396;
            if (questID == thirdAbility && !chr.hasQuestCompleted(thirdAbility)) { // The Eye Opener
                chr.getPotentials().add(new CharacterPotential(charID, 0, (byte) 3, 70000044, (byte) 15, (byte) 1));
                chr.getPotentials().add(new CharacterPotential(charID, 1, (byte) 3, 70000044, (byte) 15, (byte) 1));
                chr.getPotentials().add(new CharacterPotential(charID, 2, (byte) 3, 70000044, (byte) 15, (byte) 1));
                completeQuestNoRewards(thirdAbility);
            }
        }
    }

    public String getCurrentTime() {
        return FileTime.currentTime().toYYYYMMDD_HHMMSS();
    }

    public void startBossUI(String bossName) {
        int orderId = BossPartyType.getOrderIdByBossName(bossName);
        if (orderId != -1) {
            chr.write(WvsContext.startBossUI(orderId));
        }
    }

    public void initForBossing(String bossName) {
        for (Integer skillID : chr.getSkillCoolTimes().keySet()) {
            chr.addSkillCoolTime(skillID, 0);
            chr.write(UserLocal.skillCooltimeSetM(skillID, 0));
        }
        chr.write(WvsContext.clearAnnouncedQuest());
        chr.getTemporaryStatManager().removeAllDebuffs();
        addPopUpSay(0, 2000, "Hãy chuẩn bị chiến đấu với\r\n#b" + bossName + "#k.", "");
        systemMessage("Bạn đã vào Bản đồ Chờ Boss. Tất cả các hiệu ứng tăng cường, ngoại trừ kỹ năng bật/tắt, sẽ bị xóa và thời gian hồi chiêu của kỹ năng sẽ tạm thời được đặt lại. Khi bạn đã sẵn sàng, hãy sử dụng cổng dịch chuyển hoặc NPC để di chuyển đến Bản đồ Chiến đấu Boss.");
    }

    public void startBoss() {
        var orderId = getQRValueByKey(102401, "order");
        var difficulty = getQRValueByKey(102401, "diff");
        var mapR = getQRValueByKey(102401, "mapR");
        setSpeakerID(9010000);
        if (orderId == null || difficulty == null || mapR == null) {
            sendSayOkay("Không tìm thấy dữ liệu của Boss này. Vui lòng báo cho GM!");
            return;
        }
        BossPartyType boss = BossPartyType.getByOrderIdAndDifficulty(Integer.parseInt(orderId), Integer.parseInt(difficulty));
        if (boss == null) {
            sendSayOkay("Không tìm thấy dữ liệu của Boss này. Vui lòng báo cho GM!");
            return;
        }
        if (BossHelper.checkInstance(chr)) {
            sendSayOkay("Lỗi không xác định, bạn vui lòng ra và vào lại Boss này.");
            return;
        }
        var party = chr.getParty();
        if (party != null && !party.isLeader(chr)) {
            chr.chatPopup("Xin hãy để người lãnh đạo nhóm của bạn thực hiện.");
            return;
        }
        int fieldID = BossConstants.getBossFightingFieldId(boss);
        int time = BossConstants.getBossWaitingFieldId(boss);
        warpInstanceIn(chr, fieldID, true);
        setInstanceTime(time, Integer.parseInt(mapR));
    }

    public void exitBoss() {
        setSpeakerID(9010000);
        if (sendAskYesNo("Bạn có muốn rút lui khỏi trận đấu này không?")) {
            var mapR = getQRValueByKey(102401, "mapR");
            if (mapR != null) {
                warpInstanceOut(chr, Integer.parseInt(mapR));
            } else {
                warpInstanceOut(chr, FieldConstants.HOME_MAP);
            }
        }
    }

    public void setBackGround() {
        int itemID = getParentID();
        int type = 0;
        switch (itemID) {
            case 2639943:
            case 2639944:
                type = 25;
                break;
        }
        final int qrKey = 502593;
        for (int i = 0; i < 5; i++) {
            String v = chr.getQRValueByKey(qrKey, String.valueOf(i));
            if (v != null && Integer.parseInt(v) == type) {
                chat("Bạn đã có chủ đề này rồi.");
                return;
            }
        }
        for (int i = 0; i < 5; i++) {
            String v = chr.getQRValueByKey(qrKey, String.valueOf(i));
            if (v == null || v.equals("0")) {
                chr.setQRValueByKey(qrKey, String.valueOf(i), type);
                chr.write(UserLocal.setCharacterInfoBackground(3));
                gainQuestItem(itemID, -1);
                consumeItem(itemID);
                return;
            }
        }
    }

    public void setCharacterSelectionBG() {
        int itemID = getParentID();
        int type;
        switch (itemID) {
            case 2639946 -> type = 2; // Twilight Altar
            default -> {
                return;
            }
        }
        final int qrKey = 607;
        for (int i = 0; i < 10; i++) {
            String v = chr.getQRValueByKey(qrKey, String.valueOf(i));
            if (v != null && Integer.parseInt(v) == type) {
                chat("Bạn đã có chủ đề này rồi.");
                return;
            }
        }
        for (int i = 0; i < 10; i++) {
            String v = chr.getQRValueByKey(qrKey, String.valueOf(i));
            if (v == null || v.equals("0")) {
                chr.setQRValueByKey(qrKey, String.valueOf(i), type);
                chr.write(UserLocal.setCharacterSelectionBackground(0, 1));
                gainQuestItem(itemID, -1);
                consumeItem(itemID);
                chr.getAccount().setLoginTheme(type);
                return;
            }
        }
    }

    public void gainQuestItem(int itemID, int quantity) {
        chr.write(UserPacket.effect(Effect.gainQuestItem(itemID, quantity)));
    }

    public void removeBlowWeather() {
        chr.write(FieldPacket.removeBlowWeather());
    }

    public void blowWeather(int itemID, String message, int seconds) {
        chr.write(FieldPacket.blowWeather(itemID, message, seconds, null));
    }

    public void characterSelfInfo(int unk, boolean bool) {
        chr.write(UserPacket.characterSelfInfo(unk, bool));
    }

    public void resultInstanceTable(String name, int type, int subType, boolean rightResult, int value) {
        chr.write(WvsContext.resultInstanceTable(name, type, subType, rightResult, value));
    }

    public void startFieldBooster(int itemID) {
        switch (itemID) {
            case 2638603: // HEXA Booster
                var field = chr.getField();
                if (field.getMobGens().isEmpty() || field.getBoosterMobID() != 0) {
                    chr.chatMessage("không thể sử dụng Booster trong bản đồ này.");
                    chr.dispose();
                    return;
                }
                Mob first = Util.getRandomFromCollection(field.getMobGens()).getMob();
                if (Math.abs(first.getLevel() - chr.getLevel()) <= 20) {
                    var templateID = 8645399; // Scattered Sol Erda
                    screen("Effect/ItemEff.img/2638603/startEff");
                    playSound("Sound/SoundEff.img/HasteBooster/count");
                    consumeItem(itemID);
                    chr.chatMessage("Bạn đã sử dụng HEXA Booster.");
                    field.setBoosterMobID(0);
                    field.setBoosterEXPMulti(0);
                    addEvent(field.getTimer().addEvent(() -> {
                        playSound("Sound/SoundEff.img/HasteBooster/start");
                        createStopWatch(100);
                        field.setBoosterMobID(templateID);
                        field.setBoosterEXPMulti(10);
                        int i = 0;
                        for (Mob mob : field.getMobs()) {
                            if (i >= 6) {
                                break;
                            }
                            spawnMob(templateID, mob.getX() + Util.getRandom(-10, 10), mob.getY(), false, mob.getMaxHp(), mob.getExp() * field.getBoosterEXPMulti());
                            i++;
                        }
                        addEvent(field.getTimer().addEvent(() -> field.setBoosterMobID(0), 100, TimeUnit.SECONDS));
                    }, 2500L));
                } else {
                    chr.chatMessage("không thể sử dụng Booster trong bản đồ này.");
                    chr.dispose();
                }
                break;
            case 2637168: // VIP Booster
            case 2637169: // VIP Booster
            case 2639826: // VIP Booster
                field = chr.getField();
                if (field.getMobGens().isEmpty() || field.getBoosterMobID() != 0) {
                    chr.chatMessage("không thể sử dụng Booster trong bản đồ này.");
                    chr.dispose();
                    return;
                }
                first = Util.getRandomFromCollection(field.getMobGens()).getMob();
                if (Math.abs(first.getLevel() - chr.getLevel()) <= 20) {
                    var templateID = 9834331; // Booster Flame
                    var useCount = chr.getQRValueByKey(101717, "useCount");
                    int count = 1;
                    if (useCount != null) {
                        count = Integer.parseInt(useCount) + 1;
                    }
                    screen("Effect/EventEffect.img/HasteBooster/startEff");
                    playSound("Sound/SoundEff.img/HasteBooster/count");
                    consumeItem(itemID);
                    createQuestWithQRValue(101717, "useCount=" + count + ";date=" + FileTime.currentTime().toYYMMDD());
                    chr.chatScriptMessage("Hôm nay bạn đã sử dụng VIP Boosters " + count + "/10 lần.");
                    chr.chatMessage("Bạn đã sử dụng VIP Booster.");
                    chr.chatMessage("Bạn còn "+ (10 - count) +" lượt sử dụng VIP Booster nữa trong ngày hôm nay.");
                    field.setBoosterMobID(0);
                    field.setBoosterEXPMulti(0);
                    addEvent(field.getTimer().addEvent(() -> {
                        playSound("Sound/SoundEff.img/HasteBooster/start");
                        createStopWatch(100);
                        field.setBoosterMobID(templateID);
                        field.setBoosterEXPMulti(10);
                        int i = 0;
                        for (Mob mob : field.getMobs()) {
                            if (i >= 6) {
                                break;
                            }
                            spawnMob(templateID, mob.getX() + Util.getRandom(-10, 10), mob.getY(), false, mob.getMaxHp(), mob.getExp() * field.getBoosterEXPMulti());
                            i++;
                        }
                        addEvent(field.getTimer().addEvent(() -> field.setBoosterMobID(0), 100, TimeUnit.SECONDS));
                    }, 2500L));
                } else {
                    chr.chatMessage("không thể sử dụng Booster trong bản đồ này.");
                    chr.dispose();
                }
                break;
            case 2638880: // Special VIP Booster
                // TODO?
                break;
        }
    }
}
