<?php

$uname = "admin@admin.com";       // <---------- static correct username (here email is username)
$pwd = "admin";         // <---------- static correct password

session_start();

if (isset($_SESSION['uname'])) {
    echo "<h1>Welcome", $_SESSION['úname'], "</h1>";
    echo "<a href='profile.php'>Profile Page</a><br>";      // <--------------- link to profile page
    echo "<a href='logout.php'><input type=button value=logout name=logout></a>";
} else {
    if ($_POST['uname'] == $uname && $_POST['pwd'] == $pwd) {
        $_SESSION['uname'] = $uname;
        echo "<script>location.href='session.php'</script>";
    } else {
        echo "<script>alert('Email and Password Mismatch !')</script>";
        echo "<script>loaction.href='login.php'</script>";
    }
}
