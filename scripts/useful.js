function roundedRect(ctx,x,y,width,height,radius){
			  ctx.beginPath();
			  ctx.moveTo(x,y+radius);
			  ctx.lineTo(x,y+height-radius);
			  ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
			  ctx.lineTo(x+width-radius,y+height);
			  ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
			  ctx.lineTo(x+width,y+radius);
			  ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
			  ctx.lineTo(x+radius,y);
			  ctx.quadraticCurveTo(x,y,x,y+radius);
			  ctx.stroke();
			  ctx.fillStyle = "white";
			  ctx.fill();
			  ctx.fillStyle = "black";
			 }
			 
function timeFormat(seconds)
{	
	var minutes = Math.floor(seconds/60);
	var newSeconds = seconds - (minutes*60);
	
	if(minutes==0)
	{
		minutes = "00";
	}
	else
	{
		minutes = "0"+minutes;
	}
	if(newSeconds ==0)
	{
		newSeconds ="00";
	}
	else if(newSeconds < 10)
	{
		newSeconds = "0"+newSeconds;
	}
	else 
	{
		newSeconds=newSeconds+"";
	}
	return minutes+" : "+newSeconds;


}