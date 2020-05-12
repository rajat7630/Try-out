import Home from './Home.svelte';
import Admin from './routes/Admin.svelte';
import Login from './routes/Login.svelte';
import Problems from './routes/Problems.svelte';
import Tests from './routes/Tests.svelte';
import SendTest from './routes/send_test.svelte';
import NewTest from './routes/newTest.svelte';
import EditTest from './routes/editTest.svelte';
import NewProblem from './routes/problem/add_problem.svelte';
import EditProblem from './routes/update_problem/edit_problem.svelte';
import Thankyou from './routes/thankyou.svelte';
import Pubnub from './routes/pubnub.svelte';

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
    component: Login,
  },
  {
    name: '/newtest',
    component: NewTest,
  },
  {
    name: '/newProblem',
    component: NewProblem,
  },
  {
    name: '/editProblem/:id',
    component: EditProblem,
  },
  {
    name: '/editTest/:id',
    component: EditTest,
  },
  {
    name: '/admin',
    component: Admin,
  },
  {
    name: '/test/:id',
    component: Tests,
  },
  {
    name: '/problem/:id',
    component: Problems,
  },
  {
    name: '/sendtest/:id',
    component: SendTest,
  },
  {
    name: '/givetest/:token',
    component: Home,
  },
  {
    name: '/thankyou',
    component: Thankyou,
  },
  {
    name: '/pubnub',
    component: Pubnub,
  },
  {
    name: '/home',
    component: Home,
  },
  {
    name: '/sendtest/:id',
    component: SendTest,
  },
];

export { routes };
