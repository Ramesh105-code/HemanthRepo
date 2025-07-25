
db.students.aggregate([
  { $group: { _id: "$subject", averageMarks: { $avg: "$marks" } } }
]);

db.students.aggregate([
  {
    $group: {
      _id: "$subject",
      highestMarks: { $max: "$marks" },
      lowestMarks: { $min: "$marks" }
    }
  }
]);

db.students.aggregate([
  { $group: { _id: "$subject", studentCount: { $sum: 1 } } }
]);

db.students.find({ marks: { $gt: 80 } });

/*
 Alternatively using aggregation:
db.students.aggregate([
  { $match: { marks: { $gt: 80 } } }
]);
*/

db.students.aggregate([
  { $group: { _id: null, totalMarks: { $sum: "$marks" } } }
]);

db.students.aggregate([
  { $group: { _id: "$class", averageMarks: { $avg: "$marks" } } }
]);

db.students.aggregate([
  { $group: { _id: "$subject", avgMarks: { $avg: "$marks" } } },
  { $sort: { avgMarks: -1 } },
  { $limit: 1 }
]);

db.students.aggregate([
  { $match: { marks: { $lt: 70 } } },
  {
    $project: {
      _id: 0,
      name: 1,
      subject: 1,
      marks: 1,
      status: { $literal: "Needs Improvement" }
    }
  }
]);

db.students.aggregate([
  { $sort: { subject: 1, marks: -1 } },
  {
    $group: {
      _id: "$subject",
      topStudents: {
        $push: {
          name: "$name",
          marks: "$marks"
        }
      }
    }
  },
  {
    $project: {
      topStudents: { $slice: ["$topStudents", 2] }
    }
  }
]);

db.students.aggregate([
  {
    $group: {
      _id: "$subject",
      totalStudents: { $sum: 1 },
      passedStudents: {
        $sum: {
          $cond: [{ $gte: ["$marks", 40] }, 1, 0]
        }
      }
    }
  },
  {
    $project: {
      _id: 1,
      passPercentage: {
        $multiply: [
          { $divide: ["$passedStudents", "$totalStudents"] },
          100
        ]
      }
    }
  }
]);
