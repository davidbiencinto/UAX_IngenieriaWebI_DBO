<?php
$numero1 = $_POST['numero1'];
$numero2 = $_POST['numero2'];

$resultado = $numero1 + $numero2;
?>

<!DOCTYPE html>
<html>
<head>
    <title>Resultado</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <div class="contenedor">
    <h1>Resultado de la Suma</h1>
    
    <p><?php echo $numero1; ?> + <?php echo $numero2; ?> = <?php echo $resultado; ?></p>
    
    <a href="ejercicio_f.html" class="volver"><button>Volver</button></a>
    </div>
</body>
</html>
