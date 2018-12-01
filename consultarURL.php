<?php
    header("Access-Control-Allow-Origin: *");
    $id=$_POST["id"];
    $servidor="localhost";
    $usuario="root";
    $password="";
    $basedatos="proyectopw";
    $conexion=mysqli_connect($servidor,$usuario,$password,$basedatos);
    $consulta="select url from favoritos where id='$id'";
    $resultado=mysqli_query($conexion,$consulta);
    $salida= array();
    if(mysqli_num_rows($resultado) > 0)
    {
        while($registro=mysqli_fetch_array($resultado))
        {
            //$salida[] =$registro;
            array_push($salida,$registro);
            //echo("hola");
        }
    }
   print json_encode($salida);
?>