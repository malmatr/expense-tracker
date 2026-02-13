"use client";

import { useState, useRef, useEffect } from "react";

import { currencyFormatter } from "@/lib/utils";

import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";
import Modal from "@/components/Modal";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Firebase
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

// Icons
import { FaRegTrashAlt } from "react-icons/fa";

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
  const [income, setIncome] = useState([]);
  console.log(income);

  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();

  // Handler Functions
  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    const collectionRef = collection(db, "income");

    try {
      const docSnap = await addDoc(collectionRef, newIncome);

      // Update State
      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          },
        ];
      });

      descriptionRef.current.value = "";
      amountRef.current.value = "";
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteIncomeEntryHandler = async (incomeId) => {
    const docRef = doc(db, "income", incomeId);
    try {
      await deleteDoc(docRef);
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });

      setIncome(data);
    };
  }, []);

  return (
    <>
      {/* // { Add Income Modal } */}
      <Modal show={showAddIncomeModal} onClose={setShowAddIncomeModal}>
        <form onSubmit={addIncomeHandler} className="felx felx-col gap-4">
          <div className="flex flex-col gap-4">
            <label htmlFor="amount">Income Amount</label>
            <input
              className="px-4 py-2 bg-slate-600 rounded-xl"
              type="number"
              name="amount"
              ref={amountRef}
              min={0.01}
              step={0.01}
              placeholder="Enter income amount"
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="description">Description</label>
            <input
              className="px-4 py-2 bg-slate-600 rounded-xl"
              type="text"
              name="description"
              ref={descriptionRef}
              placeholder="Enter income description"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add entry
          </button>
        </form>

        <div className="flex flex-col gap-4 mt-6">
          <h3 className="text-2xl font-bold">Income History</h3>

          {income.map((i) => {
            return (
              <div className="flex item-center justify-between" key={i.id}>
                <div>
                  <p className="font-semibold">{i.description}</p>
                  <small className="text-xs">{i.createdAt.toISOString()}</small>
                </div>
                <p className="flex item-center gap-2">
                  {currencyFormatter(i.amount)}
                  <button
                    onClick={() => {
                      deleteIncomeEntryHandler(i.id);
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </p>
              </div>
            );
          })}
        </div>
      </Modal>

      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
        </section>

        <section className="flex itmes-center gap-2 py-3">
          <button
            onClick={() => {
              setShowAddIncomeModal(true);
            }}
            className="btn btn-primary"
          >
            + Expenses
          </button>
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
    </>
  );
}
