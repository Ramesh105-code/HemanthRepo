// CourseForm.jsx
const CourseForm = ({ onSubmit, defaultValues = {} }) => {
    const [formData, setFormData] = useState({ ...defaultValues });
  
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    return (
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
        {/* Input fields for title, price, tag, level, syllabus (comma-separated) */}
        <button type="submit">Save</button>
      </form>
    );
  };