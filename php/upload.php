<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['fileToUpload']) && $_FILES['fileToUpload']['error'] === UPLOAD_ERR_OK) {
        $target_dir = "uploads/";
        $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
        $uploadOk = 1;
        $fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        if (!file_exists($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        if ($fileType != "txt") {
            echo "Yalnızca TXT dosyalarına izin verilir.";
            $uploadOk = 0;
        }

        if ($uploadOk == 0) {
            echo "Dosya yüklenmedi.";
        } else {
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
                echo "Dosya ". htmlspecialchars(basename($_FILES["fileToUpload"]["name"])) . " başarıyla yüklendi.<br>";
                parseAndInsertData($target_file);
            } else {
                echo "Dosya yükleme sırasında bir hata oluştu.";
            }
        }
    } else {
        echo "Dosya yükleme sırasında bir hata oluştu veya dosya yüklenmedi.";
    }
} else {
    echo "Dosya yükleme formu ile gelmelidir.";
}

function parseAndInsertData($filePath) {
    $fileContent = file_get_contents($filePath);
    $lines = explode("\n", $fileContent);

    $userName = "";
    $gsm = "";
    $email = "";
    $cpuModel = "";
    $ramSize = "";
    $ramType = "";
    $disks = [];
    $gpuModel = "";
    $gpuMemory = "";

    foreach ($lines as $line) {
        if (strpos($line, "Ad:") !== false) {
            $userName = trim(explode(":", $line)[1]);
        }
        if (strpos($line, "GSM NO:") !== false) {
            $gsm = trim(explode(":", $line)[1]);
        }
        if (strpos($line, "E-posta:") !== false) {
            $email = trim(explode(":", $line)[1]);
        }
        if (strpos($line, "CPU Modeli:") !== false) {
            $cpuModel = trim(explode(":", $line)[1]);
        }
        if (strpos($line, "RAM Boyutu:") !== false) {
            $ramSize = trim(explode(":", $line)[1]);
        }
        if (strpos($line, "RAM Türü:") !== false) {
            $ramType = trim(explode(":", $line)[1]);
        }
        if (preg_match("/Disk(\d+) Modeli:/", $line, $matches)) {
            $index = $matches[1] - 1;
            $disks[$index]['model'] = trim(explode(":", $line)[1]);
        }
        if (preg_match("/Disk(\d+) Boyutu:/", $line, $matches)) {
            $index = $matches[1] - 1;
            $disks[$index]['size'] = trim(explode(":", $line)[1]);
        }
        if (preg_match("/Disk(\d+) Türü:/", $line, $matches)) {
            $index = $matches[1] - 1;
            $disks[$index]['type'] = trim(explode(":", $line)[1]);
        }
        if (strpos($line, "GPU Modeli:") !== false) {
            $gpuModel = trim(explode(":", $line)[1]);
        }
        if (strpos($line, "GPU Belleği:") !== false) {
            $gpuMemory = trim(explode(":", $line)[1]);
        }
    }

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "SystemInfoDB";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Bağlantı hatası: " . $conn->connect_error);
    }

    $userName = mysqli_real_escape_string($conn, $userName);
    $gsm = mysqli_real_escape_string($conn, $gsm);
    $email = mysqli_real_escape_string($conn, $email);
    $cpuModel = mysqli_real_escape_string($conn, $cpuModel);
    $ramSize = mysqli_real_escape_string($conn, $ramSize);
    $ramType = mysqli_real_escape_string($conn, $ramType);
    $gpuModel = mysqli_real_escape_string($conn, $gpuModel);
    $gpuMemory = mysqli_real_escape_string($conn, $gpuMemory);

    $sqlUser = "INSERT INTO users (user_name, gsm, email) VALUES ('$userName', '$gsm', '$email')";
    if ($conn->query($sqlUser) === TRUE) {
        $userId = $conn->insert_id;

        $sqlCPU = "INSERT INTO cpu_info (user_id, cpu_model) VALUES ('$userId', '$cpuModel')";
        $conn->query($sqlCPU);

        $sqlRAM = "INSERT INTO ram_info (user_id, ram_size, ram_type) VALUES ('$userId', '$ramSize', '$ramType')";
        $conn->query($sqlRAM);

        $disk1_model = isset($disks[0]['model']) ? mysqli_real_escape_string($conn, $disks[0]['model']) : "NULL";
        $disk1_size = isset($disks[0]['size']) ? mysqli_real_escape_string($conn, $disks[0]['size']) : "NULL";
        $disk1_type = isset($disks[0]['type']) ? mysqli_real_escape_string($conn, $disks[0]['type']) : "NULL";
        $disk2_model = isset($disks[1]['model']) ? mysqli_real_escape_string($conn, $disks[1]['model']) : "NULL";
        $disk2_size = isset($disks[1]['size']) ? mysqli_real_escape_string($conn, $disks[1]['size']) : "NULL";
        $disk2_type = isset($disks[1]['type']) ? mysqli_real_escape_string($conn, $disks[1]['type']) : "NULL";

        $sqlDisk = "INSERT INTO disk_info (user_id, disk1_model, disk1_size, disk1_type, disk2_model, disk2_size, disk2_type) VALUES ('$userId', '$disk1_model', '$disk1_size', '$disk1_type', '$disk2_model', '$disk2_size', '$disk2_type')";
        $conn->query($sqlDisk);

        $sqlGPU = "INSERT INTO gpu_info (user_id, gpu_model, gpu_memory) VALUES ('$userId', '$gpuModel', '$gpuMemory')";
        $conn->query($sqlGPU);

        echo "kaydedildi";
    } else {
        echo "hata : " . $conn->error;
    }

    $conn->close();
}
?>
