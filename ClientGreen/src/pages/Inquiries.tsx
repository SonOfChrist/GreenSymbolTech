import { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, orderBy, query, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CheckCircle2, Clock3, Loader2, MessageSquare, Search, Sparkles } from 'lucide-react';

interface InquiryItem {
  id: string;
  fullNameTitle: string;
  companyName: string;
  country: string;
  phone: string;
  email: string;
  solutionCategory: string;
  partnerProduct: string;
  projectScope: string;
  inquiryType: string;
  source?: string;
  status: string;
  createdAt?: Timestamp | null;
}

export default function Inquiries() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<InquiryItem, 'id'>),
      }));
      setInquiries(items);
      setLoading(false);
    }, (error) => {
      console.error('Failed to load inquiries:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredInquiries = useMemo(() => {
    const queryText = search.trim().toLowerCase();
    if (!queryText) return inquiries;

    return inquiries.filter((item) => {
      const haystack = [
        item.fullNameTitle,
        item.companyName,
        item.email,
        item.phone,
        item.solutionCategory,
        item.partnerProduct,
        item.projectScope,
        item.country,
        item.status,
      ].join(' ').toLowerCase();
      return haystack.includes(queryText);
    });
  }, [inquiries, search]);

  const handleMarkDone = async (id: string) => {
    setUpdatingId(id);
    try {
      await updateDoc(doc(db, 'contactMessages', id), { status: 'reviewed' });
    } catch (error) {
      console.error('Failed to update inquiry status:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Inquiries</p>
          <h1 className="text-3xl font-semibold text-foreground">Website enquiries</h1>
          <p className="text-sm text-muted-foreground mt-1">Review incoming contact requests and track their status.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries"
            className="w-full rounded-lg border border-border bg-background/80 pl-9 pr-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center rounded-2xl border border-border bg-card p-12 text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Loading enquiries...
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
          <MessageSquare className="mx-auto mb-3 h-8 w-8 text-emerald-500" />
          No enquiries found yet.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">{item.fullNameTitle || 'Unnamed contact'}</h2>
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                      {item.inquiryType}
                    </span>
                    <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      {item.status || 'new'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.companyName} • {item.country}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>{item.email}</span>
                    <span>{item.phone}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>Solution: {item.solutionCategory}</span>
                    <span>Product: {item.partnerProduct}</span>
                  </div>
                  <p className="max-w-3xl whitespace-pre-wrap text-sm text-foreground">{item.projectScope}</p>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5" />
                    Source: {item.source || 'website'}
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:min-w-45">
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                    {item.status === 'reviewed' ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Clock3 className="h-4 w-4" />}
                    {item.status === 'reviewed' ? 'Reviewed' : 'Awaiting review'}
                  </div>
                  <button
                    onClick={() => handleMarkDone(item.id)}
                    disabled={updatingId === item.id || item.status === 'reviewed'}
                    className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {updatingId === item.id ? 'Updating...' : item.status === 'reviewed' ? 'Reviewed' : 'Mark reviewed'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
