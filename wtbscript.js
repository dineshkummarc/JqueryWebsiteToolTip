var modal=0;	
function showFlash(id) 
{
	document.getElementById(id).outerHTML = document.getElementById(id).outerHTML;
}
function updateFlash() 
{
	 objects = document.getElementsByTagName("object");
	 for (var i = 0; i < objects.length; i++) 
	 {
	 	objects[i].outerHTML = objects[i].outerHTML;
	 }
}
function commentClick(order)
{		
	var div = document.getElementById("commentarea");		
	var content= document.getElementById("commentcontent").value;
	var form = document.forms.addcommentform;
	
	if ((div.style.display=="none") || (content==""))
	{
		document.getElementById('commentorder').value=order;
		Effect.toggle(div, 'blind', { duration: 0.3, queue: 'end' }); 
	}
	else
	{
		document.getElementById('addcomment').value='1';
		form.submit();
	}
	return false;
}
function commentClickno(order)
{
	var div = document.getElementById("commentarea");
	var content= document.getElementById("commentcontent").value;
	var form = document.forms.addcommentformno;
	if ((div.style.display=="none") || (content==""))
	{
		document.getElementById('commentorderno').value=order;
		Effect.toggle(div, 'blind', { duration: 0.3, queue: 'end' }); 
	}
	else
	{
		document.getElementById('addcommentno').value='1';
		form.submit();
	}
	return false;
}
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
	}

	function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) 
{
	createCookie(name,"",-1);
}
function otworz(theURL,winName,features)
{
	window.open(theURL,winName,features);
}
function updateDIV(mydiv,url)
{
    	var params = 'param1=value&param2=value2';
    	var myAjax = new Ajax.Updater(mydiv, url, {asynchronous:true, evalScripts:true, onLoaded:function(request){Element.hide('progress')}, onLoading:function(request){Element.show('progress')}});
}
function updateWTBdiv(mydiv,url)
{
    	var params = 'param1=value&param2=value2';
   	var myAjax = new Ajax.Updater(mydiv, url, {asynchronous:true, evalScripts:true, onLoading:function(request){Element.show('progress')}, onLoaded: function(){Element.hide('progress'); new Effect.Appear('perms');}});
}

function updateWTBdiv_jQuery(element, url)
{
	var j = jQuery.noConflict();
	j.ajax({ url: url, success: function(data) { j(element).html(data); } });
}

function updateDIVlocations(mydiv,query, type, link, startt, amount)
{
    	var url = '/all_location.php?query='+query+'&type='+type+'&link='+link+'&start='+startt+'&amount='+amount;
    	var myAjax = new Ajax.Updater(mydiv, url, {asynchronous:true, evalScripts:true, onLoading:function(request){Element.show('progress')}, onLoaded: function(){Element.hide('progress'); new Effect.Appear('perms');}});
}    
function updateDIVuniversal(mydiv,query,link, startt, amount,linkname)
{
    	var url = '/all_'+linkname+'.php?query='+query+'&link='+link+'&start='+startt+'&amount='+amount;
	var myAjax = new Ajax.Updater(mydiv, url, {asynchronous:true, evalScripts:true, onLoading:function(request){Element.show('progress')}, onLoaded: function(){Element.hide('progress'); new Effect.Appear('perms');}});
}
function updateGifts(strona)
{
    	var url = '/gift_message.php?page='+strona;
	var myAjax = new Ajax.Updater('gifts_ajax', url, {asynchronous:true, evalScripts:true, onLoading:function(request){Element.show('progress')}, onLoaded: function(){Element.hide('progress'); new Effect.Appear('perms');}});
}
function updateDIV4(mydiv,url)
{
    	var params = 'param1=value&param2=value2';
    	var myAjax = new Ajax.Updater(mydiv, url, {asynchronous:true, evalScripts:true, onLoading:function(request){Element.show('progress')}, onLoaded: function(){Element.hide('progress'); new Effect.Appear('message');}});
}
function topbar()
{
	if(modal==1)
	{
  		document.getElementById('topbar').style.visibility='hidden';
  		document.getElementById('topbar').style.display='none';
  		modal=0;
  		return;
 	}
 	with(document.getElementById('topbar'))
	{
  		style.visibility='visible';
  		style.display='block';
  		modal=1;
 	}
}
