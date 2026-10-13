

let stat = parseInt((map.getId() - 910340000) / 100);
let clear = stage.getEvent().getVariable(stat + "stageclear");
if (clear != null && clear) {
    stage.changeMap(map.getId() + 100, 0);
}