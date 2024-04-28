<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Model\Branche;

class BrancheController extends Controller
{
    public function read($id = '')
    {
        $branch = new Branche();
        if ($id) {
            $data = $branch->where('branch_id', $id);
            if (is_array($data)) {
                echo json_encode($data);
            }
        } else {
            $data = $branch->findAll();
            if (is_array($data)) {
                echo json_encode($data);
            } else {
                echo json_encode(['message' => 'Branch not found']);
            }
        }
    }

    public function create($branch_data = [])
    {
        $branch = new Branche();
        $data['branch_id'] = $branch->id_generator('B', 'branch_id');
        $data['branch_create_date'] = date('Y-m-d H:i:s');
        $data['branch_name'] = $branch_data['branch_name'];
        $data['branch_address'] = $branch_data['branch_address'];
        $data['branch_phone'] = $branch_data['branch_phone'];
        $data['branch_email'] = $branch_data['branch_email'];
        $data['branch_password'] = $branch_data['branch_password'];
        $result = $branch->insert($data);
        if (!$result) {
            echo json_encode(['message' => 'Branch created successfully']);
        } else {
            echo json_encode(['message' => 'Branch created failed']);
        }
    }

    public function update($branch_data = [], $id)
    {
        $branch = new Branche();
        $data['branch_name'] = $branch_data['branch_name'];
        $data['branch_address'] = $branch_data['branch_address'];
        $data['branch_phone'] = $branch_data['branch_phone'];
        $data['branch_email'] = $branch_data['branch_email'];
        $data['branch_password'] = $branch_data['branch_password'];
        $result = $branch->update($data, 'branch_id = ' . "'$id'");
        if ($result) {
            return json_encode(['message' => 'Branch updated successfully']);
        } else {
            return json_encode(['message' => 'Branch updated failed']);
        }
    }

    public function delete($id)
    {
        $branch = new Branche();
        $result = $branch->delete('branch_id = ' . "'$id'");
        if ($result) {
            return json_encode(['message' => 'Branch deleted successfully']);
        } else {
            return json_encode(['message' => 'Branch deleted failed']);
        }
    }

    public function count()
    {
        $branch = new Branche();
        $result = $branch->findAll();
        echo json_encode(count($result));
    }
}