<?php
    require('connect.php');
    session_start();
    $threadid = $_GET['th_id'];
    if(isset($_SESSION['usermail']))
    {
        $email = $_SESSION['usermail'];
        $user_query = "SELECT * FROM user WHERE user_email ='$email'";
        $user_query_result = mysqli_query($dbc,$user_query) or die("unable to fetch user details from database");
        $row_user = mysqli_fetch_array($user_query_result);
        $userid = $row_user['user_id'];
    }
    
    
    if(isset($_POST['submit']))
    {
        $comment = mysqli_real_escape_string($dbc,trim($_POST['user-comment']));
        $query = "INSERT INTO `comments`(`comment_desc`, `comment_user_id`, `comment_likes`, `comment_dislikes`, `comment_thread_id`)".
         "VALUES ('$comment','$userid',0,0,'$threadid')";
         mysqli_query($dbc,$query) or die("comments unsuccessfully posted");
    }  
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/threads.css" type="text/css">
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
        <div class="thread" style="border-right:2px solid grey;box-shadow: 5px 0 5px -2px #888;">
            <?php    
                $query = "SELECT * FROM threads WHERE thread_id='$threadid'";
                $thread_result = mysqli_query($dbc,$query) or die("Unable to fetch threads from database");
                $row = mysqli_fetch_array($thread_result);
                echo '<div class="question" style="font-size:18px;margin:1%;line-height:1.6em;width:95%;padding:3%;">
                        <div class="title">
                            <p style="font-size:25px;font-weight:bold; margin-bottom: 2px;">'. $row['thread_title'] .'</p>
                            <p style="font-size:15px;padding-left:5%;" class="date">Asked on ' . $row['thread_date'] . '</p>
                        </div>
                
                        <div class="description">
                            <p style="font-size:22px;">' .$row['thread_desc'] . '</p>
                        </div>
                    </div>
                
                
                <hr width="96%;">';
            ?>

            <?php
                $query = "SELECT * FROM comments where comment_thread_id='$threadid'";
                $comment_result = mysqli_query($dbc,$query) or die("Unable to fetch comments from database");
                $commentCount = mysqli_num_rows($comment_result);
                if($commentCount == 0)
                {
                echo'<div class="status" style="width:100%; background-color:gainsboro; margin-left:0px;">
                        <p style="
                        font-size: 40px;
                        font-weight:bold;
                        text-align: center;
                        margin-bottom: 5px;
                        padding-top:40px;
                        ">No Results Found</p>
                        <p style="
                        font-size: 20px;
                        font-style: normal;
                        text-align: center;
                        margin-top:2px;
                        padding-bottom: 40px;;
                        ">Be the first person to comment on this</p>    
                    </div>';
                }
            
                echo '<div class="Discussions" style="font-size: 22px;">
                        <div style="justify-content:center;align-items:center;text-align:center;padding-top:3%;padding-bottom:3%;">
                            <p style="padding-bottom:3%;font-size:32px;">Post Your Answer</p>
                            <div class="replyThread">
                                <form action="'.$_SERVER["REQUEST_URI"].'" method="POST">
                                    <textarea style="outline:none;padding:1%;font-size:16px;" placeholder="Type here ..." name="user-comment" id="user-comment" cols="115" rows="10" maxlength="500"></textarea> <br>
                                    <input style="margin-top:3%;width:10%;" type="submit" name="submit" value="Post">
                                </form>
                            </div>
                        </div>
                        <div class="comments">
                            <p>No of answers : '.$commentCount.'</p><br/>
                            <p style="font-weight:bold;font-size:30px;line-height:1.6em;">Discussions</p>
                            <hr style="width:98%;"><br/>
                            <div class="questions" style="margin-bottom:5%;margin-left: 5%;margin-top: 2%;">';
                                while($comment_row = mysqli_fetch_array($comment_result))
                                {
                                    $user_query = 'SELECT user_name FROM user WHERE user_id ='.$comment_row['comment_user_id'];
                                    $user_query_result = mysqli_query($dbc,$user_query) or die("unable to fetch user details from database");
                                    $row_user = mysqli_fetch_array($user_query_result);
                                    $timestamp = strtotime($comment_row['comment_date']);
                                    $date = date('d-m-Y',$timestamp);
                                    $time = date('G:i:s',$timestamp);
                                    $name = substr($row_user['user_name'],0,strpos($row_user['user_name']," ")-0);
                                    echo '
                                        <div class="userBox" style="display: table;width: 100%;margin-top: 5px;">
                                            <div class="indivUser" style="display: table-row;padding-bottom: 2%;">
                                                <div class="userLogo" style="display: table-cell;width: 6%;">
                                                    <img src="./image/user.svg" width="50" height="50"alt="user"> <br>
                                                    <label for="username">'.$name.'</label>
                                                </div>
                                                <div class="userDescription" style="display: table-cell;line-height: 1.7em;padding-left:5%;font-size: 18px;">';
                                                    echo  '<label class="userThreadLabel" for="quesTitle"> '.$comment_row['comment_desc'].'</label><br/>
                                                            <p style="display:inline-block;float:left;margin-right:30px;">
                                                                <a href="./updateresponse.php?response=1&commid='.$comment_row['comment_id'].'"><img class="like" src="./image/like.png" alt="like" width="25" height="25" ></a>'.$comment_row['comment_likes'].'
                                                                <a href="./updateresponse.php?response=0&commid='.$comment_row['comment_id'].'"><img class="dislike" src="./image/dislike.png" alt="dislike"  width="25" height="25" ></a>'.$comment_row['comment_dislikes'].'
                                                            </p>
                                                            <p style="display:inline-block;float:left;"><b>Asked on '.$row['thread_date'].'</b> </p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr style="width:85%;height:5%;margin-left:6%;margin-top:15px;">
                                    ';
                                }    
            ?>              </div>  
                        </div>
                    </div>    
        </div>

        <div class="suggestions" style="font-size:24px;justify-content:center;align-items:center;text-align:center;">
            <p style="padding-left:10px 0 3px 10px;">Related</p>
            <hr style="width:98%;margin-left:2%;margin-top:15px;margin-bottom:10px;">
            <?php
                $query = 'SELECT * FROM threads';
                $queryResult = mysqli_query($dbc,$query) or die("error in fetching details from threads table");
                echo '<div class="questions">';
                while($row = mysqli_fetch_array($queryResult))
                {
                    echo '<a href = "./threads.php?th_id='.$row['thread_id'].'"><label for="quesTitle">'.$row['thread_title'].'</label><br/></a>';

                }
                
                echo '<hr style="width:96%;margin-left:2%;margin-top:15px;margin-bottom:10px;">';
            ?>
        </div>   
    
</body>
<script src="./js/jquery-3.4.1.min.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="./js/thread.js"></script>
</html>