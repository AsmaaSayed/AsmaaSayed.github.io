
console.log("Start");
//////////////////////////////////////////////////////////////////
//for unix format
Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
if(!Date.now) Date.now = function() { return new Date(); }
Date.time = function() { return Date.now().getUnixTime(); }

////////////////////////////////////////////////////////////////
var myJSON;
function save(){
 
    var x = document.getElementById("male");
    if(x.checked == true){
        gen="male";
    }
    else{gen="female";}

    var myObject={
          name:document.getElementById("fname").value,
          ID_n:document.getElementById("idn").value,
          age:document.getElementById("ag").value,
          phone:document.getElementById("phn").value,
          email:document.getElementById("em").value,
          country:document.getElementById("coun").value,
         city:document.getElementById("cit").value,
          address:document.getElementById("add").value,
          emergency:document.getElementById("emer").value,
          date:document.getElementById("dat").value,
          gender:gen,
          username:document.getElementById("user").value,
          password:document.getElementById("pass").value

    };
    var y=/^[ A-Za-z]+$/;
     var bool1=true,
         bool2=true,
         bool3=true;
   
    if(!myObject.name){ alert("!Please enter your name");}
    else{
        if(!((myObject.name).match(y))){alert("!Numbers not allowed in name filed"); bool1=false;}
    }
    if(!myObject.age){ alert("!Please enter your ID");}
    if(!myObject.phone){ alert("!Please enter your phone");}
    if(!myObject.email){ alert("!Please enter your email");}
    if(!myObject.country){ alert("!Please enter your country");}
    else{
        if(!((myObject.country).match(y))){alert("!Numbers allowed in country filed"); bool2=false;}
    }
    if(!myObject.city){ alert("!Please enter your city");}
    else{
        if(!((myObject.city).match(y))){alert("!Numbers not allowed in city filed"); bool3=false;}
    }
    if(!myObject.address){ alert("!Please enter your address");}
    if(!myObject.emergency){ alert("!Please enter your emergency phone");}
    if(!myObject.date){ alert("!Please enter date");}
    if(!(document.getElementById("male").checked) && !(document.getElementById("female").checked) )
    { alert("!Please enter your gender"); }
    else {var z=true;}
    if(!myObject.username){alert("!Please enter the username of your WiFi");}
    if(!myObject.password){alert("!Please enter the password of your WiFi ")}
    //convert date to unix format
    myObject.date=new Date(myObject.date).getUnixTime(); 
    
   if((myObject.name) && (myObject.age) && (myObject.phone) && (myObject.email) && (myObject.country)&& (myObject.city) && (myObject.address)&& (myObject.emergency)&&(myObject.date) && z && bool1 && bool2 && bool3 && (myObject.username) && (myObject.username))
   { 
   myJSON=JSON.stringify(myObject);
    console.log("JSON String:");
    console.log(myJSON);
    console.log("Object:");
    console.log(myObject);
    
    //Sending data to ESP32 using Websocket Protocol
    if("WebSocket" in window){
        var ws= new WebSocket("ws://192:168.4.1:81");

        ws.onopen=function(){
            alert("Connected to ESP32");
        if(ws.readyState === WebSocket.OPEN){
            
            ws.send(myJSON);
        }    
    };

    ws.onclose=function(){
      alert("Connection is Failed. \n Tray again ");
    };

 }

    else{
        alert("Your browser not supported the WebSocke, Please change the browser")
 }

 //End WebSocket
    

   }
    
}
