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
    // 1. Creiamo una copia dei dati per il calcolo del Gantt (SJF)
    let processiPerGantt = [];
    for (let i = 0; i < p.length; i++) {
        processiPerGantt.push({
            nome: p[i],
            arrivo: parseInt(at[i]),
            burst: parseInt(bt[i])
        });
    }

    // 2. Ordiniamo la copia per il Diagramma di Gantt (SJF)
    processiPerGantt.sort((a, b) => {
        if (a.arrivo !== b.arrivo) return a.arrivo - b.arrivo;
        return a.burst - b.burst; // Se arrivano insieme, il più corto va prima
    });

    // 3. Popoliamo la tabella (mantenendo l'ordine di inserimento p1, p2, p3...)
    let tableEl = document.getElementById("idTable");
    let oldTBodyEl = tableEl.getElementsByTagName('tbody')[0];
    let newTBodyEl = document.createElement('tbody');

    for (let i = 0; i < p.length; i++) {
        const trEl = newTBodyEl.insertRow();
        
        // Solo 3 colonne come richiesto
        trEl.insertCell().appendChild(document.createTextNode(p[i]));  // Processi
        trEl.insertCell().appendChild(document.createTextNode(bt[i])); // Tempo di Burst
        trEl.insertCell().appendChild(document.createTextNode(at[i])); // Tempo di Arrivo
    }

    tableEl.replaceChild(newTBodyEl, oldTBodyEl);

    // 4. Mostriamo e disegniamo la progress bar
    document.getElementById("output").style.display = "block";
    disegnaGantt(processiPerGantt);
}

function disegnaGantt(listaOrdinata) {
    let ganttContainer = document.querySelector("#output .progress");
    ganttContainer.innerHTML = ""; // Svuota la barra precedente

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