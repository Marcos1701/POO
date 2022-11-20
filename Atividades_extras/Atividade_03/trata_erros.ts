class ErronaAplicacao extends Error {
    constructor(mensagem: string) {
        super(mensagem);
    }
}


class JaEliminadoException extends ErronaAplicacao {
    constructor(mensagem: string) {
        super(mensagem);
    }
}

class Personagem_invalido extends ErronaAplicacao {
    constructor(mensagem: string) {
        super(mensagem);
    }
}


class Personagem_nao_encontradoError extends ErronaAplicacao {
    constructor(mensagem: string) {
        super(mensagem);
    }
}

class Limite_Atingido_Error extends ErronaAplicacao {
    constructor(mensagem: string) {
        super(mensagem);
    }
}

class Ataque_invalido_Error extends ErronaAplicacao {
    constructor(mensagem: string) {
        super(mensagem);
    }
}

export {
    JaEliminadoException, Personagem_invalido, Personagem_nao_encontradoError,
    Limite_Atingido_Error, Ataque_invalido_Error
}