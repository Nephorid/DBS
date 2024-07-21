<?php
session_start();
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    $user_id = $_SESSION['user_id'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    if (!empty($password)) {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "UPDATE logins SET username = ?, password = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssi", $username, $hashed_password, $user_id);
    } else {
        $sql = "UPDATE logins SET username = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $username, $user_id);
    }

    if ($stmt->execute()) {
        echo "Profil güncellendi!";
    } else {
        echo "Güncelleme hatası!";
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Geçersiz istek!";
}
?>
