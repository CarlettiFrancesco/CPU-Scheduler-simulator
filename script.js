let p = [];
let at = [];
let bt = [];

function add() {
   let nome = document.getElementById("nome").value;
   let arrivo = document.getElementById("arrivo").value;
   let burst = document.getElementById("burst").value;

   if (nome && arrivo && burst) {
      p.push(nome);
      at.push(arrivo);
      bt.push(burst);

      document.getElementById("nome").value = "";
      document.getElementById("arrivo").value = "";
      document.getElementById("burst").value = "";
   }
}

function reset() {
   document.getElementById("output").style.display = "none";

   let tableEl = document.getElementById("idTable");
   let oldTBodyEl = tableEl.getElementsByTagName('tbody')[0];
   let newTBodyEl = document.createElement('tbody');
   tableEl.replaceChild(newTBodyEl, oldTBodyEl);
}
function start() {
    let processiPerGantt = [];
    for (let i = 0; i < p.length; i++) {
        processiPerGantt.push({
            nome: p[i],
            arrivo: parseInt(at[i]),
            burst: parseInt(bt[i])
        });
    }

    processiPerGantt.sort((a, b) => {
        if (a.arrivo !== b.arrivo) return a.arrivo - b.arrivo;
        return a.burst - b.burst;
    });

    let tableEl = document.getElementById("idTable");
    let oldTBodyEl = tableEl.getElementsByTagName('tbody')[0];
    let newTBodyEl = document.createElement('tbody');

    for (let i = 0; i < p.length; i++) {
        const trEl = newTBodyEl.insertRow();

        trEl.insertCell().appendChild(document.createTextNode(p[i]));  
        trEl.insertCell().appendChild(document.createTextNode(bt[i])); 
        trEl.insertCell().appendChild(document.createTextNode(at[i])); 
    }

    tableEl.replaceChild(newTBodyEl, oldTBodyEl);

    document.getElementById("output").style.display = "block";
    disegnaGantt(processiPerGantt);
}

function disegnaGantt(listaOrdinata) {
    let ganttContainer = document.querySelector("#output .progress");
    ganttContainer.innerHTML = "";

    let totalBurst = 0;
    listaOrdinata.forEach(proc => totalBurst += proc.burst);

    const colors = ["bg-success", "bg-info", "bg-warning", "bg-danger", "bg-primary"];

    listaOrdinata.forEach((proc, i) => {
        let width = (proc.burst / totalBurst) * 100;
        
        let bar = document.createElement("div");
        bar.className = `progress-bar ${colors[i % colors.length]}`;
        bar.style.width = width + "%";
        bar.style.height = "100%";
        bar.innerHTML = proc.nome;
        
        ganttContainer.appendChild(bar);
    });
}