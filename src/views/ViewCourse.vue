<script setup>
import services from "../services/services.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const valid = ref(false);
const course = ref({});
const message = ref("");

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

function cancel() {
  router.push({ name: "list" });
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
          <span id="deptErr" class="text-error">{{
            errors.dept || "*"
          }}</span>
        </label>
        <input v-model="course.dept" type="text" id="dept" />
      </div>

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
        <label for="level">
          Level
          <span id="levelErr" class="text-error">{{
            errors.level || "*"
          }}</span>
        </label>
        <input v-model="course.level" type="text" id="level" />
      </div>

      <div class="form-group">
        <label for="hours">
          Hours
          <span id="hoursErr" class="text-error">{{
            errors.hours || "*"
          }}</span>
        </label>
        <input v-model="course.hours" type="text" id="hours" />
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

      <div class="form-group">
        <label for="description">
          Description
          <span id="descriptionErr" class="text-error">{{
            errors.description || "*"
          }}</span>
        </label>
        <input v-model="course.description" type="text" id="description" />
      </div>

    </div>

    <br />
    
    <button name="cancel" v-on:click.prevent="cancel()">Cancel</button>
  </div>
</template>

<style></style>