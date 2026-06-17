/**
 * GuardaDigital - Sistema de Inteligência Interativa do Portal
 */

// 1. BANCO DE DADOS DO QUIZ
const questoesQuiz = [
    {
        situacao: "Você recebeu um vídeo do diretor da escola no WhatsApp suspendendo as aulas amanhã, mas a voz dele parece ligeiramente robótica e com pausas estranhas. O que fazer?",
        opcoes: [
            "Acreditar imediatamente, compartilhar nos grupos da turma e comemorar o dia de folga.",
            "Desconfiar do conteúdo. Pode ser uma deepfake de voz clonada. O correto é aguardar e checar os canais oficiais da escola."
        ],
        correta: 1,
        explicacao: "Boa! Clones de áudio por IA precisam de apenas 3 segundos de amostra de voz para serem gerados. Sempre confira os canais oficiais!"
    },
    {
        situacao: "Um perfil novo com foto de Inteligência Artificial publicou uma imagem ultra-realista de uma suposta explosão na sua cidade. Qual o melhor método para validar o fato?",
        opcoes: [
            "Usar a busca reversa de imagens do Google e verificar se portais de jornalismo profissional e autoridades locais confirmam o ocorrido.",
            "Compartilhar imediatamente nos grupos de família alertando a todos para tomarem cuidado com a rua."
        ],
        correta: 0,
        explicacao: "Exato! A busca reversa ajuda a encontrar a raiz da imagem e impede o espalhamento de pânico automatizado gerado por bots maliciosos."
    },
    {
        situacao: "Ao usar uma inteligência artificial generativa (como ChatGPT) para auxiliar na criação de um ensaio acadêmico ou trabalho escolar, você deve:",
        opcoes: [
            "Copiar e colar o texto gerado integralmente como se fosse seu, já que a IA gera textos inéditos que não acusam plágio tradicional.",
            "Utilizar o texto como base para ideias, checar todas as fontes e dados (IAs alucinam e inventam fatos) e referenciar o uso da ferramenta."
        ],
        correta: 1,
        explicacao: "Perfeito! A cidadania digital exige honestidade intelectual. Ferramentas de IA servem para co-criação e brainstorming, não para substituição do aprendizado."
    },
    {
        situacao: "Um colega de classe teve o rosto inserido em um meme em vídeo com danças constrangedoras que está viralizando na escola. O vídeo parece falso, mas está gerando piadas. Como agir?",
        opcoes: [
            "Acolher o colega, reportar o vídeo à coordenação da escola por uso indevido e ilegal de imagem por IA (cyberbullying) e não repassar o arquivo.",
            "Rir e encaminhar para outros grupos, afinal é só uma brincadeira feita por computador e todo mundo sabe que não é real."
        ],
        correta: 0,
        explicacao: "Certíssimo! Criar ou espalhar deepfakes de cunho vexatório ou difamatório sem consentimento configura crime de difamação e assédio digital."
    },
    {
        situacao: "Você encontrou uma notícia bombástica sobre uma nova vacina obrigatória nas escolas. O texto está em um site com o link esquisito terminando em '.info-urgente.xyz'. Como proceder?",
        opcoes: [
            "Ignorar o conteúdo ou fazer uma checagem em portais de notícias tradicionais e agências independentes como Lupa ou Fato ou Fake.",
            "Repassar rapidamente para garantir que seus amigos fiquem sabendo o quanto antes, caso seja verdade."
        ],
        correta: 0,
        explicacao: "Isso aí! Sites com domínios obscuros e títulos sensacionalistas frequentemente usam geradores automáticos de conteúdo para lucrar com anúncios de cliques."
    }
];

// DATA BANK DO NOVO RECURSO: GLOSSÁRIO
const bancoGlossario = [
    { termo: "Deepfake", icone: "fa-face-smile-wink", desc: "Mídias (vídeos, imagens ou áudios) geradas por algoritmos de Aprendizado de Máquina profunda que imitam perfeitamente a imagem e a voz de pessoas reais em situações falsas." },
    { termo: "Phishing", icone: "fa-fish-fins", desc: "Técnica criminosa de engenharia social voltada a pescar dados pessoais confidenciais (senhas, documentos) através de links falsificados urgentes ou alarmistas." },
    { termo: "Alucinação de IA", icone: "fa-wand-magic-sparkles", desc: "Fenômeno em que modelos de linguagem generativa inventam fatos históricos, leis, estatísticas ou fontes falsas com total convicção gramatical." },
    { termo: "Letramento Midiático", icone: "fa-graduation-cap", desc: "Conjunto de habilidades para acessar, analisar de forma crítica, avaliar o viés e criar conteúdos seguros em mídias digitais variadas." }
];

// VARIÁVEIS DE ESTADO
let indiceAtual = 0;
let pontuacao = parseInt(localStorage.getItem('guarda_score')) || 0;
let quizRespondido = false;
let temporizadorTransicao;

// INICIALIZAÇÃO
window.addEventListener('DOMContentLoaded', () => {
    carregarQuestao();
    atualizarPlacarInterface();
    inicializarMenuMobile();
    inicializarAnimacaoEstatisticas();
    inicializarGlossario();
    executarEfeitoDigitacao();
});

// EFEITO DE DIGITAÇÃO NO HERO
function executarEfeitoDigitacao() {
    const titulo = document.getElementById("typing-hero");
    if (!titulo) return;
    const textoCompleto = "Segurança Máxima Contra a Desinformação Escolar";
    titulo.innerHTML = "";
    let i = 0;
    function digitar() {
        if (i < textoCompleto.length) {
            titulo.innerHTML += textoCompleto.charAt(i);
            i++;
            setTimeout(digitar, 40);
        }
    }
    digitar();
}

// LÓGICA DO SIMULADOR (QUIZ)
function carregarQuestao() {
    quizRespondido = false;
    if (temporizadorTransicao) clearTimeout(temporizadorTransicao);

    const feedbackEl = document.getElementById("feedback");
    feedbackEl.innerText = "";
    feedbackEl.className = "feedback-box";
    feedbackEl.style.display = "none";

    const questaoAtual = questoesQuiz[indiceAtual];
    const perguntaEl = document.getElementById("pergunta-texto");
    perguntaEl.innerText = questaoAtual.situacao;

    const containerOpcoes = document.getElementById("opcoes-container");
    containerOpcoes.innerHTML = "";

    questaoAtual.opcoes.forEach((opcao, index) => {
        const botao = document.createElement("button");
        botao.className = "btn-option animate-fade-in";
        botao.style.animationDelay = `${index * 0.1}s`;
        botao.innerHTML = `<span class="option-letter">${index === 0 ? 'A' : 'B'}</span> <span>${opcao}</span>`;
        botao.onclick = () => verificarResposta(index, botao);
        containerOpcoes.appendChild(botao);
    });

    atualizarBarraProgresso();
}

function verificarResposta(indiceSelecionado, botaoClicado) {
    if (quizRespondido) return;
    quizRespondido = true;

    const questaoAtual = questoesQuiz[indiceAtual];
    const feedbackEl = document.getElementById("feedback");
    const botoes = document.querySelectorAll(".btn-option");

    botoes.forEach(btn => {
        btn.style.pointerEvents = "none";
        btn.style.opacity = "0.4";
    });
    botaoClicado.style.opacity = "1";

    if (indiceSelecionado === questaoAtual.correta) {
        botaoClicado.style.borderColor = "#2ecc71";
        botaoClicado.style.background = "rgba(46, 204, 113, 0.08)";
        feedbackEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${questaoAtual.explicacao}`;
        feedbackEl.className = "feedback-box correto animate-fade-in";
        pontuacao += 10;
        localStorage.setItem('guarda_score', pontuacao);
        atualizarPlacarInterface();
    } else {
        botaoClicado.style.borderColor = "var(--accent-danger)";
        botaoClicado.style.background = "rgba(255, 51, 68, 0.08)";
        feedbackEl.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <strong>Ação de risco identificada!</strong> Esse comportamento propaga pânico no ecossistema escolar.`;
        feedbackEl.className = "feedback-box incorreto animate-fade-in";
    }

    feedbackEl.style.display = "block";
    temporizadorTransicao = setTimeout(proximaQuestao, 5000);
}

function proximaQuestao() {
    indiceAtual = (indiceAtual + 1) % questoesQuiz.length;
    carregarQuestao();
}

function pularQuestao() { proximaQuestao(); }

function atualizarBarraProgresso() {
    const barra = document.getElementById("progresso-quiz");
    if (barra) barra.style.width = `${(indiceAtual / questoesQuiz.length) * 100}%`;
}

function atualizarPlacarInterface() {
    const placar = document.getElementById("score-tracker");
    if (placar) placar.innerHTML = `<i class="fa-solid fa-bolt" style="color: var(--accent-secure);"></i> EXP Cidadão: <strong>${pontuacao}</strong>`;
}

// NOVO RECURSO: INICIALIZAÇÃO DO GLOSSÁRIO INTERATIVO
function inicializarGlossario() {
    const tabsContainer = document.getElementById("glossario-tabs-container");
    if (!tabsContainer) return;
    tabsContainer.innerHTML = "";

    bancoGlossario.forEach((item, index) => {
        const btn = document.createElement("button");
        btn.className = "btn-glossario";
        btn.innerHTML = `<span><i class="fa-solid ${item.icone}"></i> ${item.termo}</span> <i class="fa-solid fa-chevron-right"></i>`;
        btn.onclick = () => exibirTermoGlossario(index, btn);
        tabsContainer.appendChild(btn);
    });
}

function exibirTermoGlossario(index, botaoAtivo) {
    const botoes = document.querySelectorAll(".btn-glossario");
    botoes.forEach(b => b.classList.remove("active"));
    botaoAtivo.classList.add("active");

    const displayBox = document.getElementById("glossario-content-box");
    const dados = bancoGlossario[index];

    displayBox.innerHTML = `
        <div class="tab-card animate-fade-in" style="border-left: 4px solid var(--accent-secure);">
            <h3><i class="fa-solid ${dados.icone}" style="color: var(--accent-secure);"></i> ${dados.termo}</h3>
            <p>${dados.desc}</p>
        </div>
    `;
}

// NOVO RECURSO: SIMULAÇÃO DA CENTRAL DE REPORTAR DENÚNCIAS
function enviarDenuncia(event) {
    event.preventDefault();
    const tipo = document.getElementById("denuncia-tipo").value;
    const plataforma = document.getElementById("denuncia-plataforma").value;
    const detalhes = document.getElementById("denuncia-detalhes").value;
    const boxResultado = document.getElementById("resultado-denuncia");

    boxResultado.style.display = "block";
    boxResultado.className = "verify-result-box secure-result animate-fade-in";
    
    // Gera ID randômico de protocolo simulado
    const protocoloId = Math.floor(100000 + Math.random() * 900000);

    boxResultado.innerHTML = `
        <h3><i class="fa-solid fa-shield-halved"></i> Protocolo #${protocoloId} Emitido com Sucesso!</h3>
        <p style="margin-top:0.5rem; color: var(--text-main);"><strong>Plano de Contenção Acionado:</strong></p>
        <ul style="margin: 1rem 0; padding-left: 1.2rem; font-size:0.95rem;">
            <li>Evidências criptografadas localmente para auditoria.</li>
            <li>Notificação encaminhada preventivamente à Ouvidoria e TI
