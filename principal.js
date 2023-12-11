// main.js
import { ehTurnoJogador1, adicionarEventoClique, rolarDadoJogador1, rolarDadoJogador2 } from './jogo.js';

adicionarEventoClique();

document.getElementById('rollDiceBtn').addEventListener('click', () => {
    if (ehTurnoJogador1()) {
        rolarDadoJogador1();
    } else {
        rolarDadoJogador2();
    }
});
