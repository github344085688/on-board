import Vue from 'vue';
import Router from 'vue-router';
import Login from '../modules/login/login';
import DefaultMainLayout from '../components/layout/default-main-layout';
import AddReceipt from '../modules/wms/add-receipt/add-receipt';
import AddOrder from '../modules/wms/add-order/add-order';
import auth from "../shared/auth";

Vue.use(Router);
let router = new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'Login'}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/wms',
      name: 'Wms',
      component: DefaultMainLayout,
      children: [
        {
          path: 'inventory/AddReceipt',
          name: 'AddReceipt',
          component: AddReceipt,
        },
        {
          path: 'outbound/AddOrder',
          name: 'AddOrder',
          component: AddOrder,
        }
      ]
    }

  ]
});


router.beforeEach(async (to, from, next) => {
  if (to.matched.length > 0) {
    if (to.name === 'Login') {
      next();
    } else {
      if (auth.isSignIn()) {
        if (to.params) await auth.setUserCompletion(to.params, from, to);
        next();
      } else {
        next({replace: true, name: 'Login'});
      }
    }
  } else {
    next({replace: true, name: 'Login'});
  }

});

export default router;
