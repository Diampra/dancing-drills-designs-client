import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/constants/constants";
import AdminHeader from "@/layouts/AdminHeader";

type Category = {
  id: string;
  name: string;
};

export default function AdminPortfolioCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}/portfolio/categories`, {
      credentials: "include",
    });
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!name.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/admin/portfolio/categories`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (res.status === 409) {
    toast({
      title: "Category exists",
      description: "This category already exists.",
      variant: "destructive",
    });
    return;
  }

      toast({
        title: "Category added",
        description: "Portfolio category created successfully.",
      });

      setName("");
      fetchCategories();
    } catch {
      toast({
        title: "Error",
        description: "Failed to add category.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;

    try {
      const res = await fetch(
        `${apiUrl}/admin/portfolio/categories/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error();

      toast({
        title: "Deleted",
        description: "Category removed.",
      });

      fetchCategories();
    } catch {
      toast({
        title: "Error",
        description: "Category has portfolio items assigned.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="">
        <AdminHeader />
      <h1 className="text-2xl font-bold mb-6 pt-8">Portfolio Categories</h1>

      {/* ADD FORM */}
      <div className="border-2 border-foreground p-4 mb-8">
        <label className="block font-bold mb-2">New Category</label>
        <div className="flex gap-2">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Visiting Cards"
          />
          <Button onClick={addCategory} disabled={loading}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between border-2 border-foreground px-4 py-2"
          >
            <span className="font-medium">{cat.name}</span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteCategory(cat.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}

        {categories.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No categories added yet.
          </p>
        )}
      </div>
    </div>
  );
}
