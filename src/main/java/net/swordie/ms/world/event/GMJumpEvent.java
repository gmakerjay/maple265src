package net.swordie.ms.world.event;

import net.swordie.ms.DiscordAPI;
import net.swordie.ms.Server;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.connection.packet.FieldPacket;
import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.enums.ChatType;
import net.swordie.ms.enums.WeatherEffNoticeType;
import net.swordie.ms.enums.social.Event.InGameEventType;
import net.swordie.ms.life.drop.Drop;
import net.swordie.ms.world.Channel;
import net.swordie.ms.world.field.ClockPacket;
import net.swordie.ms.world.field.Field;

import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

public class GMJumpEvent implements InGameEvent {

    public int LOBBY_MAP;
    public static final int REWARD_MAP = 109050000;
    public static final int EXIT_MAP = 109050001;
    private static final int TIME_LIMIT_SECONDS = 360; // 6 minutes
    private boolean started = false;
    private boolean active = false;
    private long startTimeMillis;
    private Channel channelInstance;
    private ScheduledFuture<?> startTimer;
    private ScheduledFuture<?> endTimer;

    public GMJumpEvent() {
        channelInstance = Server.get().getWorld().getChannels().get(0);
    }

    @Override
    public String getEventName() {
        return "GM Jump Event";
    }

    public void setGameMap(int LOBBY_MAP) {
        this.LOBBY_MAP = LOBBY_MAP;
    }

    @Override
    public void doEvent() {
        this.active = true;
        startTimer = Server.get().getEventTimer().addEvent(this::start, InGameEventManager.REGISTRATION_DURATION_MINS, TimeUnit.MINUTES);
        startTimeMillis = System.currentTimeMillis() + (long) InGameEventManager.REGISTRATION_DURATION_MINS * 60 * 1000;
        channelInstance = Server.get().getWorld().getChannels().get(0);
        channelInstance.getField(LOBBY_MAP).setDropsDisabled(true); // to reduce lag
    }

    @Override
    public void endEvent() {
        this.active = false;
        this.started = false;
        this.startTimer = null;
        this.endTimer = null;
        for (Char chr : channelInstance.getField(LOBBY_MAP).getChars()) {
            chr.warp(chr.getPreviousFieldID());
        }
        channelInstance.getField(LOBBY_MAP).broadcast(FieldPacket.destroy());
    }

    @Override
    public void clear() {
        warpMap(LOBBY_MAP, EXIT_MAP);
        Field field = channelInstance.getFieldIfExists(LOBBY_MAP);

        if (field == null) {
            return; // nothing to clear
        }

        for (Drop d : field.getDrops()) {
            field.removeLife(d);
        }
        if (startTimer != null) {
            startTimer.cancel(false);
        }
        startTimer = null;
        if (endTimer != null) {
            endTimer.cancel(false);
        }
        endTimer = null;
        channelInstance.clearCache();
    }

    @Override
    public void joinEvent(Char c) {
        if (c.getClient().getChannelInstance().getChannelId() != channelInstance.getChannelId()) {
            c.chatMessage("Please go to channel " + channelInstance.getChannelId() + " to participate the " + getEventName() + "!");
        } else {
            warpChar(c, LOBBY_MAP);
        }
    }

    @Override
    public void sendLobbyClock(Char c) {
        if (getTimeLeft() >= 2) {
            c.write(FieldPacket.clock(ClockPacket.secondsClock(getTimeLeft())));
        }
    }

    @Override
    public boolean isActive() {
        return active;
    }

    @Override
    public boolean isOpen() {
        return !started;
    }

    @Override
    public InGameEventType getEventType() {
        return InGameEventType.OlaOlaJump;
    }

    @Override
    public int getEventEntryMap() {
        return LOBBY_MAP;
    }

    @Override
    public boolean charInEvent(int charId) {
        if (!active) {
            return false;
        }
        for (Char c : channelInstance.getField(LOBBY_MAP).getChars()) {
            if (c.getId() == charId) {
                return true;
            }
        }

        return false;
    }

    @Override
    public void onMigrateDeath(Char c) {
        c.warp(EXIT_MAP, 0, false);
    }

    private void start() {
        started = true;

        if (!channelInstance.getChars().isEmpty()) {
            startTimeMillis = System.currentTimeMillis() + TIME_LIMIT_SECONDS * 1000;
            broadcastClock(LOBBY_MAP, TIME_LIMIT_SECONDS);
            endTimer = Server.get().getEventTimer().addEvent(this::endEvent, TIME_LIMIT_SECONDS, TimeUnit.SECONDS);
            //Server.getInstance().getWorld().initSlideNotice(String.format("Event registration has ended! The %s Event has been started!", getEventName()), 60);
            this.active = true;
            this.started = false;
            this.startTimer = null;
            Server.get().broadcastForWorld(UserLocal.chatMsg(ChatType.Notice2, getEventName() + " has started!"));
        } else {
            endEvent();
            Server.get().broadcastForWorld(UserLocal.chatMsg(ChatType.Notice2, String.format("Since no one was interested, the %s Event was cancelled!", getEventName())));
        }
    }

    public void win() {
        startTimer = Server.get().getEventTimer().addEvent(this::endEvent, 5, TimeUnit.SECONDS);
        for (Char chr : channelInstance.getField(LOBBY_MAP).getChars()) {
            chr.warp(chr.getPreviousFieldID());
        }
    }

    private void sendNotice(int fieldId, String msg, int seconds) {
        channelInstance.getField(fieldId).broadcast(WvsContext
                .weatherEffectNotice(WeatherEffNoticeType.WizetAdminThumbsUp, msg, seconds * 1000));
    }

    private void broadcastClock(int fieldId, int seconds) {
        channelInstance.getField(fieldId).broadcast(FieldPacket.clock(ClockPacket.secondsClock(seconds)));
    }

    private void warpMap(int fromField, int toFieldId) {
        for (Char c : channelInstance.getField(fromField).getChars()) {
            warpChar(c, toFieldId);
        }
    }

    private void warpChar(Char c, int toFieldId) {
        c.warp(toFieldId, 0, false);
    }

    private int getTimeLeft() {
        return (int) (startTimeMillis - System.currentTimeMillis()) / 1000;
    }
}
