<?php
    header("Access-Control-Allow-Origin: *");
    $id=$_POST["id"];
    $foto=$_POST["foto"];
    $titulo=$_POST["titulo"];
    $url=$_POST["url"];
    $servidor="localhost";
    $usuario="root";
    $password="";
    $basedatos="proyectopw";
    $conexion=mysqli_connect($servidor,$usuario,$password,$basedatos);
    $consulta="insert into favoritos values('$id','$foto','$titulo','$url')";
    $respuesta=false;
    mysqli_query($conexion,$consulta);
    if(mysqli_affected_rows($conexion) > 0){
        $respuesta= true;
    }
    $salida = array('respuesta'=>$respuesta);
    print json_encode($salida);
?>