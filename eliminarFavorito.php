<?php
    header("Access-Control-Allow-Origin: *");
    $id=$_POST["id"];
    $servidor="localhost";
    $usuario="root";
    $password="";
    $basedatos="proyectopw";
    $conexion=mysqli_connect($servidor,$usuario,$password,$basedatos);
    $consulta="delete from favoritos where id='$id'";
    $respuesta=false;
    mysqli_query($conexion,$consulta);
    if(mysqli_affected_rows($conexion) > 0){
        $respuesta= true;
    }
    $salida = array('respuesta'=>$respuesta);
    print json_encode($salida);
?>