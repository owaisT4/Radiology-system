<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");


$conn = new mysqli('localhost', 'root', '', 'radiology_db');

if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

$BodyArea = $_POST['body_area'] ?? '';
$ScanType = $_POST['scan_type'] ?? '';

$SQL = "SELECT estimate FROM scan_estimates WHERE body_area = ? AND scan_type = ? LIMIT 1";
$stmt = $conn->prepare($SQL);
$stmt->bind_param("ss", $BodyArea, $ScanType);
$stmt->execute();
$result = $stmt->get_result(); 

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([
        "estimate" => $row["estimate"]
    ]);
} else {
    echo json_encode([
        "estimate" => "No estimate found for the selected options"
    ]);
}

$stmt->close();
$conn->close(); 
?>

