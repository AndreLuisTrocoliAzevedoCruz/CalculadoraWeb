class Calculadora {

    constructor() {
        this.nrVisor = '0';
        this.ptDecimal = false;
        this.iniciouSegundo = false;
        this.estadoErro = false;
        this.memTemp = '';
        this.numMemoria = 0;
        this.memoria = 0;
        this.op = {
            NOP: 0,
            DIV: 1,
            MULT: 2,
            SUB: 3,
            SUM: 4
        };
        this.memoriaAtiva = false; // Indica se há um valor na memória
        this.opAtual = this.op.NOP;
    }

    // Retorna o conteúdo do visor
    mostraVisor() {
        if (this.memoriaAtiva) {
            return this.nrVisor + ' M'; // Adiciona ' M' ao número no visor
        } else {
            return this.nrVisor;
        }
    }

    // Recebe um dígito
    insereDigito(dig) {
        if (this.estadoErro) return;
        if (dig.length != 1) return;
        if ((dig < '0' || dig > '9') && dig != '.') return;
        if (!this.iniciouSegundo && this.opAtual != this.op.NOP) {
            this.iniciouSegundo = true;
            this.ptDecimal = false;
            this.nrVisor = '0';
        }
        if (dig == '.') {
            if (this.ptDecimal) return;
            this.ptDecimal = true;
        }
        if (this.nrVisor.length == 10) return;
        if (this.nrVisor == '0') {
            this.nrVisor = dig == '.' ? '0.' : dig;
        } else {
            this.nrVisor += dig;
        }
    }

    // Define a operação atual
    defineOperacao(op) {
        if (this.estadoErro) return;
        switch (op) {
            case '+':
                this.opAtual = this.op.SUM;
                break;
            case '-':
                this.opAtual = this.op.SUB;
                break;
            case '*':
                this.opAtual = this.op.MULT;
                break;
            case '/':
                this.opAtual = this.op.DIV;
                break;
        }
        this.memTemp = this.nrVisor;
    }

    // Executa operação: tecla IGUAL
    igual() {
        if (this.estadoErro) return;
        let num1 = parseFloat(this.memTemp);
        let num2 = parseFloat(this.nrVisor);
        let resultado = 0;
        switch (this.opAtual) {
            case this.op.SUM:
                resultado = num1 + num2;
                break;
            case this.op.SUB:
                resultado = num1 - num2;
                break;
            case this.op.MULT:
                resultado = num1 * num2;
                break;
            case this.op.DIV:
                // PERIGO: DIVISÃO POR ZERO
                if (num2 == 0) {
                    this.estadoErro = true;
                    this.nrVisor = 'ERRO';
                    return;
                }
                resultado = num1 / num2;
        }
        this.opAtual = this.op.NOP;
        this.ptDecimal = false;
        this.iniciouSegundo = false;
        this.memTemp = '';
        this.nrVisor = String(resultado).slice(0, 10);
    }

    // Limpa o conteúdo do visor e as operações (mas não a memória)
    teclaC() {
        this.nrVisor = '0';
        this.ptDecimal = false;
        this.memTemp = '';
        this.iniciouSegundo = false;
        this.estadoErro = false;
        this.opAtual = this.op.NOP;
    }

    // tecla M+ : acrescenta à memória o número no visor
    teclaMmais() {
        if (this.estadoErro) return;
        this.numMemoria = parseFloat(this.nrVisor); // Armazena o número atual antes de uma operação de memória
        this.memoria += this.numMemoria; // Soma numMemoria à memória
        this.memoriaAtiva = true; // Ativa a indicação de memória
        this.nrVisor = '0'; // Limpa o visor após adicionar à memória
    }

    // tecla M- : subtrai da memória o número no visor
    teclaMmenos() {
        if (this.estadoErro) return;
        this.numMemoria = parseFloat(this.nrVisor); // Armazena o número atual antes de uma operação de memória
        this.memoria -= this.numMemoria; // Subtrai numMemoria da memória
        this.memoriaAtiva = true; // Ativa a indicação de memória
        this.nrVisor = '0'; // Limpa o visor após subtrair da memória
    }

    // tecla RM : recupera o conteúdo da memória -> coloca no visor
    teclaRM() {
        if (this.estadoErro) return;
        let resultado = this.memoria;
        if (this.memoriaAtiva) {
            resultado += parseFloat(this.nrVisor);
        }
        this.nrVisor = String(resultado);
        this.memoriaAtiva = true; // Ativa a indicação de memória
    }

    // tecla CLM : limpa totalmente o conteúdo da memória -> atribui 0
    teclaCLM() {
        if (this.estadoErro) return;
        this.memoria = 0;
        this.memoriaAtiva = false; // Desativa a indicação de memória
    }
    
    // RECEBE A RAIZ QUADRADA
    raizQuadrada() {
        this.nrVisor = String(Math.sqrt(parseFloat(this.nrVisor)).toFixed(10));
        atualizaVisor();
    }

    // RECEBE O QUADRADO
    aoQuadrado() {
        if (this.estadoErro) return;
    
        let num = parseFloat(this.nrVisor);
        let resultado = num * num;
    
        this.nrVisor = String(resultado).slice(0, 10);
    }

    trocaSinal() {

        if (this.estadoErro) return;
   
        if (this.nrVisor !== '0') {
            this.nrVisor = (parseFloat(this.nrVisor) * -1).toString();
        }
    }
    inverso() {
        if (this.estadoErro) return;
       
            let num = parseFloat(this.nrVisor);
       
            // Evita divisão por zero
        if (num === 0) {
                this.estadoErro = true;
                this.nrVisor = 'ERRO!';
                atualizaVisor();
                return;
            }
            this.nrVisor = (1 / num).toString();
            atualizaVisor();
    }
    

    // Adiciona um método para reiniciar a calculadora
    ligarCalculadora() {
        this.nrVisor = '0';
        this.ptDecimal = false;
        this.memTemp = '';
        this.iniciouSegundo = false;
        this.estadoErro = false;
        this.opAtual = this.op.NOP;
    }

    // Calculo da porcentagem
    calculaPorcentagem() {
        if (this.estadoErro) return;
        let num = parseFloat(this.nrVisor);
        let porcentagem = num / 100;

        if (this.opAtual === this.op.SUM || this.opAtual === this.op.SUB) {
            porcentagem *= parseFloat(this.memTemp || 1);
        }

        // Limitar o número de casas decimais para duas
        porcentagem = parseFloat(porcentagem.toFixed(2));

        this.nrVisor = String(porcentagem);
    }
    // Calculo da porcentagem
      calculaPorcentagem() {
        if (this.estadoErro) return;
        let num = parseFloat(this.nrVisor);
        let porcentagem = num / 100;


        if (this.opAtual === this.op.SUM || this.opAtual === this.op.SUB) {
            porcentagem *= parseFloat(this.memTemp || 1);
        }

        // Limitar o número de casas decimais para duas
        porcentagem = parseFloat(porcentagem.toFixed(2));

        this.nrVisor = String(porcentagem);
    }

}

// Exibe o conteúdo do visor
let atualizaVisor = () => {
    document.getElementById('visor-id').innerHTML = calculadora.mostraVisor();
}

// RECEBE UM DÍGITO DA CALCULADORA
let digito = (dig) => {
    calculadora.insereDigito(dig);
    atualizaVisor();
}

// RECEBE OPERAÇÃO ATUAL
let defineOp = (op) => {
    if (calculadora.opAtual != calculadora.op.NOP) {
        igual();
        atualizaVisor();
    }
    calculadora.defineOperacao(op);
    let teclaOperacao = document.querySelector(`.tecla-esp[data-operacao="${op}"]`);
    selecionarOperacao(teclaOperacao);
}

// CALCULA A OPERAÇÃO
let igual = () => {
    calculadora.igual();
    atualizaVisor();
}

// TECLA C: LIMPA TUDO, EXCETO MEMÓRIA
let teclaC = () => {
    calculadora.teclaC();
    atualizaVisor();
}

// M+ ACRESCENTA À MEMÓRIA O NÚMERO ATUAL NO VISOR
let teclaMmais = () => {
    calculadora.teclaMmais();
    atualizaVisor();
}

// M- SUBTRAI DA MEMÓRIA O NÚMERO ATUAL NO VISOR
let teclaMmenos = () => {
    calculadora.teclaMmenos();
    atualizaVisor();
}

// PÕE NO VISOR O CONTEÚDO DA MEMÓRIA
let teclaRM = () => {
    calculadora.teclaRM();
    atualizaVisor();
}

// APAGA TODO O CONTEÚDO DA MEMÓRIA
let teclaCLM = () => {
    calculadora.teclaCLM();
    atualizaVisor();

    // Remove a classe 'selected' de todas as teclas de operação
    let teclasOperacoes = document.querySelectorAll('.tecla-esp.operacao');
    teclasOperacoes.forEach(teclaOp => {
        teclaOp.classList.remove('selected');
    });
}

// Calcula a raiz quadrada do número atual no visor
let raizQuadrada = () => {
    if (calculadora.estadoErro) return;

    let num = parseFloat(calculadora.nrVisor);

    // Evita raiz quadrada de números negativos
    if (num < 0) {
        calculadora.estadoErro = true;
        calculadora.nrVisor = 'ERRO!';
        atualizaVisor();
        return;
    }

    // Calcula a raiz quadrada
    let resultado = Math.sqrt(num);

    // Limita o número de casas decimais
    resultado = parseFloat(resultado.toFixed(5));

    // Atualiza o visor com o resultado da raiz quadrada
    calculadora.nrVisor = String(resultado);
    atualizaVisor();
}

// RECEBE O QUADRADO
let aoQuadrado = () => {
    calculadora.aoQuadrado();
    atualizaVisor();
      if (this.estadoErro) return;
   
        let num = parseFloat(this.nrVisor);
        let resultado = num * num;
   
        this.nrVisor = String(resultado).slice(0, 10);
        }

// Função para desligar a calculadora
let desligarCalculadora = () => {
    calculadora = null; // Remove a referência à calculadora
    document.getElementById('visor-id').innerHTML = ''; // Limpa o visor

    // Remove a classe 'selected' de todas as teclas de operação
    let teclasOperacoes = document.querySelectorAll('.tecla-esp.operacao');
    teclasOperacoes.forEach(teclaOp => {
        teclaOp.classList.remove('selected');
    });
}

// Função para ligar a calculadora
let ligarCalculadora = () => {
    if (!calculadora) {
        calculadora = new Calculadora(); // Cria uma nova instância da calculadora
        document.getElementById('visor-id').innerHTML = '0'; // Define o visor como "0"
    } else {
        calculadora.ligarCalculadora(); // Reinicia a calculadora
        atualizaVisor(); // Atualiza o visor
    }

    // Remove a classe 'selected' de todas as teclas de operação
    let teclasOperacoes = document.querySelectorAll('.tecla-esp.operacao');
    teclasOperacoes.forEach(teclaOp => {
        teclaOp.classList.remove('selected');
    });
}

// Calcula a porcentagem do número exibido no visor e atualiza o visor.
let teclaPorcentagem = () => {
    calculadora.calculaPorcentagem();
    atualizaVisor();
}

// Troca o sinal do número atual no visor
let trocaSinal = () => {
    calculadora.trocaSinal();
    atualizaVisor();
}


// Calcula o inverso do número atual no visor
let inverso = () => {
    calculadora.inverso(); 
    atualizaVisor();
}

// Função para adicionar classe 'selected' apenas à tecla de operação selecionada
let selecionarOperacao = (element) => {
    let teclasOperacoes = document.querySelectorAll('.tecla-esp.operacao');
    teclasOperacoes.forEach(tecla => {
        if (tecla !== element) {
            tecla.classList.remove('selected');
        }
    });
    element.classList.add('selected');
}

// Adiciona um evento de clique a todas as teclas
let todasTeclas = document.querySelectorAll('.tecla');
todasTeclas.forEach(tecla => {
    tecla.addEventListener('click', () => {
        // Remove a classe 'selected' de todas as teclas de operação
        let teclasOperacoes = document.querySelectorAll('.tecla-esp.operacao');
        teclasOperacoes.forEach(teclaOp => {
            teclaOp.classList.remove('selected');
        });
    });
});

// ==========  INICIALIZAÇÃO ===================
let calculadora = new Calculadora();