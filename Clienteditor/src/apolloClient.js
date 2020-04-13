import gql from 'graphql-tag';

const getProblems = gql`
  query getAllProblems {
    allProblems {
      id
      problemName
      description
      problemTests
    }
  }
`;

const problemsByAuthor = gql`
  query problemsByAuthor($email: String) {
    problemsByAuthor(email: $email) {
      id
      problemName
      problemTests
      description
      difficultyLevel
      email
    }
  }
`;

const getToken = gql`
  query getToken($id: ID!) {
    getToken(id: $id) {
      token
    }
  }
`;

const allTests = gql`
  query getTest {
    allTests {
      id
      testName
      difficultyLevel
      email
      createdAt
      problems {
        id
      }
    }
  }
`;

const testsByAuthor = gql`
  query testsByAuthor($email: String) {
    testsByAuthor(email: $email) {
      id
      testName
      difficultyLevel
    }
  }
`;

const testByToken = gql`
  query getTest($token: String) {
    testByToken(token: $token) {
      id
      problems {
        id
        problemName
        description
      }
    }
  }
`;

const sendMail = gql`
  mutation mailSender($mailBody: String, $email: String) {
    sendMail(mailBody: $mailBody, email: $email) {
      success
      message
    }
  }
`;

const addProblem = gql`
  mutation addNewProblem(
    $problemName: String
    $description: String
    $problemTests: JSON
    $difficultyLevel: String
    $email: String
  ) {
    addProblem(
      data: {
        problemName: $problemName
        description: $description
        problemTests: $problemTests
        difficultyLevel: $difficultyLevel
        email: $email
      }
    ) {
      success
      message
      problems {
        id
        problemName
        problemTests
        description
        difficultyLevel
        email
      }
    }
  }
`;

const deleteProblem = gql`
  mutation deleteProblem($id: ID) {
    deleteProblem(id: $id) {
      id
      problemName
      problemTests
      description
      difficultyLevel
      email
    }
  }
`;

const updateProblem = gql`
  mutation updateProblem(
    $id: ID!
    $problemName: String
    $description: String
    $problemTests: JSON
    $difficultyLevel: String
  ) {
    updateProblem(
      id: $id
      data: {
        problemName: $problemName
        description: $description
        problemTests: $problemTests
        difficultyLevel: $difficultyLevel
      }
    ) {
      success
      message
    }
  }
`;

const addTest = gql`
  mutation addNewTest(
    $testName: String
    $difficultyLevel: String
    $email: String
    $problems: [ID]
  ) {
    addTest(
      data: {
        testName: $testName
        difficultyLevel: $difficultyLevel
        email: $email
        problems: $problems
      }
    ) {
      success
      message
    }
  }
`;

const deleteTest = gql`
  mutation deleteTest($id: ID) {
    deleteTest(id: $id) {
      id
      testName
      difficultyLevel
      problems {
        id
        problemName
        problemTests
        description
        difficultyLevel
        email
      }
    }
  }
`;
const updateTest = gql`
  mutation updateTest(
    $id: ID
    $testName: String
    $difficultyLevel: String
    $problems: [ID]
  ) {
    updateTest(
      id: $id
      data: {
        testName: $testName
        difficultyLevel: $difficultyLevel
        problems: $problems
      }
    ) {
      success
      message
    }
  }
`;

const addUser = gql`
  mutation addNewUser($name: String, $email: String, $collegeName: String) {
    addUser(data: { name: $name, email: $email, collegeName: $collegeName }) {
      success
      message
      user {
        name
        id
        collegeName
      }
    }
  }
`;
const addTestProblem = gql`
  mutation addTestProblem($t_id: Int, $p_id: Int) {
    addTestProblem(data: { t_id: $t_id, p_id: $p_id }) {
      success
      message
      test {
        id
        testName
        difficultyLevel
        problems {
          id
          problemName
          problemTests
          description
          difficultyLevel
          email
        }
      }
    }
  }
`;

const getProblemById = gql`
  query getProblemById($id: ID!) {
    problemById(id: $id) {
      id
      description
      createdAt
      difficultyLevel
      problemName
      problemTests
    }
  }
`;

const getTestById = gql`
  query getTestById($id: ID!) {
    testById(id: $id) {
      id
      testName
      difficultyLevel
      problems {
        id
        problemName
        problemTests
        description
        difficultyLevel
        email
      }
    }
  }
`;

const addAttempt = gql`
  mutation addAttempt($u_id: ID, $t_id: ID, $solutions: JSON) {
    addAttempt(data: { u_id: $u_id, t_id: $t_id, solutions: $solutions }) {
      success
      message
    }
  }
`;
export const apolloClient = {
  addAttempt,
  sendMail,
  getTestById,
  getProblems,
  getProblemById,
  testsByAuthor,
  deleteProblem,
  updateProblem,
  updateTest,
  allTests,
  problemsByAuthor,
  addProblem,
  addTest,
  addTestProblem,
  deleteTest,
  addUser,
  getToken,
  testByToken,
};
