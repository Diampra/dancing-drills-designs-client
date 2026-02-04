import { useEffect, useState } from "react";
import AdminHeader from "@/layouts/AdminHeader";
import { apiUrl } from "@/constants/constants";

type Stats = {
  posts: { total: number; published: number };
  categories: number;
  portfolio: { total: number; published: number };
  services: { total: number; published: number };
  testimonials: { total: number; published: number };
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/admin/dashboard`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then(setStats);
  }, []);

  const Card = ({
    label,
    value,
    sub,
  }: {
    label: string;
    value: number | string;
    sub?: string;
  }) => (
    <div className="border-2 border-foreground  shadow-sm p-6">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );

  return (
    <div>
      <AdminHeader />
      <h1 className="text-2xl font-bold mb-6 pt-8">Dashboard</h1>

      {!stats ? (
        <p className="text-muted-foreground">Loading stats…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            label="Blog Posts"
            value={stats.posts.total}
            sub={`${stats.posts.published} published`}
          />

          <Card
            label="Blog Categories"
            value={stats.categories}
          />

          <Card
            label="Portfolio Items"
            value={stats.portfolio.total}
            sub={`${stats.portfolio.published} published`}
          />

          <Card
            label="Services"
            value={stats.services.total}
            sub={`${stats.services.published} published`}
          />

          <Card
            label="Testimonials"
            value={stats.testimonials.total}
            sub={`${stats.testimonials.published} published`}
          />
        </div>
      )}
    </div>
  );
}
