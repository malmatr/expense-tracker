"use client";

import { currencyFormatter } from "@/lib/utils";

import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = {
  expenses: [
    {
      id: 1,
      title: "Entertainment",
      color: "#800",
      amount: 500,
    },
    {
      id: 2,
      title: "Movies",
      color: "#009",
      amount: 200,
    },
    {
      id: 3,
      title: "Fuel",
      color: "#090",
      amount: 1200,
    },
    {
      id: 4,
      title: "Gas",
      color: "#080",
      amount: 500,
    },
  ],
};

export default function Home() {
  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <section className="py-3">
        <small className="text-gray-400 text-md">My Balance</small>
        <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
      </section>

      <section className="flex itmes-center gap-2 py-3">
        <button className="btn btn-primary">+ Expenses</button>
        <button className="btn btn-primary-outline">+ Income</button>
      </section>

      {/* { Expenses } */}
      <section className="py-6">
        <h3 className="text-2xl">My Expenses</h3>
        <div className="flex flex-col gap-4 mt-6">
          {DUMMY_DATA.expenses.map((expense) => {
            return (
              <ExpenseCategoryItem
                key={expense.id}
                color={expense.color}
                title={expense.title}
                amount={expense.amount}
              />
            );
          })}
        </div>
      </section>

      {/* { Chart Section } */}
      <section className="py-6">
        <h3 className="text-2xl">Stats</h3>
        <div className="w-1/2 mx-auto">
          <Doughnut
            data={{
              labels: DUMMY_DATA.expenses.map((expense) => expense.title),
              datasets: [
                {
                  label: "Expenses",
                  data: DUMMY_DATA.expenses.map((expense) => expense.amount),
                  backgroundColor: DUMMY_DATA.expenses.map(
                    (expense) => expense.color,
                  ),
                  borderColor: ["#18181b"],
                  borderWidth: 5,
                },
              ],
            }}
          />
        </div>
      </section>
    </main>
  );
}
