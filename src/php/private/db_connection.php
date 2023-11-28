<?php

try {

require 'db_connect-local.php';

// Create connection
$conn = new mysqli($host_name, $user_name, $password, $database);

// Check connection
if ($conn === false) {
    die('<h1>Failed to connect: '. $conn->connect_error .'</h1>');
  } 

} catch (Exception $e) {
	//show error if connection
	$error = $e->getMessage();

}
