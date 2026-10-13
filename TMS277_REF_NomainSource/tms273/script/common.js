// script/common.js
/*
   !在這個腳本裡面，只允許新增 function 類型的方法，請勿直接撰寫任何會立即執行的腳本內容。
 */


/*
 我們先定義一個名為 demo 的 function
 接下來您就可以在其他非 event 類型的腳本中進行呼叫，直接使用 demo(); 來呼叫即可。
 */
function demo() {
        npc.say("This is demo! My Id:" + stage.getCharacterId());
}