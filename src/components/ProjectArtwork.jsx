const handPoints = [
  [306, 326], [252, 282], [218, 251], [192, 218], [174, 188],
  [276, 215], [261, 156], [254, 113], [250, 77],
  [314, 203], [314, 137], [314, 91], [314, 53],
  [350, 210], [365, 151], [374, 111], [381, 79],
  [382, 232], [409, 190], [429, 162], [447, 137],
];

const handChains = [[0, 1, 2, 3, 4], [0, 5, 6, 7, 8], [5, 9, 10, 11, 12], [9, 13, 14, 15, 16], [13, 17, 18, 19, 20], [17, 0]];

export default function ProjectArtwork({ kind }) {
  const airflow = kind === "airflow";

  return (
    <div className={`project-artwork project-artwork-${kind}`} aria-hidden="true">
      <svg viewBox="0 0 640 440" fill="none" preserveAspectRatio="xMidYMid slice">
        {airflow ? (
          <>
            <defs>
              <radialGradient id="ventus-sphere" cx="30%" cy="25%" r="80%">
                <stop stopColor="#e5f5dc" />
                <stop offset="0.45" stopColor="#85b8a8" />
                <stop offset="1" stopColor="#1c575a" />
              </radialGradient>
              <linearGradient id="ventus-stream" x1="30" y1="0" x2="610" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#86c6b9" stopOpacity="0.15" />
                <stop offset="0.5" stopColor="#c9efd2" />
                <stop offset="1" stopColor="#86c6b9" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path d="M38 108 320 46 602 108V322L320 384 38 322ZM38 108 320 170 602 108M320 170V384" stroke="#8abdb3" strokeOpacity="0.16" />
            {Array.from({ length: 17 }, (_, i) => {
              const y = 103 + i * 14;
              const bend = (y < 220 ? -1 : 1) * Math.max(0, 72 - Math.abs(y - 220) * 0.55);
              return <path key={i} d={`M22 ${y} C175 ${y}, 208 ${y + bend}, 320 ${y + bend} S465 ${y}, 618 ${y}`} stroke="url(#ventus-stream)" strokeWidth={i % 4 === 0 ? 1.8 : 0.8} />;
            })}
            <circle cx="320" cy="220" r="55" fill="url(#ventus-sphere)" />
            <ellipse cx="320" cy="220" rx="55" ry="17" stroke="#e5f5dc" strokeOpacity="0.24" transform="rotate(-25 320 220)" />
            <path d="M54 350H112M104 346 112 350 104 354" stroke="#bedbcf" />
          </>
        ) : (
          <>
            <defs>
              <linearGradient id="gesture-line" x1="180" y1="100" x2="420" y2="350" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffe0b6" />
                <stop offset="1" stopColor="#ec9b9e" />
              </linearGradient>
            </defs>
            {Array.from({ length: 15 }, (_, i) => (
              <path key={i} d={`M-30 ${146 + i * 12} C115 ${36 + i * 17}, 166 ${355 - i * 3}, 310 ${274 + i * 3} S490 ${110 + i * 10}, 670 ${175 + i * 12}`} stroke="#f3bdba" strokeOpacity={0.12 + (i % 3) * 0.045} />
            ))}
            <circle cx="312" cy="208" r="153" stroke="#f3bdba" strokeOpacity="0.12" strokeDasharray="2 9" />
            {handChains.map((chain, i) => <polyline key={i} points={chain.map((index) => handPoints[index].join(",")).join(" ")} stroke="url(#gesture-line)" strokeWidth="1.8" strokeLinejoin="round" />)}
            {handPoints.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={i === 0 ? 5 : 3.5} fill="#ffe0b6" />)}
            <path d="M154 63H132V85M466 63H488V85M154 342H132V320M466 342H488V320" stroke="#f3bdba" strokeOpacity="0.6" />
          </>
        )}
      </svg>
      <span className="artwork-caption">{airflow ? "Air in motion." : "Gesture becomes motion."}</span>
    </div>
  );
}
