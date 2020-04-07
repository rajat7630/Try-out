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
<<<<<<< HEAD
>>>>>>> feat: added pubnub sdk
=======

>>>>>>> feat: pubnub frontend added of admin and user
function userIsAdmin() {
  // check if user is admin and returns true or false
  return !!document.cookie;
}
function notAdmin() {
  return !document.cookie;
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
    onlyIf: { guard: userIsAdmin, redirect: '/' },
  },
  {
    name: '/test/:id',
    component: Tests,
    onlyIf: { guard: userIsAdmin, redirect: '/' },
  },
  {
    name: '/problem/:id',
    component: Problems,
    onlyIf: { guard: userIsAdmin, redirect: '/' },
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
    onlyIf: { guard: userIsAdmin, redirect: '/' },
  },
  {
    name: '/home',
    component: Home,
    onlyIf: { guard: userIsAdmin, redirect: '/' },
  },
  {
    name: '/sendtest/:id',
    component: SendTest,
    onlyIf: { guard: userIsAdmin, redirect: '/' },
  },
  {
    name: '/givetest/:token',
    component: GiveTest,
<<<<<<< HEAD
>>>>>>> feat: added pubnub sdk
=======
    onlyIf: { guard: userIsAdmin, redirect: '/' },
>>>>>>> feat: pubnub frontend added of admin and user
  },
];

export { routes };
