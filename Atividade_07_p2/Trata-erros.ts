

class AplicacaoError extends Error {
  constructor(mensagem: string){
      super(mensagem)
    }
}

class ContaInexistenteError extends AplicacaoError {
    constructor(mensagem: string){
      super(mensagem)
    }
}

class SaldoInsuficiente extends AplicacaoError {
    constructor(mensagem: string){
      super(mensagem)
    }
}
