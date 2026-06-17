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

// 3. EVENTO DE INICIALIZAÇÃO DA PÁGINA
window.addEventListener('DOMContentLoaded', () => {
    // Inicializa o simulador
    carregarQuestao();
    atualizarPlacarInterface();
    
    // Inicializa componentes dinâmicos do portal
    inicializarMenuMobile();
    inicializarAnimacaoEstatisticas();
});

// 4. LÓGICA DO SIMULADOR (QUIZ INTERATIVO)
function carregarQuestao() {
    quizRespondido = false;
    const feedbackEl = document.getElementById("feedback");
    feedbackEl.innerText = "";
    feedbackEl.className = "feedback-box";
    feedbackEl.style.display = "none";

    const questaoAtual = questoesQuiz[indiceAtual];
    document.getElementById("pergunta-texto").innerText = questaoAtual.situacao;

    const containerOpcoes = document.getElementById("opcoes-container");
    containerOpcoes.innerHTML = "";

    questaoAtual.opcoes.forEach((opcao, index) => {
        const botao = document.createElement("button");
        botao.className = "btn-option";
        botao.innerHTML = `<span class="option-letter">${index === 0 ? 'A' : 'B'}</span> ${opcao}`;
        botao.setAttribute("role", "button");
        botao.onclick = () => verificarResposta(index, botao);
        containerOpcoes.appendChild(botao);
    });

    atualizarBarraProgresso();
}

function verificarResposta(indiceSelecionado, botaoClicado) {
    if (quizRespondido) return; // Trava para evitar cliques duplos
    quizRespondido = true;

    const questaoAtual = questoesQuiz[indiceAtual];
    const feedbackEl = document.getElementById("feedback");
    const botoes = document.querySelectorAll(".btn-option");

    // Desabilita todos os botões após a escolha
    botoes.forEach(btn => btn.style.pointerEvents = "none");

    if (indiceSelecionado === questaoAtual.correta) {
        botaoClicado.style.borderColor = "#2ecc71";
        botaoClicado.style.background = "rgba(46, 204, 113, 0.15)";
        
        feedbackEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${questaoAtual.explicacao}`;
        feedbackEl.className = "feedback-box correto animate-fade-in";
        
        pontuacao += 10;
        localStorage.setItem('guarda_score', pontuacao);
        atualizarPlacarInterface();
    } else {
        botaoClicado.style.borderColor = "#ff4a5a";
        botaoClicado.style.background = "rgba(255, 74, 90, 0.15)";
        
        feedbackEl.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Resposta incorreta! Esse comportamento ajuda a espalhar a desinformação e coloca a segurança do ecossistema escolar em risco.`;
        feedbackEl.className = "feedback-box incorreto animate-fade-in";
    }

    feedbackEl.style.display = "block";

    // Transição temporizada automática para o próximo cenário
    setTimeout(() => {
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
    const calculoPercentual = ((indiceAtual) / questoesQuiz.length) * 100;
    barraProgresso.style.width = `${calculoPercentual}%`;
}

function atualizarPlacarInterface() {
    const placar = document.getElementById("score-tracker");
    if (placar) {
        placar.innerHTML = `<i class="fa-solid fa-star" style="color: #f1c40f;"></i> EXP Digital: <strong>${pontuacao}</strong>`;
    }
}

// 5. SISTEMA HEURÍSTICO DE ANÁLISE DE LINKS (MOCK-UP EDUCACIONAL)
function analisarUrl(event) {
    event.preventDefault();
    const urlInput = document.getElementById("url-input").value.trim().toLowerCase();
    const resultadoBox = document.getElementById("resultado-verificacao");
    
    resultadoBox.style.display = "block";
    resultadoBox.className = "verify-result-box animate-fade-in";
    resultadoBox.innerHTML = "<p><i class='fa-solid fa-spinner fa-spin'></i> Rodando testes heurísticos nos metadados do endereço...</p>";

    setTimeout(() => {
        // Indicadores simples de links comumente usados em disparos de desinformação
        const termosSuspeitos = [".xyz", ".info", "urgente", "bomba", "noticia-fake", "ganhe-gratis", "vagas-imediatas", "clique-aqui"];
        let scoreSuspeito = 0;

        termosSuspeitos.forEach(termo => {
            if (urlInput.includes(termo)) scoreSuspeito++;
        });

        if (scoreSuspeito > 0 || !urlInput.includes(".gov.br") && !urlInput.includes(".edu.br") && !urlInput.includes(".org")) {
            if (urlInput.includes(".gov.br") || urlInput.includes(".edu.br")) {
                resultadoBox.className = "verify-result-box secure-result";
                resultadoBox.innerHTML = `
                    <h3><i class="fa-solid fa-circle-check"></i> Domínio Oficial Detectado</h3>
                    <p>Este link pertence a uma instituição governamental ou educacional brasileira autorizada (<strong>.gov.br</strong> ou <strong>.edu.br</strong>). É uma fonte institucional segura primária.</p>
                `;
            } else {
                resultadoBox.className = "verify-result-box warning-result";
                resultadoBox.innerHTML = `
                    <h3><i class="fa-solid fa-triangle-exclamation"></i> Alerta de Padrão Incomum</h3>
                    <p>O link analisado contém extensões genéricas ou termos apelativos comuns em campanhas de phishing ou distribuição de boatos por IA. <strong>Recomendamos não compartilhar</strong> até verificar em canais de jornalismo ou checagem de fatos credenciados.</p>
                `;
            }
        } else {
            resultadoBox.className = "verify-result-box secure-result";
            resultadoBox.innerHTML = `
                <h3><i class="fa-solid fa-circle-question"></i> Estrutura Padrão Identificada</h3>
                <p>O link parece seguir uma formatação comercial padrão estável (.com ou .org). Contudo, lembre-se: robôs de desinformação copiam layouts reais. Sempre confira o teor do artigo interno antes de repassar!</p>
            `;
        }
    }, 1200);
}

// 6. CONTROLE INTERATIVO DA NAVBAR (MENU MOBILE RESPONSIVO)
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

        // Fecha o menu ao clicar em qualquer link (para navegação em páginas single-page)
        linksNav.forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.classList.remove("active");
                navMenu.classList.remove("open");
            });
        });
    }
}

// 7. ANIMAÇÃO DE CONTADORES NUMÉRICOS (AÇÃO AO SCROLL)
function inicializarAnimacaoEstatisticas() {
    const elementosContadores = document.querySelectorAll(".stat-number");
    
    if ('IntersectionObserver' in window) {
        const observadorCrescimento = new IntersectionObserver((entradas, observador) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    const elemento = entrada.target;
                    const alvo = parseInt(elemento.getAttribute("data-target"));
                    const sufixo = elemento.innerText.includes("%") ? "%" : (elemento.innerText.includes("x") ? "x" : "");
                    
                    let contagemAtual = 0;
                    const incremento = alvo / 50; // Velocidade da animação proporcional ao alvo
                    
                    const intervaloContagem = setInterval(() => {
                        contagemAtual += incremento;
                        if (contagemAtual >= alvo) {
                            elemento.innerText = alvo + sufixo;
                            clearInterval(intervaloContagem);
                        } else {
                            elemento.innerText = Math.floor(contagemAtual) + sufixo;
                        }
                    }, 20);
                    
                    observador.unobserve(elemento); // Evita re-animar ao rolar novamente
                }
            });
        }, { threshold: 0.5 });

        elementosContadores.forEach(num => observadorCrescimento.observe(num));
    }
}
