class Equipamento {
    ligado: boolean // pede por um inicializador...

    liga(): void {
        if (!this.ligado) {
            this.ligado = true
        } else {
            console.log("O equipamento já está ligado!!")
        }
    }

    desliga(): void {
        if (this.ligado) {
            this.ligado = false
        } else {
            console.log("O equipamento já está desligado!!")
        }
    }

    inverte() {
        this.ligado = !this.ligado
    }

    estaLigado() {
        return this.ligado
    }
}


let abajur: Equipamento = new Equipamento()

abajur.liga()
abajur.liga()

abajur.desliga()
abajur.desliga()

abajur.inverte()

if (abajur.estaLigado()) {
    console.log("está ligado")
} else {
    console.log("Está desligado")
}