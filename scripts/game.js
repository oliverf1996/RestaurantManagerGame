			var c;
			var ctx;
			
			var cStatic;
			var ctxStatic;
			
			var bg;
			var ctxbg;

			var cUpgrade;
			var ctxUpgrade;

			var score = 0;
			var money =50;
			
			var selectedId = 1;

			var questions=new Array();
			var answers=new Array();
			var userAnswer;
	                
			var timerInterval=["Empty Space", 1,2,3];
					
			var x3=200;
			var y3=510;
			
			var numDay=1;
			var numTables=1;
			var numChefs=1;
			
			var dayInProgress=true;

			var totalTime=2;
			var clockId;

        	var table = new Image();
        	table.src= "images/KEY_Table_sprite.png";
			
	
			var customer1 = new CustomerPrototype(1);
			var customer2 = new CustomerPrototype(2);
			var customer3 = new CustomerPrototype(3);
			
			var customers = ["Empty Space", customer1, customer2, customer3];
			
			var chef = new Image();
			chef.src="images/whitecircle.png";
		
			var table1 = new TablePrototype(1, 100, 300);
			var table2 = new TablePrototype(2, 400, 300);
			var table3 = new TablePrototype(3, 250, 200);
			
			var tables= ["Empty Space", table1, table2, table3];
			var freeTables= [1];
			
			
			$(function(){
				bg=document.getElementById("bg");
				ctxbg = bg.getContext("2d");

				tables[1].img.onload = function(){
					ctxbg.drawImage(tables[1].img,tables[1].x, tables[1].y, 100,50);
					tables[1].activated=true;
				}
				
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
			function chooseTable()
			{
				
				var rand= Math.floor(Math.random()*freeTables.length); 
				var choice = freeTables[rand];
				alert(choice);
				freeTables.splice(rand, 1);
				return choice;
			}

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
					timerInterval[id]=setTimeout(function(){timerGo(timeLeft,id)}, 200);
					if(timeLeft<=0)
					{
						 customers[id].reset(ctx);
					}
				}
			}
			function timerStop(id)
			{
				clearInterval(timerInterval[id]);				
				ctxStatic.clearRect(customers[id].x-20,customers[id].y-25, 130, 20);
			
			}
			function updateClock()
			{
			    ctxStatic.clearRect(450, 0, 200, 80);
			    ctxStatic.fillStyle = "black";
				if(totalTime==0)
				{
					numDay+=1;
					dayInProgress=false;
					showUpgrades();
				} else {
				    ctxStatic.fillText(timeFormat(totalTime), 460, 60);
				    totalTime -= 1;
				    clockId = setTimeout(updateClock, 1000);
				}
			}

			function showUpgrades(){
			    //stop animations
			    timerStop(1);
				timerStop(2);
				timerStop(3);
				setButtonsDisabled(true);
				ctxStatic.clearRect(0, 0, 590, 580);
				customers[1].seated=false;
				customers[2].seated=false;
				customers[3].seated=false;
				var upgradeScreen= new Image();
				upgradeScreen.src="images/upgradeImage.png";
				upgradeScreen.onload= function(){
					ctxUpgrade.drawImage(upgradeScreen,0,0,590,580);
					ctxStatic.fillText("Money: $" + money, 20, 30);
				}
				document.getElementById("hireChef").style.visibility="visible";
				document.getElementById("buyTable").style.visibility="visible";
				checkMoney();
				document.getElementById("continue").textContent="Begin Day "+numDay;
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

				if(numTables==2)
				{
					ctxbg.drawImage(tables[2].img,tables[2].x, tables[2].y, 100,50);
					tables[2].activated=true;
				
					
				}
				
				else if(numTables==3)
				{
					ctxbg.drawImage(tables[3].img,tables[3].x, tables[3].y, 100,50);
					tables[3].activated=true;
				
					
				}

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
				updateClock();
				switch(numTables)
				{
					case 1: 
							ctx.clearRect(customers[1].x-2, customers[1].y-2, 53, 53);
							customers[1].x = -50;
							customers[1].y = 34;
							freeTables=[1];
							break;
							
					case 2: ctx.clearRect(customers[1].x-2, customers[1].y-2, 53, 53);
							customers[1].x = -50;
							customers[1].y = 34;
							ctx.clearRect(customers[2].x-2, customers[2].y-2, 53, 53);
							customers[2].x = -50;
							customers[2].y = 34;
							freeTables=[1,2];
							
							
							break;
					case 3: ctx.clearRect(customers[1].x-2, customers[1].y-2, 53, 53);
							customers[1].x = -50;
							customers[1].y = 34;
							ctx.clearRect(customers[2].x-2, customers[2].y-2, 53, 53);
							customers[2].x = -50;
							customers[2].y = 34;
							ctx.clearRect(customers[3].x-2, customers[3].y-2, 53, 53);
							customers[3].x = -50;
							customers[3].y = 34;
							freeTables=[1,2,3];
							
							break;
				}
				newCustomer(1);
				if(numTables>=2)
				{
					var rand= Math.floor(Math.random()*3+1);
					 setTimeout(function () { newCustomer(2) }, rand*1000);
				}
				if(numTables==3)
				{
					var rand= Math.floor(Math.random()*3+1);
					 setTimeout(function () { newCustomer(3) }, rand*1000);
				}
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
			    document.getElementById("questionDisplay").value = questions[selectedId-1];
			}
			
	function newCustomer(id)
		{
			var rand= Math.floor(Math.random()*3+1);
            setTimeout(function () { go(id) }, rand*1000);
			function go(id)
			{
				if (dayInProgress) 
				{
					generateRandomQuestion(id);
					customers[id].x += 2;
					ctx.clearRect(customers[id].x-2, customers[id].y-2, 53, 53);
					ctx.drawImage(customers[id].img, customers[id].x, customers[id].y, 50, 50);					
					customers[id].timer = setTimeout(function () { go(id) }, 10);
				}
				else 
				{
					ctx.clearRect(customers[id].x-2, customers[id].y-2, 53, 53);
				}
				
				if (customers[id].x == 30) 
				{
					clearInterval(customers[id].timer);
					var tableId=chooseTable();
					customers[id].currentTable=tableId;
					//alert("Customer: " + customers[id].id +" Table: " + tableId);
					animateCustomer1(id, tableId);
				}
				
			}
						
        }
						
        
		function animateCustomer1(id, tableId)
        		{
						
						part1(id);
						function part1(id)
						{
							
						    if (dayInProgress) {
						        customers[id].x += 2;
						        ctx.clearRect(customers[id].x-2, customers[id].y-2, 53, 53);
						        ctx.drawImage(customers[id].img, customers[id].x, customers[id].y, 50, 50);
						       
							    customers[id].timer = setTimeout(function () { part1(id) }, 10);
							} else {
							    ctx.clearRect(customers[id].x-2, customers[id].y-2, 53, 53);
							}
							
							if(customers[id].x==tables[tableId].x-50&&dayInProgress)
							{
								clearInterval(customers[id].timer);
								part2(id);
							}
						}
						function part2(id)
						{
						    if (dayInProgress) {
						        customers[id].y += 2;
						        ctx.clearRect(customers[id].x-2, customers[id].y-2, 53, 53);
						        ctx.drawImage(customers[id].img, customers[id].x, customers[id].y, 50, 50);
						        customers[id].timer = setTimeout(function () { part2(id) }, 10);
						        if (customers[id].y == tables[tableId].y) {
						            clearInterval(customers[id].timer);
									customers[id].seated=true;
						            displayQuestion(selectedId);											
						            timerStart(15, id);
						        }
						    } else {
						        ctx.clearRect(customers[id].x-2, customers[id].y-2, 53, 53);
						    }							
						}
        		}
			
			
		function animateChef()
			{
				
				part1();
				function part1()
				{
				    if (dayInProgress) {
				        x3 += 1;
				        ctx.clearRect(200, 510, 300, 50);
				       
				        ctx.drawImage(chef, x3, y3, 50, 50);

				        var test = setTimeout(part1, 30);

				        if (x3 == 300) {
				            clearInterval(test);
				            setTimeout(part2, 2000);
				        }
				    } else {
				         ctx.clearRect(200, 510, 300, 50);
				    }
				}
				
				function part2()
				{
				    if (dayInProgress) {
				        x3 -= 1;
				       ctx.clearRect(200, 510, 300, 50);
				      

				        ctx.drawImage(chef, x3, y3, 50, 50);

				        var test = setTimeout(part2, 30);

				        if (x3 == 200) {
				            clearInterval(test);
				            setTimeout(part1, 2000);
				        }
				    } else {
				         ctx.clearRect(200, 510, 300, 50);
				    }
				
				}
			
			}
        	function handleClick(event){
				var x=event.clientX-document.getElementById("myCanvas").getBoundingClientRect().left;
				var y=event.clientY-document.getElementById("myCanvas").getBoundingClientRect().top;
				selectCustomer(x,y);	
			}				
			function selectCustomer(x,y)
			{
				for (var i=1;i<=3;i++)
				{
				
					if(customers[i].x<=x&&x<=customers[i].x+50&&customers[i].y<=y&&y<=customers[i].y+50)
					{
						customers[1].img.src=customers[1].src;
						customers[2].img.src=customers[2].src;
						customers[3].img.src=customers[3].src;
						
						customers[i].img.src=customers[i].src2;	
						
						drawImage(ctx, customers[1]);
						drawImage(ctx, customers[2]);	
						drawImage(ctx, customers[3]);	
						
						selectedId=i;
						if(customers[selectedId].seated){
							displayQuestion(selectedId);
						}else{
							document.getElementById("questionDisplay").value ="";
							setButtonsDisabled(true);
						}
						break;
					}
				}
			}
			function reset()
        		{
					customers[selectedId].reset(ctx);
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
			
			

