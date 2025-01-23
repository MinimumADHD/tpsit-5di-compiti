import { dragElement } from '../reusable.mjs';

const windowDiv = document.getElementById('draggable_window_xml');
dragElement(windowDiv, 'window_header');

const tableBody = document.getElementById('table_data');

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
            var license = licenses[i];
            var name = license.getElementsByTagName("Name")[0].textContent;
            var address = license.getElementsByTagName("Address")[0]?.textContent;
            var sex = license.getElementsByTagName("Sex")[0].textContent;
            var expiry = license.getElementsByTagName("ExpiryDate")[0].textContent;
            var row = document.createElement('tr');
            var nameCell = document.createElement('td');
            nameCell.textContent = name;
            row.appendChild(nameCell);
            var addressCell = document.createElement('td');
            addressCell.textContent = address;
            row.appendChild(addressCell);
            var sexCell = document.createElement('td');
            sexCell.textContent = sex;
            row.appendChild(sexCell);
            var expiryCell = document.createElement('td');
            expiryCell.textContent = expiry;
            row.appendChild(expiryCell);
            tableBody.appendChild(row);
        }
    } else {
        console.error("XML non caricato:", xhr.status);
    }
};

xhr.onerror = function () {
    console.error("Errore per richiesta.");
};

xhr.send();