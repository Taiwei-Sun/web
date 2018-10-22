function setVariable(n)
{
 var h=window.innerHeight;
 var w=window.innerWidth;

 document.boardNum=n;
 document.goSrc=["00images/go1.png","00images/go2-1.png","00images/go2-2.png","00images/go2-3.png","00images/go2-4.png","00images/go3-1.png","00images/go3-2.png","00images/go3-3.png","00images/go3-4.png"];
 document.menuSrc=["00images/menu1.png","00images/menu2.png"];
 document.pieceColor=["","00images/block.png","00images/white.png"];
 document.currentUser='1';
 document.maxUser=2;
 document.teNumber=0;

 if(h>w)document.windowDirection=1;//check length for height and width on window
 else document.windowDirection=0;

 document.bh=h/(n+2);//set height and width of box for piece
 document.bw=w/(n+2);


 if(document.windowDirection==1)document.bh=document.bh*w/h;//select smaller
 else document.bw=document.bw*h/w;

 document.ph=document.bh*2/3;//set height and width of piece
 document.pw=document.bw*2/3;

 document.menuH=document.bh;//set height and width of menu
 document.menuW=document.bh;
}


function setBoard()
{
 var bh=document.bh;
 var bw=document.bw;
 var by=document.bh;
 var bx=document.bw;
 var goImg=document.goSrc;
 var n=document.boardNum;

 for(y=0;y<n;y++){
  for(x=0;x<n;x++){
   var bDiv=document.createElement("div");
   var id=x+'-'+y;
   //alert(id);
   bDiv.style.position="absolute";
   bDiv.id=id;
   
   
   
   //set rotate and src 
   if(x>0&&x<n-1&&y>0&&y<n-1)//center
   {   
    bDiv.style.backgroundImage = "url("+goImg[0]+")";
   }   
   else if((x>0&&x<n-1)||(y>0&&y<n-1))
   {   
    if(y==0)bDiv.style.backgroundImage = "url("+goImg[1]+")";
    else if(x==0)bDiv.style.backgroundImage = "url("+goImg[2]+")";
    else if(x==n-1)bDiv.style.backgroundImage = "url("+goImg[3]+")";
    else bDiv.style.backgroundImage = "url("+goImg[4]+")";
   }   
   else//corner 
   {   
    if(x==0&&y==0)bDiv.style.backgroundImage = "url("+goImg[5]+")";
    else if(y==0)bDiv.style.backgroundImage = "url("+goImg[6]+")";
    else if(x==0)bDiv.style.backgroundImage = "url("+goImg[7]+")";
    else bDiv.style.backgroundImage = "url("+goImg[8]+")";
   }
   
   bDiv.style.backgroundSize = ""+bh+"px "+bw+"px";
   
   bDiv.style.height=bh+'px';
   bDiv.style.width=bw+'px';
   
   bDiv.style.top=by+'px';
   bDiv.style.left=bx+'px';
   
   bDiv.bx=x;
   bDiv.by=y;
   
   bDiv.setAttribute("onclick","placePiece("+x+","+y+")");//add listen
   //bDiv.setAttribute("onclick","addPiece("+id+")");//not work
   
   document.body.appendChild(bDiv);
   bx=bx+bw;
  }
  bx=bw;
  by=by+bh;
 }

}

function addPiece(x,y,user)
{
 var ph=document.ph;//piece height and width
 var pw=document.pw;
 var bh=document.bh;
 var bw=document.bw;
 var pImg=document.createElement("img");
 var box=document.getElementById(x+'-'+y);
 document.teNumber++;
 //pImg.px=x;
 //pImg.py=y;
//alert("1.pImg.x="+x+" pImg.y="+y);
 pImg.te=document.teNumber;
 //pImg.className=pImg.te;
 //pImg.own=user;
 //alert("pImg.own="+pImg.own+" user="+user);
 pImg.src=document.pieceColor[user];
 pImg.style.height=ph+'px';
 pImg.style.width=pw+'px';
 pImg.style.top=bh/2-ph/2+'px';
 pImg.style.left=bw/2-pw/2+'px';

 pImg.style.position="absolute";
 box.appendChild(pImg);
 box.own=user;
 box.className="hand"+pImg.te;

 //document.test.innerHTML=document.test.innerHTML+" -  ("+box.id+").className="+"hand"+pImg.te;//!!!
}


function canPlace(x,y)
{
 var box=document.getElementById(x+'-'+y);
 if(box.childNodes.length==1)return false;//There is already a pawn

 return true;
}

function cleanGroup(oldC,newC)
{
 var groupC=document.getElementsByClassName(newC);
 
 for(var i=0;i<groupC.length;i++)
 {
  //document.test.innerHTML=document.test.innerHTML+" 1.groupC["+i+"].className="+groupC[i].className;//!!!
  groupC[i].classList.remove(oldC);
  //document.test.innerHTML=document.test.innerHTML+" 2.groupC["+i+"].className="+groupC[i].className;//!!!
 }

}

function changeGroup(oldC,newC)
{
 
 var groupC=document.getElementsByClassName(oldC);
 //document.test.innerHTML=document.test.innerHTML+" groupC.length="+groupC.length;//!!!
 //document.test.innerHTML=document.test.innerHTML+" 1.groupC[0].className="+groupC[0].className;//!!!
 //document.test.innerHTML=document.test.innerHTML+"  b";//!!!
 for(var i=0;i<groupC.length;i++)
 {
  //document.test.innerHTML=document.test.innerHTML+" 123 ";//!!!
  //groupC[i].className=newC;
  groupC[i].classList.add(newC);
  //groupC[i].classList.remove(oldC);
  //document.test.innerHTML=document.test.innerHTML+" - pan("+groupC[i].id+").className modify "+groupC[i].className;//!!!
  //document.test.innerHTML=document.test.innerHTML+" 456 newC="+newC+" ";//!!!
 }
 //document.test.innerHTML=document.test.innerHTML+" 2.groupC[0].className="+groupC[0].className;//!!!
 //document.test.innerHTML=document.test.innerHTML+"  c";//!!!
 cleanGroup(oldC,newC);
}


function addPieceGroupCheck(x,y)
{
 
 var center=document.getElementById(x+'-'+y);
 var up=document.getElementById(x+'-'+(y-1));
 var down=document.getElementById(x+'-'+(y+1));
 var left=document.getElementById((x-1)+'-'+y);
 var right=document.getElementById((x+1)+'-'+y);
 var newC=center.className;
 

 if(up&&up.childNodes.length==1&&up.own==center.own&&up.className!=newC)changeGroup(up.className,newC);
 
 if(down&&down.childNodes.length==1&&down.own==center.own&&down.className!=newC)changeGroup(down.className,newC);
 
 if(left&&left.childNodes.length==1&&left.own==center.own&&left.className!=newC)changeGroup(left.className,newC);
 //document.test.innerHTML=document.test.innerHTML+"  a";//!!!
 if(right&&right.childNodes.length==1&&right.own==center.own&&right.className!=newC)changeGroup(right.className,newC);
 //document.test.innerHTML=document.test.innerHTML+"  d";//!!!
}

function checkBoxLive(center)
{
 var x=center.bx;
 var y=center.by;
 var n=document.boardNum
 
 if(y==0)var upL=1;
 else var upL=document.getElementById(x+'-'+(y-1)).childNodes.length;
 if(y==n-1)var downL=1;
 else var downL=document.getElementById(x+'-'+(y+1)).childNodes.length;
 if(x==0)var leftL=1;
 else var leftL=document.getElementById((x-1)+'-'+y).childNodes.length;
 if(x==n-1)var rightL=1;
 else var rightL=document.getElementById((x+1)+'-'+y).childNodes.length;


 if(upL!=0 && downL!=0 && leftL!=0 && rightL!=0)return false;
 else return true;

}

function delPiece(box)
{
 box.removeChild(box.childNodes[0]);
}


function checkGroupLiveAndEat(classB)
{

 groupB=document.getElementsByClassName(classB);
 //alert("groupB.length="+groupB.length);
 for(var i=0;i<groupB.length;i++){
  //alert(groupB[i].childNodes[0].px);
  if(checkBoxLive(groupB[i]))return;//alive
  
 }
 //dead
 for(var i=0;i<groupB.length;i++)
  delPiece(groupB[i]);
}

function eatPieceGroupCheck(x,y)
{
 var center=document.getElementById(x+'-'+y);
 var up=document.getElementById(x+'-'+(y-1));
 var down=document.getElementById(x+'-'+(y+1));
 var left=document.getElementById((x-1)+'-'+y);
 var right=document.getElementById((x+1)+'-'+y);

 if(up&&up.childNodes.length==1&&up.own!=center.own)checkGroupLiveAndEat(up.className);
 if(down&&down.childNodes.length==1&&down.own!=center.own)checkGroupLiveAndEat(down.className);
 if(left&&left.childNodes.length==1&&left.own!=center.own)checkGroupLiveAndEat(left.className);
 if(right&&right.childNodes.length==1&&right.own!=center.own)checkGroupLiveAndEat(right.className);
 

}

function placePiece(x,y)
{
 
 if(!canPlace(x,y))return;
 
 addPiece(x,y,document.currentUser);
 
 addPieceGroupCheck(x,y);
 
 var p=document.getElementById(x+"-"+y).childNodes[0];
 
 eatPieceGroupCheck(x,y);
 //document.test.innerHTML=document.test.innerHTML+" "+document.teNumber;//!!!
 document.currentUser++;
 if(document.currentUser>document.maxUser)document.currentUser=1;
}

function setMenu()
{
 var menuImg=document.menuSrc;
 var mh=document.menuH;
 var mw=document.menuW;
 if(document.windowDirection==1){var mx=window.innerWidth*30/100;var my=document.bh*(document.boardNum+3);}
 else {var my=window.innerHeight*30/100;var mx=document.bw*(document.boardNum+3);}
 
 var menuBox=document.createElement("div");
 menuBox.style.backgroundImage="url("+menuImg[0]+")";
 menuBox.style.backgroundRepeat="no-repeat";
 menuBox.style.backgroundSize = ""+mh+"px "+mw+"px";
 menuBox.style.height=mh+'px';
 menuBox.style.width=mw+'px';
 menuBox.style.position="absolute";
 menuBox.style.top=my+'px';
 menuBox.style.left=mx+'px';
 document.body.appendChild(menuBox);
 
 
 
}

function setText()
{
 //!!!test
 if(document.windowDirection==1){var mx=window.innerWidth*50/100;var my=document.bh*(document.boardNum+4);}
 else {var my=window.innerHeight*50/100;var mx=document.bw*(document.boardNum+4);}
 
 
 var test=document.createElement("p");
 //test.id="testText";
 document.test=test;
 test.innerHTML="test";
 //menuBox.style.height=mh+'px';
 //menuBox.style.width=mw+'px';
 test.style.position="absolute";
 test.style.top=my+'px';
 test.style.left=mx+'px';
 document.body.appendChild(test);

}

function goStart()
{
 
 setVariable(19);

 setBoard();

 setMenu();
 
 setText();
 //document.test.innerHTML="123456";
 
}


//alert("test"); 

