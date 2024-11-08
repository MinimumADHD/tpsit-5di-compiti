function get_data(url) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

        }
    }

    xhr.open("GET", url, true);
    xhr.send();
}