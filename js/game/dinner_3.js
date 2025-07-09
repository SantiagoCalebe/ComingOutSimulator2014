function Start_Dinner_3() {
	n("Mãe.");

	Choose({
		"É por isso que estou estudando mais com o Jack.": Tutor,
		"Olha, eu estou tentando. De verdade.": Tutor,
		"Minhas notas estão boas.": Tutor,
	});
}

function Tutor(message) {
	n(message);
	m("Estou preocupada com você. Jack não é uma boa influência.");

	if ($.hippies) {
		m("Acho que os pais dele podem até ser viciados em drogas...");
		n("O que te faz pensar is--");
	} else if ($.im_a_poet) {
		m("Tudo o que ele faz é poesia.");
		n("O que te faz pensar is--");
	}

	m("Vou te arrumar uma tutora particular.");
	n("...o quê?");

	if ($.studying_subject != $.studying_subject_2) {
		m(
			"Ela vai te ajudar em " +
				$.studying_subject +
				" e " +
				$.studying_subject_2 +
				"."
		);
	} else {
		m("Ela vai te ajudar em " + $.studying_subject + ".");
	}

	m(
		"O nome dela é Claire. Ela é inteligente, bonita e caucasiana. Tem a sua idade também."
	);

	Choose({
		"Você está tentando me impedir de ver o Jack?": Tutor_Seeing,
		"Você está tentando me empurrar pra ela?": Tutor_Matchmake,
		"Podemos falar de tutores outra hora?": Tutor_Forget,
	});
}

function Tutor_Seeing(message) {
	n(message);
	m("Desculpa, <i>ver</i> o Jack?");
	m("Cuidado com as palavras. Você faz parecer que...");

	Choose({
		"Como se estivéssemos namorando? Sim. Estamos.": function (message) {
			n(message);
			m(". . .");
			n(". . .");
			n("...Alô?");
			m(". . .");
			n("Tem alguém aí?");
			m(". . .");
			Threat_School();
		},
		"Só quis dizer encontrar o Jack.": function (message) {
			n(message);
			m("Ok. Só esclarecendo as coisas.");
			n("É.");
			m(". . .");
			m("A Claire é bem bonita.");
			n("Certo.");
			m("Ela tem seios empinados.");
			Threat_Tutor();
		},
		"Nós. Não. Somos. Namorados.": function (message) {
			n(message);
			m(". . .");
			m("Ok.");
			m("Eu nunca disse que eram, mas... ok.");
			n("Somos amigos.");

			if ($.relationship == "friend") {
				m('"Bons amigos"...');
			}
			if ($.relationship == "best friend") {
				m('"MELHORES amigos"...');
			}

			Threat_Tutor();
		},
	});
}

function Tutor_Matchmake(message) {
	n(message);
	m("Bem, se é isso que você quer, posso sim!");
	n("nãooooo.");
	m("Não seja tímido! Você está crescendo, virando um homem.");
	m("E vai me dar muitos netos.");

	Choose({
		"Para! Nem conheci a Claire ainda!": function (message) {
			n(message);
			m("Ainda!");
			m("Ela vem aqui amanhã!");
			n("O quê? Mas eu prometi ao Jack--");
			m("Passei sua melhor roupa. Vai causar boa impressão.");
			Threat_Tutor();
		},
		"As chances são 50-50, porque sou bi.": function (message) {
			$.admit_bisexuality = true;

			n(message);
			m("Hã. Bi?...");

			Show("nicky", "dinner_nicky_defiant");

			n("Sim. BISEXUAL.");
			n("Ou seja, ME SINTO ATRAÍDO POR HOMENS E MULHERES.");
			m(". . .");
			n(". . .");
			Threat_School();
		},
		"Não. Nunca quero ter filhos.": function (message) {
			n(message);
			m("Você vai mudar de ideia quando crescer.");
			m("Criar um filho é maravilhoso. Eles vão te admirar!");
			n("...claro, sua narcisista.");
			m("Como é?");
			n("Nada.");
			m(". . .");
			Threat_Tutor();
		},
	});
}

function Tutor_Forget(message) {
	n(message);
	m("Não, porque já marquei com a Claire pra vir amanhã.");
	n("O quê?!");
	n("Não. Eu prometi estudar com o Jack amanhã.");
	m(". . .");
	m("Quanto tempo você queria ficar na casa dele?");

	Choose({
		"A noite toda.": function (message) {
			n(message);
			m(". . .");
			n(". . .");
			n("...Alô?");
			n("Não é estranho. Amigos dormem juntos o tempo todo.");
			m(". . .");
			Threat_School();
		},
		"Só à tarde.": function (message) {
			n(message);
			if ($.lying_about_hanging_out) {
				m("Sabia. Peguei sua mentira antes.");
				n("Hã?");
			} else {
				m("...Eu sabia.");
			}
			m("Você só quer sair com ele.");
			Threat_Tutor();
		},
		"Talvez uma hora só.": function (message) {
			n(message);
			m("Isso não é tempo suficiente pra estudar de verdade.");
			if ($.lying_about_hanging_out) {
				m("Sabia. Peguei sua mentira antes.");
				n("Hã?");
			}
			m("Você só quer sair com ele.");
			Threat_Tutor();
		},
	});
}

function Threat_Tutor() {
	Show("nicky", "dinner_nicky_defiant");

	n(". . .");
	m("A Claire vai te dar aula todo dia depois da escola, começando amanhã.");

	Choose({
		"Todo dia?! E meus amigos?!": function (message) {
			n(message);
			m("Querido, eu sou sua amiga!");
			n(". . .");
			m("A Claire também pode ser sua amiga. Ou mais que amiga.");
			n(". . .");
			n("Terminamos?");
			m("Só... mais uma coisa.");
			Plot_Twist();
		},
		"Ok, mas meus fins de semana estão livres, né?": function (message) {
			n(message);
			m("Sim.");
			n("Ok. Que bom que está tudo resolvido.");
			m("...Sim.");
			n(". . .");
			m("Só... mais uma coisa.");
			Plot_Twist();
		},
		"E se eu NÃO estudar com a Claire?": function (message) {
			n(message);
			m("Bem, se quiser sair com ela também, melhor ainda.");
			m("Qualquer coisa pra te deixar mais masculino.");
			n("aff.");
			m("Ah.");
			m("Mais uma coisa.");
			Plot_Twist();
		},
	});
}

function Threat_School() {
	$.changing_schools = true;

	m("Você vai mudar de escola.");

	Show("nicky", "dinner_nicky_outrage");

	n("O QUÊ?!");
	m(
		"Acho que não é só o Jack, é a escola toda que está te influenciando mal."
	);
	n("VOCÊ TÁ SÉRIA.");
	m("A cultura canadense está te confundindo sobre quem você é.");

	Show("nicky", "dinner_nicky_defiant");

	Choose({
		"Não, é SUA cultura asiática que é atrasada!": function (message) {
			n(message);
			m("Não seja grosseiro!");
			m("É SUA cultura também!");
			n(". . .");
			Plot_Twist();
		},
		"Você não pode fazer isso com SEU FILHO!": function (message) {
			n(message);
			m("Não seja grosseiro!");
			m("Sou sua MÃE, tenho direito de fazer o que quiser com você!");
			n(". . .");
			Plot_Twist();
		},
		"Tanto faz, TODAS as escolas têm pessoas queer.": function (message) {
			n(message);
			m("Não seja grosseiro!");
			m("E olha lá, posso mudar de ideia e te ensinar em casa.");
			n(". . .");
			Plot_Twist();
		},
	});
}

function Plot_Twist() {
	m("Ontem, quando você supostamente estava estudando com o Jack?");
	m("Eu sei que vocês foram ver um filme escondidos.");

	Show("nicky", "dinner_nicky_sit");
	n(". . .");

	Show("clock_time", "clock_1920");

	Choose({
		"Meu deus. Você leu minhas mensagens.": function (message) {
			n(message);
			m("Sim. Viu como você pode ser esperto quando não está com o Jack?");
			Plot_Twist_2();
		},
		"Não, não fomos. Estudamos.": function (message) {
			n(message);
			m("Você é muito teimoso.");
			m("Eu li suas mensagens de texto.");
			Plot_Twist_2();
		},
		"Por que você acha isso?": function (message) {
			n(message);
			m("Porque eu li suas mensagens de texto.");
			Plot_Twist_2();
		},
	});
}

function Plot_Twist_2() {
	n(". . .");
	m("Antes do jantar. Eu estava no seu quarto.");

	m(
		"Você gritou '" +
			$.what_you_called_out +
			"' lá de baixo, enquanto eu destrancava seu celular..."
	);
	m("E li o que você e o Jack têm conversado.");
	m("Sou sua mãe. Tenho esse direito.");

	n(". . .");

	if ($.im_a_poet) {
		m("Poesia estranha?");
	}
	if ($.hippies) {
		m("Falando sobre fumar maconha?");
	}
	if ($.im_a_poet || $.hippies) {
		m("Te ajudando a mentir pra sua própria mãe?");
		m("O que mais você anda fazendo escondido?");
	}

	Choose({
		"Isso só pode ser um pesadelo.": function (message) {
			n(message);
			m("Tipo aquele filme 'A Origem'?");
			n("É... é 'Inception'.");
			m("Não me responda.");
			Plot_Twist_3();
		},
		"Desculpa. Me desculpa mesmo.": function (message) {
			n(message);
			m("Eu te perdoo.");
			m("Você é meu filho, claro que te perdoo.");
			Plot_Twist_3();
		},
		"Eu te odeio.": function (message) {
			n(message);
			m("Tudo bem.");
			m("Eu ainda te amo, Nick.");
			Plot_Twist_3();
		},
	});
}

function Plot_Twist_3() {
	Start_Dinner_4();
}
