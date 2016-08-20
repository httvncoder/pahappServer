var url="http://localhost:3000/api/";



var userlogged=false;
if(localStorage.getItem('pahusertoken')!=null)
{
    userlogged=true;
}


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
    html+="        <a href='index.html' class='brand-logo'>PAH app ";
    if(userlogged==true)
    {
        html+="<div class='chip'>"+localStorage.getItem('pahassemblyname')+"</div>";
    }else{

    }
    html+="</a>";
    html+="        <a href='#' data-activates='mobile-demo' class='button-collapse'><i class='material-icons'>menu</i></a>";
    html+="        <ul class='right hide-on-med-and-down'>";
    if(userlogged==true){
        html+="            <li><a href='neweviction.html'><i class='material-icons'>add</i></a></li>";
        html+="            <li><a href='editassembly.html'><i class='material-icons'>perm_identity</i></a></li>";
        html+="            <li><a onclick='onBtnLogout()' ><i class='material-icons'>settings_power</i></a></li>";
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
        html+="            <li><a onclick='onBtnLogout()'>Logout</a></li>";
    }else{
        html+="            <li><a href='signin.html'>Signup</a></li>";
        html+="            <li><a href='login.html'> Login</a></li>";
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
        html+="<div class='card col s12 m4 l4'>";
        html+="    <div class='card-image waves-effect waves-block waves-light'>";
        html+="        <img class='activator' style='width:200px!important;' src='img/stopdesnonaments.png'>";
        html+="    </div>";
        html+="    <div class='card-content'>";
        html+="        <span class='card-title activator grey-text text-darken-4'>"+d[i].title+"<i class='material-icons right'>more_vert</i></span>";
        if(d[i].assembly==localStorage.getItem('pahassemblyname'))
        {
            html+="        <p><a href='eviction.html?="+d[i]._id+"' class='btn'>Edit</a></p>";
        }
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
    html+="     <div id='loadbar'></div>";
    html+="</form>";
    html+="</div>";

    document.getElementById('idAppContent').innerHTML=html;
}
function OnBtnPostNewEviction(){
    ActivateLoadBar();
    obj={
        title: document.getElementById('title').value,
        date: document.getElementById('date').value,
        hour: document.getElementById('hour').value,
        direction: document.getElementById('direction').value,
        description: document.getElementById('description').value,
        access: document.getElementById('access').value,
        city: document.getElementById('city').value,
        district: document.getElementById('district').value,
        assembly: localStorage.getItem('pahassemblyname'),
        token: localStorage.getItem('pahusertoken')//provisional, la idea és passar-ho al header
    };

    $.ajax({
        type: "POST",
        url: url+"evictions",
        data: obj,
        dataType: "json",
        success: function(data){
            window.location.href='index.html';
        }
    });
}
/* </NEW EVICTION */

function ActivateLoadBar(){
    var html="";
    html+="<div class='progress'>";
    html+="    <div class='indeterminate'></div>";
    html+="</div>";
    document.getElementById('loadbar').innerHTML=html;
}
function DesactivateLoadBar(){
    document.getElementById('loadbar').innerHTML="";
}
/* LOGIN */
function onBtnLogin(){
    ActivateLoadBar();
    var obj={
        name: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    $.ajax({
        type: "POST",
        url: url+"assemblies/auth",
        data: obj,
        dataType: "json",
        success: function(data){
            if(data.success==false)
            {
                DesactivateLoadBar();
                toastr.error("login incorrecte");
            }else{
                localStorage.setItem('pahusertoken', data.token);
                localStorage.setItem('pahassemblyname', data.assemblyname);
                window.location.href='index.html';
            }
        }
    });
}
/* </LOGIN */
/* LOGOUT */
function onBtnLogout(){
    localStorage.removeItem('pahusertoken');
    localStorage.removeItem('pahassemblyname');
    window.location.href='index.html';
}
/* </LOGOUT */




/* EVICTION.html */
var wEviction; //wEviction--> working Eviction
function OnLoadEviction(){

    htmlMainMenu();

    var idEviction = window.location.href.split('?=')[1];

    $.ajax({
        type: "GET",
        dataType: "json",
        url: url+"evictions/" + idEviction,
        success: function(data){
            wEviction=JSON.parse(JSON.stringify(data));
            console.log(wEviction);
            var html="";
            html+="<h3>"+ data.title +"</h3>";
            html+="        <p>"+data.description+"</p>";
            html+="        <p>"+data.hour+"</p>";
            html+="        <p>"+data.direction+"</p>";
            html+="        <p>"+data.access+"</p>";
            html+="        <p>"+data.city+"</p>";
            html+="        <p>"+data.district+"</p>";
            html+="        <p>"+data.assembly+"</p>";
            if(data.assembly=localStorage.getItem('pahassemblyname'))
            {
                html+="<div class='right right-align'>";
                html+=" <div onclick='onBtnEditEviction()' class='waves-effect waves-light btn green lighten-2'>Edit eviction</div>";
                html+=" <br><br>";
                html+=" <div onclick='onBtnDeleteEviction()' class='waves-effect waves-light btn red lighten-2'>Delete eviction</div>";
                html+="</div>";
            }
            document.getElementById('idAppContent').innerHTML+=html;
        }
    });
}
function onBtnEditEviction(){
    var html="";

    html+="<div class='row'>";
    html+="<form class='col s12'>";
    html+="    <div class='row'>";
    html+="        <div class='input-field col s6'>";
    html+="            <input value='"+wEviction.title+"' id='title' type='text' class='validate'>";
    html+="            <label class='active' for='title'>Title</label>";
    html+="        </div>";
    html+="        <div class='input-field col s6'>";
    html+="            <input value='"+wEviction.description+"' id='description' type='text' class='validate'>";
    html+="            <label class='active' for='description'>Description</label>";
    html+="        </div>";
    html+="    </div>";
    html+="    <div class='row'>";
    html+="        <div class='input-field col s6'>";
    html+="            <input value='"+wEviction.date+"' id='date' type='text' class='validate'>";
    html+="            <label class='active' for='date'>Date</label>";
    html+="        </div>";
    html+="        <div class='input-field col s6'>";
    html+="            <input value='"+wEviction.hour+"' id='hour' type='text' class='validate'>";
    html+="            <label class='active' for='hour'>Hour</label>";
    html+="        </div>";
    html+="    </div>";
    html+="    <div class='row'>";
    html+="        <div class='input-field col s6'>";
    html+="            <input value='"+wEviction.direction+"' id='direction' type='text' class='validate'>";
    html+="            <label class='active' for='direction'>Direction</label>";
    html+="        </div>";
    html+="        <div class='input-field col s6'>";
    html+="            <input value='"+wEviction.access+"' id='access' type='text' class='validate'>";
    html+="            <label class='active' for='access'>Access</label>";
    html+="        </div>";
    html+="    </div>";
    html+="    <div class='row'>";
    html+="        <div class='input-field col s6'>";
    html+="            <input value='"+wEviction.district+"' id='district' type='text' class='validate'>";
    html+="            <label class='active' for='district'>District</label>";
    html+="        </div>";
    html+="        <div class='input-field col s6'>";
    html+="            <input value='"+wEviction.city+"' id='city' type='text' class='validate'>";
    html+="            <label class='active' for='city'>City</label>";
    html+="        </div>";
    html+="    </div>";
    html+="    <div class='row'>";
    html+="        <div class='input-field col s12'>";
    html+="             <div onclick='onBtnCancelEditEviction()' class='waves-effect waves-light btn indigo lighten-2'>Cancel</div>";
    html+="             <div onclick='onBtnUpdateEviction()' class='waves-effect waves-light btn right'>Actualitzar</div>";
    html+="        </div>";
    html+="    </div>";
    html+="     <div id='loadbar'></div>";
    html+="</form>";
    html+="</div>";

    document.getElementById('idAppContent').innerHTML=html;
}
function onBtnCancelEditEviction(){
    window.location.href=window.location.href;
}
function onBtnUpdateEviction(){
    ActivateLoadBar();
    obj={
        title: document.getElementById('title').value,
        date: document.getElementById('date').value,
        hour: document.getElementById('hour').value,
        direction: document.getElementById('direction').value,
        description: document.getElementById('description').value,
        access: document.getElementById('access').value,
        city: document.getElementById('city').value,
        district: document.getElementById('district').value,
        assembly: localStorage.getItem('pahassemblyname'),
        token: localStorage.getItem('pahusertoken')//provisional, la idea és passar-ho al header
    };

    $.ajax({
        type: "PUT",
        url: url+"evictions/"+wEviction._id,
        data: obj,
        dataType: "json",
        success: function(data){
            window.location.href=window.location.href;
        }
    });
}
function onBtnDeleteEviction(){
    document.getElementById('idAppContent').innerHTML+="<div id='loadbar'></div>";
    ActivateLoadBar();
    obj={
        token: localStorage.getItem('pahusertoken')//provisional, la idea és passar-ho al header
    };
    $.ajax({
        type: "DELETE",
        url: url+"evictions/"+wEviction._id,
        data: obj,
        dataType: "json",
        success: function(data){
            toastr.success("Eviction deleted");
            setTimeout(function(){
                window.location.href='index.html';
            }, 1000);
        }
    });
}
/* </EVICTION.html */
