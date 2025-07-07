function Start_Outro() {
  queue(ClearScene, 0);

  Show("background", "coffeehouse_2");
  Show("cup", "cup_steam", { x: 44, y: 359 });
  Show("nicky", "coffee_nicky_still");

  PlaySound("bg", "coffeehouse", { loop: -1, volume: 0.7 });

  if ($.breaking_up_soon) {
    N("E então terminamos três dias depois.");
  } else {
    N("E então terminamos três semanas depois.");
  }

  if ($.main_menu_convo_1 == 1) {
    p(". . .");
    N("Te disse que isso não terminava com unicórnios gays.");
  } else if ($.main_menu_convo_1 == 3) {
    p(". . .");
    N("Te disse. Não sangue, mas lágrimas.");
  } else if ($.main_menu_convo_2 == 1) {
    p(". . .");
    N("Você estava certo. Eu sou meio deprê.");
  }

  Choose({
    "MEUS SENTIMENTOS.": function (message) {
      p(message);
      N("Deixe os sentimentos fluírem, meu amigo.");
      Closure();
    },
    "Ah, qual é, isso foi frio.": function (message) {
      p(message);
      N("Não nego isso.");
      Closure();
    },
    "Não posso dizer que não esperava por isso...": function (message) {
      p(message);
      N("É... Jack e eu também vimos isso chegando.");
      Closure();
    },
  });
}

function Closure() {
  PlaySound("sfx", "coffee_sip");
  Show("nicky", "coffee_nicky_drink");
  Show("cup", null);

  p("Aff.");
  p(
    "Me sinto estranho só de usar os mesmos balões de diálogo do personagem Pai."
  );

  Show("nicky", "coffee_nicky_still");
  Show("cup", "cup_steam");

  N("Isso me lembra. Muitos dos personagens foram trocados.");
  N("Todos os nomes foram mudados, exceto o meu.");
  N("Deixei meu irmãozinho de fora, porque ele é inocente.");
  N(
    "E coloquei meu Pai de volta, mesmo ele tendo saído da família muito antes de 2010."
  );

  if ($.main_menu_convo_2 == 3) {
    N("Como você disse, esse 'jogo verdadeiro' está cheio de mentiras.");
  }

  p("Você podia pelo menos ter me dado uma cor diferente.");
  N("Já se passaram quatro anos desde aquela noite...");
  N("O que você acha que aconteceu depois?");

  if ($.main_menu_convo_2 == 2) {
    N(
      "Não se preocupe. Como dissemos no Menu Principal, não há respostas certas."
    );
  }

  $.coming_out_stories_left = 3;
  $.order_of_stories = [];

  Choose({
    "Cara, sei lá, só me conta logo.": function (message) {
      p(message);
      N("Certo, vou te contar o que aconteceu.");
      N("...e o que aconteceu, e o que aconteceu.");
      p("O quê.");
      Closure_Story();
    },
    "Deixa eu adivinhar, Vai Melhorar&trade;?": function (message) {
      p(message);
      N("Sim, na verdade! Em todas as três versões do que aconteceu.");
      p("O quê.");
      Closure_Story();
    },
    "Flores, arco-íris e unicórnios gays?": function (message) {
      p(message);
      N(
        "Sim, na verdade! Pelo menos, em uma das minhas três versões do que aconteceu."
      );
      p("Claro.");
      Closure_Story();
    },
  });
}

function Closure_Story() {
  if ($.coming_out_stories_left == 3) {
    N("Qual história pós-saída do armário você quer ouvir primeiro?");
    N("Não se preocupe, você vai ouvir todas as três.");
  } else if ($.coming_out_stories_left == 2) {
    N("Agora, qual versão você quer ouvir em seguida?");
  } else if ($.coming_out_stories_left == 1) {
    N("Finalmente, vamos ouvir a última história...");
  } else {
    Finale_1();
    return;
  }

  $.coming_out_stories_left -= 1;

  var options = [];
  if (!$.told_story_lie) options["A Mentira."] = Tell_Me_A_Lie;
  if (!$.told_story_truth) options["A Verdade."] = Tell_Me_A_Truth;
  if (!$.told_story_half_truth)
    options["A Meia-Verdade."] = Tell_Me_A_Half_Truth;
  Choose(options);
}

function Is_Last_Story() {
  if ($.coming_out_stories_left == 0) {
    if ($.asked_about && $.asked_credits) {
      p("De novo, só deixando uma opção clicável...");
    } else {
      p(
        "Por que você fez disso uma opção clicável, se era a única opção restante?"
      );
      N("Não faço ideia. Seguindo em frente.");
    }
  }
}

function Tell_Me_A_Lie(message) {
  $.told_story_lie = true;
  $.order_of_stories.push("lie");

  PlaySound("sfx", "coffee_sip");
  Show("nicky", "coffee_nicky_drink");
  Show("cup", null);
  p(message);
  Show("nicky", "coffee_nicky_still");
  Show("cup", "cup_steam");

  N("Muito bem.");
  Is_Last_Story();

  N("Fugi de casa, só com uma mala cheia de roupas íntimas comestíveis.");
  if ($.im_a_poet) {
    N(
      "Vaguei pelo Grande Norte Branco. Me sustentando escrevendo poesias amadoras para estranhos."
    );
  } else {
    N(
      "Vaguei pelo Grande Norte Branco. Me sustentando fazendo jogos web sem graça."
    );
  }
  N(
    "Comi flores. Segui os arco-íris. E fiz amizade com um unicórnio homossexual."
  );
  p(". . .");
  N(
    "Eventualmente cheguei ao Alasca, onde conheci um casal bissexual adulto chamado Bonnie & Clyde."
  );
  N(
    "Bonnie era uma mulher de meia-idade, e Clyde era um homem de quarenta e poucos anos."
  );

  Choose({
    "Acho que roupas íntimas comestíveis são comida e roupa.": function (
      message
    ) {
      $.outro_convo_lie = 1;
      p(message);
      N("E graças à minha flexibilidade, a mala serve de casa!");
      Tell_Me_A_Lie_2();
    },
    "Essa história é um fractal de bizarrices.": function (message) {
      $.outro_convo_lie = 2;
      p(message);
      N("MINHA HISTÓRIA. MINHAS REGRAS.");
      Tell_Me_A_Lie_2();
    },
    '..."manther".': function (message) {
      $.outro_convo_lie = 3;
      p(message);
      N("Também conhecido como 'faguar'.");
      Tell_Me_A_Lie_2();
    },
  });
}
function Tell_Me_A_Lie_2() {
  N(
    "Eles me acolheram como filho adotivo, e eu era o brinquedinho deles em tempo integral."
  );

  if ($.outro_convo_lie == 1) {
    p("...Graças de novo à sua, uh, flexibilidade.");
  }

  switch ($.top_or_bottom) {
    case "top":
      N(
        "Como sabemos, gosto que meus parceiros sejam 'a mulher' do relacionamento."
      );
      break;
    case "bottom":
      N("Como sabemos, geralmente eu sou 'a mulher' do relacionamento.");
      break;
    case "versatile":
      N("Como sabemos, gosto de revezar sendo 'a mulher' do relacionamento.");
      break;
  }

  N(
    "Eles me criaram, me mostraram amor, e eu cresci para ser um membro produtivo da sociedade."
  );

  switch ($.outro_convo_lie) {
    case 2:
      p("E quando você dá zoom nesse fractal, tem MAIS bizarrice.");
      break;
    case 3:
      p('..."MANTHER".');
      break;
  }

  N("Eles eram minha nova família.");
  N("Família... com benefícios.");

  p(". . .");

  Closure_Story();
}

function Tell_Me_A_Truth(message) {
  $.told_story_truth = true;
  $.order_of_stories.push("truth");

  PlaySound("sfx", "coffee_sip");
  Show("nicky", "coffee_nicky_drink");
  Show("cup", null);
  p(message);
  Show("nicky", "coffee_nicky_still");
  Show("cup", "cup_steam");

  N("Lá vai.");
  Is_Last_Story();

  N(
    "Segui o conselho do Jack e parodiei A Origem no meu 'jogo web estranho', Reimagine :The Game:."
  );
  switch ($.inception_answer) {
    case "awake":
      N("Mas não disse que o Cobbs estava acordado no final.");
      break;
    case "dream":
      N("Mas não disse que o filme era só um sonho.");
      break;
    case "neither":
      N("Ainda acho que não importa se o Cobbs estava sonhando.");
      break;
  }
  N("Reimagine :The Game: ficou meio famoso na internet! Um bom portfólio.");
  N(
    "Alguns meses depois, consegui um estágio na Electronic Arts na Bay Area. Bem longe da minha família no Canadá."
  );

  Choose({
    "Eca, Electronic Arts...?": function (message) {
      $.outro_convo_truth = 3;
      p(message);

      N("É, eu sei, eu sei.");
      N(
        "Agora estou pagando meus pecados fazendo jogos indie artísticos como este."
      );
      p("Pague mais, por favor.");
      Tell_Me_A_Truth_2();
    },
    "E a Bay Area é bem amigável com LGBT.": function (message) {
      $.outro_convo_truth = 2;
      p(message);

      N("Por isso chamam de Gay Area!");
      p("Uh... ninguém chama assim.");
      Tell_Me_A_Truth_2();
    },
    "Ah, eu adoro a EA! Eles fazem The Sims, né?": function (message) {
      $.outro_convo_truth = 1;
      p(message);

      N("Sim! Mas não trabalhei nesses. Meu time fazia uma versão web de--");
      N("[NÃO POSSO DIVULGAR]");
      p("Ah.");
      Tell_Me_A_Truth_2();
    },
  });
}
function Tell_Me_A_Truth_2() {
  N("Depois da EA, fui ser indie.");
  N("Mas mantive contato com amigos da EA, e fiquei na Bay Area.");

  N("Minhas habilidades técnicas cresceram.");
  N("Minhas habilidades sociais cresceram.");
  N("E aqui... finalmente estou começando a descobrir minha identidade.");

  switch ($.outro_convo_truth) {
    case 1:
      p("Bem, estou esperando por Não Posso Divulgar: O Jogo.");
      break;
    case 2:
      p("Mas sério, ninguém chama de Gay Area.");
      break;
    case 3:
      p("Mas sério, eca. Electronic Arts.");
      break;
  }

  Closure_Story();
}

function Tell_Me_A_Half_Truth(message) {
  $.told_story_half_truth = true;
  $.order_of_stories.push("half-truth");

  PlaySound("sfx", "coffee_sip");
  Show("nicky", "coffee_nicky_drink");
  Show("cup", null);
  p(message);
  Show("nicky", "coffee_nicky_still");
  Show("cup", "cup_steam");

  N("Como quiser.");
  Is_Last_Story();

  N("Claire, numa reviravolta irônica, também era bissexual.");
  N(
    "Contamos isso um para o outro durante uma sessão de estudos de " +
      $.studying_subject +
      "."
  );

  p("Que reviravolta!");

  N("Claire era insegura sobre sua orientação sexual, como eu.");
  N(
    "Nós dois éramos meio inexperientes. Claire só ficou com mulheres, e eu só fiquei com Jack."
  );

  Choose({
    "Uma versão espelhada de você, mas invertida...": function (message) {
      $.outro_convo_half_truth = 1;
      p(message);
      N("Bem, uh, toda imagem espelhada é invertida.");
      p("Você entendeu o que eu quis dizer.");
      N("Mas sim, Claire e eu compartilhamos nossas experiências.");
      Tell_Me_A_Half_Truth_2();
    },
    "Então, vocês ensinaram um ao outro o outro lado?": function (message) {
      $.outro_convo_half_truth = 3;
      p(message);
      Tell_Me_A_Half_Truth_2();
    },
    "Vocês acabaram tendo momentos íntimos juntos?": function (message) {
      $.outro_convo_half_truth = 2;
      p(message);
      N(
        "Não. Ela é como uma irmã pra mim. Uma irmã com quem eu não teria relações."
      );
      p("Você... não precisava esclarecer isso.");
      N("Mas sim, Claire e eu compartilhamos nossas experiências.");
      Tell_Me_A_Half_Truth_2();
    },
  });
}
function Tell_Me_A_Half_Truth_2() {
  N("E trocamos dicas!");
  N(
    "Tipo... faça um movimento de 'vem cá' com os dedos, ou esfregue a cabeça contra o céu da boca."
  );
  p("Informação demais, cara...");

  if ($.changing_schools || !$.father_oblivious) {
    N("Acabei mudando pra escola dela, no fim.");
  }

  N(
    "Éramos melhores amigos. Ainda somos! Agora nós dois moramos nos EUA, longe das nossas famílias odiosas."
  );
  N(
    "Juntos, ajudamos um ao outro a superar inseguranças e descobrir quem éramos..."
  );
  N("Orgulhosos bissexuais safados.");

  p("Que história tocante. Eu acho.");

  N("E claro, somos cupido um do outro.");

  p(". . .");

  Closure_Story();
}

function Finale_1() {
  N("E essa foi a última das histórias pós-saída do armário!");

  Wait(1000);
  queue(ClearDialogue, 0);

  Show("cup", null);
  Show("nicky", "coffee_nicky_throw");
  PlaySound("sfx", "coffee_throw");

  Wait(1000);
  Show("nicky", "coffee_nicky_still_2");

  N("Querido jogador, não pude deixar de notar...");
  if ($.order_of_stories[0] == "truth") {
    N("Você foi direto para a Verdade primeiro.");
  } else if ($.order_of_stories[2] == "truth") {
    N("Você deixou a Verdade por último.");
  } else if ($.order_of_stories[0] == "lie") {
    N("Você quis ouvir a Mentira primeiro.");
  } else {
    N("Você deixou a Mentira por último.");
  }
  N("O que isso diz sobre você?...");
  p(". . .");

  p(
    "Sabe... normalmente quando um jogo te dá múltiplos finais, não mostra TODOS DE UMA VEZ."
  );
  N("Haha! Você achou que esses eram FINAIS?");

  Choose({
    "Deixa eu adivinhar... Isso É Só O Começo?": function (message) {
      p(message);
      N("Isso é só o come-- ah. Ok, é.");
      Finale_2();
    },
    "Bem, sim. Esse jogo acabou, né?": function (message) {
      p(message);
      N(
        "Verdade... mas a história, que é minha história, minha vida, continua."
      );
      Finale_2();
    },
    "meu deus quanto tempo DURA esse jogo.": function (message) {
      p(message);
      N("Não se preocupe. Sua próxima escolha é a última, prometo.");
      Finale_2();
    },
  });
}

function Finale_2() {
  Show("nicky", "coffee_nicky_packup_1");

  N(". . .");
  N(
    "Sabe, se eu pudesse voltar e reviver todas as minhas outras escolhas possíveis..."
  );
  N("... que de certa forma, fiz, escrevendo esse jogo...");
  N("... eu não mudaria nada.");

  Show("nicky", "coffee_nicky_packup_2");

  PlaySound("sfx", "laptop_shut");
  PlaySound("bg", "bedroom_1", { loop: -1, volume: 0.4 });

  p("? ? ?");

  if ($.punched) {
    N(
      "Meus textos sendo lidos. Sendo forçado a mudar de escola. Levando um soco na cara."
    );
  } else if ($.father_oblivious == false) {
    N(
      "Meus textos sendo lidos. Sendo forçado a mudar de escola. Todos os xingamentos."
    );
  } else if ($.changing_schools) {
    N(
      "Meus textos sendo lidos. Sendo forçado a mudar de escola. A tentativa de 'cura gay' com a Claire."
    );
  } else {
    N(
      "Meus textos sendo lidos. Sem mais horas livres depois da escola. A tentativa de 'cura gay' com a Claire."
    );
  }

  N("Num certo sentido de Síndrome de Estocolmo... sou grato por tudo.");

  Choose({
    "o quê.": Finale_3,
    "quêêê.": Finale_3,
    "queeeeeeeeeeeeeee.": Finale_3,
  });
}

function Finale_3(message) {
  p(message);

  PlaySound("sfx", "laptop_pack");
  Show("nicky", "coffee_nicky_packup_3");

  N("Sim, de verdade!");
  N(
    "Eu não teria sido tão motivado a construir minha própria vida... se minha vida anterior não fosse uma droga total."
  );

  PlaySound("sfx", "laptop_pack_2");
  Show("nicky", "coffee_nicky_packup_4");

  N("No final de 2010, Dan Savage lançou a campanha Vai Melhorar&trade;.");
  N(
    "Minhas três histórias... Mentira, Verdade, Meia-Verdade... todas são verdadeiras em pelo menos uma coisa."
  );
  N("Vai melhorar.");

  p(". . .");

  N("E...");
  N("No final...");
  N("Desse jogo longo, idiota, doloroso...");
  N("Onde joguei contra pessoas que deveriam estar do meu lado...");

  p(". . .");

  N("Eu venci.");
  N(". . .");
  N("Eu venci.");

  Wait(1000);
  queue(ClearDialogue, 0);

  Wait(1000);

  PlaySound("sfx2", "laptop_pack");
  Show("nicky", "coffee_nicky_date_1");
  Wait(1000);

  PlaySound("sfx", "step_2");
  Show("nicky", "coffee_nicky_date_2");
  Wait(1000);

  PlaySound("sfx", "step_1");
  Show("nicky", "coffee_nicky_date_3");
  Wait(1000);

  PlaySound("sfx", "step_2", { volume: 0.75 });
  Show("nicky", "coffee_nicky_date_4");
  Wait(1000);

  PlaySound("sfx", "step_1", { volume: 0.5 });
  Show("nicky", null);
  Wait(1000);

  PlaySound("sfx", "step_2", { volume: 0.25 });
  Choose({
    "REJOGAR?": Finale_4,
  });
}
function Finale_4(message) {
  p(message);
  N("A vida real não tem replay.");

  Wait(800);
  queue(function () {
    document.getElementById("game").setAttribute("screen", "blank");
  }, 1000);

  queue(function () {
    document.getElementById("game").setAttribute("screen", "credits");
  }, 0);
}
