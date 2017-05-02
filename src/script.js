
/* src: http://jsbin.com/wejayokavo/edit?html,css,js */

$(document).ready(function() {
	var username = localStorage.getItem("username");
    $("#current_user").html(username);

	var timer;
	var Stringmenit;
	var Stringsecond;
	var Stringmili;

	for (var i = 0; i < 5; i++) {
//		localStorage.removeItem("arr");
//		localStorage.removeItem("user"+i);
//		localStorage.removeItem("time"+i);
		$("#user"+(i+1)).html(localStorage.getItem("user"+i));
		$("#time"+(i+1)).html(localStorage.getItem("time"+i));
	}

  /*Trigger Game On Click*/
  $("#start_button").click(function(event) {
    clearInterval(timer);      
    startTimer();
    
    $("li").removeClass("flipped");  
    $("li").removeClass("matched");  

    $("li").click(function (event) {
      //Prevent Recursion
      event.stopImmediatePropagation();

      if ($(this).hasClass('matched')) {  
        return;  
      }
      $(this).toggleClass("flipped");

      var flipped = $(".flipped").not(".matched");

      if (flipped.length === 2 ) {  
        var firstCard = flipped.first(); 
        var myClass = firstCard.attr("class"); 
        var secondCard = flipped.last(); 
        var myClass2 = secondCard.attr("class"); 
        
        if (myClass === myClass2) {  
            firstCard.addClass("matched");  
            secondCard.addClass("matched");
        } else {  
          	setTimeout(function () {  
            firstCard.removeClass("flipped");  
            secondCard.removeClass("flipped");  
          }, 500);  
        }

        if($(".matched").length == 16){
        	clearTimeout(timer);
        	record();
        	var arr = JSON.parse(localStorage.getItem("arr"));

        	for (var i = 0; i < arr.length; i++) {
        		localStorage.setItem("user"+i, arr[i].name);
        		localStorage.setItem("time"+i, arr[i].time);

        		$("#user"+(i+1)).html(localStorage.getItem("user"+i));
        		$("#time"+(i+1)).html(localStorage.getItem("time"+i));
        	}
        	return;
        }   
      }
    });
    /*Randomize*/
    randomize();
  });

	function startTimer(){
		$("#menit").html("00");
		$("#second").html("00");
		$("#milisecond").html("00");

	 	timer=setInterval(function(){
		    menit=parseInt($("#menit").html());
		    second=parseInt($("#second").html());
		    milisecond=parseInt($("#milisecond").html());

			if (milisecond + 1 > 99) {
				milisecond = 0;
				
				if (second + 1 > 59) {
					second = 0;
					menit += 1;
				} 
				else {
					second += 1;
				}
			}
			else {
				milisecond += 1;
			}

			Stringmenit= "" + menit;
			Stringsecond= "" + second;
			Stringmili= "" + milisecond;

			if(milisecond < 10){
				Stringmili= "0" + milisecond;
			}
			if(second < 10){
				Stringsecond= "0" + second;
			}
			if(menit < 10){
				Stringmenit= "0" + menit;
			}

			$("#menit").html(Stringmenit);
			$("#second").html(Stringsecond);
			$("#milisecond").html(Stringmili);

	  }, 10); 
	}

	function record() {
		var time = Stringmenit + ":" + Stringsecond + ":" + Stringmili;
		var user = new Object();
		user.name = username;
		user.time = time;
		var array;

		if (localStorage.getItem("arr") !== null) {
			array = JSON.parse(localStorage.getItem("arr"));
		} else {
			array = [];
		}
		
		array.push(user);	
		for (var i = 0; i < array.length-1; i++) {
			for (var j = 0; j < array.length-1; j++) {
				if (array[j].time > array[j+1].time) {
					var temp = array[j];
					array[j] = array[j+1];
					array[j+1] = temp;
				}
			}
		}

		if (array.length == 6){
			array.pop();
		}

		localStorage.setItem("arr", JSON.stringify(array));
	}
	    
    $("#out_button").click(function(event) {
      /* Act on the event */
      window.location.href = "login.html";
    });  
});

/*src: http://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order*/
function randomize(){
  var ul = document.querySelector('.game');
  for (var i = ul.children.length; i >= 0; i--) {
      ul.appendChild(ul.children[Math.random() * i | 0]);//bitwise OR
  }
}



