function calculateFinalGrades(students) {
    return students
        .map(student => {
           
            const sumOfScores = student.scores.reduce((acc, score) => acc + score, 0);
           
            const numberOfScores = student.scores.length;
           
            const finalGrade = Math.round(sumOfScores / numberOfScores);
            return { id: student.id, name: student.name, finalGrade };
        })
        
        .filter(student => student.finalGrade >= 70);
}
const students = [
    { id: 1, name: "Alice", scores: [85, 90, 92] },
    { id: 2, name: "Bob", scores: [70, 68, 72] },
    { id: 3, name: "Charlie", scores: [60, 65, 58] },
    { id: 4, name: "David", scores: [75, 80, 78] }
];
const passedStudents = calculateFinalGrades(students);
console.log(passedStudents);