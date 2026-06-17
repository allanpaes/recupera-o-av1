/**
 * GuardaDigital - Sistema de Inteligência Interativa do Portal
 * Focado em Cidadania Digital, Combate a Deepfakes e Letramento Midiático.
 */

// 1. BANCO DE DADOS EXPANDIDO DO QUIZ (SITUAÇÕES DO COTIDIANO ESCOLAR)
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

// 2. VARIÁVEIS DE ESTADO DO SISTEMA
let indiceAtual = 0;
let pontuacao = parseInt(localStorage.getItem('guarda_score')) || 0;
let quizRespondido = false;
let temporizadorTransicao;

// 3. EVENTO DE INICIALIZAÇÃO DA PÁGINA
window.addEventListener('DOMContentLoaded', () => {
    carregarQuestao();
    atualizarPlacarInterface();
    inicializarMenuMobile();
    inicializarAnimacaoEstatisticas();
});

// 4. LÓGICA DO SIMULADOR (QUIZ INTERATIVO COM DESIGN RESPONSIVO)
function carregarQuestao() {
    quizRespondido = false;
    if (temporizadorTransicao) clearTimeout(temporizadorTransicao);

    const feedbackEl = document.getElementById("feedback");
    feedbackEl.innerText = "";
    feedbackEl.className = "feedback-box";
    feedbackEl.style.display = "none";

    const questaoAtual = questoesQuiz[indiceAtual];
    
    // Animação suave de fade no texto da pergunta
    const perguntaEl = document.getElementById("pergunta-texto");
    perguntaEl.classList.remove("animate-fade-in");
    void perguntaEl.offsetWidth; // Trigger reflow para resetar animação
    perguntaEl.innerText = questaoAtual.situacao;
    perguntaEl.classList.add("animate-fade-in");

    const containerOpcoes = document.getElementById("opcoes-container");
    containerOpcoes.innerHTML = "";

    questaoAtual.opcoes.forEach((opcao, index) => {
        const botao = document.createElement("button");
        botao.className = "btn-option animate-fade-in";
        botao.style.animationDelay = `${index * 0.1}s`; // Efeito cascata nos botões
        botao.innerHTML = `<span class="option-letter">${index === 0 ? 'A' : 'B'}</span> <span>${opcao}</span>`;
        botao.setAttribute("role", "button");
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
        btn.style.opacity = "0.4"; // Esmaece as opções não selecionadas
    });
    botaoClicado.style.opacity = "1";

    if (indiceSelecionado === questaoAtual.correta) {
        // Estilização premium via JS casada com as variáveis CSS
        botaoClicado.style.borderColor = "#2ecc71";
        botaoClicado.style.background = "rgba(46, 204, 113, 0.08)";
        botaoClicado.style.boxShadow = "0 0 20px rgba(46, 204, 113, 0.15)";
        
        feedbackEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${questaoAtual.explicacao}`;
        feedbackEl.className = "feedback-box correto animate-fade-in";
        
        pontuacao += 10;
        localStorage.setItem('guarda_score', pontuacao);
        atualizarPlacarInterface();
    } else {
        botaoClicado.style.borderColor = "var(--accent-danger)";
        botaoClicado.style.background = "rgba(255, 51, 68, 0.08)";
        botaoClicado.style.boxShadow = "0 0 20px rgba(255, 51, 68, 0.15)";
        
        feedbackEl.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <strong>Ação de risco identificada!</strong> Esse comportamento propaga pânico e desinformação no ambiente acadêmico.`;
        feedbackEl.className = "feedback-box incorreto animate-fade-in";
    }

    feedbackEl.style.display = "block";

    // Próxima questão de forma fluida após 5 segundos
    temporizadorTransicao = setTimeout(() => {
        proximaQuestao();
    }, 5000);
}

function proximaQuestao() {
    indiceAtual = (indiceAtual + 1) % questoesQuiz.length;
    carregarQuestao();
}

function pularQuestao() {
    proximaQuestao();
}

function atualizarBarraProgresso() {
    const barraProgresso = document.getElementById("progresso-quiz");
    if (barraProgresso) {
        const calculoPercentual = ((indiceAtual) / questoesQuiz.length) * 100;
        barraProgresso.style.width = `${calculoPercentual}%`;
    }
}

function atualizarPlacarInterface() {
    const placar = document.getElementById("score-tracker");
    if (placar) {
        placar.innerHTML = `<i class="fa-solid fa-bolt" style="color: var(--accent-secure);"></i> EXP Cidadão: <strong>${pontuacao}</strong>`;
    }
}

// 5. ANALISADOR DE LINKS EDUCAÇÃO (MOCK HEURÍSTICO REFINADO VAZIO/ANIMAÇÃO)
function analisarUrl(event) {
    event.preventDefault();
    const inputElement = document.getElementById("url-input");
    const urlInput = inputElement.value.trim().toLowerCase();
    const resultadoBox = document.getElementById("resultado-verificacao");
    
    if (!urlInput) {
        resultadoBox.style.display = "block";
        resultadoBox.className = "verify-result-box warning-result animate-fade-in";
        resultadoBox.innerHTML = "<p><i class='fa-solid fa-circle-exclamation'></i> Insira uma URL ou endereço de link válido para executar os testes estruturais.</p>";
        return;
    }

    resultadoBox.style.display = "block";
    resultadoBox.className = "verify-result-box animate-fade-in";
    resultadoBox.style.borderLeft = "4px solid var(--accent-secure)";
    resultadoBox.innerHTML = `<p><i class='fa-solid fa-circle-notch fa-spin' style='color: var(--accent-secure)'></i> Desestruturando DNS e varrendo indexações artificiais...</p>`;

    setTimeout(() => {
        const termosSuspeitos = [".xyz", ".info", "urgente", "bomba", "noticia-fake", "ganhe-gratis", "vagas-imediatas", "clique-aqui"];
        let scoreSuspeito = 0;

        termosSuspeitos.forEach(termo => {
            if (urlInput.includes(termo)) scoreSuspeito++;
        });

        if (urlInput.includes(".gov.br") || urlInput.includes(".edu.br")) {
            resultadoBox.className = "verify-result-box secure-result animate-fade-in";
            resultadoBox.innerHTML = `
                <h3><i class="fa-solid fa-shield-check"></i> Ambiente Altamente Confiável</h3>
                <p>A terminação <strong>.gov.br</strong> ou <strong>.edu.br</strong> garante blindagem institucional oficial brasileira. O conteúdo provém de canais governamentais ou universitários legítimos.</p>
            `;
        } else if (scoreSuspeito > 0 || !urlInput.includes(".com") && !urlInput.includes(".org") && !urlInput.includes(".net")) {
            resultadoBox.className = "verify-result-box warning-result animate-fade-in";
            resultadoBox.innerHTML = `
                <h3><i class="fa-solid fa-triangle-exclamation"></i> Arquitetura Suspeita Detectada</h3>
                <p>A estrutura usa domínios de baixo custo comumente associados à replicação automatizada de desinformação por bots. <strong>Atenção máxima:</strong> evite clicar e cruze as informações em portais consolidados.</p>
            `;
        } else {
            resultadoBox.className = "verify-result-box secure-result animate-fade-in";
            resultadoBox.style.borderLeft = "4px solid var(--accent-warning)";
            resultadoBox.innerHTML = `
                <h3><i class="fa-solid fa-circle-question" style="color: var(--accent-warning)"></i> Domínio Geral Padrão</h3>
                <p>O link mapeia um servidor comercial padrão estável. Lembre-se de que agentes mal-intencionados podem clonar layouts conhecidos. Certifique-se de validar se o autor do artigo é de confiança.</p>
            `;
        }
    }, 1400);
}

// 6. CONTROLE DA BARRA DE NAVEGAÇÃO MOBILE (MENU HAMBÚRGUER FLUIDO)
function inicializarMenuMobile() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const linksNav = document.querySelectorAll(".nav-link");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const expandido = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", !expandido);
            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("open");
        });

        linksNav.forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.classList.remove("active");
                navMenu.classList.remove("open");
            });
        });
    }
}

// 7. ANIMAÇÃO DE CONTADORES NUMÉRICOS COM INTERSECTION OBSERVER
function inicializarAnimacaoEstatisticas() {
    const elementosContadores = document.querySelectorAll(".stat-number");
    
    if ('IntersectionObserver' in window) {
        const observadorCrescimento = new IntersectionObserver((entradas, observador) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    const elemento = entrada.target;
                    const alvo = parseInt(elemento.getAttribute("data-target")) || 0;
                    const sufixo = elemento.innerText.includes("%") ? "%" : (elemento.innerText.includes("x") ? "x" : "");
                    
                    let contagemAtual = 0;
                    const passos = 40; 
                    const incremento = alvo / passos;
                    
                    const intervaloContagem = setInterval(() => {
                        contagemAtual += incremento;
                        if (contagemAtual >= alvo) {
                            elemento.innerText = alvo + sufixo;
                            clearInterval(intervaloContagem);
                        } else {
                            elemento.innerText = Math.floor(contagemAtual) + sufixo;
                        }
                    }, 25);
                    
                    observador.unobserve(elemento);
                }
            });
        }, { threshold: 0.3 });

        elementosContadores.forEach(num => observadorCrescimento.observe(num));
    }
}

        elementosContadores.forEach(num => observadorCrescimento.observe(num));
    }
}
