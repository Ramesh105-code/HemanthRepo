const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/relationshipsDemo")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


const User = require("./models/User");
const Profile = require("./models/Profile");
const Author = require("./models/Author");
const Book = require("./models/Book");
const Student = require("./models/Student");
const Course = require("./models/Course");

const run = async () => {

  await Promise.all([User.deleteMany(), Profile.deleteMany(), Author.deleteMany(), Book.deleteMany(), Student.deleteMany(), Course.deleteMany()]);

  
  const user = await User.create({ username: "john_doe" });
  const profile = await Profile.create({ bio: "I love coding!", user: user._id });

  const userWithProfile = await User.findById(user._id).populate("profile");
  console.log("\nONE-TO-ONE:", userWithProfile);

  
  const author = await Author.create({ name: "J.K. Rowling" });
  await Book.create({ title: "Harry Potter 1", author: author._id });
  await Book.create({ title: "Harry Potter 2", author: author._id });

  const books = await Book.find().populate("author");
  console.log("\nONE-TO-MANY (Books with Author):", books);


  const student1 = await Student.create({ name: "Alice" });
  const student2 = await Student.create({ name: "Bob" });

  const course1 = await Course.create({ title: "Math" });
  const course2 = await Course.create({ title: "Science" });

  
  student1.courses.push(course1._id, course2._id);
  student2.courses.push(course1._id);
  await student1.save();
  await student2.save();

  course1.students.push(student1._id, student2._id);
  course2.students.push(student1._id);
  await course1.save();
  await course2.save();

  const populatedStudent = await Student.findOne({ name: "Alice" }).populate("courses");
  console.log("\nMANY-TO-MANY (Student with Courses):", populatedStudent);
};

run();
