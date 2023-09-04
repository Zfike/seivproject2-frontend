<script setup>
import CourseServices from "../services/CourseServices.js";
import CourseDisplay from "../components/CourseDisplay.vue";

import { ref, onMounted } from "vue";

const course = ref(null);
const message = ref("");

onMounted(() => {
  getCourses();
});

function getCourses() {
  CourseServices.getCourses()
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
      <StudentDisplay
        v-for="course in course"
        :key="course.id"
        :course="course"
        @deletedCourse="getCourses()"
      />
    </div>
  </div>
</template>

<style></style>
