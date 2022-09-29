class Hotel {
    quantReservas: number;

    constructor(valor: number) {
        this.quantReservas = valor
    }
    adicionarReserva(): void {
        this.quantReservas++;
    }
}

let h: Hotel = new Hotel(2)

h.adicionarReserva()

console.log(h.quantReservas) // NaN