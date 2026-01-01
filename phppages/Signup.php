<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo "POST required";
    exit();
}

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if ($email === '' || $password === '') {
    echo "Email and password required";
    exit();
}

$hashed = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (email, password) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo "Prepare failed: " . $conn->error;
    exit();
}

$stmt->bind_param("ss", $email, $hashed);

if ($stmt->execute()) {
    echo "User registered successfully";
} else {
    echo "Insert failed: " . $stmt->error;
}

$stmt->close();
$conn->close();
