class Jogador {
    nick: string
    forca: number
    nivel: number
    pontos_atuais: number

    constructor(Nick_name: string, forca: number, nivel: number, pontos: number) {
        this.nick = Nick_name
        this.nivel = nivel
        this.forca = forca
        this.pontos_atuais = pontos
    }

    calcularAtaque(): number {
        return (this.forca * this.nivel)
    }

    Ataque(jogador_atacado: Jogador): void {
        if (jogador_atacado.EstaVivo()) {
            jogador_atacado.pontos_atuais = jogador_atacado.pontos_atuais - this.calcularAtaque()
            console.log("Ataque realizado!!\n")
        } else {
            console.log("Ataque não realizado, pois o jogador atacado está morto!!\n")
        }
        return
    }

    EstaVivo(): boolean {
        return (this.pontos_atuais > 0)
    }

    Status_Jogador(): string {
        return `Olá ${this.nick} aqui estão suas informações atuais:
- Nível: ${this.nivel}
- Força: ${this.forca}
- Pontos atuais: ${this.pontos_atuais}
- Dano: ${this.calcularAtaque()}
- Status atual: ${this.EstaVivo() ? "Vivo" : "Morto"}
        `
    }
}

let player_1: Jogador = new Jogador("Marcos", 10, 1, 100)
let player_2: Jogador = new Jogador("Bot", 12, 2, 110)

console.log(player_1.Status_Jogador())
console.log(player_2.Status_Jogador())

player_1.Ataque(player_2)
player_2.Ataque(player_1)

console.log(player_1.Status_Jogador())
console.log(player_2.Status_Jogador())

while (player_2.EstaVivo()) {
    player_1.Ataque(player_2)
}


console.log(player_1.Status_Jogador())
console.log(player_2.Status_Jogador())