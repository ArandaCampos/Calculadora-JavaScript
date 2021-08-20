const telaSaida = window.document.getElementsByClassName("telasaida")[0]
var listaNumero = []    // Armazena os números a serem operados
var listaOperador = []  // Armazena as operações a serem realizadas
var display = ""        // Aramzena a String que receberá a saída FORMATADA
var operacaoAposIgual = false   // Parâmetro que observa se o usuário deseja utilizar o resultado anteriormente obtido (ANS)

function contarCaracteres(){
    var n = 1
    var resto = display[display.length - n]
    while (resto != '&' && resto != 'A'){
        n += 1
        resto = display[display.length - n]
    }
    return n
}

function apagarDisplay(qtde){
    display = display.slice(0, -qtde)
    return display
}

function retificarListaNumero(){
    listaNumero.pop()
}

function retificarListaOperando(){
    listaOperador.pop()
}
function retificarDisplay(){
    if (display[display.length - 1] == 's' || display[display.length - 1] == ';'){ 
        var caracteres = contarCaracteres()
    } else {
        caracteres = 1
    }
    apagarDisplay(caracteres)
    return caracteres
}

function imprimirSaida(){
    telaSaida.innerHTML = listaNumero.join('') 
}

function realizarOperacao(indice, operador){
    let varLocal = 0
    switch (operador){
        case 1:
            varLocal = Number(listaNumero[indice]) + Number(listaNumero[indice + 1]);
            break;
        case 2:
            varLocal = Number(listaNumero[indice]) - Number(listaNumero[indice + 1]);
            break;
        case 3:
            varLocal = Number(listaNumero[indice]) * Number(listaNumero[indice + 1]);
            break;
        case 4:
            varLocal = Number(listaNumero[indice]) / Number(listaNumero[indice + 1]);
            break;
        case 5:
            varLocal = Number(listaNumero[indice]) ** Number(listaNumero[indice + 1]);
            break;
        default:
            break;
    }
    listaNumero.splice(indice, 2, varLocal)
    return listaNumero, display
}

function precedenciaAlgebrica(){
    listaOperador.pop()
    for (operador = 5; operador > 0; operador--){
        var indice = listaOperador.indexOf(operador)
        while (indice >= 0){
            realizarOperacao(indice, operador)
            listaOperador.splice(indice, 1)
            indice = listaOperador.indexOf(operador)
        }
    }
    gravarDisplay('Ans')
    imprimirSaida()
    return listaNumero
}

function verificarSintaxe(){
    if (listaNumero.indexOf('') == -1){
        precedenciaAlgebrica()
    } else {
        construtorRestart()
        telaSaida.innerHTML = '<font size ="6"><i>Erro de sintaxe</i></font>'
    }
}
function identificarOperacao(operador){
    if (operador == 1){
        display += "+"
    } else if (operador == 2){
        display +=  "-"
    } else if (operador == 3){
        display += "&times;"
    } else if (operador == 4){
        display +=  "&divide;"
    } else if (operador == 5){
        display += "^"
    } else if (operador == 6){
        display = ""
        verificarSintaxe()
    }
    return display
}

function booleanoIgual(operador){
    if (operador == 6){
        operacaoAposIgual = true 
    } else { 
        operacaoAposIgual = false
    }
    return listaNumero
}

function guardarOperacao(operador){
    listaOperador.push(Number(operador))
    return listaOperador
}

function imprimirEntrada(){
    const telaEntrada = window.document.getElementsByClassName("telaentrada")[0]
    telaEntrada.innerHTML = display
}

function gravarDisplay(entrada){
    if (entrada == 3.1415){
        display += "&pi;"
    } else if (entrada == 10){
        display += "."
    } else {
        display += String(entrada)
    }
    return display
}

function gravarListaNumero(n){
    listaNumero.push(n)
}

function juntarNumero(){
    let tamanho = listaOperador.length
    let numeros = listaNumero.splice(tamanho, listaNumero.length)
    listaNumero.splice(tamanho, listaNumero.length, numeros.join(''))
}

function restaurarSaida(){
    const telaSaida = window.document.getElementsByClassName("telasaida")[0]
    telaSaida.innerHTML = '0.'
}

function construtorRestart(){
    listaNumero = listaNumero.splice(0,0)
    listaOperador = listaOperador.splice(0,0)
    operacaoAposIgual = false
    display = ""
    imprimirEntrada()
    restaurarSaida()
}

function construtorBackSpace(){
    if (display[display.length - 1] == 's'){
        construtorRestart()
    } else if (display[display.length - 2] == 'i'){
        retificarListaNumero()
    } else if (display[display.length - 1] == ';' || display[display.length - 1] == '+' || display[display.length - 1] == '-'){ 
        retificarListaOperando()
    } else {
        retificarListaNumero()
    }
    retificarDisplay()
    imprimirEntrada()
}

function construtorOperador(operador){
    juntarNumero()
    guardarOperacao(operador)
    booleanoIgual(operador)
    identificarOperacao(operador)
    imprimirEntrada()
}

function construtorNumeros(n){
    if (operacaoAposIgual){
        construtorRestart()
    }
    if(n == 10){
        n = '.'
    }
    gravarDisplay(n)
    gravarListaNumero(n)
    imprimirEntrada()
}