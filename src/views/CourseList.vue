<script setup>
import { ref, computed, onMounted } from "vue";
import services from "../services/services.js";
import CourseDisplay from "../components/CourseDisplay.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const courses = ref(null);
const message = ref("");
const currentPage = ref(1); // Initialize the current page to 1
const selectedDept = ref(""); // Initialize the department filter

// On component mount, retrieve the current page from localStorage (if it exists)
onMounted(() => {
  const savedPage = localStorage.getItem("currentPage");
  const savedDept = localStorage.getItem("selectedDept");
  if (savedPage) {
    currentPage.value = parseInt(savedPage, 10);
  }
  if (savedDept) {
    selectedDept.value = savedDept;
  }
});

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

// Define a ref for totalPages
const totalPages = computed(() => {
  if (!filteredCourses.value) return 1; // Handle the case where filteredCourses is not defined
  return Math.ceil(filteredCourses.value.length / coursesPerPage);
});

// Function to change the current page
function changePage(page) {
  currentPage.value = page;

  // Save the current page to localStorage
  localStorage.setItem("currentPage", page.toString());
}

function toFirstPage() {
  localStorage.removeItem("currentPage"); // Clear the current page from local storage
  currentPage.value = 1; // Set the current page to 1
  router.push({ name: "list", query: { page: 1 } }); // Navigate back to the first page
}

function toLastPage() {
  currentPage.value = totalPages.value;
  
  // Save the current page to localStorage
  localStorage.setItem("currentPage", currentPage.value.toString());
}

// Define a computed property to calculate the courses to display for the current page
const coursesPerPage = 8;

const uniqueDepartments = computed(() => {
  if (!courses.value) return [];
  
  // Extract unique department values from the courses
  const departments = new Set();
  courses.value.forEach(course => {
    departments.add(course.dept);
  });
  return Array.from(departments);
});

const filteredCourses = computed(() => {
  if (!courses.value) return [];
  let filtered = courses.value;
  
  // Apply the department filter
  if (selectedDept.value) {
    filtered = filtered.filter(course => course.dept === selectedDept.value);
  }

  return filtered;
});

const paginatedCourses = computed(() => {
  const startIndex = (currentPage.value - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  return filteredCourses.value.slice(startIndex, endIndex);
});

// Function to update the selected department filter
function updateDeptFilter(dept) {
  selectedDept.value = dept;
  
  // Save the selected department filter to localStorage
  localStorage.setItem("selectedDept", dept);
}
function clearIconText() {
      // Customize the text for the clear button here
      return 'X';
    }
</script>

<template>
  <div id="body">
    <h1>Course List</h1>

    <!-- Dept Filter -->
    <v-row>
    <v-col cols="12" sm="6" md="4">
    <v-select
      v-model="selectedDept"
      :items="uniqueDepartments"
      label="Filter by Department"
      variant="solo-filled"
      clearable 
      :clear-icon="clearIconText"
      @change="updateDeptFilter(selectedDept)"
    ></v-select>
    </v-col>
    </v-row>

    <!-- Pagination Controls -->
    <div class="pagination">
      <div class="pagination-button">
        <button @click="toFirstPage()">&#60;&#60;</button>
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">&#60;</button>
      </div>
      <div class="page-number">Page {{ currentPage }}</div>
      <div class="pagination-button">
        <button @click="changePage(currentPage + 1)" :disabled="currentPage * coursesPerPage >= filteredCourses.length">&#62;</button>
        <button @click="toLastPage()" :disabled="currentPage === totalPages">&#62;&#62;</button>
      </div>
    </div>

    <br />
    
    <div class="grid-container">
      <CourseDisplay
        v-for="course in paginatedCourses"
        :key="course.id"
        :course="course"
        :currentPage="currentPage"
        @deletedCourse="getAllCourses()"
      />
    </div>
  </div>
</template>

<style scoped>
  .v-select {
    width: 200px;
  }
</style>