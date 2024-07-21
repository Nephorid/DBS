<?php
include 'config.php';

header('Content-Type: application/json'); 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];

    $conn->begin_transaction();

    try {
        $sql5 = "DELETE FROM disk_info WHERE user_id = ?";
        $stmt5 = $conn->prepare($sql5);
        $stmt5->bind_param('i', $id);
        $stmt5->execute();

        $sql6 = "DELETE FROM gpu_info WHERE user_id = ?";
        $stmt6 = $conn->prepare($sql6);
        $stmt6->bind_param('i', $id);
        $stmt6->execute();

        $sql4 = "DELETE FROM ram_info WHERE user_id = ?";
        $stmt4 = $conn->prepare($sql4);
        $stmt4->bind_param('i', $id);
        $stmt4->execute();

        $sql3 = "DELETE FROM cpu_info WHERE user_id = ?";
        $stmt3 = $conn->prepare($sql3);
        $stmt3->bind_param('i', $id);
        $stmt3->execute();

        $sql2 = "DELETE FROM users WHERE id = ?";
        $stmt2 = $conn->prepare($sql2);
        $stmt2->bind_param('i', $id);
        $stmt2->execute();

        $conn->commit();
        echo json_encode(array("status" => "success")); 
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(array("status" => "error", "message" => $e->getMessage())); 
    }

    $stmt5->close();
    $stmt6->close();
    $stmt4->close();
    $stmt3->close();
    $stmt2->close();
    $conn->close();
}
?>
