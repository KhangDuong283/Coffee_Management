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
        $data['product_id'] = $product->id_generator('P', 'product_id');
        $data['product_name'] = $product_data['product_name'];
        $data['product_active'] = $product_data['product_active'];
        $data['product_price_s'] = $product_data['product_price_s'];
        $data['product_price_m'] = $product_data['product_price_m'];
        $data['product_price_l'] = $product_data['product_price_l'];
        $data['product_cost_s'] = $product_data['product_cost_s'];
        $data['product_cost_m'] = $product_data['product_cost_m'];
        $data['product_cost_l'] = $product_data['product_cost_l'];
        $data['product_current_size'] = 0;

        // Check if image was uploaded
        if (isset($product_data['product_img']) && $product_data['product_img']['error'] == 0) {
            $target_dir = "./uploads/";
            $filename = basename($product_data["product_img"]["name"]);
            $target_file = $target_dir . $filename;

            // Move the uploaded file to your target directory
            if (move_uploaded_file($product_data["product_img"]["tmp_name"], $target_file)) {
                // Save the path to the image in your database
                $data['product_img'] = $filename;
            } else {
                echo json_encode(['message' => 'Error uploading image']);
                return;
            }
        }

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

        // Check if image was uploaded
        if (isset($product_data['product_img']) && $product_data['product_img']['error'] == 0) {
            $target_dir = "./uploads/";
            $filename = basename($product_data["product_img"]["name"]);
            $target_file = $target_dir . $filename;

            // Move the uploaded file to your target directory
            if (move_uploaded_file($product_data["product_img"]["tmp_name"], $target_file)) {
                // Save the path to the image in your database
                $data['product_img'] = $filename;
            } else {
                echo json_encode(['message' => 'Error uploading image']);
                return;
            }
        }
        
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