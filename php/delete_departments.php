<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "SystemInfoDB";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}

if (isset($_POST['id'])) {
    $department_id = $_POST['id'];

    $sql = "DELETE FROM departments WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $department_id);

    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Departman başarıyla silindi."));
    } else {
        echo json_encode(array("success" => false, "message" => "Departman silinemedi."));
    }

    $stmt->close();
} else {
    echo json_encode(array("success" => false, "message" => "Geçerli bir department_id sağlanmadı."));
}

$conn->close();
?>
