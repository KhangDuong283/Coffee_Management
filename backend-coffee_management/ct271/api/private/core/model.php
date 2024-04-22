<?php

/**
 * Main model 
 */

namespace App\Core;

class Model extends Database
{
    public $errors = [];
    public function __construct()
    {
        if (!property_exists($this, 'table')) {
            $temp = strtolower($this::class) . 's';
            $this->table = basename($temp);
        }
    }

    public function where($column, $value)
    {
        // Prevent SQL injection (addslashes() function escapes special characters in a string for use in an SQL statement.
        $column = addslashes($column);
        $query = "SELECT * FROM $this->table WHERE $column = :value";
        return $this->query($query, [
            ':value' => $value
        ]);
    }

    public function findAll()
    {
        $query = "select * from $this->table";
        return $this->query($query);
    }

    public function id_generator($prefix = null, $id_name = null)
    {
        $query = "select max($id_name) from $this->table";
        $result = $this->query($query);
        if ($result == null) {
            $id = 0;
        } else {
            $id = $result[0]->{"max($id_name)"}; // B001
            $id = substr($id, strlen($prefix)); // 001
            $id = intval($id); // 1
        }

        $id = $id + 1;
        $id = str_pad($id, 3, '0', STR_PAD_LEFT); // sẽ có tôi đa 999 id

        if ($prefix == null) {
            return $id;
        } else {
            return $prefix . $id;
        }
    }

    public function insert($data)
    {
        $key = array_keys($data);
        $column = implode(', ', $key);
        $value = ':' . implode(', :', $key);
        $query = "insert into $this->table ($column) values ($value)";
        // echo $query;
        return $this->query($query, $data);
    }

    public function update($data, $condition)
    {
        // updata $this->table set column1 = :value1, column2 = :value2 where id = id
        $str = '';
        foreach ($data as $key => $value) {
            $str .= $key . ' = :' . $key . ', ';
        }
        $str = trim($str, ", ");

        if (empty($condition)) {
            $query = "update $this->table set $str";
        } else {
            $query = "update $this->table set $str where $condition";
        }

        return $this->query($query, $data);
    }

    public function delete($condition = null)
    {
        // delete from $this->table where id = :id
        if ($condition == null) {
            // echo "Are you sure to delete all data in table $this->table ??. Please check your condition again!";
            // return false;
            // Remove the line below since it is not being used
            $query = "delete from $this->table";
        } else {
            $query = "delete from $this->table where $condition";
            // echo $query;
        }
        // echo $query;
        return $this->query($query);
    }
}
