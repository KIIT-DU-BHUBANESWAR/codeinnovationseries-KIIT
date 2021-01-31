<?php
    header('refresh : 3; url=http://localhost/globalshala/final/profile.php');
    require_once('connect.php');

    if(isset($_GET['submit']))
    {
        $email=$_GET['mail'];
        $skillcode=$_GET['skillcode'];
        $score=$_GET['test_score'];

        $score_query="INSERT INTO user_achievements VALUES('$email','$skillcode',NOW(),,'$score')";
        mysqli_query($dbc,$score_query) or die("query not executed");
        echo 'score stored';
        mysqli_close($dbc);
        header('refresh : 3; url=http://localhost/globalshala/final/profile.php');
    }
?>