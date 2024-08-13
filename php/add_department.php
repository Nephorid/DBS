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

if (isset($_POST['branchName']) && isset($_POST['category_id']) && isset($_POST['subcategory_id'])) {
    $name = $conn->real_escape_string($_POST['branchName']);
    $category_id = $conn->real_escape_string($_POST['category_id']);
    $subcategory_id = $conn->real_escape_string($_POST['subcategory_id']);
    
    $sql = "INSERT INTO departments (name, category_id, subcategory_id) VALUES ('$name', '$category_id', '$subcategory_id')";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => "Veritabanı hatası: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Gerekli veriler eksik: Kategori ve/veya alt kategori belirtilmemiş"]);
}

$conn->close();
?>
