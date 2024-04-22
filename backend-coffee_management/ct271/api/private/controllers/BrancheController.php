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
            }
        }
    }

    public function create($branch_data = [])
    {
        $branch = new Branche();
        $branch_data['branch_id'] = $branch->id_generator('B', 'branch_id');
        $branch_data['branch_create_date'] = date('Y-m-d H:i:s');
        $result = $branch->insert($branch_data);
        if ($result) {
            echo json_encode(['message' => 'Branch created successfully']);
        }
    }

    public function update($branch_data = [], $id)
    {
        $branch = new Branche();
        $result = $branch->update($branch_data, 'branch_id = ' . $id);
        if ($result) {
            return json_encode(['message' => 'Branch updated successfully']);
        }
    }

    public function delete($id)
    {
        $branch = new Branche();
        $result = $branch->delete('branch_id = ' . $id);
        if ($result) {
            return json_encode(['message' => 'Branch deleted successfully']);
        }
    }

    public function count()
    {
        $branch = new Branche();
        $result = $branch->findAll();
        echo json_encode(count($result));
    }
}