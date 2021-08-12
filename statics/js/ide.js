let editor;

window.onload = function() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/c_cpp");
}

function changeLanguage() {

    let language = $("#languages").val();

    if(language == 'c' || language == 'cpp')editor.session.setMode("ace/mode/c_cpp");
    else if(language == 'php')editor.session.setMode("ace/mode/php");
    else if(language == 'python')editor.session.setMode("ace/mode/python");
    else if(language == 'node')editor.session.setMode("ace/mode/javascript");
}

function executeCode() {

    $.ajax({

        url: "/compile",

        method: "GET",

        data: {
            language: $("#languages").val(),
            code: editor.getSession().getValue()
        },

        success: function(response) {
            $(".output").text(response)
        }
    })
}

function downloadCode() {
	

    $.ajax({

        url: "/download",

        method: "GET",

        data: {
            language: $("#languages").val(),
            code: editor.getSession().getValue()
        },

        success: function(response) {
          var a_href = $('#download').attr('href');
            $('#download').attr('href',response);
            document.getElementById("download").innerHTML = "Download Now";
            //$(".output").text(document.write('<a href="' + response + '" download>Download Now</a>'))
			 //window.location = response;
			
        }
    })

}

function Share() {

    $.ajax({

        url: "/download",

        method: "GET",

        data: {
            language: $("#languages").val(),
            code: editor.getSession().getValue()
        },

        success: function(response) {
            $(".output").text(window.prompt("source code is copied to below link.",window.location.href+response))
			
        }
    })
   
}


function Redirect() {
    window.location = "/";
 }

 var elem = document.documentElement;
 function openCloseFullscreen() {
   if(document.getElementById("fullscreen").innerHTML == "Close Fullscreen"){
       document.getElementById("fullscreen").innerHTML = "Fullscreen";
       closeFullscreen();
   }else{
   document.getElementById("fullscreen").innerHTML = "Close Fullscreen";
   openFullscreen();
   }
   
   }
   
   function openFullscreen() {
     if (elem.requestFullscreen) {
       elem.requestFullscreen();
     } else if (elem.webkitRequestFullscreen) { /* Safari */
       elem.webkitRequestFullscreen();
     } else if (elem.msRequestFullscreen) { /* IE11 */
       elem.msRequestFullscreen();
     }
     
   }
   
   function closeFullscreen() {
     if (document.exitFullscreen) {
       document.exitFullscreen();
     } else if (document.webkitExitFullscreen) { /* Safari */
       document.webkitExitFullscreen();
     } else if (document.msExitFullscreen) { /* IE11 */
       document.msExitFullscreen();
     }
   }