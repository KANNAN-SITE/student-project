const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));  
// POST route
app.post("/contact", async (req, res) => {
  console.log("FORM DATA:", req.body);

  const { name, email, message } = req.body;

  const { data, error } = await supabase
    .from("contacts")
    .insert([{ name, email, message }]);

  if (error) {
    console.log("SUPABASE ERROR:", error.message);
    return res.status(500).json(error);
  }

  res.json({ success: true });
});


// test route
app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});


// server start
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});