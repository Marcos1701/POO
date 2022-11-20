interface IDefencivel {
    id: string;
    estaEliminado(): boolean;
    defenderAtaque(valorAtaque: number): void;
}

class Gerreiro implements IDefencivel {
    id: string;
    descricao: string = "Guerreiro comum";
    forca_de_atq: number;
    life: number;

    constructor(id: string, forca_de_atq: number, life: number) {
        this.id = id;
        this.forca_de_atq = forca_de_atq;
        this.life = life;
    }

    estaEliminado(): boolean {
        return this.life <= 0;
    }

    defenderAtaque(valorAtaque: number): void {
        if (this.estaEliminado()) {
            throw new JaEliminadoException("O guerreiro já está eliminado");
        }
        this.life -= valorAtaque;
    }

    Atacar(defensor: IDefencivel): void {
        if (!(defensor instanceof (Gerreiro || base_militar))) {
            throw new Personagem_invalido("Erro, o personagem defensor não é um guerreiro nem uma base militar");
        }
        defensor.defenderAtaque(this.forca_de_atq);
    }

}

class base_militar implements IDefencivel {
    id: string;
    loc_x: string;
    loc_y: string;
    percentual_danos: number = 0;

    constructor(id: string, loc_x: string, loc_y: string) {
        this.id = id;
        this.loc_x = loc_x;
        this.loc_y = loc_y;

    }

    estaEliminado(): boolean {
        return this.percentual_danos >= 90;
    }

    defenderAtaque(valorAtaque: number): void {
        if (this.estaEliminado()) {
            throw new JaEliminadoException(`A base, de id ${this.id}, já está eliminada`);
        }
        this.percentual_danos += valorAtaque;
    }

}


class Campo_de_batalha {

    Atacar(Atacante: Gerreiro, personagem: IDefencivel): void {
        if (!(Atacante instanceof Gerreiro)) {
            throw new Personagem_invalido("Erro, o personagem atacante não é um guerreiro");
        }
        Atacante.Atacar(personagem);
    }

    Avaliar(Equipe_1: IDefencivel[], Equipe_2: IDefencivel[]) {
        let cont = 0;
        let cont2 = 0;
        for (let i = 0; i < Equipe_1.length; i++) {
            if (Equipe_1[i].estaEliminado()) {
                if (Equipe_1[i] instanceof Gerreiro) {
                    cont += 5;
                } else {
                    cont += 10;
                }
            }
        }
        for (let i = 0; i < Equipe_2.length; i++) {
            if (Equipe_2[i].estaEliminado()) {
                if (Equipe_2[i] instanceof Gerreiro) {
                    cont += 5;
                } else {
                    cont += 10;
                }
            }
        }

        console.log(`A pontuação das equipes é respectivamente: \n => Equipe 1 = ${cont} \n => Equipe 2 = ${cont2}`)

        if (cont > cont2) {
            return "A equipe 1 venceu";
        }
        else if (cont2 > cont) {
            return "A equipe 1 venceu";
        }
        else {
            return "Ainda não acabou, ambas as equipes estão empatadas..";
        }
    }
}



class Joguinho {


    Equipe_1: IDefencivel[] = [];
    Equipe_2: IDefencivel[] = [];

    Adicionar_personagem(personagem: IDefencivel): void {

        if (!(personagem instanceof (Gerreiro || base_militar))) {
            throw new Personagem_invalido("Erro, o personagem não é um guerreiro nem uma base militar");
        }

        if (this.Equipe_1.length < 5) {
            this.Equipe_1.push(personagem);
        } else if (this.Equipe_2.length < 5) {
            this.Equipe_2.push(personagem);
        } else {
            throw new Limite_Atingido_Error("Erro, o limite de personagens foi atingido");
        }

    }

    private consultar_Equipe_personagem(personagem: IDefencivel): number {
        const tam_max: number = this.Equipe_1.length + this.Equipe_2.length;
        for (let i = 0; i < tam_max; i++) {
            if (i < this.Equipe_1.length) {
                if (this.Equipe_1[i] == personagem) {
                    return 1;
                }
            } else {
                if (this.Equipe_2[i] == personagem) {
                    return 2;
                }
            }
        }
        throw new Personagem_nao_encontradoError("Erro, o personagem não foi encontrado");
    }

    consultar_persona(id: string): IDefencivel {
        const tam_max: number = this.Equipe_1.length + this.Equipe_2.length;
        let personagem!: IDefencivel;
        for (let i = 0; i < tam_max; i++) {
            if (i < this.Equipe_1.length) {
                if (this.Equipe_1[i].id == id) {
                    personagem = this.Equipe_1[i];
                    break
                }
            } else {
                if (this.Equipe_2[i].id == id) {
                    personagem = this.Equipe_2[i]
                    break
                }
            }
        }
        if (personagem == undefined) {
            throw new Personagem_nao_encontradoError("Erro, o personagem não foi encontrado");
        }
        return personagem
    }

    Atacar(Atacante: Gerreiro, id_Atacado: string): void {

        if (!(Atacante instanceof Gerreiro)) {
            throw new Personagem_invalido("Erro, o personagem atacante não é um guerreiro");
        }

        let personagem: IDefencivel = this.consultar_persona(id_Atacado);
        const Equipe_Atac: number = this.consultar_Equipe_personagem(Atacante);
        const Equipe_Def: number = this.consultar_Equipe_personagem(personagem);

        if (Equipe_Atac == Equipe_Def) {
            throw new Ataque_invalido_Error("Erro, o personagem atacado é da mesma equipe do atacante");
        }
        Atacante.Atacar(personagem);
    }

    Avaliar(): void {
        const campo = new Campo_de_batalha();
        console.log(campo.Avaliar(this.Equipe_1, this.Equipe_2));
    }

}

function main() {

    const joguinho = new Joguinho();

    const menu = `----- Menu Joguinho -----
1 - Adicionar personagem
2 - Avaliar resultado
0 - Sair
`
    const menu_personagem = `----- Menu Personagem -----
1 - Guerreiro
2 - Base Militar

0 - Voltar
`
    let op: number
    let op_aux: number = 0;
    let id_persona: number = 0;

    const num_aleatorio = (min: number, max: number): number => { return Math.random() * (max - min) + min; }


    do {
        console.log(menu)
        op = Number(input("Digite a opção desejada: "));

        while (op < 0 || op > 2) {
            op = Number(input("Opção inválida, digite novamente: "));
        }

        try {

            if (op == 1) {
                console.log(menu_personagem)
                op_aux = Number(input("Digite a opção desejada: "));
                while (op_aux < 0 || op_aux > 2) {
                    op_aux = Number(input("Opção inválida, digite novamente: "));
                }
                if (op_aux == 1) {
                    joguinho.Adicionar_personagem(new Gerreiro(`${id_persona++}`, 15, 20));
                } else if (op_aux == 2) {
                    joguinho.Adicionar_personagem(new base_militar(`${id_persona++}`, `${num_aleatorio(1, 1000)} - W`, `${num_aleatorio(1, 1200)} - L`));
                }
            } else if (op == 2) {
                joguinho.Avaliar();
            }

        } catch (e: any) {
            console.log(e.message)
        } finally {
            input("Pressione enter para continuar");
        }

    } while (op != 0);
}

main()


import {
    JaEliminadoException, Personagem_invalido, Personagem_nao_encontradoError,
    Limite_Atingido_Error, Ataque_invalido_Error
} from './trata_erros.js'

import Prompt from 'prompt-sync';
const input = Prompt();