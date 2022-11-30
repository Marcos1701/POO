

class ErroApp extends Error {
    constructor(mensagem: string) {
        super(mensagem);
    }
}

class login_invalido extends ErroApp {
    constructor(msg: string) {
        super(msg);
    }
}

class post_invalido extends ErroApp {
    constructor(msg: string) {
        super(msg);
    }
}

class post_inexistente extends ErroApp {
    constructor(msg: string) {
        super(msg);
    }
}

class post_ja_criado extends ErroApp {
    constructor(msg: string) {
        super(msg);
    }
}

class rede_social_inexistente extends ErroApp {
    constructor(msg: string) {
        super(msg);
    }
}

class ValorInvalido extends ErroApp {
    constructor(msg: string) {
        super(msg);
    }
}



export { login_invalido, post_invalido, post_inexistente, post_ja_criado, rede_social_inexistente, ValorInvalido }
