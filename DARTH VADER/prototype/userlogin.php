<?php
require('connect.php');
session_start();
echo 'login page';
 if(isset($_POST['login_submit']))
 {
     $email=$_POST['login_email'];
     $pass=$_POST['login_pw'];

     $login_query="SELECT * FROM user_login WHERE `email`='$email' AND `password`='$pass'";
     $login_result=mysqli_query($dbc,$login_query) or die("login query not executed");
     if(mysqli_num_rows($login_result)>0)
     {
         echo 'login sucessfull';
         $_SESSION['user_profile']=$email;
         //header('refresh: 0; url=http://localhost/globalshala/final/profile.php');
         header('refresh: 0; url=http://localhost/incubate/prototype/profile.php');
     }
     else
     {
         echo 'login unsucessfull';
        // header('refresh: 0; url=http://localhost/globalshala/final/login.php');
        header('refresh: 0; url=http://localhost/incubate/prototype/login.php');
     }
 }

?>