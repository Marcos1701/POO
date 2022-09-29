class Radio {
    volume: number;
    constructor(volume: number) {
        this.volume = volume;
    }
}

let r: Radio = new Radio();//o typescript "chia" e pede que mande um inicializador
r.volume = 10;

console.log(r.volume)
