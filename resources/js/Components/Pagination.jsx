import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
  return (
    <nav className="text-center mt-4">
      {links.map((link) => (
        <Link
        preserveScroll
          key={link.label} // Unique key for each link, typically not user-facing text
          href={link.url}  // The URL to which the link should navigate
          className={`mx-1 ${link.active ? 'font-bold' : ''} ${link.url ? ' inline-block hover:bg-gray-950 py-3 px-3 rounded-xl' : 'text-gray-500 cursor-not-allowed'}`}
          dangerouslySetInnerHTML={{ __html: link.label }} // Safely set inner HTML
        />
      ))}
    </nav>
  );
}
