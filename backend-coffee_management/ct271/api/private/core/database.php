<?php
/**
 *  Database connection
 */

namespace App\Core;

use PDO;

class Database
{
    private function connect()
    {
        if (class_exists('PDO')) {
            $dsn = 'mysql:dbname=' . _DB . ';host=' . _HOST;

            $option = [
                PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4',
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ];

            $connect = new PDO($dsn, _USER, _PASS, $option);
            if (!$connect) {
                die("Could not connect to databases!");
            } else {
                return $connect;
            }
        } else {
            echo "PDO class not found!";
        }
    }

    public function query($sql, $data = [], $data_type = "object")
    {
        $conn = $this->connect();
        $statement = $conn->prepare($sql);
        // echo "$sql";
        if ($statement) {
            $check = empty($data) ? $statement->execute() : $statement->execute($data);
            if ($check) {
                $data = $data_type == "object" ?
                    $data = $statement->fetchAll(PDO::FETCH_OBJ) :
                    $data = $statement->fetchAll(PDO::FETCH_ASSOC);
            }
            if (is_array($data) && count($data) > 0) {
                return $data;
            }
        }
        return false;
    }
}
