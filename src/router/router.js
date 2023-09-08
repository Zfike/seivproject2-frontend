import { createRouter, createWebHistory } from "vue-router";


import CourseList from "../views/CourseList.vue";
import AddCourse from "../views/AddCourse.vue";
// import DeleteCourse from "./views/DeleteCourse.vue";
import EditCourse from "../views/EditCourse.vue";
import ViewCourse from "../views/ViewCourse.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/2023/project2/t1/",
      name: "list",
      component: CourseList,
    },
    {
      path: "/2023/project2/t1/add",
      name: "add",
      component: AddCourse,
    },
    {
      path: "/2023/project2/t1/edit/:id",
      name: "edit",
      component: EditCourse,
      props: true,
    },
    {
    path: "/2023/project2/t1/view/:id",
    name: "view",
    component: ViewCourse,
    props: true,
    },
  ],
});

export default router;
