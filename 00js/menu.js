function itemOnclick(event){
 pItem=event.target;

 

 //if (pItem.childNodes.length<=0)//檢查有沒有child
  //return;

 if (pItem.getElementsByTagName("ul").length<=0)//檢查是否有ul的tag
  return;

 nItem=pItem.getElementsByTagName("ul")[0];

 if (nItem.className=="mainItem")//主要item不設定
  return;

 if (nItem.display==null)//檢查變數是否是第一次設定
  nItem.display=false;

 if(nItem.display==false){//檢查element顯示狀態
  nItem.style.display="inline";
  nItem.display=true;
 }
 else{
  nItem.style.display="none";
  nItem.display=false;
 }
 
}


function changeMainPage(urlStr){//更換主頁
 var a = document.createElement('a');
 a.href=urlStr;
 a.target = 'main';
  document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
}

function addItemForAnnotations()//!!!測試 加入選項
{
 var allUL=document.body.getElementsByTagName("ul");
 var aLI = document.createElement("li");
 aLI.innerHTML="----------";
 for(i=1;i<allUL.length;i++)
 {
  allUL[i].appendChild(aLI);
 }

}

function addMainItemLI(name)
{
 var liTmp=document.createElement("li");
 var txt=document.createTextNode(name);
 var ulTmp=document.createElement("ul");
 
 liTmp.appendChild(txt);
 liTmp.appendChild(ulTmp);
 liTmp.id=name;
 document.getElementById("mainUL").appendChild(liTmp);
 
}

function addItemLI(path)
{
 var name=path.split("__");
 var selfID=path;
 var pareID=selfID.replace("__"+name[name.length-1], "");
 var pareLI=document.getElementById(pareID);
 var pareUL=pareLI.getElementsByTagName('ul')[0];
 //var pareUL=pareLI.childNodes[1];

 var liTmp=document.createElement("li");
 var txt=document.createTextNode(name[name.length-1]);
 var ulTmp=document.createElement("ul");
 liTmp.appendChild(txt);
 liTmp.appendChild(ulTmp);
 liTmp.id=selfID;
 
 pareUL.appendChild(liTmp);
 

}


function createItem()
{
 for(i=0;i<menu.length;i++)
 {
  if(menu[i].split("__").length==1)
   addMainItemLI(menu[i]);
  else
   addItemLI(menu[i]);

 }

}







