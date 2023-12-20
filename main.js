let jogadorAtual = 1;
let colunaSelecionada = 0;

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

// Função para adicionar classe 'selected' à coluna selecionada
function marcarColunaSelecionada() {
    listasJogador1[colunaSelecionada].classList.add('selected');
}

// Função para remover classe 'selected' da coluna anteriormente selecionada
function desmarcarColunaSelecionada() {
    listasJogador1[colunaSelecionada].classList.remove('selected');
}

// Função para verificar se é o turno do jogador 1 e atualizar a interface
function atualizarTurnoJogador1() {
    marcarColunaSelecionada();
    adicionarEventoClique();
}

function adicionarEventoEnter() {
    document.addEventListener('keydown', handleEnterKeyPress);
}

function removerEventoEnter() {
    document.removeEventListener('keydown', handleEnterKeyPress);
}

function atualizarColunaSelecionada() {
    desmarcarColunaSelecionada();
    listasJogador1[colunaSelecionada].classList.add('selected');
}
function handleEnterKeyPress(event) {
    const key = event.key;

    if (key === 'Enter') {
        tratarSelecao();
    } else if (key === 'ArrowRight' && colunaSelecionada < 2) {
        // Move para a próxima coluna
        desmarcarColunaSelecionada();
        colunaSelecionada++;
        marcarColunaSelecionada();
    } else if (key === 'ArrowLeft' && colunaSelecionada > 0) {
        // Move para a coluna anterior
        desmarcarColunaSelecionada();
        colunaSelecionada--;
        marcarColunaSelecionada();
    }
}

function handleKeyPress(event) {
    const key = event.key;

    if (key === 'ArrowRight' && colunaSelecionada < 2) {
        // Move para a próxima coluna
        desmarcarColunaSelecionada();
        colunaSelecionada++;
        marcarColunaSelecionada();
    } else if (key === 'ArrowLeft' && colunaSelecionada > 0) {
        // Move para a coluna anterior
        desmarcarColunaSelecionada();
        colunaSelecionada--;
        marcarColunaSelecionada();
    }
}

// Função para tratar a seleção quando a tecla Enter é pressionada
function tratarSelecao() {
    const valorDado = document.getElementById(`resultadoDado${jogadorAtual}`).textContent.split(' ')[3];

    // Encontra a posição para adicionar o valor do dado na coluna selecionada
    let posicao = 2;
    while (posicao >= 0) {
        const square = listasJogador1[colunaSelecionada].getElementsByTagName('li')[posicao];
        if (square.textContent === '') {
            square.textContent = valorDado;
            square.classList.add('filled');
            break;
        }
        posicao--;
    }

    // Se todas as posições estiverem ocupadas, exibe um alerta
    if (posicao < 0) {
        alert('Escolha outra coluna, todas estão ocupadas!');
    }

    // Atualiza a coluna selecionada
    desmarcarColunaSelecionada();

    // Troca de jogador
    trocarJogador();
}

// Função para adicionar eventos de keydown
function adicionarEventoClique() {
    document.addEventListener('keydown', tratarSelecao);
}

// Função para remover eventos de keydown
function removerEventoClique() {
    document.removeEventListener('keydown', tratarSelecao);
}

// Função para verificar se o elemento clicado pertence à pontuação do jogador
function clicouNoScore(element) {
    return element.closest('.score') !== null;
}

// Função para atualizar a pontuação do jogador na interface
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
        return;
    }

    // Lógica para gerar um número aleatório de 1 a 6 (representando o dado)
    const valorDado = Math.floor(Math.random() * 6) + 1;

    const resultadoDadoElement = document.getElementById(`resultadoDado${jogadorAtual}`);
    resultadoDadoElement.textContent = `Dado jogador 1: ${valorDado}`;

    setTimeout(() => {
        podeClicar = true;
        atualizarColunaSelecionada();
        adicionarEventoEnter();
    }, 1000);

    verificarIgualdadeColunasAmbosJogadores();
}

// Função para trocar de jogador
function trocarJogador() {
    jogadorAtual = jogadorAtual === 1 ? 2 : 1;
    atualizarScoreJogador(1);
    console.log(jogadorAtual);

    // Se o jogador atual for 2, rolar dados automaticamente
    if (jogadorAtual === 2) {
        podeClicar = false;
        removerEventoClique();
        rolarDadoJogador2();
    }
}
// Função para rolar o dado do jogador 2
function rolarDadoJogador2() {
    if (jogadorAtual === 1) {
        return;
    }

    removerEventoClique();

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

    verificarIgualdadeColunasAmbosJogadores(colunaJogador2Aleatoria);

    trocarJogador();
}

// Função para verificar igualdade nas colunas de ambos os jogadores
function verificarIgualdadeColunasAmbosJogadores() {
    for (let colunaJogador1 = 0; colunaJogador1 < 3; colunaJogador1++) {
        for (let linha = 0; linha < 3; linha++) {
            const valorJogador1 = listasJogador1[colunaJogador1].getElementsByTagName('li')[linha].textContent;

            // Verifica se o valor existe na coluna do jogador 2
            for (let colunaJogador2 = 0; colunaJogador2 < 3; colunaJogador2++) {
                if (colunaJogador2 !== colunaJogador1) {
                    const valorJogador2 = listasJogador2[colunaJogador2].getElementsByTagName('li')[linha].textContent;

                    if (valorJogador1 === valorJogador2 && valorJogador1 !== '') {
                        console.log(`Elemento igual encontrado na linha ${linha + 1}, posição ${colunaJogador1 + 1} para ambos os jogadores!`);

                        // Limpa o elemento na coluna do jogador 2
                        listasJogador2[colunaJogador2].getElementsByTagName('li')[linha].textContent = '';
                        listasJogador2[colunaJogador2].getElementsByTagName('li')[linha].classList.remove('filled');
                    }
                }
            }
        }
    }
}

document.getElementById('btnRolarDado').addEventListener('click', rolarDadoJogador1);
