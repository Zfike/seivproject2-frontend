<template>
  <div id="body">
    <h1>Course List</h1>
    <br />
    <h2>{{ message }}</h2>
    
    <!-- Sort buttons or dropdown -->
    <div class="sort-controls">
      <button @click="toggleSortOrder">Sort By Course Number</button>
      <!-- You can add more buttons or a dropdown for selecting sorting criteria -->
    </div>

    <br />
    
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
      <button @click="changePage(currentPage + 1)" :disabled="currentPage * coursesPerPage >= filteredCourses.length">Next</button>
    </div>
  </div>
</template>

<script setup>
import services from "../services/services.js";
import CourseDisplay from "../components/CourseDisplay.vue";

import { ref, onMounted, computed } from "vue";

const courses = ref(null);
const message = ref("");
const currentPage = ref(1); // Initialize the current page to 1
const sortOrder = ref("asc"); // Initialize sorting order to ascending

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
const filteredCourses = computed(() => {
  if (!courses.value) return [];
  return sortCourses(courses.value);
});

const paginatedCourses = computed(() => {
  const startIndex = (currentPage.value - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  return filteredCourses.value.slice(startIndex, endIndex);
});

// Function to change the current page
function changePage(page) {
  currentPage.value = page;
}

// Function to toggle sorting order
function toggleSortOrder() {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
}

// Function to sort courses by courseNo
function sortCourses(courses) {
  if (sortOrder.value === "asc") {
    return courses.slice().sort((a, b) => a.courseNo.localeCompare(b.courseNo));
  } else {
    return courses.slice().sort((a, b) => b.courseNo.localeCompare(a.courseNo));
  }
}
</script>
