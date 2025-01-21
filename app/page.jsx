"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch("/api/todos");
      const todos = await response.json();
      setTodos(todos);
      console.log(todos);
    }

    fetchTodos();
  }, []);

  // >> submit
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
      setTodos((prevTodos) => [...prevTodos, todo]);
      setTitle(""); // Clear form inputs
      setDescription("");
    } else {
      console.error("Failed to add todo");
    }
  };
  // >> delete Item
  const deleteItem = async (id) => {
    const response = await fetch(`/api/todos?id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      console.log("Todo deleted");
    } else {
      console.error("Failed to delete todo");
      console.log(response);
    }
  };
  return (
    <>
      <div className="w-full bg-violet-700 flex justify-center items-center h-20">
        <h1 className="text-4xl text-white">Todo app</h1>
      </div>
      <div className="w-full h-auto  py-4 ">
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
        <div className="">
          {todos.length === 0 ? (
            <h1> No items</h1>
          ) : (
            todos.map((i, key) => {
              return (
                <div key={key}>
                  <h1>{i.title}</h1>
                  <h1 className="pink-50">{i.description}</h1>
                  <button onClick={() => deleteItem(i.id)}>Done</button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
