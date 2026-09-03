export function Field({ children, label, required = false }: { children: React.ReactNode; label: string; required?: boolean }) {
  return (
    <label className="field">
      <span>
        {label}
        {required && <em>必須</em>}
      </span>
      {children}
    </label>
  );
}

export function Detail({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "detail-item wide" : "detail-item"}>
      <dt>{label}</dt>
      <dd>{value || "未入力"}</dd>
    </div>
  );
}
