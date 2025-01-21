import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { method, query } = req;

  if (method === "GET") {
    // Fetch all todos
    try {
      const todos = await prisma.todo.findMany();
      res.status(200).json(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({ error: "Failed to fetch todos" });
    }
  } else if (method === "POST") {
    // Add a new todo
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    try {
      const newTodo = await prisma.todo.create({
        data: { title, description },
      });
      res.status(201).json(newTodo);
    } catch (error) {
      console.error("Error adding todo:", error);
      res.status(500).json({ error: "Failed to add todo" });
    }
  } else if (method === "DELETE") {
    // Delete a todo by ID
    const { id } = query;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    try {
      await prisma.todo.delete({
        where: { id: parseInt(id, 10) }, // Ensure ID is a number
      });
      res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      console.error("Error deleting todo:", error);
      res.status(500).json({ error: "Failed to delete todo" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
