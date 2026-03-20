import { useState } from "react";

// ---- SpinnerLoading nhỏ dùng trong button ----
export function ButtonSpinner({ color = "white" }) {
  return (
    <div
      style={{
        width: 16,
        height: 16,
        border: `2px solid ${color}44`,
        borderTop: `2px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
        flexShrink: 0,
      }}
    />
  );
}

// ---- LoadingButton component ----
export function LoadingButton({
  onClick,
  children,
  loadingText = "On process...",
  successText = "Success!",
  variant = "primary",
  ref
}) {
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const variants = {
    primary:  { bg: "#6366f1", hover: "#4f46e5", color: "white", border: "transparent" },
    danger:   { bg: "#ef4444", hover: "#dc2626", color: "white", border: "transparent" },
    outline:  { bg: "white",   hover: "#f9fafb", color: "#374151", border: "#e5e7eb" },
  };

  const v = variants[variant];

  const handleClick = async () => {
    if (status !== "idle") return;
    setStatus("loading");
    await onClick();
    setStatus("success");
    setTimeout(() => setStatus("idle"), 1000);
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "10px 20px",
        borderRadius: 10,
        border: `1px solid ${v.border}`,
        background: isSuccess ? "#16a34a" : v.bg,
        color: v.color,
        fontSize: 14,
        fontWeight: 500,
        cursor: isLoading ? "not-allowed" : "pointer",
        opacity: isLoading ? 0.85 : 1,
        transition: "background 0.2s, transform 0.1s",
        minWidth: 160,
      }}
      ref={ref}
    >
      {isLoading && <ButtonSpinner color={v.color} />}
      {isSuccess && <span style={{ fontSize: 16 }}>✓</span>}
      {isLoading ? loadingText : isSuccess ? successText : children}
    </button>
  );
}