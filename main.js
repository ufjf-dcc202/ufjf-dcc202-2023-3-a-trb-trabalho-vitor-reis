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

        // Indica que o quadrado foi corrigido
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

function clicouNoScore(element) {
    return element.closest('.score') !== null;
}

function atualizarScoreJogador(jogador) {
    const listaJogador = jogador === 1 ? listasJogador1 : listasJogador2;
    const scoreDiv = document.getElementById(`scoreJogador${jogador}`);

    for (let coluna = 0; coluna < 3; coluna++) {
        let somaColuna = 0;

        // Soma os valores da coluna na lista de jogadores correspondente
        for (let i = 0; i < 3; i++) {
            somaColuna += parseInt(listaJogador[coluna].getElementsByTagName('li')[i].textContent, 10) || 0;
        }

        // Atualiza o valor na div score correspondente ao jogador
        scoreDiv.getElementsByTagName('li')[coluna].textContent = somaColuna;
    }
}

// Função para rolar o dado do jogador 1
function rolarDadoJogador1() {
    if (jogadorAtual === 2) {
        return; // Impede que o jogador 1 role o dado durante o turno do jogador 2
    }

    // Lógica para gerar um número aleatório de 1 a 6 (representando o dado)
    const valorDado = Math.floor(Math.random() * 6) + 1;

    const resultadoDadoElement = document.getElementById(`resultadoDado${jogadorAtual}`);
    resultadoDadoElement.textContent = `Dado jogador 1: ${valorDado}`;

    setTimeout(() => {
        podeClicar = true;
    }, 1000);   

    adicionarEventoClique();

    verificarIgualdadeColunasAmbosJogadores();

}

// Função para trocar de jogador
function trocarJogador() {


    jogadorAtual = jogadorAtual === 1 ? 2 : 1;
    atualizarScoreJogador(1);
    console.log(jogadorAtual);

    // Se o jogador atual for 2, rolar dados automaticamente
    if (jogadorAtual === 2) {
        
            // Após rolar o dado, impede que o jogador 1 clique
            podeClicar = false;

            // Remove os eventos de clique
            document.querySelectorAll('.player-list li').forEach(square => {
                square.removeEventListener('click', () => {});
            });
            
            
            rolarDadoJogador2();
        
    }
    
    
    }


// Função para rolar o dado do jogador 2
function rolarDadoJogador2() {
    if (jogadorAtual === 1) {
        return;
    }

    const valorDado = Math.floor(Math.random() * 6) + 1;
    const resultadoDadoElement = document.getElementById('resultadoDado2');
    resultadoDadoElement.textContent = `Dado Jogador 2: ${valorDado}`;

    const colunaJogador2Aleatoria = Math.floor(Math.random() * 3);
    const listaJogador2Aleatoria = listasJogador2[colunaJogador2Aleatoria];
    const itensLista = listaJogador2Aleatoria.getElementsByTagName('li');

    for (let j = 0; j < 3; j++) {
        if (itensLista[j].textContent === '') {
            itensLista[j].textContent = valorDado;
            break;
        }
        
    }

    atualizarScoreJogador(2);

    console.log(`Rolou dado para Jogador 2. Coluna escolhida: ${colunaJogador2Aleatoria + 1}`);

    verificarIgualdadeColunasAmbosJogadores();

    trocarJogador();
}

function verificarIgualdadeColunasAmbosJogadores() {
    for (let linha = 0; linha < 3; linha++) {
        for (let coluna = 0; coluna < 3; coluna++) {
            const elementoJogador1 = listasJogador1[coluna].getElementsByTagName('li')[linha].textContent;
            const elementoJogador2 = listasJogador2[coluna].getElementsByTagName('li')[linha].textContent;

            if (elementoJogador1 === elementoJogador2 && elementoJogador1 !== '') {
                console.log(`Elemento igual encontrado na linha ${linha + 1}, posição ${coluna + 1} para ambos os jogadores!`);
                
            }
        }
    }
}










