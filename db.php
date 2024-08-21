<?php
// Database connection parameters
$host = "localhost";
$dbname = "dbms_project";
$user = "postgres"; 
$password = "shreyas@4563"; 

// Connect to PostgreSQL
$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Connection failed: " . pg_last_error());
}

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);
$action = $data['action'];

// Check if action is defined
if (!$action) {
    die("No action specified");
}

if ($action == 'add') {
    $name = $data['name'];
    $email = $data['email'];
    $sql = "INSERT INTO users (name, email) VALUES ('$name', '$email')";
    $result = pg_query($conn, $sql);
    if ($result) {
        echo json_encode(["message" => "New record created successfully"]);
    } else {
        echo json_encode(["message" => "Error: " . pg_last_error($conn)]);
    }
} elseif ($action == 'update') {
    $id = $data['id'];
    $name = $data['name'];
    $email = $data['email'];
    $sql = "UPDATE users SET name='$name', email='$email' WHERE id=$id";
    $result = pg_query($conn, $sql);
    if ($result) {
        echo json_encode(["message" => "Record updated successfully"]);
    } else {
        echo json_encode(["message" => "Error: " . pg_last_error($conn)]);
    }
} elseif ($action == 'delete') {
    $id = $data['id'];
    $sql = "DELETE FROM users WHERE id=$id";
    $result = pg_query($conn, $sql);
    if ($result) {
        echo json_encode(["message" => "Record deleted successfully"]);
    } else {
        echo json_encode(["message" => "Error: " . pg_last_error($conn)]);
    }
}

pg_close($conn);
?>
