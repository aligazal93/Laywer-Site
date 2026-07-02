import Link from "next/link";

export default function SocialLink({
  href,
  children,
  label,
}) {
  return (
    <li>
      <Link
        href={href || "#"}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#0D3158] text-secondary transition hover:bg-secondary hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}