import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { apiUrl } from "@/constants/constants";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/layouts/AdminHeader";

type Category = { id: string; name: string };

export default function AdminPortfolioForm() {
  const { id } = useParams();
  const isEdit = Boolean(id && id !== "new");
  const navigate = useNavigate();
  const { toast } = useToast();

  const [categories, setCategories] = useState<Category[]>([]);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      client: "",
      description: "",
      location: "",
      categoryId: "",
      imageUrl: "",
      featured: false,
      published: true,
    },
  });


useEffect(() => {
  // Load categories first
  fetch(`${apiUrl}/portfolio/categories`)
    .then((r) => r.json())
    .then(setCategories);

  if (!isEdit || !id) return;

  fetch(`${apiUrl}/admin/portfolio/${id}`, {
    credentials: "include",
  })
    .then((r) => {
      if (!r.ok) throw new Error();
      return r.json();
    })
    .then((data) => {
      setValue("title", data.title ?? "");
      setValue("slug", data.slug ?? "");
      setValue("client", data.client ?? "");
      setValue("description", data.description ?? "");
      setValue("location", data.location ?? "");
      setValue("imageUrl", data.imageUrl ?? "");
      setValue(
        "categoryId",
        data.categoryId || data.category?.id || ""
      );
      setValue("featured", !!data.featured);
      setValue("published", !!data.published);
    })
    .catch(() => {
      toast({
        title: "Error",
        description: "Failed to load portfolio item",
        variant: "destructive",
      });
      navigate("/admin/portfolio");
    });
}, [id, isEdit]);

useEffect(() => {
  const title = watch("title");
  if (!isEdit && title) {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setValue("slug", slug);
  }
}, [watch("title")]);


const uploadImage = async (file: File) => {
  setUploading(true);
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${apiUrl}/admin/portfolio/upload`, {
    method: "POST",
    credentials: "include",
    body: fd,
  });

  const { url } = await res.json();
  setValue("imageUrl", url);
  setUploading(false);
};

const onSubmit = async (data: any) => {
  if (!data.categoryId) {
    toast({
      title: "Category required",
      description: "Please select a category",
      variant: "destructive",
    });
    return;
  }
  
  const res = await fetch(
    isEdit
      ? `${apiUrl}/admin/portfolio/${id}`
      : `${apiUrl}/admin/portfolio`,
    {
      method: isEdit ? "PUT" : "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (res.ok) {
    toast({ title: "Saved", description: "Portfolio updated" });
    navigate("/admin/portfolio");
  }
};

  return (
    <div className="py-8">
        <AdminHeader />
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" asChild>
          <Link to="/admin/portfolio">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>
        <h1 className="text-xl font-bold">
          {isEdit ? "Edit Project" : "New Project"}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input placeholder="Title" {...register("title")} />
        <Input
          placeholder="Slug"
          {...register("slug")}
          className="font-mono"
          onBlur={async (e) => {
            const slug = e.target.value;
            if (!slug) return;
          
            const res = await fetch(
              `${apiUrl}/admin/portfolio/check-slug?slug=${slug}${id ? `&id=${id}` : ""}`,
              { credentials: "include" }
            );
          
            const { exists } = await res.json();
            setSlugError(exists ? "Slug already exists" : null);
          }}
        />
        {watch("slug") && (
          <Link
            to={`/portfolio/${watch("slug")}`}
            target="_blank"
            className="text-sm underline text-primary"
          >
            Preview page ↗
          </Link>
        )}

        {slugError && (
          <p className="text-sm text-destructive">{slugError}</p>
        )}

        <Input
          placeholder="Location (e.g. Mumbai, Maharashtra)"
          {...register("location")}
        />

        <Input placeholder="Client (optional)" {...register("client")} />

        <Textarea
          rows={4}
          placeholder="Description"
          {...register("description")}
        />

        <select
          {...register("categoryId")}
          className="w-full border-2 border-foreground p-2"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && uploadImage(e.target.files[0])}
        />
        {watch("imageUrl") && (
          <div className="flex gap-4 items-center">
            <img
              src={`${watch("imageUrl")}?t=${Date.now()}`}
              alt="Preview"
              className="max-h-48 border-2 border-foreground"
            />

            <Button
              type="button"
              variant="destructive"
              onClick={() => setValue("imageUrl", "")}
            >
              Remove image
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-2 border-foreground p-4">
          {/* PUBLISHED */}
        <label className="flex items-center justify-between cursor-pointer select-none">
          <div>
            <p className="font-bold">Published</p>
            <p className="text-sm text-muted-foreground">
              Visible on website
            </p>
          </div>

          <div className="relative">
            <input
              type="checkbox"
              {...register("published")}
              className="sr-only peer"
            />

            <div className="w-12 h-6 border-2 border-foreground rounded-full bg-background peer-checked:bg-primary transition-colors duration-300" />

            <div className="
              absolute top-0.5 left-0.5
              w-5 h-5
              bg-foreground
              rounded-full
              transition-transform duration-300
              peer-checked:translate-x-6
            " />
          </div>
        </label>


          {/* FEATURED */}
        <label className="flex items-center justify-between cursor-pointer select-none">
          <div>
            <p className="font-bold">Featured</p>
            <p className="text-sm text-muted-foreground">
              Show on homepage
            </p>
          </div>

          <div className="relative">
            <input
              type="checkbox"
              {...register("featured")}
              className="sr-only peer"
            />

            <div className="w-12 h-6 border-2 border-foreground rounded-full bg-background peer-checked:bg-secondary transition-colors duration-300" />

            <div className="
              absolute top-0.5 left-0.5
              w-5 h-5
              bg-foreground
              rounded-full
              transition-transform duration-300
              peer-checked:translate-x-6
            " />
          </div>
        </label>

        </div>
        
        <Button type="submit" disabled={uploading}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </form>
    </div>
  );
}
