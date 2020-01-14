<?php
include "conn.php";
if (isset($_GET['sid'])) {
    $sid = $_GET['sid'];
    if ($sid <= 20) {
        $result = $conn->query("select * from bestchoosepic where sid=$sid");
    } else {
        $result = $conn->query("select * from fruitpic where sid=$sid");
    }

    echo json_encode($result->fetch_assoc());
} else {
    exit('非法操作');
}
