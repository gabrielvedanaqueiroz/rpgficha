

export function ocultarBarras(){
  let topo    = document.getElementById("router-header");
  let rodape  = document.getElementById("router-footer");

  if(topo !== null)
    topo.style.display = "none";
    
  if(rodape !== null)
    rodape.style.display = "none";
}

export function exibirBarras(){
  let topo    = document.getElementById("router-header");
  let rodape  = document.getElementById("router-footer");

  if(topo !== null)
    topo.style.display = "flex";
    
  if(rodape !== null)
    rodape.style.display = "flex";
}