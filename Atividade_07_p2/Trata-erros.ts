class AplicacaoError extends Error {
    constructor(mensagem: string) {
        super(mensagem)
    }
}

class ContaInexistenteError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem)
    }
}

class ContaInvalidaError extends AplicacaoError {
    // Ou PoupancaInvalida_error
    constructor(mensagem: string) {
        super(mensagem)
    }
}

class SaldoInsuficiente_Error extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem)
    }
}

class contaJaExistente_Error extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem)
    }
}



class ValorInvalido_Error extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem)
    }
}

export { ValorInvalido_Error, SaldoInsuficiente_Error, ContaInexistenteError, ContaInvalidaError, AplicacaoError, contaJaExistente_Error }
