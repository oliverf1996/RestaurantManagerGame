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
			
			var counter=0;
			var numDay=1;
			var totalTime=60;
			var clockId;
			
        	var table = new Image();
        	table.src= "images/KEY_Table_sprite.png";
			
			//var customer = {x:-50, y:35, src: "images/redcircle.png", img:new image};
			//customer.img.src=customer.src;
			var customer = new Image();
        	customer.src = "images/redcircle.png";
			
			var chef = new Image();
			chef.src="images/whitecircle.png";
			
			$(function(){
				bg=document.getElementById("bg");
				ctxbg = bg.getContext("2d");

				table.onload = function(){
					ctxbg.drawImage(table,200,200,100,50);
				};
				roundedRect(ctxbg,455,35,100,30,5);
	
				c=document.getElementById("myCanvas");
				ctx = c.getContext("2d");
				
				cStatic = document.getElementById("staticCanvas");
				ctxStatic = cStatic.getContext("2d");
				ctxStatic.font = "30px Arial";
				ctxStatic.fillText("Score: " + score, 20, 30);
				ctxStatic.fillText("Day " + numDay, 20, 61);
				ctx.font="30px Arial";
				newCustomer();
				updateClock();
				animateChef();
				
			});

			function update() {
			    ctxStatic.clearRect(0, 0, 200, 80);
			    ctxStatic.fillText("Score: " + score, 20, 30);
				ctxStatic.fillText("Day " + numDay, 20, 61);
				
			}
			function updateClock()
			{
				if(totalTime==0)
				{
					ctxStatic.clearRect(450, 0, 200, 80);
					
					ctxStatic.fillText(timeFormat(totalTime), 460, 60);
					alert("Day " + numDay+" has come to an end!");
					numDay+=1;
					totalTime=60;
					update();
				}
				ctxStatic.clearRect(450, 0, 200, 80);
				
				ctxStatic.fillText(timeFormat(totalTime), 460, 60);
				totalTime-=1;
				clockId=setTimeout(updateClock,1000);
				
			}
			
			
			function restart(){
				counter=0;
				numDay=1;
				score=0;
				update();
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
						
						ctx.drawImage(chef, x3,y3, 50, 50);						
						var test=setTimeout(newCustomer,10);
						
						if(x==30)		
						{        
							clearInterval(test);        
							animateCustomer1();       
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
							
							ctx.drawImage(chef, x3,y3, 50, 50);
							var test=setTimeout(part1,10);
							
							if(x==150)
							{
								clearInterval(test);
								part2();
							}
						}
						function part2()
						{
							y+=1;
							ctx.clearRect(0,0, c.width, c.height);
							ctx.drawImage(customer, x, y, 50, 50);
							
							ctx.drawImage(chef, x3,y3, 50, 50);
							var test=setTimeout(part2,10);
							
							if(y==200)
							{
								clearInterval(test);
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
			
			

