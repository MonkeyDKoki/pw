<?php
    header("Access-Control-Allow-Origin: *");
    $id=$_POST["id"];
    $servidor="localhost";
    $usuario="root";
    $password="";
    $basedatos="proyectopw";
    $conexion=mysqli_connect($servidor,$usuario,$password,$basedatos);
    $consulta="select id from favoritos where id='$id'";
    $resultado=mysqli_query($conexion,$consulta);
    $respuesta= false;
    if(mysqli_num_rows($resultado) > 0)
    {
        $respuesta= true;
    }
    $salida = array('respuesta'=>$respuesta);
    print json_encode($salida);
?>