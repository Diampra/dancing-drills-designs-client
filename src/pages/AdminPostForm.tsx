import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { apiUrl } from "@/constants/constants";
import { useAuth } from "@/hooks/useAuth";

const postSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1),
  categoryId: z.string().uuid(),
  image_url: z.string().url().optional().or(z.literal("")),
  author: z.string().min(1),
  read_time: z.string().min(1),
  published: z.boolean(),
});

type PostFormData = z.infer<typeof postSchema>;

// const categories = ["Printing Tips", "Design Trends", "Company News"];

const AdminPostForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id && id !== "new");

  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loadingPost, setLoadingPost] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);
const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState<
  { id: string; name: string }[]
>([]);

useEffect(() => {
  fetch(`${apiUrl}/categories`)
    .then((res) => res.json())
    .then(setCategories);
}, []);

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      categoryId: "",
      image_url: "",
      author: "DDD Inc. Team",
      read_time: "5 min read",
      published: false,
    },
  });

  // Protect route
  useEffect(() => {
    if (!loading) {
      if (!user) navigate("/auth");
      else if (!isAdmin) navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  // 🔹 Fetch post for editing
  useEffect(() => {
    if (isEditing) fetchPost();
  }, [isEditing]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`${apiUrl}/admin/blog/${id}`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      form.reset({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        categoryId: data.categoryId,
        image_url: data.imageUrl || "",
        author: data.author,
        read_time: data.readTime,
        published: data.published,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to load post.",
        variant: "destructive",
      });
      navigate("/admin");
    } finally {
      setLoadingPost(false);
    }
  };

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

  // Upload image/video
  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${apiUrl}/admin/blog/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error();

      const { url } = await res.json();
      form.setValue("image_url", url);

      toast({
        title: "Uploaded",
        description: "Media uploaded successfully.",
      });
    } catch {
      toast({
        title: "Upload failed",
        description: "Could not upload file.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  // Submit form
  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(
        isEditing ? `${apiUrl}/admin/blog/${id}` : `${apiUrl}/admin/blog`,
        {
          method: isEditing ? "PUT" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            image_url: data.image_url || null,
          }),
        }
      );

      if (!res.ok) throw new Error();

      toast({
        title: "Success",
        description: isEditing
          ? "Post updated successfully."
          : "Post created successfully.",
      });

      navigate("/admin");
    } catch {
      toast({
        title: "Error",
        description: "Failed to save post.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || loadingPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-2 bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <h1 className="text-xl font-bold">
            {isEditing ? "Edit Post" : "New Post"}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* TITLE */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (!isEditing && !form.getValues("slug")) {
                          form.setValue("slug", generateSlug(e.target.value));
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SLUG */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Lowercase, hyphen-separated
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CATEGORY & AUTHOR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
  value={field.value}
  onValueChange={(value) => {
    if (value === "__new__") {
      setAddingCategory(true);
    } else {
      field.onChange(value);
    }
  }}
>
{addingCategory && (
  <div className="flex gap-2 mt-2">
    <Input
      placeholder="New category name"
      value={newCategory}
      onChange={(e) => setNewCategory(e.target.value)}
    />
    <Button
      type="button"
      onClick={async () => {
        const res = await fetch(`${apiUrl}/admin/categories`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newCategory }),
        });

        if (!res.ok) return;

        const created = await res.json();
        setCategories((prev) => [...prev, created]);
        form.setValue("categoryId", created.id);
        setNewCategory("");
        setAddingCategory(false);
      }}
    >
      Add
    </Button>
  </div>
)}

                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
<SelectContent>
  {categories.map((c) => (
    <SelectItem key={c.id} value={c.id}>
      {c.name}
    </SelectItem>
  ))}

  <SelectItem value="__new__">
    ➕ Add new category
  </SelectItem>
</SelectContent>

                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* IMAGE / VIDEO UPLOAD */}
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image / Video</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>

                  {uploading && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Uploading…
                    </p>
                  )}

                  {field.value && (
                    <div className="mt-3">
                      {field.value.match(/\.(mp4|webm)$/) ? (
                        <video
                          src={field.value}
                          controls
                          className="w-full max-h-64 rounded border"
                        />
                      ) : (
                        <img
                          src={field.value}
                          alt="Preview"
                          className="w-full max-h-64 object-contain rounded border"
                        />
                      )}
                    </div>
                  )}

                  <FormDescription>
                    Upload image or video (stored securely).
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* EXCERPT */}
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* CONTENT */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea rows={15} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* PUBLISHED */}
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between border-2 p-4">
                  <div>
                    <FormLabel>Published</FormLabel>
                    <FormDescription>
                      Make post visible
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* ACTIONS */}
            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting || uploading}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEditing ? "Update Post" : "Create Post"}
                  </>
                )}
              </Button>
              <Button variant="outline" asChild>
                <Link to={`${apiUrl}/admin`}>Cancel</Link>
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default AdminPostForm;
