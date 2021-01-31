<?php
  $email=$_GET['email'];
  $skill_code=$_GET['skillcode'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="web_quiz.css">
    <script defer src="web_quiz.js"></script>
    <title>Test app</title>
</head>
<body>
    <div id="mess" class="instr " >
   <div class="inst">
       <h1>INSTRUCTIONS</h1>
        <ul class="list">
           <li>There are 10 questions</li>
           <li>Time Limit: 10 minutes</li>
           <li>No negative marking</li>
           <li>Note:You cannot move to previous question</li>
       </ul>
   </div>
   <button id="start-btn" class="button " style="vertical-align:middle"><span>Start </span></button>
</div>
<div class="container ">
    
<div id="question-container"  class="ques hide" >
    <div id="settimer" class="timer ">9:59</div>
    <div id="question"> 
       
     </div>
    <div id="answer-buttons" class="btn-grid">
        
  </div>
  </div>
  <div class="controls">
    <button id="exit-btn" class="exit-btn btn hide">Exit</button>
    <button id="next-btn" class="next-btn btn hide">Next</button>
  </div>
  </div>

  <form action="profile.php" method="GET">
    <div id="score_card" class="instr hide" >
        <div class="inst">
            <h1>YOUR SCORE</h1>
        </div>
        <input type="text" name="test_score" id="score" style="float:right; margin-right:110px;">
        <input type="text" name="mail" id="mail" <?php echo 'value="'.$email.'"'?> disabled style="float:right; margin-right:110px;">
        <input type="text" name="skillcode" id="skillcode" <?php echo 'value="'.$skill_code.'"'?> disabled style="float:right; margin-right:110px;">
        <button type="submit" id="score-btn" class="button1" style="vertical-align:middle">Home</button>
    </div>
  </form>
  
</body>
</html>