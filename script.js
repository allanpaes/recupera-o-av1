const dicas = [
    "Regra de Ouro do Prompt: Diga à IA qual é o papel dela (ex: 'Atue como um programador sênior') antes de pedir a tarefa.",
    "Desconfie do óbvio: Se um vídeo de uma celebridade ou político parece bizarro ou fora do comum, verifique portais de notícias antes de compartilhar.",
    "Alimente a IA com contexto: Em vez de pedir 'um texto sobre história', peça 'um resumo de 3 parágrafos sobre a Revolução Industrial focado nos impactos sociais'.",
    "Sua privacidade vale ouro: Nunca cole dados pessoais, senhas ou documentos privados em chats de Inteligência Artificial públicos.",
    "Alucinação de IA: IAs inventam fatos com muita convicção. Sempre cheque dados históricos, fontes e links gerados por elas.",
    "IA não é o Google: O Google busca páginas reais que existem. A IA generativa prevê a próxima palavra mais provável. Entenda a diferença para não ser enganado.",
    "Deepfakes de Áudio: Golpistas usam amostras de voz de apenas 3 segundos retiradas de redes sociais para clonar vozes. Fique atento a ligações estranhas de parentes pedindo dinheiro."
];

let ultimaDica = -1;

function gerarDica() {
    const elementoDica = document.getElementById("box-dica");
    
    // Evita repetir a mesma dica consecutivamente
    let indiceAleatorio;
    do {
        indiceAleatorio = Math.floor(Math.random() * dicas.length);
    } while (indiceAleatorio === ultimaDica);
    
    ultimaDica = indiceAleatorio;
    const dicaSorteada = dicas[indiceAleatorio];
    
    // Animação de saída (fade out + sobe um pouco)
    elementoDica.style.opacity = 0;
    elementoDica.style.transform = "translateY(-10px)";
    
    // Troca o texto e faz a animação de entrada (fade in + volta pro lugar)
    setTimeout(() => {
        elementoDica.innerText = dicaSorteada;
        elementoDica.style.opacity = 1;
        elementoDica.style.transform = "translateY(0px)";
    }, 300);
}
