<?php
session_start();
include 'config.php';

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    $sql = "SELECT id, username FROM logins";
    $result = $conn->query($sql);

    $profiles = array();
    while ($row = $result->fetch_assoc()) {
        $profiles[] = $row;
    }

    echo json_encode(array("profiles" => $profiles));

    $conn->close();
} else {
    echo json_encode(array("error" => "Oturum geçerli değil."));
}
?>
