import { createRouter, createWebHistory } from "vue-router";


import CourseList from "../views/CourseList.vue";
import AddCourse from "../views/AddCourse.vue";
// import DeleteCourse from "./views/DeleteCourse.vue";
import EditCourse from "../views/EditCourse.vue";

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
      name: "addCourse",
      component: AddCourse,
    },
    {
      path: "/2023/project2/t1/edit/:id",
      name: "editCourse",
      component: EditCourse,
      props: true,
    },
  ],
});

export default router;
