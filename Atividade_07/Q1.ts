class Veiculo {
    private _placa: string;
    private _ano: number;
    constructor(placa: string, ano: number) {
        this._placa = placa;
        this._ano = ano;
    }

    get placa(){
        return this._placa;
    }

    get ano(){
        return this._ano;
    }
}
class Carro extends Veiculo {
    private _modelo: string;
    constructor(placa: string, ano: number, modelo: string) {
        super(placa, ano);
        this._modelo = modelo;
    }
    get modelo(){
        return this._modelo;
    }
}

class CarroEletrico extends Carro {
    private _autonomiaBateria: number;

    constructor(placa: string, ano: number, modelo: string, autonomiaBateria: number) {
        super(placa, ano, modelo);
        this._autonomiaBateria = autonomiaBateria;
    }

    get autonomiaBateria(){
        return this._autonomiaBateria;
    }
}
