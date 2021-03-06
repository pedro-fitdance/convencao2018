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

	document.getElementById("form__search__button").innerHTML = "PESQUISANDO...";
	var documento = document.getElementById("documentoForm").value;
	return firebase
		.database()
		.ref("/user/" + documento)
		.once("value")
		.then((snapshot) => {
			if (snapshot.val()) {
				if (snapshot.val().checkin === "false") {
					document.getElementById("name").innerHTML = snapshot.val().name;
					document.getElementById("checkin").innerHTML = snapshot.val().checkin;
					document.getElementById(
						"documento",
					).innerHTML = snapshot.val().documento;
					document.getElementById("form__checkin__button").style.display =
						"flex";
					document.getElementById("form__search__button").innerHTML =
						"PESQUISAR";
				} else {
					document.getElementById("dialog").style.display = "flex";
					document.getElementById("form__search__button").innerHTML =
						"PESQUISAR";
					document.getElementById("dialog__msg").innerHTML =
						"O portador desse documento já fez checkin!";
				}
			} else {
				document.getElementById("dialog").style.display = "flex";
				document.getElementById("form__search__button").innerHTML = "PESQUISAR";
				document.getElementById("dialog__msg").innerHTML =
					"Não existe nenhum inscrito com esse documento!";
			}
		})
		.catch((e) => {
			document.getElementById("dialog").style.display = "flex";
			document.getElementById("form__search__button").innerHTML = "PESQUISAR";
			document.getElementById("dialog__msg").innerHTML =
				"Algum erro aconteceu! Entre em contato com o suporte" + e;
		});
}

function handleUpdate(event, id) {
	event.preventDefault();

	document.getElementById("form__checkin__button").innerHTML =
		"Fazendo checkin...";
	return firebase
		.database()
		.ref()
		.child("/user/" + id)
		.update({ checkin: "true" })
		.then(() => {
			document.getElementById("dialog").style.display = "flex";
			document.getElementById("dialog__msg").innerHTML =
				"Checkin realizado com sucesso!";
			document.getElementById("form__checkin__button").innerHTML =
				"Fazer checkin";
			document.getElementById("documentoForm").value = "";
			document.getElementById("name").innerHTML = "";
			document.getElementById("checkin").innerHTML = "";
			document.getElementById("documento").innerHTML = "";
			document.getElementById("form__checkin__button").style.display = "none";
		})
		.catch((e) => {
			document.getElementById("dialog").style.display = "flex";
			document.getElementById("form__checkin__button").innerHTML =
				"Fazer checkin";
			document.getElementById("dialog__msg").innerHTML =
				"Algum erro aconteceu! Entre em contato com o suporte" + e;
			document.getElementById("documentoForm").value = "";
		});
}

function handleDialog() {
	document.getElementById("dialog").style.display = "none";
	document.getElementById("dialog__msg").innerHTML = "";
	document.getElementById("documentoForm").value = "";
}

function handleDialogCreate() {
	document.getElementById("dialog__cadastro").style.display = "flex";
}

function handleDialogCadastro() {
	document.getElementById("dialog__cadastro").style.display = "none";
	document.getElementById("dialog__cadastro__msg").innerHTML = "";
	document.getElementById("nomeCreate").innerHTML = "";
	document.getElementById("documentoCreate").innerHTML = "";
}

function handleCreateNew() {
	event.preventDefault();

	var nomeCreate = document.getElementById("nomeCreate").value;
	var documentoCreate = document.getElementById("documentoCreate").value;

	document.getElementById("button_criar").innerHTML = "Criando...";

	firebase
		.database()
		.ref("user/" + documentoCreate)
		.set({
			name: nomeCreate,
			documento: documentoCreate,
			checkin: "false",
			newUser: "true",
		})
		.then(() => {
			document.getElementById("dialog__cadastro__msg").innerHTML =
				"Cadastro realizado com sucesso! <br /> Confirme o checkin!";
			document.getElementById("name").innerHTML = nomeCreate;
			document.getElementById("checkin").innerHTML = "false";
			document.getElementById("documento").innerHTML = documentoCreate;
			document.getElementById("button_criar").innerHTML = "Criar";
			document.getElementById("form__checkin__button").style.display = "flex";
			document.getElementById("nomeCreate").value = "";
			document.getElementById("documentoCreate").value = "";
		})
		.catch((e) => {
			document.getElementById("button_criar").innerHTML = "Criar";
			document.getElementById("dialog__cadastro__msg").innerHTML =
				"Algum erro aconteceu! Entre em contato com o suporte" + e;
		});
}
