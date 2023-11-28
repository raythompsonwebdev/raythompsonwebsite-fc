<?php
    
  include 'private/db_connection.php';  

  header("Content-Type: text/html; charset=UTF-8");

  // Setting Content Security Policy headers
  //header("Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-scripts.com; style-src 'self' https://trusted-styles.com;");


   // validate text function - https://www.w3schools.com/php/php_form_validation.asp
   function test_input($data, $maxLength) {
    $data = trim($data);
    $data = json_encode($data);
    $data = htmlspecialchars($data, ENT_QUOTES);  
    
    // Limit the length of the data
    $data = substr($data, 0, $maxLength);
    
    return $data;
  }
 
  // check if form has been sumitted.
  // NOTE : $_POST['submit] value equals NULL which is falsy.
  if( !isset($_POST['submit']) ){
    
    $myname = isset($_POST['myname']) ? test_input($_POST['myname'], 50) : "" ;
    $myemail = isset($_POST['myemail']) ? filter_var($_POST['myemail'], FILTER_SANITIZE_EMAIL) : "" ;
    $myemail = substr($myemail, 0, 50);
    $comment = isset($_POST['mycomments']) ? test_input($_POST['mycomments'], 250) : "" ; 
    $privacy = isset($_POST['myprivacy']) ? $_POST['myprivacy']: "off" ;
 
    $today = date("Y-m-d H:i:s");
    
    //php check if email address exists in database
    //php check if email address exists in database
    $sql="SELECT * from contact where (myname='$myname' or myemail='$myemail');";
    
    $res=mysqli_query($conn,$sql);

    if (mysqli_num_rows($res) > 0) {
      
      $row = mysqli_fetch_assoc($res);

      if($myname == $row['myname']){
        echo "<h1>Sorry, name already exists.</h1> ";
      }

      if($myemail == $row['myemail']) {
            echo "<h1>email address already exists.</h1>";
      }  
    } else {
    //assign mysql insert statement to variable using questrion marks as placeholders.
    $sql = "INSERT INTO contact( myname, myemail, comment, privacy, date_submitted) VALUES (?,?,?,?,?)";
    // initialize statement to be prepared
    $stmt = mysqli_stmt_init($conn);
    // prepare statements
    if (!mysqli_stmt_prepare($stmt, $sql)) {
      die("Error: " . mysqli_error($conn));
    }

    // bind form value variables to statements using interpolation
    mysqli_stmt_bind_param($stmt,"sssss",$myname, $myemail, $comment, $privacy, $today );
    //execute statment
    mysqli_stmt_execute($stmt);

    // close connection
    $conn->close();

    //echo thank you message
    echo "<h1>Your message has been received</h1>";      

  }
}
