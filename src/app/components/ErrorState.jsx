"use client";

import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

export default function ErrorState({
  title = "حدث خطأ",
  description = "تعذر تحميل البيانات، يرجى المحاولة مرة أخرى.",
  onRetry,
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-5">
      <div className="w-full max-w-md rounded-[28px] bg-white p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <FiAlertTriangle size={38} className="text-red-500" />
        </div>

        <h2 className="mt-6 text-custom24 font-bold text-primary">
          {title}
        </h2>

        <p className="mt-3 text-custom14 leading-7 text-gray-500">
          {description}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            <FiRefreshCw size={18} />
            إعادة المحاولة
          </button>
        )}
      </div>
    </div>
  );
}