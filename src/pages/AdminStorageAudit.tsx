import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/constants/constants";
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
import { Trash2, FileQuestion } from "lucide-react";

type FileItem = {
  file: string;
  status: "linked" | "orphan" | "missing";
};

export default function AdminStorageAudit() {
  const [data, setData] = useState<{
    linked: FileItem[];
    orphan: FileItem[];
    missing: FileItem[];
    summary: any;
  } | null>(null);

  const [selected, setSelected] = useState<string[]>([]);
  const BUCKET = import.meta.env.VITE_SUPABASE_BUCKET;
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  
  const getPublicUrl = (file: string) =>
    `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${file}`;

  useEffect(() => {
    fetch(`${apiUrl}/admin/storage/audit`, {
      credentials: "include",
    })
      .then(r => r.json())
      .then(setData);
  }, []);

  const toggleSelect = (file: string) => {
    setSelected(prev =>
      prev.includes(file)
        ? prev.filter(f => f !== file)
        : [...prev, file]
    );
  };

  const selectAll = () => {
    if (data) {
      setSelected(data.orphan.map(item => item.file));
    }
  };

  const deselectAll = () => {
    setSelected([]);
  };

  const deleteSelected = async () => {
    try {
      const res = await fetch(`${apiUrl}/admin/storage/delete`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: selected }),
      });
  
      if (!res.ok) throw new Error();
  
      window.location.reload();
    } catch {
      alert("Failed to delete selected files");
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading audit data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const render = (
    items: FileItem[],
    colorClasses: string,
    selectable = false
  ) => {
    if (items.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          No files in this category
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {items.map(item => {
          const imgUrl = getPublicUrl(item.file);
          const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(item.file);

          return (
            <div
              key={item.file}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 ${colorClasses} transition-all hover:shadow-md`}
            >
              {/* CHECKBOX (if selectable) */}
              {selectable && (
                <input
                  type="checkbox"
                  checked={selected.includes(item.file)}
                  onChange={() => toggleSelect(item.file)}
                  className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                />
              )}

              {/* IMAGE PREVIEW */}
              <div className="relative group flex-shrink-0">
                {isImage ? (
                  <img
                    src={imgUrl}
                    alt=""
                    className="w-20 h-20 object-cover border-2 border-gray-300 rounded-lg bg-white shadow-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-lg">
                    <FileQuestion className="w-8 h-8 text-gray-400" />
                  </div>
                )}

                {/* HOVER ZOOM */}
                {isImage && (
                  <img
                    src={imgUrl}
                    className="hidden group-hover:block absolute z-50 left-24 top-0 w-80 h-80 object-contain border-4 border-gray-800 bg-white shadow-2xl rounded-lg pointer-events-none"
                    alt="Preview"
                  />
                )}
              </div>

              {/* FILE PATH */}
              <div className="flex-1 min-w-0">
                <div className="font-mono text-sm text-gray-700 break-all">
                  {item.file}
                </div>
              </div>

              {/* STATUS BADGE */}
              <div className="flex-shrink-0">
                {item.status === "linked" && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                    Linked
                  </span>
                )}
                {item.status === "orphan" && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
                    Orphan
                  </span>
                )}
                {item.status === "missing" && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white">
                    Missing
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Storage Audit</h1>
          <p className="text-gray-600">Review and manage storage files across your system</p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md border-2 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Linked Files</p>
                <p className="text-3xl font-bold">{data.summary.linked}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Files properly referenced in database</p>
          </div>

          <div className="bg-white rounded-lg shadow-md border-2 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Orphan Files</p>
                <p className="text-3xl font-bold">{data.summary.orphan}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Files not linked, safe to delete</p>
          </div>

          <div className="bg-white rounded-lg shadow-md border-2 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Missing Files</p>
                <p className="text-3xl font-bold">{data.summary.missing}</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <FileQuestion className="w-6 h-6 " />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Referenced but not in storage</p>
          </div>
        </div>

        {/* LINKED SECTION */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-xl">✓</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Linked Files</h2>
              <p className="text-sm text-gray-600">Files properly referenced in the database</p>
            </div>
          </div>
          {render(data.linked, "bg-green-50 border-green-300")}
        </section>

        {/* ORPHAN SECTION */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Orphan Files</h2>
                <p className="text-sm text-gray-600">Not linked anywhere, safe to delete</p>
              </div>
            </div>
            
            {data.orphan.length > 0 && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAll}
                  disabled={selected.length === data.orphan.length}
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={deselectAll}
                  disabled={selected.length === 0}
                >
                  Deselect All
                </Button>
              </div>
            )}
          </div>
          
          {render(data.orphan, "bg-red-50", true)}

          {selected.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="lg" className="w-full md:w-auto">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete {selected.length} Selected File{selected.length !== 1 ? 's' : ''}
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete {selected.length} Orphan File{selected.length !== 1 ? 's' : ''}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      These files are not linked anywhere in the database. This action cannot be undone and will permanently remove the files from storage.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteSelected} className="bg-red-600 hover:bg-red-700">
                      Delete Permanently
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </section>

        {/* MISSING SECTION */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10  rounded-lg flex items-center justify-center">
              <FileQuestion className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Missing Files</h2>
              <p className="text-sm text-gray-600">Referenced in database but not found in storage</p>
            </div>
          </div>
          {render(data.missing, "bg-yellow-50 border-yellow-300")}
        </section>
      </div>
    </div>
  );
}