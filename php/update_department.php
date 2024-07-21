<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "SystemInfoDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Veritabanı bağlantı hatası: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = $_POST['id'];
    $departmentId = $_POST['department_id'];

    $sql = "UPDATE users SET department_id = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $departmentId, $userId);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Güncelleme sırasında hata oluştu.']);
    }

    $stmt->close();
}

$conn->close();
?>
