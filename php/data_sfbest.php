<?php
include "conn.php";

// $arr = array();

class move
{
}

$arr = new move();
$arr->bestchoosepic = array();
$arr->fruitpic = array();

$result1 = $conn->query("select * from bestchoosepic");
$result2 = $conn->query("select * from fruitpic");

for ($i = 0; $i < $result1->num_rows; $i++) {
    $arr->bestchoosepic[$i] = $result1->fetch_assoc();
}
for ($i = 0; $i < $result2->num_rows; $i++) {
    $arr->fruitpic[$i] = $result2->fetch_assoc();
}

echo json_encode($arr);
