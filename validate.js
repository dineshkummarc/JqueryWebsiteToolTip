// holds an instance of XMLHttpRequest
var xmlHttp = createXmlHttpRequestObject();
// holds the remote server address 
var serverAddress = "/validate.php";
// when set to true, display detailed error messages
var showErrors = true;
// initialize the validation requests cache 
var cache = new Array();

// creates an XMLHttpRequest instance
function createXmlHttpRequestObject() 
{
  // will store the reference to the XMLHttpRequest object
  var xmlHttp;
  // this should work for all browsers except IE6 and older
  try
  {
    // try to create XMLHttpRequest object
    xmlHttp = new XMLHttpRequest();
  }
  catch(e)
  {
    // assume IE6 or older
    var XmlHttpVersions = new Array("MSXML2.XMLHTTP.6.0",
                                    "MSXML2.XMLHTTP.5.0",
                                    "MSXML2.XMLHTTP.4.0",
                                    "MSXML2.XMLHTTP.3.0",
                                    "MSXML2.XMLHTTP",
                                    "Microsoft.XMLHTTP");
    // try every id until one works
    for (var i=0; i<XmlHttpVersions.length && !xmlHttp; i++) 
    {
  	  try 
  	  { 
  	    // try to create XMLHttpRequest object
  	    xmlHttp = new ActiveXObject(XmlHttpVersions[i]);
  	  } 
      catch (e) {} // ignore potential error
    }
  }
  // return the created object or display an error message
  if (!xmlHttp)
    displayError("Error creating the XMLHttpRequest object.");
  else 
    return xmlHttp;
}

// function that displays an error message
function displayError($message)
{
  // ignore errors if showErrors is false
  if (showErrors)
  {
    // turn error displaying Off
    showErrors = false;
    // display error message
    alert("Error encountered: \n" + $message);
    // retry validation after 10 seconds
    setTimeout("validate();", 10000);
  }
}

// the function handles the validation for any form field
function validate(inputValue, fieldID)
{
  // only continue if xmlHttp isn't void
  if (xmlHttp)
  {
    // if we received non-null parameters, we add them to cache
    // by concatenating their values using the '&' separator
    if (fieldID)
      cache.push(inputValue + "&" + fieldID);
    // try to connect to the server
    try
    {
      // continue only if the XMLHttpRequest object isn't busy
      // and the cache is not empty
  	  if ((xmlHttp.readyState == 4 || xmlHttp.readyState == 0)
  	      && cache.length>0)
  	  {
  	  	 
  	    // get next set of values from cache
  	    var cacheEntry = cache.shift();
	      // split the array element and extract the field id and value 
  		  var values = cacheEntry.split("&");
  		  inputValue = values[0];
  		  fieldID = values[1];
	      // make a server request to validate the extracted data
  	    params = "inputValue=" + inputValue + "&fieldID=" + fieldID;
  	    
  	    xmlHttp.open("POST", serverAddress, true);
  	    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  	    xmlHttp.onreadystatechange = handleRequestStateChange;
  	    xmlHttp.send(params);
  	  }
    }
    catch (e)
    {
  	  // display an error when failing to connect to the server
  	  displayError(e.toString());
    }
  }
}

function validate2(inputValue, inputValue2,fieldID)
{
  // only continue if xmlHttp isn't void
  if (xmlHttp)
  {
    // if we received non-null parameters, we add them to cache
    // by concatenating their values using the '&' separator
    if (fieldID)
      cache.push(inputValue + "&" + inputValue + "&" + fieldID);
   
    // try to connect to the server
    try
    {
      // continue only if the XMLHttpRequest object isn't busy
      // and the cache is not empty
  	  if ((xmlHttp.readyState == 4 || xmlHttp.readyState == 0)
  	      && cache.length>0)
  	  {
  	  	 
  	    // get next set of values from cache
  	    var cacheEntry = cache.shift();
	      // split the array element and extract the field id and value 
  		  var values = cacheEntry.split("&");
  		  inputValue = values[0];
  		  fieldID = values[1];
	      // make a server request to validate the extracted data
  	    params = "inputValue=" + inputValue + "&inputValue2=" + inputValue2 + "&fieldID=" + fieldID;
  	    xmlHttp.open("POST", serverAddress, true);
  	    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  	    xmlHttp.onreadystatechange = handleRequestStateChange;
  	    xmlHttp.send(params);
  	     
  	  }
    }
    catch (e)
    {
  	  // display an error when failing to connect to the server
  	  displayError(e.toString());
    }
  }
}

// function that handles the HTTP response
function handleRequestStateChange() 
{
  // when readyState is 4, we read the server response
  if (xmlHttp.readyState == 4) 
  {
    // continue only if HTTP status is "OK"
    if (xmlHttp.status == 200) 
    {
      try
  	  {
  	    // read the response from the server
        readResponse();
  	  }
  	  catch(e)
  	  {
  	    // display error message
  	    displayError(e.toString());
  	  }
    }
    else
    {
  	  // display error message
  	  displayError(xmlHttp.statusText);
    }
  }
}

// read server's response 
function readResponse()
{
  // retrieve the server's response 
  var response = xmlHttp.responseText;
  // server error?
  if (response.indexOf("ERRNO") >= 0 
      || response.indexOf("error:") >= 0
      || response.length == 0)
    throw(response.length == 0 ? "Void server response." : response);
  // get response in XML format (assume the response is valid XML)
  responseXml = xmlHttp.responseXML;
  // get the document element
  xmlDoc = responseXml.documentElement;
  result = xmlDoc.getElementsByTagName("result")[0].firstChild.data;
  fieldID = xmlDoc.getElementsByTagName("fieldid")[0].firstChild.data;
  // find the HTML element that displays the error
  message = document.getElementById(fieldID + "_error");
  // show the error or hide the error
  //message.className = (result == "0") ? "error" : "hidden";

  if(result == "0"){
  	message.innerHTML = "<font color=\"red\">Not Valid</font>";
  }
  
  if(result == "1"){
  	message.innerHTML = "<font color=\"#00ff00\">Valid</font>";
  }
  //message.innerHTML = (result == "0") ? "Username is too short" : "Username is ok";
  // call validate() again, in case there are values left in the cache
  setTimeout("validate();", 1000);
}

// sets focus on the first field of the form
function setFocus()		
{
 if(document.getElementById("username"))
  document.getElementById("username").focus();
 else
  document.getElementById("brand_title").focus();
}

function setFocus2()		
{
  document.getElementById("brand_title").focus();
}