import prompt from 'prompt-sync';
import { Conta, Banco } from "./Banco.js"
const input = prompt();
let b: Banco = new Banco();
let opcao: String = '';
do {
    menu();
    opcao = input("Opção: => ");

    if (opcao == '1') {
        inserir()
    } else if (opcao == '2') {
        consultar()
    } else if (opcao == '3') {
        sacar()
    } else if (opcao == '4') {
        depositar()
    } else if (opcao == '5') {
        excluir()
    } else if (opcao == '6') {
        tranfere()
    } else if (opcao == '7') {
        totaliza()
    } else if (opcao != '0') {
        console.log("\nOpção inválida!!!")
    }

    input("Operação finalizada. Digite <enter>");
} while (opcao != "0");
console.log("\nAplicação encerrada");

function menu(): void {
    console.log('\nBem vindo\nDigite uma opção:');
    console.log('1 - Cadastrar 2 - Consultar 3 - Sacar\n' +
        '4 - Depositar 5 - Excluir 6 - Transferir\n' +
        '7 – Totalizações\n' +
        '0 - Sair\n')
}

function inserir(): void {
    console.log("\nCadastrar conta\n");
    let numero: String = input('Digite o número da conta: ');
    let conta: Conta;
    conta = new Conta(numero, 0);
    b.inserir(conta);
}

function consultar(): void {
    console.log("\nConsultar conta\n")
    let numero: String = input('Digite o número da conta: ')
    let conta: Conta = b.consultar_conta(numero)

    if (conta) {
        console.log(conta.informacoes_da_conta())
    } else {
        console.log("\nA conta não existe!!")
    }
    return
}


function sacar(): void {

    console.log("\nSacar\n")
    let numero: String = input('Digite o número da conta: ')
    let quantia: number = Number(input('Digite o Valor de saque: R$ '))

    if (b.sacar(numero, quantia)) {
        console.log("\nSaque Realizado com sucesso")
    } else {
        console.log("\nValor de saque inválido ou superior ao do saldo da conta")
    }
}

function depositar(): void {

    console.log("\nDepositar\n")
    let numero: String = input('Digite o número da conta: ')
    let quantia: number = Number(input('Digite o Valor de Deposito: R$ '))

    if (b.depositar(numero, quantia)) {
        console.log("\nDeposito realizado com sucesso!!")
    } else {
        console.log("\nErro, conta inexistente!!")
    }
}

function excluir(): void {

    console.log("\nExcluir\n")
    let numero: String = input('Digite o número da conta: ')

    if (b.excluir_conta(b.consultar_conta(numero))) {
        console.log("\nConta excluída com sucesso!!!")
    } else {
        console.log("\nConta inexistente, confira o número digitado!!")
    }

}

function tranfere(): void {

    console.log("\nTranferir\n")
    let numero_manda: String = input('Digite o número da conta que irá realizar a tranferencia: ')
    let numero_recebe: String = input('Digite o número da conta que irá receber a tranferencia: ')
    let quantia: number = Number(input('Digite o Valor de Deposito: R$ '))

    if (b.transferir(numero_manda, numero_recebe, quantia)) {
        console.log("\nTranferencia Realizada com sucesso!!!")
    } else {
        console.log("\nHouve um erro ao realizar a transferencia, confira os dados e tente novamente!!!")
    }
}

function totaliza(): void {

    console.log(`
 ----- Totalizações Banco -----
Saldo Total: R$ ${b.Soma_saldo()}
Total de contas: ${b.qtd_contas()} contas
Média Saldo: R$ ${b.media_saldo()}
`)
}
