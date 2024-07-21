<?php
session_start();
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if (!empty($username) && !empty($password)) {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO logins (username, password) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $username, $hashed_password);

        if ($stmt->execute()) {
            echo "Yeni profil eklendi!";
        } else {
            echo "Profil ekleme hatası!";
        }

        $stmt->close();
    } else {
        echo "Kullanıcı adı ve şifre gerekli!";
    }

    $conn->close();
} else {
    echo "Geçersiz istek!";
}
?>
