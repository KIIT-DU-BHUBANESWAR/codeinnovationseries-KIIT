<?php

session_start();

if (isset($_SESSION['user_profile'])) {
    session_destroy();
    echo "logout sucessful";  
   // header('refresh: 0 ; url=http://localhost/globalshala/final/index.html'); 
    header('refresh: 0 ; url=http://localhost/incubate/prototype/index.html');     // <----------------link to landing page

} else {
    echo "<script>location.href='./login.php'</script>";
}
