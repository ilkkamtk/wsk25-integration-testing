import request from 'supertest';
// test error for some random url, should return 404
const getNotFound = (url) => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/what-is-this')
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.body);
        }
      });
  });
};

// TODO: getSingleStudentError. Should generate error for student not found, should return 404
const getSingleStudentError = (url, studentId) => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/students/${studentId}`)
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.body);
        }
      });
  });
};

// TODO: postStudentFileError. Should generate 400 error for student not added because of missing file
// Also error message needs to be correct.
const postStudentFileError = (url, student) => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/students')
      .set('Content-type', 'form-data')
      .field('student_name', student.name)
      .field('birthdate', student.birthdate)
      .expect(400, (err, response) => {
        if (err) {
          reject(err);
        } else {
          // Check if the error message is correct
          expect(response.body.message).toBe('File not found');
          resolve(response.body);
        }
      });
  });
};

// TODO: postStudentNameError. Should generate 400 error for student not added because of missing student_name
// Also error message needs to be correct.
const postStudentNameError = (url, student) => {

// TODO: fileNotFoundError. Should generate 404 error for file not found

export {
  getNotFound,
  // getSingleStudentError,
  // postStudentFileError,
  // postStudentNameError,
  // fileNotFoundError,
};
