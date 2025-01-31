var xml_url = "https://raw.githubusercontent.com/MinimumADHD/tpsit-5di-compiti/refs/heads/main/xml_dropdown_convertion/eurofxref-daily.xml";
// const proxy_url = "https://cors-anywhere.herokuapp.com/";
// const xml_url: string = proxy_url + "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
var drop_down_list = document.getElementById("currencies");
var output_currency_value = document.getElementById("output_currency_value");
var currency_input = document.getElementById("currency_input");
var OurData = /** @class */ (function () {
    function OurData(currency, rate) {
        this.currency_name = currency;
        this.currency_rate = rate;
    }
    return OurData;
}());
function getXmlData(url) {
    var returnable_array = [];
    return fetch(url)
        .then(function (response) { return response.text(); })
        .then(function (text) { return new window.DOMParser().parseFromString(text, "text/xml"); })
        .then(function (xml_data) {
        var cubes = xml_data.querySelectorAll("Cube[currency]");
        cubes.forEach(function (i) {
            var currency = i.getAttribute("currency");
            var rate = i.getAttribute("rate");
            if (currency && rate) {
                returnable_array.push(new OurData(currency, parseFloat(rate)));
            }
        });
        return returnable_array;
    })
        .catch(function (error) {
        console.error("Error fetching XML data:", error);
        return [];
    });
}
var rates_array = [];
getXmlData(xml_url).then(function (data) {
    data.forEach(function (entry) {
        var option = document.createElement("option");
        option.value = entry.currency_name;
        option.textContent = "".concat(entry.currency_name);
        rates_array.push(entry.currency_rate);
        drop_down_list.appendChild(option);
    });
});
function onSelect() {
    var selected = drop_down_list.value;
    var input_value = parseFloat(currency_input.value);
    if (!isNaN(input_value)) {
        for (var i = 0; i < rates_array.length; i++) {
            if (drop_down_list.options[i].value == drop_down_list.value) {
                output_currency_value.textContent = (input_value * rates_array[i]).toString();
                break;
            }
        }
    }
    else {
        output_currency_value.textContent = "Invalid input";
    }
}
drop_down_list.addEventListener("change", onSelect);
currency_input.addEventListener("change", onSelect);
