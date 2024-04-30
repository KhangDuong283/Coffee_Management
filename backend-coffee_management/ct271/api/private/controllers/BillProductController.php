<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Model\Bill;
use App\Model\BillProduct;

class BillProductController extends Controller
{
    public function read($id = '')
    {
        $billproduct = new BillProduct();
        if ($id) {
            $data = $billproduct->where('bill_id', $id);
            if (is_array($data)) {
                echo json_encode($data);
            } else {
                echo json_encode(['message' => 'Bill Product not found']);
            }
        } else {
            $data = $billproduct->findAll();
            if (is_array($data)) {
                echo json_encode($data);
            }
        }
    }

    public function create($billproduct_data = [])
    {
        $billproduct = new BillProduct();
        // $data['bill_id'] = $billproduct->id_generator('OD', 'bill_id');
        // $data['bill_datetime'] = date('Y-m-d H:i:s');
        $data['bill_id'] = $billproduct_data['bill_id'];
        $data['product_id'] = $billproduct_data['product_id'];

        $data['billproduct_quantity'] = $billproduct_data['billproduct_quantity'];
        $data['billproduct_price'] = $billproduct_data['billproduct_price'];
        $data['billproduct_size'] = $billproduct_data['billproduct_size'];
        $data['billproduct_cost'] = $billproduct_data['billproduct_cost'];


        $result = $billproduct->insert($data);
        // echo json_encode($result);
        if ($result == false) {
            echo json_encode(['message' => 'Bill Product created successfully']);
        } else {
            echo json_encode(['message' => 'Bill Product created failed']);
        }
    }

    
    public function delete($id)
    {
        $billproduct = new BillProduct();
        $result = $billproduct->delete('bill_id = ' . "'$id'");
        if ($result == '') {
            return json_encode(['message' => 'Bill Product deleted successfully']);
        } else {
            return json_encode(['message' => 'Bill Product deleted failed']);
        }
    }

    public function count()
    {
        $billproduct = new BillProduct();
        $result = $billproduct->findAll();
        echo json_encode(count($result));
    }
}