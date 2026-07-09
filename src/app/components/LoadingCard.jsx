import { getDictionary } from "@/lib/getDictionary";

export default function LoadingCard({ locale }) {
  return (
    <div className="relative inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="w-[90%] max-w-[420px] rounded-[28px]  p-8 text-center ">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-secondary/20 border-t-secondary" />
        </div>



      </div>
    </div>
  );
}