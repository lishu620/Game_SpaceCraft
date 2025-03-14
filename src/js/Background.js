//用于在画布上渲染背景图像

function Background(element, velocity) {
   this.myImage = document.getElementById(element);
   this.myX = 0;
   this.myVelocity = velocity;

   this.myWidth = this.myImage.width;
   this.myHeight = this.myImage.height;
}

Background.prototype.render = function () {
   var pullWidth = this.myWidth - this.myX;
   if (pullWidth > g_canvas.width) {
      pullWidth = g_canvas.width;
   }

   //dbg( this.myX + " , " + pullWidth, false);

   g_context.drawImage(this.myImage,
      this.myX, 0,
      pullWidth, this.myHeight,
      0, g_canvas.height - this.myHeight,
      pullWidth, this.myHeight);

   if (pullWidth < g_canvas.width) {
      var secondPullWidth = g_canvas.width - pullWidth;
      g_context.drawImage(this.myImage,
         0, 0,
         secondPullWidth, this.myHeight,
         pullWidth, g_canvas.height - this.myHeight,
         secondPullWidth, this.myHeight);
   }

   this.myX += this.myVelocity;

   if (this.myX >= this.myWidth) {
      this.myX = 0;
   }
}
