import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Star, EyeOff } from "lucide-react";
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

type PortfolioItem = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  location: string;
  featured: boolean;
  published: boolean;
  category: {
    name: string;
    slug: string;
  };
};

export default function AdminPortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const { toast } = useToast();

  const fetchItems = async () => {
    const res = await fetch(`${apiUrl}/portfolio?admin=true`, {
      credentials: "include",
    });
    const data = await res.json();
    setItems(data.items);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (id: string) => {
    try {
      const res = await fetch(`${apiUrl}/admin/portfolio/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      toast({
        title: "Deleted",
        description: "Portfolio item removed successfully.",
      });

      fetchItems();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete portfolio item.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <AdminHeader />

      <div className="flex items-center justify-between mb-6 py-8">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <Button asChild>
          <Link to="/admin/portfolio/new">
            <Plus className="w-4 h-4 mr-2" /> New Project
          </Link>
        </Button>
      </div>

      <div className="border-2 border-foreground">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 border-b-2 border-foreground last:border-0"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-24 h-16 object-cover border-2 border-foreground"
            />

            <div className="flex-1">
              <h3 className="font-bold flex items-center gap-2">
                {item.title}

                {!item.published && (
                  <span className="flex items-center text-xs text-muted-foreground">
                    <EyeOff className="w-3 h-3 mr-1" />
                    Draft
                  </span>
                )}

                {item.featured && (
                  <Star className="w-4 h-4 text-yellow-500" />
                )}
              </h3>

              <p className="text-sm text-muted-foreground">
                {item.category.name} · {item.location}
              </p>

              <p className="text-xs text-muted-foreground">
                /portfolio/{item.slug}
              </p>
            </div>

            <Button size="sm" variant="outline" asChild>
              <Link to={`/admin/portfolio/${item.id}`}>
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
                    Delete Portfolio Item?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteItem(item.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
    </div>
  );
}
