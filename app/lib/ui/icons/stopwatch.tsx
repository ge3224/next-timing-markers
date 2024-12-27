function IconStopWatch({
  ariaLabel = "Stopwatch Icon",
  twSvg = "h-6 w-auto",
  twStroke = "stroke-[4px] stroke-neutral-500",
}: {
  ariaLabel?: string;
  twSvg?: string;
  twStroke?: string;
}) {
  return (
    <svg
      className={twSvg}
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaLabel}
    >
      <path
        className={twStroke}
        d="M24 44C33.3888 44 41 36.3888 41 27C41 17.6112 33.3888 10 24 10C14.6112 10 7 17.6112 7 27C7 36.3888 14.6112 44 24 44Z"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        className={twStroke}
        d="M18 4H30"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={twStroke}
        d="M24 19V27"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={twStroke}
        d="M32 27H24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={twStroke}
        d="M24 4V8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default IconStopWatch;
