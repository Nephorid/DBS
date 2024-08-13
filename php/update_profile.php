<?php
session_start();
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    $user_id = $_SESSION['user_id'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $gsm = $_POST['gsm'];
    $email = $_POST['email'];

    // Veritabanı işlemleri başlamadan önce hata kontrolü yapalım
    $conn->begin_transaction();

    try {
        // Şifre boş değilse, logins tablosunu güncelle
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

        if (!$stmt->execute()) {
            throw new Exception("Logins tablosu güncellenemedi: " . $stmt->error);
        }

        // Users tablosunu güncelle
        $sql = "UPDATE users SET gsm = ?, email = ? WHERE id = (SELECT user_id FROM logins WHERE id = ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssi", $gsm, $email, $user_id);

        if (!$stmt->execute()) {
            throw new Exception("Users tablosu güncellenemedi: " . $stmt->error);
        }

        // İşlemleri başarıyla tamamla
        $conn->commit();
        echo "Profil güncellendi!";
    } catch (Exception $e) {
        // Herhangi bir hata durumunda işlemleri geri al
        $conn->rollback();
        echo "Güncelleme hatası: " . $e->getMessage();
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Geçersiz istek!";
}
?>
