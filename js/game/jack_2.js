function Start_Jack_2() {
	Show("background", "bedroom_2");
	Show("us", "bedroom_us_2");
	Show("light", "bedroom_light_2", { x: 0, y: 159 });

	PlaySound("bg", "bedroom_2", { loop: -1, volume: 0.5 });

	if ($.punched) {
		Show("punch", "bedroom_punch", { x: 256, y: 404 });
	}

	n("Oi Jack.");
	if ($.sadsack) {
		j("Olá, Nicky querido. Ainda um saco de tristeza?");
	} else {
		j("Olá, Nicky querido.");
	}
	j(
		"Como foi se assumir para seus pais? Eu te avisei, não avisei?"
	);

	Choose({
		"Jack... a gente fez besteira, Jack.": function (message) {
			n(message);
			j("Não... não, não.");
			j("Você está brincando, né? O que aconteceu?");
			What_Happened();
		},
		"Poderia ter sido pior.": function (message) {
			n(message);
			j("Ah. Ah não.");
			j("Eu não esperava que eles... o que... o que aconteceu?");
			What_Happened();
		},
		"Cala a boca, Jack.": function (message) {
			n(message);
			j("Ha, sim, eu sabia que estava certo!");
			n("Não. Jack, a gente não pode mais se ver.");
			j("Espera.");
			j("Não, não, não. Você está brincando, né? O que aconteceu?");
			What_Happened();
		},
	});
}

function What_Happened() {
	if ($.punched) {
		Choose({
			"Meu pai me deu um soco na cara.": What_Happened_Abuse,
			"Eles vão me fazer mudar de escola.": What_Happened_School,
			"Eles leram todas as nossas mensagens.": What_Happened_Texts,
		});
	} else if ($.father_oblivious == false) {
		Choose({
			"Meus pais ficaram verbalmente violentos um com o outro.": What_Happened_Abuse,
			"Eles vão me fazer mudar de escola.": What_Happened_School,
			"Eles leram todas as nossas mensagens.": What_Happened_Texts,
		});
	} else {
		n("Bem, meu pai está alheio. Por enquanto. Mas minha mãe...");
		if ($.changing_schools) {
			Choose({
				"Ela vai me fazer mudar de escola.": What_Happened_School,
				"Ela está tentando me arranjar com uma garota que nunca conheci.": What_Happened_Girl,
				"Ela leu todas as nossas mensagens.": What_Happened_Texts,
			});
		} else {
			Choose({
				"Ela arranjou um tutor para ocupar todas as minhas horas livres.":
					What_Happened_School,
				"Ela está tentando me arranjar com uma garota que nunca conheci.": What_Happened_Girl,
				"Ela leu todas as nossas mensagens.": What_Happened_Texts,
			});
		}
	}
}

function What_Happened_Abuse(message) {
	$.told_jack = "abuse";

	n(message);
	j("Meu Deus!");
	j("Nicky, você precisa ligar para o Conselho Tutelar.");
	n("O quê?! Não. Isso é demais.");
	j(
		"Só... ok, mas pelo menos promete que vai falar com o orientador da escola amanhã?"
	);
	n("Tá bom.");
	j(". . .");
	What_Happened_2();
}
function What_Happened_School(message) {
	$.told_jack = "school";

	n(message);
	j("Não!");
	j("Por quê?! Por que eles estão fazendo isso?");
	n(
		"Porque 'Jack e a escola são uma má influência para mim', ou algo assim. Eles só querem separar a gente."
	);
	j("Isso é horrível...");
	What_Happened_2();
}
function What_Happened_Girl(message) {
	$.told_jack = "girl";

	n(message);
	j("Eca, sério?");
	n("O nome dela é Claire Alguma-coisa. Ela também vai ser minha tutora.");
	j("Eca em dobro, estão te arranjando com sua própria tutora?");
	n("Pois é.");
	What_Happened_2();
}
function What_Happened_Texts(message) {
	$.told_jack = "texts";

	n(message);
	j("Isso é simplesmente rude!");
	j("Espera, o que você vai fazer com essas mensagens agora?");
	n("Vou esconder melhor. Meus pais não são exatamente experts em tecnologia.");
	j("...simplesmente rude.");
	What_Happened_2();
}

function What_Happened_2() {
	n("E isso é só uma das três coisas horríveis que aconteceram.");
	j("Nicky...");
	j("Eu estou realmente, realmente arrependido.");
	j("Isso é culpa minha. Fui eu que te incentivei a se assumir para seus pais. Que burrice minha.");

	Choose({
		"É, burrice sua.": function (message) {
			$.blame = "jack";

			n(message);
			n(
				"Se você não tivesse ficado com esse papo de 'ahhh Nicky se assumir faz bem pra alma' e tal, nada disso teria..."
			);
			j(". . .");
			n("Desculpa. Você é a única pessoa em quem posso descontar.");
			n("Não é horrível isso?");
			What_Now();
		},
		"Não, a culpa é DELES.": function (message) {
			$.blame = "parents";

			n(message);
			n(
				"Eles já tinham lido nossas mensagens. Nada do que eu dissesse depois disso mudaria o que aconteceu."
			);
			if ($.told_jack != "texts") {
				j("O quê! Você não me disse que eles também leram suas mensagens!");
			} else {
				j(
					"E eles estão presos nas moralidades antiquadas deles, coitados."
				);
				n("Eu não chegaria a ter pena deles.");
			}
			What_Now();
		},
		"Não, a culpa é toda minha.": function (message) {
			$.blame = "nicky";

			n(message);
			n(
				"Eu devia ter colocado senha no celular, ou usado mensagem criptografada, ou escondido melhor..."
			);
			if ($.told_jack != "texts") {
				j("Eles também leram suas mensagens?...");
			}
			j(
				"Nicky, você tinha todo direito de confiar neles, são seus pais. Eles abusaram dessa confiança. Não é sua culpa."
			);
			n("É...");
			What_Now();
		},
	});
}

function What_Now() {
	j(". . .");

	n("Sabe... conversar com meus pais é tipo...");
	n("Aquele modo de comunicação?");
	n("É impreciso, impessoal, impossível de realmente se conectar.");

	j(". . .");
	j("E agora?");

	Choose({
		"Vou sabotar os planos dos meus pais.": function (message) {
			n(message);

			if ($.told_jack == "texts") {
				n("Vou criar um novo e-mail e número virtual para falar com você.");
				n("Assim eles não podem mais espionar nossas conversas.");
			} else if ($.told_jack == "girl") {
				n(
					"Vou contar tudo para a Claire. Com sorte, ela vai me ajudar a lutar contra isso."
				);
			} else {
				n("Vou dar um jeito, de algum modo...");
			}

			What_Now_2();
		},
		"Vou falar com o orientador da escola amanhã.": function (message) {
			n(message);

			if ($.told_jack == "abuse") {
				n("Como prometi. Como você me fez prometer.");
			} else if ($.told_jack == "school") {
				n(
					"Na escola atual, claro. Não sei quando vão me transferir."
				);
			} else {
				n("Pelo menos vai ser mais alguém em quem posso descontar.");
			}

			What_Now_2();
		},
		"Vou sair dessa casa.": function (message) {
			n(message);

			n(
				"Não estou fugindo, quero dizer. Mas se eu fugisse, poderia ficar na sua casa."
			);
			n(
				"Mas enfim. Vou tentar conseguir um estágio ou bolsa nos EUA."
			);
			n("E ficar bem longe dessas pessoas.");
			What_Now_2();
		},
	});
}

function What_Now_2() {
	j("Não, quero dizer... e agora, entre nós?");
	n("Jack...");
	j("O que a gente faz? O que... o que acontece?");
	n(". . .");

	Choose({
		"A gente tem que terminar.": function (message) {
			$.breaking_up_soon = true;

			n(message);

			j("Não, não, não...");
			n("Não posso fazer isso com você, Jack. Não posso te arrastar comigo.");
			j("Pelo menos, não diga 'a gente ainda pode ser amigo'.");
			n("a gente ainda pode ser am");
			n(". . .");
			j("Porque, claro que somos amigos. Claro que sim.");
			n(". . .");
			What_Now_3();
		},
		"A gente fica junto enquanto der.": function (message) {
			n(message);

			j(". . .");
			j("Enquanto der.");
			n(". . .");
			What_Now_3();
		},
		"Não sei.": function (message) {
			$.breaking_up_soon = true;

			n(message);

			j(". . .");
			What_Now_3();
		},
	});
}

function What_Now_3() {
	n("Está tarde.");
	n("Tenho muita coisa para pensar agora.");
	j("Ok.");
	j(". . .");
	j("Eu te amo, Nicky.");
	n("Eu também te amo, Jack.");

	var insult = "";
	if ($.hippies) insult += " hippie alternativo";
	if ($.im_a_poet) insult += " poeta amador";
	if (insult != "") {
		n("Seu" + insult + ".");
	} else {
		n("Seu bobo.");
	}

	The_Game_Ends();
}

function The_Game_Ends() {
	Wait(500);
	Start_Outro();
}
