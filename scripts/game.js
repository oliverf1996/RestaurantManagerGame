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
	
			var x3=200;
			var y3=510;
			
			var counter=0;
			var numDay=1;
<<<<<<< HEAD
			var totalTime=10;
			var clockId;
			
			var numTables=1;
			var numChefs=1;
			
			var dayInProgress=true;
			
=======
			var totalTime=60;
			var clockId;
			
>>>>>>> efc7717dc1986df20c18bf9f7252c5539899f6b3
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
				cUpgrade = document.getElementById("upgradeScreen");
				ctxUpgrade = cUpgrade.getContext("2d");
				cStatic = document.getElementById("staticCanvas");
				ctxStatic = cStatic.getContext("2d");
				ctxStatic.font = "30px Arial";
				ctxStatic.fillText("Money: $" + money, 20, 30);
				ctxStatic.fillText("Day " + numDay, 20, 61);
				ctx.font="30px Arial";
				newCustomer();
				updateClock();
				animateChef();
				
			});

			function update() {
			    ctxStatic.clearRect(0, 0, 200, 80);
			    ctxStatic.fillText("Money: $" + money, 20, 30);
				ctxStatic.fillText("Day " + numDay, 20, 61);
				
			}
			function updateClock()
			{
				if(totalTime==0)
				{
					ctxStatic.clearRect(450, 0, 200, 80);
					
					ctxStatic.fillText(timeFormat(totalTime), 460, 60);
<<<<<<< HEAD
					numDay+=1;
					dayInProgress=false;
					showUpgrades();
				}else{
					ctxStatic.clearRect(450, 0, 200, 80);
					ctxStatic.fillText(timeFormat(totalTime), 460, 60);
					totalTime-=1;
					clockId=setTimeout(updateClock,1000);
=======
					alert("Day " + numDay+" has come to an end!");
					numDay+=1;
					totalTime=60;
					update();
>>>>>>> efc7717dc1986df20c18bf9f7252c5539899f6b3
				}
				ctxStatic.clearRect(450, 0, 200, 80);
				
				ctxStatic.fillText(timeFormat(totalTime), 460, 60);
				totalTime-=1;
				clockId=setTimeout(updateClock,1000);
				
			}
<<<<<<< HEAD
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
			
=======
			
			
			function restart(){
				counter=0;
				numDay=1;
				score=0;
				update();
			}
			
>>>>>>> efc7717dc1986df20c18bf9f7252c5539899f6b3
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
                		x+=2;
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
<<<<<<< HEAD
							if(dayInProgress){
								x+=2;
								ctx.clearRect(0,0, c.width, c.height);
								ctx.drawImage(customer, x, y, 50, 50);
								
								ctx.drawImage(chef, x3,y3, 50, 50);
								
								var test=setTimeout(part1,10);
								
								if(x==150)
								{
									clearInterval(test);
									part2();
								}
							}else{ 
								ctx.clearRect(0,0,c.width, c.height);
=======
							x+=2;
							ctx.clearRect(0,0, c.width, c.height);
							ctx.drawImage(customer, x, y, 50, 50);
							
							ctx.drawImage(chef, x3,y3, 50, 50);
							var test=setTimeout(part1,10);
							
							if(x==150)
							{
								clearInterval(test);
								part2();
>>>>>>> efc7717dc1986df20c18bf9f7252c5539899f6b3
							}
						}
						function part2()
						{
<<<<<<< HEAD
							if(dayInProgress){
								y+=2;
								ctx.clearRect(0,0, c.width, c.height);
								ctx.drawImage(customer, x, y, 50, 50);
								
								ctx.drawImage(chef, x3,y3, 50, 50);
								var test=setTimeout(part2,10);
								
								if(y==200)
								{
									clearInterval(test);
									generateQuestion();
								}
							}else{
								ctx.clearRect(0,0,c.width,c.height);
=======
							y+=2;
							ctx.clearRect(0,0, c.width, c.height);
							ctx.drawImage(customer, x, y, 50, 50);
							
							ctx.drawImage(chef, x3,y3, 50, 50);
							var test=setTimeout(part2,10);
							
							if(y==200)
							{
								clearInterval(test);
								generateQuestion();
>>>>>>> efc7717dc1986df20c18bf9f7252c5539899f6b3
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
                	y = 34;
                	document.getElementById("questionDisplay").value = "";
                	ctx.clearRect(0,0, c.width, c.height);
                	update();
<<<<<<< HEAD
=======
					
>>>>>>> efc7717dc1986df20c18bf9f7252c5539899f6b3
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
			
			

