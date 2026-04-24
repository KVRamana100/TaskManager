require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.get("/tasks", async (req, res) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const { data, error } = await supabase
    .from("tasks")
    .insert([{ title, done: false }])
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

app.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  const { data, error } = await supabase
    .from("tasks")
    .update({ done })
    .eq("id", id)
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
