function bodyLoaded(revisit)
{
   isChr();
   if ( !g_soundsLoaded )
   {
      setTimeout(bodyLoaded, 500);
      return;
   }

   var bg    = document.getElementById("splash_screen");
   var title = document.getElementById("title");
   g_context.drawImage(bg,0,0);
   g_context.drawImage(title,0,0);

   g_context.fillStyle = "yellow";
   g_context.fillText("使用方向键控制移动,Z键发射子弹",300,360);
   g_context.fillText("P键暂停游戏",300,380);

   if ( g_highScore != undefined )
   {
      g_context.fillText("最后一次游戏得分: " + g_highScore, 370, 30);
   }

   // render the two buttons on the main menu and the ctrls checkbox
   g_context.fillStyle = "black";
   g_context.fillRect(400,283,20,20);  //ctrls checkbox

   g_context.fillRect(50,300,150,30);
   g_context.strokeStyle = "gray";
   g_context.strokeRect(50,300,150,30);
   g_context.fillStyle = "gray";
   g_context.fillText("新游戏",98,322);

   g_context.fillStyle = "black";
   g_context.fillRect(50,340,150,30);
   g_context.strokeStyle = "gray";
   g_context.strokeRect(50,340,150,30);
   g_context.fillStyle = "gray";
   g_context.fillText("介绍",100,361);

   g_context.strokeRect(400,283,20,20);
   g_context.fillText("在屏幕上显示按键",425,300);
   if ( g_onscreenControls )
   {
      g_context.strokeStyle = "gray";
      g_context.beginPath();
      g_context.moveTo(400,283);
      g_context.lineTo(420,303);
      g_context.stroke();
      g_context.beginPath();
      g_context.moveTo(420,283);
      g_context.lineTo(400,303);
      g_context.stroke();
   }

   g_gameState = "splash";

   if ( g_dinkSound == null )
      g_dinkSound = new Sound("dink",4);

   if ( revisit == undefined )
   {
      g_canvas.addEventListener('mousemove', ev_mousemove, false);
      g_canvas.addEventListener('mousedown', ev_mousedown, false);
   }
}

function itemLoaded(item)
{
   if (g_context == undefined)
   {
      if ( !initCanvas() )
      {
         dbg("Critical error initializing canvas.", false);
         return;
      }
   }

   if (item.id == "splash_screen")
   {
      g_context.drawImage(item,0,0);
      g_context.strokeRect(35,220, 500,40);
   }
   else if (item.id == "loading")
   {
      g_context.drawImage(item,0,0);
      g_context.fillStyle = "black";
      g_context.fillRect(400,300, 300,30);
      g_context.fillStyle = "green";
      g_context.fillText("加载游戏音乐", 400,320);
      g_soundsLoaded= false;
      loadGameSounds();
   }

   g_itemsLoaded++;

   g_context.fillStyle = "black";
   g_context.fillRect(400,300, 300,30);
   g_context.fillStyle = "green";
   g_context.fillText(item.id, 400,320);

   var percent = g_itemsLoaded / g_totalItems;
   var width = Math.floor(percent * 500);
   g_context.fillRect(35,220, width,40);
}

function initCanvas()
{
      g_canvas = document.getElementById('theCanvas');

      if (!g_canvas.getContext)
      {
         return false;
      }

      g_context = g_canvas.getContext('2d');
      g_context.font = "14pt Helvetica";
      g_context.lineWidth = 2;
      g_context.strokeStyle = "green";

      g_totalItems  = 46;
      g_itemsLoaded = 0;

      g_onscreenControls = false;
 
      return true;
}
