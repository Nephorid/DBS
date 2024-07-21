<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "SystemInfoDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Veritabanı bağlantı hatası: " . $conn->connect_error]));
}

if (isset($_POST['name'])) {
    $name = $conn->real_escape_string($_POST['name']);
    $sql = "INSERT INTO departments (name) VALUES ('$name')";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => "Veritabanı hatası: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Şube adı belirtilmemiş"]);
}

$conn->close();
?>
