// Não sei se é realmente dessa forma que a restrição acontece, mas fiz com base no que entendi da propria
// documentação do typescript...

let x: string
x = null // Erro -> O tipo 'null' não pode ser atribuído ao tipo 'string'
x = undefined //Erro -> O tipo 'undefined' não pode ser atribuído ao tipo 'string'.
