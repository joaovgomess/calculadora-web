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