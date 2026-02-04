import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Loader2,
  Home,
} from "lucide-react";
import { apiUrl } from "@/constants/constants";
import AdminHeader from "@/layouts/AdminHeader";
import { useAuth } from "@/hooks/useAuth";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  createdAt: string;
}

const AdminPosts = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Protect admin route
  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate(`${apiUrl}/auth`);
      } else if (!isAdmin) {
        toast({
          title: "Access denied",
          description: "You do not have admin privileges.",
          variant: "destructive",
        });
        navigate("/");
      }
    }
  }, [user, isAdmin, loading, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchPosts();
    }
  }, [isAdmin]);

  // Fetch posts from backend
  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await fetch(`${apiUrl}/admin/blogs`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setPosts(data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch blog posts.",
        variant: "destructive",
      });
    }
    setLoadingPosts(false);
  };

  // Delete post
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${apiUrl}/admin/blog/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      toast({
        title: "Deleted",
        description: "Blog post deleted successfully.",
      });

      fetchPosts();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete the post.",
        variant: "destructive",
      });
    }
  };

  // const handleLogout = async () => {
  //   await signOut();
  //   navigate("/");
  // };

  if (loading || loadingPosts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AdminHeader />

      {/* Main */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Blog Posts</h2>
          <Button asChild>
            <Link to="/admin/posts/new">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed">
            <p className="text-muted-foreground mb-4">
              No blog posts yet.
            </p>
            <Button asChild>
              <Link to="/admin/posts/new">Create your first post</Link>
            </Button>
          </div>
        ) : (
          <div className="border-2 border-foreground overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">
                      {post.title}
                    </TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>
                      <Badge
                        variant={post.published ? "default" : "secondary"}
                      >
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/admin/posts/${post.id}`}>
                            <Pencil className="w-4 h-4" />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Post?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDelete(post.id)
                                }
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPosts;
