/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * 
 */

let event = stage.getEvent();

if (event != null) {
    let members = event.getVariable("members");
    for (let i in members) {
        members[i].changeMap(920010100, 0);
    }
}