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


			function processAnswer()
			{
			    setButtonsDisabled(true);
			    userAnswer = document.getElementById("questionDisplay").value.substring(question.length);
				var answerString=answer+"";
				if(parseFloat(userAnswer).toFixed(2)==parseFloat(answerString).toFixed(2)){
					score+=1;
				}
				
				reset();
			}
			
			function generateQuestion()
			{
			    document.getElementById("questionDisplay").value = getRandomQuestion();
			    setButtonsDisabled(false);
			}
			
			function getRandomQuestion(){
				var operation;
				var firstInteger;
				var secondInteger;
				var operationSelector;
				
				firstInteger=Math.floor((Math.random()*12)+1);
				secondInteger=Math.floor((Math.random()*12)+1);
				
				operatorSelector=Math.floor((Math.random()*4));
				switch(operatorSelector){				
					case 0: operation="+";
							answer=firstInteger+secondInteger;
					break;
				    case 1: operation = "-";
				            var temp = firstInteger;
				            if (firstInteger < secondInteger) {
				                firstInteger = secondInteger;
				                secondInteger = temp;
				            }
							answer=firstInteger-secondInteger;
					break;
					case 2: operation="*";
							answer=firstInteger*secondInteger;
					break;
					case 3: operation="/";
					        answer = firstInteger;
					        firstInteger*=secondInteger;
					break;
				}
				
				question = "  " + firstInteger + operation + secondInteger + "=";
				return question;
			}
			
			
			/*	
			function animateWaiter1()
			{
				part1();
				function part1()
				{
					y2-=1;
					ctx.clearRect(0,0, c.width, c.height);
					ctx.drawImage(customer, x, y, 50, 50); 
					ctx.drawImage(waiter, x2, y2, 75, 75);
					ctx.drawImage(chef, x3,y3, 50, 50);
					var test=setTimeout(part1,10);
					if(y2==50)
					{
						clearInterval(test);
						part2();
					}
				}
				function part2()
				{
					x2-=1;
					ctx.clearRect(0,0, c.width, c.height);
					ctx.drawImage(customer, x, y, 50, 50); 
					ctx.drawImage(waiter, x2, y2, 75, 75);
					
					ctx.drawImage(chef, x3,y3, 50, 50);
					var test=setTimeout(part2,10);
					if(x2==30)
					{
						clearInterval(test);
						animateCustomer1();
						animateWaiter2();
					}
				
				}
			}
			
			
			function animateWaiter2()
			{
				part1();
				function part1()
				{
					x2+=1;
					ctx.clearRect(0,0, c.width, c.height);
					ctx.drawImage(customer, x, y, 50, 50);
					ctx.drawImage(waiter, x2, y2, 75, 75);
					
					ctx.drawImage(chef, x3,y3, 50, 50);
					
					var test=setTimeout(part1,10);
					if(x2==130)
					{
						clearInterval(test);
						part2();
					}
				}
				function part2()
				{
					y2+=1;
					ctx.clearRect(0,0, c.width, c.height);
					ctx.drawImage(customer, x, y, 50, 50);
					ctx.drawImage(waiter, x2, y2, 75, 75);
					 
					ctx.drawImage(chef, x3,y3, 50, 50);
					var test=setTimeout(part2,10);
					if(y2==230)
					{
						clearInterval(test);
					}
				}
			}*/
