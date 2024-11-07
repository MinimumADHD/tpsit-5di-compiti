document.addEventListener('DOMContentLoaded', function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'info.jsonc', true);
    xhr.onload = function() {
        if (this.status === 200) {
            const prodotti = JSON.parse(this.responseText);
            creaTabella(prodotti);
        }
    };
    xhr.send();

    document.getElementById('calcola').addEventListener('click', function() {
        const percentualeRicarico = parseFloat(document.getElementById('percentualeRicarico').value);
        aggiornaTabella(percentualeRicarico);
    });
});

function creaTabella(prodotti) {
    const table = document.createElement('table');
    table.id = 'tabellaProdotti';
    const header = table.insertRow();
    header.insertCell().textContent = 'Nome';
    header.insertCell().textContent = 'Prezzo Acquisto';
    header.insertCell().textContent = 'Prezzo Vendita';
    header.insertCell().textContent = 'Guadagno';
    header.insertCell().textContent = 'Immagine';

    prodotti.forEach(prodotto => {
        const row = table.insertRow();
        row.insertCell().textContent = prodotto.nome;
        row.insertCell().textContent = prodotto.prezzo_acquisto;
        row.insertCell().textContent = '';
        row.insertCell().textContent = '';
        const imgCell = row.insertCell();
        const img = document.createElement('img');
        img.src = prodotto.immagine;
        img.alt = prodotto.nome;
        img.style.width = '50px'; // Imposta la larghezza dell'immagine
        imgCell.appendChild(img);
    });

    document.body.appendChild(table);
}

function aggiornaTabella(percentualeRicarico) {
    const table = document.getElementById('tabellaProdotti');
    if (!table) {
        alert('La tabella non è stata ancora creata.');
        return;
    }
    for (let i = 1; i < table.rows.length; i++) {
        const prezzoAcquisto = parseFloat(table.rows[i].cells[1].textContent);
        const prezzoVendita = prezzoAcquisto + (prezzoAcquisto * percentualeRicarico / 100);
        const guadagno = prezzoVendita - prezzoAcquisto;
        table.rows[i].cells[2].textContent = prezzoVendita.toFixed(2);
        table.rows[i].cells[3].textContent = guadagno.toFixed(2);
    }
}