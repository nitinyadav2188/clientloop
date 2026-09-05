import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { useProposals } from '@/hooks/useProposals';
import { Skeleton } from '@/components/ui/skeleton';
import { format, parseISO } from 'date-fns';

export default function Proposals() {
  const { proposals, loading } = useProposals();
  const [search, setSearch] = useState('');

  const filteredProposals = proposals
    .filter(p => 
      p.project.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const drafts = proposals.filter(p => p.status === 'draft').length;
  const sent = proposals.filter(p => p.status === 'sent').length;
  const accepted = proposals.filter(p => p.status === 'accepted').length;
  const totalSentValue = proposals
    .filter(p => p.status === 'sent')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Proposals</h1>
          <p className="text-muted-foreground text-sm">Create and track your client proposals.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Drafts</div>
          <div className="text-2xl font-bold">{loading ? <Skeleton className="h-8 w-12" /> : drafts}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Sent</div>
          <div className="text-2xl font-bold">{loading ? <Skeleton className="h-8 w-12" /> : sent}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Accepted</div>
          <div className="text-2xl font-bold text-accent-lime drop-shadow-sm">{loading ? <Skeleton className="h-8 w-12" /> : accepted}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Value (Sent)</div>
          <div className="text-2xl font-bold">{loading ? <Skeleton className="h-8 w-32" /> : formatCurrency(totalSentValue)}</div>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search proposals..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm flex-1 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
            <tr>
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3"><Skeleton className="h-5 w-32" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-5 w-24" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-5 w-24" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-6 w-20 rounded-full" /></td>
                </tr>
              ))
            ) : filteredProposals.length === 0 ? (
               <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No proposals found.
                </td>
              </tr>
            ) : (
              filteredProposals.map((prop) => (
                <tr key={prop.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3 font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    {prop.project}
                  </td>
                  <td className="px-4 py-3 font-medium">{formatCurrency(prop.amount)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{format(parseISO(prop.created_at), 'MMM d, yyyy')}</td>
                  <td className="px-4 py-3">
                    <Badge variant={prop.status === 'accepted' ? 'success' : prop.status === 'sent' ? 'info' : 'outline'}>{prop.status}</Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
