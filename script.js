let totalAcumulado = 0;
let visor = "0"; // é o que aparece no visor ants de ocorrer qualquer ação do usuario
let operadorAnterior = null;

const telaCalc = document.querySelector('.visor');


//função responsavel pelos cliques em qualquer botao
//se o numero não for um numero (isNaN), vai tratar como um simbolo
//se for um numero, vai tratar como um numero (sério???)
//depois de qualquer clique, vai atualizar o visor da calculadora com valor clicado
function cliqueBotao(value) {
    if (isNaN(value)) {
        manipularSimbolo(value);
    } else {
        manipularNumero(value);
    }
    telaCalc.innerText = visor;
}


//função resonsável pelos clique em simbolos em geral
//caso clicar no 'C', limpa o visor
//caso clicar no '=', verifica se clicaram em alguma operação. Se sim faz a operação matematica exibindo no visor e zerando o 'totalAcumulado'
//caso clicar no '←', verifica se o visor tem apenas um digito. Se tiver, mostra 0 no visor, senão, apaga o ultimo digito do visor
//caso clicar em algum operador matematica, chamamos a função que manipula esses simbolos em especifico
function manipularSimbolo (simbolo) {
    switch (simbolo) {
        case 'C':
            visor = '0';
            totalAcumulado = 0;
            break;
        
        case '=':
            if (!operadorAnterior) {
                return;
            }
            executarOperacao(parseInt(visor));
            operadorAnterior = null;
            visor = totalAcumulado.toString();
            totalAcumulado = 0;
            break;

        case '←':
            if (visor.length === 1) {
                visor = 0;
            } else {
                visor = visor.substring(0, visor.length - 1);
            }
            break;
        
        case '+':
        case '−':
        case '×':
        case '÷':
            manipularMatematica(simbolo);
            break;
    }
}

//função responsavel pelos cliques nos operadores matematicos
//se o visor for '0' e um operador for clicado, nada acontece (pra não fazer operação com o 0 inicial sem querer)
//se o 'totalAcumulado' for 0, significa que é o primeiro número de uma nova operação e o primeiro número se torna o total acumulado
//se ja tiver um 'totalAcumulado', executa a operação clicado com o valor atual do visor
function manipularMatematica(simbolo) {
    if (visor === '0') {
        return;
    }

    const valorVisor = parseInt(visor);

    if (totalAcumulado === 0) {
        totalAcumulado= valorVisor;
    } else {
        executarOperacao(valorVisor);
    }
    operadorAnterior = simbolo;
    visor = '0';
}

//função responsavel pelos cliques em numeros
//se o visor estiver com '0', vai substituir pelo numero que foi clicado
//senão, vai concatenar o numero clicado com o numero que ja estava no visor
function manipularNumero(stringNumero) { 
    if (visor === "0") { 
        visor = stringNumero;
    } else { 
        visor += stringNumero;
    }
}

//função responsavel por iniciar as interações da calculadora
//chama todos os botoes com a classe 'botao' no index, e adciona um event listener para cada um
//quando um botao for clicado, vai chamar a função 'cliqueBotao' que vai capturar o txto do botao clicado
//passei o nome da classe e não da tag button para evitar que o navegador confunda o clique para um elemento filho do botao
function iniciar() {
    document.querySelectorAll('.botao').forEach(function(botao) {
        botao.addEventListener('click', function(event) {
            cliqueBotao(event.target.innerText);
        });
    });
}

iniciar();