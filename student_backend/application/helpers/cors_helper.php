<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if ( ! function_exists('set_cors_headers')) {
    function set_cors_headers() {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header("Access-Control-Allow-Credentials: true");

        // If it's an OPTIONS request, just exit
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            exit;
        }
    }
}
