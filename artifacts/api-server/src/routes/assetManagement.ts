import { Router, type IRouter, type Request, type Response } from "express";

type EmployeeStatus = "Active" | "Inactive";
type AssetStatus = "Available" | "Assigned" | "Maintenance" | "Broken" | "Retired" | "Lost";
type ConditionStatus = "Excellent" | "Good" | "Fair" | "Damaged";
type AssignmentStatus = "Active" | "Returned";
type TicketStatus = "Open" | "In Progress" | "Closed";

type Employee = {
  employee_id: number;
  employee_code: string;
  employee_name: string;
  email: string;
  phone_number?: string;
  department_name: string;
  designation: string;
  joining_date: string;
  employment_status: EmployeeStatus;
};

type Asset = {
  asset_id: number;
  asset_tag: string;
  asset_name: string;
  category: string;
  serial_number?: string;
  purchase_date?: string;
  purchase_cost?: number;
  condition_status: ConditionStatus;
  asset_status: AssetStatus;
  current_location?: string;
};

type Assignment = {
  assignment_id: number;
  employee_id: number;
  asset_id: number;
  assigned_by_employee_id?: number;
  assigned_at: string;
  expected_return_date?: string;
  returned_at?: string;
  assignment_status: AssignmentStatus;
  assignment_notes?: string;
};

type MaintenanceTicket = {
  ticket_id: number;
  asset_id: number;
  issue_title: string;
  issue_description?: string;
  reported_by_employee_id?: number;
  priority: "Low" | "Medium" | "High";
  ticket_status: TicketStatus;
  reported_at: string;
  resolved_at?: string;
  resolution_notes?: string;
};

type ActivityLog = {
  activity_id: number;
  actor_employee_id?: number;
  activity_type: string;
  entity_type: string;
  entity_id: number;
  activity_description: string;
  created_at: string;
};

const router: IRouter = Router();

let nextEmployeeId = 7;
let nextAssetId = 7;
let nextAssignmentId = 5;
let nextTicketId = 2;
let nextActivityId = 5;

const employees: Employee[] = [
  { employee_id: 1, employee_code: "EMP-0001", employee_name: "Aarav Patel", email: "aarav.patel@assettracker.example", phone_number: "+91-90000-00001", department_name: "Engineering", designation: "Software Engineer", joining_date: "2023-06-12", employment_status: "Active" },
  { employee_id: 2, employee_code: "EMP-0002", employee_name: "Diya Kapoor", email: "diya.kapoor@assettracker.example", phone_number: "+91-90000-00002", department_name: "Human Resources", designation: "HR Executive", joining_date: "2022-01-20", employment_status: "Active" },
  { employee_id: 3, employee_code: "EMP-0003", employee_name: "Rohan Iyer", email: "rohan.iyer@assettracker.example", phone_number: "+91-90000-00003", department_name: "Finance", designation: "Finance Analyst", joining_date: "2021-11-02", employment_status: "Active" },
  { employee_id: 4, employee_code: "EMP-0004", employee_name: "Sara Thomas", email: "sara.thomas@assettracker.example", phone_number: "+91-90000-00004", department_name: "Sales", designation: "Sales Manager", joining_date: "2020-09-18", employment_status: "Active" },
  { employee_id: 5, employee_code: "EMP-0005", employee_name: "Vivaan Gupta", email: "vivaan.gupta@assettracker.example", phone_number: "+91-90000-00005", department_name: "Operations", designation: "Operations Lead", joining_date: "2022-08-01", employment_status: "Active" },
  { employee_id: 6, employee_code: "EMP-0006", employee_name: "Ananya Singh", email: "ananya.singh@assettracker.example", phone_number: "+91-90000-00006", department_name: "Engineering", designation: "QA Engineer", joining_date: "2024-02-10", employment_status: "Active" },
];

const assets: Asset[] = [
  { asset_id: 1, asset_tag: "AST-LAP-0001", asset_name: "Dell Latitude 7440", category: "Laptop", serial_number: "DL7440-1001", purchase_date: "2024-01-10", purchase_cost: 92000, condition_status: "Good", asset_status: "Assigned", current_location: "Engineering Floor" },
  { asset_id: 2, asset_tag: "AST-LAP-0002", asset_name: "MacBook Air M2", category: "Laptop", serial_number: "MBA-M2-1002", purchase_date: "2023-07-15", purchase_cost: 115000, condition_status: "Good", asset_status: "Assigned", current_location: "HR Floor" },
  { asset_id: 3, asset_tag: "AST-MON-0001", asset_name: "LG 27 Inch Monitor", category: "Monitor", serial_number: "LG27-2001", purchase_date: "2023-04-05", purchase_cost: 18000, condition_status: "Good", asset_status: "Available", current_location: "Asset Store Room" },
  { asset_id: 4, asset_tag: "AST-PHN-0001", asset_name: "iPhone 14", category: "Phone", serial_number: "IP14-3001", purchase_date: "2023-09-01", purchase_cost: 72000, condition_status: "Good", asset_status: "Assigned", current_location: "Sales Floor" },
  { asset_id: 5, asset_tag: "AST-ACC-0001", asset_name: "Logitech Keyboard Mouse Combo", category: "Accessory", serial_number: "LOGI-4001", purchase_date: "2024-02-22", purchase_cost: 3500, condition_status: "Good", asset_status: "Available", current_location: "Asset Store Room" },
  { asset_id: 6, asset_tag: "AST-LAP-0003", asset_name: "HP EliteBook 840", category: "Laptop", serial_number: "HPEB-1003", purchase_date: "2022-03-11", purchase_cost: 83000, condition_status: "Damaged", asset_status: "Maintenance", current_location: "Repair Desk" },
];

const assignments: Assignment[] = [
  { assignment_id: 1, employee_id: 1, asset_id: 1, assigned_by_employee_id: 2, assigned_at: "2024-03-01T10:00:00.000Z", expected_return_date: "2026-03-01", assignment_status: "Active", assignment_notes: "Assigned for engineering work" },
  { assignment_id: 2, employee_id: 2, asset_id: 2, assigned_by_employee_id: 2, assigned_at: "2024-02-10T11:30:00.000Z", expected_return_date: "2026-02-10", assignment_status: "Active", assignment_notes: "Assigned for HR operations" },
  { assignment_id: 3, employee_id: 4, asset_id: 4, assigned_by_employee_id: 2, assigned_at: "2024-01-18T15:20:00.000Z", expected_return_date: "2026-01-18", assignment_status: "Active", assignment_notes: "Assigned for sales travel" },
  { assignment_id: 4, employee_id: 6, asset_id: 6, assigned_by_employee_id: 2, assigned_at: "2024-02-15T09:45:00.000Z", expected_return_date: "2024-10-01", returned_at: "2024-10-03T14:00:00.000Z", assignment_status: "Returned", assignment_notes: "Returned after damage report" },
];

const maintenanceTickets: MaintenanceTicket[] = [
  { ticket_id: 1, asset_id: 6, issue_title: "Laptop display flickering", issue_description: "Screen flickers after 20 minutes of usage.", reported_by_employee_id: 6, priority: "High", ticket_status: "Open", reported_at: "2024-10-03T14:00:00.000Z" },
];

const activities: ActivityLog[] = [
  { activity_id: 1, actor_employee_id: 2, activity_type: "Asset Assigned", entity_type: "assignment", entity_id: 1, activity_description: "Dell Latitude 7440 assigned to Aarav Patel.", created_at: "2024-03-01T10:00:00.000Z" },
  { activity_id: 2, actor_employee_id: 2, activity_type: "Asset Assigned", entity_type: "assignment", entity_id: 2, activity_description: "MacBook Air M2 assigned to Diya Kapoor.", created_at: "2024-02-10T11:30:00.000Z" },
  { activity_id: 3, actor_employee_id: 2, activity_type: "Asset Assigned", entity_type: "assignment", entity_id: 3, activity_description: "iPhone 14 assigned to Sara Thomas.", created_at: "2024-01-18T15:20:00.000Z" },
  { activity_id: 4, actor_employee_id: 6, activity_type: "Maintenance Created", entity_type: "maintenance_ticket", entity_id: 1, activity_description: "HP EliteBook 840 sent for display repair.", created_at: "2024-10-03T14:00:00.000Z" },
];

const now = () => new Date().toISOString();
const numberId = (value: string) => Number.parseInt(value, 10);
const findEmployee = (id: number) => employees.find((employee) => employee.employee_id === id);
const findAsset = (id: number) => assets.find((asset) => asset.asset_id === id);
const findAssignment = (id: number) => assignments.find((assignment) => assignment.assignment_id === id);
const findTicket = (id: number) => maintenanceTickets.find((ticket) => ticket.ticket_id === id);

function addActivity(activity_type: string, entity_type: string, entity_id: number, activity_description: string, actor_employee_id?: number) {
  activities.unshift({ activity_id: nextActivityId++, actor_employee_id, activity_type, entity_type, entity_id, activity_description, created_at: now() });
}

function sendNotFound(res: Response, message: string) {
  res.status(404).json({ error: message });
}

function requireText(req: Request, fields: string[]) {
  const missing = fields.filter((field) => typeof req.body[field] !== "string" || req.body[field].trim().length === 0);
  return missing;
}

router.get("/dashboard/summary", (_req, res) => {
  res.json({
    total_employees: employees.length,
    active_employees: employees.filter((employee) => employee.employment_status === "Active").length,
    total_assets: assets.length,
    available_assets: assets.filter((asset) => asset.asset_status === "Available").length,
    assigned_assets: assets.filter((asset) => asset.asset_status === "Assigned").length,
    maintenance_assets: assets.filter((asset) => asset.asset_status === "Maintenance").length,
    broken_assets: assets.filter((asset) => asset.asset_status === "Broken").length,
    active_assignments: assignments.filter((assignment) => assignment.assignment_status === "Active").length,
  });
});

router.get("/reports/department-assets", (_req, res) => {
  const report = employees.reduce<Record<string, number>>((result, employee) => {
    const activeAssignments = assignments.filter((assignment) => assignment.employee_id === employee.employee_id && assignment.assignment_status === "Active");
    result[employee.department_name] = (result[employee.department_name] ?? 0) + activeAssignments.length;
    return result;
  }, {});

  res.json(Object.entries(report).map(([department_name, assigned_asset_count]) => ({ department_name, assigned_asset_count })));
});

router.get("/activities/recent", (_req, res) => {
  res.json(activities.slice(0, 10));
});

router.get("/employees", (_req, res) => {
  res.json([...employees].sort((a, b) => a.employee_name.localeCompare(b.employee_name)));
});

router.get("/employees/:employee_id", (req, res) => {
  const employee = findEmployee(numberId(req.params.employee_id));
  if (!employee) return sendNotFound(res, "Employee not found");
  res.json(employee);
});

router.post("/employees", (req, res) => {
  const missing = requireText(req, ["employee_code", "employee_name", "email", "department_name", "designation", "joining_date"]);
  if (missing.length > 0) return res.status(400).json({ error: "Missing required fields", missing });
  if (employees.some((employee) => employee.employee_code === req.body.employee_code || employee.email === req.body.email)) return res.status(409).json({ error: "Employee code or email already exists" });

  const employee: Employee = { employee_id: nextEmployeeId++, employee_code: req.body.employee_code, employee_name: req.body.employee_name, email: req.body.email, phone_number: req.body.phone_number, department_name: req.body.department_name, designation: req.body.designation, joining_date: req.body.joining_date, employment_status: req.body.employment_status ?? "Active" };
  employees.push(employee);
  addActivity("Employee Created", "employee", employee.employee_id, `${employee.employee_name} added to employee records.`);
  return res.status(201).json(employee);
});

router.put("/employees/:employee_id", (req, res) => {
  const employee = findEmployee(numberId(req.params.employee_id));
  if (!employee) return sendNotFound(res, "Employee not found");
  Object.assign(employee, req.body, { employee_id: employee.employee_id });
  addActivity("Employee Updated", "employee", employee.employee_id, `${employee.employee_name} details updated.`);
  res.json(employee);
});

router.patch("/employees/:employee_id/deactivate", (req, res) => {
  const employee = findEmployee(numberId(req.params.employee_id));
  if (!employee) return sendNotFound(res, "Employee not found");
  employee.employment_status = "Inactive";
  addActivity("Employee Deactivated", "employee", employee.employee_id, `${employee.employee_name} marked inactive.`);
  res.json(employee);
});

router.delete("/employees/:employee_id", (req, res) => {
  const employeeId = numberId(req.params.employee_id);
  if (assignments.some((assignment) => assignment.employee_id === employeeId && assignment.assignment_status === "Active")) return res.status(409).json({ error: "Employee has active asset assignments" });
  const index = employees.findIndex((employee) => employee.employee_id === employeeId);
  if (index === -1) return sendNotFound(res, "Employee not found");
  const [employee] = employees.splice(index, 1);
  addActivity("Employee Deleted", "employee", employeeId, `${employee.employee_name} removed from employee records.`);
  res.status(204).send();
});

router.get("/assets", (_req, res) => {
  res.json([...assets].sort((a, b) => a.asset_tag.localeCompare(b.asset_tag)));
});

router.get("/assets/:asset_id", (req, res) => {
  const asset = findAsset(numberId(req.params.asset_id));
  if (!asset) return sendNotFound(res, "Asset not found");
  res.json(asset);
});

router.post("/assets", (req, res) => {
  const missing = requireText(req, ["asset_tag", "asset_name", "category"]);
  if (missing.length > 0) return res.status(400).json({ error: "Missing required fields", missing });
  if (assets.some((asset) => asset.asset_tag === req.body.asset_tag)) return res.status(409).json({ error: "Asset tag already exists" });

  const asset: Asset = { asset_id: nextAssetId++, asset_tag: req.body.asset_tag, asset_name: req.body.asset_name, category: req.body.category, serial_number: req.body.serial_number, purchase_date: req.body.purchase_date, purchase_cost: req.body.purchase_cost, condition_status: req.body.condition_status ?? "Good", asset_status: req.body.asset_status ?? "Available", current_location: req.body.current_location ?? "Asset Store Room" };
  assets.push(asset);
  addActivity("Asset Created", "asset", asset.asset_id, `${asset.asset_name} registered in inventory.`);
  return res.status(201).json(asset);
});

router.put("/assets/:asset_id", (req, res) => {
  const asset = findAsset(numberId(req.params.asset_id));
  if (!asset) return sendNotFound(res, "Asset not found");
  Object.assign(asset, req.body, { asset_id: asset.asset_id });
  addActivity("Asset Updated", "asset", asset.asset_id, `${asset.asset_name} details updated.`);
  res.json(asset);
});

router.patch("/assets/:asset_id/mark-broken", (req, res) => {
  const asset = findAsset(numberId(req.params.asset_id));
  if (!asset) return sendNotFound(res, "Asset not found");
  asset.asset_status = "Broken";
  asset.condition_status = "Damaged";
  addActivity("Asset Broken", "asset", asset.asset_id, `${asset.asset_name} marked as broken.`);
  res.json(asset);
});

router.patch("/assets/:asset_id/retire", (req, res) => {
  const asset = findAsset(numberId(req.params.asset_id));
  if (!asset) return sendNotFound(res, "Asset not found");
  asset.asset_status = "Retired";
  addActivity("Asset Retired", "asset", asset.asset_id, `${asset.asset_name} retired from inventory.`);
  res.json(asset);
});

router.delete("/assets/:asset_id", (req, res) => {
  const assetId = numberId(req.params.asset_id);
  if (assignments.some((assignment) => assignment.asset_id === assetId && assignment.assignment_status === "Active")) return res.status(409).json({ error: "Asset has an active assignment" });
  const index = assets.findIndex((asset) => asset.asset_id === assetId);
  if (index === -1) return sendNotFound(res, "Asset not found");
  const [asset] = assets.splice(index, 1);
  addActivity("Asset Deleted", "asset", assetId, `${asset.asset_name} removed from inventory.`);
  res.status(204).send();
});

router.get("/assets/:asset_id/assignments", (req, res) => {
  const assetId = numberId(req.params.asset_id);
  res.json(assignments.filter((assignment) => assignment.asset_id === assetId));
});

router.get("/employees/:employee_id/assignments", (req, res) => {
  const employeeId = numberId(req.params.employee_id);
  res.json(assignments.filter((assignment) => assignment.employee_id === employeeId));
});

router.get("/assignments", (_req, res) => {
  res.json(assignments);
});

router.get("/assignments/active", (_req, res) => {
  res.json(assignments.filter((assignment) => assignment.assignment_status === "Active"));
});

router.post("/assignments", (req, res) => {
  const employeeId = Number(req.body.employee_id);
  const assetId = Number(req.body.asset_id);
  const employee = findEmployee(employeeId);
  const asset = findAsset(assetId);
  if (!employee) return sendNotFound(res, "Employee not found");
  if (!asset) return sendNotFound(res, "Asset not found");
  if (employee.employment_status !== "Active") return res.status(409).json({ error: "Cannot assign asset to inactive employee" });
  if (asset.asset_status !== "Available") return res.status(409).json({ error: "Asset is not available for assignment" });

  const assignment: Assignment = { assignment_id: nextAssignmentId++, employee_id: employeeId, asset_id: assetId, assigned_by_employee_id: req.body.assigned_by_employee_id, assigned_at: now(), expected_return_date: req.body.expected_return_date, assignment_status: "Active", assignment_notes: req.body.assignment_notes };
  assignments.push(assignment);
  asset.asset_status = "Assigned";
  asset.current_location = employee.department_name;
  addActivity("Asset Assigned", "assignment", assignment.assignment_id, `${asset.asset_name} assigned to ${employee.employee_name}.`, req.body.assigned_by_employee_id);
  res.status(201).json(assignment);
});

router.patch("/assignments/:assignment_id/return", (req, res) => {
  const assignment = findAssignment(numberId(req.params.assignment_id));
  if (!assignment) return sendNotFound(res, "Assignment not found");
  if (assignment.assignment_status === "Returned") return res.status(409).json({ error: "Assignment already returned" });
  const asset = findAsset(assignment.asset_id);
  assignment.assignment_status = "Returned";
  assignment.returned_at = now();
  if (req.body.assignment_notes) assignment.assignment_notes = req.body.assignment_notes;
  if (asset) {
    asset.asset_status = "Available";
    asset.current_location = req.body.return_location ?? "Asset Store Room";
  }
  addActivity("Asset Returned", "assignment", assignment.assignment_id, `Assignment ${assignment.assignment_id} returned.`);
  res.json(assignment);
});

router.get("/maintenance", (_req, res) => {
  res.json(maintenanceTickets);
});

router.post("/maintenance", (req, res) => {
  const asset = findAsset(Number(req.body.asset_id));
  if (!asset) return sendNotFound(res, "Asset not found");
  const missing = requireText(req, ["issue_title"]);
  if (missing.length > 0) return res.status(400).json({ error: "Missing required fields", missing });
  const ticket: MaintenanceTicket = { ticket_id: nextTicketId++, asset_id: asset.asset_id, issue_title: req.body.issue_title, issue_description: req.body.issue_description, reported_by_employee_id: req.body.reported_by_employee_id, priority: req.body.priority ?? "Medium", ticket_status: "Open", reported_at: now() };
  maintenanceTickets.push(ticket);
  asset.asset_status = "Maintenance";
  addActivity("Maintenance Created", "maintenance_ticket", ticket.ticket_id, `${asset.asset_name} sent for maintenance.`, req.body.reported_by_employee_id);
  res.status(201).json(ticket);
});

router.patch("/maintenance/:ticket_id/close", (req, res) => {
  const ticket = findTicket(numberId(req.params.ticket_id));
  if (!ticket) return sendNotFound(res, "Maintenance ticket not found");
  const asset = findAsset(ticket.asset_id);
  ticket.ticket_status = "Closed";
  ticket.resolved_at = now();
  ticket.resolution_notes = req.body.resolution_notes;
  if (asset) {
    asset.condition_status = req.body.condition_status ?? "Good";
    asset.asset_status = req.body.asset_status ?? "Available";
  }
  addActivity("Maintenance Closed", "maintenance_ticket", ticket.ticket_id, `Maintenance ticket ${ticket.ticket_id} closed.`);
  res.json(ticket);
});

export default router;
