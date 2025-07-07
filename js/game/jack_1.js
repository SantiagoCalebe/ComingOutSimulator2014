function Start_Jack_1() {
	Show("background", "bedroom");
	Show("us", "bedroom_us_1");
	Show("light", "bedroom_light_1", { x: 0, y: 159 });

	PlaySound("bg", "bedroom_1", { loop: -1 });

	j("E quando ele simplesmente anuncia,");
	j("'Eu comprei a companhia aérea.'");
	j("Isso foi absolutamente impagável!");
	n("Foi isso que ele disse?");
	n("Eu perdi o que todo mundo no cinema estava rindo.");
	j("Você precisa de legendas ou limpar mais os ouvidos.");
	j("Como você interpretou o final?");

	Choose({
		"Foi tudo um sonho.": Inception_Dream,
		"Ele voltou para o mundo real!": Inception_Awake,
		"Não importa. Cobbs finalmente deixou pra lá.": Inception_Neither,
	});
}

function Inception_Dream(message) {
	$.inception_answer = "dream";

	n(message);
	j("Então toda a história de redenção dele foi uma mentira?");
	n("Uma grande mentira.");
	j("Você é meio pessimista, não é?");

	Choose({
		"Sim, sou só um saco de tristeza.": Sadsack,
		"Às vezes... mas não quando estou com você.": function (message) {
			$.im_a_poet = true;

			n(message);
			j("Ah Nicky, seu poeta amador.");
			n("Me arranja uns pães franceses e vinho,");
			n("Porque essa foi a coisa mais brega que já disse.");
			j("Não peça desculpas por nada.");
			n("Enfim...");
			Thanks();
		},
		"Sou apenas realista.": function (message) {
			$.hippies = true;

			n(message);
			j("Você precisa de mais pensamento positivo na sua vida.");
			n("E VOCÊ precisa parar de ser tão hippie.");
			n("Enfim...");
			Thanks();
		},
	});
}
function Inception_Awake(message) {
	$.inception_answer = "awake";
	$.im_a_poet = true;

	n(message);
	n("Senão, o filme todo teria sido uma mentira.");
	n("Qual o sentido de viver uma mentira?");
	j("Ah Nicky, seu poeta amador.");
	j("Imagino que você gostou do filme?");

	Choose({
		"Simmm. Eu gostei sim.": function (message) {
			n(message);
			Thanks();
		},
		"Ahhh, foi meio confuso às vezes.": function (message) {
			n(message);
			j("Acho que esse era o objetivo.");
			n("Missão cumprida, então.");
			n("Enfim...");
			Thanks();
		},
		BWOOOOOOOOOOONG: function (message) {
			n(message);
			j("Vou interpretar isso como um sim.");
			Thanks();
		},
	});
}
function Inception_Neither(message) {
	$.inception_answer = "neither";

	n(message);
	j("Ah é?");
	n("Ele nem se preocupou em ver se o pião caiu!");
	n("Mentiras, verdades, ou meias-verdades... Cobbs não liga mais.");
	n("Ele finalmente está feliz, e isso é o que importa.");
	j("Você está sendo poético ou deprimente.");

	Choose({
		"Sou poeta e nem sabia.": function (message) {
			$.im_a_poet = true;

			n("Sou poeta,");
			n("e nem estava ciente disso.");
			j("Você é um milagre lírico, a evidência é empírica.");
			n("Isso é hilário.");
			n("Enfim...");
			Thanks();
		},
		"Não, sou só um saco de tristeza.": Sadsack,
		"Ou os dois.": function (message) {
			$.hippies = true;
			$.im_a_poet = true;

			n(message);
			n("POESIA É DOR. ARTE É SOFRIMENTO.");
			j("Você soa como minha mãe.");
			n("Seus pais são <i>tão</i> hippies.");
			n("Enfim...");
			Thanks();
		},
	});
}

function Sadsack(message) {
	$.sadsack = true;

	n(message);
	j("Poxa, sinto muito por isso.");
	j("Espero que nosso encontro no cinema tenha te animado.");
	n("Com certeza!");
	Thanks();
}

function Thanks() {
	n("Então é isso! Obrigado por me levar para ver A Origem!");
	j("O prazer é meu, Nicky.");
	j("Você devia fazer uma paródia de A Origem naquele seu jogo estranho!");
	n("Hmm, talvez, talvez.");
	n("Vamos nos encontrar de novo amanhã à noite!");

	j("Embora...");
	n("Espero conseguir convencer meus pais a me deixar dormir fora.");

	j(
		"Queria que você não tivesse dito para sua mãe e seu pai que estávamos só estudando, quando na verdade estávamos no cinema."
	);
	n("Vou fingir que vamos estudar para as provas a noite toda-- hã?");

	j("Você não pode continuar se escondendo assim.");
	n("Jack...");

	Choose({
		"Eles nunca podem saber.": function (message) {
			$.coming_out_readiness = "no";
			n(message);
			j("Sério, nunca?");
			Hiding();
		},
		"Eu queria poder contar também.": function (message) {
			$.coming_out_readiness = "yes";
			n(message);
			Hiding();
		},
		"Ainda não estou pronto para contar.": function (message) {
			$.coming_out_readiness = "maybe";
			n(message);
			j("Posso te ajudar a estar pronto.");
			Hiding();
		},
	});
}

function Hiding() {
	j("Nicky, se esconder assim está acabando com você.");

	if ($.inception_answer == "awake") {
		j("Como você disse, qual o sentido de viver uma mentira?");
	}
	if ($.inception_answer == "dream") {
		j("É... como você disse... 'uma grande mentira'?");
	}

	if ($.sadsack) {
		j("Quando você disse agora há pouco que é um saco de tristeza?");
		j("Eu sei que não estava brincando. Não de verdade.");
	}

	n("Jack, qual é.");
	j("Eu me assumi para meus pais no ano passado.");
	if ($.hippies) {
		n("Isso NÃO é uma comparação justa.");
		n("COMO EU DISSE, você e seus pais são um bando de hippies.");
		n(
			"Quando estou na sua casa, não sei se toda aquela fumaça é incenso ou maconha."
		);
		j("Ei! Só fumamos maconha dia sim, dia não!");
		n("Heh.");
		j("O ponto é, meus pais apoiaram quando me assumi.");
	} else {
		j("E eles foram muito compreensivos!");
	}

	j("Você está no Canadá agora. Muitas pessoas aqui apoiam LGBT.");
	j("Como você sabe que seus pais não vão te apoiar também?");

	Choose({
		"Pais asiáticos geralmente são muito homofóbicos.": Hiding_2,
		"Eu não sei... Acho que nunca tentei...": Hiding_2,
		"Eles não apoiam nada além de ESTUDAR.": Hiding_2,
	});
}

function Hiding_2(message) {
	n(message);

	if ($.coming_out_readiness == "no") {
		n("De novo... Eles nunca podem saber.");
	}

	j("Você tem problemas de confiança.");
	j("Você até me manda mensagem em vez de ligar...");
	j("...porque acha que seus pais podem ouvir.");

	n("Eles ouviriam!");

	j("Esse modo de comunicação.");
	j("É impreciso, impessoal, impossível de se conectar de verdade.");

	if ($.im_a_poet) {
		n("Heh. Você é um poeta amador como eu, pelo visto.");
	} else {
		n("Não é tão ruim assim...");
	}

	if ($.coming_out_readiness == "yes") {
		j("Você mesmo disse que queria poder contar para eles.");
		j("Conte para eles.");
	} else {
		j("Nicky.");
	}
	j("Conte sobre nós. Hoje à noite.");

	Choose({
		"Hoje à noite?! Nem pensar.": Hiding_3,
		"Suspiro... Vou tentar.": Hiding_3,
		"Vou só dar uma dica sutil.": Hiding_3,
	});
}

function Hiding_3(message) {
	n(message);
	j(". . .");
	n("Não quero assustá-los demais.");
	n("Ainda preciso convencê-los a me deixar dormir na sua casa amanhã.");
	n("Vou dizer que vou estudar com você de novo.");
	j(". . .");
	n("Hora do jantar. Estou descendo agora.");

	j("Ei... Concordo.");
	n("Hã?");
	j("Com sua opinião sobre o final do filme, quero dizer.");
	switch ($.inception_answer) {
		case "dream":
			j("Acho que Cobbs ainda estava sonhando, vivendo uma mentira.");
			break;
		case "awake":
			j("Acho que Cobbs se reconectou com a família de verdade, no mundo real.");
			break;
		case "neither":
			j("Acho que não importa, desde que Cobbs esteja feliz.");
			break;
	}
	n("Ah.");
	j("Certo.");
	if ($.coming_out_readiness == "maybe") {
		j("Espero que tenha mudado de ideia sobre 'não estar pronto para contar ainda'.");
	}
	j("Boa sorte. Me manda mensagem em uma hora.");

	var insult = "";
	if ($.hippies) insult += " hippie";
	if ($.im_a_poet) insult += " poeta amador";
	n("Até mais.");
	if (insult != "") {
		n("Você" + insult + ".");
	} else {
		n("Seu bobo.");
	}

	Jack_1_End();
}

function Jack_1_End() {
	Clear();
	Start_Dinner_1();
}
