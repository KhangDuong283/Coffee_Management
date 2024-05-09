<?php
namespace App\Core;

use App\Controllers\AdminController;
use App\Controllers\BillController;
use App\Controllers\BillProductController;
use App\Controllers\EmployeeController;
use App\Controllers\ProductController;
use App\Model\Branche;
use App\Controllers\BrancheController;

class App
{
    private $db;
    public $result = "{}";
    public function __construct()
    {
        $url = $this->getURL();
        // print_r($url);
        // Gắn giá trị đầu tiên của mảng URL vào biến $table để gọi controller tương ứng
        $table = $url[0];
        unset($url[0]);

        $param = array_values($url);

        if (is_callable([$this, $table])) {
            $this->result = $this->$table($param);
        } else {
            echo "Can't find the table on 'app.php' !! <br>";
        }
    }

    private function branches($param = [])
    {
        $branch = new BrancheController();
        $method = $_SERVER['REQUEST_METHOD'];
        // endpoint là phần sau /branches/ có thể là id hoặc "count"
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
                // Thêm tham số true để dữ liệu nhận được là mảng thay vì đối tượng (Object)
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

    private function admins($param = [])
    {
        $admin = new AdminController();
        $method = $_SERVER['REQUEST_METHOD'];
        $endpoint = isset($param[0]) ? $param[0] : null;
        $id = isset($param[1]) ? $param[1] : null;

        switch ($method) {
            case "GET":
                if ($endpoint == "count") {
                    return $admin->count();
                } elseif (isset($endpoint)) {
                    return $admin->read($endpoint);
                } elseif (!isset($endpoint)) {
                    return $admin->read();
                }
            case "POST":
                $data = json_decode(file_get_contents('php://input'), true);
                return $admin->create($data);
            case "PUT":
                if (isset($endpoint)) {
                    $data = json_decode(file_get_contents('php://input'), true);
                    return $admin->update($data, $endpoint);
                }
            case "DELETE":
                if (isset($endpoint)) {
                    return $admin->delete($endpoint);
                }
        }
    }

    private function employees($param = [])
    {
        $empl = new EmployeeController();
        $method = $_SERVER['REQUEST_METHOD'];
        $endpoint = isset($param[0]) ? $param[0] : null;
        $id = isset($param[1]) ? $param[1] : null;

        switch ($method) {
            case "GET":
                if ($endpoint == "count") {
                    return $empl->count();
                } elseif (isset($endpoint)) {
                    return $empl->read($endpoint);
                } elseif (!isset($endpoint)) {
                    return $empl->read();
                }
            case "POST":
                $data = json_decode(file_get_contents('php://input'), true);
                return $empl->create($data);
            case "PUT":
                if (isset($endpoint)) {
                    $data = json_decode(file_get_contents('php://input'), true);
                    return $empl->update($data, $endpoint);
                }
            case "DELETE":
                if (isset($endpoint)) {
                    return $empl->delete($endpoint);
                }
        }
    }

    private function products($param = [])
    {
        $product = new ProductController();
        $method = $_SERVER['REQUEST_METHOD'];
        $endpoint = isset($param[0]) ? $param[0] : null;
        $id = isset($param[1]) ? $param[1] : null;

        if ($method == "POST" && isset($endpoint)) {
            $method = "update";
        }

        switch ($method) {
            case "GET":
                if ($endpoint == "count") {
                    return $product->count();
                } elseif (isset($endpoint)) {
                    return $product->read($endpoint);
                } elseif (!isset($endpoint)) {
                    return $product->read();
                }
            case "POST":
                $data = $_POST;
                if (isset($_FILES['product_img'])) {
                    $data['product_img'] = $_FILES['product_img'];
                } else {
                    $data['product_img'] = null;
                }

                return $product->create($data);
            case "update":
                if (isset($endpoint)) {
                    $data = $_POST;
                    if (isset($_FILES['product_img'])) {
                        $data['product_img'] = $_FILES['product_img'];
                    } else {
                        $data['product_img'] = null;
                    }

                    return $product->update($data, $endpoint);
                }
            case "DELETE":
                if (isset($endpoint)) {
                    return $product->delete($endpoint);
                }
        }
    }

    private function bills($param = [])
    {
        $bill = new BillController();
        $method = $_SERVER['REQUEST_METHOD'];
        $endpoint = isset($param[0]) ? $param[0] : null;
        $id = isset($param[1]) ? $param[1] : null;

        switch ($method) {
            case "GET":
                if ($endpoint == "count") {
                    return $bill->count();
                } elseif (isset($endpoint)) {
                    return $bill->read($endpoint);
                } elseif (!isset($endpoint)) {
                    return $bill->read();
                }
            case "POST":
                $data = json_decode(file_get_contents('php://input'), true);
                return $bill->create($data);
            case "PUT":
                if (isset($endpoint)) {
                    $data = json_decode(file_get_contents('php://input'), true);
                    return $bill->update($data, $endpoint);
                }
            case "DELETE":
                if (isset($endpoint)) {
                    return $bill->delete($endpoint);
                }
        }
    }

    private function billproducts($param = [])
    {
        $billproduct = new BillProductController();
        $method = $_SERVER['REQUEST_METHOD'];
        $endpoint = isset($param[0]) ? $param[0] : null;
        $id = isset($param[1]) ? $param[1] : null;

        switch ($method) {
            case "GET":
                if ($endpoint == "count") {
                    return $billproduct->count();
                } elseif (isset($endpoint)) {
                    return $billproduct->read($endpoint);
                } elseif (!isset($endpoint)) {
                    return $billproduct->read();
                }
            case "POST":
                $data = json_decode(file_get_contents('php://input'), true);
                return $billproduct->create($data);
            case "PUT":
                if (isset($endpoint)) {
                    $data = json_decode(file_get_contents('php://input'), true);
                    // return $billproduct->update($data, $endpoint);
                }
            case "DELETE":
                if (isset($endpoint)) {
                    // return $billproduct->delete($endpoint);
                }
        }
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