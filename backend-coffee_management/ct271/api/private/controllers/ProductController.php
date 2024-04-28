<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Model\Product;

class ProductController extends Controller
{
    public function read($id = '')
    {
        $product = new Product();
        if ($id) {
            $data = $product->where('product_id', $id);
            if (is_array($data)) {
                echo json_encode($data);
            }
        } else {
            $data = $product->findAll();
            if (is_array($data)) {
                echo json_encode($data);
            }
        }
    }

    public function create($product_data = [])
    {
        $product = new Product();
        $data['product_id'] = $product->id_generator('E', 'product_id');
        $data['product_name'] = $product_data['product_name'];
        $data['product_active'] = $product_data['product_active'];
        $data['product_price_s'] = $product_data['product_price_s'];
        $data['product_price_m'] = $product_data['product_price_m'];
        $data['product_price_l'] = $product_data['product_price_l'];
        $data['product_cost_s'] = $product_data['product_cost_s'];
        $data['product_cost_m'] = $product_data['product_cost_m'];
        $data['product_cost_l'] = $product_data['product_cost_l'];

        $result = $product->insert($data);
        if (!$result) {
            echo json_encode(['message' => 'Product created successfully']);
        } else {
            echo json_encode(['message' => 'Product created failed']);
        }
    }

    public function update($product_data = [], $id)
    {
        $product = new Product();
        $data['product_name'] = $product_data['product_name'];
        $data['product_active'] = $product_data['product_active'];
        $data['product_price_s'] = $product_data['product_price_s'];
        $data['product_price_m'] = $product_data['product_price_m'];
        $data['product_price_l'] = $product_data['product_price_l'];
        $data['product_cost_s'] = $product_data['product_cost_s'];
        $data['product_cost_m'] = $product_data['product_cost_m'];
        $data['product_cost_l'] = $product_data['product_cost_l'];
        $result = $product->update($data, 'product_id = ' . "'$id'");
        if ($result) {
            return json_encode(['message' => 'Product updated successfully']);
        } else {
            return json_encode(['message' => 'Product updated failed']);
        }
    }

    public function delete($id)
    {
        $product = new Product();
        $result = $product->delete('product_id = ' . "'$id'");
        if ($result) {
            return json_encode(['message' => 'Product deleted successfully']);
        } else {
            return json_encode(['message' => 'Product deleted failed']);
        }
    }

    public function count()
    {
        $product = new Product();
        $result = $product->findAll();
        echo json_encode(count($result));
    }
}