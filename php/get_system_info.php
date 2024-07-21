<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "SystemInfoDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Veritabanı bağlantı hatası: " . $conn->connect_error);
}

$sql = "
SELECT 
    u.id,
    u.user_name,
    u.gsm,
    u.email,
    ci.cpu_model,
    ri.ram_size,
    ri.ram_type,
    di.disk1_model,
    di.disk1_size,
    di.disk1_type,
    di.disk2_model,
    di.disk2_size,
    di.disk2_type,
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

$result = $conn->query($sql);

if (!$result) {
    die("Sorgu hatası: " . $conn->error);
}

$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($data);
?>
