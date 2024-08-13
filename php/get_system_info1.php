<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "SystemInfoDB";

// Veritabanı bağlantısı oluşturma
$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantı hatası kontrolü
if ($conn->connect_error) {
    die(json_encode(["error" => "Veritabanı bağlantı hatası: " . $conn->connect_error]));
}

// SQL sorgusunu oluşturma
$sql = "
SELECT 
    u.id,
    u.user_name,
    u.gsm,
    u.email,
    ci.cpu_markasi AS cpu_brand,
    ci.cpu_modeli AS cpu_model,
    ci.cpu_hizi AS cpu_speed,
    ri.ram_size,
    ri.ram_type,
    di.disk1_markasi AS disk1_brand,
    di.disk1_modeli AS disk1_model,
    di.disk1_boyutu AS disk1_size,
    di.disk1_turu AS disk1_type,
    di.disk2_markasi AS disk2_brand,
    di.disk2_modeli AS disk2_model,
    di.disk2_boyutu AS disk2_size,
    di.disk2_turu AS disk2_type,
    gi.gpu_brand,
    gi.gpu_model,
    gi.gpu_memory,
    d.name AS department_name
FROM users u
LEFT JOIN cpu_info ci ON u.id = ci.user_id
LEFT JOIN ram_info ri ON u.id = ri.user_id
LEFT JOIN disk_info di ON u.id = di.user_id
LEFT JOIN gpu_info gi ON u.id = gi.user_id
LEFT JOIN departments d ON u.department_id = d.id
";

// Filtreleri ekleme
$filters = array();

if (isset($_GET['department']) && !empty($_GET['department'])) {
    $department = $conn->real_escape_string($_GET['department']);
    $filters[] = "d.name = '$department'";
}

if (isset($_GET['name']) && !empty($_GET['name'])) {
    $name = $conn->real_escape_string($_GET['name']);
    $filters[] = "u.user_name LIKE '%$name%'";
}

if (!empty($filters)) {
    $sql .= " WHERE " . implode(" AND ", $filters);
}

// Sorguyu yürütme
$result = $conn->query($sql);

if (!$result) {
    die(json_encode(["error" => "Sorgu hatası: " . $conn->error]));
}

// Veriyi JSON formatına dönüştürme
$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Toplam bilgisini hesaplama
$sqlCount = "SELECT COUNT(*) AS computer_count FROM users";
$resultCount = $conn->query($sqlCount);
$computerCount = 0;

if ($resultCount->num_rows > 0) {
    $row = $resultCount->fetch_assoc();
    $computerCount = $row['computer_count'];
}

// Departman sayımlarını alma
$sqlDepartmentCounts = "
SELECT d.name AS department_name, COUNT(u.id) AS computer_count
FROM departments d
LEFT JOIN users u ON d.id = u.department_id
GROUP BY d.name
";

$resultDepartmentCounts = $conn->query($sqlDepartmentCounts);

$departmentCounts = array();

if ($resultDepartmentCounts->num_rows > 0) {
    while($row = $resultDepartmentCounts->fetch_assoc()) {
        $departmentCounts[] = $row;
    }
}

// Veritabanı bağlantısını kapatma
$conn->close();

// JSON çıktısı oluşturma
echo json_encode([
    "department_counts" => $departmentCounts,
    "data" => $data,
    "computer_count" => $computerCount
], JSON_PRETTY_PRINT);
?>
