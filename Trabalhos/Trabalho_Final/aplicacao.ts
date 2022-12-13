import { RedeSocial, Post } from './redes_sociais'
import { Usuario } from './usuarios'
import {
    login_invalido, post_invalido, post_inexistente,
    post_ja_criado, rede_social_inexistente, ValorInvalido,
    usuario_inexistente, rede_social_ja_cadastrada
} from './trata_erros'
import { Dados_Aplicacao } from './repositorio'
import Prompt from 'prompt-sync'
const input = Prompt()

let repo_aplicacao: Dados_Aplicacao = new Dados_Aplicacao()


function main(): void {

    let usuario_ja_logado: boolean = false;
    let id_usuarios_excluidos: number[] = [] // salvar para reutilizar o id

    let id_redes_excluidas: number[] = [] // salvar para reutilizar o id
    let id_usuario: number = 1;
    let id_redes: number = 1;


    let opcoes: string[] = ['1 - criar novo Usuário', '2 - Realizar Login de usuário', '3 - Criar nova rede Social', '4 - excluir rede social', '5 - excluir usuario', '0 - Sair']
    let aba: string = 'Menu Principal'
    let op: number = exibir_opcoes_e_coletar_retorno(aba, opcoes)

    while (op != 0) {
        try {

            if (op == 1) {
                if (id_usuarios_excluidos.length == 0) {
                    criar_usuario(id_usuario)
                    id_usuario++
                } else {
                    criar_usuario(id_usuarios_excluidos[0])
                    id_usuarios_excluidos.shift()
                }
            }

            if (op == 2) {
                if (usuario_ja_logado) {
                    throw new login_invalido("Erro, você já está logado!!")
                }
                realizar_login()
                console.log(`\nOlá ${repo_aplicacao.usuario_logado.nome}, Seja Bem Vindo!!\n`)

                opcoes = ['1 - criar novo Usuário', '2 - Realizar Login de usuário', '3 - Criar nova rede Social',
                    '4 - excluir rede social', '5 - excluir usuario', '6 - Opções de usuario', '7 - deslogar', '0 - Sair']
            }

            if (op == 3) {
                console.log('----- Criar nova Rede Social -----')
                const nome: string = input("Digite o nome da rede social: ")
                const url: string = input("Digite a url da rede social: ")
                let Nova_Rede_Social: RedeSocial
                if (id_redes_excluidas.length > 0) {
                    Nova_Rede_Social = new RedeSocial(id_redes_excluidas[0], nome, url)
                    id_redes_excluidas.shift()
                } else {
                    Nova_Rede_Social = new RedeSocial(id_redes, nome, url)
                    id_redes++
                }
                repo_aplicacao.inserir_rede(Nova_Rede_Social)
                console.log("\nRede Social cadastrada com sucesso!!")
            }

            if (op == 4) {
                const opcoes_validas: number[] = repo_aplicacao.exibir_redes_sociais_disponiveis()
                const id: number = coletar_valor_valido(opcoes_validas);
                repo_aplicacao.excluir_rede_social(id)
                id_redes_excluidas.push(id)
            }

            if (op == 5) {
                realizar_login()
                id_usuarios_excluidos.push(repo_aplicacao.usuario_logado.id)
                repo_aplicacao.excluir_usuario(repo_aplicacao.usuario_logado.id)
                repo_aplicacao.deslogar_usuario()
            }

            if (op == 6) {
                opcoes_para_usuario()
            }

            if (op == 7) {
                repo_aplicacao.deslogar_usuario()
                opcoes = ['1 - criar novo Usuário', '2 - Realizar Login de usuário', '3 - Criar nova rede Social', '4 - excluir rede social', '0 - Sair']
            }


        } catch (e: any) {
            if (e instanceof login_invalido || e instanceof post_invalido ||
                e instanceof post_inexistente || e instanceof post_ja_criado ||
                e instanceof rede_social_inexistente) {
                console.log(`${e.message}\n\n`)
            } else {
                console.log("Ops, ocorreu um erro inesperado, favor contate o Administrador mais proximo!!")
            }
        } finally {
            input("Pressione enter para continuar...")
            op = exibir_opcoes_e_coletar_retorno(aba, opcoes)
        }
    }
    console.log("Certo, até breve!!")
}

function realizar_login(): void {
    const login: string = input("Digite seu login: ")
    const senha: string = input("Digite sua senha: ")
    repo_aplicacao.autenticar_usuario(login, senha)
}

function opcoes_para_usuario(): void {
    if (!repo_aplicacao.logado) { throw new usuario_inexistente("Erro, você não está logado!!") }

    const opcoes: string[] = ['1 - Adicionar nova rede social (dentre as disponíveis)', '2 - Opcoes para as redes sociais inseridas', '0 - Sair']
    let op: number = exibir_opcoes_e_coletar_retorno('Menu de opções do usuário', opcoes)

    while (op != 0) {
        try {
            if (op == 1) {
                const opcoes_validas: number[] = repo_aplicacao.exibir_redes_sociais_disponiveis()
                if (opcoes_validas.length == 0) { throw new rede_social_inexistente("Erro, não há redes sociais disponíveis!!") }
                console.log("Digite o id da rede social que deseja adicionar: ")
                let id_rede: number = coletar_valor_valido(opcoes_validas)
                repo_aplicacao.inserir_rede_social_em_usuario(id_rede)

                console.log("\nRede Social inserida com sucesso!!\n")
            }

            if (op == 2) {
                opcoes_para_rede_social()
            }
        } catch (e: any) {
            if (e instanceof (rede_social_inexistente || rede_social_ja_cadastrada)) {
                console.log(`${e.message}\n\n`)
            } else {
                console.log("Ops, ocorreu um erro inesperado, favor contate o Administrador mais proximo!!")
            }
        } finally {
            input("Pressione enter para continuar...")
            op = exibir_opcoes_e_coletar_retorno('Menu de opções do usuário', opcoes)
        }
    }
}


function opcoes_para_rede_social(): void {
    if (repo_aplicacao.usuario_logado == null) { throw new usuario_inexistente("Erro, você não está logado!!") }
    if (repo_aplicacao.Qtd_redes_usuario(repo_aplicacao.usuario_logado.id) <= 0) {
        throw new rede_social_inexistente("Erro, não há redes sociais cadastradas nesse usuario!!")
    }

    repo_aplicacao.exibir_redes_sociais_do_usuario()

    console.log("Digite o ID da rede social que deseja acessar: ")
    let id_rede_social: number = coletar_valor_valido(repo_aplicacao.usuario_logado.ids_redes())
    let rede_social: RedeSocial = repo_aplicacao.consultar_rede_do_usuario(id_rede_social)
    let opcoes_rede_social: string[] = ['1 - Criar novo post', '2 - Curtir post', '3 - Excluir post', '4 - visualizar post', '5 - alterar post', '6 - visualizar todos os posts', '7 - excluir rede social', '0 - Sair']
    let aba_rede_social: string = 'Menu da Rede Social'
    let op_rede_social: number = exibir_opcoes_e_coletar_retorno(aba_rede_social, opcoes_rede_social)

    while (op_rede_social != 0) {
        try {
            if (op_rede_social == 1) {
                repo_aplicacao.inserir_post(id_rede_social, criar_post(rede_social))
                console.log("\nPost criado com sucesso!!\n")
            }
            if (op_rede_social == 2) {
                curtir_post(id_rede_social)
            }
            if (op_rede_social == 3) {
                console.log("------ Excluir Post -----")
                if (rede_social.qtd_posts() <= 0) { throw new post_inexistente("Ops, não há posts para excluir!!") }
                console.log("Posts já inseridos pelo usuario: ")
                repo_aplicacao.visualizar_posts_de_rede_social_de_um_usuario(id_rede_social, repo_aplicacao.usuario_logado.id)

                console.log("Digite o id do post que deseja excluir: ")
                let id_post: number = coletar_valor_valido(rede_social.ids_posts())
                repo_aplicacao.excluir_post(id_rede_social, id_post)

                console.log("\nPost excluido com sucesso!!\n")
            }
            if (op_rede_social == 4) {
                visualizar_post(rede_social)
            }
            if (op_rede_social == 5) {

                console.log("Digite o id do post que deseja alterar: ")
                const id_post: number = coletar_valor_valido(rede_social.ids_posts())
                const post: Post = rede_social.consultar_post(id_post)
                const texto: string = input("Digite o novo texto do post: ")
                const legenda: string = input("Digite a nova legenda do post: ")
                const novo_post: Post = new Post(id_post, texto, repo_aplicacao.usuario_logado, legenda, post.data, post.curtidas)
                repo_aplicacao.alterar_post(novo_post, id_rede_social)

                console.log("\nPost alterado com sucesso!!")
            }

            if (op_rede_social == 6) {
                repo_aplicacao.visualizar_posts_de_rede_social_de_um_usuario(id_rede_social, repo_aplicacao.usuario_logado.id)
            }

            if (op_rede_social == 7) {
                repo_aplicacao.excluir_rede_de_um_usuario(id_rede_social)
                console.log("Rede social excluida com sucesso!!")
            }


        } catch (e: any) {
            if (e instanceof post_invalido || e instanceof post_inexistente
                || e instanceof rede_social_inexistente || e instanceof ValorInvalido) {
                console.log(`${e.message}\n\n`)
            } else {
                console.log("Ops, ocorreu um erro inesperado, favor contate o Administrador mais proximo!!")
            }
        } finally {
            input("Pressione enter para continuar...")

            if (op_rede_social == 7) {
                if (repo_aplicacao.Qtd_redes_usuario(repo_aplicacao.usuario_logado.id) <= 0) {
                    console.log("\nOps, este usuario não possui mais redes sociais cadastradas!!\n")
                    break
                } else {
                    repo_aplicacao.exibir_redes_sociais_do_usuario()

                    console.log("\nDigite o ID da rede social que deseja acessar: ")
                    id_rede_social = coletar_valor_valido(repo_aplicacao.usuario_logado.ids_redes())
                }

            }

            op_rede_social = exibir_opcoes_e_coletar_retorno(aba_rede_social, opcoes_rede_social)
            rede_social = repo_aplicacao.consultar_rede_do_usuario(id_rede_social)

        }
    }
}

function criar_post(rede: RedeSocial): Post {
    if (!repo_aplicacao.logado) { throw new usuario_inexistente("Erro, você não está logado!!") }

    const texto: string = input("Digite o texto do seu post: ")
    const legenda: string = input("Digite a legenda do seu post: ")

    const post: Post = new Post(rede.id_post, texto, repo_aplicacao.usuario_logado, legenda, new Date())
    return post
}

function curtir_post(id_rede_social: number): void {
    console.log("\n------ Curtir Post ------\n")
    console.log("Selecione id do usuario que deseja visualizar os posts e curtir dentre os abaixo: ")
    const id_usuarios: number[] = repo_aplicacao.consultar_usuarios_cadastrados_em_det_rede_social(id_rede_social, repo_aplicacao.usuario_logado.id)
    console.log('\n')
    const id_usuario: number = coletar_valor_valido(id_usuarios)
    console.log('Certo.. Agora digite o id do post que deseja curtir dentre os apresentados a seguir: ')
    repo_aplicacao.visualizar_posts_de_rede_social_de_um_usuario(id_rede_social, id_usuario)
    let id_post: number = Number(input("Digite o id do post que deseja curtir: "))
    repo_aplicacao.curtir_post(id_rede_social, id_post, id_usuario)
    console.log("Feito!!\n")
}

function visualizar_post(rede_social: RedeSocial): void {
    const id_post: number = Number(input("Digite o id do post que deseja visualizar: "))
    rede_social.visualizar_post(id_post)
}

function coletar_valor_valido(opcoes_validas: number[]): number {
    let opcao: number = Number(input("=> "))
    const opcao_valida = (opcoes_validas: number[], opcao_selecionada: number) => {
        for (let i = 0; i < opcoes_validas.length; i++) {
            if (opcoes_validas[i] == opcao_selecionada) {
                return true
            }
        }
        return false
    }

    while (!opcao_valida(opcoes_validas, opcao)) {
        console.log(`A opção: ${opcao} é inválida, selecione uma opção válida detre as a seguir: `)
        opcao = Number(input("=> "))
    }
    return opcao
}

function exibir_opcoes_e_coletar_retorno(aba: string, opcoes: string[]): number {

    console.log(`--------------------- ${aba} ---------------------`)

    const exibir = (vetor: string[]) => {
        for (let op of vetor) {
            console.log(` ${op}`)
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

function criar_usuario(id: number): void {
    console.log('----- Criar novo Usuário -----\n')
    const nome: string = input("Digite seu nome de usuário: ")
    const login: string = input("Digite seu login: ")
    const senha: string = input("Digite sua senha: ")

    const Novo_Usuario: Usuario = new Usuario(id, nome, login, senha)
    repo_aplicacao.inserir_usuario(Novo_Usuario)
}


main()
