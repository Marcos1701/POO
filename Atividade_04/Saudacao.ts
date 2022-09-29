class saudacao {
    texto: string
    destinatario: string

    constructor(text: string, destinatario: string) {
        this.texto = text
        this.destinatario = destinatario
    }

    obterSaudacao() {
        return `${this.texto}, ${this.destinatario}`
    }
}

let Saudacao: saudacao = new saudacao("Olá", "Marcos")

console.log(Saudacao.obterSaudacao())