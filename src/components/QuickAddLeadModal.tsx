import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select } from './ui/select';
import { extractLeadFromMessage } from '@/lib/ai';
import { store } from '@/lib/store';
import { useToast } from './ui/use-toast';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { Lead } from '@/types';

interface QuickAddLeadModalProps {
  onClose: () => void;
  onSaved: () => void;
}

export default function QuickAddLeadModal({ onClose, onSaved }: QuickAddLeadModalProps) {
  const { toast } = useToast();
  const [mode, setMode] = useState<'manual' | 'ai'>('manual');
  const [message, setMessage] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Lead>>({
    name: '',
    email: '',
    project: '',
    estimated_value: 0,
    source: 'email',
    temperature: 'warm',
    stage: 'new',
  });

  const handleExtract = async () => {
    if (!message.trim()) return;
    setIsExtracting(true);
    try {
      const extracted = await extractLeadFromMessage(message);
      setFormData(prev => ({ ...prev, ...extracted }));
      setMode('manual');
      toast({ title: 'AI Extraction Complete', description: 'Review the extracted details before saving.', type: 'success' });
    } catch (error) {
      toast({ title: 'Extraction Failed', description: 'Could not extract details. Please enter manually.', type: 'error' });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.project) {
      toast({ title: 'Required Fields', description: 'Name and Project are required.', type: 'error' });
      return;
    }
    
    setIsSaving(true);
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      store.saveLead({
        name: formData.name,
        company: formData.company || '',
        email: formData.email || '',
        phone: formData.phone || '',
        project: formData.project,
        description: formData.description || '',
        source: formData.source as any || 'other',
        estimated_value: Number(formData.estimated_value) || 0,
        stage: formData.stage as any || 'new',
        temperature: formData.temperature as any || 'warm',
        status: 'active',
        last_contact_at: new Date().toISOString(),
        next_follow_up_at: tomorrow.toISOString(),
      });
      
      toast({ title: 'Lead saved', type: 'success' });
      onSaved();
    } catch (error) {
      toast({ title: 'Failed to save', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Add New Lead</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="p-4 border-b bg-muted/30 flex gap-2">
          <Button 
            variant={mode === 'manual' ? 'default' : 'outline'} 
            size="sm" 
            className="flex-1"
            onClick={() => setMode('manual')}
          >
            Manual Entry
          </Button>
          <Button 
            variant={mode === 'ai' ? 'default' : 'outline'} 
            size="sm" 
            className="flex-1"
            onClick={() => setMode('ai')}
          >
            <Sparkles className="w-4 h-4 mr-2 text-accent-lime mix-blend-difference" />
            Paste Message
          </Button>
        </div>

        <div className="overflow-y-auto p-4 flex-1">
          {mode === 'ai' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Client Message</Label>
                <Textarea 
                  placeholder='e.g. "Hi, I found your work on LinkedIn. I need a website for my startup. Budget is around ₹60k."'
                  className="min-h-[150px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button 
                className="w-full bg-[#3F46FF] hover:bg-[#3F46FF]/90 text-white" 
                onClick={handleExtract}
                disabled={isExtracting || !message.trim()}
              >
                {isExtracting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Extracting...</>
                ) : (
                  <><Sparkles className="w-4 h-4 mr-2" /> Extract with AI</>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    placeholder="Rahul Sharma"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    placeholder="rahul@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Project / Inquiry *</Label>
                <Input 
                  value={formData.project} 
                  onChange={e => setFormData({...formData, project: e.target.value})} 
                  placeholder="Website Redesign"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Value (₹)</Label>
                  <Input 
                    type="number"
                    value={formData.estimated_value || ''} 
                    onChange={e => setFormData({...formData, estimated_value: Number(e.target.value)})} 
                    placeholder="50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Source</Label>
                  <Select 
                    value={formData.source} 
                    onChange={e => setFormData({...formData, source: e.target.value as any})}
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="email">Email</option>
                    <option value="instagram">Instagram</option>
                    <option value="referral">Referral</option>
                    <option value="other">Other</option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Temperature</Label>
                  <Select 
                    value={formData.temperature} 
                    onChange={e => setFormData({...formData, temperature: e.target.value as any})}
                  >
                    <option value="hot">Hot (Ready to buy)</option>
                    <option value="warm">Warm (Interested)</option>
                    <option value="cold">Cold (Just asking)</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Stage</Label>
                  <Select 
                    value={formData.stage} 
                    onChange={e => setFormData({...formData, stage: e.target.value as any})}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes / Context</Label>
                <Textarea 
                  value={formData.description || ''} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  placeholder="Any additional details..."
                />
              </div>
            </div>
          )}
        </div>
        
        {mode === 'manual' && (
          <div className="p-4 border-t bg-muted/10 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Save Lead
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
