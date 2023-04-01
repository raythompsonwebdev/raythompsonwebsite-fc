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
    
    $myname = !empty($_POST['myname']) ? test_input($_POST['myname']) : "" ;
    $myemail = !empty($_POST['myemail']) ? test_input($_POST['myemail']) : "" ;
    $reference = !empty($_POST['reference']) ? test_input($_POST['reference']) : "" ;
    $requesttype = !empty($_POST['requesttype']) ? test_input($_POST['requesttype']) : "" ;
    $comments = !empty($_POST['mycomments']) ? test_input($_POST['mycomments']) : "" ; 
    // $privacy = isset($_POST['myprivacy']) ? $privacy = $_POST['myprivacy'] : $privacy = $_POST['myprivacy'];
    if(isset($_POST['myprivacy'])) {
      $privacy = $_POST['myprivacy'];      
    } 
    
    //php check if email address exists in database
    $sql="SELECT * from contact where (myname='$myname' or myemail='$myemail');";
    $res=mysqli_query($conn,$sql);

    if (mysqli_num_rows($res) > 0){
      
      $row = mysqli_fetch_assoc($res);

      if($myname == isset($row['myname'])){
        echo "Sorry, name already exists";
      }

      if($myemail == isset($row['myemail'])) {
            echo "email address already exists";
      }
      

    }else{

    //assign mysql insert statement to variable using questrion marks as placeholders.
    $sql = "INSERT INTO contact( myname, myemail, reference, requesttype, comment, privacy) VALUES (?,?,?,?,?,?)";

    // initialize statement to be prepared
    $stmt = mysqli_stmt_init($conn);

    // prepare statements
    mysqli_stmt_prepare($stmt , $sql);

    // bind form value variables to statements using interpolation
    mysqli_stmt_bind_param($stmt,"ssssss",$myname, $myemail, $reference, $requesttype, $comments, $privacy );

    //execute statment
    mysqli_stmt_execute($stmt);

    // close connection
    $conn->close();

    //echo thank you message
    echo "<h1>Your message has been received</h1>";      

    };
}






