function mostrarExemplo() {
  document.getElementById("alerta").innerText =
    "⚠️ Atenção: este conteúdo pode ser manipulado por IA (Deepfake). Sempre verifique a fonte!";
}

function responder(respostaCorreta) {
  const resultado = document.getElementById("resultado");

  if (respostaCorreta) {
    resultado.innerText = "✔️ Correto! Nunca compartilhe sem verificar a fonte.";
    resultado.style.color = "lightgreen";
  } else {
    resultado.innerText = "❌ Incorreto! Isso pode espalhar fake news.";
    resultado.style.color = "red";
  }
}
