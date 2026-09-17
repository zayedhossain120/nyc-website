"use client";

import { useState, useEffect } from "react";
import { Search, Trash2, RefreshCw, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAdminAuth } from "./_lib/adminAuth";
import { cn } from "@/lib/utils";

interface Inquiry {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  company?: string;
  budget: string;
  timeline: string;
  serviceInterest: string;
  message?: string;
  status: "New" | "Contacted" | "In Review" | "Archived";
  createdAt: string;
}

export default function AdminDashboard() {
  const { authFetch } = useAdminAuth();

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedInquiryModal, setSelectedInquiryModal] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await authFetch("/api/inquiry");
      const json = await res.json();
      if (json.success) {
        setInquiries(json.data);
      }
    } catch (err) {
      console.error("Failed to load inquiries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    fetchInquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (id: string, newStatus: Inquiry["status"]) => {
    try {
      const res = await authFetch("/api/inquiry", {
        method: "PATCH",
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setInquiries((prev) =>
          prev.map((item) => ((item.id === id || item._id === id) ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project inquiry?")) return;
    try {
      const res = await authFetch(`/api/inquiry?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setInquiries((prev) => prev.filter((item) => (item.id !== id && item._id !== id)));
      }
    } catch (err) {
      console.error("Failed to delete inquiry", err);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      inq.serviceInterest.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" ? true : inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "New").length;
  const contactedCount = inquiries.filter((i) => i.status === "Contacted").length;

  const metricCards = [
    { label: "Total Inquiries", value: totalCount, tone: "text-primary" },
    { label: "New Submissions", value: newCount, tone: "text-accent-warm" },
    { label: "Contacted Leads", value: contactedCount, tone: "text-accent-primary" },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">Inbox</span>
          <h1 className="mt-1 text-xl font-medium tracking-tight text-primary">Project Inquiries</h1>
        </div>
        <button
          onClick={fetchInquiries}
          className="flex items-center gap-1.5 rounded-lg border border-subtle bg-surface px-3 py-2 font-mono text-xs text-secondary transition-colors hover:text-accent-secondary"
        >
          <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
          <span className="hidden sm:inline">Refresh Data</span>
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {metricCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-subtle bg-surface/60 p-5">
            <div className="mb-1 font-mono text-xs text-muted uppercase">{card.label}</div>
            <div className={cn("font-mono text-3xl font-medium", card.tone)}>{card.value}</div>
          </div>
        ))}
      </div>

      <div className="mb-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-subtle bg-surface/60 p-4 md:flex-row">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search by client, email, company, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-strong bg-surface px-4 py-2 pl-9 text-xs text-primary placeholder:text-muted focus:border-accent-primary focus:outline-none"
          />
        </div>

        <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
          <span className="mr-1 flex items-center gap-1 font-mono text-xs text-secondary">Status:</span>
          {["All", "New", "Contacted", "In Review", "Archived"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                "rounded-lg border px-3 py-1 font-mono text-xs transition-colors",
                statusFilter === st
                  ? "border-accent-secondary/40 bg-accent-secondary/10 font-bold text-accent-secondary"
                  : "border-subtle bg-surface text-secondary hover:text-primary"
              )}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-subtle bg-surface/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-subtle bg-surface-2 font-mono text-[10px] uppercase tracking-wider text-secondary">
              <tr>
                <th className="p-4">Submitted Date</th>
                <th className="p-4">Client &amp; Company</th>
                <th className="p-4">Service Interest</th>
                <th className="p-4">Est. Budget</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle/60">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted italic">
                    No project inquiries found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => {
                  const id = inq.id || inq._id || "";
                  return (
                    <tr key={id} className="transition-colors hover:bg-surface-2/50">
                      <td className="whitespace-nowrap p-4 font-mono text-secondary">
                        {new Date(inq.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      <td className="p-4">
                        <div className="text-sm font-medium text-primary">{inq.name}</div>
                        <div className="font-mono text-[11px] text-secondary">{inq.email}</div>
                        {inq.company && (
                          <div className="mt-0.5 font-mono text-[10px] text-accent-secondary">{inq.company}</div>
                        )}
                      </td>

                      <td className="p-4">
                        <span className="rounded border border-subtle bg-surface px-2 py-1 font-mono text-secondary">
                          {inq.serviceInterest}
                        </span>
                      </td>

                      <td className="p-4 font-mono font-semibold text-accent-secondary">{inq.budget}</td>

                      <td className="p-4">
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(id, e.target.value as Inquiry["status"])}
                          className="cursor-pointer rounded-lg border border-subtle bg-surface px-2.5 py-1 font-mono text-[11px] font-semibold text-secondary focus:outline-none"
                        >
                          {["New", "Contacted", "In Review", "Archived"].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>

                      <td className="space-x-2 p-4 text-right">
                        <button
                          onClick={() => setSelectedInquiryModal(inq)}
                          className="rounded-lg border border-subtle bg-surface p-1.5 text-accent-secondary transition-colors hover:bg-surface-2"
                          title="View Full Notes"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(id)}
                          className="rounded-lg border border-subtle bg-surface p-1.5 text-accent-warm transition-colors hover:bg-accent-warm/10"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedInquiryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 p-4 backdrop-blur-md"
          onClick={() => setSelectedInquiryModal(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-subtle bg-surface p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between border-b border-subtle pb-3">
              <Badge tone="secondary">Inquiry Detail</Badge>
              <button
                onClick={() => setSelectedInquiryModal(null)}
                className="text-xs font-bold text-secondary transition-colors hover:text-primary"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-mono text-secondary">Client Name:</span>
                <div className="text-base font-medium text-primary">{selectedInquiryModal.name}</div>
              </div>
              <div>
                <span className="font-mono text-secondary">Email:</span>
                <div className="font-mono text-accent-secondary">{selectedInquiryModal.email}</div>
              </div>
              {selectedInquiryModal.company && (
                <div>
                  <span className="font-mono text-secondary">Company:</span>
                  <div className="font-semibold text-primary">{selectedInquiryModal.company}</div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 border-t border-subtle pt-2">
                <div>
                  <span className="font-mono text-secondary">Budget:</span>
                  <div className="font-bold text-accent-primary">{selectedInquiryModal.budget}</div>
                </div>
                <div>
                  <span className="font-mono text-secondary">Timeline:</span>
                  <div className="font-semibold text-primary">{selectedInquiryModal.timeline}</div>
                </div>
              </div>

              <div className="border-t border-subtle pt-2">
                <span className="font-mono text-secondary">Project Notes / Message:</span>
                <div className="mt-1 whitespace-pre-wrap rounded-lg border border-subtle bg-surface-2 p-3 leading-relaxed text-secondary">
                  {selectedInquiryModal.message || "No notes provided."}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedInquiryModal(null)}
                className="rounded-full border border-strong bg-surface px-4 py-2 text-xs font-medium text-primary transition-colors hover:border-accent-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}