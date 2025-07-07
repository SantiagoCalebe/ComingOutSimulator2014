function Start_Dinner_5() {
	PlaySound("sfx", "dinner_door");

	f("Oi Qiying! Oi Nick!");
	f("Cheguei em casa!");

	Show("dad", "dad_serious");

	m("Oi querida.");
	n("E aí pai, como foi seu dia?");

	f(
		"Fiquei até mais tarde. Espero que o chefe perceba antes da minha Avaliação de Desempenho."
	);
	f("Na verdade, fiquei jogando jogos online o dia todo. Haha!");
	n("Ha ha.");

	f("Nick, por que os <i>seus</i> jogos online não são divertidos?");

	Choose({
		"Achei que meus jogos eram divertidos...": function (message) {
			n(message);
			f("Então tá! Você tem um senso de diversão meio doente, hein. Haha!");
			n(". . .");
			Casual();
		},
		"Nem todo jogo precisa ser divertido.": function (message) {
			n(message);
			f("Ah sim. Você está certo.");
			f("JOGOS RUINS não são divertidos. Haha!");
			n(". . .");
			Casual();
		},
		"ARTE!": function (message) {
			n(message);
			f("Pfft. Pra que serve arte?");
			f(
				"Daqui a pouco você vai estar escrevendo poesia ruim de amador, ou algo assim."
			);
			n(". . .");
			Casual();
		},
	});
}

function Casual() {
	f("Ei Qi, que molho é esse no seu prato?");
	f("Ah...");

	Show("clock_time", "clock_1950");

	Choose({
		"É vômito.": function (message) {
			n(message);

			$.grounded = 2;
			f("Nick! Uma semana de castigo!");
			f("Não insulte a comida da sua mãe.");
			f("A comida dela já se insulta sozinha. Haha!");

			Casual_2();
		},
		"Não coma isso! É, ah, realmente ruim.": function (message) {
			n(message);

			$.grounded = 1;
			f("Nick! Um dia de castigo!");
			f("Mostre respeito. Tenha mais fé na comida da sua mãe!");
			f("Porque do jeito que ela cozinha, só um milagre mesmo! Haha!");

			Casual_2();
		},
		"Por que você não experimenta, pai?": function (message) {
			n(message);

			$.grounded = 0;
			m("Nick...");
			f("Não me importo de provar!");
			f("[come uma colherada]");
			f(". . .");
			n(". . .");
			m(". . .");
			f("Bem, você já cozinhou pior, querida. Haha!");

			Casual_2();
		},
	});
}

function Casual_2() {
	m("Querido...");
	f("Então, filho! Como está a escola?");

	Choose({
		"A escola está bem.": function (message) {
			n(message);

			f("Mesmo, está bem?");
			if ($.studying_subject != $.studying_subject_2) {
				f(
					"E as suas notas ruins em " +
						$.studying_subject +
						" e " +
						$.studying_subject_2 +
						"?"
				);
			} else {
				f("E as suas notas ruins em " + $.studying_subject + "?");
			}

			m("Nick e eu estávamos falando sobre isso.");
			Getting_A_Tutor();
		},
		"Vou estudar na casa de um amigo amanhã.": function (message) {
			n(message);

			$.tried_talking_about_it = true;

			if ($.grounded > 0) {
				if ($.grounded == 1) {
					f("Não lembra? Acabei de te colocar de castigo amanhã.");
				}
				if ($.grounded == 2) {
					f("Não lembra? Acabei de te colocar de castigo por uma semana.");
				}
				f("Você deve ter herdado a burrice do lado da sua mãe. Haha!");

				n("Ah. Eu...");

				$.grounded++;
				if ($.grounded == 2) {
					f("Vou aumentar. Agora são duas semanas de castigo.");
				}
				if ($.grounded == 3) {
					f("Vou aumentar. Agora são TRÊS semanas de castigo.");
				}
			}

			m("Falando em estudar...");
			Getting_A_Tutor();
		},
		"PAI, EU SOU BI E ESTOU FICANDO COM O JACK.": function (message) {
			$.tried_talking_about_it = true;

			Show("nicky", "dinner_nicky_outrage");
			n("PAI, EU SOU BI--");
			Show("nicky", "dinner_nicky_sit");

			m("VOU DE BICICLETA para a escola todo dia a partir da semana que vem.");
			f("Ótimo!");
			f(
				"Você podia perder uns quilinhos, senão como vai arrumar uma namorada?"
			);
			f("Você deve ter herdado o peso do lado da sua mãe. Haha!");
			n("Ha ha.");
			m("Falando em escola...");
			Getting_A_Tutor();
		},
	});
}

function Getting_A_Tutor() {
	m("Estávamos pensando em contratar um tutor em casa.");
	f("Ah! É aquela tal de Claire?");

	Show("nicky", "dinner_nicky_defiant");

	switch ($.promise_silence) {
		case "yes":
			n("Mãe, nós dois prometemos não falar sobre isso...");
			if ($.tried_talking_about_it) {
				m("Você <i>acabou</i> de tentar falar sobre isso.");
			}
			break;
		case "no":
			n("Mãe, você disse que não ia falar sobre isso...");
			m("Você que não prometeu não falar!");
			break;
		case "tit for tat":
			n("Mãe, você disse que não ia falar disso se eu não falasse...");
			if ($.tried_talking_about_it) {
				m("Você <i>acabou</i> de tentar falar sobre isso.");
			}
			break;
	}

	f("Falando sobre o quê?...");
	f(
		"Eu sou o chefe dessa casa. É bom vocês não estarem escondendo segredos de mim."
	);
	m("Ah... Nick só gosta muito, muito da Claire.");

	Choose({
		"O quê?! Não gosto não!": function (message) {
			n(message);
			f("Não precisa ter vergonha.");
			Getting_A_Tutor_2();
		},
		"Tá bom. Você me pegou. Tenho uma queda pela Claire.": function (message) {
			n(message);
			Getting_A_Tutor_2();
		},
		"Eu tenho um namorado.": function (message) {
			n(message);
			f("Isso filho! Você vai ser um namorado!");
			n("<i>Tenho</i>. Eu <i>tenho</i> um--");
			Getting_A_Tutor_2();
		},
	});
}

function Getting_A_Tutor_2() {
	f("Você está virando um homem, filho!");
	f("Se eu tivesse sua idade, também largava sua mãe e corria atrás da Claire! Haha!");

	n("Isso é muito estranho, cara.");
	f("Tá respondendo? Cuidado, hein!");

	if ($.changing_schools) {
		m("Também pensamos em trocar o Nick de escola.");
		m("Talvez para a escola da Claire.");
	}
	if ($.studying_subject != $.studying_subject_2) {
		m(
			"A Claire vai dar aula particular para o Nick todo dia depois da escola em " +
				$.studying_subject +
				" e " +
				$.studying_subject_2 +
				"."
		);
	} else {
		m(
			"A Claire vai dar aula particular para o Nick todo dia depois da escola em " +
				$.studying_subject +
				"."
		);
	}

	f("Nick, o que acha disso tudo? Sim ou não?");
	m("Ele adora a ide--");
	f("Cala a boca, Qi. Perguntei pro meu filho.");
	m(". . .");

	Show("dad", "dad_threat");

	f("Senhor Nicklaus Liow.");
	if ($.changing_schools) {
		f("Quer mudar de escola só pra correr atrás da sua tutora gata?");
	} else {
		f(
			"Quer passar todas as tardes com sua tutora gata?"
		);
	}

	n("É complicado, eu--");
	f("Nada de respostas em cima do muro.");
	f("Sim. Ou. Não.");

	n(". . .");

	Choose({
		"Sim.": Agree_With_Dad,
		"Não.": Argue_With_Dad,
	});
}

function Agree_With_Dad() {
	n("...Sim.");

	f("Hm.");
	f("Vocês tomaram essa decisão importante bem rápido!");
	f(
		"Tão rápido que decidiram em menos de uma hora e tentaram esconder de mim. Que mudança repentina."
	);
	m(". . .");
	n(". . .");

	f("Nick, você fez alguma coisa errada, não fez?");
	f("O que você fez?");

	Choose({
		"Reprovei nas provas.": function (message) {
			n(message);

			f("...Ah.");
			f("É, você precisa melhorar suas notas.");

			Show("dad", "dad_serious");

			f("Senão vai acabar dando aula igual sua mãe! Haha!");
			n(". . .");
			Agreeable_Ending();
		},
		"Transei com o Jack.": function (message) {
			n(message);

			Show("mom", "mom_cry");
			m("[chora]");
			f(". . .");
			Argument_Ending();
		},
		"Transei com a Claire.": function (message) {
			n(message);

			m("...Nick!");
			f(". . .");
			f("   Nnnnnniiiiiiiiice.");
			m("...Querido!");
			f("Espera, você não engravidou ela, né?");
			n("Não. Não sou burro.");

			Show("dad", "dad_serious");

			f(
				"Ótimo. Senão você ia ficar vinte anos criando filho, igual eu! Haha!"
			);
			n("Ha ha.");
			Agreeable_Ending();
		},
	});
}

function Agreeable_Ending() {
	$.father_oblivious = true;

	f(
		"Por um momento, Nick, achei que você estivesse fumando maconha com seu colega hippie Jack, ou algo assim!"
	);

	Show("nicky", "dinner_nicky_sit");
	n(". . .");
	f("Então!");
	f("Quem quer ver um filme esse fim de semana? Ouvi dizer que A Origem é bom.");

	Choose({
		"Vamos ver! Nunca assisti.": function (message) {
			n(message);
			f("Então está combinado!");
			f("Ei Nick, sabe quem atua no filme?");
			n("Hum. Leonardo DiCaprio?");
			f("Não não, Ellen Page.");
			f("A Claire não parece um pouco com ela?");
			n("Acho que sim.");
			Dinner_Ending();
		},
		"Ah... vamos ver outro filme...": function (message) {
			n(message);
			f("O quê, A Origem é complicado demais pra você?");
			n("Ei...");
			if ($.studying_subject != $.studying_subject_2) {
				f(
					"Tudo bem, entendo se você reprovou em " +
						$.studying_subject +
						" e " +
						$.studying_subject_2 +
						"..."
				);
			} else {
				f("Tudo bem, entendo se você reprovou em " + $.studying_subject + "...");
			}
			f("Mas poxa, é só um <i>filme</i>!");
			f(
				"Você não pode ter herdado tanta burrice assim do lado da sua mãe! Haha!"
			);
			n("Ha ha.");
			Dinner_Ending();
		},
		"Já vi A Origem.": function (message) {
			n(message);
			f("Ah, entendi...");
			f(
				"Você foi num encontro de cinema com sua amiga especial Claire, né?"
			);
			n("Sim.");
			n("Um encontro com minha amiga especial.");
			Dinner_Ending();
		},
	});
}

function Argue_With_Dad() {
	n("...Não.");

	f("Como é?");
	n("Não. A mãe está fazendo isso pra eu não ver mais o Jack.");
	f("Jack.");
	n("Meu amigo.");

	Choose({
		"Meu namorado.": function (message) {
			n(message);

			Show("mom", "mom_cry");
			m("[chora]");

			m("O Jack fez isso com nosso filho!");
			f("Esse garoto escolheu esse estilo de vida, mas não vou deixar que seja o seu, Nick.");
			Argument_Ending();
		},
		"A mãe odeia ele porque ele é gay.": function (message) {
			n(message);

			Show("mom", "mom_cry");
			m("[chora]");

			f("Você fez sua mãe chorar.");
			if ($.hippies) {
				m("E os pais dele são drogados!");
			}
			f("Jack escolheu esse estilo de vida, mas não vou deixar que seja o seu, Nick.");
			Argument_Ending();
		},
		"A mãe odeia ele porque ACHA que ele é gay.": function (message) {
			n(message);

			Show("mom", "mom_cry");
			m("[chora]");

			m("O Jack É gay!");
			if ($.hippies) {
				m("E os pais dele são drogados!");
			}
			f("Jack escolheu esse estilo de vida, mas não vou deixar que seja o seu, Nick.");
			Argument_Ending();
		},
	});
}

function Argument_Ending() {
	$.father_oblivious = false;

	n(". . .");

	if ($.top_or_bottom == "top") {
		m("O Jack é que age como mulher, não ele...");
	}
	switch ($.what_are_you) {
		case "bisexual":
			m(
				"O Nick não é totalmente gay, ele mesmo me disse que ainda gosta de meninas!"
			);
			n(". . .");
			break;
		case "confused":
			m("Mais cedo o Nick disse que estava só confuso!");
			f("Ah, claramente está mesmo.");
			n(". . .");
			break;
		case "son":
			n("Olha, como falei pra mãe agora há pouco, eu sou seu FILHO, não basta--");
			break;
	}

	f("Nick, você vai mudar de escola.");
	n(". . .");
	m("huuu... huuu... huuu...");

	f("Sua mãe e eu vamos checar suas mensagens e emails aleatoriamente.");
	n(". . .");
	m("owww... owww...");

	f(
		"Juro, se eu tiver que pagar extra pra Claire só pra você perceber que é hétero, eu vou."
	);
	n(". . .");

	Show("mom", "mom_sit");
	if ($.crying == "anger") {
		m("Quando chorei antes, ele disse que era fingimento!");
		f("Qi, cala a boca. Não estamos falando de você.");
	}
	if ($.crying == "mocking") {
		m("Quando chorei antes, ele ficou tirando sarro!");
		f("Qi, cala a boca. Não estamos falando de você.");
	}

	f("Então Nick.");
	f("Quer dizer alguma coisa, qualquer coisa, sobre tudo isso?");

	Choose({
		"Sim. Dane-se isso, e dane-se vocês.": function (message) {
			n("Sim.");
			n("DANE-SE isso.");
			n("E DANE-SE vocês.");

			Show("nicky", "dinner_nicky_outrage");
			n("Dane-se os DOIS, seus narcisistas nojentos de MER--");

			Dinner_Ending_Punch();
		},
		"Não. Aceito meu castigo.": function (message) {
			n(message);
			f("Bom. Pelo menos está aceitando como um homem.");
			n(". . .");

			Show("dad", "dad_serious");

			m("snif...");
			f(
				"Vou sair pro bar e comer algo realmente comestível."
			);

			Show("dad", null);

			f("Querida, amorzinho? Sua comida é uma droga.");
			PlaySound("sfx", "dinner_door");

			m(". . .");

			Show("mom", "mom_cry");

			m("BUÁÁÁÁ");

			Dinner_Ending();
		},
		"Vocês não podem me machucar.": function (message) {
			n(message);
			f(". . .");
			m("Querido, não...");
			f("Palavras fortes, filho.");
			m("Amor, por favor não!");
			f("Pelo menos está enfrentando. Como um homem.");
			m("Por favor! A culpa é minha! Não--");
			f("Gelo ajuda a desinchar.");
			m("QUERIDO!");

			Dinner_Ending_Punch();
		},
	});
}

function Dinner_Ending_Punch() {
	Wait(500);

	queue(ClearDialogue, 0);

	StopSound("clock");
	PlaySound("sfx", "dinner_punch");

	Show("dad", null);
	Show("mom", "mom_cry");
	Show("nicky", "dinner_nicky_punched");
	Show("dinner_punch_arm", "dinner_punch_arm", { x: 0, y: 300 });

	$.punched = true;
	Dinner_Ending();
}

function Dinner_Ending() {
	Wait(500);

	queue(ClearDialogue, 0);

	Wait(500);

	PlaySound("clock", "dinner_meowing", { loop: -1 });
	Show("clock", "clock_meowing");
	Show("clock_time", "clock_2000");

	Wait(1000);

	Clear();
	Start_Jack_2();
}
