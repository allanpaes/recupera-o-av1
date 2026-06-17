// Banco de dados de situações reais/fakes sobre desinformação e IA
const questoesQuiz = [
    {
        situacao: "Você recebeu um vídeo do diretor da escola no WhatsApp suspendendo as aulas amanhã, mas a voz dele parece ligeiramente robótica e com pausas estranhas. O que fazer?",
        opcoes: [
            "Acreditar imediatamente e comemorar o dia de folga.",
            "Desconfiar. Pode ser uma deepfake de voz. O correto é checar os canais oficiais de comunicação da escola."
        ],
        correta: 1,
        explicacao: "Correto! Clones de voz por IA são fáceis de fazer. Sempre valide informações críticas nos canais oficiais."
    },
    {
        situacao: "Um site desconhecido publicou uma imagem ultra-realista de uma suposta explosão na sua cidade criada por IA. Qual o melhor método para validar se é real?",
        opcoes: [
            "Fazer uma busca reversa da imagem no Google e verificar se grandes portais jornalísticos cobriram o fato.",
            "Compartilhar com os amigos para perguntar se alguém sabe de algo."
        ],
        correta: 0,
        explicacao: "Exato! A busca reversa ajuda a encontrar a origem da imagem e evita o espalhamento de pânico automatizado."
    },
    {
        situacao: "Ao usar uma inteligência artificial para criar um trabalho escolar, você deve:",
        opcoes: [
            "Copiar e colar o texto gerado integralmente como se fosse seu.",
            "Usar como base para ideias, revisar os fatos gerados (pois IAs alucinam) e citar que usou a ferramenta."
        ],
        correta: 1,
        explicacao: "Perfeito! A cidadania digital exige honestidade acadêmica e senso crítico para não propagar erros da IA."
    }
];

let indiceAtual = 0;

function carregarQuestao() {
    const feedbackEl = document.getElementById("feedback");
    feedbackEl.innerText = "";
    feedbackEl.className = "";

    const questaoAtual = questoesQuiz[indiceAtual];
    document.getElementById("pergunta-texto").innerText = questaoAtual.situacao;

    const containerOpcoes = document.getElementById("opcoes-container");
    containerOpcoes.innerHTML = "";

    questaoAtual.opcoes.forEach((opcao, index) => {
        const botao = document.createElement("button");
        botao.className = "btn-option";
        botao.innerText = opcao;
        botao.onclick = () => verificarResposta(index);
        containerOpcoes.appendChild(botao);
    });
}

function verificarResposta(indiceSelecionado) {
    const questaoAtual = questoesQuiz[indiceAtual];
    const feedbackEl = document.getElementById("feedback");

    if (indiceSelecionado === questaoAtual.correta) {
        feedbackEl.innerText = questaoAtual.explicacao;
        feedbackEl.className = "correto";
        
        // Avança para a próxima pergunta após 3.5 segundos
        setTimeout(() => {
            indiceAtual = (indiceAtual + 1) % questoesQuiz.length;
            carregarQuestao();
        }, 3500);
    } else {
        feedbackEl.innerText = "Resposta errada. Pense nos riscos de segurança e tente novamente!";
        feedbackEl.className = "incorreto";
    }
}

// Inicia o simulador assim que a página carrega
window.onload = carregarQuestao;
