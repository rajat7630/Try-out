import Home from './Home.svelte';
import Admin from './routes/Admin.svelte';
import Login from './routes/Login.svelte';
import Problems from './routes/Problems.svelte';
import Tests from './routes/Tests.svelte';
import SendTest from './routes/send_test.svelte';
import NewTest from './routes/test/add_test.svelte';
import EditTest from './routes/update_test/edit_test.svelte';
import NewProblem from './routes/problem/add_problem.svelte';
import EditProblem from './routes/update_problem/edit_problem.svelte';
import Thankyou from './routes/thankyou.svelte';
import Pubnub from './routes/pubnub.svelte';
import Introduce from './routes/introduce_yourself.svelte';
import AdminPanel from './routes/AdminPanel.svelte';

function userIsAdmin() {
    //check if user is admin and returns true or false
    return document.cookie ? true : false;
}

function notAdmin() {
    return document.cookie ? false : true;
}

const routes = [{
        name: '/',
        component: Login,
        onlyIf: { guard: notAdmin, redirect: '/admin' },
    },
    {
        name: '/newtest',
        component: NewTest,
        onlyIf: { guard: userIsAdmin, redirect: '/' },
    },
    {
        name: '/newProblem',
        component: NewProblem,
        onlyIf: { guard: userIsAdmin, redirect: '/' },
    },
    {
        name: '/editProblem/:id',
        component: EditProblem,
        onlyIf: { guard: userIsAdmin, redirect: '/' },
    },
    {
        name: '/editTest/:id',
        component: EditTest,
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
        name: '/sendtest/:id',
        component: SendTest,
        onlyIf: { guard: userIsAdmin, redirect: '/' },
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
        name: '/showtests',
        component: AdminPanel,
        onlyIf: { guard: userIsAdmin, redirect: '/' },
    },
    {
        name: '/showresults',
        component: AdminPanel,
        onlyIf: { guard: userIsAdmin, redirect: '/' },
    },
    {
        name: '/admin',
        component: AdminPanel,
        onlyIf: { guard: userIsAdmin, redirect: '/' },
    },
];

export { routes };