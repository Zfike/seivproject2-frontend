import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost/course-t1",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getCourses() {
    return apiClient.get("/courses", { crossOrigin: true });
  },
  getCourse(id) {
    return apiClient.get("/courses/" + id, { crossOrigin: true });
  },
  addCourse(course) {
    return apiClient.post("/courses", course, { crossOrigin: true });
  },
  updateCourse(course) {
    return apiClient.put("/courses/" + course.id, course, {
      crossOrigin: true,
    });
  },
  deleteCourse(id) {
    return apiClient.delete("/courses/" + id, {
      crossOrigin: true,
    });
  },
};
