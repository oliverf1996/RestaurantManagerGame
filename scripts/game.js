			var c;
			var ctx;
			
			var cStatic;
			var ctxStatic;
			
			var bg;
			var ctxbg;

			var score = 0;

			var question;
			var answer;
			var userAnswer;

			var x=-50;
			var y=35;
			var x2=130;
			var y2=230;
			var x3=200;
			var y3=510;
			var intervalId;
			var counter=0;
			var numDay=1;

        	var table = new Image();
        	table.src= "images/KEY_Table_sprite.png";        	
			var customer = new Image();
        	customer.src = "images/redcircle.png";
			var waiter = new Image();
			waiter.src= "images/bluecircle.png";
			var chef = new Image();
			chef.src="images/whitecircle.png";
			
			$(function(){
				bg=document.getElementById("bg");
				ctxbg = bg.getContext("2d");

				table.onload = function(){
					ctxbg.drawImage(table,200,200,100,50);
				};
	
				c=document.getElementById("myCanvas");
				ctx = c.getContext("2d");
				
				cStatic = document.getElementById("staticCanvas");
				ctxStatic = cStatic.getContext("2d");
				ctxStatic.font = "30px Arial";
				ctxStatic.fillText("Score: " + score, 20, 30);
				ctxStatic.fillText("Day " + numDay, 20, 61);
				ctx.font="30px Arial";
				newCustomer();
				animateChef();
				
			});

			function update() {
			    ctxStatic.clearRect(0, 0, 200, 80);
			    ctxStatic.fillText("Score: " + score, 20, 30);
				ctxStatic.fillText("Day " + numDay, 20, 61);
				
			}
			
			function getRandomQuestion(){
				var operation;
				var firstInteger;
				var secondInteger;
				var operationSelector;
				
				firstInteger=Math.floor((Math.random()*100)+1);
				secondInteger=Math.floor((Math.random()*100)+1);
				
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
			
			function restart(){
				counter=0;
				numDay=1;
				score=0;
				update();
			}
			
			function processAnswer(){
			    setButtonsDisabled(true);
			    userAnswer = document.getElementById("questionDisplay").value.substring(question.length);
				var answerString=answer+"";
				if(parseFloat(userAnswer).toFixed(2)==parseFloat(answerString).toFixed(2)){
					score+=1;
				}
				counter+=1;
				if(counter%5==0){
					if(numDay===2){
						alert("GAME OVER");
						restart();
					}else{
						numDay+=1;
					}
				}
				reset();
			}
			
			function generateQuestion(){
			    document.getElementById("questionDisplay").value = getRandomQuestion();
			    setButtonsDisabled(false);
			}
            
			function enterDigit(n) {
			    if (document.getElementById("questionDisplay").value.length < 15) {
			        document.getElementById("questionDisplay").value = document.getElementById("questionDisplay").value + "" + n;
			    }
			}
			
			function clearDisplay() {
			    document.getElementById("questionDisplay").value = question;
			}
			
			function newCustomer()
        		{
                		x+=1;
						ctx.clearRect(0,0, c.width, c.height);
						ctx.drawImage(customer, x, y, 50, 50);        
						ctx.drawImage(waiter, x2, y2, 75, 75);	
						ctx.drawImage(chef, x3,y3, 50, 50);						
						intervalId=setTimeout(newCustomer,10);
						
						
								
						if(x==30)		
						{        
							clearInterval(intervalId);        
							setTimeout(animateWaiter1,1000);        
						}	       	
        		}

					
			function animateWaiter1()
			{
				part1();
				function part1()
				{
					y2-=1;
					ctx.clearRect(0,0, c.width, c.height);
					ctx.drawImage(waiter, x2, y2, 75, 75);
					ctx.drawImage(customer, x, y, 50, 50); 
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
					ctx.drawImage(waiter, x2, y2, 75, 75);
					ctx.drawImage(customer, x, y, 50, 50); 
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
					ctx.drawImage(waiter, x2, y2, 75, 75);
					ctx.drawImage(customer, x, y, 50, 50);
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
					ctx.drawImage(waiter, x2, y2, 75, 75);
					ctx.drawImage(customer, x, y, 50, 50); 
					ctx.drawImage(chef, x3,y3, 50, 50);
					var test=setTimeout(part2,10);
					if(y2==230)
					{
						clearInterval(test);
					}
				}
			}
			
			function animateCustomer1()
        		{
						part1();
						function part1()
						{
							x+=1;
							ctx.clearRect(0,0, c.width, c.height);
							ctx.drawImage(customer, x, y, 50, 50);
							ctx.drawImage(waiter, x2, y2, 75, 75);
							ctx.drawImage(chef, x3,y3, 50, 50);
							intervalId=setTimeout(part1,10);
							
							if(x==150)
							{
								clearInterval(intervalId);
								part2();
							}
						}
						function part2()
						{
							y+=1;
							ctx.clearRect(0,0, c.width, c.height);
							ctx.drawImage(customer, x, y, 50, 50);
							ctx.drawImage(waiter, x2, y2, 75, 75);
							ctx.drawImage(chef, x3,y3, 50, 50);
							intervalId=setTimeout(part2,10);
							
							if(y==200)
							{
								clearInterval(intervalId);
								generateQuestion();
							}
						}
        		}
			
			function animateChef()
			{
				
				part1();
				function part1()
				{
					x3+=1;
					ctx.clearRect(0,0, c.width, c.height);
					ctx.drawImage(customer, x, y, 50, 50);
					ctx.drawImage(waiter, x2, y2, 75, 75);
					ctx.drawImage(chef, x3,y3, 50, 50);
					
					var test=setTimeout(part1, 30);
					
					if (x3==300)
					{
						clearInterval(test);
						setTimeout(part2, 2000);
					}
				}
				
				function part2()
				{
					x3-=1;
					ctx.clearRect(0,0, c.width, c.height);
					ctx.drawImage(customer, x, y, 50, 50);
					ctx.drawImage(waiter, x2, y2, 75, 75);
					ctx.drawImage(chef, x3,y3, 50, 50);
					
					var test=setTimeout(part2, 30);
					
					if (x3==200)
					{
						clearInterval(test);
						setTimeout(part1,2000);
					}
				
				}
			
			}
        		
				
			
			function reset()
        	{
                	x=-50;
                	y = 35;
                	document.getElementById("questionDisplay").value = "";
                	ctx.clearRect(0,0, c.width, c.height);
                	update();
					ctx.drawImage(waiter, x2, y2, 75, 75);
					ctx.drawImage(chef, x3,y3, 50, 50);
                	var rand= Math.floor(Math.random()*3+1);
                	var t= setTimeout(function(){newCustomer()}, rand*1000);
			}
			function setButtonsDisabled(isDisabled){
			    document.getElementById("b0").disabled = isDisabled;
			    document.getElementById("b1").disabled = isDisabled;
			    document.getElementById("b2").disabled = isDisabled;
			    document.getElementById("b3").disabled = isDisabled;
			    document.getElementById("b4").disabled = isDisabled;
			    document.getElementById("b5").disabled = isDisabled;
			    document.getElementById("b6").disabled = isDisabled;
			    document.getElementById("b7").disabled = isDisabled;
			    document.getElementById("b8").disabled = isDisabled;
			    document.getElementById("b9").disabled = isDisabled;
			    document.getElementById("enter").disabled = isDisabled;
			    document.getElementById("clear").disabled = isDisabled;
			}

