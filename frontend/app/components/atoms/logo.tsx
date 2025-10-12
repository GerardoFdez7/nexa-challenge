interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  }

  return (
    <div className={`font-bold ${sizes[size]} ${className}`}>
      <span style={{ color: "#9521B6" }}>Nexa</span>
      <span className="text-[#011843]"> Bank</span>
    </div>
  )
}
