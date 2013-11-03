			var c;
			var ctx;
			var cStatic;
			var ctxStatic;
			var score;
			var answer;
			var x=20;
			var y=0;
			var intervalId;
        		var customer = new Image();
        		customer.src = "images/redcircle.png";
        		var table = new Image();
        		table.src= "images/KEY_Table_sprite.png";
			
			$(function(){
				c=document.getElementById("myCanvas");
				ctx = c.getContext("2d");
				cStatic = document.getElementById("staticCanvas");
				ctxStatic = cStatic.getContext("2d");
				score = 0;
				ctxStatic.font = "30px Arial";
				ctxStatic.fillText("Score: " + score, 20, 20);
				ctx.font="30px Arial";
				move1();
				
			});

			function updateScore() {
			    ctxStatic.clearRect(10, 10, 200, 40);
			    ctxStatic.fillText("Score: " + score, 20, 20);
			}
			
			function getRandomQuestion(){
				var question;
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
					case 1: operation="-";
							answer=firstInteger-secondInteger;
					break;
					case 2: operation="*";
							answer=firstInteger*secondInteger;
					break;
					case 3: operation="/";
							answer=firstInteger/secondInteger;
					break;
				}
				
				question=""+firstInteger+operation+secondInteger+"=";	
				return question;	
			}
			
			function processAnswer(){
				var userAnswer=document.getElementById("userAnswer").value;
				var answerString=answer+"";
				if(parseFloat(userAnswer).toFixed(2)==parseFloat(answerString).toFixed(2)){
					score+=1;
				}
				reset();
			}
			
			function generateQuestion(x,y){
				ctx.fillText(getRandomQuestion(),x,y);
			}
			
			function newCustomer()
        		{
                		ctx.drawImage(customer, x, y, 50, 50);
                		var t=setTimeout(function(){move1()}, 1500);
                
        		}

			 function move1()
        		{
               			intervalId=setInterval(moveSide, 10);
                		function moveSide()
                		{
                        		x+=1;
                        		ctx.clearRect(0,0, c.width, c.height);
                        		ctx.drawImage(customer, x, y, 50, 50);
                        		ctx.drawImage(table, 200 ,200, 100, 50);
                        		if(x==150)
                        		{
                                		clearInterval(intervalId);
                                		move2();
                        		}
                		}
        		}
        
        		function move2()
        		{
                		intervalId=setInterval(moveDown,10);
                
                		function moveDown()
                		{
                        		y+=1;
                        		ctx.clearRect(0,0, c.width, c.height);
                        		ctx.drawImage(customer, x, y, 50, 50);
                        		ctx.drawImage(table, 200 ,200, 100, 50);
                        		if(y==200)
                        		{
                                		clearInterval(intervalId);
						generateQuestion(100,100);
                        		}
                		}
        		}
			
			function reset()
        		{
                		x=20;
                		y=0;
                		ctx.clearRect(0,0, c.width, c.height);
                		ctx.drawImage(table, 200, 200, 100, 50);
                		updateScore();
                		var rand= Math.floor(Math.random()*3+1);
                		var t= setTimeout(function(){newCustomer()}, rand*1000);
        		}

