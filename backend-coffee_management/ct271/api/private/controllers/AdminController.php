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
        $admin_data['admin_id'] = $admin->id_generator('AM', 'admin_id');
        $result = $admin->insert($admin_data);
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
        $result = $admin->update($admin_data, 'admin_id = ' . "'$id'");
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