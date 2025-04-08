const axios = require("axios");
const dotenv = require("dotenv").config();
const data = {
  code: `print("hello this is a test!")`,
  language: "python",
  title: { title: { title: "First element" } },
  input: "",
};

const runCode = async (data) => {
  const axiosInstance = axios.create({
    baseURL: process.env.VERCEL_URL,
  });
  
  console.log("SERVER ENV:", process.env.VERCEL_URL);

  try {
    const response = await axiosInstance.post("/api/problems/run", data);
    console.log(response.data.output)
  } catch (error) {
    console.log("Error occurred: ", error);
  }
};

runCode(data);
