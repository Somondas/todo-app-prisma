"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    if (response.ok) {
      const todo = await response.json();
      console.log("Todo added:", todo);
      setTitle(""); // Clear form inputs
      setDescription("");
    } else {
      console.error("Failed to add todo");
    }
  };
  return (
    <>
      <div className="w-full bg-violet-700 flex justify-center items-center h-20">
        <h1 className="text-4xl text-white">Todo app</h1>
      </div>
      <div className="w-full h-auto flex justify-center items-center py-4 ">
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="border-2 border-black"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Description"
            className="border-2 border-black"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Item
          </button>
        </form>
      </div>
    </>
  );
}
