// 特效（如爆炸效果）的 JavaScript 类

function AfterEffect(id, x, y, velx, vely) {
   this.myName = id;
   this.myX = x;
   this.myY = y;
   this.myVelX = velx;
   this.myVelY = vely;
   this.myHeight = 0;
   this.myWidth = 0;
   this.myFrameCounter = 0;
   this.myLastFrame = 0;

   this.myFrames = new Array();

   if (id == "splode") {
      this.myLastFrame = 6;

      for (var i = 0; i <= this.myLastFrame; ++i) {
         var offset = i + 1;
         var img = document.getElementById("splode_" + offset);
         this.myFrames.push(img);
         if (i == 0) {
            this.myWidth = img.width;
            this.myHeight = img.height;
         }
      }
   }
   else if (id.indexOf("lose") == 0) {
      this.myLastFrame = 12;

      var imgName = this.myName.slice(5);
      imgName += "_image";

      var img = document.getElementById(imgName);
      for (var i = 0; i <= this.myLastFrame; ++i) {
         this.myFrames.push(img);
         if (i == 0) {
            this.myWidth = img.width;
            this.myHeight = img.height;
         }
      }
   }
}

AfterEffect.prototype.render = function () {
   var pullWidth = g_canvas.width - this.myX;
   var pullHeight = g_canvas.height - this.myY;

   if (pullWidth > this.myWidth) {
      pullWidth = this.myWidth;
   }
   if (pullHeight > this.myHeight) {
      pullHeight = this.myHeight;
   }

   if (pullWidth > 0 && pullHeight > 0) {
      g_context.drawImage(this.myFrames[this.myFrameCounter],
         0, 0, pullWidth, pullHeight,
         this.myX, this.myY, pullWidth, pullHeight);
   }

   this.myX += this.myVelX;
   this.myY += this.myVelY;

   this.myFrameCounter++;

   if (this.myFrameCounter > this.myLastFrame)
      return false;

   return true;
}
