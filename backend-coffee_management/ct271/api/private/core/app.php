<?php
namespace App\Core;

use App\Model\Branche;
use App\Controllers\BrancheController;

class App
{
    private $db;
    public $result = "{}";
    public function __construct()
    {
        $url = $this->getURL();
        $table = $url[0];
        unset($url[0]);

        $param = array_values($url);

        if (is_callable([$this, $table])) {
            $this->result = $this->$table($param);
        }
    }

    private function branches($param = [])
    {
        $branch = new BrancheController();
        $method = $_SERVER['REQUEST_METHOD'];
        $endpoint = isset($param[0]) ? $param[0] : null;
        $id = isset($param[1]) ? $param[1] : null;

        switch ($method) {
            case "GET":
                if ($endpoint == "count") {
                    return $branch->count();
                } elseif (isset($endpoint)) {
                    return $branch->read($endpoint);
                } elseif (!isset($endpoint)) {
                    return $branch->read();
                } 
            case "POST":
                $data = json_decode(file_get_contents('php://input'), true);
                return $branch->create($data);
            case "PUT":
                if (isset($endpoint)) {
                    $data = json_decode(file_get_contents('php://input'), true);
                    return $branch->update($data, $endpoint);
                }
            case "DELETE":
                if (isset($endpoint)) {
                    return $branch->delete($endpoint);
                }
        }
    }

    private function employees($param = [])
    {
        $empl = new BrancheController();
        $method = $_SERVER['REQUEST_METHOD'];
        $endpoint = isset($param[0]) ? $param[0] : null;
        $id = isset($param[1]) ? $param[1] : null;

        // switch ($method) {
        //     case "GET":
        //         if ($endpoint == "count") {
        //             return $branch->count();
        //         } elseif (isset($endpoint)) {
        //             return $branch->read($endpoint);
        //         } elseif (!isset($endpoint)) {
        //             return $branch->read();
        //         }
        //     case "POST":
        //         $data = json_decode(file_get_contents('php://input'), true);
        //         return $branch->create($data);
        //     case "PUT":
        //         if (isset($endpoint)) {
        //             $data = json_decode(file_get_contents('php://input'), true);
        //             return $branch->update($data, $endpoint);
        //         }
        //     case "DELETE":
        //         if (isset($endpoint)) {
        //             return $branch->delete($endpoint);
        //         }
        // }
    }


    public function getURL()
    {
        // Bỏ các dấu "/" thừa
        $url = empty($_GET['url']) ? "" : trim($_GET['url'], "/");
        // Lọc lỗi URL
        $urlFilter = filter_var($url, FILTER_SANITIZE_URL);
        // Trả về mảng
        return explode("/", $urlFilter);
    }
}