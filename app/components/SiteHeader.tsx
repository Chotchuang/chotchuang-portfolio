import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Chotchuang home">
        <span className="brand-mark" aria-hidden="true">
          CC
        </span>
        <span>CHOTCHUANG</span>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/#about">About</Link>
        <Link href="/project">Projects</Link>
        <Link href="/files">Files</Link>
        <a href="mailto:chotchuang.cc@gmail.com">Contact</a>
      </nav>
    </header>
  );
}
