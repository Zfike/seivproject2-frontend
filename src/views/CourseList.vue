<script setup>
import CourseServices from "../services/services.js";
import CourseDisplay from "../components/CourseDisplay.vue";

import { ref, onMounted } from "vue";

const courses = ref(null);
const message = ref("");

onMounted(() => {
  getAllCourses();
});

function getAllCourses() {
  CourseServices.getAllCourses()
    .then((response) => {
      courses.value = response.data;
      message.value = "";
    })
    .catch((error) => {
      message.value = "Error: " + error.code + ":" + error.message;
      console.log(error);
    });
}
</script>

<template>
  <div id="body">
    <h1>Course List</h1>
    <br />
    <h2>{{ message }}</h2>
    <div class="grid-container">
      <CourseDisplay
        v-for="course in courses"
        :key="course.id"
        :course="course"
        @deletedCourse="getAllCourses()"
      />
    </div>
  </div>
</template>

<style></style>
