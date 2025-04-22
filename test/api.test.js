/* eslint-disable no-undef */
import app from '../src/app.js';
import {closePool} from '../src/utils/db.js';
import {
  getNotFound,
  getSingleStudentError,
  postStudentFileError,
  postStudentNameError,
} from './errorTests.js';
import {
  deleteStudent,
  getSingleStudent,
  getStudentImage,
  getStudents,
  postStudent,
  putStudent,
} from './studentTests.js';

// TODO: start the tests in this file: create describe and it blocks
// the actual tests are in the other files in this folder

describe('Test API version 1.0', () => {
  // TODO: Close the database connection
  // Hint: Use the closePool() function.
  afterAll(async () => {
    await closePool();
  });

  // TODO: Test not found
  // Hint: Use the getNotFound(app) function.
  it('should respond with not found message', async () => {
    await getNotFound(app);
  });

  // TODO: PostStudent object for testing
  const student = {
    name: 'Jorma',
    birthdate: '1999-05-23',
    image: 'test/cat.jpg',
  };

  let testUserID = 0;
  let createdUser = {};
  // TODO: Test create student
  // Hint: Create a new student using the postStudent(app, student) function.
  // If successful, save the student ID to global variable testUserID.
  it('should create new student', async () => {
    const result = await postStudent(app, student);
    testUserID = result.id;
  });

  // TODO: Test create student file error
  // Hint: Use the postStudentFileError(app, student) function.
  it('should create student file error', async () => {
    const studentWithFileError = {
      name: 'Jorma',
      birthdate: '1999-05-23',
    };
    await postStudentFileError(app, studentWithFileError);
  });

  // TODO: Test create student validation error, no name
  // Hint: Use the postStudentNameError(app, student) function.
  it('should create student name error', async () => {
    const studentWithNameError = {
      birthdate: '1999-05-23',
      image: 'test/cat.jpg',
    };
    await postStudentNameError(app, studentWithNameError);
  });

  // TODO: Test get all students
  // Hint: Use the getStudents(app) function.
  it('should get all students', async () => {
    await getStudents(app);
  });

  // TODO: Test get single student
  // Hint: Retrieve a single student using the getSingleStudent(app, testUserID) function.
  it('should get single student', async () => {
    createdUser = await getSingleStudent(app, testUserID);
  });

  // Get student image
  it('should get student image', async () => {
    await getStudentImage(app, createdUser.filename);
  });

  // TODO: Test update student
  // Hint: Update a student using the putStudent(app, newStudent, testUserID) function.
  // Provide the newStudent data for the update operation.
  it('should update student', async () => {
    const newStudent = {
      student_name: 'Jorma Updated',
      birthdate: '1999-05-23',
    };
    await putStudent(app, testUserID, newStudent);
  });

  // TODO: Test delete student
  // Hint: Delete a student using the deleteStudent(app, testUserID) function.
  it('should delete student', async () => {
    await deleteStudent(app, testUserID);
  });

  // TODO: Test the getSingleStudentError function for error handling.
  // Hint: Verify that the function responds with an appropriate error message when attempting to fetch a non-existent student.
  it('should get single student error', async () => {
    await getSingleStudentError(app, testUserID);
  });

  // TODO: fileNotFoundError. Should generate 404 error for file not found
  it('should generate 404 error for file not found', async () => {
    await getNotFound(app, createdUser.filename);
  });
});
