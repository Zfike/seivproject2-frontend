<script setup>
import CourseServices from "../services/CourseServices.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const message = ref("");

const course = ref({});
const errors = ref({});

function addCourse() {
  CourseServices.addCourse(course.value)
    .then(() => {
      router.push({ name: "list" });
    })
    .catch((error) => {
      if (error.response != null && error.response.status == "406") {
        for (let obj of error.response.data) {
          if (obj.attributeName === undefined) {
            obj.attributeName = "courseNo";
          }
          errors.value[obj.attributeName] = obj.message;
        }
      } else {
        message.value = "Error: " + error.code + ":" + error.message;
        console.log(error);
        console.log(error);
      }
    });
}
function cancel() {
  router.push({ name: "list" });
}
</script>

<template>
  <div id="body">
    <h1>Course Add</h1>
    <h2>{{ message }}</h2>
    <h4>{{ course.name }}</h4>
    <br />
    <div class="form">
      <div class="form-group">
        <label for="courseNo">
          Course Number
          <span id="courseNoErr" class="text-error">{{
            errors.courseNo || "*"
          }}</span>
        </label>
        <input v-model="course.courseNo" type="text" id="courseNo" />
      </div>

      <div class="form-group">
        <label for="name">
          Course Name
          <span id="nameErr" class="text-error">{{
            errors.name || "*"
          }}</span>
        </label>
        <input v-model="course.name" type="text" id="name" />
      </div>

    </div>
    <br />
    <button class="success" name="Save" v-on:click.prevent="addCourse()">
      Add
    </button>
    <button name="Cancel" v-on:click.prevent="cancel()">Cancel</button>
  </div>
</template>
