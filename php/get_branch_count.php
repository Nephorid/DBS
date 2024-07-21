<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "SystemInfoDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Veritabanı bağlantı hatası: " . $conn->connect_error]));
}

$sql = "SELECT COUNT(*) as name_count FROM departments";
$result = $conn->query($sql);

$response = array();

if ($result) {
    $row = $result->fetch_assoc();
    $response['branch_count'] = $row['name_count'];
} else {
    $response['branch_count'] = 0;
    $response['error'] = "Veritabanı sorgu hatası: " . $conn->error;
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>
