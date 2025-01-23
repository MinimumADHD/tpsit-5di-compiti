import { dragElement } from '../reusable.mjs';

const windowDiv = document.getElementById('draggable_window_xml');
dragElement(windowDiv, 'window_header');

const tableBody = document.getElementById('table_data');

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://minimumadhd.github.io/tpsit-5di-compiti/xml_requester/data.xml", true);
xhr.responseType = "document";

xhr.onload = function () {
    if (xhr.status === 200) {
        var xmlDoc = xhr.responseXML;
        var licenses = xmlDoc.getElementsByTagName("DriversLicense");
        for (var i = 0; i < licenses.length; i++) {
            var license = licenses[i];
            var name = license.getElementsByTagName("Name")[0].textContent.trim();
            var address = license.getElementsByTagName("Address")[0].textContent.trim();
            var sex = license.getElementsByTagName("Sex")[0].textContent.trim();
            var expiry = license.getElementsByTagName("ExpiryDate")[0].textContent.trim();
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
        console.error("Failed to load XML file. Status:", xhr.status);
    }
};

xhr.onerror = function () {
    console.error("There was an error while making the request.");
};

xhr.send();
