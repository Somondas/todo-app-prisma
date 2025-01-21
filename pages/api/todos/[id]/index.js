import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query; // Extract id from query

  if (req.method === "DELETE") {
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    try {
      await prisma.todo.delete({
        where: { id: parseInt(id, 10) },
      });

      res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete todo" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
