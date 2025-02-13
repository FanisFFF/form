"use client";

import { useState, useEffect, FormEvent } from "react";

export default function TaskForm() {
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [budgetFrom, setBudgetFrom] = useState("");
  const [budgetTo, setBudgetTo] = useState("");
  const [deadline, setDeadline] = useState("");
  const [reminds, setReminds] = useState("");
  const [allAutoResponses, setAllAutoResponses] = useState(false);

  const [ruleBudgetFrom, setRuleBudgetFrom] = useState("");
  const [ruleBudgetTo, setRuleBudgetTo] = useState("");
  const [ruleDeadlineDays, setRuleDeadlineDays] = useState("");
  const [ruleQtyFreelancers, setRuleQtyFreelancers] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rules = {
      budget_from: Number(ruleBudgetFrom),
      budget_to: Number(ruleBudgetTo),
      deadline_days: Number(ruleDeadlineDays),
      qty_freelancers: Number(ruleQtyFreelancers),
    };

    const baseUrl =
      "https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask";
    const url = new URL(baseUrl);

    url.searchParams.append("token", token);
    url.searchParams.append("title", title);
    url.searchParams.append("description", description);
    url.searchParams.append("tags", tags);
    url.searchParams.append("budget_from", budgetFrom);
    url.searchParams.append("budget_to", budgetTo);
    url.searchParams.append("deadline", deadline);
    url.searchParams.append("reminds", reminds);
    url.searchParams.append("all_auto_responses", String(allAutoResponses));
    url.searchParams.append("rules", JSON.stringify(rules));

    try {
      const response = await fetch(url.toString());
      if (response.ok) {
        alert("Задача опубликована");
      } else {
        alert("Ошибка публикации: " + response.status);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert("Ошибка: " + error.message);
      } else {
        alert("Неизвестная ошибка");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Новая задача</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Token</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Заголовок </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">
            Теги 
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">
              Бюджет от
            </label>
            <input
              type="number"
              value={budgetFrom}
              onChange={(e) => setBudgetFrom(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">
              Бюджет до 
            </label>
            <input
              type="number"
              value={budgetTo}
              onChange={(e) => setBudgetTo(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">
              Дедлайн (в днях)
            </label>
            <input
              type="number"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">
              Напоминания 
            </label>
            <input
              type="number"
              value={reminds}
              onChange={(e) => setReminds(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={allAutoResponses}
              onChange={(e) =>
                setAllAutoResponses(e.target.checked)
              }
              className="mr-2"
            />
            Все автоматические ответы 
          </label>
        </div>

        <fieldset className="border p-4 rounded mb-4">
          <legend className="font-bold">Правила </legend>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">
                Бюджет от
              </label>
              <input
                type="number"
                value={ruleBudgetFrom}
                onChange={(e) =>
                  setRuleBudgetFrom(e.target.value)
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">
                Бюджет до
              </label>
              <input
                type="number"
                value={ruleBudgetTo}
                onChange={(e) =>
                  setRuleBudgetTo(e.target.value)
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">
                Дедлайн (в днях)
              </label>
              <input
                type="number"
                value={ruleDeadlineDays}
                onChange={(e) =>
                  setRuleDeadlineDays(e.target.value)
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">
                Количество фрилансеров
              </label>
              <input
                type="number"
                value={ruleQtyFreelancers}
                onChange={(e) =>
                  setRuleQtyFreelancers(e.target.value)
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Опубликовать задачу
        </button>
      </form>
    </div>
  );
}
