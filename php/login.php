<?php
session_start();
include 'config.php'; 

header('Content-Type: application/json');

$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM logins WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $username;
            $_SESSION['user_id'] = $user['id']; 

            $response['success'] = true;
            $response['redirect'] = '../pages/dashboard.html';
        } else {
            $response['success'] = false;
            $response['message'] = 'Yanlış şifre!';
        }
    } else {
        $response['success'] = false;
        $response['message'] = 'Kullanıcı bulunamadı!';
    }

    $stmt->close();
    $conn->close();
} else {
    $response['success'] = false;
    $response['message'] = 'Geçersiz istek!';
}

echo json_encode($response);
?>
