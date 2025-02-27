<script lang="php">
    function sayHello($name) {
        // sto seguendo alla lettera ciò che ha fatto il Sig. Davide Ferrero
        $greet = "{$name}, il server Funziona."
    }
    $server = new SoapServer("../wsdl/wsdl.wsdl")
    $server.addFunction("serverc");
    $server.handle();
</script>