package net.swordie.ms.world.partyquest;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.enums.social.Party.PartyQuestType;

public class PartyQuestManager {

    private PartyQuest partyQuest = null;

    public PartyQuest getPartyQuest() {
        return partyQuest;
    }

    public void setPartyQuest(PartyQuest partyQuest) {
        this.partyQuest = partyQuest;
    }

    private PartyQuest getPartyQuestByType(Char chr, PartyQuestType partyQuestType) {
        return switch (partyQuestType) {
            case MOON_BUNNY -> new MoonBunny(chr);
            case FIRST_TIME_TOGETHER -> new FirstTimeTogether(chr);
            case LUDIBRIUM -> new Ludibrium(chr);
            case TANGYOON_COOKING -> new TangyoonCooking(chr);
            case DIMENSION_INVASION -> new DimensionInvasion(chr);
            case NETT_PYRAMID -> new DefenseEvent(chr);
            case ESCAPE -> new Escape(chr);
            case HUNGRY_MUTO -> new HungryMuto(chr);
            case XERXES_CHRYSE -> new XerxesInChryse(chr);
            case LORD_PIRATE -> new LordPirate(chr);
            case DRAGON_RIDER -> new DragonRider(chr);
            case KENTA_IN_DANGER -> new KentaInDanger(chr);
            case ROMEO -> new Romeo(chr);
            case JULIET -> new Juliet(chr);
            case ALIEN_VISITOR -> new AlienVisitor(chr);
        };
    }

    private boolean matches(PartyQuest pq, PartyQuestType type) {
        if (pq == null || type == null) return false;
        return switch (type) {
            case MOON_BUNNY -> pq instanceof MoonBunny;
            case FIRST_TIME_TOGETHER -> pq instanceof FirstTimeTogether;
            case LUDIBRIUM -> pq instanceof Ludibrium;
            case TANGYOON_COOKING -> pq instanceof TangyoonCooking;
            case DIMENSION_INVASION -> pq instanceof DimensionInvasion;
            case NETT_PYRAMID -> pq instanceof DefenseEvent;
            case ESCAPE -> pq instanceof Escape;
            case HUNGRY_MUTO -> pq instanceof HungryMuto;
            case XERXES_CHRYSE -> pq instanceof XerxesInChryse;
            case LORD_PIRATE -> pq instanceof LordPirate;
            case DRAGON_RIDER -> pq instanceof DragonRider;
            case KENTA_IN_DANGER -> pq instanceof KentaInDanger;
            case ROMEO -> pq instanceof Romeo;
            case JULIET -> pq instanceof Juliet;
            case ALIEN_VISITOR -> pq instanceof AlienVisitor;
        };
    }

    public void start(Char chr, PartyQuestType partyQuestType, byte typeEnter) {
        if (typeEnter == 0 || this.partyQuest == null || !matches(this.partyQuest, partyQuestType)) {
            this.partyQuest = getPartyQuestByType(chr, partyQuestType);
        }
        switch (typeEnter) {
            case 0 -> {
                if (partyQuest != null) {
                    partyQuest.start();
                }
            }
            case 1 -> {
                if (partyQuest != null) {
                    partyQuest.exit();
                }
            }
            case 2 -> {
                if (partyQuest != null) {
                    partyQuest.event();
                }
            }
        }
    }
}
