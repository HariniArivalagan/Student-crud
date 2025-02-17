<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UpdateStudent extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->model('StudentModel');
        $this->load->library('form_validation');
    }

    public function index($id) {
        $data = json_decode(file_get_contents("php://input"), true);

        // Ensure $data is not empty
        if (!$data) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
            return;
        }

        // Apply validation rules
        $this->form_validation->set_data($data);
        $this->form_validation->set_rules('first_name', 'First Name', 'required');
        $this->form_validation->set_rules('last_name', 'Last Name', 'required');
        $this->form_validation->set_rules('dob', 'Date of Birth', 'required');
        $this->form_validation->set_rules('email', 'Email', 'required|valid_email');
        $this->form_validation->set_rules('phone_number', 'Phone Number', 'required');

        if ($this->form_validation->run() == FALSE) {
            echo json_encode(['status' => 'error', 'message' => strip_tags(validation_errors())]);
            return;
        }

        // Ensure missing values are handled
        $updateData = [
            'first_name'   => isset($data['first_name']) ? $data['first_name'] : "",
            'last_name'    => isset($data['last_name']) ? $data['last_name'] : "",
            'dob'          => isset($data['dob']) ? $data['dob'] : "",
            'gender'       => isset($data['gender']) ? $data['gender'] : "",
            'email'        => isset($data['email']) ? $data['email'] : "",
            'phone_number' => isset($data['phone_number']) ? $data['phone_number'] : "",
        ];

        // Call the model function to update the student
        $updated = $this->StudentModel->update_student($id, $updateData);

        if ($updated) {
            echo json_encode(['status' => 'success', 'message' => 'Student updated successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update student']);
        }
    }
}
?>
