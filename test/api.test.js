/* eslint-disable no-undef */
import app from '../src/app.js';
import {closePool} from '../src/utils/db.js';
import {getNotFound} from './errorTests.js';
import {deleteStudent, postStudent} from './studentTests.js';

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

  let testUserID = '';
  // TODO: Test create student
  // Hint: Create a new student using the postStudent(app, student) function.
  // If successful, save the student ID to global variable testUserID.
  it('should create new student', async () => {
    const result = await postStudent(app, student);
    testUserID = result.id;
  });

  // TODO: Test delete student
  // Hint: Delete a student using the deleteStudent(app, testUserID) function.
  it('should delete student', async () => {
    await deleteStudent(app, testUserID);
  });
});

// TODO: Test create student file error
// Hint: Use the postStudentFileError(app, student) function.

// TODO: Test create student validation error, no name
// Hint: Use the postStudentNameError(app, student) function.

// TODO: Test get all students
// Hint: Use the getStudents(app) function.

// TODO: Test get single student
// Hint: Retrieve a single student using the getSingleStudent(app, testUserID) function.

// TODO: Test get single student error
// Hint: Use the getSingleStudentError(app, 999999) function to attempt to fetch a non-existent student.

// TODO: Test update student
// Hint: Update a student using the putStudent(app, newStudent, testUserID) function.
// Provide the newStudent data for the update operation.

// TODO: Test delete student
// Hint: Delete a student using the deleteStudent(app, testUserID) function.

// Test error handling

// TODO: Test the getNotFound function for error handling.
// Hint: Verify that the function responds with an appropriate error message.

// TODO: Test the getSingleStudentError function for error handling.
// Hint: Verify that the function responds with an appropriate error message when attempting to fetch a non-existent student.

// TODO: Test the postStudentFileError function for error handling.
// Hint: Verify that the function responds with an appropriate error message when adding a student with a file error.

// TODO: Test the postStudentNameError function for error handling.
// Hint: Verify that the function responds with an appropriate error message when adding a student with missing or invalid name.

// TODO: Test the fileNotFoundError function for error handling.
// Hint: Verify that this function handles file not found errors appropriately.
