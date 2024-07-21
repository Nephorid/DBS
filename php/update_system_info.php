<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $department_id = $_POST['department_id'];
    $user_name = $_POST['user_name'];
    $email = $_POST['email'];
    $gsm = $_POST['gsm'];
    $cpu_model = $_POST['cpu_model'];
    $ram_size = $_POST['ram_size'];
    $ram_type = $_POST['ram_type'];
    $disk1_model = $_POST['disk1_model'];
    $disk1_size = $_POST['disk1_size'];
    $disk1_type = $_POST['disk1_type'];
    $disk2_model = $_POST['disk2_model'];
    $disk2_size = $_POST['disk2_size'];
    $disk2_type = $_POST['disk2_type'];
    $gpu_model = $_POST['gpu_model'];
    $gpu_memory = $_POST['gpu_memory'];

    $conn->begin_transaction();

    try {
        $sql1 = "UPDATE users
                 SET department_id = ?, user_name = ?, email = ?, gsm = ?
                 WHERE id = ?";
        $stmt1 = $conn->prepare($sql1);
        $stmt1->bind_param('isssi', $department_id, $user_name, $email, $gsm, $id);
        $stmt1->execute();

        $sql2 = "UPDATE cpu_info ci
                 JOIN users u ON u.id = ci.user_id
                 SET ci.cpu_model = ?
                 WHERE u.id = ?";
        $stmt2 = $conn->prepare($sql2);
        $stmt2->bind_param('si', $cpu_model, $id);
        $stmt2->execute();

        $sql3 = "UPDATE ram_info ri
                 JOIN users u ON u.id = ri.user_id
                 SET ri.ram_size = ?, ri.ram_type = ?
                 WHERE u.id = ?";
        $stmt3 = $conn->prepare($sql3);
        $stmt3->bind_param('ssi', $ram_size, $ram_type, $id);
        $stmt3->execute();

        $sql4 = "UPDATE disk_info di
                 JOIN users u ON u.id = di.user_id
                 SET di.disk1_model = ?, di.disk1_size = ?, di.disk1_type = ?, di.disk2_model = ?, di.disk2_size = ?, di.disk2_type = ?
                 WHERE u.id = ?";
        $stmt4 = $conn->prepare($sql4);
        $stmt4->bind_param('ssssssi', $disk1_model, $disk1_size, $disk1_type, $disk2_model, $disk2_size, $disk2_type, $id);
        $stmt4->execute();

        $sql5 = "UPDATE gpu_info gi
                 JOIN users u ON u.id = gi.user_id
                 SET gi.gpu_model = ?, gi.gpu_memory = ?
                 WHERE u.id = ?";
        $stmt5 = $conn->prepare($sql5);
        $stmt5->bind_param('ssi', $gpu_model, $gpu_memory, $id);
        $stmt5->execute();

        $conn->commit();
        echo json_encode(array("status" => "success"));
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(array("status" => "error", "message" => $e->getMessage()));
    }

    $stmt1->close();
    $stmt2->close();
    $stmt3->close();
    $stmt4->close();
    $stmt5->close();
    $conn->close();
}
?>
