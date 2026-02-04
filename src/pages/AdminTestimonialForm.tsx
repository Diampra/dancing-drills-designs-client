import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import { apiUrl } from "@/constants/constants";
import { useToast } from "@/hooks/use-toast";

type FormData = {
  name: string;
  role: string;
  content: string;
  rating: number;
  published: boolean;
  featured: boolean;
};

export default function AdminTestimonialForm() {
  const { id } = useParams();
  const isEdit = Boolean(id && id !== "new");
  const navigate = useNavigate();
  const { toast } = useToast();

  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      name: "",
      role: "",
      content: "",
      rating: 5,
      published: true,
      featured: false,
    },
  });

  useEffect(() => {
    if (!isEdit) return;

    fetch(`${apiUrl}/admin/testimonials/${id}`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        setValue("name", data.name);
        setValue("role", data.role);
        setValue("content", data.content);
        setValue("rating", data.rating);
        setValue("published", data.published);
        setValue("featured", data.featured);
      });
  }, [id]);

  const onSubmit = async (data: FormData) => {
    const res = await fetch(
      isEdit
        ? `${apiUrl}/admin/testimonials/${id}`
        : `${apiUrl}/admin/testimonials`,
      {
        method: isEdit ? "PUT" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (res.ok) {
      toast({ title: "Saved", description: "Testimonial saved" });
      navigate("/admin/testimonials");
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" asChild>
          <Link to="/admin/testimonials">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>
        <h1 className="text-xl font-bold">
          {isEdit ? "Edit Testimonial" : "New Testimonial"}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input placeholder="Client Name" {...register("name")} />
        <Input placeholder="Role / Company" {...register("role")} />

        <Textarea
          rows={4}
          placeholder="Testimonial content"
          {...register("content")}
        />

        <Input
          type="number"
          min={1}
          max={5}
          placeholder="Rating (1–5)"
          {...register("rating", { valueAsNumber: true })}
        />

        <div className="flex justify-between border-2 p-4">
          <span>Published</span>
          <Switch
            checked={watch("published")}
            onCheckedChange={(v) => setValue("published", v)}
          />
        </div>

        <div className="flex justify-between border-2 p-4">
          <span>Featured</span>
          <Switch
            checked={watch("featured")}
            onCheckedChange={(v) => setValue("featured", v)}
          />
        </div>

        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </form>
    </div>
  );
}
