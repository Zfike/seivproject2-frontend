<script setup>
import services from "../services/services.js";
import CourseDisplay from "../components/CourseDisplay.vue";

import { ref, onMounted, computed } from "vue";

const courses = ref(null);
const message = ref("");
const currentPage = ref(1); // Initialize the current page to 1

onMounted(() => {
  getAllCourses();
});

function getAllCourses() {
  services.getAllCourses()
    .then((response) => {
      courses.value = response.data;
      message.value = "";
    })
    .catch((error) => {
      message.value = "Error: " + error.code + ":" + error.message;
      console.log(error);
    });
}

// Define a computed property to calculate the courses to display for the current page
const coursesPerPage = 10;
const paginatedCourses = computed(() => {
  if (!courses.value) return [];
  const startIndex = (currentPage.value - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  return courses.value.slice(startIndex, endIndex);
});

// Function to change the current page
function changePage(page) {
  currentPage.value = page;
}
</script>

<template>
  <div id="body">
    <h1>Course List</h1>
    <br />
    <h2>{{ message }}</h2>
    <div class="grid-container">
      <CourseDisplay
        v-for="course in paginatedCourses"
        :key="course.id"
        :course="course"
        @deletedCourse="getAllCourses()"
      />
    </div>
    
    <br />
    <br />

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="!courses || (courses.value && currentPage * coursesPerPage >= courses.value.length)">Next</button>
    </div>
  </div>
</template>


<style></style>
