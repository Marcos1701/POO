import prompt from "prompt-sync";
import { Conta, Banco } from "./Banco.js"
let input = prompt();
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
        console.log("Opção inválida!!!")
    }

    input("Operação finalizada. Digite <enter>");
} while (opcao != "0");
console.log("Aplicação encerrada");

function menu(): void {
    console.log('\nBem vindo\nDigite uma opção:');
    console.log('1 - Cadastrar 2 - Consultar 3 - Sacar\n' +
        '4 - Depositar 5 - Excluir 6 - Transferir\n' +
        '7 – Totalizações' +
        '0 - Sair\n')
    return
}

function inserir(): void {
    console.log("\nCadastrar conta\n");
    let numero: string = input('Digite o número da conta:\n=>');
    let conta: Conta;
    conta = new Conta(numero, 0);
    b.inserir(conta);
    return
}

function consultar(): void {
    console.log("\nConsultar conta\n")
    let numero: string = input('Digite o número da conta:\n=>')
    let conta: Conta = b.consultar_conta(numero)

    if (conta) {
        console.log(conta.informacoes_da_conta())
    } else {
        console.log("A conta não existe!!")
    }
    return
}


function sacar(): void {

    console.log("\nSacar\n")
    let numero: string = input('Digite o número da conta:\n=>')
    let quantia: number = Number(input('Digite o Valor de saque: \n=> R$ '))

    if (b.sacar(numero, quantia)) {
        console.log("Saque Realizado com sucesso")
    } else {
        console.log("Valor de saque inválido ou superior ao do saldo da conta\n")
    }
    return
}

function depositar(): void {

    console.log("\nDepositar\n")
    let numero: string = input('Digite o número da conta:\n=>')
    let quantia: number = Number(input('Digite o Valor de Deposito: \n=> R$ '))

    b.depositar(numero, quantia)
    return
}

function excluir(): void {

    console.log("\nExcluir\n")
    let numero: string = input('Digite o número da conta:\n=>')

    if (b.excluir_conta(b.consultar_conta(numero))) {
        console.log("Conta excluída com sucesso!!!")
    } else {
        console.log("Conta inexistente, confira o número digitado!!")
    }
    return
}

function tranfere(): void {

    console.log("\nTranferir\n")
    let numero_manda: string = input('Digite o número da conta que irá realizar a tranferencia:\n=>')
    let numero_recebe: string = input('Digite o número da conta que irá receber a tranferencia:\n=>')
    let quantia: number = Number(input('Digite o Valor de Deposito: \n=> R$ '))

    if (b.transferir(numero_manda, numero_recebe, quantia)) {
        console.log("\nTranferencia Reallizada com sucesso!!!\n")
    } else {
        console.log("Houve um erro ao realizar a transferencia, confira os dados e tente novamente!!!\n")
    }
    return
}

function totaliza(): void {

    console.log(`
 ----- Totalizações Banco -----
Saldo Total: R$ ${b.Soma_saldo()}
Total de contas: ${b.qtd_contas()} contas
Média Saldo: R$ ${b.media_saldo()}
`)
    return
}
