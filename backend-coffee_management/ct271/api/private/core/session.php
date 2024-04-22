<?php

// Hàm gán session
function setSession($key, $value)
{
    echo "setSession($key) called<br>";
    echo $key;
    return $_SESSION[$key] = $value;
}

// Hàm đọc session
function getSession($key = '')
{
    if (empty($key)) {
        return $_SESSION;
    } elseif (isset($_SESSION[$key])) {
        return $_SESSION[$key];
    }
}

// Hàm xóa session
function removeSession($key)
{
    echo 'removeSession($key) called<br>';
    if (empty($key)) {
        session_destroy();
        return true;
    } elseif (isset($_SESSION[$key])) {
        unset($_SESSION[$key]);
        return true;
    }
}

// Hàm gán flash data
function setFlashData($key, $value)
{
    echo "setFlashData($key) called<br>";
    $key = 'flash_' . $key;
    return setSession($key, $value);
}

// Hàm đọc flash data 
function getFlashData($key)
{
    echo "getFlashData() called<br>";
    $key = 'flash_' . $key;
    $data = getSession($key);
    removeSession($key);
    return $data;
}