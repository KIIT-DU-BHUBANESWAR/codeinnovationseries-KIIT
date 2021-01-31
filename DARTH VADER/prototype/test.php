<?php
  session_start();
  $user_mail=$_SESSION['user_profile'];

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="./assets/images/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="test.css" />
    <title>Test</title>
  </head>
  <body>
    <div class="topnav">
      <label class="logo" style="float: left; margin-top: 5px">DigiBadge</label>
      <a href="./logout.php" style="float: right">LOGOUT</a>
      <a  style="float: right" href="./profile.php">PROFILE</a>
      <a class="active" style="float: right" href="./test.php">TEST</a>
      <a href="#news" style="float: right">ABOUT</a>
      <a href="./index.html" style="float: right">HOME</a>
    </div>
    <div class="container_boxes">
      <div class="row">
        <div class="box">
          <div class="icon">01</div>
          <div class="content_box">
            <br />
            <h3>WEB DEVELOPMENT</h3>
            <br />
            <p><button class="btn corousal_btn1"><?php echo '<a href="web_test.php?email='.$user_mail.'&amp;skillcode=WD2020" style="text-decoration:none;">TEST</a>'?> </button></p>
          </div>
        </div>
        <div class="box">
          <div class="icon">03</div>
          <div class="content_box">
            <br />
            <h3>ANDROID DEVELOPMENT</h3>
            <br />
            <p><button class="btn corousal_btn1">TEST</button></p>
          </div>
        </div>
        <div class="box">
          <div class="icon">05</div>
          <div class="content_box">
            <br />
            <h3>PROGRAMMING LANGUAGES</h3>
            <br />
            <p><button class="btn corousal_btn1">TEST</button></p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="box">
          <div class="icon">02</div>
          <div class="content_box">
            <br />
            <h3>MACHINE LEARNING</h3>
            <br />
            <p><button class="btn corousal_btn1">TEST</button></p>
          </div>
        </div>
        <div class="box">
          <div class="icon">04</div>
          <div class="content_box">
            <br />
            <h3>INTERNET OF THINGS</h3>
            <br />
            <p><button class="btn corousal_btn1">TEST</button></p>
          </div>
        </div>
        <div class="box">
          <div class="icon">06</div>
          <div class="content_box">
            <br />
            <h3>BLOCKCHAIN</h3>
            <br />
            <p><button class="btn corousal_btn1">TEST</button></p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="inner_footer">
        <div class="footer_items">
          <h1>DigiBadge</h1>
          <p>
            It helps educators track their students’ progress. They also equip
            learners with a tool to acknowledge their accomplishments and show
            what they are learning. There is great potential for badges to be
            valuable for industry when it comes to hiring competent employees.
          </p>
        </div>

        <div class="footer_items">
          <h2>Quick Links</h2>
          <div class="border">
            <ul>
              <a href="#"
                ><li><br /></li
              ></a>
              <a href="./index.html"><li>Home</li></a>
              <a href="#"><li>About</li></a>
              <a href="#"><li>Developers</li></a>
              <a href="./login.php"><li>SignIn</li></a>
              <a href="./register.php"><li>SignUp</li></a>
            </ul>
          </div>
        </div>

        <div class="footer_items">
          <h2>Contact Us</h2>
          <div class="border">
            <ul>
              <li><br /></li>
              <li>
                <a href="mailto:singh.divyansh1802@gmail.com">Divyansh_Singh</a>
              </li>
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
