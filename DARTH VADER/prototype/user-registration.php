<?php
require_once('connect.php');
//echo 'user registration page';
if(isset($_POST['register_submit']))
{
    $mail=$_POST['register_email'];
    $passw=$_POST['register_pw'];
    $register_query="INSERT INTO user_login VALUES('$mail','$passw','0')";
    $register_result=mysqli_query($dbc,$register_query) or die("register query not executed");
    echo 'registration sucessfull';
    mysqli_close($dbc);
    header("refresh: 0; url=http://localhost/globalshala/final/login.php");
}
?>