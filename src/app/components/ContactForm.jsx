"use client";

import { useSendEmail } from "@/hooks/useSendContact";
import { getDictionary } from "@/lib/getDictionary";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactForm({ locale }) {
  const dict = getDictionary(locale);
  const { mutate, isPending } = useSendEmail();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(formData, {
      onSuccess: (res) => {
        toast.success(res?.message || "تم إرسال الرسالة بنجاح");

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "حدث خطأ أثناء إرسال الرسالة"
        );
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-start">
      <div>
        <label className="mb-2 block text-custom16 font-bold text-white">
          {dict.contactForm.fullName}
        </label>

        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder={dict.contactForm.fullNamePlaceholder}
          className="h-[52px] w-full rounded-xl bg-[#131C31] px-4 text-custom14 text-white outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-custom16 font-bold text-white">
          {dict.contactForm.email}
        </label>

        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
          className="h-[52px] w-full rounded-xl bg-[#131C31] px-4 text-custom14 text-white outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-custom16 font-bold text-white">
          {dict.contactForm.phone}
        </label>

        <input
          dir="ltr"
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="+966 500000000"
          className="h-[52px] w-full rounded-xl bg-[#131C31] px-4 text-start text-custom14 text-white outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-custom16 font-bold text-white">
          {dict.contactForm.subject}
        </label>

        <input
          type="text"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          placeholder={dict.contactForm.messagePlaceholder}
          className="h-[52px] w-full rounded-xl bg-[#131C31] px-4 text-custom14 text-white outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-custom16 font-bold text-white">
          {dict.contactForm.message}
        </label>

        <textarea
          rows="6"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full resize-none rounded-xl bg-[#131C31] px-4 py-4 text-custom14 text-white outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex h-[54px] w-full items-center justify-center rounded-xl bg-secondary text-custom14 font-bold text-white transition-all duration-300 hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? dict.contactForm.sending : dict.contactForm.sendButton}
      </button>
    </form>
  );
}