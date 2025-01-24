import { dragElement } from '../reusable.mjs';

const window_div = document.getElementById('draggable_window_xml');
dragElement(window_div, 'window_header');

const table_body = document.getElementById('table_data');

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://raw.githubusercontent.com/MinimumADHD/tpsit-5di-compiti/refs/heads/main/xml_requester/data.xml", true);
xhr.onload = function () {
    if (xhr.status === 200) {
        var xmlDoc;
        try {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
        } catch (error) {
            console.error("Parsing fallito:", error);
            return;
        }
        // potevo anchew usare un document.InnerHTML per inserire i dati, ma forse non è il metodo più originale con il js di oggi
        // sos
        var licenses = xmlDoc.getElementsByTagName("DriversLicense");
        for (var i = 0; i < licenses.length; i++) {
            var license = licenses[i]
            var temp_data = [license.getElementsByTagName("Name")[0].textContent, license.getElementsByTagName("Address")[0].textContent, license.getElementsByTagName("Sex")[0].textContent, license.getElementsByTagName("ExpiryDate")[0].textContent]
            var new_row = document.createElement("tr")

            temp_data.forEach(function (data) {
                var cell = document.createElement("td");
                cell.textContent = data;
                new_row.appendChild(cell);
            })
            
            table_body.appendChild(new_row)
        }
    } else {
        console.error("XML non caricato:", xhr.status);
    }
};

xhr.onerror = function () {
    console.error("Errore per richiesta.");
};

xhr.send();