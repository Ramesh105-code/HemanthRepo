// App.jsx
<BrowserRouter>
  <AuthProvider>
    <CourseProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/dashboard/new" element={<AddCourse />} />
        <Route path="/dashboard/edit/:id" element={<EditCourse />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CourseProvider>
  </AuthProvider>
</BrowserRouter>