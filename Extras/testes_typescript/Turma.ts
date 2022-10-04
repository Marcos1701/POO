class Aluno {
    nome: String
    idade: number
    matricula: String

    constructor(nome: String, idade: number, matricula: String) {
        this.nome = nome
        this.idade = idade
        this.matricula = matricula
    }
}

class Professor {

    codigo_unico: String
    nome: String
    Idade: Number
    Materia_ministrada: Materia

    constructor(cod: String, nome: String, Idade: number, materia: Materia) {
        this.nome = nome
        this.codigo_unico = cod
        this.Idade = Idade
        this.Materia_ministrada = materia
    }

    Alterar_materia(Mat: Materia) {
        this.Materia_ministrada = Mat
    }
}

class Materia {
    cod: String
    nome: String
    Ano: String

    constructor(nome: String, Ano: String, cod: String) {
        this.cod = cod
        this.nome = nome
        this.Ano = Ano
    }

}

class Turma {

    alunos: Aluno[] = []
    Materias_cursadas: Materia[] = []
    Professores: Professor[] = []

    consultar(cod_consul: number, cod_pessoa: String) {
        if (cod_consul == 0) {
            for (let prof of this.Professores) {
                if (prof.codigo_unico == cod_pessoa) {
                    return true
                }
            }
        } else if (cod_consul == 1) {
            for (let aluno of this.alunos) {
                if (aluno.matricula == cod_pessoa) {
                    return true
                }
            }
        } else if (cod_consul == 2) {
            for (let Mat of this.Materias_cursadas) {
                if (Mat.cod == cod_pessoa) {
                    return true
                }
            }
        } else {
            console.log("Cod_consul inválido!!")
        }
        return false
    }

    Cadastrar_Aluno(Aluno: Aluno): void {

        if (!this.consultar(1, Aluno.matricula)) {
            this.alunos.push(Aluno)
        } else {
            console.log("Erro, aluno já cadastrado!!")
        }
        return
    }

    Cadastrar_prof(prof: Professor): void {

        if (!this.consultar(0, prof.codigo_unico)) {
            this.Professores.push(prof)
            this.Inserir_materia(prof.Materia_ministrada)
        } else {
            console.log("Erro, Professor já cadastrado!!")
        }
    }

    Inserir_materia(Mat: Materia): boolean {
        if (!this.consultar(2, Mat.cod)) {
            this.Materias_cursadas.push(Mat)
            return true
        }
        return false
    }

    Consultar_Dados(): void {
        console.log(`
------ Dados Gerais da Turma ------
Quantidade de Alunos: ${this.alunos.length} alunos
Quantidade de Professores: ${this.Professores.length} Professores
Quantidade de Materias: ${this.Materias_cursadas.length}
`)
    }

}

