// Created by MetaMS
// ID:[993227300]
// MapName:<枯萎的樹林>
// <枯萎的樹林>

let event = stage.getEvent("event_blast_frozen");
if (event != null) {
        let next = event.getVariable("Field_5");
        usr.playPortalSE();
        stage.changeMap(next, 1);
        /*
        stage.changeMap(993227600, 1);
        stage.changeMap(993227700, 1);
        */
}