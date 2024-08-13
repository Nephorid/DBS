<?php
include 'config.php'; // Veritabanı bağlantısı

// Eklenecek admin hesabı bilgileri
$username = 'admin';
$password = 'admin123';

// Şifreyi hash'leme
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// SQL sorgusu hazırlama
$sql = "INSERT INTO logins (username, password) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $hashed_password);

// Sorguyu çalıştırma ve sonucu kontrol etme
if ($stmt->execute()) {
    echo "Admin hesabı başarıyla eklendi!";
} else {
    echo "Admin hesabı eklenirken hata oluştu: " . $conn->error;
}

// Bağlantıyı kapatma
$stmt->close();
$conn->close();
?>
