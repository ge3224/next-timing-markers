function IconPushPin({
  ariaLabel = "Push Pin Icon",
  twSvg = "h-6 w-auto",
  twStroke = "stroke-neutral-500 stroke-2",
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
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaLabel}
    >
      <path
        className={twStroke}
        d="M5.12662 9.35869C6.44582 8.03944 8.01352 8.07594 9.71752 9.01039L16.0885 5.47913L15.7279 3L21.3848 8.65684L18.9113 8.30194L15.3744 14.6673C16.2661 16.486 16.3453 17.9389 15.0261 19.2582C15.0261 19.2582 12.896 17.128 11.137 15.3691L3 21.3848L8.99757 13.2296C7.23857 11.4706 5.12662 9.35869 5.12662 9.35869Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default IconPushPin;
