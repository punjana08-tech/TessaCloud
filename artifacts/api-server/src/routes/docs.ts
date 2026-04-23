import { Router, type IRouter } from "express";

const router: IRouter = Router();

const openApiDocument = {
  openapi: "3.1.0",
  info: {
    title: "Asset Tracker API",
    version: "1.0.0",
    description: "Documented API for employee asset tracking, assignments, returns, maintenance, and reports.",
  },
  servers: [{ url: "/api", description: "Base API path" }],
  tags: [
    { name: "health", description: "Server health operations" },
    { name: "dashboard", description: "Summary and reporting operations" },
    { name: "employees", description: "Employee management operations" },
    { name: "assets", description: "Asset inventory operations" },
    { name: "assignments", description: "Asset assignment and return operations" },
    { name: "maintenance", description: "Asset repair and maintenance operations" },
  ],
  paths: {
    "/healthz": { get: { tags: ["health"], summary: "Health check", description: "Returns server health status.", responses: { "200": { description: "Server is healthy" } } } },
    "/dashboard/summary": { get: { tags: ["dashboard"], summary: "View dashboard summary", description: "Returns employee, asset, and assignment counts for HR overview.", responses: { "200": { description: "Dashboard summary returned" } } } },
    "/reports/department-assets": { get: { tags: ["dashboard"], summary: "View department-wise asset report", description: "Returns active assigned asset count grouped by department.", responses: { "200": { description: "Report returned" } } } },
    "/activities/recent": { get: { tags: ["dashboard"], summary: "View recent activity", description: "Returns latest asset-management actions.", responses: { "200": { description: "Activity list returned" } } } },
    "/employees": { get: { tags: ["employees"], summary: "View all employees", description: "Returns all employees sorted by name.", responses: { "200": { description: "Employee list returned" } } }, post: { tags: ["employees"], summary: "Add a new employee", description: "Creates an employee record with employee code, name, email, department, designation, and joining date.", responses: { "201": { description: "Employee created" }, "400": { description: "Required fields missing" }, "409": { description: "Duplicate employee code or email" } } } },
    "/employees/{employee_id}": { get: { tags: ["employees"], summary: "View one employee", description: "Returns one employee by employee_id.", parameters: [{ name: "employee_id", in: "path", required: true, schema: { type: "integer" } }], responses: { "200": { description: "Employee returned" }, "404": { description: "Employee not found" } } }, put: { tags: ["employees"], summary: "Update employee details", description: "Updates mutable employee fields.", parameters: [{ name: "employee_id", in: "path", required: true, schema: { type: "integer" } }], responses: { "200": { description: "Employee updated" }, "404": { description: "Employee not found" } } }, delete: { tags: ["employees"], summary: "Delete employee record", description: "Deletes an employee only when they have no active assignments.", parameters: [{ name: "employee_id", in: "path", required: true, schema: { type: "integer" } }], responses: { "204": { description: "Employee deleted" }, "409": { description: "Employee has active assignments" } } } },
    "/employees/{employee_id}/deactivate": { patch: { tags: ["employees"], summary: "Deactivate employee", description: "Marks an employee inactive.", parameters: [{ name: "employee_id", in: "path", required: true, schema: { type: "integer" } }], responses: { "200": { description: "Employee deactivated" } } } },
    "/employees/{employee_id}/assignments": { get: { tags: ["employees"], summary: "View employee assignment history", description: "Returns all assignments linked to an employee.", parameters: [{ name: "employee_id", in: "path", required: true, schema: { type: "integer" } }], responses: { "200": { description: "Assignment history returned" } } } },
    "/assets": { get: { tags: ["assets"], summary: "View all assets", description: "Returns all registered assets sorted by tag.", responses: { "200": { description: "Asset list returned" } } }, post: { tags: ["assets"], summary: "Add a new asset", description: "Registers a company asset in the inventory.", responses: { "201": { description: "Asset created" }, "400": { description: "Required fields missing" }, "409": { description: "Duplicate asset tag" } } } },
    "/assets/{asset_id}": { get: { tags: ["assets"], summary: "View one asset", description: "Returns one asset by asset_id.", parameters: [{ name: "asset_id", in: "path", required: true, schema: { type: "integer" } }], responses: { "200": { description: "Asset returned" }, "404": { description: "Asset not found" } } }, put: { tags: ["assets"], summary: "Update asset details", description: "Updates mutable asset fields.", parameters: [{ name: "asset_id", in: "path", required: true, schema: { type: "integer" } }], responses: { "200": { description: "Asset updated" } } }, delete: { tags: ["assets"], summary: "Delete asset record", description: "Deletes an asset only when it has no active assignment.", parameters: [{ name: "asset_id", in: "path", required: true, schema: { type: "integer" } }], responses: { "204": { description: "Asset deleted" }, "409": { description: "Asset has active assignment" } } } },
    "/assets/{asset_id}/mark-broken": { patch: { tags: ["assets"], summary: "Mark asset as broken", description: "Marks an asset broken and damaged.", parameters: [{ name: "asset_id", in: "path", required: true, schema: { type: "integer" } }], responses: { "200": { description: "Asset marked broken" } } } },
    "/assets/{asset_id}/retire": { patch: { tags: ["assets"], summary: "Retire an asset", description: "Marks an asset retired from inventory.", parameters: [{ name: "asset_id", in: "path", required: true, schema: { type: "integer" } }], responses: { "200": { description: "Asset retired" } } } },
    "/assets/{asset_id}/assignments": { get: { tags: ["assets"], summary: "View asset assignment history", description: "Returns all assignments for one asset.", parameters: [{ name: "asset_id", in: "path", required: true, schema: { type: "integer" } }], responses: { "200": { description: "Assignment history returned" } } } },
    "/assignments": { get: { tags: ["assignments"], summary: "View all assignments", description: "Returns all assignment records.", responses: { "200": { description: "Assignment list returned" } } }, post: { tags: ["assignments"], summary: "Assign asset to employee", description: "Creates an active assignment and updates the asset status to Assigned.", responses: { "201": { description: "Assignment created" }, "409": { description: "Employee inactive or asset unavailable" } } } },
    "/assignments/active": { get: { tags: ["assignments"], summary: "View active assignments", description: "Returns assignments that have not been returned.", responses: { "200": { description: "Active assignments returned" } } } },
    "/assignments/{assignment_id}/return": { patch: { tags: ["assignments"], summary: "Return asset from employee", description: "Marks assignment returned and makes the asset available again.", parameters: [{ name: "assignment_id", in: "path", required: true, schema: { type: "integer" } }], responses: { "200": { description: "Assignment returned" }, "409": { description: "Assignment already returned" } } } },
    "/maintenance": { get: { tags: ["maintenance"], summary: "View maintenance tickets", description: "Returns all repair tickets.", responses: { "200": { description: "Ticket list returned" } } }, post: { tags: ["maintenance"], summary: "Create maintenance ticket", description: "Creates a repair ticket and updates the asset status to Maintenance.", responses: { "201": { description: "Ticket created" } } } },
    "/maintenance/{ticket_id}/close": { patch: { tags: ["maintenance"], summary: "Close maintenance ticket", description: "Closes a repair ticket and updates related asset condition/status.", parameters: [{ name: "ticket_id", in: "path", required: true, schema: { type: "integer" } }], responses: { "200": { description: "Ticket closed" } } } },
  },
};

router.get("/openapi.json", (_req, res) => {
  res.json(openApiDocument);
});

router.get("/docs", (_req, res) => {
  res.type("html").send(`<!doctype html>
<html>
<head>
  <title>Asset Tracker API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>SwaggerUIBundle({ url: '/api/openapi.json', dom_id: '#swagger-ui' });</script>
</body>
</html>`);
});

export default router;
