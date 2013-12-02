function CustomerPrototype (id)
			{
				this.id=id;
				this.x=-50;
				this.y=34;
				this.src= "images/redcircle.png";
				this.src2="images/redCircleSelected.png";
				this.img= new Image();
				this.img.src=this.src;
				this.timer;
				this.currentTable;
				this.seated=false;
				this.reset=function(ctx)
				{
					timerStop(this.id);
					
					ctx.clearRect(this.x-2, this.y-2, 53, 53);
					this.x=-50;
					this.y=34;
					this.seated=false;
					update();
					document.getElementById("questionDisplay").value = "";
					setButtonsDisabled(true);
					freeTables.push(this.currentTable);
					this.currentTable=null;
					
					newCustomer(this.id);
					
				}
				
				
			
			}
			
			
function TablePrototype (id, x ,y)
		{
			this.id=id;
			this.src= "images/KEY_Table_sprite.png";
			this.img=new Image();
			this.img.src=this.src;
			this.x=x;
			this.y=y;	
			
			this.activated=false;
		}



