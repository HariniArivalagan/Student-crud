<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Teacher extends CI_Controller {

    public function index() {
        // Dummy student data
        $data['teachers'] = [
            [
                'first_name' => 'jyo',
                'last_name' => 'jyo',
                'dob' => '2000-05-15',
                'gender' => 'female',
                'email' => 'john.doe@example.com',
                'phone_number' => '9876543210'
            ],
            [
                'first_name' => 'jyo1',
                'last_name' => 'jyo1',
                'dob' => '1999-08-22',
                'gender' => 'Female',
                'email' => 'jane.smith@example.com',
                'phone_number' => '9123456780'
            ]
        ];

        // Load the students view and pass data
        $this->load->view('teachers', $data);

     
    }

}
