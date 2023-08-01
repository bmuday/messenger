import "./userMediaError.css";
import Link from "next/link";

const refreshPage = () => {
  console.log(
    "make sure to allow access to your microphone and camera in your browser's permissions"
  );
  window.location.reload();
};

export default function UserMediaError() {
  return (
    <div className="call">
      <div className="info-box get-user-media-error">
        <h1>Camera or mic blocked</h1>
        <button onClick={refreshPage} type="button">
          Try again
        </button>
        <p>
          <Link
            href="https://docs.daily.co/guides/how-daily-works/handling-device-permissions"
            target="_blank"
            rel="noreferrer"
          >
            Get help
          </Link>
        </p>
      </div>
    </div>
  );
}
