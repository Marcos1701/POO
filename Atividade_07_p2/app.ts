import fs from 'fs'
import prompt from 'prompt-sync'
import { Conta, Banco, Poupanca, ContaImposto } from "./Banco.js"
import {
    AplicacaoError, ContaInexistenteError, ValorInvalido_Error,
    ContaInvalidaError
} from './trata_erros.js'

const input = prompt();


function main() {
    const b: Banco = new Banco();
    let opcao: String = '';
    do {
        try {
            menu();
            opcao = input("Opção: => ");

            if (opcao == '1') {
                inserir_Contas(b)
            } else if (opcao == '2') {
                consultar(b)
            } else if (opcao == '3') {
                sacar(b)
            } else if (opcao == '4') {
                tranfere(b)
            } else if (opcao == '5') {
                depositar(b)
            } else if (opcao == '6') {
                alterar(b)
            } else if (opcao == '7') {
                renderJuros(b)
            } else if (opcao == '8') {
                excluir(b)
            } else if (opcao == '9') {
                totaliza(b)
            } else if (opcao == '10') {
                inserirApartirdeArquivo(b)
            } else if (opcao != '0') {
                throw new ValorInvalido_Error("\nOpção inválida!!!")
            }
        } catch (e: any) {
            if (e instanceof AplicacaoError) {
                console.log(`\n${e.message}`)
            }
        } finally {
            input("Operação finalizada. Digite <enter>");
            console.clear()
        }
    } while (opcao != "0");
    console.log("\nAplicação encerrada");
}

function menuContas(): void {
    console.log(`---- Criar Conta ---
        1 - Conta
        2 - Conta Poupança
        3 - Conta Imposto`)
}

function selecionarTipoConta(): number {
    menuContas();
    const op = Number(input("=> "));

    if (op > 3 || op < 1 || isNaN(op)) {
        throw new ValorInvalido_Error('Opção inválida!!')
    }
    return op;
}

function exibir_opcoes_em_um_vetor(opcoes: string[]): void {
    for (let i = 0; i < opcoes.length; i++) {
        console.log(`${i + 1} - ${opcoes[i]}`)
    }
}

function inserir_Contas(b: Banco): void {

    const op = selecionarTipoConta();
    const numero: string = input("Digite o número da conta: ")
    if (op == 1) {
        const conta: Conta = new Conta(numero)
        b.inserir(conta)
    } else if (op == 2) {
        const taxa_juros = Number(input("Digite a Taxa de Juros: "))
        const conta_P: Poupanca = new Poupanca(numero, taxa_juros)
        b.inserir(conta_P)
    } else {
        const taxa_Imposto = Number(input("Digite a Taxa de Imposto: "))
        const conta_I: ContaImposto = new ContaImposto(numero, taxa_Imposto)
        b.inserir(conta_I)
    }
}

function menu(): void {
    const opcoes: string[] = ['CriarConta', 'ConsultarConta', 'Sacar',
        'Transferir', 'Depositar', 'Alterar', 'renderJuros', 'Excluir', 'Totalizações',
        'Ler contas de um arquivo de texto']
    console.log('\nBem vindo\nDigite uma opção: ');
    for (let i = 0; i < opcoes.length; i++) {
        console.log(`${i + 1} - ${opcoes[i]}.`)
    }
    console.log("\n0 - Sair")
}

function inserirApartirdeArquivo(b: Banco) {

    console.log("Observações: ")
    console.log(`- Os dados do arquivos devem ser separados por ';'
- 'C' indica uma conta normal, 'CI' indica uma conta imposto e 'P' indica uma conta poupança
- Os dados devem estar organizados da seguinte maneira: 
  > 'tipo da conta;numero;saldo;Taxa de juros(caso sendo poupança) ou Taxa de Imposto(caso conta imposto).'
`)

    const nomeArquivo: string = input("Digite o nome do arquivo com as contas: ")

    const leitor_de_arquivo: string[] = fs.readFileSync(`./${nomeArquivo}`, 'utf-8').split('\n')

    for (let i = 0; i < leitor_de_arquivo.length; i++) {
        analisar_linha_arquivo(leitor_de_arquivo[i], b)
    }
}

function analisar_linha_arquivo(linha: string, b: Banco): void {

    const linha_frag: string[] = linha.split(';')

    if (linha_frag[0] == "C") {
        const conta_normal: Conta = new Conta(linha_frag[1], Number(linha_frag[2]))
        b.inserir(conta_normal)
    } else if (linha_frag[0] == "P") {
        const conta_Poupanca: Poupanca = new Poupanca(linha_frag[1], Number(linha_frag[2]), Number(linha_frag[3]))
        b.inserir(conta_Poupanca)
    } else if (linha_frag[0] == "CI") {
        const conta_Imposto: ContaImposto = new ContaImposto(linha_frag[1], Number(linha_frag[2]), Number(linha_frag[3]))
        b.inserir(conta_Imposto)
    } else {
        throw new ValorInvalido_Error(`\nEm uma das linhas, o valor '${linha_frag[0]} foi inserido como um tipo de conta, mas esse valor é inválido!!!\n`)
    }
}


function renderJuros(b: Banco): void {
    const numero: string = input("Digite o número da conta: ")
    b.renderJuros(numero)
    console.log("Operação realizada com sucesso")
}


function consultar(b: Banco): void {
    console.log("\nConsultar conta\n")
    const numero: string = input('Digite o número da conta: ')
    const conta: Conta = b.consultar_conta(numero)
    console.log(conta.informacoes_da_conta())
}

function sacar(b: Banco): void {

    console.log("\nSacar\n")
    const numero: string = input('Digite o número da conta: ')
    const quantia: number = Number(input('Digite o Valor de saque: R$ '))

    b.sacar(numero, quantia)
    console.log("\nSaque Realizado com sucesso")

}

function depositar(b: Banco): void {
    console.log("\nDepositar\n")
    const numero: string = input('Digite o número da conta: ')
    const quantia: number = Number(input('Digite o Valor de Deposito: R$ '))
    b.depositar(numero, quantia)
    console.log("\nDeposito realizado com sucesso!!")
}

function excluir(b: Banco): void {

    console.log("\nExcluir\n")
    const numero: string = input('Digite o número da conta: ')

    b.excluir_conta(b.consultar_conta(numero))
    console.log("\nConta excluída com sucesso!!!")
}

function alterar(b: Banco): void {
    console.log('\nAlterar\n')
    const numero: string = input('Digite o número da conta: ')
    try {
        b.consultar_conta(numero)
    }
    catch (e: any) {
        if (e instanceof (ContaInexistenteError || ValorInvalido_Error)) {
            console.log(e.message)
        }
    }
    let conta: Conta = b.consultar_conta(numero)
    let opcoes: string[]

    if (conta instanceof Poupanca) {
        opcoes = ['Alterar saldo', 'Alterar Taxa de Juros']
        exibir_opcoes_em_um_vetor(opcoes)
        console.log("0 - Sair")
        const opcao: number = Number(input('Digite a opção: '))

        if (opcao == 1) {
            const saldo: number = Number(input('Digite o novo saldo: '))
            conta = new Poupanca(conta.numero, conta.taxaJuros, saldo)
            b.alterar_conta(conta)
        } else if (opcao == 2) {
            const taxa_juros: number = Number(input('Digite a nova Taxa de Juros(ex: 1.34): '))
            conta = new Poupanca(conta.numero, taxa_juros, conta.saldo)
            b.alterar_conta(conta)
        }
        else if (opcao != 0) {
            console.log("Opção inválida!!")
        }
    } else if (conta instanceof ContaImposto) {
        opcoes = ['Alterar saldo', 'Alterar Taxa de Imposto']
        exibir_opcoes_em_um_vetor(opcoes)
        console.log("0 - Sair")
        const opcao: number = Number(input('Digite a opção: '))
        if (opcao == 1) {
            const saldo: number = Number(input('Digite o novo saldo: '))
            conta = new ContaImposto(conta.numero, conta.taxaImposto, saldo)
            b.alterar_conta(conta)
        } else if (opcao == 2) {
            const taxa_imp: number = Number(input('Digite a nova Taxa de Imposto(ex: 1.34): '))
            conta = new ContaImposto(conta.numero, taxa_imp, conta.saldo)
            b.alterar_conta(conta)
        }
        else if (opcao != 0) {
            console.log("Opção inválida!!")
        }
    }
    else {
        opcoes = ['Alterar saldo']
        exibir_opcoes_em_um_vetor(opcoes)
        console.log("0 - Sair")
        const opcao: number = Number(input('Digite a opção: '))
        if (opcao == 1) {
            const saldo: number = Number(input('Digite o novo saldo: '))
            conta = new Conta(conta.numero, saldo)
            b.alterar_conta(conta)
        } else if (opcao != 0) {
            console.log("Opção inválida!!")
        }
    }

}

function tranfere(b: Banco): void {

    console.log("\nTranferir\n")

    const numero_manda: string = input('Número da conta que vai transferir: ')
    const numero_recebe: string = input('Número da conta que irá receber: ')
    const quantia: number = Number(input('Digite o valor que será transferido: R$ '))

    b.transferir(numero_manda, numero_recebe, quantia)
    console.log("\nTranferencia Realizada com sucesso!!!")
}

function totaliza(b: Banco): void {

    console.log(`
 ----- Totalizações Banco -----
Saldo Total: R$ ${b.Soma_saldo()}
Total de contas: ${b.qtd_contas()} contas
Média Saldo: R$ ${b.media_saldo()}
`)
}

main()
