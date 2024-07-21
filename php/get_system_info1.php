<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "SystemInfoDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Veritabanı bağlantı hatası: " . $conn->connect_error]));
}

$sql = "
    SELECT  
    u.user_name,
    ci.cpu_model,
    ri.ram_size,
    ri.ram_type,
    di.disk1_model AS disk1_model,
    di.disk1_size AS disk1_size,
    di.disk1_type AS disk1_type,
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

$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

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

$sqlCount = "SELECT COUNT(*) AS computer_count FROM users";
$resultCount = $conn->query($sqlCount);
$computerCount = 0;

if ($resultCount->num_rows > 0) {
    $row = $resultCount->fetch_assoc();
    $computerCount = $row['computer_count'];
}

$conn->close();
header('Content-Type: application/json');
echo json_encode([
    "department_counts" => $departmentCounts,
    "data" => $data,
    "computer_count" => $computerCount,
    "data" => $data
]);

?>
