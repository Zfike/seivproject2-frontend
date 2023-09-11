<script setup>
import services from "../services/services.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
//import { VRow, VCol } from "vuetify";

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
    <h1>Course View</h1>
    <h2>{{ message }}</h2>
    <h4>{{ course.name }}</h4>
    <br />

      <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="4">
        <div class="form-group">
          <label for="dept">Dept</label>
          <div id="dept" class="readonly-field">{{ course.dept }}</div>
        </div>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <div class="form-group">
          <label for="courseNo">Course Number</label>
          <div id="courseNo" class="readonly-field">{{ course.courseNo }}</div>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="4">
        <div class="form-group">
          <label for="level">Level</label>
          <div id="level" class="readonly-field">{{ course.level }}</div>
        </div>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <div class="form-group">
          <label for="hours">Hours</label>
          <div id="hours" class="readonly-field">{{ course.hours }}</div>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="4">
        <div class="form-group">
          <label for="description">Description</label>
          <div id="description" class="textarea">{{ course.description }}</div>
        </div>
      </v-col>
    </v-row>

    <br />
    
    <button name="cancel" v-on:click.prevent="cancel()">Back</button>
  </div>
</template>

<style></style>