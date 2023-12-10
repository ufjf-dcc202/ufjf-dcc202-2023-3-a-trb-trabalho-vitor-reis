// Variável para controlar o jogador atual
let jogadorAtual = 1;

// Listas dos jogadores
const listasJogador1 = [
    document.getElementById('player1List1'),
    document.getElementById('player1List2'),
    document.getElementById('player1List3')
];

const listasJogador2 = [
    document.getElementById('player2List1'),
    document.getElementById('player2List2'),
    document.getElementById('player2List3')
];

// Função para rolar o dado
function rolarDado() {

    console.log(`Jogador Atual: ${jogadorAtual}`);

    // Lógica para gerar um número aleatório de 1 a 6 (representando o dado)
    const valorDado = Math.floor(Math.random() * 6) + 1;

    // Exibe o resultado do dado no elemento HTML
    const resultadoDadoElement = document.getElementById('resultadoDado');
    resultadoDadoElement.textContent = `Resultado do Dado: ${valorDado}`;

    // Lógica para decidir em qual lista colocar o valor do dado
    const listasJogadorAtual = jogadorAtual === 1 ? listasJogador1 : listasJogador2;

    // Lógica para encontrar a primeira célula vazia e atribuir o valor do dado
    for (let i = 0; i < 3; i++) {
        const itensLista = listasJogadorAtual[i].getElementsByTagName('li');
        for (let j = 0; j < 3; j++) {
            if (itensLista[j].textContent === '') {
                itensLista[j].textContent = valorDado;
                trocarJogador();
                console.log(`Valor Dado: ${valorDado}`);

                return;
            }
        }
    }
}

// Função para trocar o jogador
function trocarJogador() {
    console.log('Trocar Jogador');

    jogadorAtual = jogadorAtual === 1 ? 2 : 1;

    // Se o jogador atual for 2, rolar dados automaticamente
    if (jogadorAtual === 2) {
        setTimeout(() => {
            rolarDado();
        }, 1000); 
    }
}