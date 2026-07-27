import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="eyebrow">Let&apos;s make the decision clearer.</p>
        <a className="footer-email" href="mailto:chotchuang.cc@gmail.com">
          chotchuang.cc@gmail.com
        </a>
      </div>
      <div className="footer-meta">
        <Link href="/project">All projects</Link>
        <Link href="/files">Work files</Link>
        <span>Bangkok, Thailand</span>
        <span>© {new Date().getFullYear()} Chotchuang</span>
      </div>
    </footer>
  );
}
