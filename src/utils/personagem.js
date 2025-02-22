class Personagem{

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
  }

  onModificador(aValor){
    let modificador = (aValor - 10) / 2;
    return Math.ceil(modificador);
  }

  mod_forca() {
    return onModificador(this.pe_forca)
  }

  mod_destreza() {
    return onModificador(this.pe_destreza)
  }

  mod_constituicao() {
    return onModificador(this.pe_constituicao)
  }

  mod_inteligencia() {
    return onModificador(this.pe_inteligencia)
  }

  mod_sabedoria() {
    return onModificador(this.pe_sabedoria)
  }

  mod_carisma() {
    return onModificador(this.pe_carisma)
  }

  pe_vida(){
    return (this.pe_vidaatual + this.pe_vidatemp);
  }
  
  vida_inc(){
    
    if(this.pe_vidaatual < this.pe_vidabase)
      ++this.pe_vidaatual;

  }

  vida_inc(aValor){
    
    if(this.pe_vidaatual < this.pe_vidabase){
      
      if((this.pe_vidaatual + aValor) > this.pe_vidabase)
        this.pe_vidaatual = this.pe_vidabase;
      else
        this.pe_vidaatual = this.pe_vidaatual + aValor;

    }
    
  }

  
  vida_dec(){
    
    if(this.pe_vidatemp > 0)
      --this.pe_vidatemp;
    else
      if(this.pe_vidaatual > 0)
        --this.pe_vidaatual;

  }

  #vidadecaux(aValor){

    if((this.pe_vidaatual - aValor) < 0){
      this.pe_vidaatual = 0;
    }
    else  
      this.pe_vidaatual = (this.pe_vidaatual - aValor);

  }

  vida_dec(aValor){
    
    if(this.pe_vida() > 0){

      if(this.pe_vidatemp > 0){

        let sobra = this.pe_vidatemp - aValor;
        
        if(sobra < 0){
          this.pe_vidatemp = 0;
          this.pe_vidaatual = this.pe_vidaatual - sobra;
        }
        else
         this.#vidadecaux(aValor)

      }
      else  
        this.#vidadecaux(aValor)
  
    }
    
  }

  pe_classe(){
    return this.pe_classe + ' ' + this.pe_subclasse;
  }
  
  pe_raca(){
    return this.pe_raca + ' ' + this.pe_subraca;
  }

  pe_iniciativa(){
    return this.pe_destreza;
  }

  
}