<?php
        session_start();
        require('connect.php');
        // echo "entered php";
        // echo $_GET['search'];
        if(isset($_GET['search']))
        {
            $text = mysqli_real_escape_string($dbc,trim($_GET['search']));
            $query = "SELECT * FROM threads WHERE MATCH (thread_title,thread_desc) AGAINST ('$text')";
            $result = mysqli_query($dbc,$query) or die("error in fetching threads from database");
            $num = mysqli_num_rows($result);
        }
        
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/search.css">
    <title>Discussion-Forum</title>
</head>
<body>

    <script>
        window.addEventListener('storage',function(event){
            if(event.key == 'logout-event')
            {
                window.location.reload();
            }
            if(event.key == 'login-event')
            {
                window.location.reload();
            }
        });
    </script>
    
    <!-- navbar starts here -->

    <nav>
        <input type="checkbox" id="check" />
        <label for="check" class="checkbtn">
        <i class="fas fa-bars"></i>
        </label>
        <label class="logo">CorruptionFreeIndia</label>
        <?php
            if(isset($_SESSION['usermail']))
            {
                $username = $_SESSION['username'];
                echo '<ul>
                    <li><a class="active" href="./index.html">Home</a></li>
                    <li><a  href="./discussion.php">Discussion</a></li>
                    <li><a href="./logout.php">SignOut</a></li>
                    <li>Welcome'.$username.'</li>
                    <li><a href="https://github.com/Ankitkumar98/DIGIBADGE">Contact</a></li>
                </ul>';
            }
            else
            {
            echo '<ul>
                    <li><a class="active" href="./index.html">Home</a></li>
                    <li><a  href="./discussion.php">Discussion</a></li>
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
    background-color:rgba(0,0,0,0.7);
    position: absolute;
    top: 0;
    display:none;
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
    ">+</div>
    <div id="prizes">
        <ul>
            <li><a href="#tab-1">signin</a></li>
            <li><a href="#tab-2">register</a></li>  
        </ul>
        
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
                    <form method="POST" action="./user-signup.php">
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


    <!-- navbar ends here -->    

    <div class="search">
        <div class="search-desc">
            <?php
                if(isset($_GET['search']))
                {
                    echo '<div class="search-title"><b>Search results for </b>"<em>'.$_GET['search'].'</em>"</div>';
                }
                else
                {
                    echo '<div class="search-title">Type query to search</div>';
                }
           ?>
            <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="GET" style="margin: 0 auto;">
                <input type="search" name="search" id="search-input" placeholder="Search..." autocomplete="off">
                <button class="submit-btn" type="submit">Search</button>
            </form>    
        </div>
        
        <?php 
            
            if(isset($_GET['search']))
            {
                echo '<div class="no-of-results">No of results fetched : '. $num .'</div>
                <hr style="
                    width:98%;
                    margin-left:2%;
                    margin-top:15px;
                ">

                <br>';
                
                if($num != 0)
                {
                    while($row = mysqli_fetch_array($result))
                    {
                        $timestamp = strtotime($row['thread_date']);
                        $date = date('d-m-Y',$timestamp);
                        $time = date('G:i:s',$timestamp);
                        echo '
                        <div class="search-result">
                            <div class="thread-user">
                                <img src="./image/user.svg" width="50" height="50"alt="user"> <br>
                                <label for="username" style="padding-left:10px;">name</label>
                            </div>
                            <div class="thread-details">
                                <p class = "thread-title">Q : <a href = "./threads.php?th_id='.$row['thread_id'].'">'.$row["thread_title"].'</a></p><br>
                                <p class="thread-desc" >'.$row["thread_desc"].'</p><br>
                                <p class="thread-date"> Asked on '.$date.' at '.$time.'</p>
                            </div>
                        </div>
                        <hr style="
                            width:98%;
                            margin-left:2%;
                            margin-top:15px;
                            margin-bottom:10px;
                        ">';
                    }
                
                }
                else
                {
                    echo  ' <div class="status" style="width:80%; background-color:gainsboro; margin-left:70px;">
                                <p style="
                                font-size: 20px;
                                font-style: normal;
                                text-align: center;
                                margin-top:2px;
                                padding-bottom: 40px;;
                                ">NO RESULTS FOUND </p>    
                            </div>';
                }
                
            }
            else
            {
                echo  ' <div class="status" style="width:80%; background-color:gainsboro; margin-left:70px;">
                            <p style="
                            font-size: 20px;
                            font-style: normal;
                            text-align: center;
                            margin-top:2px;
                            padding-bottom: 40px;;
                            ">Search a thread </p>    
                        </div>';
            }

            
        
        ?> 
    </div>

        <div class="suggestions">
            <p style="padding-left:10px; padding-top:50px;">Related</p>
            <hr style="
                width:98%;
                margin-left:2%;
                margin-top:15px;
                margin-bottom:10px;
            ">
            <p style="padding-left:20px;">
                <?php
                    $query = 'SELECT * FROM threads';
                    $queryResult = mysqli_query($dbc,$query) or die("error in fetching details from threads table");
                    echo '<div class="questions">';
                    while($row = mysqli_fetch_array($queryResult))
                    {
                        echo '<a href = "./threads.php?th_id='.$row['thread_id'].'"><label for="quesTitle">'.$row['thread_title'].'</label></a>';
                        echo '<br>';
                    }
                    
                ?>
            </p>
        </div>

        <p>  </p>

</body>
<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/navbar.js"></script>
</html>

