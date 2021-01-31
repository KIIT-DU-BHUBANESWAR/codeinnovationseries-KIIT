<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="../divyansh/assets/images/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="./edit-profile.css" />
    <title>Edit Profile</title>
  </head>
  <body>
    <header>
        <nav>
            <ul>
                <li><a href="./index.html" style="font-weight: bold;color:#2c3e50 ;font-size: 35px;border: 0px; padding: 0px 0px 0px 0px;">DigiBadge</a></li>
                <li><a href="./index.html">HOME</a></li>
                <li><a href="#">ABOUT</a></li>
                <li><a href="#"  class="active" disabled>EDIT</a></li>
                <li><a href="./profile.php">PROFILE</a></li>
                <li style="float: right;padding-top: 20px;"><a href="./logout.php">LOGOUT</a></li>
            </ul>
        </nav>      
        </div>
    </header>

    <div class="edit-profile">
      <form class="edit-form" action="./update-profile.php" method="POST" enctype="multipart/form-data">
        <div class="left">
          <div class="profile-image">
            <label for="profile-pic">Profile Pic</label>
            <img
              id="profile-img"
              src="./ankit pic-1.jpg"
              alt="user-image"
              width="50"
              height="50"
              style="border-radius: 50%"
            />
            <input
              type="file"
              id="imgInp"
              name="profile-pic"
              style="width: 200px; background-color: transparent"
            />
          </div>
          <div class="resume">
            <label for="resume">Resume</label>
            <canvas id="pdfViewer"></canvas>
            <input
              type="file"
              id="myPdf"
              name="resume"
              style="width: 200px; background-color: transparent"
            />
          </div>
        </div>

        <div class="middle">
          <div class="first-name">
            <label for="firstname">First Name : </label>
            <input
              type="text"
              name="firstname"
              maxlength="30"
              placeholder="FIRSTNAME"
            />
          </div>
          <div class="last-name">
            <label for="lastname">Last Name : </label>
            <input
              type="text"
              name="lastname"
              maxlength="30"
              placeholder="LASTNAME"
            />
          </div>

          <div class="email">
            <label for="usermail">Email : </label>
            <input
              type="email"
              name="usermail"
              maxlength="50"
              placeholder="e.g 123@gmail.com"
            />
          </div>
          <div class="address">
            <label for="address">Address :</label>
            <input
              type="text"
              name="address"
              placeholder="123 main street"
              size="50"
            />
          </div>

          <div class="country">
            <label for="country">Country</label>
            <select name="country">
              <option value="india" selected="selected">NONE</option>
              <option value="india">INDIA</option>
              <option value="australia">AUSTRALIA</option>
              <option value="china">CHINA</option>
              <option value="usa">U.S.A</option>
              <option value="germany">GERMANY</option>
            </select>
          </div>

          <div class="state">
            <label for="state">State</label>
            <select name="state">
              <option value="india" selected="selected">NONE</option>
              <option value="JHK">JHARKHAND</option>
              <option value="MHT">MAHARASTRA</option>
              <option value="JK">JAMMU & KASHMIR</option>
              <option value="KR">KERELA</option>
              <option value="WB">WEST BENGAL</option>
            </select>
          </div>

          <div class="pincode">
            <label for="pincode">Pin Code</label>
            <input
              type="textbox"
              name="pincode"
              size="20"
              placeholder="e.g 12345"
            />
          </div>
          
          <div class="profession">
            <label for="profession">Profession</label>
            <input type="radio" name="profession" value="STUDENT"/> Student
            <input type="radio" name="profession" value="PROFESSIONAL"/> Professional
          </div>

          <div class="moto">
            <label for="moto">Moto</label>
            <input type="text" name="moto" maxlength="1000" size="50" />
          </div>
        </div>

        <div class="right">
          <div class="organisation">
            <label for="college">Organisation/College</label>
            <input
              type="text"
              name="organisation"
              size="50"
              placeholder="e.g KIIT"
            />
          </div>
          <div class="dob">
            <label for="dob">D.O.B</label>
            <input type="date" name="dob" />
          </div>
          <div class="github">
            <label for="github">Github</label>
            <input type="text" name="github" maxlength="1000" size="50" />
          </div>
          <div class="facebook">
            <label for="facebook">Certificate</label>
            <input type="text" name="facebook" maxlength="1000" size="50" />
          </div>
          <div class="twitter">
            <label for="twitter">Twitter</label>
            <input type="text" name="twitter" maxlength="1000" size="50" />
          </div>
          <div class="linkedin">
            <label for="linkedin">LinkedIn</label>
            <input type="text" name="linkedin" maxlength="1000" size="50" />
          </div>
          <div class="portfolio">
            <label for="portfolio">Portfolio</label>
            <input type="text" name="portfolio" maxlength="1000" size="50" />
          </div>

          <div class="Gender">
            <label for="gender">Gender</label>
            <input type="radio" name="gender" value="MALE" /> Male
            <input type="radio" name="gender" value="FEMALE"/> Female
            <input type="radio" name="gender" value="OTHERS"/>Others
          </div>
        </div>

        <div class="content">
          <button class="btn corousal_btn1" type="button">Back To Home</button>
          <button class="btn corousal_btn1" name="submit" type="submit">Save Changes</button>
        </div>
      </form>
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
              <li><br></li>
              <li><a href="mailto:singh.divyansh1802@gmail.com">Divyansh_Singh</a></li>
              <li><a href="ankitkumar.adi13@gmail.com">Ankit_Kumar</a></li>
              <li><a href="mailto:prasad.ashish162@gmail.com">Ashish_Prasad</a></li>
          </ul>
          </div>
        </div>
      </div>
      <div class="footer_bottom">
        Copyright &copy; Team DARTH VADER 2020. All rights reserved.
      </div>
    </div>

    <script src="https://mozilla.github.io/pdf.js/build/pdf.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="./edit-profile.js"></script>
  </body>
</html>
