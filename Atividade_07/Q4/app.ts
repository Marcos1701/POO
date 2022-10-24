import prompt from 'prompt-sync';

import fs from 'fs'

import { Conta, Banco, Poupanca, ContaImposto } from "./banco.js"
const input = prompt();


function main() {
    let b: Banco = new Banco();
    let opcao: String = '';
    do {
        menu();
        opcao = input("Opção: => ");

        if (opcao == '1') {
            inserir_Contas(b)
        } else if (opcao == '2') {
            consultar(b)
        } else if (opcao == '3') {
            sacar(b)
        } else if (opcao == '4') {
            depositar(b)
        } else if (opcao == '5') {
            renderJuros(b)
        } else if (opcao == '6') {
            excluir(b)
        } else if (opcao == '7') {
            tranfere(b)
        } else if (opcao == '8') {
            totaliza(b)
        } else if (opcao == '9') {
            inserirApartirdeArquivo(b)
        } else if (opcao != '0') {
            console.log("\nOpção inválida!!!")
        }

        input("Operação finalizada. Digite <enter>");
    } while (opcao != "0");
    console.log("\nAplicação encerrada");
}

function menuContas(): void {
    console.log(`---- Criar Conta ---
        1 - Conta
        2 - Conta Poupança
        3 - Conta Imposto`)
}


function inserir_Contas(b: Banco): void {

    menuContas();
    let op = Number(input("=> "));

    while (op > 3 || op < 1) {
        console.log('Opção inválida!!')
        menuContas();
        op = Number(input("=> "));
    }

    let numero: string = input("Digite o número da conta: ")
    let saldo: number = Number(input("Digite o saldo da conta: "))

    if (op == 1) {
        let conta: Conta = new Conta(numero, saldo)
        b.inserir(conta)
    } else if (op == 2) {
        const taxa_juros = Number(input("Digite a Taxa de Juros: "))
        let conta_P: Poupanca = new Poupanca(numero, saldo, taxa_juros)
        b.inserir(conta_P)
    } else {
        const taxa_Imposto = Number(input("Digite a Taxa de Imposto: "))
        let conta_I: ContaImposto = new ContaImposto(numero, saldo, taxa_Imposto)
        b.inserir(conta_I)
    }

}

function menu(): void {
    console.log('\nBem vindo\nDigite uma opção:');
    console.log('1 - CriarConta 2 - ConsultarConta 3 - Sacar\n' +
        '4 - Depositar  5 - renderJuros(Conta Poupança) 6 - Excluir\n' +
        '7 - Transferir 8 – Totalizações\n' +
        '9 - inserir contas apartir de arquivo de texto\n' +
        '0 - Sair\n')
}

function inserirApartirdeArquivo(b: Banco) {

    console.log("Observações: ")
    console.log("Os dados do arquivos devem ser separados por ';'")
    console.log("'C' indica uma conta normal, 'CI' indica uma conta imposto e 'P' indica uma conta poupança")
    console.log("Os dados devem estar organizados da seguinte maneira: \n> 'tipo da conta;numero;saldo;Taxa de juros(caso sendo poupança) ou Taxa de Imposto(caso conta imposto).'")

    const nomeArquivo: string = input("Digite o nome do arquivo com as contas que serão inseridas : ")

    const leitor_de_arquivo: string[] = fs.readFileSync(`./${nomeArquivo}`, 'utf-8').split('\n')

    leitor_de_arquivo.forEach((linha: string) => analisar_linha_arquivo(linha, b))
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
        console.log(`\nEm uma das linhas, o valor '${linha_frag[0]} foi inserido como um tipo de conta, mas esse valor é inválido!!!\n`)
    }
}


function renderJuros(b: Banco): void {
    let numero: string = input("Digite o número da conta: ")
    if (b.renderJuros(numero)) {
        console.log("Operação realizada com sucesso")
    } else {
        console.log("Erro, o número inserido não pertence a nenhuma conta Poupança")
    }
}


function consultar(b: Banco): void {
    console.log("\nConsultar conta\n")
    let numero: string = input('Digite o número da conta: ')
    let conta: Conta | Poupanca | ContaImposto = b.consultar_conta(numero)

    if (conta) {
        console.log(conta.informacoes_da_conta())
    } else {
        console.log("\nA conta não existe!!")
    }
    return
}



function sacar(b: Banco): void {

    console.log("\nSacar\n")
    let numero: string = input('Digite o número da conta: ')
    let quantia: number = Number(input('Digite o Valor de saque: R$ '))

    if (b.sacar(numero, quantia)) {
        console.log("\nSaque Realizado com sucesso")
    } else {
        console.log("\nValor de saque inválido ou superior ao do saldo da conta")
    }
}

function depositar(b: Banco): void {

    console.log("\nDepositar\n")
    let numero: string = input('Digite o número da conta: ')
    let quantia: number = Number(input('Digite o Valor de Deposito: R$ '))

    if (b.depositar(numero, quantia)) {
        console.log("\nDeposito realizado com sucesso!!")
    } else {
        console.log("\nErro, conta inexistente!!")
    }
}

function excluir(b: Banco): void {

    console.log("\nExcluir\n")
    let numero: string = input('Digite o número da conta: ')

    if (b.excluir_conta(b.consultar_conta(numero))) {
        console.log("\nConta excluída com sucesso!!!")
    } else {
        console.log("\nConta inexistente, confira o número digitado!!")
    }

}

function tranfere(b: Banco): void {

    console.log("\nTranferir\n")
    let numero_manda: string = input('Digite o número da conta que irá realizar a tranferencia: ')
    let numero_recebe: string = input('Digite o número da conta que irá receber a tranferencia: ')
    let quantia: number = Number(input('Digite o Valor de Deposito: R$ '))

    if (b.transferir(numero_manda, numero_recebe, quantia)) {
        console.log("\nTranferencia Realizada com sucesso!!!")
    } else {
        console.log("\nHouve um erro ao realizar a transferencia, confira os dados e tente novamente!!!")
    }
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
