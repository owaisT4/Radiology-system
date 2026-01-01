<?php
header("Content-Type: application/json");
include 'db.php';

// Get POST data
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// Validate input
if ($email === '' || $password === '') {
    echo json_encode([
        "success" => false,
        "message" => "Email and password required"
    ]);
    exit();
}

// Prepare statement
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "SQL prepare failed: " . $conn->error
    ]);
    exit();
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "message" => "User not found"
    ]);
    exit();
}

$user = $result->fetch_assoc();

// Verify password
if (password_verify($password, $user['password'])) {
    echo json_encode([
        "success" => true,
        "message" => "Login successful"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Incorrect password"
    ]);
}

// Close
$stmt->close();
$conn->close();
