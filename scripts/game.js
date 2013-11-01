			var c;
			var ctx;
			var score;
			var answer;
			
			$(function(){
				c=document.getElementById("canvas");
				ctx=c.getContext("2d");
				score=0;
				ctx.font="30px Arial";
				paint();
			});
			
			function paint(){
				ctx.clearRect(0,0,c.width,c.height);
				ctx.fillText("Score: "+score,10,50);
				generateQuestion(100,100);
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
				paint();
			}
			
			function generateQuestion(x,y){
				ctx.fillText(getRandomQuestion(),x,y);
			}