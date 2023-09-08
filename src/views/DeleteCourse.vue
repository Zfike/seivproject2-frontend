<script setup>
import services from "../services/services.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const message = ref("");

const props = defineProps({
  id: {
    required: true,
  },
});

const course = ref({});
const errors = ref({});

onMounted(() => {
  services.getCourse(props.id)
    .then((response) => {
      course.value = response.data[0];
      message.value = "";
    })
    .catch((error) => {
      message.value = "Error: " + error.code + ":" + error.message;
      console.log(error);
    });
});

function cancel() {
  router.push({ name: "list" });
}
</script>

<template>
  <div id="body">
    <h1>Course Edit</h1>
    <h2>{{ message }}</h2>
    <h4>{{ course.name }}</h4>
    <br />
    <div class="form">
      <div class="form-group">
        <label for="courseNo">
          Course Number
          <span id="idNumberErr" class="text-error">{{
            errors.idNumber || "*"
          }}</span>
        </label>
        <input v-model="course.idNumber" type="text" id="idNumber" />
      </div>

      <div class="form-group">
        <label for="name">
            Name
          <span id="nameErr" class="text-error">{{
            errors.name || "*"
          }}</span>
        </label>
        <input v-model="course.name" type="text" id="name" />
      </div>
    </div>
    <br />
    <button class="success" name="Save" v-on:click.prevent="deleteCourse()">
      Delete
    </button>
    <button name="cancel" v-on:click.prevent="cancel()">Cancel</button>
  </div>
</template>

<style></style>