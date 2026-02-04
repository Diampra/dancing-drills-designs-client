import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { apiUrl } from "@/constants/constants";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/layouts/AdminHeader";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type Transformation = {
  id: string;
  beforeImage: string;
  afterImage: string;
  published: boolean;
  order: number;
};

export default function AdminTransformationList() {
  const [items, setItems] = useState<Transformation[]>([]);
  const { toast } = useToast();

  const fetchItems = async () => {
    const res = await fetch(`${apiUrl}/admin/transformations`, {
      credentials: "include",
    });
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const toggle = async (id: string, value: boolean) => {
    await fetch(`${apiUrl}/admin/transformations/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: value }),
    });
    fetchItems();
  };

  const remove = async (id: string) => {
    try {
      await fetch(`${apiUrl}/admin/transformations/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      toast({ title: "Deleted", description: "Transformation removed" });
      fetchItems();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <AdminHeader />

      <div className="flex justify-between items-center mb-6 pt-8">
        <h1 className="text-2xl font-bold">Transformations</h1>
        <Button asChild>
          <Link to="/admin/transformations/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Transformation
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((t) => (
          <div
            key={t.id}
            className="border-2 border-foreground p-4 flex gap-4 items-center"
          >
            <img
              src={t.beforeImage}
              className="w-24 h-16 object-cover border"
            />
            <img
              src={t.afterImage}
              className="w-24 h-16 object-cover border"
            />

            <div className="ml-auto flex items-center gap-3">
              <Switch
                checked={t.published}
                onCheckedChange={(v) => toggle(t.id, v)}
              />

              <Button size="sm" variant="outline" asChild>
                <Link to={`/admin/transformations/${t.id}`}>
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
                    <AlertDialogTitle>Delete?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This cannot be undone.
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
        ))}

        {items.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No transformations yet.
          </p>
        )}
      </div>
    </div>
  );
}
