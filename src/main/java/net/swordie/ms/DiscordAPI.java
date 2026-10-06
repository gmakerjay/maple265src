package net.swordie.ms;

import com.sun.management.OperatingSystemMXBean;
import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.entities.Guild;
import net.dv8tion.jda.api.entities.User;
import net.dv8tion.jda.api.entities.channel.concrete.TextChannel;
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.interactions.commands.OptionMapping;
import net.dv8tion.jda.api.interactions.commands.OptionType;
import net.dv8tion.jda.api.interactions.commands.build.OptionData;
import net.dv8tion.jda.api.requests.GatewayIntent;
import net.dv8tion.jda.api.utils.Compression;
import net.dv8tion.jda.api.utils.cache.CacheFlag;
import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Guild.GuildMember;
import net.swordie.ms.constants.EventConstants;
import net.swordie.ms.constants.ItemConstants;
import net.swordie.ms.loaders.DropData;
import net.swordie.ms.loaders.StringData;
import net.swordie.ms.util.FileTime;
import net.swordie.ms.util.Util;
import net.swordie.ms.world.World;
import org.jetbrains.annotations.NotNull;
import org.mindrot.jbcrypt.BCrypt;

import java.awt.*;
import java.lang.management.ManagementFactory;
import java.text.NumberFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DiscordAPI extends ListenerAdapter {

    public static JDABuilder bot;
    public static JDA botJDA;
    public static final String mainGuildServer = "1047351220555231283";
    public static final String staffGuildServer = "1051031856478429206";
    public Map<User, Long> getLastTime = new HashMap<>();

    public static void start() {
        try {
            long start = System.currentTimeMillis();
            String token = System.getProperty("discord.token", "YOUR_DISCORD_BOT_TOKEN_HERE");
            if (token == null || token.equals("YOUR_DISCORD_BOT_TOKEN_HERE") || token.isEmpty()) {
                return;
            }
            bot = JDABuilder.createDefault(token);
            bot.disableCache(CacheFlag.MEMBER_OVERRIDES, CacheFlag.VOICE_STATE);
            bot.setBulkDeleteSplittingEnabled(false);
            bot.setCompression(Compression.NONE);
            bot.setActivity(Activity.playing("Phiên bản: " + ServerConstants.version));
            bot.enableIntents(GatewayIntent.MESSAGE_CONTENT);
            bot.addEventListeners(new DiscordAPI());
            botJDA = bot.build().awaitReady();
            Guild guild = botJDA.getGuildById(staffGuildServer);
            if (guild != null) {
                guild.upsertCommand("donate", "Nạp xu vàng cho người chơi")
                        .addOptions(new OptionData(OptionType.STRING, "op1", "Tên tài khoản", true),
                                new OptionData(OptionType.STRING, "op2", "Tên nhân vật", true),
                                new OptionData(OptionType.INTEGER, "op3", "Số tiền nạp", true))
                        .queue();
                guild.upsertCommand("bannick", "Khoá tài khoản người chơi ngay lập tức")
                        .addOptions(new OptionData(OptionType.STRING, "op1", "Tên tài khoản", true),
                                new OptionData(OptionType.STRING, "op2", "Lý do", true),
                                new OptionData(OptionType.INTEGER, "op3", "Thời hạn (Ngày)", true))
                        .queue();
                guild.upsertCommand("xubac", "Gửi tiền xu bạc (Vote Points) ngay lập tức")
                        .addOptions(new OptionData(OptionType.STRING, "op1", "Tên tài khoản", true),
                                new OptionData(OptionType.INTEGER, "op2", "Số tiền XU BẠC", true))
                        .queue();
                guild.upsertCommand("nx", "Gửi tiền NX ngay lập tức")
                        .addOptions(new OptionData(OptionType.STRING, "op1", "Tên tài khoản", true),
                                new OptionData(OptionType.INTEGER, "op2", "Số tiền NX", true))
                        .queue();
                guild.upsertCommand("giftitem", "Tặng quà item cho người chơi")
                        .addOptions(new OptionData(OptionType.STRING, "op1", "Tên nhân vật", true),
                                new OptionData(OptionType.INTEGER, "op2", "Item ID", true),
                                new OptionData(OptionType.INTEGER, "op3", "Số lượng", true))
                        .queue();
                guild.upsertCommand("giftmeso", "Tặng meso cho người chơi")
                        .addOptions(new OptionData(OptionType.STRING, "op1", "Tên nhân vật", true),
                                new OptionData(OptionType.INTEGER, "op2", "Số tiền meso", true))
                        .queue();
                guild.upsertCommand("giftrank", "Tặng quà cấp độ cho người chơi")
                        .addOptions(new OptionData(OptionType.STRING, "op1", "Tên nhân vật", true),
                                new OptionData(OptionType.INTEGER, "op2", "hạng cấp độ", true))
                        .queue();
                guild.upsertCommand("shutdown", "Đóng cửa máy chủ")
                        .addOptions(new OptionData(OptionType.INTEGER, "op1", "Số phút còn lại trước khi tắt máy chủ", true)).queue();
            }
            long total = System.currentTimeMillis() - start;
            System.out.printf("[Discord] Loaded Discord BOT in %dms%n", total);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static void send(String name, String s, String server) {
        if (!ServerConfig.DEBUG_MODE) {
            for (TextChannel ch : Objects.requireNonNull(botJDA.getGuildById(server)).getTextChannelsByName(name, true)) {
                try {
                    ch.sendMessage(s).queue();
                } catch (Exception ignored) {
                }
            }
        }
    }

    public static void deleteAllMessages(String name, String server) {
        if (!ServerConfig.DEBUG_MODE) {
            for (TextChannel ch : Objects.requireNonNull(botJDA.getGuildById(server)).getTextChannelsByName(name, true)) {
                ch.deleteMessageById(ch.getLatestMessageId()).queue();
            }
        }
    }

    // Send message without response handling
    public void sendMessage(User user, String content) {
        user.openPrivateChannel().flatMap(channel -> channel.sendMessage(content)).queue();
    }

    @Override
    public void onMessageReceived(@NotNull MessageReceivedEvent event) {
        if (event.getMessage().getAuthor().isBot()) {
            return;
        }
        if (event.getChannel().getName().equalsIgnoreCase("bot-spam")) {
            String messageReceived = event.getMessage().getContentRaw();
            if (messageReceived.startsWith("!donate")) {
                sendMessage(event.getMessage().getAuthor(), "Xin chào, bạn muốn gửi lệnh đóng góp từ MOMO đúng không? Vui lòng bấm !donate **<MÃ GIAO DỊCH>** nhé.");
                send("bot-spam", "~ @" + event.getMessage().getAuthor().getName() + " vui lòng kiểm tra tin nhắn trực tiếp của mình bạn nhé. :>", mainGuildServer);
            } else if (messageReceived.startsWith("!doipass")) {
                sendMessage(event.getMessage().getAuthor(), "Xin chào, bạn muốn đổi password tài khoản của bạn đúng không? Vui lòng bấm !doipass <tên tài khoản> <mật khẩu hiện tại> < mật khẩu mới>");
                send("bot-spam", "~ @" + event.getMessage().getAuthor().getName() + " vui lòng kiểm tra tin nhắn trực tiếp của mình bạn nhé. :>", mainGuildServer);
            } else if (messageReceived.startsWith("!online")) {
                EmbedBuilder eb = new EmbedBuilder();
                final int onlines = Server.get().getWorld().getChars().size() + Util.getRandom(30, 41);
                eb.addField("Việt Maple v214.1", "Player online: " + onlines, false);
                eb.addBlankField(false);
                final Duration diff = Duration.between(Server.startTime, LocalDateTime.now());
                eb.addField("\r\n\r\nServer running:",
                        diff.toDays() > 0
                                ? String.format("%d day(s) %d hour(s) %d minute(s) %d seconds", diff.toDays(), diff.toHoursPart(), diff.toMinutesPart(), diff.toSecondsPart())
                                : (diff.toHoursPart() > 0
                                ? String.format("%d hour(s) %d minute(s) %d seconds", diff.toHoursPart(), diff.toMinutesPart(), diff.toSecondsPart())
                                : (diff.toMinutesPart() > 0 ? String.format("%d minute(s) %d seconds", diff.toMinutesPart(), diff.toSecondsPart())
                                : String.format("%d seconds", diff.toSecondsPart()))), false);
                eb.setColor(Color.GREEN);
                LocalDateTime now = LocalDateTime.now();
                String time = now.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
                String day = now.format(DateTimeFormatter.ofPattern("dd"));
                String month = now.format(DateTimeFormatter.ofPattern("MMMM"));
                String year = now.format(DateTimeFormatter.ofPattern("yyyy"));
                eb.setFooter(String.format("%s, %s %s %s", time, day, month, year));
                eb.setThumbnail("https://cdn2.steamgriddb.com/grid/5ca15b56b207cea5903395718b794fec.png");
                event.getChannel().sendMessageEmbeds(eb.build()).queue();
            } else if (messageReceived.startsWith("!help") || messageReceived.startsWith("!giupdo")) {
                event.getChannel().sendMessage("**Việt Maple - Server Information**\r\n" +
                        "**-Version:** 214.1 GMS.\r\n" +
                        "**-Working jobs:** Adele, Hoyoung, Ark, Illium, Cadena...\r\n" +
                        "**-Party Quests:** Moon Bunny, Kerning City, Romeo and Juliet, Ride a Dragon, Protect Egypt, Alien Visit, Evolution System, Kenta in Danger, Pirate Lord, Cooking with Tangyoon, Dimension Invasion,...\r\n" +
                        "**-Bosses:** Zakum, Horntail, Cygnus, Pink Bean, Root Abyss, Hilla, Magnus, Gollux, Ranmaru, Root Abyss, Von Leon, Damien, Lucid, Will, Versus Hilla, Gloom.\r\n" +
                        "**-New Cash items in Cashshop** with free nx obtained from killing monsters.\r\n" +
                        "**-Custom Features:**\r\n" +
                        "1. Give gifts to all Guild members (even offline) when a character kills the Boss  (Easy to super hard) or Donate;\r\n" +
                        "2. Server located in Ha Noi, Vietnam;\r\n" +
                        "3. Daily Quest from Terri (Henesys) to buy Totem, Mastery Books, X2 vouchers;\r\n" +
                        "4. Hell channels from ch. 6 - 10 give more EXP, DROP and MESO;\r\n" +
                        "5. No V2W and FREE Auto Mob-aggro;\r\n" +
                        "6. DP can be obtained by mining gold chests which appears randomly in battle map or simply **donate**.\r\n" +
                        "**-Rate:** x" + ServerConfig.EXP_RATE + " EXP | x" + ServerConfig.DROP_RATE + " DROP | x" + ServerConfig.MESO_RATE + " EXP").queue();
            }
        } else if (event.getChannel().getName().equalsIgnoreCase("lệnh") && event.getMessage().getContentRaw().equalsIgnoreCase("!online")) {
            event.getMessage().delete().queue();
            OperatingSystemMXBean operatingSystemMXBean = (OperatingSystemMXBean) ManagementFactory.getOperatingSystemMXBean();
            long totalMemorySize = operatingSystemMXBean.getTotalMemorySize() / 1000000;
            long usedMemorySize = operatingSystemMXBean.getCommittedVirtualMemorySize() / 1000000;
            final Duration diff = Duration.between(Server.startTime, LocalDateTime.now());
            String s = "- RAM Usage: " + String.format("%,d", usedMemorySize) + "/" + String.format("%,d", totalMemorySize) + " MB.\r\n";
            s += "- Uptime: " + (diff.toDays() > 0
                    ? String.format("%d ngày %d giờ %d phút %d giây", diff.toDays(), diff.toHoursPart(), diff.toMinutesPart(), diff.toSecondsPart())
                    : (diff.toHoursPart() > 0
                    ? String.format("%d giờ %d phút %d giây", diff.toHoursPart(), diff.toMinutesPart(), diff.toSecondsPart())
                    : (diff.toMinutesPart() > 0 ? String.format("%d phút %d giây", diff.toMinutesPart(), diff.toSecondsPart())
                    : String.format("%d giây", diff.toSecondsPart())))) + "\r\n";
            s += "- Users: " + Server.get().getUsers().size() + " | ";
            for (net.swordie.ms.client.User user : Server.get().getUsers()) {
                s += String.format("%s (NX: %d; DP: %d); ", user.getName(), user.getMaplePoints(), user.getDonationPoints());
            }
            s += "\r\n";
            s += "- Clients: " + Server.get().getClients().size() + " | ";
            for (Client c : Server.get().getClients()) {
                s += c.getIP() + "; ";
            }
            s += "\r\n";
            s += "- Chars in World: " + Server.get().getWorld().getChars().size() + " | ";
            for (Char chr : Server.get().getWorld().getChars()) {
                s += String.format("%s (Lv. %d); ", chr.getName(), chr.getLevel());
            }
            send("lệnh", s, staffGuildServer);
        } else {
            String messageReceived = event.getMessage().getContentRaw();
            if (messageReceived.startsWith("!donate") || messageReceived.startsWith("!doipass")) {
                boolean notSpam = false;
                if (getLastTime.containsKey(event.getMessage().getAuthor())) {
                    if (System.currentTimeMillis() - getLastTime.get(event.getMessage().getAuthor()) >= 10000) {
                        getLastTime.put(event.getMessage().getAuthor(), System.currentTimeMillis());
                        notSpam = true;
                    }
                } else {
                    getLastTime.put(event.getMessage().getAuthor(), System.currentTimeMillis());
                    notSpam = true;
                }
                if (!notSpam) {
                    sendMessage(event.getMessage().getAuthor(), "Please try again in 10 seconds.");
                    return;
                }
            }
            if (messageReceived.startsWith("!donate")) {
                String tradecode = messageReceived.substring(8).replaceAll("\\s+", "");
                if (tradecode.length() == 11) {
                    send("log-donate", event.getMessage().getAuthor().getName() + " đã đặt lệnh nạp tiền với mã giao dịch là: **" + tradecode + "**.", staffGuildServer);
                    sendMessage(event.getMessage().getAuthor(), "Cảm ơn Bạn đã gửi lệnh đóng góp cho máy chủ Việt Maple với mã giao dịch là: **" + tradecode + "**.");
                } else {
                    sendMessage(event.getMessage().getAuthor(), "Vui lòng nhập lệnh như sau !donate <mã giao dịch>.");
                }
            } else if (messageReceived.startsWith("!doipass")) {
                String msg = messageReceived.substring(9);
                String username = msg.split(" ")[0];
                String password = msg.split(" ")[1];
                String newPassword = msg.split(" ")[2];
                net.swordie.ms.client.User user = net.swordie.ms.client.User.getUserFromSQLByName(username);
                if (user == null) {
                    sendMessage(event.getMessage().getAuthor(), "Tài khoản này chưa đăng ký hoặc không tồn tại.");
                } else {
                    if (user.getClientState() != Client.LOGOUT) {
                        sendMessage(event.getMessage().getAuthor(), "Vui lòng đăng xuất khỏi tài khoản để thực hiện đổi mật khẩu.");
                    } else {
                        boolean success;
                        String dbPassword = user.getPassword();
                        boolean hashed = Util.isStringBCrypt(dbPassword);
                        if (hashed) {
                            try {
                                success = BCrypt.checkpw(password, dbPassword);
                            } catch (Exception ignored) {
                                sendMessage(event.getMessage().getAuthor(), "Không thể kiểm tra mật khẩu hiện tại của bạn.");
                                return;
                            }
                        } else {
                            success = password.equals(dbPassword);
                        }
                        if (!success) {
                            sendMessage(event.getMessage().getAuthor(), "Mật khẩu hiện tại của bạn không đúng.");
                        } else {
                            if (password.equals(newPassword)) {
                                sendMessage(event.getMessage().getAuthor(), "Mật khẩu hiện tại của bạn không được giống mật khẩu mới.");
                            } else {
                                Pattern p = Pattern.compile("[^a-z0-9 ]", Pattern.CASE_INSENSITIVE);
                                Matcher passwordMatcher = p.matcher(password);
                                boolean isPasswordContains = passwordMatcher.find();
                                if (isPasswordContains) {
                                    sendMessage(event.getMessage().getAuthor(), "Bạn không thể sử dụng mật khẩu mới này.");
                                } else {
                                    hashed = Util.isStringBCrypt(newPassword);
                                    if (!hashed) {
                                        user.setPassword(BCrypt.hashpw(newPassword, BCrypt.gensalt(ServerConstants.BCRYPT_ITERATIONS)));
                                    }
                                    user.saveToSQL(false);
                                    sendMessage(event.getMessage().getAuthor(), "Bạn đã đổi mật khẩu thành công.");
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @Override
    public void onSlashCommandInteraction(@NotNull SlashCommandInteractionEvent event) {
        if (!event.getChannel().getName().equals("lệnh")) {
            event.reply("Lệnh chỉ được sử dụng trong kênh -Lệnh-.").queue();
            return;
        }
        if (event.getName().equals("donate")) {
            donate(event);
        } else if (event.getName().equals("bannick")) {
            bannick(event);
        } else if (event.getName().equals("xubac")) {
            xubac(event);
        } else if (event.getName().equals("nx")) {
            nx(event);
        } else if (event.getName().equals("giftitem")) {
            giftItem(event);
        } else if (event.getName().equals("giftmeso")) {
            giftMeso(event);
        } else if (event.getName().equals("giftrank")) {
            giftRank(event);
        } else if (event.getName().equals("shutdown")) {
            shutDown(event);
        }
    }

    public void sendGuildReward(Char chr, int type) {
        if (chr.getGuildID() != 0) {
            World world = Server.get().getWorld();
            net.swordie.ms.client.social.Guild.Guild guild;
            if (world.getCharById(chr.getId()) != null) {
                guild = chr.getGuild();
            } else {
                guild = net.swordie.ms.client.social.Guild.Guild.getGuildByGuildID(chr.getGuildID());
            }
            for (GuildMember gm : guild.getMembers()) {
                Char gmChar = world.getCharById(gm.getCharID());
                if (gmChar != null) {
                    gmChar.sendGuildReward(chr.getName(), guild.getName(), type);
                    gmChar.sendPacketRewards();
                } else {
                    gmChar = Char.getCharDataByID(gm.getCharID());
                    if (gmChar != null) {
                        gmChar.initRewardSystem();
                        gmChar.sendGuildReward(chr.getName(), guild.getName(), type);
                    }
                }
            }
        }
    }

    public static int getGuildRewardGrade(int donatePoints) {
        donatePoints = EventConstants.DONATION_POINT_EVENT ? donatePoints / 2 : donatePoints;
        if (donatePoints < 100000) { // < 100,000
            return 1;
        } else if (donatePoints < 500000) { // 100,000 - 500,000
            return 2;
        } else if (donatePoints < 1000000) { // 500,000 - 1,000,000
            return 3;
        } else if (donatePoints < 2000000) { // 1,000,000 - 2,000,000
            return 4;
        } else { // > 2,000,000
            return 5;
        }
    }

    private void donate(@NotNull SlashCommandInteractionEvent event) {
        OptionMapping op1 = event.getOption("op1");
        OptionMapping op2 = event.getOption("op2");
        OptionMapping op3 = event.getOption("op3");
        if (op1 == null || op2 == null || op3 == null) {
            event.reply("Vui lòng nhập đúng lệnh /donate <Tên tài khoản> <Tên nhân vật> <Số lượng tiền nạp>").queue();
            return;
        }
        String userName = op1.getAsString();
        String characterName = op2.getAsString();
        int donatePoint = Integer.parseInt(op3.getAsString());
        net.swordie.ms.client.User user = Server.get().getUsers().stream().filter(u -> u.getName().equalsIgnoreCase(userName)).findAny().orElse(null);
        Char chr = Server.get().getWorld().getCharByName(characterName);
        int grade = getGuildRewardGrade(donatePoint);
        if (user == null) {
            user = net.swordie.ms.client.User.getUserFromSQLByName(userName);
            if (user == null) {
                event.reply("Không đúng tên tài khoản hoặc tài khoản không tồn tại.").queue();
                return;
            }
            if (chr == null) {
                chr = Char.getCharDataByName(characterName);
                if (chr == null) {
                    event.reply("Không đúng tên nhân vật hoặc nhân vật không tồn tại.").queue();
                    return;
                }
            }
            if (donatePoint > 0) {
                try {
                    user.addDonationPoint(EventConstants.DONATION_POINT_EVENT ? donatePoint * 2 : donatePoint);
                    user.updateUserDonationPointToSQL();
                } catch (Exception e) {
                    event.reply("Không thể gửi " + Util.getNumberFormat(donatePoint) + " xu vàng đến tài khoản " + user.getName()).queue();
                    event.reply(e.toString()).queue();
                    return;
                }
                if (grade != 0) {
                    event.reply(String.format("[%s] Tài khoản %s đã được nạp %s xu vàng và Bang hội của nhân vật %s nhận được rương cấp %s. Tổng điểm xu vàng: %s",
                            EventConstants.DONATION_POINT_EVENT ? "X2 NẠP" : "NẠP BÌNH THƯỜNG", user.getName(), Util.getNumberFormat(donatePoint), chr.getName(), grade == 5 ? "S" : grade == 4 ? "A" : "B", Util.getNumberFormat(user.getDonationPoints()))).queue();
                } else {
                    event.reply(String.format("[%s] Tài khoản %s đã được nạp %s xu vàng. Tổng điểm xu vàng: %s",
                            EventConstants.DONATION_POINT_EVENT ? "X2 NẠP" : "NẠP BÌNH THƯỜNG", user.getName(), Util.getNumberFormat(donatePoint), Util.getNumberFormat(user.getDonationPoints()))).queue();
                }
                sendGuildReward(chr, grade);
            } else if (donatePoint < 0) {
                try {
                    user.deductDonationPoints(donatePoint);
                    user.updateUserDonationPointToSQL();
                } catch (Exception e) {
                    event.reply("Không thể gửi " + donatePoint + " xu vàng đến tài khoản " + user.getName()).queue();
                    event.reply(e.toString()).queue();
                    return;
                }
                event.reply(String.format("Tài khoản %s đã bị rút %s xu vàng. Tổng điểm xu vàng: %s",
                        user.getName(), Util.getNumberFormat(donatePoint), Util.getNumberFormat(user.getDonationPoints()))).queue();
            }
        } else {
            if (chr == null) {
                chr = Char.getCharDataByName(characterName);
                if (chr == null) {
                    event.reply("Không đúng tên nhân vật hoặc nhân vật không tồn tại.").queue();
                    return;
                }
            }
            if (donatePoint > 0) {
                try {
                    user.addDonationPoint(EventConstants.DONATION_POINT_EVENT ? donatePoint * 2 : donatePoint);
                    user.updateUserDonationPointToSQL();
                } catch (Exception e) {
                    event.reply("Không thể gửi " + donatePoint + " xu vàng đến tài khoản " + user.getName()).queue();
                    event.reply(e.toString()).queue();
                    return;
                }
                if (grade != 0) {
                    event.reply(String.format("[%s] Tài khoản %s đã được nạp %s xu vàng và Bang hội của nhân vật %s nhận được rương cấp %s. Tổng điểm xu vàng: %s",
                            EventConstants.DONATION_POINT_EVENT ? "X2 NẠP" : "NẠP BÌNH THƯỜNG", user.getName(), Util.getNumberFormat(donatePoint), chr.getName(), grade == 5 ? "S" : grade == 4 ? "A" : "B", Util.getNumberFormat(user.getDonationPoints()))).queue();
                } else {
                    event.reply(String.format("[%s] Tài khoản %s đã được nạp %s xu vàng. Tổng điểm xu vàng: %s",
                            EventConstants.DONATION_POINT_EVENT ? "X2 NẠP" : "NẠP BÌNH THƯỜNG", user.getName(), Util.getNumberFormat(donatePoint), Util.getNumberFormat(user.getDonationPoints()))).queue();
                }
                sendGuildReward(chr, grade);
            } else if (donatePoint < 0) {
                try {
                    user.deductDonationPoints(donatePoint);
                    user.updateUserDonationPointToSQL();
                } catch (Exception e) {
                    event.reply("Không thể gửi " + donatePoint + " xu vàng đến tài khoản " + user.getName()).queue();
                    event.reply(e.toString()).queue();
                    return;
                }
                event.reply(String.format("Tài khoản %s đã bị rút %s xu vàng. Tổng điểm xu vàng: %s", user.getName(), Util.getNumberFormat(donatePoint), Util.getNumberFormat(user.getDonationPoints()))).queue();
            }
        }
    }

    private void bannick(@NotNull SlashCommandInteractionEvent event) {
        OptionMapping op1 = event.getOption("op1");
        OptionMapping op2 = event.getOption("op2");
        OptionMapping op3 = event.getOption("op3");
        if (op1 == null || op2 == null || op3 == null) {
            event.reply("Vui lòng nhập đúng lệnh /ban <Tên tài khoản> <Lý do> <Số ngày>").queue();
            return;
        }
        String name = op1.getAsString();
        String reason = op2.getAsString();
        int days = Integer.parseInt(op3.getAsString());
        net.swordie.ms.client.User banUser = Server.get().getUsers().stream().filter(u -> u.getName().equals(name)).findAny().orElse(null);
        if (banUser == null) {
            banUser = net.swordie.ms.client.User.getUserFromSQLByName(name);
            if (banUser == null) {
                event.reply("Không đúng tên tài khoản hoặc tài khoản không tồn tại.").queue();
                return;
            }
            LocalDateTime banDate = LocalDateTime.now().plusDays(days);
            try {
                banUser.setBanExpireDate(FileTime.fromDate(banDate));
                banUser.setBanReason(reason);
                banUser.saveToSQL(false);
                BannedMachines.addBannedMachine(banUser.getMachineID());
                event.reply(String.format("Tài khoản %s đã bị khoá tài khoản bởi Lý do: %s. Số ngày bị khoá tài khoản: %d", name, reason, days)).queue();
                send("banned", String.format("Account ||%s|| have been banned with reason: %s for %d day(s).", name, reason, days), mainGuildServer);
            } catch (Exception e) {
                event.reply("Không thể khoá tài khoản " + banUser.getName()).queue();
            }
        } else {
            LocalDateTime banDate = LocalDateTime.now().plusDays(days);
            try {
                if (banUser.getCurrentChr() != null) {
                    Char player = Server.get().getWorld().getCharByName(banUser.getCurrentChr().getName());
                    if (player != null) {
                        player.getClient().close();
                    }
                }
                event.reply(String.format("Tài khoản %s đã bị khoá tài khoản bởi Lý do: %s. Số ngày bị khoá tài khoản: %d", name, reason, days)).queue();
                send("banned", String.format("Account ||%s|| have been banned with reason: %s for %d day(s).", name, reason, days), mainGuildServer);
            } catch (Exception e) {
                event.reply("Không thể khoá tài khoản " + banUser.getName()).queue();
            } finally {
                banUser.setBanExpireDate(FileTime.fromDate(banDate));
                banUser.setBanReason(reason);
                banUser.saveToSQL(false);
                BannedMachines.addBannedMachine(banUser.getMachineID());
            }
        }
    }

    private void xubac(@NotNull SlashCommandInteractionEvent event) {
        OptionMapping op1 = event.getOption("op1");
        OptionMapping op2 = event.getOption("op2");
        if (op1 == null || op2 == null) {
            event.reply("Vui lòng nhập đúng lệnh /xubac <Tên tài khoản> <Số tiền XU BẠC>").queue();
            return;
        }
        String name = op1.getAsString();
        int xubac = Integer.parseInt(op2.getAsString());
        net.swordie.ms.client.User user = Server.get().getUsers().stream().filter(u -> u.getName().equals(name)).findAny().orElse(null);
        if (user == null) {
            user = net.swordie.ms.client.User.getUserFromSQLByName(name);
            if (user == null) {
                event.reply("Không đúng tên tài khoản hoặc tài khoản không tồn tại.").queue();
                return;
            }
            try {
                user.setVotePoints(user.getVotePoints() + xubac);
                user.updateUserVotePointToSQL();
            } catch (Exception e) {
                event.reply("Không thể gửi " + xubac + " xu bạc cho tài khoản " + user.getName()).queue();
                return;
            }
            if (xubac > 0) {
                event.reply(String.format("Tài khoản %s đã được nạp %s xu bạc. Tổng điểm xu bạc: %d", user.getName(), xubac, user.getVotePoints())).queue();
            } else if (xubac < 0) {
                event.reply(String.format("Tài khoản %s đã bị rút %s xu bạc. Tổng điểm xu bạc: %d", user.getName(), xubac, user.getVotePoints())).queue();
            }
        } else {
            try {
                user.setVotePoints(user.getVotePoints() + xubac);
                user.updateUserVotePointToSQL();
            } catch (Exception e) {
                event.reply("Không thể gửi " + xubac + " xu vàng đến tài khoản " + user.getName()).queue();
                return;
            }
            if (xubac > 0) {
                event.reply(String.format("Tài khoản %s đã được nạp %s xu bạc. Tổng điểm xu bạc: %d", user.getName(), xubac, user.getVotePoints())).queue();
            } else if (xubac < 0) {
                event.reply(String.format("Tài khoản %s đã bị rút %s xu bạc. Tổng điểm xu bạc: %d", user.getName(), xubac, user.getVotePoints())).queue();
            }
        }
    }

    private void nx(@NotNull SlashCommandInteractionEvent event) {
        OptionMapping op1 = event.getOption("op1");
        OptionMapping op2 = event.getOption("op2");
        if (op1 == null || op2 == null) {
            event.reply("Vui lòng nhập đúng lệnh /nx <Tên tài khoản> <Số tiền NX>").queue();
            return;
        }
        String name = op1.getAsString();
        int nx = Integer.parseInt(op2.getAsString());
        net.swordie.ms.client.User user = Server.get().getUsers().stream().filter(u -> u.getName().equals(name)).findAny().orElse(null);
        if (user == null) {
            user = net.swordie.ms.client.User.getUserFromSQLByName(name);
            if (user == null) {
                event.reply("Không đúng tên tài khoản hoặc tài khoản không tồn tại.").queue();
                return;
            }
            try {
                user.addMaplePoints(nx);
            } catch (Exception e) {
                event.reply("Không thể gửi " + nx + " NX cho tài khoản " + user.getName()).queue();
                return;
            }
            if (nx > 0) {
                event.reply(String.format("Tài khoản %s đã được nạp %s NX. Tổng NX: %d", user.getName(), nx, user.getMaplePoints())).queue();
            } else if (nx < 0) {
                event.reply(String.format("Tài khoản %s đã bị rút %s NX. Tổng NX: %d", user.getName(), nx, user.getMaplePoints())).queue();
            }
        } else {
            try {
                user.addMaplePoints(nx);
            } catch (Exception e) {
                event.reply("Không thể gửi " + nx + " NX đến tài khoản " + user.getName()).queue();
                event.reply(e.toString()).queue();
                return;
            }
            if (nx > 0) {
                event.reply(String.format("Tài khoản %s đã được nạp %s NX. Tổng NX: %d", user.getName(), nx, user.getMaplePoints())).queue();
            } else if (nx < 0) {
                event.reply(String.format("Tài khoản %s đã bị rút %s NX. Tổng NX: %d", user.getName(), nx, user.getMaplePoints())).queue();
            }
        }
    }

    private void giftItem(@NotNull SlashCommandInteractionEvent event) {
        OptionMapping op1 = event.getOption("op1");
        OptionMapping op2 = event.getOption("op2");
        OptionMapping op3 = event.getOption("op3");
        if (op1 == null || op2 == null || op3 == null) {
            event.reply("Vui lòng nhập đúng lệnh /giftitem <Tên nhân vật> <Item ID> <Số lượng>").queue();
            return;
        }
        String characterName = op1.getAsString();
        int itemID = Integer.parseInt(op2.getAsString());
        int quantity = Integer.parseInt(op3.getAsString());
        World world = Server.get().getWorld();
        Char chr = world.getCharByName(characterName);
        if (chr != null) {
            try {
                chr.sendSpecialRewardToChar(itemID, quantity, 0);
                chr.sendPacketRewards();
            } catch (Exception e) {
                event.reply("Vui lòng nhập đúng lệnh /giftitem <Tên nhân vật> <Item ID> <Số lượng>").queue();
            } finally {
                event.reply(String.format("Thành công gửi quà đến người chơi %s, ItemID: %d, Số lượng: %d", characterName, itemID, quantity)).queue();
            }
        } else {
            chr = Char.getCharDataByName(characterName);
            if (chr != null) {
                try {
                    chr.initRewardSystem();
                    chr.sendSpecialRewardToChar(itemID, quantity, 0);
                } catch (Exception e) {
                    event.reply("Vui lòng nhập đúng lệnh /giftitem <Tên nhân vật> <Item ID> <Số lượng>").queue();
                } finally {
                    event.reply(String.format("Thành công gửi quà đến người chơi %s, ItemID: %d, Số lượng: %d", characterName, itemID, quantity)).queue();
                }
            } else {
                event.reply("Không đúng tên nhân vật hoặc nhân vật không tồn tại.").queue();
            }
        }
    }

    private void giftMeso(@NotNull SlashCommandInteractionEvent event) {
        OptionMapping op1 = event.getOption("op1");
        OptionMapping op2 = event.getOption("op2");
        if (op1 == null || op2 == null) {
            event.reply("Vui lòng nhập đúng lệnh /giftmeso <Tên nhân vật> <Số tiền meso>").queue();
            return;
        }
        String characterName = op1.getAsString();
        int meso = Integer.parseInt(op2.getAsString());
        World world = Server.get().getWorld();
        Char chr = world.getCharByName(characterName);
        if (chr != null) {
            try {
                chr.sendSpecialRewardToChar(0, 0, meso);
                chr.sendPacketRewards();
            } catch (Exception e) {
                event.reply("Vui lòng nhập đúng lệnh /giftmeso <Tên nhân vật> <Số tiền meso>").queue();
            } finally {
                event.reply(String.format("Thành công gửi quà đến người chơi %s, Số tiền meso: %d", characterName, meso)).queue();
            }
        } else {
            chr = Char.getCharDataByName(characterName);
            if (chr != null) {
                try {
                    chr.initRewardSystem();
                    chr.sendSpecialRewardToChar(0, 0, meso);
                } catch (Exception e) {
                    event.reply("Vui lòng nhập đúng lệnh /giftmeso <Tên nhân vật> <Số tiền meso>").queue();
                } finally {
                    event.reply(String.format("Thành công gửi quà đến người chơi %s, Số tiền meso: %d", characterName, meso)).queue();
                }
            } else {
                event.reply("Không đúng tên nhân vật hoặc nhân vật không tồn tại.").queue();
            }
        }
    }

    private void giftRank(@NotNull SlashCommandInteractionEvent event) {
        OptionMapping op1 = event.getOption("op1");
        OptionMapping op2 = event.getOption("op2");
        if (op1 == null || op2 == null) {
            event.reply("Vui lòng nhập đúng lệnh /giftrank <Tên nhân vật> <Hạng cấp độ>").queue();
            return;
        }
        String characterName = op1.getAsString();
        int rank = Integer.parseInt(op2.getAsString());
        World world = Server.get().getWorld();
        Char chr = world.getCharByName(characterName);
        if (chr != null) {
            try {
                switch (rank) {
                    case 1:
                        chr.sendRewardToChar(ItemConstants.VIOLET_CUBE, 20, 0, "Chúc möng b¢n «» «¢t h¢ng 1 trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                        chr.sendRewardToChar(ItemConstants.BONUS_POTENTIAL_CUBE, 50, 0, "Chúc möng b¢n «» «¢t h¢ng 1 trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                        chr.sendRewardToChar(0, 0, 500000000, "Chúc mừng bạn đã đạt hạng 1 trong tính năng đua cấp độ hàng tháng!", 10);
                        break;
                    case 2:
                        chr.sendRewardToChar(ItemConstants.VIOLET_CUBE, 15, 0, "Chúc möng b¢n «» «¢t h¢ng 2 trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                        chr.sendRewardToChar(ItemConstants.BONUS_POTENTIAL_CUBE, 25, 0, "Chúc möng b¢n «» «¢t h¢ng 2 trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                        chr.sendRewardToChar(0, 0, 250000000, "Chúc möng b¢n «» «¢t h¢ng 2 trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                        break;
                    case 3:
                        chr.sendRewardToChar(ItemConstants.VIOLET_CUBE, 10, 0, "Chúc möng b¢n «» «¢t h¢ng 3 trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                        chr.sendRewardToChar(ItemConstants.BONUS_POTENTIAL_CUBE, 20, 0, "Chúc möng b¢n «» «¢t h¢ng 3 trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                        chr.sendRewardToChar(0, 0, 100000000, "Chúc möng b¢n «» «¢t h¢ng 3 trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                        break;
                    case 4:
                    case 5:
                        chr.sendRewardToChar(ItemConstants.VIOLET_CUBE, 5, 0, "Chúc möng b¢n «» «¢t h¢ng " + rank + " trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                        chr.sendRewardToChar(ItemConstants.BONUS_POTENTIAL_CUBE, 10, 0, "Chúc möng b¢n «» «¢t h¢ng " + rank + " trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                        chr.sendRewardToChar(0, 0, 50000000, "Chúc möng b¢n «» «¢t h¢ng " + rank + " trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                        break;
                }
                chr.sendPacketRewards();
            } catch (Exception e) {
                event.reply("Vui lòng nhập đúng lệnh /giftrank <Tên nhân vật> <Hạng cấp độ>").queue();
            } finally {
                event.reply(String.format("Thành công gửi quà đến người chơi %s, Hạng cấp độ: %d", characterName, rank)).queue();
            }
        } else {
            chr = Char.getCharDataByName(characterName);
            if (chr != null) {
                try {
                    chr.initRewardSystem();
                    switch (rank) {
                        case 1:
                            chr.sendRewardToChar(ItemConstants.VIOLET_CUBE, 20, 0, "Chúc möng b¢n «» «¢t h¢ng 1 trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                            chr.sendRewardToChar(ItemConstants.BONUS_POTENTIAL_CUBE, 50, 0, "Chúc möng b¢n «» «¢t h¢ng 1 trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                            chr.sendRewardToChar(0, 0, 500000000, "Chúc mừng bạn đã đạt hạng 1 trong tính năng đua cấp độ hàng tháng!", 10);
                            break;
                        case 2:
                            chr.sendRewardToChar(ItemConstants.VIOLET_CUBE, 15, 0, "Chúc möng b¢n «» «¢t h¢ng 2 trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                            chr.sendRewardToChar(ItemConstants.BONUS_POTENTIAL_CUBE, 25, 0, "Chúc möng b¢n «» «¢t h¢ng 2 trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                            chr.sendRewardToChar(0, 0, 250000000, "Chúc möng b¢n «» «¢t h¢ng 2 trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                            break;
                        case 3:
                            chr.sendRewardToChar(ItemConstants.VIOLET_CUBE, 10, 0, "Chúc möng b¢n «» «¢t h¢ng 3 trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                            chr.sendRewardToChar(ItemConstants.BONUS_POTENTIAL_CUBE, 20, 0, "Chúc möng b¢n «» «¢t h¢ng 3 trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                            chr.sendRewardToChar(0, 0, 100000000, "Chúc möng b¢n «» «¢t h¢ng 3 trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                            break;
                        case 4:
                        case 5:
                            chr.sendRewardToChar(ItemConstants.VIOLET_CUBE, 5, 0, "Chúc möng b¢n «» «¢t h¢ng " + rank + " trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                            chr.sendRewardToChar(ItemConstants.BONUS_POTENTIAL_CUBE, 10, 0, "Chúc möng b¢n «» «¢t h¢ng " + rank + " trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                            chr.sendRewardToChar(0, 0, 50000000, "Chúc möng b¢n «» «¢t h¢ng " + rank + " trong tính n£ng «ua c¬p «Ø hàng tháng!", 10);
                            break;
                    }
                } catch (Exception e) {
                    event.reply("Vui lòng nhập đúng lệnh /giftrank <Tên nhân vật> <Hạng cấp độ>").queue();
                } finally {
                    event.reply(String.format("Thành công gửi quà đến người chơi %s, Hạng cấp độ: %d", characterName, rank)).queue();
                }
            } else {
                event.reply("Không đúng tên nhân vật hoặc nhân vật không tồn tại.").queue();
            }
        }
    }

    private void shutDown(@NotNull SlashCommandInteractionEvent event) {
        OptionMapping op1 = event.getOption("op1");
        if (op1 == null) {
            event.reply("Vui lòng nhập đúng lệnh /shutdown <Số thời gian còn lại trước khi tắt máy chủ>").queue();
            return;
        }
        int timeInput = Integer.parseInt(op1.getAsString());
        int time = 60000; // default == 1 minute
        time *= timeInput;
        ServerConfig.ADMIN_LOGIN = true;
        for (Client c : Server.get().getClients()) {
            if (c != null) {
                c.close();
            }
        }
        event.reply("Thành công đặt lệnh tắt máy chủ trong " + timeInput + " phút.").queue();
    }
}
