<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Model\Bill;

class BillController extends Controller
{
    public function read($id = '')
    {
        $bill = new Bill();
        if ($id) {
            $data = $bill->where('bill_id', $id);
            if (is_array($data)) {
                echo json_encode($data);
            } else {
                echo json_encode(['message' => 'Bill not found']);
            }
        } else {
            $data = $bill->findAll();
            if (is_array($data)) {
                echo json_encode($data);
            }
        }
    }

    public function create($bill_data = [])
    {
        $bill = new Bill();

        $data['bill_id'] = $bill->id_generator('OD', 'bill_id');
        $data['bill_datetime'] = date('Y-m-d H:i:s');
        $data['branch_id'] = $bill_data['branch_id'];
        $data['employee_id'] = $bill_data['employee_id'];

        $result = $bill->insert($data);
        // echo json_encode($result);
        if ($result == false) {
            echo json_encode(['message' => 'Bill created successfully']);
        } else {
            echo json_encode(['message' => 'Bill created failed']);
        }
    }

    public function update($bill_data = [], $id)
    {
        $bill = new Bill();
        $data['branch_id'] = $bill_data['branch_id'];

        $result = $bill->update($data, 'bill_id = ' . "'$id'");
        if ($result == '') {
            return json_encode(['message' => 'Bill updated successfully']);
        } else {
            return json_encode(['message' => 'Bill updated failed']);
        }
    }

    public function delete($id)
    {
        $bill = new Bill();
        $result = $bill->delete('bill_id = ' . "'$id'");
        if ($result == '') {
            return json_encode(['message' => 'Bill deleted successfully']);
        } else {
            return json_encode(['message' => 'Bill deleted failed']);
        }
    }

    public function count()
    {
        $bill = new Bill();
        $result = $bill->findAll();
        echo json_encode(count($result));
    }
}