			var c;
			var ctx;
			
			var cStatic;
			var ctxStatic;
			
			var bg;
			var ctxbg;

			var cUpgrade;
			var ctxUpgrade;

			var score = 0;
			var money =0;

			var question;
			var answer;
			var userAnswer;

			var x=-50;
			var y=34;
	                
	                var r;
			var x3=200;
			var y3=510;
			
			var counter=0;
			var numDay=1;

			var totalTime=10;
			var clockId;
			
			var numTables=1;
			var numChefs=1;
			
			var dayInProgress=true;

			var totalTime=60;
			var clockId;

        	var table = new Image();
        	table.src= "images/KEY_Table_sprite.png";
			
		
		function CustomerPrototype (id)
			{
				this.id=id;
				this.x=-50;
				this.y=34;
				this.src= "images/redcircle.png";
				this.img= new Image();
				this.img.src=this.src;
				this.timer;
			
			}
			var customer1 = new CustomerPrototype(1);
			var customer2 = new CustomerPrototype(2);
			var customer3 = new CustomerPrototype(3);
			
			var customers = ["Empty Space", customer1, customer2, customer3];
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
				cUpgrade = document.getElementById("upgradeScreen");
				ctxUpgrade = cUpgrade.getContext("2d");
				cStatic = document.getElementById("staticCanvas");
				ctxStatic = cStatic.getContext("2d");
				ctxStatic.font = "30px Arial";
				ctxStatic.fillText("Money: $" + money, 20, 30);
				ctxStatic.fillText("Day " + numDay, 20, 61);
				ctx.font="30px Arial";
				newCustomer(1);
				updateClock();
				animateChef();
				
			});

			function update() {
				ctxStatic.fillStyle="black";
			    ctxStatic.clearRect(0, 0, 200, 80);
			    ctxStatic.fillText("Money: $" + money, 20, 30);
				ctxStatic.fillText("Day " + numDay, 20, 61);
				
			}
			
			
			function timerStart(time, id)
			{
				ctxStatic.fillStyle="#00FF00";
				ctxStatic.fillRect(customers[id].x, customers[id].y-20, 100,10);
				ctxStatic.strokeRect(customers[id].x, customers[id].y-20, 100, 10);
				var timeLeft= time;
				timerGo(timeLeft, id);
				function timerGo(timeLeft, id)
				{
					timeLeft-=0.2;
					ctxStatic.clearRect(customers[id].x, customers[id].y-20, 100, 10);
					
					ctxStatic.fillStyle="#00FF00";
					
					if((timeLeft/time)<0.6)
					{
						ctxStatic.fillStyle="#FFBF00";
					}
					if((timeLeft/time)<0.3)
					{
						ctxStatic.fillStyle="#B40404";
					}
					
					
					ctxStatic.fillRect(customers[id].x, customers[id].y-20, (timeLeft/time)*100,10);
					ctxStatic.strokeRect(customers[id].x, customers[id].y-20, 100, 10);
					r=setTimeout(function(){timerGo(timeLeft,id)}, 200);
					if(timeLeft<=0)
					{
						ctxStatic.clearRect(customers[id].x-20,customers[id].y-25, 130, 20);
						clearInterval(r);
						 document.getElementById("questionDisplay").value = "";
						 setButtonsDisabled(true);
						 reset();
					}
				}
			}
			function timerStop(id)
			{
				clearInterval(r);
				
				ctxStatic.clearRect(customers[id].x-20,customers[id].y-25, 130, 20);
			
			}
			function updateClock()
			{
				if(totalTime==0)
				{
					ctxStatic.clearRect(450, 0, 200, 80);
					
					ctxStatic.fillText(timeFormat(totalTime), 460, 60);

					numDay+=1;
					dayInProgress=false;
					showUpgrades();
				}else{
					ctxStatic.clearRect(450, 0, 200, 80);
					ctxStatic.fillText(timeFormat(totalTime), 460, 60);
					totalTime-=1;
					clockId=setTimeout(updateClock,1000);

					alert("Day " + numDay+" has come to an end!");
					numDay+=1;
					totalTime=60;
					update();

				}
				ctxStatic.clearRect(450, 0, 200, 80);
				ctxStatic.fillStyle="black";
				ctxStatic.fillText(timeFormat(totalTime), 460, 60);
				totalTime-=1;
				clockId=setTimeout(updateClock,1000);
				
			}

			function showUpgrades(){
				//stop animations
				setButtonsDisabled(true);
				ctxStatic.clearRect(0, 0, 590, 580);
				var upgradeScreen= new Image();
				upgradeScreen.src="images/upgradeImage.png";
				upgradeScreen.onload= function(){
					ctxUpgrade.drawImage(upgradeScreen,0,0,590,580);
					ctxStatic.fillText("Money: $" + money, 20, 30);
				}
				document.getElementById("hireChef").style.visibility="visible";
				document.getElementById("buyTable").style.visibility="visible";
				checkMoney();
				document.getElementById("continue").style.visibility="visible";
			}
			
			function checkMoney(){
				document.getElementById("buyTable").disabled=false;
				document.getElementById("hireChef").disabled=false;
				if (money < 100||numChefs==3) {
					document.getElementById("hireChef").disabled=true;
				}
				if(money<50||numTables==3){
					document.getElementById("buyTable").disabled=true;
				}
			}
			
			function buyTable(){
				money-=50;
				numTables+=1;
				//add image of table to ctxbg
				checkMoney();
				ctxStatic.clearRect(0, 0, 590, 580);
				ctxStatic.fillText("Money: $" + money, 20, 30);
			}
			
			function hireChef(){
				money-=100;
				numChefs+=1;
				//add image of chef
				ctxStatic.clearRect(0, 0, 590, 580);
				ctxStatic.fillText("Money: $" + money, 20, 30);
			}
			
			function newDay(){
				totalTime=30+numChefs*30;
				dayInProgress=true;
				document.getElementById("hireChef").style.visibility="hidden";
				document.getElementById("buyTable").style.visibility="hidden";
				document.getElementById("continue").style.visibility="hidden";
				ctxUpgrade.clearRect(0,0,590,580);
				update();
				reset();
				updateClock();
			}
			
			function restart(){
				counter=0;
				numDay=1;
				score=0;
				money=0;
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
			
		function newCustomer(id)
        		{
                		customers[id].x+=2;
						ctx.clearRect(0,0, c.width, c.height);
						ctx.drawImage(customers[id].img, customers[id].x, customers[id].y, 50, 50);        

						ctx.drawImage(chef, x3,y3, 50, 50);						
						customers[id].timer=setTimeout(function(){newCustomer(id)},10);
						
						if(customers[id].x==30)		
						{        
							clearInterval(customers[id].timer);        
							animateCustomer1(id);       
						}	 
						
        		}
		function animateCustomer1(id)
        		{
						part1(id);
						function part1(id)
						{
							customers[id].x+=2;
							ctx.clearRect(0,0, c.width, c.height);
							ctx.drawImage(customers[id].img, customers[id].x, customers[id].y, 50, 50);
							
							ctx.drawImage(chef, x3,y3, 50, 50);
							customers[id].timer=setTimeout(function(){part1(id)},10);
							
							if(customers[id].x==150)
							{
								clearInterval(customers[id].timer);
								part2(id);
							}
						}
						function part2(id)
						{
							customers[id].y+=2;
							ctx.clearRect(0,0, c.width, c.height);
							ctx.drawImage(customers[id].img, customers[id].x, customers[id].y, 50, 50);
							
							ctx.drawImage(chef, x3,y3, 50, 50);
							customers[id].timer=setTimeout(function(){part2(id)},10);
							
							if(customers[id].y==200)
							{
								clearInterval(customers[id].timer);
								generateQuestion();
								timerStart(15, id);
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
					ctx.drawImage(customers[1].img, customers[1].x, customers[1].y, 50, 50);
					
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
					ctx.drawImage(customers[1].img, customers[1].x, customers[1].y, 50, 50);
					
					
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
					
					timerStop(1);
                	customer1.x=-50;
                	customer1.y = 34;
                	document.getElementById("questionDisplay").value = "";
                	ctx.clearRect(0,0, c.width, c.height);
                	update();
					
					ctx.drawImage(chef, x3,y3, 50, 50);
                	var rand= Math.floor(Math.random()*3+1);
                	var t= setTimeout(function(){newCustomer(1)}, rand*1000);
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
			
			

