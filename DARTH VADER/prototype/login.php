<html lang="en">

<head>
  <title>LOGIN</title>
  <link rel="icon" href="./assets/images/logo.png" />
  <link href="login.css" rel="stylesheet" type="text/css" />
</head>

<body>
  <div class="center">
    <h1>Login</h1>
    <form method="POST" action="./userlogin.php">
      <div class="txt_field">
        <input type="email" name="login_email" required />
        <span></span>
        <label>Email</label>
      </div>
      <div class="txt_field">
        <input type="password" name="login_pw" required />
        <span></span>
        <label>Password</label>
      </div>
      <div class="pass">Forgot Password ?</div>
      <input type="submit" name="login_submit" value="Login" />
      <div class="signup_link">Not a member ? <a href="./register.php">Signup</a></div>
    </form>
  </div>
</body>

</html>