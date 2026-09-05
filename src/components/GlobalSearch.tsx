import React, { useState, useRef, useEffect } from 'react';
import { Search, FileText, Briefcase, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLeads } from '@/hooks/useLeads';
import { useClients } from '@/hooks/useClients';
import { cn } from '@/lib/utils';

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { leads } = useLeads();
  const { clients } = useClients();
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchLower = query.toLowerCase();

  const filteredLeads = query ? leads.filter(l => 
    l.name.toLowerCase().includes(searchLower) ||
    (l.company && l.company.toLowerCase().includes(searchLower)) ||
    (l.project && l.project.toLowerCase().includes(searchLower))
  ).slice(0, 5) : [];

  const filteredClients = query ? clients.filter(c => 
    c.name.toLowerCase().includes(searchLower) ||
    (c.company && c.company.toLowerCase().includes(searchLower))
  ).slice(0, 5) : [];

  const hasResults = filteredLeads.length > 0 || filteredClients.length > 0;

  const handleSelectLead = (id: string) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/app/leads/${id}`);
  };

  const handleSelectClient = () => {
    setIsOpen(false);
    setQuery('');
    navigate(`/app/clients`);
  };

  return (
    <div className="relative w-full hidden sm:block" ref={wrapperRef}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <input
        type="text"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
        onFocus={() => setIsOpen(true)}
        placeholder="SEARCH LEADS, CLIENTS OR PROJECTS..."
        className="w-full pl-12 pr-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-[11px] font-black tracking-widest uppercase focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
      />
      
      {isOpen && query.length > 0 && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl shadow-xl border border-border overflow-hidden z-50 max-h-[400px] overflow-y-auto">
          {!hasResults ? (
            <div className="p-6 text-center text-muted-foreground text-sm font-bold">
              No results found for "{query}"
            </div>
          ) : (
            <div className="py-2">
              {filteredLeads.length > 0 && (
                <div className="mb-2">
                  <div className="px-4 py-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-muted/10">
                    Leads & Projects
                  </div>
                  {filteredLeads.map(lead => (
                    <button
                      key={lead.id}
                      onClick={() => handleSelectLead(lead.id)}
                      className="w-full text-left px-4 py-3 hover:bg-muted/30 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent-lime/10 text-primary flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-primary">{lead.name}</div>
                          <div className="text-xs text-muted-foreground font-medium truncate max-w-[200px] lg:max-w-[300px]">
                            {lead.project || lead.company || 'No project specified'}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}

              {filteredClients.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-muted/10">
                    Clients
                  </div>
                  {filteredClients.map(client => (
                    <button
                      key={client.id}
                      onClick={handleSelectClient}
                      className="w-full text-left px-4 py-3 hover:bg-muted/30 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-primary">{client.name}</div>
                          {client.company && (
                            <div className="text-xs text-muted-foreground font-medium">{client.company}</div>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
