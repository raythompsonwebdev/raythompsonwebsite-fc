<?php
// Put all of your general functions in this file

// header redirection often requires output buffering
// to be turned on in php.ini.
function redirect_to($new_location) {
  header("Location: " . $new_location);
  exit;
}

// Make sanitizing easy and you will do it often

// Sanitize for HTML output
function h($string) {
	return htmlspecialchars($string);
}

// Sanitize for JavaScript output
function j($string) {
	return json_encode($string);
}

// Sanitize for use in a URL
function u($string) {
	return urlencode($string);
}

// * validate value is a number
// submitted values are strings, so use is_numeric instead of is_int
// options: max, min
// has_number($items_to_order, ['min' => 1, 'max' => 5])
function has_number($value, $options=[]) {
	if(!is_numeric($value)) {
		return false;
	}
	if(isset($options['max']) && ($value > (int)$options['max'])) {
		return false;
	}
	if(isset($options['min']) && ($value < (int)$options['min'])) {
		return false;
	}
	return true;
}

// * validate value has a format matching a regular expression
// Be sure to use anchor expressions to match start and end of string.
// (Use \A and \Z, not ^ and $ which allow line returns.)
//
// Example:
// has_format_matching('1234', '/\d{4}/') is true
// has_format_matching('12345', '/\d{4}/') is also true
// has_format_matching('12345', '/\A\d{4}\Z/') is false
function has_format_matching($value, $regex='//') {
	return preg_match($regex, $value);
}

// Usage examples, leave commented out
// echo h("<h1>Test string</h1><br />");
// echo j("'}; alert('Gotcha!'); //");
// echo u("?title=Working? Or not?");

// * validate value has presence
// use trim() so empty spaces don't count
// use === to avoid false positives
// empty() would consider "0" to be empty
function has_presence($value) {
	$trimmed_value = trim($value);
  return isset($trimmed_value) && $trimmed_value !== "";
}

?>
