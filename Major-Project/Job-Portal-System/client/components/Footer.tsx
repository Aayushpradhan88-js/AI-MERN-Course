import Link from "next/link";

const columns = [
  { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
  { title: "Resources", links: ["Blog", "Guides", "For employers", "Help center"] },
  { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
];

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 pt-14 pb-6 border-t border-gray-100">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <p className="text-lg font-bold">Job<span className="text-orange-500">Z</span></p>
          <p className="mt-3 text-sm text-gray-500 max-w-xs">
            Matching people to work based on what they can do, not what their resume says.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="font-semibold text-sm mb-3">{col.title}</p>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-gray-500">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-10 pt-6 border-t border-gray-100 text-xs text-gray-400">
        <p>© 2026 JobZ. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#">Twitter</Link>
          <Link href="#">LinkedIn</Link>
          <Link href="#">Instagram</Link>
        </div>
      </div>
    </footer>
  );
}