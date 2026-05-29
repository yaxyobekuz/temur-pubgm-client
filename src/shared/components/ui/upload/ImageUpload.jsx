import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import { toMediaUrl } from "@/shared/utils/mediaUrl";
// Import the leaf module (not the feature barrel) to avoid a barrel import cycle.
import { uploadsAPI } from "@/owner/features/broadcasts/api/uploads.api";

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif";

// Controlled image picker: value is a server-relative path ("/uploads/..").
// Uploads straight from the user's computer - no URL field.
const ImageUpload = ({ value = "", onChange, label = "", disabled = false, className = "" }) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const pick = () => inputRef.current?.click();

  const onFileSelected = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const res = await uploadsAPI.image(file);
      onChange?.(res.data.data.url);
    } catch (err) {
      setError(err?.response?.data?.message || "Rasmni yuklab bo'lmadi");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 text-sm ${className}`}>
      {label && <span>{label}</span>}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={onFileSelected}
      />

      {value ? (
        <div className="flex flex-col gap-2">
          <img
            src={toMediaUrl(value)}
            alt=""
            className="w-full max-h-40 object-contain rounded-[2px] border bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={pick}
              disabled={disabled || uploading}
            >
              {uploading ? "Yuklanmoqda..." : "Almashtirish"}
            </Button>
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => onChange?.("")}
              disabled={disabled || uploading}
            >
              O'chirish
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={pick}
          disabled={disabled || uploading}
          className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-[2px] border border-dashed bg-white text-muted-foreground outline-2 outline-primary hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ImagePlus size={22} />
          <span className="text-xs">{uploading ? "Yuklanmoqda..." : "Rasm yuklash"}</span>
        </button>
      )}

      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
};

export default ImageUpload;
