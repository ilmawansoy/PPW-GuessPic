$(document).ready(function(){
	$("#submit").click(function() {
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		
		$.get('src/login.json', function(data) {
			//Kalo gabisa, ilangin parsenya
			var users = data.users;
			var flag = false;
			
			for (var i = 0; i < users.length; i++) {
			 	if (users[i].username == username && users[i].password == password) {
			 		flag = true;
			 		localStorage.setItem("username", username);
			 		window.location.href = "game.html";
			 	}
			}
			if (flag == false) {
				alert("Username dan Password Salah");
			}
		});
	});
});	

