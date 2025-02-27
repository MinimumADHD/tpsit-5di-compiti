<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script lang="php">
        $wsdl_url = "../wsdl/";
        if (isset($_POST['name'])) {
            if ($_POST['name'] != null) {
                $client = new SoapClient($wsdl_url);
                print_r($client.sayHello(htmlentities($_POST['name'])));
            }
        }
    </script>
</body>

</html>