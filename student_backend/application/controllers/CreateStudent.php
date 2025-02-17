<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CreateStudent extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->helper('cors');
        set_cors_headers();
        $this->load->database();
        $this->load->model('StudentModel');
        $this->load->library('form_validation');
    }

    public function index() {
        // Set proper CORS & JSON headers
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header('Content-Type: application/json');

        if (!$this->input->raw_input_stream) {
            echo json_encode(['status' => 'error', 'message' => 'No input data provided']);
            return;
        }

        // Decode JSON input
        $data = json_decode($this->input->raw_input_stream, true);
        if (!$data) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid JSON data']);
            return;
        }

        // Set form validation data
        $this->form_validation->set_data($data);
        $this->form_validation->set_rules('first_name', 'First Name', 'required');
        $this->form_validation->set_rules('last_name', 'Last Name', 'required');
        $this->form_validation->set_rules('dob', 'Date of Birth', 'required');
        $this->form_validation->set_rules('gender', 'Gender', 'required');
        $this->form_validation->set_rules('email', 'Email', 'required|valid_email|min_length[10]|max_length[50]');
        $this->form_validation->set_rules('phone_number', 'Phone Number', 'required|regex_match[/^[0-9]{10}$/]'); // 🔹 Fixed regex

        if ($this->form_validation->run() == FALSE) {
            echo json_encode(['status' => 'error', 'message' => strip_tags(validation_errors())]); // 🔹 Remove HTML tags
            return;
        }

        // Check if email already exists
        if ($this->db->where('email', $data['email'])->get('students')->num_rows() > 0) {
            echo json_encode(['status' => 'error', 'message' => 'Email already exists']);
            return;
        }

        // Insert student into the database
        $student_id = $this->StudentModel->insert_student($data);
        if ($student_id) {
            echo json_encode(['status' => 'success', 'message' => 'Student created successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to create student']);
        }
    }
}
?>
