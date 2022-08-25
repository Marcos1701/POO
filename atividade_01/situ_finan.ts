class SituacaoFinanceira{
  valorCreditos: number = 0
  valorDebitos: number = 0

  saldo(){
    return this.valorCreditos - this.valorDebitos
   }
  
}

function main(){
  
  const situacao = new SituacaoFinanceira

  situacao.valorCreditos = 3000
  situacao.valorDebitos = 750

  console.log(`Saldo : ${situacao.saldo().toFixed(2)}`)

}

main()
