
function main(): void {

    let Usuarios_criados: Usuario[] = []
    let Redes_sociais_criadas: RedeSocial[] = []
    console.log("---------- Menu ----------")
    let opcoes: string[] = ['1 - criar novo Usuário', '2 - Criar nova rede Social', '0 - Sair']
    exibir_opcoes(opcoes)
    console.log("Selecione a opção desejada: ")
    let op: string = input('=> ')

    do {
        try {




        } catch (e: any) {
            if (e instanceof (login_invalido || post_invalido || post_inexistente ||
                post_ja_criado || rede_social_inexistente ||
                ValorInvalido)) {
                console.log(`${e.message}\n\n`)
            } else {
                console.log("Ops, ocorreu um erro inesperado, favor contate o Administrador mais proximo!!")
            }
        }
    } while (op != '0')

}

function exibir_opcoes(op: string[]): void {
    for (let opcao of op) {
        console.log(`=> ${opcao}`)
    }
}


main()

import { RedeSocial, Post } from './redes_sociais'
import { Usuario } from './usuarios'
import { login_invalido, post_invalido, post_inexistente, post_ja_criado, rede_social_inexistente, ValorInvalido } from './trata_erros'
import Prompt from 'prompt-sync'
const input = Prompt()
