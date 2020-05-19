import gql from 'graphql-tag';

const getProblems = gql `
  query getAllProblems {
    allProblems {
      id
      problemName
      description
      problemTests
      tags
      timelimit
      datalimit
      solution
    }
  }
`;
const getSearchProblems = gql `
  query getSearchProblems($search: String) {
    searchProblems(search: $search) {
      id
      problemName
      description
      problemTests
      tags
      timelimit
      datalimit
      solution
    }
  }
`;
const getSearchTests = gql `
  query getSearchTests($search: String) {
    searchTests(search: $search) {
      id
      testName
      difficultyLevel
      email
      createdAt
      problems
      tags
      timelimit
    }
  }
`;
const problemsByAuthor = gql `
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

const getToken = gql `
  query getToken($id: ID!) {
    getToken(id: $id) {
      token
    }
  }
`;

const allTests = gql `
  query getTest {
    allTests {
      id
      testName
      difficultyLevel
      email
      createdAt
      problems
      tags
      timelimit
    }
  }
`;

const testsByAuthor = gql `
  query testsByAuthor($email: String) {
    testsByAuthor(email: $email) {
      id
      testName
      difficultyLevel
    }
  }
`;

const testByToken = gql `
  query getTest($token: String) {
    testByToken(token: $token) {
      id
      problems
    }
  }
`;

const sendMail = gql `
  mutation mailSender($linktime: String, $email: String, $test_id: String) {
    sendMail(linktime: $linktime, test_id: $test_id, email: $email) {
      success
      message
    }
  }
`;

const addProblem = gql `
  mutation addNewProblem(
    $problemName: String
    $description: String
    $problemTests: JSON
    $email: String
    $timelimit: String
    $datalimit: String
    $tags: String
    $solution: String
  ) {
    addProblem(
      data: {
        problemName: $problemName
        description: $description
        problemTests: $problemTests
        email: $email
        timelimit: $timelimit
        datalimit: $datalimit
        tags: $tags
        solution: $solution
      }
    ) {
      success
      message
      problems {
        id
        problemName
        problemTests
        description
        email
      }
    }
  }
`;

const deleteProblem = gql `
  mutation deleteProblem($id: ID) {
    deleteProblem(id: $id) {
      id
      problemName
      problemTests
      description
    }
  }
`;

const updateProblem = gql `
  mutation updateProblem(
    $id: ID!
    $problemName: String
    $description: String
    $problemTests: JSON
    $solution: String
    $timelimit: String
    $datalimit: String
    $tags: String
  ) {
    updateProblem(
      id: $id
      data: {
        problemName: $problemName
        description: $description
        problemTests: $problemTests
        solution: $solution
        datalimit: $datalimit
        timelimit: $timelimit
        tags: $tags
      }
    ) {
      success
      message
    }
  }
`;

const addTest = gql `
  mutation addNewTest(
    $testName: String
    $difficultyLevel: String
    $email: String
    $problems: JSON
    $tags: String
    $timelimit: String
  ) {
    addTest(
      data: {
        testName: $testName
        difficultyLevel: $difficultyLevel
        email: $email
        tags: $tags
        timelimit: $timelimit
        problems: $problems
      }
    ) {
      success
      message
    }
  }
`;

const deleteTest = gql `
  mutation deleteTest($id: ID) {
    deleteTest(id: $id) {
      success
      message
    }
  }
`;
const updateTest = gql `
  mutation updateTest(
    $id: ID
    $testName: String
    $difficultyLevel: String
    $problems: JSON
    $tags: String
    $timelimit: String
  ) {
    updateTest(
      id: $id
      data: {
        testName: $testName
        difficultyLevel: $difficultyLevel
        problems: $problems
        tags: $tags
        timelimit: $timelimit
      }
    ) {
      success
      message
    }
  }
`;

const addUser = gql `
  mutation addNewUser(
    $name: String
    $email: String
    $collegeName: String
    $testId: String
  ) {
    addUser(
      data: {
        name: $name
        email: $email
        collegeName: $collegeName
        testId: $testId
      }
    ) {
      success
      message
      token
    }
  }
`;
const addTestProblem = gql `
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
          email
        }
      }
    }
  }
`;

const getProblemById = gql `
  query getProblemById($id: ID!) {
    problemById(id: $id) {
      id
      description
      createdAt
      tags
      timelimit
      datalimit
      problemName
      problemTests
      solution
    }
  }
`;

const getTestById = gql `
  query getTestById($id: ID!) {
    testById(id: $id) {
      id
      email
      testName
      difficultyLevel
      problems
      timelimit
      createdAt
      tags
    }
  }
`;

const getAttempts = gql `
  query getAttempts($id: ID) {
    getAttempt(id: $id) {
      id
      user {
        id
        email
        name
        collegeName
      }
      solutions
      attemptTime
      score
    }
  }
`;

const getAllAttempts = gql `
  query getAllAttempts {
    getAllAttempt {
      id
      user {
        id
        email
        name
        collegeName
      }
      test
      solutions
      attemptTime
      score
    }
  }
`;
const updateAttempt = gql `
  mutation updateAttempt($id: ID, $u_id: ID, $solutions: JSON) {
    updateAttempt(data: { u_id: $u_id, id: $id, solutions: $solutions }) {
      success
      message
    }
  }
`;
const addAttempt = gql `
  mutation addAttempt($u_id: ID, $t_id: ID, $solutions: JSON) {
    addAttempt(data: { u_id: $u_id, t_id: $t_id, solutions: $solutions }) {
      success
      message
      id
    }
  }
`;

const checkIfAvailable = gql `
  mutation checkIfAvailable($problemName: String) {
    checkProblemIfExists(problemName: $problemName) {
      success
      message
    }
  }
`;
const checkTestIfAvailable = gql `
  mutation checkTestIfAvailable($testName: String) {
    checkTestIfExists(testName: $testName) {
      success
      message
    }
  }
`;
export const apolloClient = {
    checkTestIfAvailable,
    checkIfAvailable,
    getAttempts,
    getAllAttempts,
    updateAttempt,
    addAttempt,
    sendMail,
    getTestById,
    getProblems,
    getSearchProblems,
    getSearchTests,
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