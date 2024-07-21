<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "SystemInfoDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Veritabanı bağlantı hatası: " . $conn->connect_error);
}

$sql = "SELECT id, name FROM departments";
$result = $conn->query($sql);

$departments = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $departments[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($departments);
?>
