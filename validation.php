<?php

try {

	include __DIR__ . '/php/db_credentials.php';
	// Create connection
	$conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_NAME);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
} catch (Exception $e) {
	$error = $e->getMessage();

}

	//echo "Connected successfully";

	if( !isset($_POST['submit']) ){

		//var_dump($_POST);

			if(!empty($_POST['myname']) && !empty($_POST['myemail']) && !empty($_POST['reference']) && !empty($_POST['requesttype']) && !empty($_POST['mycomments'])){

					$name =  mysqli_real_escape_string($conn,$_POST['myname']);
					$email = $_POST['myemail'];
					$reference = $_POST['reference'];
					$requesttype = $_POST['requesttype'];
					$comments = mysqli_real_escape_string($conn, $_POST['mycomments']);

					$sql = "INSERT INTO contact( myname, email, reference, requesttype, comment) VALUES ('$name', '$email', '$reference', '$requesttype', '$comment')";

					if($conn->query($sql)) {

							echo "<h1>Thank's for the Feedback</h1>";
              //header('Location: thank-you.html');
              exit();


					} else {
							echo "Error: " . $sql . "<br>" . $conn->error;
					}


					$conn->close();

			}


	}