import { createWebHistory, createRouter } from "vue-router";
import List from "@/views/CourseList.vue";
import Search from "@/views/CourseSearch.vue";
import Add from "@/views/CourseAdd.vue";
import Edit from "@/views/CourseEdit.vue";
import Course from "@/views/CourseView.vue";

const routes = [
  {
    path: "/",
    name: "List",
    component: List
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/add",
    name: "Add",
    component: Add
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: Edit,
    props: true
  },
  {
    path: '/course/:id',
    name: 'Course',
    component: Course,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;