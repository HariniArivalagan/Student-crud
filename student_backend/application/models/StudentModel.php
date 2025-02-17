<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class StudentModel extends CI_Model {

    public function insert_student($data) {
        // Add timestamp and flag for deletion
        $data['created_at'] = date('Y-m-d H:i:s');
        $data['is_deleted'] = 0;  // Default to not deleted
    
        // Insert the student record
        $this->db->insert('students', $data);
    
        // Return the inserted student ID (or false if insertion fails)
        return $this->db->insert_id();
    }

    public function get_students() {
        $this->db->where('is_deleted', 0);  // Fetch only active students
        $query = $this->db->get('students');
    
        // Log the result for debugging
        log_message('debug', 'Fetched students: ' . print_r($query->result_array(), true));
    
        return $query->result_array();
    }
    
    public function get_student_by_id($id) {
        $this->db->where('id', $id);
        $this->db->where('is_deleted', 0);  // Ensure student is not deleted
        $query = $this->db->get('students');

        return $query->row_array();
    }

    public function update_student($id, $data) {
        $data['updated_at'] = date('Y-m-d H:i:s');  
        $this->db->where('id', $id);
        $this->db->update('students', $data);

        return $this->db->affected_rows() > 0;
    }

    public function student_exists($id) {
        $this->db->where('id', $id);
        $query = $this->db->get('students'); // Removed `is_deleted = 0`

        return $query->num_rows() > 0;
    }

    public function delete_student($id) {
        $data = [
            'is_deleted' => 1,
            'deleted_at' => date('Y-m-d H:i:s')
        ];
        
        $this->db->where('id', $id);
        $this->db->update('students', $data);
        
        // Debugging: Print last executed SQL query and affected rows
        error_log("Executed Query: " . $this->db->last_query()); 
        error_log("Affected Rows: " . $this->db->affected_rows());
        
        return $this->db->affected_rows() > 0;
    }

}
?>