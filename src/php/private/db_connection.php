<?php

try {

require 'db_connectlocal.php';

// Create connection
$conn = new mysqli($host_name, $user_name, $password, $database);

// Check connection
if ($conn->connect_error) {

    die('<p>Failed to connect: '. $conn->connect_error .'</p>');
  } else {
    echo '<p>Connection Sucessful</p>';
  }

} catch (Exception $e) {
	//show error if connection
	$error = $e->getMessage();

}
