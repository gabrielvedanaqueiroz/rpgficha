export default class Personagem{

  constructor(
    pe_id,
    pe_nome,
    pe_subclasse,
    pe_classe,
    pe_raca,
    pe_subraca,
    pe_nivel,
    pe_antecedente,
    pe_tendencia,
    pe_vidabase,
    pe_vidaatual,
    pe_vidatemp,
    pe_experiencia,
    pe_bproficiencia,
    pe_forca,
    pe_destreza,
    pe_constituicao,
    pe_inteligencia,
    pe_sabedoria,
    pe_carisma,
    pe_cabase,
    pe_catotal,
    pe_movimento,
    pe_idclasse, 
    pe_idraca,
  ){
    this.pe_id = pe_id;
    this.pe_nome = pe_nome;
    this.pe_subclasse = pe_subclasse;
    this.pe_classe = pe_classe;
    this.pe_raca = pe_raca;
    this.pe_subraca = pe_subraca;
    this.pe_nivel = pe_nivel;
    this.pe_antecedente = pe_antecedente;
    this.pe_tendencia = pe_tendencia;
    this.pe_vidabase = pe_vidabase;
    this.pe_vidaatual = pe_vidaatual;
    this.pe_vidatemp = pe_vidatemp;
    this.pe_experiencia = pe_experiencia;
    this.pe_bproficiencia = pe_bproficiencia;
    this.pe_forca = pe_forca;
    this.pe_destreza = pe_destreza;
    this.pe_constituicao = pe_constituicao;
    this.pe_inteligencia = pe_inteligencia;
    this.pe_sabedoria = pe_sabedoria;
    this.pe_carisma = pe_carisma;
    this.pe_cabase = pe_cabase;
    this.pe_catotal = pe_catotal;
    this.pe_movimento = pe_movimento;
    this.pe_idclasse = pe_idclasse;
    this.pe_idraca = pe_idraca;

  }

  #onModificador(aValor){
    let modificador = (aValor - 10) / 2;
    return Math.ceil(modificador);
  }

  getModForca() {
    return this.#onModificador(this.pe_forca)
  }

  getModDestreza() {
    return this.#onModificador(this.pe_destreza)
  }

  getModConstituicao() {
    return this.#onModificador(this.pe_constituicao)
  }

  getModInteligencia() {
    return this.#onModificador(this.pe_inteligencia)
  }

  getModSabedoria() {
    return this.#onModificador(this.pe_sabedoria)
  }

  getModCarisma() {
    return this.#onModificador(this.pe_carisma)
  }

  getVida(){
    return (this.pe_vidaatual + this.pe_vidatemp);
  }
  
  // vida_inc(){
    
  //   if(this.pe_vidaatual < this.pe_vidabase)
  //     ++this.pe_vidaatual;

  //   return this.pe_vidaatual;
  // }

  // vida_incValor(aValor){
    
  //   if(this.pe_vidaatual < this.pe_vidabase){
      
  //     this.pe_vidaatual = this.pe_vidaatual + aValor;

  //     if(this.pe_vidaatual > this.pe_vidabase)
  //       this.pe_vidaatual = this.pe_vidabase;

  //   }

  //   return this.pe_vidaatual;
    
  // }
  
  // vida_dec(){
    
  //   if(this.pe_vidatemp > 0)
  //     --this.pe_vidatemp;
  //   else
  //     if(this.pe_vidaatual > 0)
  //       --this.pe_vidaatual;

  // }

  vida_decValor(aValor){
    
    if(this.getVida() > 0){

      if(this.pe_vidatemp > 0){

        let sobra = this.pe_vidatemp - aValor;
        this.pe_vidatemp = this.pe_vidatemp - aValor;
        
        if(sobra <= 0){
          this.pe_vidatemp = 0;
          this.pe_vidaatual = this.pe_vidaatual - (sobra * -1);
        }

      }
      else  {
        this.pe_vidaatual = (this.pe_vidaatual - aValor);
    
        if((this.pe_vidaatual - aValor) < 0)
          this.pe_vidaatual = 0;  
      }
  
    }
    
  }

  getClasse(){
    return this.pe_classe + ' ' + this.pe_subclasse;
  }
  
  getRaca(){
    return this.pe_raca + ' ' + this.pe_subraca;
  }

  getIniciativa(){
    return this.getModDestreza();
  }

  //metodo para mostrar uma imagem dependendo da classe do personagem
  getImagem(){
    let url = '';
    switch (this.pe_idclasse) {
      case '1':
        url = '';
        break;
    
      default:
        url = '';
        break;
    }
    return url;
  }
  
}