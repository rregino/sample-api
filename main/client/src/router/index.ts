import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  // {
  //   path: "/",
  //   alias: "/users",
  //   name: "users",
  //   component: () => import("../components/TutorialsList.vue")
  // },
  // {
  //   path: "/users/:id",
  //   name: "users",
  //   component: () => import("../components/TutorialDetails.vue")
  // },
  {
    path: "/add",
    name: "add",
    component: () => import("../components/AddUser.vue")
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;