# API Testing Screenshots (REST Client)
Requests are in `api.http`. Screenshots show status codes returned by the CareerCoach REST API.

| File | Request | Status |
|------|---------|--------|
| 01_register_201.png | POST /api/auth/register | 201 Created |
| 02_login_200.png | POST /api/auth/login | 200 OK |
| 03_refresh_token_200.png | POST /api/auth/refresh | 200 OK |
| 04_save_profile_200.png | PUT /api/profile | 200 OK |
| 05_get_profile_200.png | GET /api/profile | 200 OK |
| 06_history_200.png | GET /api/generate/history | 200 OK |
| 07_admin_usage_forbidden_403.png | GET /api/admin/usage (normal user) | 403 Forbidden (RBAC) |
| 08_validation_error_400.png | PUT /api/profile (empty education) | 400 Bad Request (Mongoose validation) |
| 09_no_token_unauthorized_401.png | GET /api/profile (no token) | 401 Unauthorized |
