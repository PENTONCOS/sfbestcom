<?php
include "conn.php";

$arr = array();
$result = $conn->query("select * from bestchoosepic");
// echo $result = $conn->num_rows;
for ($i = 0; $i < $result->num_rows; $i++) {
    $arr[$i] = $result->fetch_assoc();
}

echo json_encode($arr);
