// context/CourseContext.jsx
export const CourseContext = createContext();
export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const all = await fetchCourses();
    setCourses(all);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  return (
    <CourseContext.Provider value={{ courses, setCourses, fetchAll, loading }}>
      {children}
    </CourseContext.Provider>
  );
}