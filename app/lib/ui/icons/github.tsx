function IconGithub({
  ariaLabel = "Github Icon",
  twSvg = "h-6 w-auto",
  twStroke = "stroke-2 stroke-neutral-500",
}: {
  ariaLabel?: string;
  twSvg?: string;
  twStroke?: string;
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaLabel}
      className={twSvg}
      role="img"
    >
      <path
        className={twStroke}
        d="M14.6722 15.2382C15.8741 14.9885 16.9646 14.5554 17.8123 13.9195C19.2601 12.8338 20 11.1568 20 9.49995C20 8.3376 19.5593 7.2525 18.7964 6.3334C18.3713 5.82125 19.6148 1.99994 18.51 2.51459C17.4053 3.02924 15.7854 4.16839 14.9363 3.91699C14.0273 3.64782 13.0366 3.49994 12 3.49994C11.0996 3.49994 10.234 3.6115 9.4263 3.8172C8.2523 4.11618 7.12955 2.99994 6 2.51459C4.87043 2.02924 5.4868 5.9816 5.1513 6.3972C4.42059 7.30255 4 8.3644 4 9.49995C4 11.1568 4.89543 12.8338 6.34315 13.9195C7.30755 14.6428 8.517 15.1038 9.87005 15.3309"
        strokeLinecap="round"
      />
      <path
        className={twStroke}
        d="M9.86983 15.3311C9.29058 15.9686 9.00098 16.574 9.00098 17.1473C9.00098 17.7206 9.00098 19.1733 9.00098 21.5054"
        strokeLinecap="round"
      />
      <path
        className={twStroke}
        d="M14.6722 15.2383C15.2211 15.9587 15.4955 16.6055 15.4955 17.1788C15.4955 17.7521 15.4955 19.1942 15.4955 21.5053"
        strokeLinecap="round"
      />
      <path
        className={twStroke}
        d="M3 15.6077C3.44943 15.6626 3.78277 15.8693 4 16.2276C4.32585 16.7651 5.5371 18.7589 6.91255 18.7589C7.82955 18.7589 8.52575 18.7589 9.0012 18.7589"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default IconGithub;
