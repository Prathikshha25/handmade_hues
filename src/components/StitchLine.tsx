interface StitchLineProps {
  className?: string;
  color?: string;
  width?: number;
}

/**
 * A hand-stitched dashed line — the site's recurring signature motif,
 * tying back to the tagline "Every Stitch Holds a Memory".
 */
export default function StitchLine({ className = "", color = "#B9826F", width = 120 }: StitchLineProps) {
  return (
    <svg
      viewBox={`0 0 ${width} 12`}
      width={width}
      height={12}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={`M2 6 Q ${width / 4} -2, ${width / 2} 6 T ${width - 2} 6`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="7 6"
      />
    </svg>
  );
}
