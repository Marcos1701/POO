// import prompt from 'prompt-sync'
// const input = prompt()

class Hora {
    // _hora: number
    // _min: number
    // _seg: number

    // constructor(hora: number, min: number, seg: number){
    //     this._hora = hora
    //     this._min = min
    //     this._seg = seg
    // }
    constructor(private _hora: number, private _min: number, private _seg: number) { }

    get hora() {
        return this._hora
    }

    get min() {
        return this._min
    }

    get seg() {
        return this._seg
    }

    Que_hrs_sao(): string {
        return `${this._hora}:${this._min}:${this._seg}`
    }
}

// const horario: number[] = (input("Digite o horário atual no formato (hh:mm:ss): ").split(":")).map(Number)
// const horas: Hora = new Hora(horario[0], horario[1], horario[2])

const horas: Hora = new Hora(12, 59, 30)
console.log(horas.Que_hrs_sao())

console.log(`${horas.hora} horas, ${horas.min} minutos e ${horas.seg} segundos.\n`)
