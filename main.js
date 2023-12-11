// Variável para controlar o jogador atual
let jogadorAtual = 1;

// Lista dos jogadores
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

// Variável para controlar se o jogador pode clicar
let podeClicar = true;

// Função para verificar se é o turno do jogador 1
function ehTurnoJogador1() {
    return jogadorAtual === 1;
}

// Função para lidar com o clique em um quadrado
function handleClique(square) {
    const rect = square.getBoundingClientRect();
    const squareTop = rect.top;

    // Obtém a altura da janela do navegador
    const windowHeight = window.innerHeight;

    
    const splitLine = windowHeight * 0.5;
    // Verifica se é o turno do jogador 1
    if ((jogadorAtual === 1) && square.textContent === '' && !square.classList.contains('filled') && podeClicar && squareTop < splitLine) {
        // Atribui o valor do dado ao quadrado clicado
        square.textContent = document.getElementById(`resultadoDado${jogadorAtual}`).textContent.split(' ')[3];

        // Adiciona a classe 'filled' para indicar que o quadrado foi preenchido
        square.classList.add('filled');

        // Troca de jogador
        trocarJogador();
    }
}

// Função para adicionar eventos de clique
function adicionarEventoClique() {
    document.querySelectorAll('.player-list li').forEach(square => {
        square.addEventListener('click', () => handleClique(square));
    });
}

// Função para remover eventos de clique
function removerEventoClique() {
    document.querySelectorAll('.player-list li').forEach(square => {
        square.removeEventListener('click', () => handleClique(square));
    });
}

// Função para rolar o dado do jogador 1
function rolarDadoJogador1() {
    if (jogadorAtual === 2) {
        return; // Impede que o jogador 1 role o dado durante o turno do jogador 2
    }

    // Lógica para gerar um número aleatório de 1 a 6 (representando o dado)
    const valorDado = Math.floor(Math.random() * 6) + 1;

    const resultadoDadoElement = document.getElementById(`resultadoDado${jogadorAtual}`);
    resultadoDadoElement.textContent = `Resultado do Dado: ${valorDado}`;

    setTimeout(() => {
        podeClicar = true;
    }, 1000);   

    adicionarEventoClique();
}

// Função para trocar de jogador
function trocarJogador() {
    jogadorAtual = jogadorAtual === 1 ? 2 : 1;
    console.log(jogadorAtual);

    // Se o jogador atual for 2, rolar dados automaticamente
    if (jogadorAtual === 2) {
        setTimeout(() => {
            // Após rolar o dado, impede que o jogador 1 clique
            podeClicar = false;

            // Remove os eventos de clique
            document.querySelectorAll('.player-list li').forEach(square => {
                square.removeEventListener('click', () => {});
            });

            // Rola o dado do jogador 2
            rolarDadoJogador2();
        }, 1000);
    }
}

// Função para rolar o dado do jogador 2
function rolarDadoJogador2() {
    if (ehTurnoJogador1()) {
        return; // Impede que o jogador 2 role o dado durante o turno do jogador 1
    }

    // Lógica para gerar um número aleatório de 1 a 6 (representando o dado)
    const valorDado = Math.floor(Math.random() * 6) + 1;

    // Exibe o resultado do dado no elemento HTML
    const resultadoDadoElement = document.getElementById('resultadoDado2');
    resultadoDadoElement.textContent = `Resultado do Dado: ${valorDado}`;

    // Lógica para decidir em qual lista colocar o valor do dado (posição aleatória)
    const listaJogador2Aleatoria = listasJogador2[Math.floor(Math.random() * 3)];
    const itensLista = listaJogador2Aleatoria.getElementsByTagName('li');

    // Encontra a primeira célula vazia e atribui o valor do dado
    for (let j = 0; j < 3; j++) {
        if (itensLista[j].textContent === '') {
            // Atribui o valor do dado à célula vazia
            itensLista[j].textContent = valorDado;
            break; // Interrompe o loop após encontrar a primeira célula vazia
        }
    }


    trocarJogador();
}



