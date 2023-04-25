<?php
    


  try {

        
    // Create connection
    $conn = new mysqli($host_name, $user_name, $password, $database);
    
    // Check connection
    if ($conn->connect_error) {
    
      die('<p>Failed to connect to MySQL: '. $conn->connect_error .'</p>');
    } 
    
  } catch (Exception $e) {
    //show error if connection
    $error = $e->getMessage();
  
  }


   // validate text function - 
   function test_input($data) {
    $data = trim($data);
    $data = json_encode($data);
    //$data = filter_var($data, FILTER_SANITIZE_STRING);
    $data = htmlentities($data, ENT_QUOTES, 'UTF-8');    
    return $data;
  }
 
  // check if form has been sumitted.
  // NOTE : $_POST['submit] value equals NULL which is falsy.
  if( !isset($_POST['submit']) ){
    
    $myname = !empty($_POST['myname']) ? test_input($_POST['myname']) : "" ;
    $myemail = !empty($_POST['myemail']) ? filter_var($_POST['myemail'], FILTER_SANITIZE_EMAIL) : "" ;
    $comment = !empty($_POST['mycomments']) ? test_input($_POST['mycomments']) : "" ; 
    if(isset($_POST['myprivacy'])) {
      $privacy = $_POST['myprivacy'];      
    }else{
      $privacy = "off";
    }

    function validateDate($date, $format = 'Y-m-d H:i:s')
    {
      $d = DateTime::createFromFormat($format, $date);
      return $d && $d->format($format) == $date;
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





