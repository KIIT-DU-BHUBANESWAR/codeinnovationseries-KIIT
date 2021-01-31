<?php
   include('connect.php');
   session_start();
   $email=$_SESSION['user_profile'];
   $query_user="SELECT * FROM user_details where `user_email`='$email'";
   $result=mysqli_query($dbc,$query_user) or die("user details cannot be fetched");
   $row=mysqli_fetch_array($result);
   
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile</title>
    <link rel="icon" href="../divyansh/assets/images/logo.png" />
    <link rel="stylesheet" type="text/css" href="./profile.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="./index.html" style="font-weight: bold;color:#2c3e50 ;font-size: 35px;border: 0px; padding: 0px 0px 0px 0px;">DigiBadge</a></li>
                <li><a href="./index.html">HOME</a></li>
                <li><a href="#">ABOUT</a></li>
                <li><a href="./editprofile.php"  class="active">EDIT</a></li>
                <li><a href="test.php">TEST</a></li>
                <li style="float: right;padding-top: 20px;"><a href="./logout.php">LOGOUT</a></li>
            </ul>
        </nav>      
        </div>
    </header>
    <main class="main">
        <div class="left">
            <p style="padding-left:50px;"><?php echo 'Welcome '.$row['firstname']; ?></p>
            <div class="left-content">
                <h2 style="margin-bottom: 0px;">BASIC</h2>
                <hr style="height: 2px; background-color: blue; "><br>
                <?php                   
                    echo '<b>NAME :  </b> <p>'.$row['firstname'] . $row['lastname'].'</p> <br><br>';
                    echo '<b>MOTO :</b> <p>'.$row['moto'].'</p> <br> <br>';
                    echo '<b>PROFESSION :</b> <p>'.$row['profession'].'</p>  <br><br>';
                    echo '<b>INSTITUTE :</b>'.$row['organisation'].'</p> <br><br><br>';
                    echo '<h2 style="margin-bottom: 0px;">LINKS</h2>';
                    echo '<hr style="height: 2px; background-color: blue; "><br>';
                    echo '<b>GITHUB : </b>  <a href="'.$row['github'].'">github</a><br><br>';
                    echo '<b>TWITTER : </b><a href="'.$row['twitter'].'">twitter</a><br><br>';
                    echo '<b>LINKEDIN : </b><a href="'.$row['linkedin'].'">linkedin</a><br><br>';
                    echo '<b>PORTFOLIO : </b><a href="'.$row['portfolio'].'">abc.com</a><br><br>';
                    echo '<b>CERTIFICATE : </b><a href="'.$row['facebook'].'">abc.com</a><br><br>';
                ?>
            </div>
        </div>
        <div class="right">
            <div class="img">
                <?php
                    echo '<img src="'.$row['profile_image'].'" alt="profile pic">';
                ?> 
            </div>
            <div class="badges">
                <h4 style="text-align: center;">BADGES : 5</h4>
                <button type="button"><i class="fa fa-download"> </i> <a href="#" download> RESUME</a></button>
            </div>
        </div>
        <!-- <div class="activity">
            <p style="text-align:center; text-transform: uppercase; font-size: 40px; font-weight: bold;color:#0082e6;">ACTIVITY</p>
            <p style="padding-left:20px;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita molestias veniam aperiam natus accusantium, voluptate porro perferendis minus beatae aspernatur dolores? Quia, sapiente earum! Facilis tempore accusantium culpa pariatur. Maxime.</p>
        </div> -->
        <div class="user-badges">
            <p style="text-align:center; text-transform: uppercase; font-size: 40px; font-weight: bold;color:#0082e6;margin-top: 70px;">BADGES</p>
            <p style="padding-left:20px;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt aliquid distinctio fugit maiores facere minus similique? Earum non, nisi repellat delectus aut asperiores. Voluptas ab hic nihil dolor iusto aliquam.</p> 
            
            
            <div class="row">
            <?php
                define('BADGE_UPLOADPATH','badges/');
                $query_badge="SELECT * FROM user_achievements WHERE user_mail='$email'";
                $result_badge=mysqli_query($dbc,$query_badge) or die("user achievement query not executed");
                while($row=mysqli_fetch_array($result_badge))
                {
                    $skill_fetch=$row['skill_code'];
                    $query_badge_details="SELECT * FROM badges WHERE skill_code='$skill_fetch'";
                    $result_badge_details=mysqli_query($dbc,$query_badge_details) or die("badge details query not executed");
                    $row_badge_details=mysqli_fetch_array($result_badge_details);
                    echo '<div class="column">';
                        echo '<figure>';
                        //echo '<img src="'.$row_badge_details['badge_image'].'" alt="username">';
                        echo '<img src="'.BADGE_UPLOADPATH.$row_badge_details['badge_image'].'" alt="verified score">';
                        echo '<figcaption>details of badge </figcaption>';
                            echo '<p> date : '.$row['date'].'</p>';
                            echo '<p> name : '.$row_badge_details['skill_name'].'</p>';
                            echo '<p> score : '.$row['score'].'</p>';
                        echo '</figure>';
                    echo '</div>';
                }
            ?>    


        </div>

    </main>
    
    
    <div class="footer">
        <div class="inner_footer">

            <div class="footer_items">
                <h1>DigiBadge</h1>
                <p>It helps educators track their students’ progress. They also equip learners with a tool
                     to acknowledge their accomplishments and show what they are learning. There is great 
                     potential for badges to be valuable for industry when it comes to hiring competent 
                     employees.</p>
                
            </div>

            <div class="footer_items">
                <h2>Quick Links</h2>
                <div class="border">
                    <ul>
                        <a href="#"><li><br></li></a>
                        <a href="#"><li>Home</li></a>
                        <a href="#"><li>About</li></a>
                        <a href="#"><li>Developers</li></a>
                        <a href="#"><li>SignIn</li></a>
                        <a href="#"><li>SignUp</li></a>
                    </ul>
                </div>
            </div>

            <div class="footer_items">
                <h2>Contact Us</h2>
                <div class="border">
                <ul>
                    <li><br></li>
                    <li><a href="mailto:singh.divyansh1802@gmail.com">Divyansh_Singh</a></li>
                    <li><a href="ankitkumar.adi13@gmail.com">Ankit_Kumar</a></li>
                    
                </ul>
                </div>
            </div>

        </div>
        <div class="footer_bottom">
            Copyright &copy; Team DARTH VADER 2020. All rights reserved.
        </div>
    </div>
    
</body>
</html>