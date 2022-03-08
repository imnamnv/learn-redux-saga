router

- login
- admin: layout

common:

- 404
- private page

component

feature

- auth: - login - sign up - forgot password
- admin/dashboard
- admin/student

auth

- authSlice: Login, logout
- authSaga

### Student feature

- Routing:
  /admin/student: List student
  /admin/student/add: add student
  /admin/student/:studentId: update student

- Component:
  AddEdit Page
  List Page

- Redux Store:
  Loading
  List Student
  Filter
  Pagination
