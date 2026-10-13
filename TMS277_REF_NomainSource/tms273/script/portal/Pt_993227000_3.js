// Created by MetaMS
// ID:[993227000]
// MapName:<首領的領地>
// <首領的領地>

let event = stage.getEvent("event_blast_frozen");
if (event != null) {
        let next = event.getVariable("Field_4");
        usr.playPortalSE();
        stage.changeMap(next, 1);
        /*
        stage.changeMap(993227400, 1);
        stage.changeMap(993227500, 1);
         */
}