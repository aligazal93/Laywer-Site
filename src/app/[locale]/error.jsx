"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("PAGE ERROR:", error);
    console.error("ERROR MESSAGE:", error?.message);
    console.error("ERROR STACK:", error?.stack);
  }, [error]);

  return (
    <section className="min-h-screen bg-primary px-5 py-40 text-center text-white">
      <h1 className="mb-4 text-2xl font-bold">حدث خطأ في الصفحة</h1>

      <pre className="mx-auto max-w-4xl overflow-auto rounded-xl bg-black/40 p-4 text-left text-sm">
        {error?.message}
      </pre>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-xl bg-secondary px-6 py-3 font-bold text-white"
      >
        إعادة المحاولة
      </button>
    </section>
  );
}