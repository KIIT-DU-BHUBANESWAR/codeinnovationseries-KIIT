<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
       define('BADGE_UPLOADPATH','badges/');
       if(isset($_POST['submit']))
        {
            
            require('connect.php');
            $name=$_POST['skillname'];
            $code=$_POST['code'];
            $image=$_FILES['screenshot']['name'];
            $score=$_POST['score'];
            $imagesource=$_FILES['screenshot']['tmp_name'];
            $target_badge=BADGE_UPLOADPATH.$image;
            
            if(!move_uploaded_file($imagesource,$target_badge))
            {
                echo "badge not moved to destination folder";
                header('refresh : 5; url=file:///C:/xampp/htdocs/globalshala/final/edit-profile.html');                        
            }
            
            $imagequery="INSERT INTO badges VALUES('$name','$code','$image','$score')";
            $imageresult=mysqli_query($dbc,$imagequery) or die("badge query not executed");
            echo 'data uploaded';
            mysqli_close($dbc);
        }

    ?>
    
    
    
    <form  action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST"  enctype="multipart/form-data">
        <input type="hidden" value="320000">
        NAME : &nbsp
        <input type="text"  name="skillname" >
        <br> <br>
        skill code<input type="text" name="code" >
        <br> <br>
        SCORE : &nbsp
        <input type="number"   name="score">
        <br> <br>
        SCREEN-SHOT :&nbsp<input type="file" name="screenshot">
        <br> <br>
        <input type="submit" value="add" name="submit">
    </form>
</body>
</html>

