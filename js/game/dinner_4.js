function Start_Dinner_4() {
	n(". . .");
	m("É porque seu pai quase nunca está em casa, não é?");
	m("Sem uma figura masculina forte, você fica confuso...");

	Choose({
		"É, porque o pai é um ÓTIMO exemplo mesmo.": function (message) {
			n(message);
			m("Nick, não importa o que aconteça, ele é seu pai. Você deve amá-lo.");
			My_Fault();
		},
		"Não é assim que funciona. Eu seria bi de qualquer jeito.": function (message) {
			n(message);
			m("Como você sabe?! Você é especialista em psicologia?!");
			My_Fault();
		},
		"Sabe de uma coisa? Talvez você esteja certa.": function (message) {
			n(message);
			m("Eu sei...");
			My_Fault();
		},
	});
}

function My_Fault() {
	Show("clock_time", "clock_1930");

	n(". . .");
	m("Isso tudo é culpa minha...");
	m(
		"Eu te disse para tomar cuidado com esse tipo de gente, mas falei tarde demais..."
	);

	Show("mom", "mom_cry");

	m("[choro]");
	m("Oh Nick! Meu pobre filho!");

	Show("nicky", "dinner_nicky_sit");

	Choose({
		"Mãe... por favor, não chore...": Cry_1,
		"Para com esse choro falso.": Cry_2,
		"[chora]": Cry_3,
	});
}

function Cry_1(message) {
	$.crying = "sympathy";

	n(message);
	m("huu... huu... huu...");
	n("Desculpa. Sobre o Jack, as mentiras, tudo.");
	m("owww... owww...");
	n("Eu retiro tudo que disse.");
	m("snif...");
	n("...por favor...");
	What_Are_You();
}

function Cry_2(message) {
	$.crying = "anger";
	Show("nicky", "dinner_nicky_defiant");

	n(message);
	m("huu... huu... huu...");
	n("Sério, é MUITO falso.");
	m("owww... owww...");
	n("Você pode calar a boca?!");
	m("snif...");
	n("CALA. A. BOCA.");
	What_Are_You();
}

function Cry_3(message) {
	$.crying = "mocking";
	Show("nicky", "dinner_nicky_outrage");

	n("BAWWWWW");
	m("huu... huu... huu...");
	n("UAH UAH UAH UAH UAHHH");
	m("owww... owww...");
	n("BRRrrRR-BRR-BRbR BUAH BUAHRR rrrRRR-UaahHH WO WO WO RaaahhH");
	m("snif...");

	Show("nicky", "dinner_nicky_defiant");
	n("Pronto, acabou?");
	What_Are_You();
}

function What_Are_You() {
	m(". . .");
	m("Nick... o que você é?");
	n("Como assim?");

	Show("nicky", "dinner_nicky_sit");

	Show("mom", "mom_sit");
	m("O que <i>você</i> é?");

	Choose({
		"Sou bissexual.": function (message) {
			$.what_are_you = "bisexual";

			n(message);
			if ($.admit_bisexuality) {
				m("...e você disse que isso significa...");
			}
			n("Sexualmente atraído por homens e mulheres.");
			m("Você não pode ser os dois.");
			m("Você tem que escolher um.");
			n("Não é assim que funciona. Nem um pouco.");
			Have_You_Had_Sex();
		},
		"Só estou confuso.": function (message) {
			$.what_are_you = "confused";

			n(message);
			m("...Eu sei.");
			m("Desculpa o Jack ter te confundido.");
			m("Você só está passando por uma fase, tudo bem.");
			n(". . .");
			m("Tudo bem. Tudo bem...");
			Have_You_Had_Sex();
		},
		"Sou seu filho, poxa.": function (message) {
			$.what_are_you = "son";

			n(message);
			n(". . .");
			n("Não basta isso?");
			Have_You_Had_Sex();
		},
	});
}

function Have_You_Had_Sex() {
	m(". . .");
	m("Você fez sexo com o Jack?");
	Choose({
		"Sim.": function (message) {
			n(message);
			m("[ENGASGA]");
			Have_You_Had_Sex_2();
		},
		"Não.": function (message) {
			n(message);
			m("Por favor, pare de mentir... Eu vi suas mensagens...");
			n("A gente só trocou mensagens, não fez nada de fato--");
			m("...e suas fotos...");
			Have_You_Had_Sex_2();
		},
		"Não vou dizer.": function (message) {
			n(message);
			m("ai meu deus... você fez.");
			Have_You_Had_Sex_2();
		},
	});
}

function Have_You_Had_Sex_2() {
	n(". . .");
	m("Qual de vocês... é a mulher?");

	Show("nicky", "dinner_nicky_outrage");

	n("AH, QUAL É!");
	n("É tipo perguntar qual hashi é a colhe--");
	m("Qual de vocês?...");

	Show("nicky", "dinner_nicky_defiant");

	Choose({
		"Eu geralmente sou o passivo.": function (message) {
			$.top_or_bottom = "bottom";

			n(message);
			Throw_Up();
		},
		"O Jack é, na maioria das vezes.": function (message) {
			$.top_or_bottom = "top";

			n(message);
			m("I-isso... quer dizer que você ainda pode ser hétero! C-certo?...");
			m("Se... sabe... você é quem coloca o seu...");
			m("seu...");
			Throw_Up();
		},
		"A gente reveza.": function (message) {
			$.top_or_bottom = "versatile";

			n(message);
			Throw_Up();
		},
	});
}

function Throw_Up() {
	PlaySound("sfx", "dinner_vomit");

	Show("clock_time", "clock_1940");
	Show("mom", "mom_vomit");
	Show("table", "dinner_table_2");
	Wait(1000);

	Choose({
		"o quê.": Father_Soon,
		"o queee.": Father_Soon,
		"o queeeeeeeeeeeeeee.": Father_Soon,
	});
}

function Father_Soon(message) {
	n(message);

	Show("mom", "mom_sit");

	m(". . .");
	m("Seu pai vai chegar logo.");
	n("A comida está fria. Bom, exceto o lugar que você acabou de, ah, devolver.");
	m("Seu pai está atrasado. Deve ter sido um dia estressante no trabalho.");
	m("Então... por favor... quando ele chegar...");
	m("Promete que vai manter tudo isso em segredo?");
	n(". . .");

	m("Não conte para ele sobre o Jack.");

	switch ($.what_are_you) {
		case "bisexual":
			m("Não conte para ele que você acha que é bissexual.");
			break;
		case "confused":
			m("Não conte para ele que você está confuso sobre sua sexualidade.");
			break;
		case "son":
			m("Não conte para ele que você mentiu para nós para... fazer coisas com o Jack.");
			break;
	}

	switch ($.top_or_bottom) {
		case "top":
			m("Não conte para ele que você faz do Jack uma mulher.");
			break;
		case "bottom":
			m("Não conte para ele que você age como mulher com o Jack.");
			break;
		case "versatile":
			m("Não conte para ele que você e o Jack agem como mulheres.");
			break;
	}

	m("Tudo bem?...");

	Choose({
		"Tudo bem.": function (message) {
			$.promise_silence = "yes";

			n(message);
			m("Tudo bem.");
			m(". . .");
			m("Seu pai chegou.");
			Father_Soon_2();
		},
		"Não. Não está tudo bem.": function (message) {
			$.promise_silence = "no";

			n(message);
			m("Nick, não não não, por favor--");
			m("Ai não. Seu pai chegou.");
			Father_Soon_2();
		},
		"Se você também não contar pra ele.": function (message) {
			$.promise_silence = "tit for tat";

			n(message);
			m("Eu não vou.");
			n("Promete que você também não vai.");
			m("Eu pro--");
			m("Shhh. Seu pai chegou.");
			Father_Soon_2();
		},
	});
}

function Father_Soon_2() {
	Show("nicky", "dinner_nicky_sit");
	Start_Dinner_5();
}
