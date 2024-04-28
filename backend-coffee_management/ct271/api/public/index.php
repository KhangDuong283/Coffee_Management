<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Credentials: true");


date_default_timezone_set('Asia/Ho_Chi_Minh');

session_start();
require "../private/core/autoload.php";

use App\Core\App;

$app = new App();