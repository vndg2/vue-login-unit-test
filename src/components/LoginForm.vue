<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            v-model="form.username"
            id="username"
            placeholder="Enter username"
          />
          <span v-if="errors.username" class="error">{{ errors.username }}</span>
        </div>
  
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            v-model="form.password"
            id="password"
            placeholder="Enter password"
          />
          <span v-if="errors.password" class="error">{{ errors.password }}</span>
        </div>
  
        <button type="submit">Login</button>
      </form>
    </div>
  </template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  username: "",
  password: ""
});

const errors = reactive({
  username: null,
  password: null
});


const validateForm = () => {
  let isValid = true;

  errors.username = null;
  errors.password = null;

  if (!form.username) {
    errors.username = "Username is required.";
    isValid = false;
  }

  if (!form.password) {
    errors.password = "Password is required.";
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
    isValid = false;
  }

  return isValid;
};

const handleLogin = () => {
  if (validateForm()) {
    alert("Login successful");
    console.log("Login successful with", form);
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  font-size: 0.875rem;
  margin-top: 5px;
  display: block;
}
</style>

