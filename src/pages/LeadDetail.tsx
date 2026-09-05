import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLeads } from '@/hooks/useLeads';
import { Lead } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateFollowUp } from '@/lib/ai';
import { useToast } from '@/components/ui/use-toast';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, Phone, Mail, Building, Globe, MessageSquare, 
  Calendar, FileText, CheckCircle2, Copy, Sparkles, Loader2, Link as LinkIcon
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function LeadDetail() {
  const { leads, updateLead, deleteLead } = useLeads();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [lead, setLead] = useState<Lead | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [followUpTone, setFollowUpTone] = useState('Professional');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [showAiModal, setShowAiModal] = useState(false);

  useEffect(() => {
    if (id) {
      
      const found = leads.find(l => l.id === id);
      if (found) {
        setLead(found);
      } else {
        toast({ title: 'Lead not found', type: 'error' });
        navigate('/app/leads');
      }
    }
    
    // Check if we need to open followup modal automatically
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('action') === 'followup') {
      setShowAiModal(true);
      window.history.replaceState({}, '', `/app/leads/${id}`);
    }
  }, [id]);

  const handleStageChange = async (newStage: string) => {
    if (lead) {
      await updateLead(lead.id, { stage: newStage as any }); const updated = { ...lead, stage: newStage as any };
      setLead(updated);
      toast({ title: 'Stage updated', type: 'success' });
    }
  };

  const handleGenerateMessage = async () => {
    if (!lead) return;
    setIsGenerating(true);
    try {
      const context = `a project discussing ${lead.project} worth ₹${lead.estimated_value}`;
      const msg = await generateFollowUp(context, followUpTone);
      setGeneratedMessage(msg);
    } catch (e) {
      toast({ title: 'Generation failed', type: 'error' });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    toast({ title: 'Copied to clipboard', type: 'success' });
  };

  if (!lead) return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <button onClick={() => navigate('/app/leads')} className="hover:text-primary flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Leads
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{lead.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <Badge variant="outline" className="capitalize flex items-center gap-1">
              {lead.source === 'whatsapp' ? <MessageSquare className="w-3 h-3" /> : <LinkIcon className="w-3 h-3"/>}
              {lead.source}
            </Badge>
            <span className="text-muted-foreground">•</span>
            <span className="font-medium">₹{lead.estimated_value.toLocaleString('en-IN')}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={lead.stage} onChange={(e) => handleStageChange(e.target.value)} className="w-40">
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="negotiation">Negotiation</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </Select>
          <Button onClick={() => setShowAiModal(true)} className="bg-accent-blue hover:bg-accent-blue/90 text-white">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Follow-up
          </Button>
          <Button variant="outline" onClick={async () => {
            if (confirm('Are you sure you want to delete this lead?')) {
              await deleteLead(lead.id);
              toast({ title: 'Lead deleted', type: 'success' });
              navigate('/app/leads');
            }
          }} className="text-destructive hover:bg-destructive hover:text-white border-destructive">
            Delete
          </Button>
          {lead.stage === 'won' && (
            <Button className="bg-accent-lime text-primary hover:bg-accent-lime/90">
              Convert to Client
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{lead.email || 'No email provided'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{lead.phone || 'No phone provided'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-muted-foreground" />
                <span>{lead.company || 'No company provided'}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Lead Created</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{format(parseISO(lead.created_at), 'MMM d, yyyy')}</p>
                </div>
              </div>
              {lead.project_due_date && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-red-700">Project Deadline</p>
                  <p className="text-red-600 font-bold text-xs mt-0.5">{format(parseISO(lead.project_due_date), 'MMM d, yyyy')}</p>
                </div>
              </div>
              )}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Last Contact</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{format(parseISO(lead.last_contact_at), 'MMM d, yyyy')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-2">{lead.project}</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {lead.description || 'No detailed description provided for this lead.'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Activity Log</CardTitle>
              <Button variant="outline" size="sm">Add Note</Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground text-sm border-dashed border rounded-lg">
                No recent activity. Notes and calls will appear here.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAiModal(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-accent-blue/5 text-accent-blue">
              <div className="flex items-center gap-2 font-semibold">
                <Sparkles className="w-4 h-4" />
                Smart Follow-up Writer
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowAiModal(false)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tone</span>
                <div className="flex gap-2">
                  {['Professional', 'Friendly', 'Direct'].map(t => (
                    <Badge 
                      key={t}
                      variant={followUpTone === t ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => setFollowUpTone(t)}
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Textarea 
                  className="min-h-[150px] resize-none" 
                  value={generatedMessage}
                  onChange={(e) => setGeneratedMessage(e.target.value)}
                  placeholder="Click generate to write a message..."
                />
                {!generatedMessage && !isGenerating && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Button type="button" className="pointer-events-auto" onClick={handleGenerateMessage}>
                      Generate Draft
                    </Button>
                  </div>
                )}
                {isGenerating && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                    <Loader2 className="w-6 h-6 animate-spin text-accent-blue" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4 border-t bg-muted/10 flex justify-between">
              <Button variant="outline" onClick={handleGenerateMessage} disabled={isGenerating}>
                Regenerate
              </Button>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={copyToClipboard} disabled={!generatedMessage}>
                  <Copy className="w-4 h-4 mr-2" /> Copy
                </Button>
                <Button disabled={!generatedMessage}>
                  <MessageSquare className="w-4 h-4 mr-2" /> Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
