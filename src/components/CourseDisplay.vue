<script setup>
import services from "../services/services.js";
import { ref } from "vue";
const props = defineProps({
  course: Object, // Assuming 'course' is passed as a prop
  currentPage: Number, // Define currentPage as a prop
});
const emit = defineEmits(["deletedCourse"]);

const show = ref(false);
const deleteError = ref(false);

function deletedCourse() {
  emit("deletedCourse");
}

function deleteCourse(id) {
  services.deleteCourse(id)
    .then((response) => {
      show.value = false;
      deleteError.value = false;
      deletedCourse();
    })
    .catch((error) => {
      console.log(error);
      deleteError.value = true;
    });
}
</script>
<template>
  <div class="grid-item">{{ props.course.courseNo }}</div>
  <div class="grid-item">{{ props.course.name }}</div>

  <div class="grid-item">
  <router-link
    :to="{ name: 'view', params: { id: props.course.id }, query: { page: currentPage } }"
    custom
    v-slot="{ navigate }"
  >
    <button @click="navigate" role="link">View</button>
  </router-link>
</div>


  <div class="grid-item">
    <router-link
      :to="{ name: 'edit', params: { id: props.course.id } }"
      custom
      v-slot="{ navigate }"
    >
      <button @click="navigate" role="link">Edit</button>
    </router-link>
  </div>

  <div class="grid-item">
    <button @click="show = true" role="link">Delete</button>
  </div>
  

  <div v-if="show" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span @click="show = false" class="close">&times;</span>
        <p v-if="!deleteError">
          Are you sure you want to delete <br />
          {{ props.course.name }} ?
        </p>
        <p v-if="deleteError">
          Error deleting<br />{{ props.course.name }}.
        </p>
      </div>
      <br />
      <div class="modal-body">
        <button v-if="!deleteError" v-on:click="show = false">
          No, cancel
        </button>
        <button
          v-if="!deleteError"
          class="error"
          v-on:click="deleteCourse(props.course.id)"
        >
          Yes, delete
        </button>
        <button
          v-if="deleteError"
          v-on:click="
            deleteError = false;
            show = false;
          "
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
