// Initialize Firebase
var config = {
	apiKey: "AIzaSyBg1sYn-VXAPYsauQFOA9g6Tp2IyZjW7pw",
	authDomain: "convencao2018-d06f3.firebaseapp.com",
	databaseURL: "https://convencao2018-d06f3.firebaseio.com",
	projectId: "convencao2018-d06f3",
	storageBucket: "convencao2018-d06f3.appspot.com",
	messagingSenderId: "48447584086",
};
firebase.initializeApp(config);
var database = firebase.database();

function handleSearch(event) {
	event.preventDefault();

	var documento = document.getElementById("documentoForm").value;
	return firebase
		.database()
		.ref("/user/" + documento)
		.once("value")
		.then((snapshot) => {
			if (snapshot.val()) {
				if (snapshot.val().checkin === "false"){
					document.getElementById("name").innerHTML = snapshot.val().name;
					document.getElementById("checkin").innerHTML = snapshot.val().checkin;
					document.getElementById(
						"documento",
					).innerHTML = snapshot.val().documento;
					document.getElementById("form__checkin").style.display = "flex";
				}else{
					document.getElementById("dialog").style.display = "flex";
					document.getElementById("dialog__msg") = "O portador desse documento já fez checkin!";
				}
			} else {
				document.getElementById("dialog").style.display = "flex";
				document.getElementById("dialog__msg") = "Não existe nenhum inscrito com esse documento!";
			}
		})
		.catch((e) => {
			document.getElementById("dialog").style.display = "flex";
			document.getElementById("dialog__msg") = "O portador desse documento já fez checkin!" + e;
		});
}

function handleUpdate(event, id) {
	event.preventDefault();
	return firebase
		.database()
		.ref()
		.child("/user/" + id)
		.update({ checkin: "true" });
}

function handleDialog(){
	document.getElementById("dialog").style.display = "none";
	document.getElementById("documentoForm").value = "";
};