//Crie uma função que recebe como parâmetro um número e 
//retorna true se o número for primo e false caso contrário.

function eh_primo(valor: number): boolean{
    for(let i = 2; i < valor; i++){
        if(valor % i === 0){
            return false 
        }
    }
    return valor > 1
}

function conferir_valor(valor: number): void{
    if(eh_primo(valor)){
        console.log(`O valor: ${valor} é primo`)
    }else{
        console.log(`O valor: ${valor} não é primo`)
    }
}

function main(){

    let valor = 2
   conferir_valor(valor)

   valor = 4
   conferir_valor(valor)

   valor = 7
   conferir_valor(valor)

}

main()