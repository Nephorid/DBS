<?php
session_start();
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    $profile_id = $_POST['id'];

    if (!empty($profile_id)) {
        $sql = "DELETE FROM logins WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $profile_id);

        if ($stmt->execute()) {
            echo "Profil silindi!";
        } else {
            echo "Profil silme hatası!";
        }

        $stmt->close();
    } else {
        echo "Geçersiz profil ID!";
    }

    $conn->close();
} else {
    echo "Geçersiz istek!";
}
?>
