<?php
    require_once('dbconnect.php');
    $commentid = $_GET['commentid'];
    $response = $_GET['response'];

    if($response==1)
    {
        $query = 'UPDATE TABLE comment set comment_likes=comment_likes+1 WHERE comment_id='.$commentid;
        mysqli_query($dbc,$query) or die ("user response not updated");
    }
    else
    {
        $query = 'UPDATE TABLE comment set comment_dislikes=comment_dislikes+1 WHERE comment_id='.$commentid;
        mysqli_query($dbc,$query) or die ("user response not updated");
    }
    $redirect = 'http://' . $_SERVER['PHP_HOST'] .'/'. dirname($_SERVER['PHP_SELF']) . '/threads.php';
    header('Location : '.$redirect);

?>