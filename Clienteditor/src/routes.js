import Home from './Home.svelte';
import Admin from './routes/Admin.svelte';
import Login from './routes/Login.svelte';
import Problems from './routes/Problems.svelte';
import Tests from './routes/Tests.svelte';
import SendTest from './routes/send_test.svelte';
import NewTest from './routes/newTest.svelte';
import EditTest from './routes/editTest.svelte';
import NewProblem from './routes/addProblem.svelte';
import EditProblem from './routes/editProblem.svelte';
import Thankyou from './routes/thankyou.svelte';
function userIsAdmin() {
  //check if user is admin and returns true or false
  return document.cookie ? true : false;
}
function notAdmin() {
  return document.cookie ? false : true;
}

const routes = [
  {
    name: '/',
    component: Login
    // onlyIf: { guard: notAdmin,redirect: '/admin' }
  },
  {
    name: '/newtest',
    component: NewTest
  },
  {
    name: '/newProblem',
    component: NewProblem
  },
  {
    name: '/editProblem/:id',
    component: EditProblem
  },
  {
    name: '/editTest/:id',
    component: EditTest
  },
  {
    name: '/admin',
    component: Admin
  },
  {
    name: '/test/:id',
    component: Tests
  },
  {
    name: '/problem/:id',
    component: Problems
  },
  {
    name: '/sendtest/:id',
    component: SendTest
  },
  {
    name: '/givetest/:token',
    component: Home
  },
  // {
  //   name:'givetest/:token/thankyou',
  //   component:Thankyou
  // }
];

export { routes };
