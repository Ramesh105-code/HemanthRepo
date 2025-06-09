import { useState } from 'react';
import StudentTable from './StudentTable';

const initialStudents = [
  { id : 1, name:"Rao",subject:"Math",score:92},
  { id : 2, name:"Raji",subject:"Science",score:48},
  { id : 3, name:"Ravi",subject:"English",score:65},
  { id : 4, name:"Ram",subject:"Math",score:35},
  { id : 5, name:"Kranthi",subject:"Science",score:81},
  { id : 6, name:"Anji",subject:"English",score:74},
  { id : 7, name:"Dev",subject:"Science",score:90},
  { id : 8, name:"Zoya",subject:"Math",score:90},
];

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortedStudents,setSortedStudents] = useState([]);

  useEffect(() => {
    const sorted = [...students].sort((a,b) =>
    sortOrder == "asc" ? a.score - b.score : b.score - a.score
  );
  setSortedStudents(sorted);
  },[students, sortOrder]);
  const averageScore = (students.reduce((sum,s) => sum + s.score,0)/students.length).toFixed(2);

  const subjectState = students.reduce((acc,student) => {
    acc[student.subject] = acc[student.subject] || [];
    acc[student.subject].push(student.score);
    return acc;
  },{});

  const subjectAverages = Object.entries(subjectStates).map(
    ([subject,scores]) => ({
      subject,
      avg:scores.reduce((a,b) => a + b, 0) /scores.length,
    })
  );
  const topSubject = subjectAverages.reduce((top,current) =>
  current.avg > top.avg ? current : top);

  const passPercentage = (
    (students.filter((s) => s.score >= 40).legnth / students.length) * 100
  ).toFixed(2);

  const higherScore = Math.max(...students.map((s) => s.score));
  const toppers = students.filter((s) => s.score === highestScore);



  return (
      <div style = {{ padding: "1rem",fontfamily:"sans-serif"}}>
        <h1>EduTrack - student Performance Dashboard</h1>
        <div style = {{ marginBottom:"1rem",padding:"1rem",border:"1px solid #ccc"}}>
          <h2>Analytics</h2>
          <p>Average Score: {averageScore}</p>
          <p>Top Subject: {topSubject.subject} (Avg:{topSubject.avg.toFixed(2)})</p>
          <p>Pass Percentage: {passPercentage}%</p>
      </div>

      <div style = {{ marginBottom:"1rem"}}>
        <strong>Topper(s):</strong>
        {toppers.map((s) => '${s.name}(${s.score})').join(", ")}
      </div>


      <div style = {{marginBottom:"1rem"}}>
        <label>Sort by Score:</label>
        <select value = {sortOrder} onChange = {(e) => setSortOrder(e.target.value)}>
          <option value ="asc">Ascending</option>
          <option value ="desc">Descending</option>
        </select>
        </div>
        
        <StudentTable students = {sortedStudents}/>

        </div>
      );
  }

export default App
