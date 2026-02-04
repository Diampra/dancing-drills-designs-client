import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { apiUrl } from "@/constants/constants";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/layouts/AdminHeader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  published: boolean;
  featured: boolean;
  order: number;
};

export default function AdminTestimonialsList() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const { toast } = useToast();

  const fetchItems = async () => {
    const res = await fetch(`${apiUrl}/testimonials`, {
      credentials: "include",
    });
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const toggle = async (id: string, field: "published" | "featured", value: boolean) => {
    await fetch(`${apiUrl}/admin/testimonials/${id}/toggle`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    fetchItems();
  };

const remove = async (id: string) => {
  try {
    const res = await fetch(`${apiUrl}/admin/testimonials/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error();

    toast({
      title: "Deleted",
      description: "Testimonial removed successfully.",
    });

    fetchItems();
  } catch {
    toast({
      title: "Error",
      description: "Failed to delete testimonial.",
      variant: "destructive",
    });
  }
};


  return (
    <div>
        <AdminHeader />
      <div className="flex justify-between items-center mb-6 pt-8">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <Button asChild>
          <Link to="/admin/testimonials/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((t) => (
          <div
            key={t.id}
            className="border-2 border-foreground p-4 flex justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <strong>{t.name}</strong>
                <span className="text-sm text-muted-foreground">
                  ({t.role})
                </span>
              </div>

              <div className="flex gap-1 my-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {t.content}
              </p>
            </div>

            <div className="flex flex-col gap-2 min-w-[160px]">
              <div className="flex justify-between items-center">
                <span className="text-sm">Published</span>
                <Switch
                  checked={t.published}
                  onCheckedChange={(v) => toggle(t.id, "published", v)}
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Featured</span>
                <Switch
                  checked={t.featured}
                  onCheckedChange={(v) => toggle(t.id, "featured", v)}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/admin/testimonials/${t.id}`}>
                    <Edit className="w-4 h-4" />
                  </Link>
                </Button>
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button size="sm" variant="destructive">
      <Trash2 className="w-4 h-4" />
    </Button>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>
        Delete Testimonial?
      </AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => remove(t.id)}>
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No testimonials added yet.
          </p>
        )}
      </div>
    </div>
  );
}
