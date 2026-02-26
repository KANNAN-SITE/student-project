const express = require("express");
const path= require("path");
const cors = require("cors")
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);


app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const { data, error } = await supabase
    .from("contacts")
    .insert([{ name, email, message }]);

  if (error) return res.status(500).json(error);

  res.json({ success: true });
});



app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});