<?php

include 'private/db_connection.php';

// check if form has been sumitted.
// NOTE : $_POST['submit] value equals NULL which is falsy.
if( !isset($_POST['submit']) ){

	if(!empty($_POST['myname']) && !empty($_POST['myemail']) && !empty($_POST['reference']) && !empty($_POST['requesttype']) && !empty($_POST['mycomments'])){

			// assign form values to variables passing text input in to htmlentites
			$name =  htmlentities($_POST['myname']);
			$email = $_POST['myemail'];
			$reference = $_POST['reference'];
			$requesttype = $_POST['requesttype'];
			$comments = htmlentities($_POST['mycomments']);

			//assign mysql insert statement to variable using questrion marks as placeholders.
			$sql = "INSERT INTO contact( myname, email, reference, requesttype, comment) VALUES (?,?,?,?,?)";

			// initialize statement to be prepared
			$stmt = mysqli_stmt_init($conn);


			// prepare statements
			mysqli_stmt_prepare($stmt , $sql);

			// bind form value variables to statements using interpolation
			mysqli_stmt_bind_param($stmt,"sssss",$name, $email, $reference, $requesttype, $comments );

			//execute statment
			mysqli_stmt_execute($stmt);

			// close connection
			$conn->close();

			//echo thank you message
			echo "<h1>Thank's for the Feedback</h1>";

		}else{

			echo "<h1>message not added</h1>";

		}

}

