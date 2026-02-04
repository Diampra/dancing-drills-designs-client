import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, X } from "lucide-react";
import { apiUrl } from "@/constants/constants";
import { useToast } from "@/hooks/use-toast";

const ICONS = [
  "credit-card",
  "file-text",
  "presentation",
  "palette",
  "tag",
  "layers",
  "megaphone",
  "package",
];

type FormData = {
  title: string;
  slug: string;
  description: string;
  icon: string;
  imageUrl: string;
  published: boolean;
  featured: boolean;
  order: number;
};

export default function AdminServiceForm() {
  const { id } = useParams();
  const isEdit = Boolean(id && id !== "new");
  const navigate = useNavigate();
  const { toast } = useToast();

  const [uploading, setUploading] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");

  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      icon: "credit-card",
      imageUrl: "",
      published: false,
      featured: false,
      order: 0,
    },
  });

  /* ---------------- LOAD EDIT DATA ---------------- */
  useEffect(() => {
    if (!isEdit || !id) return;

    fetch(`${apiUrl}/admin/services/${id}`, {
      credentials: "include",
    })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        setValue("title", data.title);
        setValue("slug", data.slug);
        setValue("description", data.description);
        setValue("icon", data.icon);
        setValue("imageUrl", data.imageUrl || "");
        setValue("published", data.published);
        setValue("featured", data.featured);
        setValue("order", data.order ?? 0);
        setFeatures(data.features || []);
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to load service",
          variant: "destructive",
        });
        navigate("/admin/services");
      });
  }, [id, isEdit]);

  /* ---------------- AUTO SLUG ---------------- */
  const title = watch("title");
  useEffect(() => {
    if (!isEdit && title) {
      setValue(
        "slug",
        title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
      );
    }
  }, [title]);

  /* ---------------- IMAGE UPLOAD ---------------- */
  const uploadImage = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch(`${apiUrl}/admin/services/upload`, {
      method: "POST",
      credentials: "include",
      body: fd,
    });

    const { url } = await res.json();
    setValue("imageUrl", url);
    setUploading(false);
  };

  /* ---------------- FEATURES ---------------- */
  const addFeature = () => {
    if (!featureInput.trim()) return;
    setFeatures([...features, featureInput.trim()]);
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      features,
      order: Number.isFinite(data.order) ? data.order : 0,
    };

    const res = await fetch(
      isEdit
        ? `${apiUrl}/admin/services/${id}`
        : `${apiUrl}/admin/services`,
      {
        method: isEdit ? "PUT" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!data.title || !data.description) {
      toast({
        title: "Missing fields",
        description: "Title and description are required",
        variant: "destructive",
      });
      return;
    }
    if (!features.length) {
      toast({
        title: "Add at least one feature",
        variant: "destructive",
      });
      return;
    }
    
    if (res.ok) {
      toast({ title: "Saved", description: "Service saved successfully" });
      navigate("/admin/services");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" asChild>
          <Link to="/admin/services">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>
        <h1 className="text-xl font-bold">
          {isEdit ? "Edit Service" : "New Service"}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input placeholder="Title" {...register("title")} />
        <Input
          placeholder="Slug"
          {...register("slug")}
          onBlur={async (e) => {
            const slug = e.target.value;
            if (!slug) return;
          
            const res = await fetch(
              `${apiUrl}/admin/services/check-slug?slug=${slug}${id ? `&id=${id}` : ""}`,
              { credentials: "include" }
            );
          
            const { exists } = await res.json();
            if (exists) {
              toast({
                title: "Slug already exists",
                variant: "destructive",
              });
            }
          }}
        />
        

        <Textarea
          rows={4}
          placeholder="Description"
          {...register("description")}
        />

        {/* FEATURES */}
        <div>
          <label className="font-bold block mb-2">Features</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {features.map((f, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 bg-accent border-2 px-3 py-1 text-sm"
              >
                {f}
                <button type="button" onClick={() => removeFeature(i)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <Input
            placeholder="Add feature and press Enter"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addFeature();
              }
            }}
          />
        </div>

        {/* ICON */}
        <select
          {...register("icon")}
          className="w-full border-2 border-foreground p-2"
        >
          {ICONS.map((icon) => (
            <option key={icon} value={icon}>
              {icon}
            </option>
          ))}
        </select>

        {/* IMAGE */}
        <Input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files && uploadImage(e.target.files[0])
          }
        />

        {watch("imageUrl") && (
          <img
            src={`${watch("imageUrl")}?v=${Date.now()}`}
            className="w-full max-h-48 object-cover border-2 border-foreground"
          />
        )}

        {/* TOGGLES */}
        <div className="flex items-center justify-between border-2 p-4">
          <span>Published</span>
          <Switch
            checked={watch("published")}
            onCheckedChange={(v) => setValue("published", v)}
          />
        </div>

        <div className="flex items-center justify-between border-2 p-4">
          <span>Featured</span>
          <Switch
            checked={watch("featured")}
            onCheckedChange={(v) => setValue("featured", v)}
          />
        </div>

        <Input
          type="number"
          placeholder="Order (0 = top)"
          {...register("order", { valueAsNumber: true })}
        />

        <Button type="submit" disabled={uploading}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </form>
    </div>
  );
}
