import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    try {
      const todo = await prisma.todo.create({
        data: {
          title,
          description,
        },
      });
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: "Failed to create todo" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
