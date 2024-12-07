const jsonPaths = [
    "https://raw.githubusercontent.com/MinimumADHD/tpsit-5di-compiti/refs/heads/main/ecommerce-2/json/p1.json",
    "https://raw.githubusercontent.com/MinimumADHD/tpsit-5di-compiti/refs/heads/main/ecommerce-2/json/p2.json",
    "https://raw.githubusercontent.com/MinimumADHD/tpsit-5di-compiti/refs/heads/main/ecommerce-2/json/p3.json",
    "https://raw.githubusercontent.com/MinimumADHD/tpsit-5di-compiti/refs/heads/main/ecommerce-2/json/p4.json",
]

const percInput = document.getElementById("inputPercentage")
const confirmButton = document.getElementById("confirmButton")

const rows = [
    document.getElementById("p1"),
    document.getElementById("p2"),
    document.getElementById("p3"),
    document.getElementById("p4")
]

/**
 * Fetches data from a JSON file and returns a dictionary with all key-value pairs as strings.
 *
 * @param {string} json_file
 * @returns {Promise<Object>}
 */
async function get_info_of_product(json_file) {
    const returnableDictionary = {}
    const response = await fetch(json_file)

    if (!response.ok) {
        throw new Error("ERROR READING GIVEN FILE: " + json_file)
    }

    const data = await response.json()
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            returnableDictionary[key] = String(data[key])
        }
    }
    return returnableDictionary
}

function on_page_load() {
    for (var i = 0; i <= rows.length(); i++){
        rows[i] = (async () => {
            await get_info_of_product(jsonPaths[i])
        })()
    }
}

on_page_load()

/*
(async () => {
    const productInfo = await get_info_of_product(jsonPaths[0])
    console.log(productInfo["product"])
    console.log(productInfo["price"])
    console.log(productInfo["img"])
})()*/
// JUST TESTING SOME STUFF OUT....