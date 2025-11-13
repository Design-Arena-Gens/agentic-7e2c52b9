type IconProps = React.SVGProps<SVGSVGElement>;

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="M4.5 8.25l2.598 1.5" />
      <path d="M16.902 14.25l2.598 1.5" />
      <path d="M4.5 15.75l2.598-1.5" />
      <path d="M16.902 9.75l2.598-1.5" />
      <path d="M9 12l3-7 3 7-3 7-3-7z" />
    </svg>
  );
}
