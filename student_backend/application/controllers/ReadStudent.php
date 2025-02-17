<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReadStudent extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->model('StudentModel');
    }

    public function index() {
        $students = $this->StudentModel->get_students();

        if ($students) {
            echo json_encode(['status' => 'success', 'data' => $students]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No students found']);
        }
    }
}
?>