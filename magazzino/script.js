const url = "https://raw.githubusercontent.com/MinimumADHD/tpsit-5di-compiti/refs/heads/main/magazzino/info.jsonc"

const table = document.getElementById("data-json-table")
const input_text = document.getElementById("input_percentage_recharge")
const input_btn = document.getElementById("confirm_btn")

function onSubmit() {
    console.log("onsubmit-triggered")
    var xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    xhr.onload = function() {
        if (xhr.status == 200) {
            try {
                var data = JSON.parse(xhr.responseText)
                onReceiveData(data)
            } catch (e) {
                console.log("Error parsing JSONC: " + e.message)
            }
        } else {
            console.log("Error, non sono riuscito a caricare il JSONC: " + xhr.status)
        }
    }
    xhr.send()
}

function onReceiveData(data_array) {
    console.log("onReceiveData-triggered")  
    // console.log(data_array)
    table.innerHTML = `
        <tr>
            <th>Prodotto</th>
            <th>Prezzo</th>
            <th>Prezzo Finale</th>
            <th>Immagine</th>
        </tr>
    `;
    
    const percentage = parseFloat(input_text.value) / 100;

    data_array.forEach(item => {
        const finalPrice = item.prezzo_acquisto + (item.prezzo_acquisto * percentage);
        const row = `
            <tr>
                <td>${item.nome}</td>
                <td>${item.prezzo_acquisto.toFixed(2)}</td>
                <td>${finalPrice.toFixed(2)}</td>
                <td><img src="${item.immagine}" alt="${item.nome}" width="50"></td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

input_btn.addEventListener("click", onSubmit)