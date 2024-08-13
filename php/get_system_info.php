<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "SystemInfoDB";

// Veritabanı bağlantısı oluşturma
$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantı hatası kontrolü
if ($conn->connect_error) {
    die("Veritabanı bağlantı hatası: " . $conn->connect_error);
}

// SQL sorgusunu oluşturma
$sql = "
SELECT 
    u.id,
    u.user_name,
    u.gsm,
    u.email,
    ci.cpu_markasi,
    ci.cpu_modeli,
    ci.cpu_hizi,
    ri.ram_size,
    ri.ram_type,
    di.disk1_markasi,
    di.disk1_modeli,
    di.disk1_boyutu,
    di.disk1_turu,
    di.disk2_markasi,
    di.disk2_modeli,
    di.disk2_boyutu,
    di.disk2_turu,
    gi.gpu_brand,      -- GPU markasını ekledik
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
    die("Sorgu hatası: " . $conn->error);
}

// Veriyi JSON formatına dönüştürme
$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Veritabanı bağlantısını kapatma
$conn->close();

// JSON çıktısı oluşturma
header('Content-Type: application/json');
echo json_encode($data, JSON_PRETTY_PRINT);
?>
