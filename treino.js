document.addEventListener('DOMContentLoaded', () => {
    // Elementos DOM - com verificação
    const pontosEl = document.getElementById("pontosEl");
    const upgradeInfoEl = document.getElementById("upgradeInfoEl");
    const clickBtn = document.getElementById("clickBtn");
    const upgradeBtn = document.getElementById("upgradeBtn");
    
    // Verifique se os elementos existem
if (!pontosEl || !upgradeInfoEl || !clickBtn || !upgradeBtn) {
    console.error("Elementos não encontrados! Verifique os IDs no HTML.");
    return;
}

let pontos = 0;
let upgradeLevel = 0;
let pontosPorClique = 1;

// Elementos DOM
// (Removido porque já foram declarados acima)

// Atualizar a tela
function atualizarTela() {
    pontosEl.textContent = `Pontos: ${pontos}`;
    upgradeInfoEl.textContent = `Nível do Upgrade: ${upgradeLevel} | Pontos por Clique: ${pontosPorClique}`;
    upgradeBtn.textContent = `MELHORAR (Custo: ${calcularCustoUpgrade()} pontos)`;
}

// Calcular custo do upgrade (função separada para melhor organização)
function calcularCustoUpgrade() {
    return (upgradeLevel + 1) * 50; // Alterado para progressão mais balanceada
}

// Salvar progresso
function salvarProgresso() {
    localStorage.setItem('pontos', pontos.toString());
    localStorage.setItem('upgradeLevel', upgradeLevel.toString());
    localStorage.setItem('pontosPorClique', pontosPorClique.toString());
}

// Carregar o progresso
function carregarProgresso() {
    const savedPontos = localStorage.getItem('pontos');
    const savedUpgradeLevel = localStorage.getItem('upgradeLevel');
    const savedPontosPorClique = localStorage.getItem('pontosPorClique');

    if (savedPontos) pontos = parseInt(savedPontos) || 0;
    if (savedUpgradeLevel) upgradeLevel = parseInt(savedUpgradeLevel) || 0;
    if (savedPontosPorClique) pontosPorClique = parseInt(savedPontosPorClique) || 1;

    atualizarTela();
}

// Clique principal
clickBtn.addEventListener("click", () => {
    pontos += pontosPorClique;
    salvarProgresso();
    atualizarTela();
});

// Evento de upgrade
upgradeBtn.addEventListener("click", () => {
    const custo = calcularCustoUpgrade();
    if (pontos >= custo) {
        pontos -= custo;
        upgradeLevel++;
        pontosPorClique = 1 + upgradeLevel; // Pontos por clique igual ao nível + 1
        salvarProgresso();
        atualizarTela();
    } else {
        alert(`Você precisa de mais ${custo - pontos} pontos para melhorar!`);
    }
});

// Iniciar o jogo
document.addEventListener('DOMContentLoaded', carregarProgresso);// Iniciar o jogo
carregarProgresso();
});
