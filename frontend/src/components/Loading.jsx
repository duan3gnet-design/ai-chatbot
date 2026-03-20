const spinnerStyle = `
@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}
@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
}
@keyframes bar {
  0% { transform: scaleY(0.4); }
  50% { transform: scaleY(1); }
  100% { transform: scaleY(0.4); }
}
@keyframes shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
`;

// System Loading
export function SystemLoading({ size = 32, color = "#6366f1" }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          padding: "48px 0",
          color: "#6b7280",
          fontSize: 14,
        }}
      >
        <SpinnerLoading size={size} color={color} />
        <span>System loading...</span>
      </div>
    </>
  );
}

// 1. Spinner tròn cổ điển
export function SpinnerLoading({ size = 32, color = "#6366f1" }) {
  return (
    <>
      <style>{spinnerStyle}</style>
      <div
        style={{
          width: size,
          height: size,
          border: `${size / 8}px solid ${color}22`,
          borderTop: `${size / 8}px solid ${color}`,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
    </>
  );
}

// 2. Dots nhảy
export function DotsLoading({ color = "#6366f1" }) {
  return (
    <>
      <style>{spinnerStyle}</style>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: color,
              animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}

// 3. Pulse dot
export function PulseLoading({ size = 40, color = "#6366f1" }) {
  return (
    <>
      <style>{spinnerStyle}</style>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: color,
          animation: "pulse 1.4s ease-in-out infinite",
        }}
      />
    </>
  );
}

// 4. Bar equalizer
export function BarLoading({ color = "#6366f1" }) {
  return (
    <>
      <style>{spinnerStyle}</style>
      <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 28 }}>
        {[0, 0.15, 0.3, 0.15].map((delay, i) => (
          <div
            key={i}
            style={{
              width: 5,
              height: 24,
              background: color,
              borderRadius: 3,
              animation: `bar 1s ease-in-out ${delay}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}

// 5. Skeleton / shimmer placeholder
export function SkeletonLoading() {
  const shimmerCSS = `
    @keyframes shimmer {
      0% { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    .skeleton {
      background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
      background-size: 800px 100%;
      animation: shimmer 1.4s infinite;
      border-radius: 6px;
    }
  `;
  return (
    <>
      <style>{shimmerCSS}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 260 }}>
        <div className="skeleton" style={{ height: 16, width: "40%" }} />
        <div className="skeleton" style={{ height: 12, width: "100%" }} />
        <div className="skeleton" style={{ height: 12, width: "85%" }} />
        <div className="skeleton" style={{ height: 12, width: "60%" }} />
      </div>
    </>
  );
}