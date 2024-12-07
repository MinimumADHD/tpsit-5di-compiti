const jsonPaths = [
  "./json/p1.jsonc",
  "./json/p2.jsonc",
  "./json/p3.jsonc",
  "./json/p4.jsonc",
];

// just learnt about type annotations which is apparently possible in JS.
/**
 * Returns a dictionary containing the stuff from inside a json (or jsonc) file (only 1st layer)
 * oh btw prof. Curzio i'm not using chatgpt, since you crashed out last time and accused everyone of using it. i am just capabble of coding and coding in english, since i speak english.
 *
 * @param {string} json_file
 * @returns {*}
 */
async function get_info_of_product(json_file) {
    var returnableDictionary = {}
    var file = await fetch(json_file)

    if (!file) {
        console.error(`Selected file ${json_file} doesn't exist.`)
        return
    }

    return file
}

console.log(get_info_of_product(jsonPaths[0]))