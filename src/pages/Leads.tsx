import React, { useState, useEffect } from 'react';
import { useLeads } from '@/hooks/useLeads';
import { Lead } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { Search, Plus, Filter, MoreHorizontal, MessageSquare, Users, ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import QuickAddLeadModal from '@/components/QuickAddLeadModal';
import { Skeleton } from '@/components/ui/skeleton';

export default function Leads() {
  const { leads, loading } = useLeads();
  const [search, setSearch] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase()) || 
                          lead.project.toLowerCase().includes(search.toLowerCase()) ||
                          (lead.company && lead.company.toLowerCase().includes(search.toLowerCase()));
    
    const matchesStage = filterStage === 'all' || lead.stage === filterStage;
    
    return matchesSearch && matchesStage;
  }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTemperatureBadge = (temp: string) => {
    switch(temp) {
      case 'hot': return <Badge variant="success">Hot</Badge>;
      case 'warm': return <Badge variant="secondary">Warm</Badge>;
      case 'cold': return <Badge variant="outline" className="text-muted-foreground">Cold</Badge>;
      default: return null;
    }
  };

  const getStageBadge = (stage: string) => {
    const stageMap: Record<string, { label: string, variant: "default" | "secondary" | "outline" | "success" | "info" }> = {
      new: { label: 'New', variant: 'info' },
      contacted: { label: 'Contacted', variant: 'secondary' },
      qualified: { label: 'Qualified', variant: 'default' },
      proposal: { label: 'Proposal', variant: 'default' },
      negotiation: { label: 'Negotiation', variant: 'default' },
      won: { label: 'Won', variant: 'success' },
      lost: { label: 'Lost', variant: 'outline' },
    };
    
    const mapped = stageMap[stage] || { label: stage, variant: 'outline' };
    return <Badge variant={mapped.variant}>{mapped.label}</Badge>;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground text-sm">Manage and track your potential clients.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 flex-shrink-0">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search leads..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={filterStage} onChange={(e) => setFilterStage(e.target.value)}>
            <option value="all">All Stages</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="negotiation">Negotiation</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border shadow-sm flex-1 overflow-hidden flex flex-col p-4 space-y-4">
           {[1, 2, 3, 4, 5].map((i) => (
             <div key={i} className="flex items-center space-x-4 py-2 border-b last:border-0">
               <div className="flex-1 space-y-2">
                 <Skeleton className="h-4 w-[250px]" />
                 <Skeleton className="h-3 w-[200px]" />
               </div>
               <Skeleton className="h-6 w-20 rounded-full" />
               <Skeleton className="h-4 w-16" />
               <Skeleton className="h-8 w-8 rounded-md" />
             </div>
           ))}
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-white border border-dashed rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No leads found</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            {search || filterStage !== 'all' 
              ? "We couldn't find any leads matching your filters." 
              : "Add your first lead and start building your pipeline."}
          </p>
          {(search || filterStage !== 'all') ? (
            <Button variant="outline" onClick={() => { setSearch(''); setFilterStage('all'); }}>Clear Filters</Button>
          ) : (
            <Button onClick={() => setIsAddModalOpen(true)}>Add Lead</Button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border shadow-sm flex-1 overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 font-medium">Name & Project</th>
                  <th className="px-4 py-3 font-medium">Stage</th>
                  <th className="px-4 py-3 font-medium">Value</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Source</th>
                  <th className="px-4 py-3 font-medium hidden lg:table-cell">Next Follow-up</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredLeads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    className="hover:bg-secondary/20 transition-colors cursor-pointer"
                    onClick={() => navigate(`/app/leads/${lead.id}`)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-semibold">{lead.name}</span>
                        <span className="text-muted-foreground truncate max-w-[200px]">{lead.project}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1.5 items-start">
                        {getStageBadge(lead.stage)}
                        {getTemperatureBadge(lead.temperature)}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {formatCurrency(lead.estimated_value)}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell capitalize text-muted-foreground">
                      {lead.source}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">
                      {format(parseISO(lead.next_follow_up_at), 'MMM d, yyyy')}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); navigate(`/app/leads/${lead.id}`); }}>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t text-sm text-muted-foreground">
            Showing {filteredLeads.length} {filteredLeads.length === 1 ? 'lead' : 'leads'}
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <QuickAddLeadModal 
          onClose={() => setIsAddModalOpen(false)} 
          onSaved={() => {
            setIsAddModalOpen(false);
            
          }} 
        />
      )}
    </div>
  );
}