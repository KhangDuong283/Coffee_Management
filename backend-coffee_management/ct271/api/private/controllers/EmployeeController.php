<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Model\Employee;

class EmployeeController extends Controller
{
    public function read($id = '')
    {
        $employee = new Employee();
        if ($id) {
            $data = $employee->where('employee_id', $id);
            if (is_array($data)) {
                echo json_encode($data);
            }
        } else {
            $data = $employee->findAll();
            if (is_array($data)) {
                echo json_encode($data);
            }
        }
    }

    public function create($employee_data = [])
    {
        $employee = new Employee();
        $data['employee_id'] = $employee->id_generator('E', 'employee_id');
        $data['employee_name'] = $employee_data['employee_name'];
        $data['employee_age'] = $employee_data['employee_age'];
        $data['employee_phone'] = $employee_data['employee_phone'];
        $data['employee_email'] = $employee_data['employee_email'];
        $data['employee_salary'] = $employee_data['employee_salary'];
        $data['employee_position'] = $employee_data['employee_position'];
        $data['branch_id'] = $employee_data['branch_id'];

        $result = $employee->insert($data);
        if (!$result) {
            echo json_encode(['message' => 'Employee created successfully']);
        } else {
            echo json_encode(['message' => 'Employee created failed']);
        }
    }

    public function update($employee_data = [], $id)
    {
        $employee = new Employee();
        $data['employee_name'] = $employee_data['employee_name'];
        $data['employee_age'] = $employee_data['employee_age'];
        $data['employee_phone'] = $employee_data['employee_phone'];
        $data['employee_email'] = $employee_data['employee_email'];
        $data['employee_salary'] = $employee_data['employee_salary'];
        $data['employee_position'] = $employee_data['employee_position'];
        $data['branch_id'] = $employee_data['branch_id'];
        $result = $employee->update($data, 'employee_id = ' . "'$id'");
        if ($result) {
            return json_encode(['message' => 'Employee updated successfully']);
        } else {
            return json_encode(['message' => 'Employee updated failed']);
        }
    }

    public function delete($id)
    {
        $employee = new Employee();
        $result = $employee->delete('employee_id = ' . "'$id'");
        if ($result) {
            return json_encode(['message' => 'Employee deleted successfully']);
        } else {
            return json_encode(['message' => 'Employee deleted failed']);
        }
    }

    public function count()
    {
        $employee = new Employee();
        $result = $employee->findAll();
        echo json_encode(count($result));
    }
}