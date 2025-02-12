import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface TaskRules {
  budget_from: string;
  budget_to: string;
  deadline_days: string;
  qty_freelancers: string;
}

interface TaskFormData {
  title: string;
  description: string;
  tags: string;
  budget_from: string;
  budget_to: string;
  deadline: string;
  reminds: string;
  all_auto_responses: boolean;
  rules: TaskRules;
}

export default function TaskForm() {
  const [token, setToken] = useState<string>("");
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    tags: "",
    budget_from: "",
    budget_to: "",
    deadline: "",
    reminds: "",
    all_auto_responses: false,
    rules: {
      budget_from: "",
      budget_to: "",
      deadline_days: "",
      qty_freelancers: "",
    },
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("api_token");
    if (storedToken) setToken(storedToken);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("rules.")) {
      const key = name.split(".")[1] as keyof TaskRules;
      setFormData((prev) => ({
        ...prev,
        rules: { ...prev.rules, [key]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert("Токен не установлен");
      return;
    }

    const url = `https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?token=${token}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Задача опубликована");
      } else {
        alert(`Ошибка: ${result.error || "Неизвестная ошибка"}`);
      }
    } catch (error) {
      alert("Ошибка сети");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Создание задачи</h2>
      <input className="block w-full p-2 border rounded mb-2" placeholder="Токен" value={token} onChange={(e) => {
        setToken(e.target.value);
        localStorage.setItem("api_token", e.target.value);
      }} />
      <input className="block w-full p-2 border rounded mb-2" name="title" placeholder="Название" value={formData.title} onChange={handleChange} />
      <input className="block w-full p-2 border rounded mb-2" name="description" placeholder="Описание" value={formData.description} onChange={handleChange} />
      <input className="block w-full p-2 border rounded mb-2" name="tags" placeholder="Теги" value={formData.tags} onChange={handleChange} />
      <input className="block w-full p-2 border rounded mb-2" name="budget_from" type="number" placeholder="Бюджет от" value={formData.budget_from} onChange={handleChange} />
      <input className="block w-full p-2 border rounded mb-2" name="budget_to" type="number" placeholder="Бюджет до" value={formData.budget_to} onChange={handleChange} />
      <input className="block w-full p-2 border rounded mb-2" name="deadline" type="number" placeholder="Дедлайн (дни)" value={formData.deadline} onChange={handleChange} />
      <input className="block w-full p-2 border rounded mb-2" name="reminds" type="number" placeholder="Напоминания" value={formData.reminds} onChange={handleChange} />
      <label className="flex items-center gap-2">
        <input name="all_auto_responses" type="checkbox" checked={formData.all_auto_responses} onChange={handleChange} />
        Разрешить автоответы
      </label>
      <h3 className="text-lg font-semibold mt-4">Правила</h3>
      <input className="block w-full p-2 border rounded mb-2" name="rules.budget_from" type="number" placeholder="Бюджет от" value={formData.rules.budget_from} onChange={handleChange} />
      <input className="block w-full p-2 border rounded mb-2" name="rules.budget_to" type="number" placeholder="Бюджет до" value={formData.rules.budget_to} onChange={handleChange} />
      <input className="block w-full p-2 border rounded mb-2" name="rules.deadline_days" type="number" placeholder="Дедлайн (дни)" value={formData.rules.deadline_days} onChange={handleChange} />
      <input className="block w-full p-2 border rounded mb-2" name="rules.qty_freelancers" type="number" placeholder="Кол-во фрилансеров" value={formData.rules.qty_freelancers} onChange={handleChange} />
      <button className="w-full mt-4 p-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>Создать задачу</button>
    </div>
  );
}
