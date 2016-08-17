var url="http://localhost:3000/api/";




var userlogged=true;
var assemblyname="PAH Raval";


function OnLoadIndex(){
    htmlMainMenu();
    getEvictions();
}
function OnLoadNewEviction(){
    htmlMainMenu();
    htmlFormNewEviction();
}
function htmlMainMenu(){
    var html="";

    html+="<nav>";
    html+="    <div class='nav-wrapper teal lighten-2'>";
    html+="        <a href='#!' class='brand-logo'>PAH app ";
    html+="<div class='chip'>"+assemblyname+"</div>";
    html+="</a>";
    html+="        <a href='#' data-activates='mobile-demo' class='button-collapse'><i class='material-icons'>menu</i></a>";
    html+="        <ul class='right hide-on-med-and-down'>";
    if(userlogged==true){
        html+="            <li><a href='neweviction.html'><i class='material-icons'>add</i></a></li>";
        html+="            <li><a href='editassembly.html'><i class='material-icons'>perm_identity</i></a></li>";
        html+="            <li><a href='logout.html'><i class='material-icons'>settings_power</i></a></li>";
    }else{
        html+="            <li><a href='signin.html'>Signup</a></li>";
        html+="            <li><a href='login.html'> Login</a></li>";
    }
    html+="        </ul>";
    html+="        <ul class='side-nav' id='mobile-demo'>";
    html+="            <li><a href='index.html'>Home</a></li>";
    if(userlogged==true){
        html+="            <li><a href='neweviction.html'>Add eviction</a></li>";
        html+="            <li><a href='editassembly.html'>Edit assembly</a></li>";
        html+="            <li><a href='logout.html'>Logout</a></li>";
    }else{
        html+="            <!--<li><a href='signin.html'>Signup</a></li>";
        html+="            <li><a href='login.html'> Login</a></li>-->";
    }
    html+="        </ul>";
    html+="    </div>";
    html+="</nav>";

    document.getElementById('idMainMenu').innerHTML=html;


    $(".button-collapse").sideNav();
}


function getEvictions(){
    $.ajax({
        type: "GET",
        dataType: "json",
        url: url+"evictions",
        success: function(data){
            htmlEvictions(data);
        }
    });
}
function htmlEvictions(d){
    var html="";
    for(var i=0; i<d.length; i++)
    {
        html+="<div class='card'>";
        html+="    <div class='card-image waves-effect waves-block waves-light'>";
        html+="        <img class='activator' style='width:200px!important;' src='img/stopdesnonaments.png'>";
        html+="    </div>";
        html+="    <div class='card-content'>";
        html+="        <span class='card-title activator grey-text text-darken-4'>"+d[i].title+"<i class='material-icons right'>more_vert</i></span>";
        html+="        <p><a href='#'>"+d[i].assembly+"</a></p>";
        html+="    </div>";
        html+="    <div class='card-reveal'>";
        html+="        <span class='card-title grey-text text-darken-4'>"+d[i].title+"<i class='material-icons right'>close</i></span>";
        html+="        <p>"+d[i].description+"</p>";
        html+="        <p>"+d[i].hour+"</p>";
        html+="        <p>"+d[i].direction+"</p>";
        html+="        <p>"+d[i].access+"</p>";
        html+="        <p>"+d[i].city+"</p>";
        html+="        <p>"+d[i].district+"</p>";
        html+="        <p>"+d[i].assembly+"</p>";
        html+="    </div>";
        html+="</div>";
    }
    document.getElementById('idAppContent').innerHTML=html;
}



/* NEW EVICTION */
function htmlFormNewEviction(){
    var html="";

    html+="<div class='row'>";
    html+="<form class='col s12'>";
    html+="    <div class='row'>";
    html+="        <div class='input-field col s6'>";
    html+="            <input id='title' type='text' class='validate'>";
    html+="            <label for='title'>Title</label>";
    html+="        </div>";
    html+="        <div class='input-field col s6'>";
    html+="            <input id='description' type='text' class='validate'>";
    html+="            <label for='description'>Description</label>";
    html+="        </div>";
    html+="    </div>";
    html+="    <div class='row'>";
    html+="        <div class='input-field col s6'>";
    html+="            <input id='date' type='text' class='validate'>";
    html+="            <label for='date'>Date</label>";
    html+="        </div>";
    html+="        <div class='input-field col s6'>";
    html+="            <input id='hour' type='text' class='validate'>";
    html+="            <label for='hour'>Hour</label>";
    html+="        </div>";
    html+="    </div>";
    html+="    <div class='row'>";
    html+="        <div class='input-field col s6'>";
    html+="            <input id='direction' type='text' class='validate'>";
    html+="            <label for='direction'>Direction</label>";
    html+="        </div>";
    html+="        <div class='input-field col s6'>";
    html+="            <input id='access' type='text' class='validate'>";
    html+="            <label for='access'>Access</label>";
    html+="        </div>";
    html+="    </div>";
    html+="    <div class='row'>";
    html+="        <div class='input-field col s6'>";
    html+="            <input id='district' type='text' class='validate'>";
    html+="            <label for='district'>District</label>";
    html+="        </div>";
    html+="        <div class='input-field col s6'>";
    html+="            <input id='city' type='text' class='validate'>";
    html+="            <label for='city'>City</label>";
    html+="        </div>";
    html+="    </div>";
    html+="    <div class='row'>";
    html+="        <div class='input-field col s6'>";
    html+="             <div onclick='OnBtnPostNewEviction()' class='waves-effect waves-light btn'>Enviar</div>";
    html+="        </div>";
    html+="    </div>";
    html+="</form>";
    html+="</div>";

    document.getElementById('idAppContent').innerHTML=html;
}
function OnBtnPostNewEviction(){
    obj={
        title: document.getElementById('title').innerHTML,
        date: document.getElementById('date').innerHTML,
        hour: document.getElementById('hour').innerHTML,
        direction: document.getElementById('direction').innerHTML,
        description: document.getElementById('description').innerHTML,
        access: document.getElementById('access').innerHTML,
        city: document.getElementById('city').innerHTML,
        district: document.getElementById('district').innerHTML,
        assembly: assemblyname
    };

    var tok="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Il9fdiI6ImluaXQiLCJkaXN0cmljdCI6ImluaXQiLCJjaXR5IjoiaW5pdCIsImRlc2NyaXB0aW9uIjoiaW5pdCIsImRpcmVjdGlvbiI6ImluaXQiLCJtYWlsIjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsIm5hbWUiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJkaXN0cmljdCI6dHJ1ZSwiY2l0eSI6dHJ1ZSwiZGVzY3JpcHRpb24iOnRydWUsImRpcmVjdGlvbiI6dHJ1ZSwibWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsIm5hbWUiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiXX19LCJpc05ldyI6ZmFsc2UsIl9tYXhMaXN0ZW5lcnMiOjAsIl9kb2MiOnsiX192IjowLCJkaXN0cmljdCI6IlJhdmFsIiwiY2l0eSI6IkJhcmNlbG9uYSIsImRlc2NyaXB0aW9uIjoiZGVzY3JpcGNpbyB1c2VyIDEiLCJkaXJlY3Rpb24iOiJjL0F1cm9yYSIsIm1haWwiOiJtYWlsYXNzMUBhc3MxLnBhaCIsInBhc3N3b3JkIjoiYXNzcGFzcyIsIm5hbWUiOiJhc3MyIiwiX2lkIjoiNTdiMWZhNGM5N2E1ZDFmNjE2MDAwMDAyIn0sIl9wcmVzIjp7InNhdmUiOltudWxsLG51bGwsbnVsbF19LCJfcG9zdHMiOnsic2F2ZSI6W119LCJpYXQiOjE0NzE0NTA5NzYsImV4cCI6MTQ3MTQ1NDU3Nn0.PhS_XgzNh1iNOUNKcOkf9YOMSwIyk38p2xTEtGHu5H4";
    $.ajax({
        type: "POST",
        url: url+"evictions",
        data: obj,
        headers: {
            "Content-Type": "application/json",
            'X-Auth-Token' : tok
       },
        success: function(data){
            window.location.href='index.html';
        }
    });
}
