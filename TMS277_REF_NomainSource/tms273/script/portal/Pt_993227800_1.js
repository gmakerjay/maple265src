// Created by MetaMS
// ID:[993227800]
// MapName:<邪樹的祭壇>
// <邪樹的祭壇>

let event = stage.getEvent("event_blast_frozen");
if (event != null) {
        let next = event.getVariable("Field_5");
        usr.playPortalSE();
        stage.changeMap(next, 3);
        /*
        stage.changeMap(993227600, 3);
        stage.changeMap(993227700, 3);
         */
}

