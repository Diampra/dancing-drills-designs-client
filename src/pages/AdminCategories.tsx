import { useEffect, useState } from "react";
import { apiUrl } from "@/constants/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/layouts/AdminHeader";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const { toast } = useToast();

  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}/categories`);
    setCategories(await res.json());
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    const res = await fetch(`${apiUrl}/admin/categories`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      toast({ title: "Category exists", variant: "destructive" });
      return;
    }

    setName("");
    fetchCategories();
  };

  return (
    <div className="space-y-6">
      <AdminHeader />
      <h1 className="text-2xl font-bold pt-4">Manage Categories</h1>

      <div className="flex gap-2">
        <Input
          placeholder="New category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={addCategory}>Add</Button>
      </div>

      {/* <ul className="border-2 p-4">
        {categories.map((c: any) => (
          <li key={c.id} className="py-1 font-medium">
            {c.name}
          </li>
        ))}
      </ul> */}
      <ul className="border-2 border-foreground divide-y">
  {categories.map((c: any) => (
    <li
      key={c.id}
      className="flex items-center justify-between p-3"
    >
      <span className="font-medium">{c.name}</span>

      <Button
        variant="destructive"
        size="sm"
        onClick={async () => {
          const res = await fetch(
            `${apiUrl}/admin/categories/${c.id}`,
            {
              method: "DELETE",
              credentials: "include",
            }
          );

          if (res.status === 409) {
            toast({
              title: "Cannot delete category",
              description: "Category has posts assigned",
              variant: "destructive",
            });
            return;
          }
          
          if (!res.ok) {
            toast({
              title: "Delete failed",
              variant: "destructive",
            });
            return;
          }
          

          toast({ title: "Category deleted" });
          fetchCategories();
        }}
      >
        Delete
      </Button>
    </li>
  ))}
</ul>

    </div>
  );
};

export default AdminCategories;
