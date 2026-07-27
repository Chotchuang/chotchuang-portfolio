import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="eyebrow">Let&apos;s make the decision clearer.</p>
        <a className="footer-email" href="mailto:cc.tsrif@gmail.com">
          cc.tsrif@gmail.com
        </a>
      </div>
      <div className="footer-meta">
        <Link href="/project">All projects</Link>
        <span>Bangkok, Thailand</span>
        <span>© {new Date().getFullYear()} Chotchuang</span>
      </div>
    </footer>
  );
}
