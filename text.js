var linhas = [];
minas = [];
var jo = [];

function começar(){
    var li = document.getElementById("Linhas").value;
    var co = document.getElementById("Colunas").value;
    var bo = document.getElementById("Bombas").value;
    var minas = sorteio(bo, li, co);
    var meuJogo = jogo(li, co, minas);
    tabela(meuJogo);
    if(li > 0 && co > 0 && bo > 0) {
        return true;
    } else {
        return false;
    }
}

function click (event){
    if (event.target.textContent === "*"){
        for (element of document.querySelectorAll("span")) {
            element.setAttribute("class","");
        }
        alert("booooommmmmm Você Perdeu")
        window.location.reload();
    } else {
        event.target.childNodes[0].setAttribute("class","");
        // automatico (minas);       
    }
}

function tabela(campos) {
    var campo = document.getElementById("campo");
    for (linha of campos) {
        var tr = document.createElement("tr");
        campo.appendChild(tr);
        for(coluna of linha){
            var td = document.createElement("td");
            var span = document.createElement("span");
            span.textContent = coluna;
            span.setAttribute("class","invisible");
            td.appendChild(span)
            tr.appendChild(td)
            td.addEventListener("click",click);
        } 
    }
}

function jogo( linhas_jogo , colunas_jogo , minas) {
    for (var l = 0; l < linhas_jogo; l++) {
        linhas[l] = [];
        for (var c = 0; c < colunas_jogo; c++) {
            if (minas.map(x => JSON.stringify(x)).includes("["+l +","+c+"]")) {
                linhas[l][c] = "*";
            } else {
                linhas[l][c] = 0;
            }
        }    
    }

    for(var l = 0; l < linhas_jogo; l++) {
        for (var c = 0; c < colunas_jogo; c++) {
            if (linhas[l][c] != "*") {
                if(linhas[l][c-1] === "*")linhas[l][c]++;
                if(linhas[l][c+1] === "*")linhas[l][c]++;
                if(linhas[l-1] && linhas[l-1][c-1] === "*") linhas[l][c]++;
                if(linhas[l-1] && linhas[l-1][c] === "*")linhas[l][c]++;
                if(linhas[l-1] && linhas[l-1][c+1] === "*")linhas[l][c]++;
                if(linhas[l+1] && linhas[l+1][c-1] === "*") linhas[l][c]++;
                if(linhas[l+1] && linhas[l+1][c] === "*") linhas[l][c]++;
                if(linhas[l+1] && linhas[l+1][c+1] === "*") linhas[l][c]++;
            }
        }
    }
 return linhas;
}

function sorteio(bombas, colunas, linhas){
   
    for (var i = 0; i < bombas;i++){
        var posiçaoColunas = parseInt(Math.random() * colunas);
        var posiçaoLinhas = parseInt(Math.random() * linhas);
        minas.push([posiçaoColunas, posiçaoLinhas]);    
    }
    return minas;
}