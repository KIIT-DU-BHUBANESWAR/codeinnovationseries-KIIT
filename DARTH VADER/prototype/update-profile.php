<?php
    define('PROFILE_UPLOADPATH','image/');
    echo "update profile page";
    define('RESUME_UPLOADPATH','resume/');
    if (isset($_POST['submit'])) 
    {
        echo "inside if";
        include('connect.php');
        
        $email=$_POST['usermail'];
        $firstname=$_POST['firstname'];
        $lastname=$_POST['lastname'];
        $address=$_POST['address'];
        $country=$_POST['country'];
        $state=$_POST['state'];
        $pincode=$_POST['pincode'];
        $gender=$_POST['gender'];
        $github=$_POST['github'];
        $twitter=$_POST['twitter'];
        $facebook=$_POST['facebook'];
        $linkedin=$_POST['linkedin'];
        $resume=$_FILES['resume']['name'];
    //  $profile = $_POST['profile'];
        $organisation = $_POST['organisation'];
        $dob=$_POST['dob'];
        $portfolio=$_POST['portfolio'];
        $profile_image=$_FILES['profile-pic']['name'];
        $image_type=$_FILES['profile-pic']['type'];
        $profile_source=$_FILES['profile-pic']['tmp_name'];
        $resume_source=$_FILES['resume']['tmp_name'];
        $moto=$_POST['moto'];
        $profession=$_POST['profession'];
        echo "some values :";
        print_r($email);
        print_r($firstname);

        if (!empty($firstname) && !empty($gender) && !empty($organisation) && !empty($country) && !empty($state)) {
            // include('connect.php');
            if (!empty($profile_image)) {
                if(($image_type != 'image/jpeg') || ($image_type != 'image/png') || ($image_type != 'image/gif')) {
                    echo "please upload a proper image type";
                    header('refresh : 0; url=file:///C:/xampp/htdocs/globalshala/final/edit-profile.html');
                }
                echo "target profile";
                //code to tranfer image to another folder
                $target_profile = PROFILE_UPLOADPATH.$image;

                if (!move_uploaded_file($profile_source,$target_profile)) {
                    echo "image not moved to destination folder";
                    header('refresh : 0; url=file:///C:/xampp/htdocs/globalshala/final/edit-profile.html');
                }
            }

            if (!empty($resume)) {
                $target_resume = RESUME_UPLOADPATH.$resume;
                if (!move_uploaded_file($resume_source,$target_resume)) {
                    echo "resume not moved to destination folder";
                    header('refresh : 0; url=file:///C:/xampp/htdocs/globalshala/final/edit-profile.html');
                }
                echo "hello";
            }

            $edit_query="INSERT INTO user_details VALUES('$email','$firstname','$lastname','$address','$country','$state','$pincode','$organisation','$dob','$github','$facebook','$twitter','$linkedin','$portfolio','$gender','$profile_image','$resume','$moto','$profession')";

            $edit_result=mysqli_query($dbc,$edit_query) or die("edit query not executed");
            echo "changes saved";
            mysqli_close($dbc);
            header('Refresh : 0; url:file:///C:/xampp/htdocs/globalshala/final/profile.html');
        }
    }
?>