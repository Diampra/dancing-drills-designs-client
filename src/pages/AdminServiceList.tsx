import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

type Service = {
  id: string;
  title: string;
  order: number;
  published: boolean;
  featured: boolean;
};

export default function AdminServiceList() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchServices = async () => {
    try {
      const res = await fetch(`${apiUrl}/admin/services`, {
        credentials: "include",
      });
      const data = await res.json();
      setServices(data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const toggle = async (
    id: string,
    field: "published" | "featured",
    value: boolean
  ) => {
    await fetch(`${apiUrl}/admin/services/${id}/toggle`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !value }),
    });

    fetchServices();
  };

const deleteService = async (id: string) => {
  try {
    const res = await fetch(`${apiUrl}/admin/services/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error();

    toast({
      title: "Deleted",
      description: "Service removed successfully.",
    });

    fetchServices();
  } catch {
    toast({
      title: "Error",
      description: "Failed to delete service.",
      variant: "destructive",
    });
  }
};


  return (
    <div className="">
      {/* HEADER */}
      <AdminHeader />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold pt-8">Services</h1>

        <Button asChild>
          <Link to="/admin/services/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Link>
        </Button>
      </div>

      {/* TABLE */}
      <div className="border-2 border-foreground">
        <div className="grid grid-cols-[1fr_100px_120px_120px_120px] font-bold border-b-2 border-foreground px-4 py-2">
          <span>Title</span>
          <span>Order</span>
          <span>Published</span>
          <span>Featured</span>
          <span>Actions</span>
        </div>

        {loading ? (
          <p className="p-4 text-muted-foreground">Loading…</p>
        ) : services.length === 0 ? (
          <p className="p-4 text-muted-foreground">No services added.</p>
        ) : (
          services.map((s) => (
            <div
              key={s.id}
              className="grid grid-cols-[1fr_100px_120px_120px_120px] items-center px-4 py-3 border-t-2 border-foreground"
            >
              <span className="font-medium">{s.title}</span>

              <span>{s.order}</span>

              {/* PUBLISHED TOGGLE */}
              <button
                onClick={() => toggle(s.id, "published", s.published)}
                className={`flex items-center gap-2 ${
                  s.published ? "text-green-600" : "text-muted-foreground"
                }`}
              >
                <Eye className="w-4 h-4" />
                {s.published ? "Yes" : "No"}
              </button>

              {/* FEATURED TOGGLE */}
              <button
                onClick={() => toggle(s.id, "featured", s.featured)}
                className={`flex items-center gap-2 ${
                  s.featured ? "text-yellow-500" : "text-muted-foreground"
                }`}
              >
                <Star className="w-4 h-4" />
                {s.featured ? "Yes" : "No"}
              </button>

              {/* ACTIONS */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/admin/services/${s.id}`}>
                    <Pencil className="w-4 h-4" />
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
        Delete Service?
      </AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => deleteService(s.id)}>
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
