<?php
  $email=$_GET['email'];
  $skill_code=$_GET['skillcode'];
?>
<!DOCTYPE html>
<html lang="en" style="height: 100%; margin: 0">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="./assets/images/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="web_test.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <title>WEB DEVELOPMENT</title>
  </head>
  <body>
    <nav>
      <input type="checkbox" id="check" />
      <label for="check" class="checkbtn">
        <i class="fas fa-bars"></i>
      </label>
      <label class="logo">DigiBadge</label>
      <ul>
        <li><a class="active" href="./index.html">Home</a></li>
        <li><a href="./test.php">TEST</a></li>
        <li><a href="#">SignUp</a></li>
        <li><a href="#">SignIn</a></li>
        <li><a href="https://github.com/Ankitkumar98/DIGIBADGE">Contact</a></li>
      </ul>
    </nav>

    <h1 class="heading">WEB DEVELOPMENT</h1>

    <div class="row-grid">
      <div
        class="sub-heading"
        style="background-color: lightcoral; height: 45%"
      >
        <code class="update">LANGUAGE</code>
        <code class="update">NO OF ATTEMPTS</code>
        <code style="margin-right: 10em" class="update">BADGES</code>
      </div>
      <div class="sub-heading">
        <code>HTML</code>
        <code style="margin-left: 5em">0</code>
        <code>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </code>
        <button class="button" style="vertical-align: middle"><?php echo '<a href="web_quiz.php?email='.$email.'&amp;skillcode=WD2020" style="text-decoration:none; color:white;"><span>TEST</span></a>'?>
          
        </button>
      </div>
      <div class="sub-heading">
        <code>CSS</code>
        <code style="margin-left: 5.5em">0</code>
        <code>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </code>
        <button class="button" style="vertical-align: middle">
          <span>TEST </span>
        </button>
      </div>
      <div class="sub-heading">
        <code>JAVASCRIPT</code>
        <code style="margin-left: 1.4em">0</code>
        <code>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </code>
        <button class="button" style="vertical-align: middle">
          <span>TEST </span>
        </button>
      </div>
      <div class="sub-heading">
        <code>REACT JS</code>
        <code style="margin-left: 2.6em">0</code>
        <code>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </code>
        <button class="button" style="vertical-align: middle">
          <span>TEST </span>
        </button>
      </div>
      <div class="sub-heading">
        <code>NODE JS</code>
        <code style="margin-left: 3.2em">0</code>
        <code>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </code>
        <button class="button" style="vertical-align: middle">
          <span>TEST </span>
        </button>
      </div>
      <div class="sub-heading">
        <code>DJANGO</code>
        <code style="margin-left: 4em">0</code>
        <code>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </code>
        <button class="button" style="vertical-align: middle">
          <span>TEST </span>
        </button>
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
        Copyright &copy; Team DARTH VADER 2021. All rights reserved.
      </div>
    </div>
  </body>
</html>
