import React, { useState, useEffect } from 'react';
import { store } from '@/lib/store';
import { Lead } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const STAGES = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'qualified', label: 'Qualified' },
  { id: 'proposal', label: 'Proposal' },
  { id: 'negotiation', label: 'Negotiation' },
  { id: 'won', label: 'Won' }
];

export default function Pipeline() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLeads(store.getLeads());
  }, []);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('leadId', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stage: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('leadId');
    if (id) {
      const updated = store.updateLead(id, { stage: stage as any });
      setLeads(prev => prev.map(l => l.id === id ? updated : l));
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pipeline</h1>
          <p className="text-muted-foreground text-sm">Drag and drop leads to update their stage.</p>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 h-full min-w-max">
          {STAGES.map(stage => {
            const stageLeads = leads.filter(l => l.stage === stage.id);
            const totalValue = stageLeads.reduce((acc, l) => acc + l.estimated_value, 0);

            return (
              <div 
                key={stage.id} 
                className="w-72 flex flex-col bg-muted/30 rounded-xl border p-3"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">{stage.label}</h3>
                  <Badge variant="secondary" className="font-mono text-xs">{stageLeads.length}</Badge>
                </div>
                
                <div className="text-sm font-medium mb-4 px-1">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalValue)}
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {stageLeads.map(lead => (
                    <div 
                      key={lead.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                      onClick={() => navigate(`/app/leads/${lead.id}`)}
                      className="bg-white p-3 rounded-lg border shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors"
                    >
                      <h4 className="font-semibold text-sm mb-1 truncate">{lead.name}</h4>
                      <p className="text-xs text-muted-foreground truncate mb-2">{lead.project}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium bg-accent-lime/20 text-primary px-1.5 py-0.5 rounded">
                          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(lead.estimated_value)}
                        </span>
                        {lead.temperature === 'hot' && (
                          <div className="w-2 h-2 rounded-full bg-red-500" title="Hot lead"></div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {stageLeads.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center text-xs text-muted-foreground italic">
                      Drop leads here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
