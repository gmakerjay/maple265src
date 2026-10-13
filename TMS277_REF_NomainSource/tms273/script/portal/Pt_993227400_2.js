// Created by MetaMS
// ID:[993227400]
// MapName:<充滿視線的廢棄礦坑>
// <充滿視線的廢棄礦坑>

let event = stage.getEvent("event_blast_frozen");
if (event != null) {
        let next = event.getVariable("Field_5");
        usr.playPortalSE();
        stage.changeMap(next, 2);
        /*
        stage.changeMap(993227600, 2);
        stage.changeMap(993227700, 2);
         */
}