<script setup>
import { ref, computed, onMounted } from "vue";
import services from "../services/services.js";
import CourseDisplay from "../components/CourseDisplay.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const courses = ref(null);
const message = ref("");
const currentPage = ref(1); // Initialize the current page to 1
const sortOrder = ref("asc"); // Initialize sorting order to ascending
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

// Function to change the current page
function changePage(page) {
  currentPage.value = page;

  // Save the current page to localStorage
  localStorage.setItem("currentPage", page.toString());
}

function toPageOne() {
  localStorage.removeItem("currentPage"); // Clear the current page from local storage
  currentPage.value = 1; // Set the current page to 1
  router.push({ name: "list", query: { page: 1 } }); // Navigate back to the first page
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

//Function to toggle sorting order
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

// Function to update the selected department filter
function updateDeptFilter(dept) {
  selectedDept.value = dept;
  
  // Save the selected department filter to localStorage
  localStorage.setItem("selectedDept", dept);
}
</script>

<template>
  <div id="body">
    <h1>Course List</h1>
    <br />
    <h2>{{ message }}</h2>


    <v-row align="left">
    <v-col cols="12" sm="6" md="4">
    <v-select
      v-model="selectedDept"
      :items="uniqueDepartments"
      label="Filter by Department"
      variant="solo-filled"
      clearable 
      @change="updateDeptFilter(selectedDept)"
    ></v-select>
    </v-col>
    </v-row>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage * coursesPerPage >= filteredCourses.length">Next</button>
    </div>

    <br />
    <button @click="toPageOne()">Go To Page 1</button>
    <br />
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