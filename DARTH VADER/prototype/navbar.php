<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/navbar.css" type="text/css">
    <link href="css/ankit_login.css" rel="stylesheet" type="text/css" />
    <link href="css/ankit_register.css" rel="stylesheet" type="text/css" />
    <title>Document</title>
</head>
<body>
        <nav>
            <input type="checkbox" id="check" />
            <label for="check" class="checkbtn">
            <i class="fas fa-bars"></i>
            </label>
            <label class="logo">Digibadge</label>
            <?php
                if(isset($_SESSION['usermail']))
                {
                    $username = $_SESSION['username'];
                    echo '<ul>
                        <li><a class="active" href="./index.html">Home</a></li>
                        <li><a href="./logout.php">SignOut</a></li>
                        <li>Welcome'.$username.'</li>
                        <li><a href="https://github.com/Ankitkumar98/DIGIBADGE">Contact</a></li>
                    </ul>';
                }
                else
                {
                echo '<ul>
                        <li><a class="active" href="./index.html">Home</a></li>
                        <li><a id="sign" style="cursor:pointer;">SignIn/SignUp</a></li>
                        <li><a href="https://github.com/Ankitkumar98/DIGIBADGE">Contact</a></li>
                    </ul>';
                }
            ?>
                
        </nav>

    <!-- sign-in/sign-up code -->
    <div id="bg-modal" style="
        width:100%;
        height:100%;
        background-color:rgba(0,0,0,0.8);
        position: fixed;
        display:none;
        top: 0;
        z-index: 3;
    ">
        <div id="close" style="
            cursor: pointer;
            font-weight: bolder;
            font-size: 40px;
            position:absolute;
            right:16px;
            top:8px;
            color:red;
            transform: rotate(45deg);
            z-index: 3;">+
        </div>
        <div id="prizes">
            <div style="width:500%;">
                <!-- <div style="display:table;width:1027%;margin:0 auto;font-size: 30px;">
                    <ul style="list-style:none;display:table-row;">
                        <li style="display:table-cell;padding-left:40%;padding-top:10.5%;font-weight:bolder;background-color:red;"><a href="#tab-1" style="color:white;">SignIn</a></li>
                        <li style="display:table-cell;padding-left:5%;padding-top:10.5%;font-weight:bolder;background-color:orange;"><a href="#tab-2" style="color:white;">Register</a></li>  
                    </ul>
                </div> -->
                <ul>
                    <li style="display:inline-block;float:center;margin-right:30px;font-size:30px;margin-left:63%;margin-top:17.6%;"><a href="#tab-1" style="color:white;outline:none;">SignIn</a></li>
                    <li style="display:inline-block;float:center;margin-right:30px;font-size:30px;margin-left:8%;margin-top:17.6%;"><a href="#tab-2" style="color:white;outline:none;">Register</a></li>
                </ul>
            </div>
            
            <div id="tab-1">
                <div class="center">
                    <div class="login_center">
                        <h1>Login</h1>
                        <form method="POST" action="./user-login.php?location=<?php echo urlencode($_SERVER['REQUEST_URI']); ?>">
                            <div class="login_txt_field">
                                <input type="email" name="login_email" required />
                                <span></span>
                                <label>Email</label>
                            </div>
                            <div class="login_txt_field">
                                <input type="password" name="login_pw" required />
                                <span></span>
                                <label>Password</label>
                            </div>
                            <div class="login_pass">Forgot Password ?</div>
                            <input type="submit" name="login_submit" value="Login" />
                            <div class="login_signup_link">Not a member ? <a href="#tab-2">Signup</a></div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="tab-2">
                <div class="center">
                    <div class="register_center">
                        <h1>Register</h1>
                        <form method="POST" action="./user-signup.php?location=<?php echo urlencode($_SERVER['REQUEST_URI']); ?>">
                            <div class="register_txt_field">
                                <input type="text" name="register_name" required />
                                <span></span>
                                <label>Full Name</label>
                            </div>
                            <div class="register_txt_field">
                                <input type="password" name="register_pw" required />
                                <span></span>
                                <label>Password</label>
                            </div>
                            <div class="register_txt_field">
                                <input type="email" name="register_email" required />
                                <span></span>
                                <label>Email</label>
                            </div>
                            <div class="register_txt_field">
                                <input type="password" name="confirmPassword" required />
                                <span></span>
                                <label>Confirm Password</label>
                            </div>
                            <div class="register_signup_link">Already a member ? <a href="#tab-1">Login</a></div>
                            <input type="submit" name="register_submit" value="Register" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/navbar.js"></script>   
</html>
