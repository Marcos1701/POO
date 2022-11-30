
function main(): void {

    let Usuarios_criados: Usuario[] = []
    let Redes_sociais_criadas: RedeSocial[] = []
    let opcao_ja_inserida: boolean = false;
    console.log("---------- Menu ----------")
    let opcoes: string[] = ['1 - criar novo Usuário', '2 - Criar nova rede Social', '0 - Sair']
    let op: number = exibir_opcoes_e_coletar_retorno(opcoes)

    do {
        try {




            if (Usuarios_criados.length > 0 && !opcao_ja_inserida) {
                opcoes.splice(1, 2, '3 - Realizar Login de usuário');
                opcao_ja_inserida = true;
            }
        } catch (e: any) {
            if (e instanceof (login_invalido || post_invalido || post_inexistente ||
                post_ja_criado || rede_social_inexistente ||
                ValorInvalido)) {
                console.log(`${e.message}\n\n`)
            } else {
                console.log("Ops, ocorreu um erro inesperado, favor contate o Administrador mais proximo!!")
            }
        }
    } while (op != 0);

}

function exibir_opcoes_e_coletar_retorno(opcoes: string[]): number {

    const exibir = (vetor: string[]) => {
        for (let op of vetor) {
            console.log(`=> ${op}`)
        }
    }
    exibir(opcoes);

    console.log("Digite a opção desejada a seguir: ")
    let opcao: number = Number(input("=> "))

    while (opcao < 0 || opcao > opcoes.length) {
        console.log(`A opção: ${opcao} é inválida, selecione uma opção detre as a seguir: `)
        exibir(opcoes)
        console.log("Digite a opção desejada a seguir: ")
        opcao = Number(input("=> "))
    }
    return opcao
}

function criar_usuario(Usuarios: Usuario[]): void {
    console.log('----- Criar novo Usuário -----')
    let id: string = input("Digite o id do usuario: ")
    // const Novo_Usuario: Usuario = new Usuario()
}


main()

import { RedeSocial, Post } from './redes_sociais'
import { Usuario } from './usuarios'
import { login_invalido, post_invalido, post_inexistente, post_ja_criado, rede_social_inexistente, ValorInvalido } from './trata_erros'
import Prompt from 'prompt-sync'
const input = Prompt()
