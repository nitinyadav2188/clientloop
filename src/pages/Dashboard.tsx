import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLeads } from '@/hooks/useLeads';
import { useAuth } from '@/contexts/AuthContext';
import { Lead } from '@/types';
import { ArrowRight, CheckCircle2, Clock, Calendar, Plus } from 'lucide-react';
import { format, isToday, isPast, parseISO, differenceInDays } from 'date-fns';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'motion/react';
import QuickAddLeadModal from '@/components/QuickAddLeadModal';

export default function Dashboard() {
  const { leads, loading } = useLeads();
  const { profile } = useAuth();
  const user = profile || { name: ' ', plan: 'free' };
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [quickNotes, setQuickNotes] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('clientloop_quick_notes');
    if (savedNotes) {
      setQuickNotes(savedNotes);
    }
  }, []);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuickNotes(e.target.value);
    localStorage.setItem('clientloop_quick_notes', e.target.value);
  };

  const totalLeads = leads.length;
  const pipelineValue = leads
    .filter(l => l.stage !== 'won' && l.stage !== 'lost')
    .reduce((sum, l) => sum + l.estimated_value, 0);
  const wonRevenue = leads
    .filter(l => l.stage === 'won')
    .reduce((sum, l) => sum + l.estimated_value, 0);
    
  // Simple logic for today's follow-ups
  const todaysFollowUps = leads.filter(l => {
    if (l.stage === 'won' || l.stage === 'lost') return false;
    const followUpDate = parseISO(l.next_follow_up_at);
    return isToday(followUpDate) || isPast(followUpDate);
  }).sort((a, b) => new Date(a.next_follow_up_at).getTime() - new Date(b.next_follow_up_at).getTime());

  const upcomingDeadlines = leads.filter(l => {
    if (l.stage === 'won' || l.stage === 'lost') return false;
    if (!l.project_due_date) return false;
    const daysUntil = differenceInDays(parseISO(l.project_due_date), new Date());
    return daysUntil >= 0 && daysUntil <= 7;
  }).sort((a, b) => new Date(a.project_due_date!).getTime() - new Date(b.project_due_date!).getTime());


  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
    return `₹${amount}`;
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-hidden flex flex-col gap-8 h-full">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-10 w-3/4 max-w-md" />
          <Skeleton className="h-5 w-1/2 max-w-xs mt-2" />
        </div>
        {upcomingDeadlines.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-4 shadow-sm mb-2">
          <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-red-800 font-bold text-sm uppercase tracking-wider mb-1">Upcoming Project Deadlines</h3>
            <div className="space-y-2 mt-3">
              {upcomingDeadlines.map(lead => {
                const days = differenceInDays(parseISO(lead.project_due_date!), new Date());
                return (
                  <div key={lead.id} className="flex items-center justify-between bg-white/60 p-2 rounded-lg border border-red-100">
                    <div>
                      <p className="font-bold text-red-900">{lead.project}</p>
                      <p className="text-xs text-red-700">Client: {lead.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-red-600 bg-red-100 px-3 py-1 rounded-full uppercase tracking-widest">
                        {days === 0 ? 'Due Today' : `Due in ${days} ${days === 1 ? 'day' : 'days'}`}
                      </span>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/app/leads/${lead.id}`)} className="h-8 border-red-200 text-red-700 hover:bg-red-100 hover:text-red-900">
                        View
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card border border-border p-5 rounded-2xl">
              <Skeleton className="h-3 w-20 mb-2" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-6 overflow-hidden flex-1 min-h-0">
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
             <Skeleton className="h-6 w-40" />
             <div className="space-y-3">
               {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}
             </div>
          </div>
          <div className="w-full lg:w-80 flex flex-col gap-4 shrink-0">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="flex-1 rounded-2xl min-h-[300px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-col gap-8 h-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black tracking-tighter uppercase">Good Morning, {user.name.split(' ')[0]}.</h1>
        <p className="text-muted-foreground font-medium">
          You have <span className="text-primary font-bold">{todaysFollowUps.length} follow-ups</span> scheduled for today.
        </p>
      </div>

      {upcomingDeadlines.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-4 shadow-sm mb-2">
          <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-red-800 font-bold text-sm uppercase tracking-wider mb-1">Upcoming Project Deadlines</h3>
            <div className="space-y-2 mt-3">
              {upcomingDeadlines.map(lead => {
                const days = differenceInDays(parseISO(lead.project_due_date!), new Date());
                return (
                  <div key={lead.id} className="flex items-center justify-between bg-white/60 p-2 rounded-lg border border-red-100">
                    <div>
                      <p className="font-bold text-red-900">{lead.project}</p>
                      <p className="text-xs text-red-700">Client: {lead.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-red-600 bg-red-100 px-3 py-1 rounded-full uppercase tracking-widest">
                        {days === 0 ? 'Due Today' : `Due in ${days} ${days === 1 ? 'day' : 'days'}`}
                      </span>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/app/leads/${lead.id}`)} className="h-8 border-red-200 text-red-700 hover:bg-red-100 hover:text-red-900">
                        View
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-card border border-border p-5 rounded-2xl">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Total Leads</p>
          <p className="text-3xl font-black">{totalLeads}</p>
        </motion.div>
        <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-card border border-border p-5 rounded-2xl">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Pipeline Value</p>
          <p className="text-3xl font-black">{formatCurrency(pipelineValue)}</p>
        </motion.div>
        <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-card border border-border p-5 rounded-2xl">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Won Revenue</p>
          <p className="text-3xl font-black">{formatCurrency(wonRevenue)}</p>
        </motion.div>
        <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-accent-lime/10 border border-accent-lime p-5 rounded-2xl">
          <p className="text-[10px] text-primary uppercase tracking-widest font-black mb-1">Action Required</p>
          <p className="text-3xl font-black text-accent">{todaysFollowUps.length}</p>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 overflow-hidden flex-1 min-h-0">
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <h3 className="text-lg font-black tracking-tight uppercase">Today's Follow-ups</h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 pb-6">
          {todaysFollowUps.length === 0 ? (
            <div className="bg-card border border-border p-8 rounded-xl flex flex-col items-center justify-center text-center">
              <CheckCircle2 className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
              <h3 className="font-bold mb-1">You're all caught up!</h3>
              <p className="text-sm text-muted-foreground">No follow-ups due today.</p>
            </div>
          ) : (
            <>
              {todaysFollowUps.map((lead, index) => (
                <motion.div key={lead.id} whileHover={{ x: 4, transition: { duration: 0.2 } }} className={cn("bg-card border border-border p-4 rounded-xl flex items-center gap-4 cursor-pointer", index === 0 ? "border-l-4 border-l-accent-lime" : "")} onClick={() => navigate(`/app/leads/${lead.id}`)}>
                  <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center shrink-0 font-bold border border-border">
                    {lead.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-sm truncate">{lead.name}</p>
                      <div className="flex gap-1 shrink-0 ml-2">
                        {isPast(parseISO(lead.next_follow_up_at)) && !isToday(parseISO(lead.next_follow_up_at)) && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded uppercase tracking-wide">Overdue</span>
                        )}
                        {lead.temperature === 'hot' && <span className="px-2 py-0.5 bg-accent-lime/20 text-primary text-[10px] font-bold rounded uppercase tracking-wide">Hot</span>}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{lead.project} • <span className="text-primary font-semibold">{formatCurrency(lead.estimated_value)}</span></p>
                  </div>
                  <Button variant="outline" size="icon" onClick={(e) => { e.stopPropagation(); navigate(`/app/leads/${lead.id}`); }} className="shrink-0 rounded-lg">
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              ))}
            </>
          )}
          </div>
        </div>

        <div className="w-full lg:w-80 flex flex-col gap-6 overflow-hidden shrink-0 pb-6">
          <div className="flex flex-col gap-3 shrink-0">
            <h3 className="text-lg font-black tracking-tight uppercase">Quick Notes</h3>
            <div className="bg-[#C8FF2C]/10 border border-[#C8FF2C]/30 rounded-2xl p-1 shadow-sm relative group focus-within:border-[#C8FF2C] transition-colors">
              <textarea
                value={quickNotes}
                onChange={handleNotesChange}
                placeholder="Jot down quick thoughts, reminders, or numbers..."
                className="w-full h-32 bg-transparent resize-none outline-none text-sm p-3 placeholder:text-muted-foreground/60 text-foreground"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1 overflow-hidden">
            <h3 className="text-lg font-black tracking-tight uppercase">Recent Activity</h3>
            <div className="flex-1 bg-card border border-border rounded-2xl p-5 overflow-y-auto space-y-4">
            {[...leads].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5).map(lead => (
              <motion.div key={lead.id} whileHover={{ x: 2, transition: { duration: 0.2 } }} className="space-y-2 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest truncate max-w-[150px]">{lead.name}</span>
                  <span className="text-[10px] font-bold shrink-0">{format(parseISO(lead.created_at), 'MMM d')}</span>
                </div>
                <div className="bg-background p-3 rounded-lg border border-border">
                  <p className="text-xs font-bold truncate">{lead.project}</p>
                  <p className="text-[10px] text-muted-foreground truncate">Added as new lead</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </div>
      </div>

      <Button
        size="icon"
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-2xl bg-gradient-to-r from-[#3F46FF] to-[#FF3366] text-white hover:scale-105 hover:shadow-[#FF3366]/30 transition-all duration-200 z-50 border-none"
        onClick={() => setIsAddModalOpen(true)}
      >
        <Plus className="w-6 h-6" />
      </Button>

      {isAddModalOpen && (
        <QuickAddLeadModal 
          onClose={() => setIsAddModalOpen(false)} 
          onSaved={() => setIsAddModalOpen(false)} 
        />
      )}
    </div>
  );
}
