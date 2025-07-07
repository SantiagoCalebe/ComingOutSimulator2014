function Start(){

	$ = {};
	
	/////// SET UP SCENE ////////

	Show("background","coffeehouse");
	Show("cup","cup_steam",{x:44,y:359});
	Show("nicky","coffee_nicky_still");

	PlaySound("bg","coffeehouse",{loop:-1, volume:0.7});

	//////////////////////////////

	N("<b>Simulador de Revelação 2014</b>");
	N("Um jogo meio verdadeiro sobre meias verdades.");
	N("Olá, jogador. Bem-vindo a este jogo, eu acho.");
	N("O que você gostaria de fazer agora?");

	Choose({
		"Vamos jogar!": Play,
		"Quem é você? (Créditos)": function(){
			Credits("Quem é você?");
		},
		"Hm, conte-me mais. (Sobre Este Jogo)": function(){
			About("Hm, conte-me mais.");
		}
	});

}

function SipCoffee(message){
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	PlaySound("sfx","coffee_sip");
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");
}

function Play(message){
	
	SipCoffee(message);

	// Asked neither
	if(!$.asked_about && !$.asked_credits){
		N("Indo direto ao ponto! Ótimo!");
		N("Sem perder tempo lendo os Créditos ou a seção Sobre Este Jogo ou--");
		p("Shhh.");
		N("Tá bom, tá bom.");
	}
	// Asked both
	if($.asked_about && $.asked_credits){
		p(". . .");
		p("Por que você fez disso uma opção clicável, se era a única opção que restava?");
		N("NENHUMA IDEIA");
	// Asked either
	}else if($.asked_about || $.asked_credits){
		N("Sim, vamos!");
	}

	N("Vamos voltar quatro anos no tempo, para 2010...");
	p("Já faz QUATRO anos?!");
	N("...para a noite que mudou minha vida para sempre.");

	N("Me diga, caro jogador, como você acha que tudo isso termina?");

	Choose({
		"Com flores, arco-íris e unicórnios gays?": function(message){
			$.main_menu_convo_1 = 1;

			p(message);
			N("Sim. É exatamente assim que este jogo termina.");
			p("Sério?");
			N("Não.");
			Play_2();
		},
		"Aparentemente, com você no Reddit no Starbucks.": function(message){
			$.main_menu_convo_1 = 2;

			p(message);
			N("Ei, estou programando neste laptop. Transformando minha história de amadurecimento no jogo que você está jogando agora.");
			p("Nada, você provavelmente está procrastinando.");
			N("Olha quem fala.");
			p("Touché, douché.");
			N("Enfim...");
			Play_2();
		},
		"TUDO TERMINA EM SANGUE": function(message){
			$.main_menu_convo_1 = 3;

			p(message);
			N("Ah, comparado a isso, acho que minha história nem é tão trágica.");
			N("Embora isso seja uma interpretação bem pessimista.");
			p("sangueeeee.");
			N("Enfim...");
			Play_2();
		}
	});

}

function Play_2(){

	if(!$.asked_about){
		N("Se você não pulasse a seção Sobre Este Jogo, saberia que esta é uma história muito pessoal.");
		p("Shhh.");
	}

	N("Este jogo inclui diálogos que eu, meus pais e meu ex-namorado realmente dissemos.");
	N("Assim como todas as coisas que poderíamos, deveríamos e nunca diríamos.");
	N("Não importa qual é qual.");
	N("Não mais.");

	Choose({
		"Como posso vencer um jogo sem respostas certas?": function(message){
			$.main_menu_convo_2 = 2;

			p(message);
			N("Exatamente.");
			p(". . .");
			Play_3();
		},
		"Você é meio deprê, né?": function(message){
			$.main_menu_convo_2 = 1;

			p(message);
			N("A VIDA é meio deprê.");
			p("Então é sim.");
			Play_3();
		},
		"Esse 'jogo verdadeiro' é cheio de mentiras?": function(message){
			$.main_menu_convo_2 = 3;

			p(message);
			N("Mesmo que o diálogo fosse 100% preciso, ainda seria 100% mentira.");
			p(". . .");
			Play_3();
		}
	});

}

function Play_3(){

	N("Você vai jogar como eu, lá por 2010.");
	if(!$.asked_credits){
		N("Como você pulou os Créditos, meu nome (ainda não legal) é Nicky Case. Só pra você saber.");
		p("Shhh.");
	}

	var whatISay;
	switch($.main_menu_convo_1){
		case 1: whatISay = "Este jogo não termina com unicórnios gays. "; break;
		case 2: whatISay = "Este jogo é um sair do armário, um amadurecimento, uma aceitação. "; break;
		case 3: whatISay = "Este jogo não termina em sangue, mas em lágrimas. "; break;
	}
	switch($.main_menu_convo_2){
		case 1: whatISay += "Desculpe ser meio deprê."; break;
		case 2: whatISay += "E não há respostas certas."; break;
		case 3: whatISay += "E é cheio de mentiras."; break;
	}
	N(whatISay);

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);

	p("Ei, acabei de dizer isso!");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);

	Wait(500);
	Show("nicky","coffee_nicky_throw");
	PlaySound("sfx","coffee_throw");
	
	Wait(1000);
	Show("nicky","coffee_nicky_still_2");
	Wait(500);
	
	N("Quando você jogar...");
	N("Escolha suas palavras com sabedoria.");
	N("Todo personagem vai lembrar de tudo que você disser. Ou não disser.");
	p("É. Você até mencionou minhas escolhas nesse MENU PRINCIPAL.");
	N("Exatamente.");

	N(". . .");
	N("Algumas coisas são difíceis de esquecer.");
	
	Clear();
	Start_Jack_1();

}

function Credits(message){

	$.asked_credits = true;
	
	if($.asked_about){
		SipCoffee(message);
	}else{
		SipCoffee("Quem é você?");
	}
	
	N("Ah, que falta de educação minha! Deixe-me me apresentar.");
	N("Oi, eu sou Nicky Case.");
	N("Esse não é meu nome legal, é só meu nome VERDADEIRO.");

	p("Isso é bem estranho, cara.");
	if($.asked_about){
		p("E como você acabou de me contar, essa é sua história pessoal?");
	}else{
		p("E você fez esse jogo?");
	}

	N("Sim, eu sou o único escritor / programador / artista do Simulador de Revelação 2014.");

	if($.asked_about){
		p("Tudo isso sozinho?");
		p("Já disse antes e vou repetir...");
		p("Claro. Seu narcisista.");
		N("Bem, não é SÓ eu.");
		N("Os sons e áudios são de várias fontes de domínio público.");
	}else{
		N("Os sons e áudios, porém, são de várias fontes de domínio público.");
	}

	N("Mas embora seja basicamente só eu por trás desse jogo...");
	N("...tem muita gente por trás da história deste jogo.");

	if($.asked_about){
		Choose({
			"Falando nisso, vamos jogar! Agora!": Play
		});
	}else{
		Choose({
			"Falando nisso, podemos jogar agora?": Play,
			"Por que você fez isso? (Sobre Este Jogo)": function(){
				About("Por que você fez isso?");
			}
		});
	}

}

function About(message){

	$.asked_about = true;

	SipCoffee(message);

	if($.asked_credits){
		N("Eu queria contar minha história.");
	}else{
		N("Este jogo...");
		N("...na verdade, mais um simulador de conversa...");
		N("...é uma história muito pessoal.");
	}
	
	p("Claro. Seu narcisista.");
	N("Ha, claro.");

	if($.asked_credits){
		p("Na verdade não, um narcisista usaria o nome verdadeiro.");
		N("Eu já disse, É meu nome verdadeiro--");
		p("Tá bom, tá bom. Estranho.");
	}

	N("Fiz esse jogo para a #Nar8 Game Jam. Me deu uma desculpa. E um prazo!");
	p("Você procrastinou até o último dia, né.");
	N("Sim.");
	N("Ah! Este jogo não tem copyright. É dedicado ao domínio público.");
	N("Sou tão aberto com meu código quanto com minha sexualidade.");

	p("Aff, que trocadilho horrível.");
	N("Que tal um trocadilho de programação 'Fork Me'?");
	p("naãããão.");

	if($.asked_credits){
		Choose({
			"Vamos só jogar logo.": Play
		});
	}else{
		Choose({
			"Deixando os trocadilhos de lado, podemos jogar agora?": Play,
			"Então quem É você? (Créditos)": function(){
				Credits("Então quem É você?");
			}
		});
	}

}