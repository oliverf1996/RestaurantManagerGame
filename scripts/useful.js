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
			 
function drawImage(ctx, customer)
{
	 customer.img.onload = function() {
		ctx.drawImage(customer.img, customer.x, customer.y, 50, 50);
	 }
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


			function processAnswer()
			{
			    setButtonsDisabled(true);
			    userAnswer = document.getElementById("questionDisplay").value.substring(questions[selectedId-1].length);
				var answerString=answers[selectedId-1]+"";
				if(parseFloat(userAnswer).toFixed(2)==parseFloat(answerString).toFixed(2)){
					money+=10;
					score+=1;
				}
				
				reset();
			}
			
			function displayQuestion(id)
			{
			    document.getElementById("questionDisplay").value = questions[id-1];
			    setButtonsDisabled(false);
			}
			
			function generateRandomQuestion(id){
				var operation;
				var firstInteger;
				var secondInteger;
				var operationSelector;
				
				firstInteger=Math.floor((Math.random()*12)+1);
				secondInteger=Math.floor((Math.random()*12)+1);
				
				operatorSelector=Math.floor((Math.random()*4));
				switch(operatorSelector){				
					case 0: operation="+";
							answers[id-1]=firstInteger+secondInteger;
					break;
				    case 1: operation = "-";
				            var temp = firstInteger;
				            if (firstInteger < secondInteger) {
				                firstInteger = secondInteger;
				                secondInteger = temp;
				            }
							answers[id-1]=firstInteger-secondInteger;
					break;
					case 2: operation="*";
							answers[id-1]=firstInteger*secondInteger;
					break;
					case 3: operation="/";
					        answers[id-1] = firstInteger;
					        firstInteger*=secondInteger;
					break;
				}
				
				questions[id-1]="  " + firstInteger + operation + secondInteger + "=";
			}

