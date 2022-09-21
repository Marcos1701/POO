function eh_par(valor: number) : boolean{
    return valor % 2 === 0
}

function conferir_valor(valor: number): void{
    if(eh_par(valor)){
        console.log(`O valor: ${valor} é par`)
    }else{
        console.log(`O valor: ${valor} é impar`)
    }
}

function main(){

    let x: number = 2

    conferir_valor(x)

    x = 3

    conferir_valor(x)

}

main()