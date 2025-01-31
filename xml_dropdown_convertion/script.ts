const xml_url: string = "https://raw.githubusercontent.com/MinimumADHD/tpsit-5di-compiti/refs/heads/main/xml_dropdown_convertion/eurofxref-daily.xml";
const drop_down_list = document.getElementById("currencies") as HTMLSelectElement;
const output_currency_value = document.getElementById("output_currency_value") as HTMLParagraphElement
const currency_input = document.getElementById("currency_input") as HTMLInputElement

class OurData {
    currency_name: string;
    currency_rate: number;

    constructor(currency: string, rate: number) {
        this.currency_name = currency;
        this.currency_rate = rate;
    }
}

function getXmlData(url: string): Promise<OurData[]> {
    let returnable_array: OurData[] = [];

    return fetch(url)
        .then(response => response.text())
        .then(text => new window.DOMParser().parseFromString(text, "text/xml"))
        .then(xml_data => {
            let cubes = xml_data.querySelectorAll("Cube[currency]");
            cubes.forEach(i => {
                let currency = i.getAttribute("currency");
                let rate = i.getAttribute("rate");
                if (currency && rate) {
                    returnable_array.push(new OurData(currency, parseFloat(rate)));
                }
            });
            return returnable_array;
        })
        .catch(error => {
            console.error("Error fetching XML data:", error);
            return [];
        });
}

let rates_array: number[] = []

getXmlData(xml_url).then(data => {
    data.forEach(entry => {
        let option = document.createElement("option");
        option.value = entry.currency_name;
        option.textContent = `${entry.currency_name}`;
        rates_array.push(entry.currency_rate)
        drop_down_list.appendChild(option);
    });
});

function onSelect() {
    var selected: string = drop_down_list.value;
    let input_value = parseFloat(currency_input.value);
    if (!isNaN(input_value)) {
        for (let i = 0; i < rates_array.length; i++) {
            if (drop_down_list.options[i].value == drop_down_list.value) {
                output_currency_value.textContent = (input_value * rates_array[i]).toString();
                break;
            }
        }
    } else {
        output_currency_value.textContent = "Invalid input";
    }
}

drop_down_list.addEventListener("change", onSelect)
currency_input.addEventListener("change", onSelect)