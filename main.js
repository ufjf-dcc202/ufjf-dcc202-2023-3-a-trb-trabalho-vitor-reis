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

// Função para adicionar eventos de clique aos quadrados
function adicionarEventoClique() {
    document.querySelectorAll('.player-list li').forEach(square => {
        square.addEventListener('click', () => {
            // Verifica se o quadrado está vazio e se já foi preenchido
            if (square.textContent === '' && !square.classList.contains('filled') && podeClicar) {
                // Atribui o valor do dado ao quadrado clicado
                square.textContent = document.getElementById(`resultadoDado${jogadorAtual}`).textContent.split(' ')[3];

                // Adiciona a classe 'filled' para indicar que o quadrado foi preenchido
                square.classList.add('filled');

                // Troca de jogador
                trocarJogador();
            }
        });
    });
}

// Função para rolar o dado do jogador 1
function rolarDado() {
    // Verifica se o jogador pode clicar
    if (podeClicar && jogadorAtual === 1) {
        // Lógica para gerar um número aleatório de 1 a 6 (representando o dado)
        const valorDado = Math.floor(Math.random() * 6) + 1;

        // Exibe o resultado do dado no elemento HTML
        const resultadoDadoElement = document.getElementById(`resultadoDado${jogadorAtual}`);
        resultadoDadoElement.textContent = `Resultado do Dado: ${valorDado}`;

        // Aguarda um segundo antes de impedir que o jogador 1 clique novamente
        setTimeout(() => {
            // Remove os eventos de clique
            document.querySelectorAll('.player-list li').forEach(square => {
                square.removeEventListener('click', () => {});
            });

            // Troca de jogador
            trocarJogador();

            // Permite que o jogador 1 clique novamente
            podeClicar = true;

            // Adiciona os eventos de clique novamente
            adicionarEventoClique();
        }, 1000);
    }
}

// Função para trocar o jogador
function trocarJogador() {
    jogadorAtual = jogadorAtual === 1 ? 2 : 1;

    // Se o jogador atual for 2, rolar dados automaticamente
    if (jogadorAtual === 2) {
        setTimeout(() => {
            // Após rolar o dado, impede que o jogador 1 clique
            podeClicar = false;
            // Remove os eventos de clique
            document.querySelectorAll('.player-list li').forEach(square => {
                square.removeEventListener('click', () => {});
            });
            rolarDadoJogador2();
        }, 1000);
    }
}

// Função para rolar o dado do jogador 2
function rolarDadoJogador2() {
    // Lógica para gerar um número aleatório de 1 a 6 (representando o dado)
    const valorDado = Math.floor(Math.random() * 6) + 1;

    // Exibe o resultado do dado no elemento HTML
    const resultadoDadoElement = document.getElementById('resultadoDado2');
    resultadoDadoElement.textContent = `Resultado do Dado: ${valorDado}`;

    // Lógica para decidir em qual lista colocar o valor do dado (posição aleatória)
    const listaJogador2Aleatoria = listasJogador2[Math.floor(Math.random() * 3)];
    const itensLista = listaJogador2Aleatoria.getElementsByTagName('li');

    // Encontrar a primeira célula vazia e atribuir o valor do dado
    for (let j = 0; j < 3; j++) {
        if (itensLista[j].textContent === '') {
            // Atribui o valor do dado à célula vazia
            itensLista[j].textContent = valorDado;
            break; // Interrompe o loop após encontrar a primeira célula vazia
        }
    }

    // Aguarde um segundo antes de permitir que o jogador 1 clique novamente
    setTimeout(() => {
        // Permite que o jogador 1 clique novamente
        podeClicar = true;
        //
        adicionarEventoClique();
    }, 1000);
}

// Adiciona os eventos de clique aos quadrados inicialmente
adicionarEventoClique();