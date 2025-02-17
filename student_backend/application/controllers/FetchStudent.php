<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FetchStudent extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->model('StudentModel');
    }

    public function index($id) {
        $student = $this->StudentModel->get_student_by_id($id);
        if (!$student) {
            echo json_encode(['status' => 'error', 'message' => 'Student not found']);
        } else {
            echo json_encode(['status' => 'success', 'data' => $student]);
        }
    }
}
?>

