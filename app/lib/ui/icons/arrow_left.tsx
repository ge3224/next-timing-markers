function IconArrowLeft({
  ariaLabel = "Left Arrow Icon",
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
        d="M5.79889 24H41.7989"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={twStroke}
        d="M17.7988 36L5.79883 24L17.7988 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default IconArrowLeft;
