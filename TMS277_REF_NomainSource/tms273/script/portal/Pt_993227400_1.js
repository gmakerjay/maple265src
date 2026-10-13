// Created by MetaMS
// ID:[993227400]
// MapName:<充滿視線的廢棄礦坑>
// <充滿視線的廢棄礦坑>

let event = stage.getEvent("event_blast_frozen");
if (event != null) {
        let next = event.getVariable("Field_2");
        usr.playPortalSE();
        stage.changeMap(next, next == 993227000 ? 5 : 3);
        /*
        stage.changeMap(993227000, 5);
        stage.changeMap(993227100, 3);
         */
}