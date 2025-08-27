import { useState } from "react";

export default function TaskForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Botão clicado", { title, description }); // <- log para testar

    const response = await fetch("http://localhost:5000/tasks/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    });

    const data = await response.json();
    console.log("Resposta do backend:", data); // <- log para testar
    onAdd(data);
    setTitle("");
    setDescription("");
};


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <button type="submit">Adicionar Tarefa</button>
        </form>
    )
}