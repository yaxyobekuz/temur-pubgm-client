import { cn } from "@/shared/utils/cn.js";
import { inputBaseClasses } from "./Input";

// Visual fixed prefix; the value held upstream is always the full "https://..." URL.
const PREFIX = "https://";

// Loose host.tld[/path] check after the prefix - flags obviously broken URLs.
export const HTTPS_URL_RE = /^https:\/\/[^\s./]+(\.[^\s./]+)+(\/\S*)?$/i;

const stripPrefix = (v = "") => String(v ?? "").replace(/^https?:\/\//i, "");

const InputHttps = ({ className = "", value = "", onChange, name, ...props }) => {
  const rest = stripPrefix(value);
  const full = rest ? `${PREFIX}${rest}` : "";
  const invalid = !!rest && !HTTPS_URL_RE.test(full);

  const handleChange = (e) => {
    if (!onChange) return;
    const next = stripPrefix(e.target.value);
    onChange({ ...e, target: { ...e.target, name, value: next ? `${PREFIX}${next}` : "" } });
  };

  return (
    <div
      className={cn(
        inputBaseClasses,
        "flex items-center gap-0 p-0 pl-3",
        invalid && "border-destructive outline-destructive",
        className,
      )}
    >
      <span className="select-none text-muted-foreground">{PREFIX}</span>
      {/* type="text" not "url": the field holds only the part after https://, which the
          browser would reject as an invalid URL. Validity is handled by HTTPS_URL_RE. */}
      <input
        {...props}
        name={name}
        type="text"
        inputMode="url"
        value={rest}
        onChange={handleChange}
        placeholder="example.com"
        className="h-full w-full flex-1 rounded-[2px] bg-transparent px-1 outline-none"
      />
    </div>
  );
};

export default InputHttps;
