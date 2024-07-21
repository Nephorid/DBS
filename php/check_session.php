<?php
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    echo json_encode(array("status" => "error", "message" => "Oturum açılmamış!"));
    exit;
}

echo json_encode(array("status" => "success", "username" => $_SESSION['username']));
exit;
?>
