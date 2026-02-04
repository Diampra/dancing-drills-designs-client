import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import { apiUrl } from "@/constants/constants";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/layouts/AdminHeader";

type FormData = {
  beforeImage: string;
  afterImage: string;
  published: boolean;
  order: number;
};

export default function AdminTransformationForm() {
  const { id } = useParams();
  const isEdit = Boolean(id && id !== "new");
  const navigate = useNavigate();
  const { toast } = useToast();

  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      beforeImage: "",
      afterImage: "",
      published: true,
      order: 0,
    },
  });

  useEffect(() => {
    if (!isEdit || !id) return;

    fetch(`${apiUrl}/admin/transformations/${id}`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        setValue("beforeImage", data.beforeImage);
        setValue("afterImage", data.afterImage);
        setValue("published", data.published);
        setValue("order", data.order ?? 0);
      });
  }, [id]);

  const uploadImage = async (file: File, field: "beforeImage" | "afterImage") => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch(`${apiUrl}/admin/transformations/upload`, {
      method: "POST",
      credentials: "include",
      body: fd,
    });

    const { url } = await res.json();
    setValue(field, url);
    setUploading(false);
  };

  const onSubmit = async (data: FormData) => {
    const res = await fetch(
      isEdit
        ? `${apiUrl}/admin/transformations/${id}`
        : `${apiUrl}/admin/transformations`,
      {
        method: isEdit ? "PUT" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (res.ok) {
      toast({ title: "Saved", description: "Transformation saved" });
      navigate("/admin/transformations");
    }
  };

  return (
    <div className="py-8">
      <AdminHeader />

      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" asChild>
          <Link to="/admin/transformations">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>
        <h1 className="text-xl font-bold">
          {isEdit ? "Edit Transformation" : "New Transformation"}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
        {/* BEFORE */}
        <Input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files && uploadImage(e.target.files[0], "beforeImage")
          }
        />
        {watch("beforeImage") && (
          <img
            src={watch("beforeImage")}
            className="max-h-40 border-2 border-foreground"
          />
        )}

        {/* AFTER */}
        <Input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files && uploadImage(e.target.files[0], "afterImage")
          }
        />
        {watch("afterImage") && (
          <img
            src={watch("afterImage")}
            className="max-h-40 border-2 border-foreground"
          />
        )}

        <Input
          type="number"
          placeholder="Order"
          {...register("order", { valueAsNumber: true })}
        />

        <div className="flex justify-between border-2 p-4">
          <span>Published</span>
          <Switch
            checked={watch("published")}
            onCheckedChange={(v) => setValue("published", v)}
          />
        </div>

        <Button type="submit" disabled={uploading}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </form>
    </div>
  );
}
