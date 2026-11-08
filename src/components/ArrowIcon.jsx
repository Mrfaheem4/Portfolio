export default function ArrowIcon({ down = false, className = "" }) {
  return (
    <svg
      className={`arrow-icon ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {down ? (
        <path d="M12 4v16m-6-6 6 6 6-6" />
      ) : (
        <path d="M5 19 19 5M5 5h14v14" />
      )}
    </svg>
  );
}
