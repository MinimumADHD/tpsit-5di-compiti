<!DOCTYPE html>
<html lang="en" class="min-w-full min-h-full w-full h-full font-jetbrains">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="./src/output.css">
  <title>Compiti TPSIT 5Dinf - Cappelluti - Pagina Principale</title>
</head>

<body class="min-w-full min-h-full w-full h-full flex justify-center items-center align-middle font-jetbrains bg-berryshake-dimpurple text-berryshake-white">

  <table class="flex flex-col justify-center items-center align-middle bg-berryshake-dimpink p-3 rounded-md shadow-md">
    <?php
    $directory = dirname(__FILE__);
    foreach (scandir($directory) as $key => $value) {
      if ($value == "." || $value == "..") {
        continue;
      }

      $file_path = $directory . DIRECTORY_SEPARATOR . $value;
      if (is_dir($value) && file_exists($file_path . DIRECTORY_SEPARATOR . "index.php") || file_exists($file_path . DIRECTORY_SEPARATOR . "index.htm") || file_exists($file_path . DIRECTORY_SEPARATOR . "index.html")) {
        echo "<tr><td class='border-2 p-3 content-center align-middle'><a href='{$value}' class='animate-pulse'>./{$value}/</a></td></tr>";
      };
    }
    ?>
  </table>

</body>

</html>