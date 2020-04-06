import Home from './Home.svelte';
import Admin from './routes/Admin.svelte';
import Login from './routes/Login.svelte';
import Problems from './routes/Problems.svelte';
import Tests from './routes/Tests.svelte';
import SendTest from './routes/send_test.svelte';
<<<<<<< HEAD
import NewTest from './routes/newTest.svelte';
import EditTest from './routes/editTest.svelte';
import NewProblem from './routes/addProblem.svelte';
import EditProblem from './routes/editProblem.svelte';
import Thankyou from './routes/thankyou.svelte';

=======
import GiveTest from './routes/give_test.svelte';
import Pubnub from './routes/pubnub.svelte';
>>>>>>> feat: added pubnub sdk
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
<<<<<<< HEAD
    // onlyIf: { guard: notAdmin,redirect: '/admin' }
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
=======
    onlyIf: { guard: notAdmin, redirect: '/admin' },
>>>>>>> feat: added pubnub sdk
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
<<<<<<< HEAD
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
=======
    name: '/pubnub',
    component: Pubnub,
  },
  {
    name: '/home',
    component: Home,
    onlyIf: { guard: userIsAdmin, redirect: '/' },
  },
  {
    name: '/sendtest/:id',
    component: SendTest,
  },
  {
    name: '/givetest/:token',
    component: GiveTest,
>>>>>>> feat: added pubnub sdk
  },
];

export { routes };
