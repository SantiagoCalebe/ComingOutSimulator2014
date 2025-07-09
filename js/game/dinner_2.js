function Start_Dinner_2() {
	m("Oi, querido.");
	Show("mom", "mom_sit");

	switch ($.waiting_action) {
		case "eat":
			m("Ah, você começou a comer sem mim. Você é muito impaciente.");
			n("...certo.");
			break;
		case "wait":
			m(
				"Você poderia ter começado sem mim. Não precisa deixar sua comida esfriar."
			);
			n("...claro.");
			break;
		case "play":
			m("É imaturo brincar com a comida, sabia?");
			n("Tá, tá.");
			break;
	}

	m(
		"Seu pai está atrasado. Ele vai jantar com a gente daqui a uma hora."
	);

	Choose({
		"Legal. Vamos comer.": function (message) {
			n(message);
			n("*nham nham nham*");
			m(". . .");
			m("Quais são seus planos para amanhã?");
			Start_Dinner_2_1();
		},
		"Tenho algo para contar para vocês dois.": function (message) {
			n(message);
			m("Tudo bem. Conte para nós dois quando ele voltar.");
			n("Ah. Ok.");
			m(". . .");
			n("*nham nham nham*");
			m("Então, quais são seus planos para amanhã?");
			Start_Dinner_2_1();
		},
		"Tem algo que preciso contar só para você primeiro.": function (message) {
			n(message);
			m("Calma Nick, ainda não perguntei sobre seu dia!");
			n("Hoje foi tranquilo.");
			m("Certo. E quais são seus planos para amanhã?");
			Start_Dinner_2_1();
		},
	});
}

function Start_Dinner_2_1() {
	n("Ah. É... estudar.");
	n("Sim. Amanhã vou estudar.");
	m("Qual matéria?");
	n("Er...");

	Choose({
		"Química.": function (message) {
			$.studying_subject = "Química";
			Start_Dinner_2_2(message);
		},
		"Cálculo.": function (message) {
			$.studying_subject = "Cálculo";
			Start_Dinner_2_2(message);
		},
		"Computação.": function (message) {
			$.studying_subject = "Computação";
			Start_Dinner_2_2(message);
		},
	});
}

function Start_Dinner_2_2(message) {
	n(message);
	m("Ótimo.");
	m(
		"Você realmente, realmente poderia melhorar suas notas na aula de " +
			$.studying_subject +
			"."
	);
	n(". . .");
	m("Então, estarei na biblioteca amanhã.");
	m("Vou te ver estudando lá?");
	n("Na verdade, vou estudar na casa do Jack.");
	m("De novo?");
	m("Você passa muito tempo com ele.");

	Choose({
		"A gente só estuda junto, só isso.": function (message) {
			$.relationship = "study";
			Buddy_1(message);
		},
		"Mãe, o Jack é... mais que um amigo.": function (message) {
			$.relationship = "best friend";
			n(message);

			$.lying_about_hanging_out = true;
			m("Ah, tipo melhores amigos?");
			n("Hm. Bem--");
			m("Então vocês só estão juntos, não estudando.");
			n("A GENTE ESTUDA SIM!");
			m(". . .");
			m("Tudo bem, só não minta pra mim.");
			n("Não estou mentindo.");
			Buddy_1_point_5();
		},
		"É, é isso que bons amigos fazem.": function (message) {
			$.relationship = "friend";
			Buddy_1(message);
		},
	});
}

function Buddy_1(message) {
	n(message);

	if ($.relationship != "study") {
		$.lying_about_hanging_out = true;
		m("Ah. Então vocês só estão juntos, não estudando.");
		n("A GENTE ESTUDA SIM!");
		m(". . .");
		m("Tudo bem, só não minta pra mim.");
		n("Não estou mentindo.");
	} else {
		m("Ok. Só estou conferindo.");
		n("Conferindo... o quê?");
	}

	Buddy_1_point_5();
}

function Buddy_Caught_Lying_1(message, callback) {
	n(message);
	m("Espera...");
	m("Achei que você disse que 'só estudavam juntos'.");
	m("Você não me contou que eram amigos.");
	$.lying_about_relationship = true;
	Choose({
		"Ops, quis dizer que ele é só colega de estudo.": callback,
		"Bem, ele também pode ser meu amigo...": callback,
		"Não, sempre disse que éramos amigos.": callback,
	});
}

function Buddy_1_point_5() {
	m("Só... não fique muito com ele.");
	m("As pessoas podem pensar errado.");

	Choose({
		"Ah. Não, sim, somos só amigos.": function (message) {
			if ($.relationship == "study" && !$.lying_about_relationship) {
				Buddy_Caught_Lying_1(message, Buddy_2);
			} else {
				Buddy_2(message);
			}
		},
		"A ideia errada pode ser a certa.": Buddy_4,
		"O que você quer dizer com... ideia errada?": Buddy_3,
	});
}

function Buddy_2(message) {
	n(message);
	m("Ok.");
	if ($.lying_about_relationship) {
		m("Só não minta pra mim.");
		n("Não vou.");
		m(". . .");
		m("Mas... sobre você sair com o Jack.");
	}
	m("É só que algumas pessoas podem assumir coisas, já que...");
	m("Você sabe... ele parece...");
	m("Gay?");
	Buddy_Choice();
}

function Buddy_3(message) {
	n(message);
	m("Só entre mãe e filho, acho que ele pode ser... sabe...");
	n("Não, o quê?");
	m("Gay!");
	m("Ele parece e fala como um gay.");
	Buddy_Choice();
}

function Buddy_4(message) {
	n(message);
	m("Ah, isso é tipo coisa de zen, né?");
	n("Hm.");
	m("Zen também é sobre natureza, e seu colega Jack, ele...");
	m("...sabe, não parece natural?");
	Choose({
		"Você acha que ele é gay.": function (message) {
			n(message);
			m("Sim!");
			m("Você também suspeita!");
			Buddy_Choice();
		},
		"Não fale isso do meu amigo!": function (message) {
			if ($.relationship == "study" && !$.lying_about_relationship) {
				Buddy_Caught_Lying_1(message, function (message) {
					n(message);
					m("Ok.");
					m("Só não minta pra mim.");
					n("Não vou.");
					m(". . .");

					m(
						"Mas sim, até você concorda que é ruim ser visto como 'não natural'."
					);
					n("Eu nunca disse--");
					m(
						"E só estou cuidando de você! Porque ele age como, sabe..."
					);
					m("Gay!");
					Buddy_Choice();
				});
			} else {
				n(message);
				m("Só estou sendo honesta.");
				m("Mas sim, até você concorda que é ruim ser visto como 'não natural'.");
				n("Eu nunca disse--");
				m(
					"E só estou cuidando de você! Porque ele age como, sabe..."
				);
				m("Gay!");
				Buddy_Choice();
			}
		},
		"O que quer dizer, ele não é natural?": Buddy_3,
	});
}

function Buddy_Choice() {
	if ($.relationship == "friend") {
		m("E já que você diz que ele é um 'bom amigo'...");
		m("As pessoas podem achar que você também é gay como ele.");
	}
	if ($.relationship == "best friend") {
		m("E já que você diz que ele é seu MELHOR amigo...");
		m("As pessoas podem achar que você também é gay como ele.");
	}
	Choose({
		"Haha, ele até parece gay. Mas não é.": function (message) {
			n(message);
			m("Viu? Você também acha que tem algo errado nisso.");
			n("...certo.");
			Buddy_Aftermath();
		},
		"Qual o problema de ser gay?!": function (message) {
			n(message);
			m("Nada! Nada.");
			Buddy_Aftermath();
		},
		"Talvez... meu amigo seja gay.": function (message) {
			if ($.relationship == "study" && !$.lying_about_relationship) {
				Buddy_Caught_Lying_1(message, function (message) {
					n(message);
					m("Ok.");
					m("Só não minta pra mim.");
					n("Não vou.");
					m(". . .");
					Buddy_Aftermath();
				});
			} else {
				n(message);
				Buddy_Aftermath();
			}
		},
	});
}

function Buddy_Aftermath() {
	m("Não me entenda mal.");
	m("Não estou dizendo que esse tipo de pessoa é ruim!");
	m("Só acho que... você deve tomar cuidado perto de um deles.");
	m("O Jack pode, sabe, tentar te recrutar.");

	Show("clock_time", "clock_1910");
	Show("nicky", "dinner_nicky_defiant");

	Choose({
		"o quê.": Buddy_Aftermath_2,
		"quêêê.": Buddy_Aftermath_2,
		"quuuuuuuuuuuuuê.": Buddy_Aftermath_2,
	});
}

function Buddy_Aftermath_2(message) {
	n(message);

	n("Como você sequer...");
	n("Aff, deixa pra lá.");
	m("Nick, desculpa se te irrito.");
	n("Não, mãe, para com is--");
	m("Vamos voltar a falar das suas notas.");
	m("Agora, o que você disse que ia estudar amanhã?");

	Show("nicky", "dinner_nicky_sit");
	n(". . .");
	n("Errrmmmmm...");

	Choose({
		"Computação?": function (message) {
			$.studying_subject_2 = "Computação";
			Grades_Start(message);
		},
		"Química?": function (message) {
			$.studying_subject_2 = "Química";
			Grades_Start(message);
		},
		"Cálculo?": function (message) {
			$.studying_subject_2 = "Cálculo";
			Grades_Start(message);
		},
	});
}

function Grades_Start(message) {
	n(message);
	m(". . .");
	if ($.studying_subject != $.studying_subject_2) {
		Grades_Start_1();
	} else {
		Grades_Start_2();
	}
}

function Grades_Start_1() {
	m("Você primeiro me disse que era " + $.studying_subject + ".");
	m("Agora diz que é " + $.studying_subject_2 + "?");
	$.lying_about_studying = true;
	n("Mãe, eu só me confun--");
	if ($.lying_about_hanging_out || $.lying_about_relationship) {
		m("É a SEGUNDA vez que você mente pra mim nesse jantar.");
		n("Eu não menti sobre--");
	}
	m("De qualquer forma, suas notas nas duas matérias estão péssimas.");
	n(". . .");
	Grades_Explaining();
}

function Grades_Start_2() {
	m("Você hesitou por um momento.");
	n("Eu estava comendo.");
	m("Ok.");
	if ($.lying_about_hanging_out) {
		m(
			"Fico pensando se você realmente estuda com o Jack ou só fica com ele."
		);
		n("A gente estuda.");
	}
	m(". . .");
	m(
		"Mesmo assim, suas notas em " +
			$.studying_subject_2 +
			" estão péssimas."
	);
	n(". . .");
	Grades_Explaining();
}

function Grades_Explaining() {
	Start_Dinner_3();
}
