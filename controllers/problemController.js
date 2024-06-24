const asyncHandler = require("express-async-handler");
const axios = require("axios");
const Problem = require("../models/problemModel");
// @desc    Get problems
// @route   GET /api/problems
// @access  Private
const getProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findOne({ title: req.params.title });
  console.log(problem)
  if (!problem) {
    res.status(400);
    throw new Error("Problem not found");
  }
  res.status(200).json(problem);
});

const getProblems = asyncHandler(async (req, res) => {
  const problems = await Problem.find();
  res.status(200).json(problems);
});

// @desc    Set problem
// @route   POST /api/problems
// @access  Private
const setProblem = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.statement) {
    res.status(400);
    throw new Error("Please add all the required fields");
  }
  req.body.title = req.body.title.trimEnd()
  console.log(req.body.testcases);
  const problem = await Problem.create({
    title: req.body.title,
    statement: req.body.statement,
    testcases: req.body.testcases,
    constraints: req.body.constraints,
  });

  res.status(200).json(problem);
});

// // @desc    Update problem
// // @route   PUT /api/problems/:id
// // @access  Private
const updateProblem = asyncHandler(async (req, res) => {
  try {
    const updatedProblem = await Problem.findOneAndUpdate(
      { title: req.query.title },
      req.body,
      { new: true }
    );

    if (!updatedProblem) {
      res.status(404).send("Problem not found");
      return;
    }
    res.status(200).send(updatedProblem);
  } catch (err) {
    console.error("Error updating problem:", err);
    res.status(500).send("Cannot update the problem");
  }
});

// // @desc    Delete problem
// // @route   DELETE /api/problems/:id
// // @access  Private
const deleteProblem = asyncHandler(async (req, res) => {
  console.log(req.params.title);
  try {
    const deletedProblem = await Problem.findOneAndDelete({
      title: req.params.title,
    });

    if (!deletedProblem) {
      res.status(404).send("Problem not found");
      return;
    }
    res.status(200).send(deletedProblem);
  } catch (err) {
    console.error("Error deleting problem:", err);
    res.status(500).send("Cannot delete the problem");
  }
});

const deleteAllProblems = asyncHandler(async (req, res) => {
  try {
    await Problem.deleteMany({});

    res.status(200).send("All problems deleted");
  } catch (err) {
    console.error("Error deleting problem:", err);
    res.status(500).send("Cannot delete the problem");
  }
});

const generateFileName = (language) => {
  switch (language) {
    case "cpp":
      return "main.cpp"; // Judge0 language ID for C++
    case "java":
      return "main.java"; // Judge0 language ID for Java
    case "python":
      return "main.py"; // Judge0 language ID for Python
    default:
      return "main.type";
  }
};

const runCode = asyncHandler(async (req, res) => {
  const { code, language, input } = req.body;
  const fileName = generateFileName(language);
  const headers = {
    Authorization: `Token ${process.env.GLOT_TOKEN}`,
    "Content-type": "application/json",
  };

  const data = {
    files: [
      {
        name: fileName,
        content: code,
      },
    ],
    stdin: input,
  };
  // Create a new Axios instance with custom baseURL to handle proxying
  const axiosInstance = axios.create({
    baseURL: "https://glot.io",
    headers: headers,
    transformRequest: [(data) => JSON.stringify(data)], // Ensure request data is stringified
  });

  try {
    // Send modified request to glot.io using the Axios instance
    const response = await axiosInstance.post(
      `/api/run/${language}/latest`,
      data
    );

    // Handle the response from glot.io
    if (response.data.stderr !== "") {
      res.status(200).json({ output: response.data.stderr });
    } else {
      res.status(200).json({ output: response.data.stdout });
    }
  } catch (error) {
    console.log("Error occurred: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const submitCode = asyncHandler(async (req, res) => {
  const { code, language, title } = req.body;
  const problem = await Problem.findOne({ title: title.title });
  const fileName = generateFileName(language);
  const headers = {
    Authorization: `Token ${process.env.GLOT_TOKEN}`,
    "Content-type": "application/json",
  };
  const outputs = [];
  const promises = problem.testcases.map(async (testcase) => {
    console.log(testcase);
    const data = {
      files: [
        {
          name: fileName,
          content: code,
        },
      ],
      stdin: testcase.input,
    };

    // Create a new Axios instance with custom baseURL to handle proxying
    const axiosInstance = axios.create({
      baseURL: "https://glot.io",
      headers: headers,
      transformRequest: [(data) => JSON.stringify(data)], // Ensure request data is stringified
    });

    try {
      // Send modified request to glot.io using the Axios instance
      const response = await axiosInstance.post(
        `/api/run/${language}/latest`,
        data
      );

      console.log(response.data);
      // Handle the response from glot.io
      if (response.data.stderr !== "") {
        outputs.push("Error");
        outputs.push(response.data.stderr);
      }
      if (response.data.stdout.trimEnd() === testcase.output)
      // The trimEnd is to remove any escape sequence from the output.
        outputs.push("Accepted");
    } catch (error) {
      console.log("Error occurred: ", error);
    }
  });

  await Promise.all(promises);
  console.log(outputs);
  if (outputs[outputs.length - 2] == "Error")
    res.status(200).json({ output: outputs[outputs.length - 1] });
  if (outputs.length === problem.testcases.length)
    res.status(200).json({ output: "Accepted" });
  else res.status(200).json({ output: "Wrong Answer" });
});
// now you need to implement the judge0 logic here
module.exports = {
  getProblem,
  getProblems,
  setProblem,
  updateProblem,
  deleteProblem,
  deleteAllProblems,
  runCode,
  submitCode,
};
