<?php
session_start();
include 'config.php';

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    $user_id = $_SESSION['user_id'];

    $sql = "
    SELECT 
        l.username, 
        l.password, 
        u.gsm, 
        u.email 
    FROM logins l
    LEFT JOIN users u ON l.user_id = u.id
    WHERE l.id = ?
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        echo json_encode(array(
            "username" => $user['username'],
            "gsm" => $user['gsm'],
            "email" => $user['email']
        ));
    } else {
        echo json_encode(array("error" => "Kullanıcı bulunamadı!"));
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(array("error" => "Oturum geçerli değil."));
}
?>
