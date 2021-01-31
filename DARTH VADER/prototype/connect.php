<?php
    $server="localhost";
    $username="root";
    $databasepassword="";
    $database="digibadev2";

    $dbc=mysqli_connect($server,$username,$databasepassword,$database) or die("Error connecting to database");
   // echo 'database connected';
?>