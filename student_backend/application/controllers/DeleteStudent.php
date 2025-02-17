<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DeleteStudent extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->model('StudentModel');
    }

    public function index($id = null) {
        if (!$id) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid Student ID']);
            return;
        }
    
        // Convert ID to integer to avoid type mismatch issues
        $id = (int)$id; 
    
        // Check if the student exists
        $studentExists = $this->StudentModel->student_exists($id);
        if (!$studentExists) {
            echo json_encode(['status' => 'error', 'message' => 'Student does not exist']);
            return;
        }
    
        // Proceed with soft delete
        $deleted = $this->StudentModel->delete_student($id);
        
        if ($deleted) {
            echo json_encode(['status' => 'success', 'message' => 'Student deleted successfully']);
        } else {
            echo json_encode([
                'status' => 'error', 
                'message' => 'Failed to delete student',
                'debug' => $this->db->last_query() // Print SQL query for debugging
            ]);
        }
    }
}
?>    