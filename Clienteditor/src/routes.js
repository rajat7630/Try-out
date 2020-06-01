// eslint-disable-next-line prettier/prettier
import Home from './Home.svelte';

import Login from './routes/Login.svelte';
import Problems from './routes/Problems.svelte';
import Tests from './routes/Tests.svelte';
import SendTest from './routes/send_test.svelte';
import NewTest from './routes/test/add_test.svelte';
import EditTest from './routes/update_test/edit_test.svelte';
import NewProblem from './routes/problem/add_problem.svelte';
import EditProblem from './routes/update_problem/edit_problem.svelte';
import Thankyou from './routes/thankyou.svelte';
import Introduce from './routes/introduce_yourself.svelte';
import ProblemPanel from './routes/admin_panel/problems.svelte';
import TestPanel from './routes/admin_panel/tests.svelte';
import AttemptsPanel from './routes/admin_panel/attempts.svelte';

//layout
import AdminLayout from './layouts/admin_layout.svelte';
import PublicLayout from './layouts/public_layout.svelte';

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
    onlyIf: { guard: notAdmin, redirect: '/admin' },
  },
  {
    name: '/givetest/:token',
    component: Introduce,
  },
  {
    name: '/thankyou',
    component: Thankyou,
  },
  {
    name: '/starttest/:token',
    component: Home,
  },
  {
    name: '/test/:id',
    component: Tests,
    layout: AdminLayout,
  },
  {
    name: '/newtest',
    component: NewTest,
    layout: AdminLayout,
  },
  {
    name: '/newProblem',
    component: NewProblem,
    layout: AdminLayout,
  },
  {
    name: '/editProblem/:id',
    component: EditProblem,
    layout: AdminLayout,
  },
  {
    name: '/editTest/:id',
    component: EditTest,
    layout: AdminLayout,
  },

  {
    name: '/problem/:id',
    component: Problems,
    layout: AdminLayout,
  },
  {
    name: '/sendtest/:id',
    component: SendTest,
    layout: AdminLayout,
  },
  {
    name: '/admin',
    layout: AdminLayout,
    onlyIf: { guard: userIsAdmin, redirect: '/' },
    nestedRoutes: [
      {
        name: '/panel',
        layout: PublicLayout,
        nestedRoutes: [
          {
            name: '/showproblems',
            component: ProblemPanel,
          },
          {
            name: '/showtests',
            component: TestPanel,
          },
          {
            name: '/showresults',
            component: AttemptsPanel,
          },
        ],
      },
    ],
  },
];

export { routes };
