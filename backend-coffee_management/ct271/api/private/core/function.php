<?php
use App\Models\Course;
use App\Models\Classe;
use App\Models\Teacher;
use App\Models\Student;
use App\Core\App;

function get_var($key, $value = '')
{
    return isset($_POST[$key]) ? $_POST[$key] : $value;
}

function get_select($key, $value = '')
{
    if (isset($_POST[$key])) {
        if ($_POST[$key] == $value) {
            return 'selected';
        } else {
            return $_POST[$key];
        }
    } else {
        return "";
    }
}

function get_img($file = '')
{
    if (!isset($file)) {
        echo _ROOT . '/uploads/avtRoot.jpg';
    } else {
    }
    echo _ROOT . '/uploads/' . $file;

}

function showFormErrors($errors = [], $name)
{
    echo !empty($errors["$name"]) ? '<span class="text-danger mt-5" style="font-size: .85rem;">' . reset($errors["$name"]) . '</span>' : null;
}

function get_course_name($course_id)
{
    $course = new Course();
    $course_data = $course->where('course_id', $course_id);
    print_r($course_data[0]->course_name);
}

function amount_student_in_class($class_id)
{
    $student = new Student();
    $amount = $student->where('class_id', $class_id);
    if (is_array($amount)) {
        echo count($amount);
    } else {
        echo 0;
    }
}

function get_teacher_name($teacher_id)
{
    $teacher = new Teacher();
    $teacher_data = $teacher->where('teacher_id', $teacher_id);
    print_r($teacher_data[0]->teacher_name);
}

function get_class_name($class_id)
{
    $classe = new Classe();
    $classe_data = $classe->where('class_id', $class_id);
    print_r($classe_data[0]->class_name);
}

function display_title($string)
{
    echo "<div class='shadow p-3 m-4 rounded bg-white'>";
    echo "<h3 class='m-0 p-2'>";
    echo "$string";
    echo "</h3>";
    echo "</div>";
}

function course_quantity()
{
    $course = new Course();
    $data = $course->findAll();
    if (is_array($data)) {
        echo count($data);
    } else {
        echo 0;
    }
}


function class_quantity()
{
    $class = new Classe();
    $data = $class->findAll();
    if (is_array($data)) {
        return count($data);
    } else {
        return 0;
    }
}

function student_quantity($class_id = null)
{
    $student = new Student();
    if ($class_id == null) {
        $data = $student->findAll();
    } else {
        $data = $student->where('class_id', $class_id);
    }
    if (is_array($data)) {
        echo count($data);
    } else {
        echo 0;
    }
}

function get_name_page()
{
    $name_page = App::getFirstPartOfURL();
    return $name_page;
}


