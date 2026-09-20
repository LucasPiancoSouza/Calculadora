class Calculadora{
    constructor(){
        this.primeiro_numero =  null;
        this.segundo_numero = null;
        this.operacao = null;
    }

    adicionar_numero(numero_digitado){
        if (this.operacao == null){ 

            if(this.primeiro_numero == "0"){
                this.primeiro_numero = numero_digitado;  
                return this.primeiro_numero;  
            }
            
            else if (this.primeiro_numero != null){
                this.primeiro_numero += numero_digitado;  
                return this.primeiro_numero;  
            }
            else {
                this.primeiro_numero = numero_digitado;
                return this.primeiro_numero;  
            }
        }
        else{
            if(this.segundo_numero == "0"){
                this.segundo_numero = numero_digitado;  
                return this.segundo_numero;  
            }

            else if (this.segundo_numero != null){
                this.segundo_numero += numero_digitado;
                return this.segundo_numero;
            }

            else {
                this.segundo_numero = numero_digitado;
                return this.segundo_numero;
            }
        }
    }

    adicionar_operacao(operacao){
        let resposta = this.verificando_numeros();
        if(resposta == false ){
            this.operacao = operacao;
            return operacao;
        }else{
            this.calcular();
            this.operacao = operacao
            return operacao
        }
        
    }
    
    calcular(){
        let resultado;
        
        if(this.primeiro_numero == null){
            this.primeiro_numero = null ;
            this.operacao = null
            this.segundo_numero = null ;
            return "Escreva o primeiro numero";
        }
        if(this.operacao == null){
            this.operacao = null
            this.segundo_numero = null ;
            return "Escreva a operação";
        }
        if(this.segundo_numero == null){
            this.segundo_numero = null ;
            return "Escreva o segundo numero";
        }
        else{
        this.primeiro_numero = Number(this.primeiro_numero);
        this.segundo_numero = Number(this.segundo_numero);
        switch(this.operacao){
            case "+":
                resultado = this.soma(this.primeiro_numero, this.segundo_numero);
            break
            case "-":
                resultado = this.subtracao(this.primeiro_numero, this.segundo_numero);
            break
            case "÷":
                resultado = this.divisao(this.primeiro_numero, this.segundo_numero);
                if(resultado == "Erro"){
                    this.primeiro_numero = null;
                }
            break
            case "x":
                resultado = this.multiplicacao(this.primeiro_numero, this.segundo_numero);
            break
            case "%":
                resultado = this.porcentagem(this.primeiro_numero, this.segundo_numero);
            break
        }
        console.log(this.primeiro_numero, this.segundo_numero);
        this.operacao = null;
        return resultado;

        }
    }
        soma(numero1,numero2){
            let resultado = numero1 + numero2;
            this.primeiro_numero = resultado;
            this.segundo_numero = null;
            return resultado;
        }
        subtracao(numero1,numero2){
            let resultado = numero1 - numero2;
            this.primeiro_numero = resultado;
            this.segundo_numero = null;
            return resultado;
        }
        divisao(numero1,numero2){
            if(numero1 == 0 || numero2 == 0){
                return "Erro";
            }
            else{
                let resultado = numero1 / numero2;
                this.primeiro_numero = resultado;
                this.segundo_numero = null;
                return resultado;
            }
            
        }
        multiplicacao(numero1,numero2){
            let resultado = numero1 * numero2;
            this.primeiro_numero = resultado;
            this.segundo_numero = null;
            return resultado;
        }
        porcentagem(numero1,numero2){
            let porcentagem = numero1 / 100;
            let resultado = porcentagem  * numero2;
            this.primeiro_numero = resultado;
            this.segundo_numero = null;
            return resultado;
        }
        limpar_tudo(){
            this.primeiro_numero =  null;
            this.segundo_numero = null;
            this.operacao = null;
        }

        colocar_virgula(){
            if (this.operacao == null){
                if (this.primeiro_numero == null){
                    this.primeiro_numero = "0.";
                    return this.primeiro_numero;
                }
                else if(!this.primeiro_numero.includes(".")){
                    //includes retorna um bool se tiver o que esta entre parenteses
                     this.primeiro_numero += ".";
                     return this.primeiro_numero;
                }else if (this.primeiro_numero.includes(".") == true){
                    alert("Já há vírgulas existes");
                    return this.primeiro_numero;
                }
                
            }else {
                if (this.segundo_numero == null){
                    alert("Formato invalido, coloque um numero primeiro!")
                    return "" ;
                }
                else if(!this.segundo_numero.includes(".")){
                     this.segundo_numero += ".";
                     return this.segundo_numero;
                }
                else if (this.segundo_numero.includes(".") == true){
                    alert("Já há vírgulas existes");
                    return this.segundo_numero;
                }
        }
    }
    verificando_numeros(){
    if(this.primeiro_numero != null &&
       this.segundo_numero != null &&
       this.operacao != null){
        return true;
    }else{
        return false
    }
}

}
class CalculadoraUI{

    constructor(){
        this.display = document.getElementById("display");
        this.calculadora = new Calculadora();
        this.botoes_numeros = document.querySelectorAll(".numero");
        this.botoes_operacoes = document.querySelectorAll(".operacoes");
        this.botao_igual = document.querySelector(".igual");
        this.limpar_tudo = document.querySelector(".excluir_tudo");
        this.virgula = document.querySelector(".virgula");

        for(let botao of this.botoes_numeros){
            botao.addEventListener("click", (event) =>{
                // Event Target vai justamente pegar examente qual botão foi clicado
                let numero = event.target.innerText;
                let resultado = this.calculadora.adicionar_numero(numero);
                this.display.value = resultado;
            }
        )
        }
        for(let botao of this.botoes_operacoes){
            botao.addEventListener("click", (event) =>{
                // Event Target vai justamente pegar examente qual botão foi clicado
                let operacao = event.target.innerText;
                let resultado = this.calculadora.adicionar_operacao(operacao)
                this.display.value = resultado;
            }
        )
        }
        this.botao_igual.addEventListener("click", () => {
            this.calcular_resultado();
        }
    )
        this.limpar_tudo.addEventListener("click", () => {
            this.limpar();
        }
    )
        this.virgula.addEventListener("click", () => {
            this.colocar_virgula();
        }
    )
    }

    mostrarResultado(resultado){
        this.display.value = resultado;
    }

    calcular_resultado(){
        let resultado = this.calculadora.calcular();
        this.mostrarResultado(resultado);
    }
    limpar(){
        this.calculadora.limpar_tudo();
        this.display.value = 0;
    }
    colocar_virgula(){
        let resultado = this.calculadora.colocar_virgula();
        this.display.value = resultado;
    }

}

let calculadoraUI = new CalculadoraUI();