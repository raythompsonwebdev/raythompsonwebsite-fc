<?php

/**
 * add tis to form
 * <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
 */

if (isset($_POST['myname'])) {
	$myname = $_POST['myname'];
} else {
	$myname = '';
}
if (isset($_POST['myemail'])) { $myemail = $_POST['myemail']; } else { $myemail = ''; }

if (isset($_POST['reference'])) { $reference = $_POST['reference']; } else { $reference = array(); }

if (isset($_POST['requesttype'])) { $requesttype = $_POST['requesttype']; } else { $requesttype = array(); }

if (isset($_POST['mycomments'])) {
	$mycomments = filter_var($_POST['mycomments'], FILTER_SANITIZE_STRING );
} else {
	$mycomments = '';
}

$formerrors = false;

if ($myname === '') :
	$err_myname = '<div class="error">Sorry, your name is a required field</div>';
	$formerrors = true;
endif; // input field empty

if ( !(preg_match('/[A-Za-z]+, [A-Za-z]+/', $myname)) ) :
	$err_patternmatch = '<div class="error">Sorry, the name must be in the format: Last, First</div>';
	$formerrors = true;
endif; // pattern doesn't match
