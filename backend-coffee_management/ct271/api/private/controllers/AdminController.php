<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Model\Admin;
use App\Model\Branche;

class AdminController extends Controller
{
    public function read($id = '')
    {
        $admin = new Admin();
        if ($id) {
            $data = $admin->where('admin_id', $id);
            if (is_array($data)) {
                echo json_encode($data);
            } else {
                echo json_encode(['message' => 'Admin not found']);
            }
        } else {
            $data = $admin->findAll();
            if (is_array($data)) {
                echo json_encode($data);
            } else {
                echo json_encode(['message' => 'Admin not found']);
            }
        }
    }

    public function create($admin_data = [])
    {
        $admin = new Admin();

        $data['admin_id'] = $admin->id_generator('AM', 'admin_id');
        $data['admin_username'] = $admin_data['admin_username'];
        $data['admin_password'] = $admin_data['admin_password'];

        $result = $admin->insert($data);
        echo json_encode($result);
        if ($result == false) {
            echo json_encode(['message' => 'Admin created successfully']);
        } else {
            echo json_encode(['message' => 'Admin created failed']);
        }
    }

    public function update($admin_data = [], $id)
    {
        $admin = new Admin();
        $data['admin_username'] = $admin_data['admin_username'];
        $data['admin_password'] = $admin_data['admin_password'];
        
        $result = $admin->update($data, 'admin_id = ' . "'$id'");
        if ($result == '') {
            return json_encode(['message' => 'Admin updated successfully']);
        } else {
            return json_encode(['message' => 'Admin updated failed']);
        }
    }

    public function delete($id)
    {
        $admin = new Admin();
        $result = $admin->delete('admin_id = ' . "'$id'");
        if ($result == '') {
            return json_encode(['message' => 'Admin deleted successfully']);
        } else {
            return json_encode(['message' => 'Admin deleted failed']);
        }
    }

    public function count()
    {
        $admin = new Admin();
        $result = $admin->findAll();
        echo json_encode(count($result));
    }
}