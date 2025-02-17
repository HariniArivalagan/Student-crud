<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teacher List</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #E8F5E9;
            color: #263238;
            padding: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 18px;
            text-align: left;
            background: white;
        }
        th, td {
            padding: 10px;
            border: 1px solid #ddd;
        }
        th {
            background-color: #2E7D32;
            color: white;
        }
    </style>
</head>
<body>

<h2>Teacher List</h2>

<table>
    <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone Number</th>
        </tr>
    </thead>
    <tbody>
        <?php if (!empty($teachers)) : ?>
            <?php foreach ($teachers as $student) : ?>
                <tr>
                    <td><?php echo $student['first_name']; ?></td>
                    <td><?php echo $student['last_name']; ?></td>
                    <td><?php echo $student['dob']; ?></td>
                    <td><?php echo $student['gender']; ?></td>
                    <td><?php echo $student['email']; ?></td>
                    <td><?php echo $student['phone_number']; ?></td>
                </tr>
            <?php endforeach; ?>
        <?php else : ?>
            <tr>
                <td colspan="6">No teachers found.</td>
            </tr>
        <?php endif; ?>
    </tbody>
</table>

</body>
</html>
