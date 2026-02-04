import { useEffect, useState } from "react";
import AdminHeader from "@/layouts/AdminHeader";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/constants/constants";
import { Trash2, Upload } from "lucide-react";

type MediaItem = {
  id: number;
  filePath: string;
  posterPath?: string | null;
  type: "image" | "video";
  folder: string;
  createdAt: string;
};

export default function AdminMediaGallery() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BUCKET = import.meta.env.VITE_SUPABASE_BUCKET;
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

  const publicUrl = (path: string) =>
    `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;

  /* ───────── FETCH MEDIA SAFELY ───────── */
  const loadMedia = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${apiUrl}/admin/media`, {
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("MEDIA API ERROR:", res.status, text);
        throw new Error(`API error ${res.status}`);
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error("INVALID MEDIA RESPONSE:", data);
        throw new Error("Invalid API response");
      }

      setItems(data);
      setSelected([]);
    } catch (err: any) {
      console.error("FAILED TO LOAD MEDIA:", err);
      setError("Failed to load media. Check console & server logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  /* ───────── UPLOAD ───────── */
  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", "misc");

      const res = await fetch(`${apiUrl}/admin/storage/upload`, {
        method: "POST",
        credentials: "include",
        body: form,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      await loadMedia();
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ───────── DELETE ───────── */
  const deleteSelected = async () => {
    if (!confirm(`Delete ${selected.length} file(s)?`)) return;

    try {
      const res = await fetch(`${apiUrl}/admin/storage/delete`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: selected }),
      });

      if (!res.ok) throw new Error("Delete failed");

      await loadMedia();
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Delete failed");
    }
  };

  const toggleSelect = (filePath: string) => {
    setSelected(prev =>
      prev.includes(filePath)
        ? prev.filter(f => f !== filePath)
        : [...prev, filePath]
    );
  };

  /* ───────── RENDER STATES ───────── */

  if (loading) {
    return (
      <div>
        <AdminHeader />
        <p className="p-8 text-muted-foreground">Loading media…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AdminHeader />
        <p className="p-8 text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Media Library</h1>

          <label className="cursor-pointer flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload
            <input
              type="file"
              accept="image/*,video/*"
              hidden
              onChange={e =>
                e.target.files && uploadFile(e.target.files[0])
              }
            />
          </label>
        </div>

        {/* EMPTY STATE */}
        {items.length === 0 && (
          <p className="text-muted-foreground">No media uploaded yet.</p>
        )}

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map(item => (
            <div
              key={item.id}
              className="relative border-2 border-foreground p-2"
            >
              <input
                type="checkbox"
                className="absolute top-2 left-2 z-10"
                checked={selected.includes(item.filePath)}
                onChange={() => toggleSelect(item.filePath)}
              />

              {item.type === "video" ? (
                <video
                  src={publicUrl(item.filePath)}
                  poster={
                    item.posterPath
                      ? publicUrl(item.posterPath)
                      : undefined
                  }
                  controls
                  className="aspect-square w-full object-cover bg-black"
                />
              ) : (
                <img
                  src={publicUrl(item.filePath)}
                  className="aspect-square w-full object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {/* DELETE BAR */}
        {selected.length > 0 && (
          <div className="fixed bottom-6 right-6">
            <Button variant="destructive" onClick={deleteSelected}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete {selected.length}
            </Button>
          </div>
        )}

        {uploading && (
          <p className="text-sm mt-4 text-muted-foreground">
            Uploading…
          </p>
        )}
      </div>
    </div>
  );
}
