import request from 'supertest';

// TODO: Test the getStudents function. Verify that it fetches and validates the list of students.
const getStudents = async (url) => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/students')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result = response.body;
          expect(result).toBeInstanceOf(Array);
          result.forEach((student) => {
            expect(student).toHaveProperty('student_id');
            expect(student).toHaveProperty('student_name');
            expect(student).toHaveProperty('birthdate');
            expect(student).toHaveProperty('filename');
          });
          resolve(result);
        }
      });
  });
};

// TODO: Test the getSingleStudent function. Verify that it fetches and validates a single student.
const getSingleStudent = async (url, studentId) => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/students/${studentId}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result = response.body;
          expect(result).toHaveProperty('student_id');
          expect(result).toHaveProperty('student_name');
          expect(result).toHaveProperty('birthdate');
          expect(result).toHaveProperty('filename');
          resolve(result);
        }
      });
  });
};

// TODO: Test the postStudent function. Verify that it adds a student and validates the response: id and message.
const postStudent = async (url, student) => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/students')
      .set('Content-type', 'form-data')
      .attach('image', student.image)
      .field('student_name', student.name)
      .field('birthdate', student.birthdate)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result = response.body;
          expect(result.message).toBe('Student created successfully');
          expect(result.id).not.toBe('');
          resolve(result);
        }
      });
  });
};

// TODO: Test the putStudent function. Verify that it updates a student and validates the response: id and message.
const putStudent = async (url, studentId, newStudent) => {
  return new Promise((resolve, reject) => {
    request(url)
      .put(`/api/v1/students/${studentId}`)
      .set('Content-type', 'application/json')
      .send(newStudent)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result = response.body;
          expect(result.message).toBe('Student updated successfully');
          expect(result.id).toBe(studentId);
          resolve(result);
        }
      });
  });
};

// TODO: Test the deleteStudent function. Verify that it deletes a student and validates the response: id and message.
const deleteStudent = async (url, studentId) => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/v1/students/${studentId}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result = response.body;
          expect(result.message).toBe('Student deleted successfully');
          expect(result.id).toBe(studentId);
          resolve(result);
        }
      });
  });
};

export {getStudents, postStudent, putStudent, deleteStudent};
