import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Users, Briefcase, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import { useClients } from '@/hooks/useClients';
import { Skeleton } from '@/components/ui/skeleton';
import { format, parseISO } from 'date-fns';
import { AddClientDialog } from '@/components/AddClientDialog';

export default function Clients() {
  const { clients, loading } = useClients();
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filteredClients = clients
    .filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const totalClients = clients.length;
  const totalRevenue = clients.reduce((sum, c) => sum + c.total_revenue, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 flex-shrink-0 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground text-sm">Manage your active client base and their details.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-4 bg-card border border-border rounded-2xl">
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Total Clients</div>
          <div className="text-3xl font-black">{loading ? <Skeleton className="h-8 w-12" /> : totalClients}</div>
        </Card>
        <Card className="p-4 bg-accent-lime/10 border border-accent-lime rounded-2xl">
          <div className="text-[10px] text-primary uppercase tracking-widest font-black mb-1">Lifetime Value</div>
          <div className="text-3xl font-black text-accent">{loading ? <Skeleton className="h-8 w-32" /> : formatCurrency(totalRevenue)}</div>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search clients..." 
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
              <th className="px-4 py-3 font-medium">Name & Company</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Total Revenue</th>
              <th className="px-4 py-3 font-medium">Client Since</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3"><Skeleton className="h-10 w-48" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-8 w-40" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-5 w-24" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-5 w-24" /></td>
                </tr>
              ))
            ) : filteredClients.length === 0 ? (
               <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center">
                    <Users className="w-8 h-8 text-muted-foreground opacity-50 mb-4" />
                    <p>No clients found.</p>
                    <Button variant="link" onClick={() => setIsAddOpen(true)}>Add your first client</Button>
                  </div>
                </td>
              </tr>
            ) : (
              filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-semibold">{client.name}</span>
                      {client.company && (
                        <span className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5">
                          <Briefcase className="w-3 h-3" /> {client.company}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    <div className="flex flex-col gap-0.5">
                      {client.email && <span>{client.email}</span>}
                      {client.phone && <span>{client.phone}</span>}
                      {!client.email && !client.phone && <span>--</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{formatCurrency(client.total_revenue)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{format(parseISO(client.created_at), 'MMM d, yyyy')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <AddClientDialog open={isAddOpen} onOpenChange={setIsAddOpen} />
    </div>
  );
}
