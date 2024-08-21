<?php
$host = "localhost";
$dbname = "dbms_project";
$user = "postgres"; 
$password = "shreyas@4563";

// Connect to PostgreSQL
$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Connection failed: " . pg_last_error());
}

$sql = "SELECT id, name, email FROM users";
$result = pg_query($conn, $sql);

$users = [];
if ($result) {
    while ($row = pg_fetch_assoc($result)) {
        $users[] = $row;
    }
} else {
    echo json_encode(["message" => "Error: " . pg_last_error($conn)]);
}

echo json_encode($users);

pg_close($conn);
?>
