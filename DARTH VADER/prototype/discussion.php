<?php
    session_start();
    require_once('connect.php');

    if(isset($_SESSION['usermail']))
    {
        $email = $_SESSION['usermail'];
        $user_query = "SELECT * FROM user WHERE user_email ='$email'";
        $user_query_result = mysqli_query($dbc,$user_query) or die("unable to fetch user details from database");
        $row_user = mysqli_fetch_array($user_query_result);
        $userid = $row_user['user_id'];
        if(isset($_GET['questionTitle']) && isset($_GET['questionDescription']))
        {
            $threadtitle = mysqli_real_escape_string($dbc,trim($_GET['questionTitle']));
            $threaddesc = mysqli_real_escape_string($dbc,trim($_GET['questionDescription']));
            $insert_query = "INSERT INTO threads(`thread_title`,`thread_desc`,`thread_user_id`,`thread_category`) VALUES('$threadtitle','$threaddesc','$userid',1)";
            mysqli_query($dbc,$insert_query) or die("error in posting query");
            echo 'post successfull';
        }
    }
    


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/discussion.css" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="icon" href="./static/Tab_Logo.png">
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
        <?php
            include('navbar.php');
        ?>    
        <main>
        <div class="jumbotron_img"><img src="./image/book_diary_bookmark_111541_1280x720.jpg" width="1865px" height="500px" alt=""></div>

        <!-- jumbotron -->
        <!-- <div class="jumbotron"> 
            <div class="jumbotron_img"><img src="https://images.wallpaperscraft.com/image/books_library_old_111388_3840x2400.jpg" width="1865px" height="500px" alt=""></div>
            <div class="content">
                <h1 class="title">title</h1>
                <h4 class="title-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad corrupti cupiditate praesentium
                    esse nobis harum repudiandae ipsa quidem perferendis. Reiciendis impedit vero ab sequi ea hic repellat quas velit.
                    Hic voluptatum minima pariatur placeat veritatis et expedita eveniet nemo maxime, aliquid sit quos ab quae facere
                    alias, numquam nisi eligendi ut magnam repudiandae est aperiam?
                </h4>
                <button class="btn"><a href="#askQuestionForm">Ask a Question</a></button>
            </div>
        </div> -->

        <div class="search-sort" style="background-color:rgb(173, 169, 169);">
            <?php
                $query = 'SELECT thread_id FROM threads';
                $queryResult = mysqli_query($dbc,$query);
                $countQuestions =mysqli_num_rows($queryResult);
            ?>
            <div class="numQuestions">
                <p><span class="barTitle">Total no. of Questions :</span> <?php echo $countQuestions ?></p>
            </div>
            
            <div class="search">
                <label for="search-ques"><span class="barTitle">Search : </span></label>
                <form action="./search.php" method="get">
                    <input type="text" name="search-ques" length="500" style="padding:1%;font-size:18px;border:none;border-bottom:2px solid grey;outline:none;">
                    <button class="btnSearch" type="submit">Search</button>
                </form>    
            </div>
    
            <div class="sort">
                <label for="sort-ques"><span class="barTitle">Sort : </span></label>
                <select name="sort-type" id="sort-type" style="font-size:18px;padding:1%;">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>
        </div>

        <!-- <div class="askQuestion" id="ask-question">
            <form action="<?php echo $_SERVER['PHP_SELF'] ?>" class="askQuestion">
                <textarea name="question" id="doubt" cols="30" rows="10"></textarea>
                <input type="submit" id="submit-form" value="POST" name="submit">
            </form>
        </div> -->
        

        <?php
            $query = 'SELECT * FROM threads';
            $queryResult = mysqli_query($dbc,$query) or die("error in fetching details from threads table");
            echo '<div class="questions">';
            while($row = mysqli_fetch_array($queryResult))
            {
                echo'<div class="userBox">
                        <div class="indivUser">
                            <div class="userLogo">
                                <img src="./image/user.svg" width="50" height="50" alt="user">
                            </div>
                            <div class="userDescription">';
                                echo  '<a href = "./threads.php?th_id='.$row['thread_id'].'">
                                    <label class="userThreadLabel" for="quesTitle">'.$row['thread_title'].'</label><br/> </a>
                                    <p style="display:inline-block;float:left;margin-right:30px;">'.$row['thread_desc'].'</p><p style="display:inline-block;float:left;"><b>Asked on '.$row['thread_date'].'</b> </p>
                            </div>
                        </div>
                    </div>
                    <hr style="width:85%;height:5%;margin-left:6%;margin-top:15px;">';     
            }

            echo '</div>';

        ?>


        
        <div class="askQuestionForm" id="askQuestionForm">
            <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="GET">
                <label class="questionTitleLabel" for="questionTitle">Question Title</label>
                <input class="questionTitleBox" type="text" id="questionTitle" name="questionTitle" placeholder="Question Title ...">

                <label class="questionDescriptionLabel" for="questionDescription">Question Description</label>
                <textarea class="questionDescriptionBox" rows="10" cols="50" id="questionDescription" name="questionDescription" placeholder="Question Description ..."></textarea>        
                
                <input class="askQuestionFormSubmit" type="submit" value="Add Question" style="text-decoration:none;width:15%;font-size:22px;padding:1%;outline:none;border:none;border-radius:25px;padding-bottom:3%;">
            </form>
        </div>

        <div class="bottom_section">
        <footer class="footer">
            <div class="footer-left">
                <img src="./static/Footbar_Logo.png" alt="">
                <p><b>Digibadge</b>It helps educators track their students’ progress. They also equip learners with a tool
                     to acknowledge their accomplishments and show what they are learning. There is great 
                     potential for badges to be valuable for industry when it comes to hiring competent 
                     employees.</p>
            </div>
            <ul class="footer-right">
                
                    <h2>Contact Us</h2>
                    <hr width="50%">
                    <ul class="box">
                        <li><a href="https://github.com/Ankitkumar98">Ankit Kumar (Github)</a></li>
                        <li><a href="mailto:1805279@kiit.ac.in">Ankit Kumar (Mail)</a></li>
                        <hr width="20%">
                        <li><a href="https://github.com/RgnDunes">Divyansh Singh (Github)</a></li>
                        <li><a href="mailto:1805661@kiit.ac.in">Divyansh Singh (Mail)</a></li>
                    </ul>
                </li>
            </ul>
            <div class="footer-bottom">
                <p>All Right reserved by &copy;Digibadge 2021</p>
            </div>
            <div class="footer-bottom">
                <p><a href="#top">Back to top</a></p>
            </div>
        </footer>
    </div>
    </main>
    
</body>
<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/discussion.js"></script>    
</html>