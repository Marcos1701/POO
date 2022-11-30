
function main(): void {

    let Usuarios_criados: any[] = [{
        id: 0,
        usuarios: []
    }]
    let Redes_sociais_criadas: RedeSocial[] = []
    let opcao_ja_inserida: boolean = false;
    let id: number = 0;

    console.log("---------- Menu ----------")

    let opcoes: string[] = ['1 - criar novo Usuário', '2 - Criar nova rede Social', '0 - Sair']
    let op: number = exibir_opcoes_e_coletar_retorno(opcoes)

    do {
        try {

            if(op == 1){

            }
            if(op == 2){

            }
            if(op == 3){

            }




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
        console.log(`A opção: ${opcao} é inválida, selecione uma opção válida detre as a seguir: `)
        exibir(opcoes)
        console.log("Digite a opção desejada a seguir: ")
        opcao = Number(input("=> "))
    }
    return opcao
}

function criar_usuario(id: number): Usuario_V {
    console.log('----- Criar novo Usuário -----')
    const nome: string = input("Digite seu nome de usuário: ")
    const idade: number = Number(input("Digite a sua Idade: "))
    const login: string = input("Digite seu login: ")
    const senha: string = input("Digite sua senha: ")
    
    const Novo_Usuario: Usuario_V = new Usuario_V(id, nome, idade, login, senha)
    return Novo_Usuario
}


main()

import { RedeSocial, Post } from './redes_sociais'
import { Usuario_V , Repo_vetor} from './usuarios'
import { login_invalido, post_invalido, post_inexistente, post_ja_criado, rede_social_inexistente, ValorInvalido } from './trata_erros'
import Prompt from 'prompt-sync'
const input = Prompt()
