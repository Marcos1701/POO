class Empregado {
    _salario: number = 1500
    calcularSalario(): number {
        return this._salario
    }
}
    
class Diarista extends Empregado {
    calcularSalario(): number { 
        return this._salario/30;  
    }
}
    
class Horista extends Diarista {
        calcularSalario(): number { 
            return (this._salario/30) / 24  
        }
}

let emp: Empregado = new Empregado()
console.log(`Salário empregado: R$ ${emp.calcularSalario().toFixed(3)}`);

emp = new Diarista();
console.log(`Salário Diarista: R$ ${emp.calcularSalario().toFixed(3)}`);

emp = new Horista();
console.log(`Salário Horista: R$ ${emp.calcularSalario().toFixed(3)}`);

