import { jXPNivel } from ".";

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
    pe_vidadado,
    pe_vidadadousado,
    pe_tcmfalha1,
    pe_tcmfalha2,
    pe_tcmfalha3,
    pe_tcmsucesso1,
    pe_tcmsucesso2,
    pe_tcmsucesso3,
    pe_sgforca,
    pe_sgdestreza,
    pe_sgconstituicao,
    pe_sginteligencia,
    pe_sgsabedoria,
    pe_sgcarisma,
    pe_proacrobacia,
    pe_proarcanismo,
    pe_proatletismo,
    pe_proatuacao,
    pe_problefar,
    pe_profurtividade,
    pe_prohistoria,
    pe_prointimidacao,
    pe_prointuicao,
    pe_proinvestigacao,
    pe_prolidaranimais,
    pe_promedicina,
    pe_pronatureza,
    pe_propercepcao,
    pe_proprestidigitacao,
    pe_prosobrevivencia,
    pe_proreligiao,
    pe_propersusao,
    pe_idhabilidadeconjuracao,
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
    this.pe_vidadado = pe_vidadado;
    this.pe_vidadadousado = pe_vidadadousado;
    this.pe_tcmfalha1 = pe_tcmfalha1;
    this.pe_tcmfalha2 = pe_tcmfalha2;
    this.pe_tcmfalha3 = pe_tcmfalha3;
    this.pe_tcmsucesso1 = pe_tcmsucesso1;
    this.pe_tcmsucesso2 = pe_tcmsucesso2;
    this.pe_tcmsucesso3 = pe_tcmsucesso3;
    this.pe_sgforca = pe_sgforca;
    this.pe_sgdestreza = pe_sgdestreza;
    this.pe_sgconstituicao = pe_sgconstituicao;
    this.pe_sginteligencia = pe_sginteligencia;
    this.pe_sgsabedoria = pe_sgsabedoria;
    this.pe_sgcarisma = pe_sgcarisma;
    this.pe_proacrobacia = pe_proacrobacia;
    this.pe_proarcanismo = pe_proarcanismo;
    this.pe_proatletismo = pe_proatletismo;
    this.pe_proatuacao = pe_proatuacao;
    this.pe_problefar = pe_problefar;
    this.pe_profurtividade = pe_profurtividade;
    this.pe_prohistoria = pe_prohistoria;
    this.pe_prointimidacao = pe_prointimidacao;
    this.pe_prointuicao = pe_prointuicao;
    this.pe_proinvestigacao = pe_proinvestigacao;
    this.pe_prolidaranimais = pe_prolidaranimais;
    this.pe_promedicina = pe_promedicina;
    this.pe_pronatureza = pe_pronatureza;
    this.pe_propercepcao = pe_propercepcao;
    this.pe_proprestidigitacao = pe_proprestidigitacao;
    this.pe_prosobrevivencia = pe_prosobrevivencia;
    this.pe_proreligiao = pe_proreligiao;
    this.pe_propersusao = pe_propersusao;
    this.pe_idhabilidadeconjuracao = pe_idhabilidadeconjuracao;
  }
  
  podeUpar(){
    let xp  = jXPNivel[this.pe_nivel].xp;
    let nv  = jXPNivel[this.pe_nivel].nv;
       
    return (this.pe_experiencia >= xp) && (this.pe_nivel < nv);
  }

  #onModificador(aValor){
    let modificador = (aValor - 10) / 2;
    return Math.floor(modificador);
  }

  getCATotal(){
    return this.pe_cabase;
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

  getSGForca() {
    return this.#onModificador(this.pe_forca) + (this.pe_sgforca?this.pe_bproficiencia:0);
  }

  getSGDestreza() {
    return this.#onModificador(this.pe_destreza) + (this.pe_sgdestreza?this.pe_bproficiencia:0);
  }

  getSGConstituicao() {
    return this.#onModificador(this.pe_constituicao) + (this.pe_sgconstituicao?this.pe_bproficiencia:0);
  }

  getSGInteligencia() {
    return this.#onModificador(this.pe_inteligencia) + (this.pe_sginteligencia?this.pe_bproficiencia:0);
  }

  getSGSabedoria() {
    return this.#onModificador(this.pe_sabedoria) + (this.pe_sgsabedoria?this.pe_bproficiencia:0);
  }

  getSGCarisma() {
    return this.#onModificador(this.pe_carisma) + (this.pe_sgcarisma?this.pe_bproficiencia:0);
  }

  getProForca(aProficiente) {
    return this.#onModificador(this.pe_forca) + (aProficiente?this.pe_bproficiencia:0);
  }

  getProDestreza(aProficiente) {
    return this.#onModificador(this.pe_destreza) + (aProficiente?this.pe_bproficiencia:0);
  }

  getProConstituicao(aProficiente) {
    return this.#onModificador(this.pe_constituicao) + (aProficiente?this.pe_bproficiencia:0);
  }

  getProInteligencia(aProficiente) {
    return this.#onModificador(this.pe_inteligencia) + (aProficiente?this.pe_bproficiencia:0);
  }

  getProSabedoria(aProficiente) {
    return this.#onModificador(this.pe_sabedoria) + (aProficiente?this.pe_bproficiencia:0);
  }

  getProCarisma(aProficiente) {
    return this.#onModificador(this.pe_carisma) + (aProficiente?this.pe_bproficiencia:0);
  }

  getVidaDadoMax(){
    return this.pe_nivel + this.pe_vidadado;
  }
  
  getClasse(){
    let aux = this.pe_classe + ' ' + this.pe_subclasse;
    // aux = aux.slice(0, 23);
    return aux;
  }
  
  getRaca(){
    let aux = this.pe_raca + ' ' + this.pe_subraca;
    // aux = aux.slice(0, 20);
    return aux;
  }

  getIniciativa(){
    return this.getModDestreza();
  }

  #getSelModificadorMagia(){

    let modificador = 0;
    switch (this.pe_idhabilidadeconjuracao) {
      case 6:
        modificador = this.getModCarisma();
      break;
      case 5:
        modificador = this.getModSabedoria();
      break;
      case 4:
        modificador = this.getModInteligencia();
      break;
    }

    return modificador;

  }

  getHabilidadeConjuracao(){

    let habilidade = '';
    switch (this.pe_idhabilidadeconjuracao) {
      case 6:
        habilidade = 'Carisma';
      break;
      case 5:
        habilidade = 'Sabedoria';
      break;
      case 4:
        habilidade = 'Inteligência';
      break;
    }

    return habilidade;

  }

  getCDMagia(){
    return  8 + this.pe_bproficiencia + this.#getSelModificadorMagia();
  }

  getBonusMagia(){
    return  this.pe_bproficiencia + this.#getSelModificadorMagia();
  }

  getPercepcaoPassiva(){
    return 10 + this.#onModificador(this.pe_sabedoria) + (this.pe_propercepcao? this.pe_bproficiencia: 0); 
  }
  //metodo para mostrar uma imagem dependendo da classe do personagem
  getImagem(){
    let url = '';
    switch (this.pe_idclasse) {
      case 1:
        url = require('../res/cl-barbaro.svg').default;
      break;
      case 2:
        url = require('../res/cl-bardo.svg').default;
      break;
      case 3:
        url = require('../res/cl-bruxo.svg').default;
      break;
      case 4:
        url = require('../res/cl-clerigo.svg').default;
      break;
      case 5:
        url = require('../res/cl-druida.svg').default;
      break;
      case 6:
        url = require('../res/cl-feiticeiro.svg').default;
      break;
      case 7:
        url = require('../res/cl-guerreiro.svg').default;
      break;
      case 8:
        url = require('../res/cl-ladino.svg').default;
      break;
      case 9:
        url = require('../res/cl-mago.svg').default;
      break;
      case 10:
        url = require('../res/cl-monge.svg').default;
      break;
      case 11:
        url = require('../res/cl-paladino.svg').default;
      break;
      default:
        url = require('../res/cl-guardiao.svg').default; 
        break;
    }
    return url;
  }
  
  
}