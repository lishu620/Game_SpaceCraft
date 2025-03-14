//处理游戏中的鼠标事件

function ev_mouseup(ev) {
   var x;
   var y;

   if (ev.layerX || ev.layerX == 0)         // browser dep , -8 is a hack due to
   {                                          // the canvas being in a table
      x = ev.layerX - g_canvas.offsetLeft - 8;
      y = ev.layerY - g_canvas.offsetTop - 8;
   }
   else if (ev.offsetX || ev.offsetX == 0) {
      x = ev.offsetX;
      y = ev.offsetY;
   }

   var ox = 40;
   var oy = 300;
   var ow = 30;

   if (y >= oy + 35 && y <= oy + 35 + ow && x >= ox + 520 && x <= ox + 520 + ow) {
      g_ship.fire(false);
      return;
   }

   g_ship.fire(false);
   g_ship.up(false);
   g_ship.left(false);
   g_ship.right(false);
   g_ship.down(false);
}

function ev_mousedown(ev) {
   var x;
   var y;

   if (ev.layerX || ev.layerX == 0)         // browser dep , -8 is a hack due to
   {                                          // the canvas being in a table
      x = ev.layerX - g_canvas.offsetLeft - 8;
      y = ev.layerY - g_canvas.offsetTop - 8;
   }
   else if (ev.offsetX || ev.offsetX == 0) {
      x = ev.offsetX;
      y = ev.offsetY;
   }

   if (g_gameState == "splash") {
      if (x > 50 && x < 200 && y > 300 && y < 330) {
         g_canvas.removeEventListener('mousemove', ev_mousemove, false);

         if (!g_onscreenControls)
            g_canvas.removeEventListener('mousedown', ev_mousedown, false);
         else
            g_canvas.addEventListener('mouseup', ev_mouseup, false);

         document.getElementById("loading_music").pause();
         main();
      }
      else if (x > 50 && x < 200 && y > 340 && y < 370) {
         var bg = document.getElementById("splash_screen");
         g_context.drawImage(bg, 0, 0);

         g_context.fillStyle = 'rgba(0,0,0,.6)';
         g_context.fillRect(0, 0, 600, 400);
         g_context.fillStyle = "yellow";
         g_context.fillText("银河系内战肆虐", 60, 100);
         g_context.fillText("现在是太空海盗掠夺星球上的文物和宝藏的最佳时机", 60, 125);
         g_context.fillText("这并不意味着他们不会试图阻止你", 60, 200);
         g_context.fillStyle = "white";
         g_context.fillText("方向键控制移动", 60, 285);
         g_context.fillText("“Z”键用来发射炮弹", 60, 310);
         g_context.fillText("收集道具和宝藏", 60, 335);
         g_context.fillText("“P”键可以暂停游戏", 60, 365);
         g_context.fillText("如果您没有键盘，请尝试屏幕控制", 60, 390);

         g_context.fillStyle = "black";
         g_context.fillRect(370, 290, 150, 30);
         g_context.strokeStyle = "gray";
         g_context.strokeRect(370, 290, 150, 30);
         g_context.fillStyle = "gray";
         g_context.fillText("确认", 425, 312);

         g_gameState = "instructions";

      }

      if (x > 400 && x < 420 && y > 283 && y < 303) {
         g_onscreenControls = !g_onscreenControls;

         g_context.fillStyle = "black";
         g_context.fillRect(400, 283, 20, 20);  //ctrls checkbox

         if (g_onscreenControls) {
            g_context.strokeStyle = "gray";
            g_context.beginPath();
            g_context.moveTo(400, 283);
            g_context.lineTo(420, 303);
            g_context.stroke();
            g_context.beginPath();
            g_context.moveTo(420, 283);
            g_context.lineTo(400, 303);
            g_context.stroke();
         }
      }
   }
   else if (g_gameState == "instructions") {
      if (x > 370 && x < 370 + 150 && y > 290 && y < 290 + 30) {
         bodyLoaded(true);
      }
   }
   else {
      //dbg("detected mouse ingame <br>", true);
      var ox = 40;
      var oy = 300;
      var ow = 30;

      if (!g_paused) {
         if (y >= oy + 35 && y <= oy + 35 + ow && x >= ox + 520 && x <= ox + 520 + ow)
            g_ship.fire(true);

         if (y >= oy && y <= oy + ow && x >= ox && x <= ox + ow)
            g_ship.up(true);
         if (y >= oy + 35 && y <= oy + 35 + ow && x >= ox - 35 && x <= ox - 35 + ow)
            g_ship.left(true);
         if (y >= oy + 35 && y <= oy + 35 + ow && x >= ox + 35 && x <= ox + 35 + ow)
            g_ship.right(true);
         if (y >= oy + 70 && y <= oy + 70 + ow && x >= ox && x <= ox + ow)
            g_ship.down(true);
      }

      if (y >= oy + 35 && y <= oy + 35 + ow && x >= ox + 270 && x <= ox + 270 + ow)
         pause();
   }
}


//
// this pretty much only exists so that we can light up the buttons as
// the user hovers over them
//
function ev_mousemove(ev) {
   var x;
   var y;

   if (ev.layerX || ev.layerX == 0)       // browser dep, the -8 is a hack
   {
      x = ev.layerX - g_canvas.offsetLeft - 8;
      y = ev.layerY - g_canvas.offsetTop - 8;
   }
   else if (ev.offsetX || ev.offsetX == 0) {
      x = ev.offsetX;
      y = ev.offsetY;
   }

   if (g_gameState == "instructions") {
      if (x > 370 && x < 370 + 150 && y > 290 && y < 290 + 30) {
         if (this.dink) {
            g_dinkSound.play();
            this.dink = false;
         }
         g_context.strokeStyle = "white";
         g_context.strokeRect(370, 290, 150, 30);
         g_context.fillStyle = "white";
         g_context.fillText("确认", 425, 312);
      }
      else {
         this.dink = true;
         g_context.fillStyle = "black";
         g_context.fillRect(370, 290, 150, 30);
         g_context.strokeStyle = "gray";
         g_context.strokeRect(370, 290, 150, 30);
         g_context.fillStyle = "gray";
         g_context.fillText("确认", 425, 312);
      }


      return;
   }

   var neither = true;

   if (x > 50 && x < 200 && y > 300 && y < 330) {
      neither = false;
      if (this.dink) {
         g_dinkSound.play();
         this.dink = false;
      }
      g_context.fillStyle = "black";
      g_context.fillRect(50, 300, 150, 30);
      g_context.strokeStyle = "white";
      g_context.strokeRect(50, 300, 150, 30);
      g_context.fillStyle = "white";
      g_context.fillText("新游戏", 98, 322);

   }
   else {
      g_context.fillStyle = "black";
      g_context.fillRect(50, 300, 150, 30);
      g_context.strokeStyle = "gray";
      g_context.strokeRect(50, 300, 150, 30);
      g_context.fillStyle = "gray";
      g_context.fillText("新游戏", 98, 322);
   }

   if (x > 50 && x < 200 && y > 340 && y < 370) {
      neither = false;
      if (this.dink) {
         g_dinkSound.play();
         this.dink = false;
      }
      g_context.fillStyle = "black";
      g_context.fillRect(50, 340, 150, 30);
      g_context.strokeStyle = "white";
      g_context.strokeRect(50, 340, 150, 30);
      g_context.fillStyle = "white";
      g_context.fillText("介绍", 100, 361);
   }
   else {
      g_context.fillStyle = "black";
      g_context.fillRect(50, 340, 150, 30);
      g_context.strokeStyle = "gray";
      g_context.strokeRect(50, 340, 150, 30);
      g_context.fillStyle = "gray";
      g_context.fillText("介绍", 100, 361);
   }

   // render onscreen controls checkbox
   g_context.fillStyle = "black";
   g_context.fillRect(400, 283, 20, 20);  //ctrls checkbox

   if (g_onscreenControls) {
      g_context.strokeStyle = "gray";
      g_context.beginPath();
      g_context.moveTo(400, 283);
      g_context.lineTo(420, 303);
      g_context.stroke();
      g_context.beginPath();
      g_context.moveTo(420, 283);
      g_context.lineTo(400, 303);
      g_context.stroke();
   }

   if (x > 400 && x < 420 && y > 283 && y < 303) {
      g_context.strokeStyle = "white";
      g_context.strokeRect(400, 283, 20, 20);
   }
   else {
      g_context.strokeStyle = "gray";
      g_context.strokeRect(400, 283, 20, 20);
   }

   if (neither)
      this.dink = true;

   //dbg("X = " + x + "<br>" + "Y = " + y, false);
}

