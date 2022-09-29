class Radio {
    volume: number;
    constructor(volume: number) {
        this.volume = volume;
    }
}

let r: Radio = new Radio(1);
r.volume = 10;

console.log(r.volume)