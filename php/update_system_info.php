<?php
include 'config.php';

header('Content-Type: application/json');

// POST verilerini kontrol et
$id = $_POST['id'] ?? null;
$department_id = $_POST['department_id'] ?? null;
$user_name = $_POST['user_name'] ?? null;
$email = $_POST['email'] ?? null;
$gsm = $_POST['gsm'] ?? null;
$cpu_modeli = $_POST['cpu_modeli'] ?? null;
$cpu_markasi = $_POST['cpu_markasi'] ?? null;
$cpu_hizi = $_POST['cpu_hizi'] ?? null;
$ram_size = $_POST['ram_size'] ?? null;
$ram_type = $_POST['ram_type'] ?? null;
$disk1_modeli = $_POST['disk1_modeli'] ?? null;
$disk1_boyutu = $_POST['disk1_boyutu'] ?? null;
$disk1_turu = $_POST['disk1_turu'] ?? null;
$disk1_markasi = $_POST['disk1_markasi'] ?? null;
$disk2_modeli = $_POST['disk2_modeli'] ?? null;
$disk2_boyutu = $_POST['disk2_boyutu'] ?? null;
$disk2_turu = $_POST['disk2_turu'] ?? null;
$disk2_markasi = $_POST['disk2_markasi'] ?? null;
$gpu_model = $_POST['gpu_model'] ?? null;
$gpu_memory = $_POST['gpu_memory'] ?? null;
$gpu_brand = $_POST['gpu_brand'] ?? null;

if (is_null($id) || is_null($department_id) || is_null($user_name) || is_null($email) || is_null($gsm)) {
    echo json_encode(array("status" => "error", "message" => "Eksik veya geçersiz form verisi."));
    exit;
}

$conn->begin_transaction();

try {
    // users tablosunu güncelleme
    $stmt = $conn->prepare("UPDATE users SET department_id = ?, user_name = ?, email = ?, gsm = ? WHERE id = ?");
    if ($stmt === false) {
        throw new Exception("Statement prepare failed: " . $conn->error);
    }
    $stmt->bind_param('isssi', $department_id, $user_name, $email, $gsm, $id);
    $stmt->execute();

    // cpu_info tablosunu güncelleme
    $stmt = $conn->prepare("UPDATE cpu_info SET 
        cpu_modeli = COALESCE(NULLIF(?, ''), cpu_modeli), 
        cpu_markasi = COALESCE(NULLIF(?, ''), cpu_markasi), 
        cpu_hizi = COALESCE(NULLIF(?, ''), cpu_hizi) 
        WHERE user_id = ?");
    if ($stmt === false) {
        throw new Exception("Statement prepare failed: " . $conn->error);
    }
    $stmt->bind_param('sssi', $cpu_modeli, $cpu_markasi, $cpu_hizi, $id);
    $stmt->execute();

    // ram_info tablosunu güncelleme
    $stmt = $conn->prepare("UPDATE ram_info SET 
        ram_size = COALESCE(NULLIF(?, ''), ram_size), 
        ram_type = COALESCE(NULLIF(?, ''), ram_type) 
        WHERE user_id = ?");
    if ($stmt === false) {
        throw new Exception("Statement prepare failed: " . $conn->error);
    }
    $stmt->bind_param('ssi', $ram_size, $ram_type, $id);
    $stmt->execute();

    // disk_info tablosunu güncelleme
    $stmt = $conn->prepare("UPDATE disk_info SET 
        disk1_modeli = COALESCE(NULLIF(?, ''), disk1_modeli), 
        disk1_boyutu = COALESCE(NULLIF(?, ''), disk1_boyutu), 
        disk1_turu = COALESCE(NULLIF(?, ''), disk1_turu), 
        disk1_markasi = COALESCE(NULLIF(?, ''), disk1_markasi), 
        disk2_modeli = COALESCE(NULLIF(?, ''), disk2_modeli), 
        disk2_boyutu = COALESCE(NULLIF(?, ''), disk2_boyutu), 
        disk2_turu = COALESCE(NULLIF(?, ''), disk2_turu), 
        disk2_markasi = COALESCE(NULLIF(?, ''), disk2_markasi) 
        WHERE user_id = ?");
    if ($stmt === false) {
        throw new Exception("Statement prepare failed: " . $conn->error);
    }
    $stmt->bind_param('ssssssssi', $disk1_modeli, $disk1_boyutu, $disk1_turu, $disk1_markasi, 
                                 $disk2_modeli, $disk2_boyutu, $disk2_turu, $disk2_markasi, $id);
    $stmt->execute();

    // gpu_info tablosunu güncelleme
    $stmt = $conn->prepare("UPDATE gpu_info SET 
        gpu_model = COALESCE(NULLIF(?, ''), gpu_model), 
        gpu_memory = COALESCE(NULLIF(?, ''), gpu_memory), 
        gpu_brand = COALESCE(NULLIF(?, ''), gpu_brand) 
        WHERE user_id = ?");
    if ($stmt === false) {
        throw new Exception("Statement prepare failed: " . $conn->error);
    }
    $stmt->bind_param('sssi', $gpu_model, $gpu_memory, $gpu_brand, $id);
    $stmt->execute();

    $conn->commit();
    echo json_encode(array("status" => "success"));
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(array("status" => "error", "message" => $e->getMessage()));
}

$stmt->close();
$conn->close();
?>
