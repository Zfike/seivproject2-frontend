<script setup>
import services from "../services/services.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const valid = ref(false);
const course = ref({});
const message = ref("Enter data and click save");

const props = defineProps({
  id: {
    required: true,
  },
});

const errors = ref({});


const retrieveCourse = async () => {
  try {
    const response = await services.getCourse(props.id);
    course.value = response.data;
  } catch (e) {
    message.value = e.response.data.message;
  }
};

const updateCourse = async () => {
  const data = {
    dept: course.value.dept,
    courseNo: course.value.courseNo,
    level: course.value.level,
    hours: course.value.hours,
    name: course.value.name,
    description: course.value.description,
  };
  try {
    const response = await services.updateCourse(props.id, data);
    course.value.id = response.data.id;
    router.push({ name: "list" });
  } catch (e) {
    message.value = e.response.data.message;
  }
};

function goBack() {
  const pageQueryParam = router.currentRoute.value.query.page;
  const destination = pageQueryParam ? { name: "list", query: { page: pageQueryParam } } : { name: "list" };
  router.push(destination);
}

onMounted(() => {
  retrieveCourse();
});

</script>

<template>
  <div id="body">
    <h1>Course Edit</h1>
    <h2>{{ message }}</h2>
    <h4>{{ course.name }}</h4>
    <br />

    <div class="form">


      <div class="form-group">
        <label for="dept">
          Dept
          <span id="deptErr" class="text-error">{{ errors.dept || "*" }}</span>
        </label>
        <v-text-field v-model="course.dept" variant="outlined" id="dept"></v-text-field>
      </div>

      <div class="form-group">
        <label for="courseNo">
          Course Number
          <span id="courseNoErr" class="text-error">{{
            errors.courseNo || "*"
          }}</span>
        </label>
        <v-text-field v-model="course.courseNo" variant="outlined" id="courseNo"></v-text-field>
      </div>

      <div class="form-group">
        <label for="level">
          Level
          <span id="levelErr" class="text-error">{{
            errors.level || "*"
          }}</span>
        </label>
        <v-text-field v-model="course.level" variant="outlined" id="level"></v-text-field>
      </div>

      <div class="form-group">
        <label for="hours">
          Hours
          <span id="hoursErr" class="text-error">{{
            errors.hours || "*"
          }}</span>
        </label>
        <v-text-field v-model="course.hours" variant="outlined" id="hours"></v-text-field>
      </div>

      <div class="form-group">
        <label for="name">
          Course Name
          <span id="nameErr" class="text-error">{{
            errors.name || "*"
          }}</span>
        </label>
        <v-text-field v-model="course.name" variant="outlined" id="name"></v-text-field>
      </div>

      <div class="form-group">
        <label for="description">
          Description
          <span id="descriptionErr" class="text-error">{{
            errors.description || "*"
          }}</span>
        </label>
        <v-text-field v-model="course.description" variant="outlined" id="description"></v-text-field>
      </div>

    </div>

    <br />

    <button class="success" name="Save" v-on:click.prevent="updateCourse()">
      Update
    </button>
    
    <button name="cancel" v-on:click.prevent="goBack()">Cancel</button>
  </div>
</template>

<style></style>