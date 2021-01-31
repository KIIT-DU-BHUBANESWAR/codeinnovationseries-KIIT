<html lang="en">

<head>
  <title>REGISTER</title>
  <link rel="icon" href="./assets/images/logo.png" />
  <link href="register.css" rel="stylesheet" type="text/css" />
</head>

<body>
  <div class="center">
    <h1>Register</h1>
    <form method="POST" action="./user-registration.php">
      <div class="txt_field">
        <input type="text" name="register_name" required />
        <span></span>
        <label>Full Name</label>
      </div>
      <div class="txt_field">
        <input type="password" name="register_pw" required />
        <span></span>
        <label>Password</label>
      </div>
      <div class="txt_field">
        <input type="email" name="register_email" required />
        <span></span>
        <label>Email</label>
      </div>
      <div class="txt_field">
        <input type="date" name="register_dob" required placeholder="Date of Birth" />
        <span></span>
      </div>
      <!-- <div class="txt_field">
        <input type="text" name="register_motto" required />
        <span></span>
        <label>Motto</label>
      </div> -->
      <div class="signup_link">Already a member ? <a href="./login.php">Login</a></div>
      <input type="submit" name="register_submit" value="Register" />
    </form>
  </div>
</body>

</html>