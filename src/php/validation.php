<?php
    
  include 'private/db_connection.php';  

   // Setting Content Security Policy headers
  // header("Content-Security-Policy: default-src 'none'; script-src 'self'; connect-src 'self'; base-uri 'self';form-action 'self';");
  header("Access-Control-Allow-Origin: <website>");
  header("Vary: Origin");
  header("Content-Security-Policy: script-src 'self'; connect-src 'self'; form-action 'self';");
  // header('Access-Control-Max-Age: 86400');    // cache for 1 day
    
  include 'private/db_connection.php';  
    
    // validate text function - https://www.w3schools.com/php/php_form_validation.asp
    function test_input($data, $maxLength) {

        $data = trim($data);
        $data = htmlspecialchars($data);  
        // Limit the length of the data
        $data = substr($data, 0, $maxLength);
        
        return $data;   

  }


  // check if form has been sumitted.
  // NOTE : $_POST['submit] value equals NULL which is falsy.
  if( !isset($_POST['submit']) ){

    $myname = !empty($_POST['myname']) ? test_input($_POST['myname'], 50) : "" ;
    $myemail = !empty($_POST['myemail']) ? filter_var($_POST['myemail'], FILTER_SANITIZE_EMAIL) : "" ;
    $myemail = substr($myemail, 0, 50);
    $comment = !empty($_POST['mycomments']) ? test_input($_POST['mycomments'], 250) : "" ; 
    $privacy = !empty($_POST['myprivacy']) ? $_POST['myprivacy'] : "off";    
    $today = date("Y-m-d H:i:s");
    
    //php check if email address exists in database
    $sql= "SELECT * FROM contact WHERE myname = ? OR myemail = ?";

    // Initialize a statement object
    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
      die("Error: " . mysqli_error($conn));
    }

    mysqli_stmt_bind_param($stmt, "ss", $myname, $myemail);
    mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($res) > 0) {
      
      $row = mysqli_fetch_assoc($res);

      if($myname == $row['myname']){
        echo "<h1>Name already exists.</h1> ";
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

    //closes the prepared statement.
    mysqli_stmt_close($stmt);

    // close connection
    mysqli_close($conn);

    //echo thank you message
    echo "<h1>Your details have been received</h1>";      

  }
}


