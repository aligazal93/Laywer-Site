"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const response = await api.post("/contact-us", formData);

//       toast.success(response?.data?.message || "تم إرسال الرسالة بنجاح");

//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: "",
//       });
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message || "حدث خطأ أثناء الإرسال"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <form className="space-y-5 text-right">
      <div>
        <label className="mb-2 block text-custom16 font-bold text-white">
          الاسم بالكامل *
        </label>

        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="ادخل الاسم بالكامل"
          className="h-[52px] w-full rounded-xl  bg-[#0D2749] px-4 text-custom14 outline-none transition-all duration-300 focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-2 block text-custom16 font-bold text-white">
          البريد الإلكتروني *
        </label>

        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
          className="h-[52px] w-full rounded-xl bg-[#0D2749] px-4 text-custom14 outline-none transition-all duration-300 focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-2 block text-custom16 font-bold text-white">
          رقم الهاتف
        </label>

        <input
          dir="ltr"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+966 500000000"
          className="h-[52px] w-full rounded-xl  bg-[#0D2749] px-4 text-right text-custom14 outline-none transition-all duration-300 focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-2 block text-custom16 font-bold text-white">
          الموضوع
        </label>

        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="كيف يمكننا مساعدتك"
          className="h-[52px] w-full rounded-xl  bg-[#0D2749] px-4 text-custom14 outline-none transition-all duration-300 focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-2 block text-custom16 font-bold text-white">
          الرسالة
        </label>

        <textarea
          rows="6"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="اكتب تفاصيل مشروعك أو استفسارك هنا"
          className="w-full resize-none rounded-xl  bg-[#0D2749] px-4 py-4 text-custom14 outline-none transition-all duration-300 focus:border-primary"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex h-[54px] w-full items-center justify-center rounded-xl bg-secondary text-custom14 font-bold text-white transition-all duration-300 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "جاري الإرسال..." : "إرسال الرسالة"}
      </button>
    </form>
  );
}