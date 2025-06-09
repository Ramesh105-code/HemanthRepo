function StudentTable({students}){
    const getRowColor = (score) => {
        if(score < 40 ) return "#ffcccc";
        if(score < 70 ) return "#ffffcc";
        return "#ccffcc";
    };
    const getPerformance = (score) => {
        if (score < 40) return "Fail";
        if (score < 70) return "Average";
        return "Excellent";
    };

    if (students.length === 0) return <p>No student data available.</p>;
    return (
        <table style = {{ width: "100%",borderCollapse: "collapse"}}>
            <thead>
                <tr>
                    <th style={{ border:"1px solid #ccc",padding:"8px"}}>Name</th>
                    <th style={{ border:"1px solid #ccc",padding:"8px"}}>Subject</th>
                    <th style={{ border:"1px solid #ccc",padding:"8px"}}>Score</th>
                    <th style={{ border:"1px solid #ccc",padding:"8px"}}>Performance</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr 
                    key={student.id + student.name}
                    style={{ backgroundColor:getRowColor(student.score)}}>
                    <td style={{border:"1px solid #ccc",padding:"8px"}}>{student.name}</td>
                    <td style={{border:"1px solid #ccc",padding:"8px"}}>{student.subject}</td>
                    <td style={{border:"1px solid #ccc",padding:"8px"}}>{student.score}</td>
                    <td style={{border:"1px solid #ccc",padding:"8px"}}>{getPerformance(student.score)}</td>
                    </tr>
                ))}
            </tbody>
            </table>
    );
}
export default StudentTable;