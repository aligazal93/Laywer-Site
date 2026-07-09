import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0F172A] px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mt-6 text-7xl font-bold text-white md:text-8xl">
          404
        </h1>

        <h2 className="mt-6 text-3xl font-bold text-white">
          الصفحة غير موجودة
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-gray-300">
          يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها أو حذفها.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/ar"
            className="rounded-xl bg-[#D4AF37] px-8 py-4 font-semibold text-white transition hover:opacity-90"
          >
            العودة للرئيسية
          </Link>

          <Link
            href="/ar/contact"
            className="rounded-xl border border-white/20 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-black"
          >
            تواصل معنا
          </Link>
        </div>
      </div>
    </section>
  );
}