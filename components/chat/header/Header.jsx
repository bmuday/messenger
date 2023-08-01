import Image from "next/image";
import "./header.css";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="header-section">
        <Image src="/images/logo.svg" alt="Daily logo" />
        <span className="title">
          Custom video application demo with Daily React
        </span>
      </div>
      <div className="header-section">
        <Link
          className="new-tab-link"
          href="https://docs.daily.co/reference/daily-js"
          target="_blank"
          rel="noreferrer"
        >
          <span>API docs</span>
          <Image src="/images/newtab.svg" alt="New tab" />
        </Link>
        <Link
          className="github-link"
          href="https://github.com/daily-demos/custom-video-daily-react-hooks"
          target="_blank"
          rel="noreferrer"
        >
          <Image src="/images/github.svg" alt="Github" />
        </Link>
      </div>
    </header>
  );
}
