<?php
/**
 * Main controller file
 */

namespace App\Core;

class Controller
{
    public function view($view, $data = [])
    {
        extract($data);
        if (file_exists("../private/views/" . $view . ".view.php")) {
            require "../private/views/" . $view . ".view.php";
        } else {
            require "../private/views/404.view.php";
        }
    }

    public function redirect($url)
    {
        header("Location: " . _ROOT . "/" . trim($url) . "/");
        die;
    }

    public function index()
    {

    }



}

