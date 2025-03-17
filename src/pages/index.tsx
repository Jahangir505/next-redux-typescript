import Form from "@/components/Form";
import Table from "@/components/Table";
import { fetchItems } from "@/redux/actions/itemActions";
import { AppDispatch } from "@/redux/store";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="grid grid-cols-5 gap-[32px] row-start-2 items-center sm:items-start">
        <Form />
        <div className="h-[450px] overflow-y-scroll col-span-3">
          <Table />
        </div>
      </main>
    </div>
  );
}
