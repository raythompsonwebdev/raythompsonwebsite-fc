<?php
    
  include 'private/db_connection.php';  


   // validate text function - https://www.w3schools.com/php/php_form_validation.asp
   function test_input($data) {
    $data = trim($data);
    $data = json_encode($data);
    $data = htmlspecialchars($data, ENT_QUOTES);    
    return $data;
  }
 
  // check if form has been sumitted.
  // NOTE : $_POST['submit] value equals NULL which is falsy.
  if( !isset($_POST['submit']) ){
    
    $myname = !empty($_POST['myname']) ? htmlspecialchars($_POST['myname'], ENT_QUOTES) : "" ;
    $myemail = !empty($_POST['myemail']) ? filter_var($_POST['myemail'], FILTER_SANITIZE_EMAIL) : "" ;
    $comment = !empty($_POST['mycomments']) ? test_input($_POST['mycomments']) : "" ; 
    if(isset($_POST['myprivacy'])) {
      $privacy = $_POST['myprivacy'];      
    }else{
      $privacy = "off";
    }

    $today = date("Y-m-d H:i:s");
    
    //php check if email address exists in database
    $sql="SELECT * from contact where (myname='$myname' or myemail='$myemail');";
    $res=mysqli_query($conn,$sql);

    if (mysqli_num_rows($res) > 0) {
      
      $row = mysqli_fetch_assoc($res);

      if($myname == isset($row['myname'])){
        echo "Sorry, name already exists";
      }

      if($myemail == isset($row['myemail'])) {
            echo "email address already exists";
      }
      

    } else {

    //assign mysql insert statement to variable using questrion marks as placeholders.
    $sql = "INSERT INTO contact( myname, myemail, comment, privacy, date_submitted) VALUES (?,?,?,?,?)";

    // initialize statement to be prepared
    $stmt = mysqli_stmt_init($conn);

    // prepare statements
    mysqli_stmt_prepare($stmt , $sql);

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






