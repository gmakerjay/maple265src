//成長秘藥直達200
let maxLevel=200
if(stage.getLevel()>=maxLevel){
    stage.addPopupSay(9110002, 5000, "角色已經超過200等，無法使用", "", false);
    stage.dropMessage(6, "角色已經超過200等，無法使用。");
}else{
    while(stage.getLevel()<maxLevel){
        stage.levelUp();
    }
    ctx.consume();
}
