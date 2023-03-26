<?php
    
  include 'private/db_connection.php';  


  // validate text function - https://www.w3schools.com/php/php_form_validation.asp
  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

  // check if form has been sumitted.
  // NOTE : $_POST['submit] value equals NULL which is falsy.
  if( !isset($_POST['submit']) ){
    
    $name = !empty($_POST['myname']) ? test_input($_POST['myname']) : "" ;
    $email = !empty($_POST['myemail']) ? test_input($_POST['myemail']) : "" ;
    $reference = !empty($_POST['reference']) ? test_input($_POST['reference']) : "" ;
    $requesttype = !empty($_POST['requesttype']) ? test_input($_POST['requesttype']) : "" ;
    $comments = !empty($_POST['mycomments']) ? test_input($_POST['mycomments']) : "" ; 
    if(isset($_POST['myprivacy'])) {
      $privacy = $_POST['myprivacy'];
      
    } 
     
    //assign mysql insert statement to variable using questrion marks as placeholders.
    $sql = "INSERT INTO contact( myname, email, reference, requesttype, comment, privacy) VALUES (?,?,?,?,?,?)";

    // initialize statement to be prepared
    $stmt = mysqli_stmt_init($conn);

    // prepare statements
    mysqli_stmt_prepare($stmt , $sql);

    // bind form value variables to statements using interpolation
    mysqli_stmt_bind_param($stmt,"ssssss",$name, $email, $reference, $requesttype, $comments, $privacy );

    //execute statment
    mysqli_stmt_execute($stmt);

    // close connection
    $conn->close();

    //echo thank you message
    echo "<h1>Message has been received</h1>";      

  }
