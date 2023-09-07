import axios from "axios";

var baseurl = "";
if (import.meta.env.DEV) {
  baseurl = "http://localhost/course/";
} else {
  baseurl = "/course-t1/";
}

const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    crossDomain: true
  }/*,
  transformRequest: (data, headers) => {
    let token = localStorage.getItem("token");
    let authHeader = "";
    if (token != null && token != "") authHeader = "Bearer " + token;
    headers.common["Authorization"] = authHeader;
    return JSON.stringify(data);
  }*/,
  transformResponse: function(data) {
    data = JSON.parse(data);
    if (!data.success && data.code == "expired-session") {
      localStorage.deleteItem("token");
    }
    return data;
  }
});

export default {
  getAllCourses() {
    return apiClient.get("courses");
  },
  // getCourses(start, length) {
  //   return apiClient.get(`courses?start=${start}&length=${length}`);
  // },
  getCourse(id) {
    return apiClient.get("courses/" + id);
  },
  addCourse(course) {
    return apiClient.post("courses", course);
  },
  updateCourse(courseId, course) {
    return apiClient.put("courses/" + courseId, course);
  },
  deleteCourse(courseId) {
    return apiClient.delete("courses/" + courseId);
  }
};