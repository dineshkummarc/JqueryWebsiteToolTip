	var click = false;
	var obj_selected=null;
	
	function set_message_2(obj,mess)
	{
		tekst = document.getElementById(obj).value;
		if ((tekst == null) || (tekst == "") || (tekst == mess))
		{
			document.getElementById(obj).value = "";
		}
	}
	
	function set_message()
	{
		tekst = document.getElementById('text').value;
		if ((tekst == null) || (tekst == "") || tekst == "Add your Message")
		{
			document.getElementById('text').value = "";
		}
	}
	
	function load_page(str,object)
	{
		//var url = 'strona.php'
		var url = 'gift_message.php';
		var myAjax = new Ajax.Request(url,
			{
				method: 'post',
				parameters: 'page='+str,
				onComplete: function(obj)
				{
				 $(object).innerHTML = obj.responseText;	
				}
			}
		);
	}
	
	function clear_message_2(obj,mess)
	{
		tekst = document.getElementById(obj).value;
		if ((tekst == null) || (tekst == ""))
		{
			document.getElementById(obj).value = mess;
		}
	}
	
	function clear_message()
	{
		tekst = document.getElementById('text').value;
		if ((tekst == null) || (tekst == ""))
		{
			document.getElementById('text').value = "Add your Message";
		}
	}
	
	function set_img(obj,nr)
	{		
		if (obj_selected==null)
		{
			tekst = "<img onclick=\"clear_img();\" src='/_mm/_d/_gifts/"+obj+"'/>";
			tekst = tekst + "<input type=\"hidden\" name=\"image\" value=\""+nr+"\"/>";
			document.getElementById('preview').innerHTML = tekst;
			obj_selected = obj;
			click = true
		}
	}
	
	function clear_img()
	{
		obj_selected=null;
		obj=null;
		document.getElementById('preview').innerHTML = "";
		click = false;
	}
	
	function show_img(obj)
	{
		if (!click)
		{
			tekst = "<img src='/_mm/_d/_gifts/"+obj+"'/>";
			document.getElementById('preview').innerHTML = tekst;
		}	
	}
	
	function hide_img()
	{
		if (!click)
		{
			document.getElementById('preview').innerHTML = "&nbsp;";
		}	
	}