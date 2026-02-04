import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Home, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function AdminHeader() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };
  return (
      <header className="border-b-2 border-foreground bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">

          {/* <div className="flex items-center gap-2"> */}
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                View Site
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          {/* </div> */}
        </div>
      </header>
  );
}
