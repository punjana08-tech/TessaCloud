DROP TABLE IF EXISTS activity_logs;
DROP TABLE IF EXISTS maintenance_tickets;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS assets;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    department_head_name VARCHAR(120),
    floor_location VARCHAR(80),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    employee_code VARCHAR(30) NOT NULL UNIQUE,
    employee_name VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL UNIQUE,
    phone_number VARCHAR(30),
    department_id INTEGER NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    joining_date DATE NOT NULL,
    employment_status VARCHAR(30) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assets (
    asset_id SERIAL PRIMARY KEY,
    asset_tag VARCHAR(40) NOT NULL UNIQUE,
    asset_name VARCHAR(120) NOT NULL,
    category VARCHAR(80) NOT NULL,
    serial_number VARCHAR(120) UNIQUE,
    purchase_date DATE,
    purchase_cost NUMERIC(12, 2),
    warranty_expiry_date DATE,
    vendor_name VARCHAR(120),
    condition_status VARCHAR(40) NOT NULL DEFAULT 'Good',
    asset_status VARCHAR(40) NOT NULL DEFAULT 'Available',
    current_location VARCHAR(120),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assignments (
    assignment_id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    asset_id INTEGER NOT NULL,
    assigned_by_employee_id INTEGER,
    assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expected_return_date DATE,
    returned_at TIMESTAMP,
    assignment_status VARCHAR(30) NOT NULL DEFAULT 'Active',
    assignment_notes TEXT
);

CREATE TABLE maintenance_tickets (
    ticket_id SERIAL PRIMARY KEY,
    asset_id INTEGER NOT NULL,
    issue_title VARCHAR(160) NOT NULL,
    issue_description TEXT,
    reported_by_employee_id INTEGER,
    priority VARCHAR(30) NOT NULL DEFAULT 'Medium',
    ticket_status VARCHAR(30) NOT NULL DEFAULT 'Open',
    reported_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    resolution_notes TEXT
);

CREATE TABLE activity_logs (
    activity_id SERIAL PRIMARY KEY,
    actor_employee_id INTEGER,
    activity_type VARCHAR(80) NOT NULL,
    entity_type VARCHAR(80) NOT NULL,
    entity_id INTEGER NOT NULL,
    activity_description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO departments (department_name, department_head_name, floor_location) VALUES
('Human Resources', 'Meera Sharma', 'Floor 2 - Wing A'),
('Engineering', 'Arjun Menon', 'Floor 4 - Wing C'),
('Finance', 'Nisha Rao', 'Floor 3 - Wing B'),
('Sales', 'Kabir Khan', 'Floor 1 - Wing A'),
('Operations', 'Ritika Sen', 'Floor 2 - Wing B');

INSERT INTO employees (employee_code, employee_name, email, phone_number, department_id, department_name, designation, joining_date, employment_status) VALUES
('EMP-0001', 'Aarav Patel', 'aarav.patel@assettracker.example', '+91-90000-00001', 2, 'Engineering', 'Software Engineer', '2023-06-12', 'Active'),
('EMP-0002', 'Diya Kapoor', 'diya.kapoor@assettracker.example', '+91-90000-00002', 1, 'Human Resources', 'HR Executive', '2022-01-20', 'Active'),
('EMP-0003', 'Rohan Iyer', 'rohan.iyer@assettracker.example', '+91-90000-00003', 3, 'Finance', 'Finance Analyst', '2021-11-02', 'Active'),
('EMP-0004', 'Sara Thomas', 'sara.thomas@assettracker.example', '+91-90000-00004', 4, 'Sales', 'Sales Manager', '2020-09-18', 'Active'),
('EMP-0005', 'Vivaan Gupta', 'vivaan.gupta@assettracker.example', '+91-90000-00005', 5, 'Operations', 'Operations Lead', '2022-08-01', 'Active'),
('EMP-0006', 'Ananya Singh', 'ananya.singh@assettracker.example', '+91-90000-00006', 2, 'Engineering', 'QA Engineer', '2024-02-10', 'Active');

INSERT INTO assets (asset_tag, asset_name, category, serial_number, purchase_date, purchase_cost, warranty_expiry_date, vendor_name, condition_status, asset_status, current_location) VALUES
('AST-LAP-0001', 'Dell Latitude 7440', 'Laptop', 'DL7440-1001', '2024-01-10', 92000.00, '2027-01-10', 'Dell India', 'Good', 'Assigned', 'Engineering Floor'),
('AST-LAP-0002', 'MacBook Air M2', 'Laptop', 'MBA-M2-1002', '2023-07-15', 115000.00, '2026-07-15', 'Apple India', 'Good', 'Assigned', 'HR Floor'),
('AST-MON-0001', 'LG 27 Inch Monitor', 'Monitor', 'LG27-2001', '2023-04-05', 18000.00, '2026-04-05', 'LG', 'Good', 'Available', 'Asset Store Room'),
('AST-PHN-0001', 'iPhone 14', 'Phone', 'IP14-3001', '2023-09-01', 72000.00, '2025-09-01', 'Apple India', 'Good', 'Assigned', 'Sales Floor'),
('AST-ACC-0001', 'Logitech Keyboard Mouse Combo', 'Accessory', 'LOGI-4001', '2024-02-22', 3500.00, '2026-02-22', 'Logitech', 'Good', 'Available', 'Asset Store Room'),
('AST-LAP-0003', 'HP EliteBook 840', 'Laptop', 'HPEB-1003', '2022-03-11', 83000.00, '2025-03-11', 'HP India', 'Damaged', 'Maintenance', 'Repair Desk');

INSERT INTO assignments (employee_id, asset_id, assigned_by_employee_id, assigned_at, expected_return_date, assignment_status, assignment_notes) VALUES
(1, 1, 2, '2024-03-01 10:00:00', '2026-03-01', 'Active', 'Assigned for engineering work'),
(2, 2, 2, '2024-02-10 11:30:00', '2026-02-10', 'Active', 'Assigned for HR operations'),
(4, 4, 2, '2024-01-18 15:20:00', '2026-01-18', 'Active', 'Assigned for sales travel'),
(6, 6, 2, '2024-02-15 09:45:00', '2024-10-01', 'Returned', 'Returned after damage report');

INSERT INTO maintenance_tickets (asset_id, issue_title, issue_description, reported_by_employee_id, priority, ticket_status, reported_at) VALUES
(6, 'Laptop display flickering', 'Screen flickers after 20 minutes of usage.', 6, 'High', 'Open', '2024-10-03 14:00:00');

INSERT INTO activity_logs (actor_employee_id, activity_type, entity_type, entity_id, activity_description, created_at) VALUES
(2, 'Asset Assigned', 'assignment', 1, 'Dell Latitude 7440 assigned to Aarav Patel.', '2024-03-01 10:00:00'),
(2, 'Asset Assigned', 'assignment', 2, 'MacBook Air M2 assigned to Diya Kapoor.', '2024-02-10 11:30:00'),
(2, 'Asset Assigned', 'assignment', 3, 'iPhone 14 assigned to Sara Thomas.', '2024-01-18 15:20:00'),
(6, 'Maintenance Created', 'maintenance_ticket', 1, 'HP EliteBook 840 sent for display repair.', '2024-10-03 14:00:00');
