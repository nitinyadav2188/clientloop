import React, { useState, useEffect } from 'react';
import { useLeads } from '@/hooks/useLeads';
import { Lead } from '@/types';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragEndEvent,
  useDroppable,
  useDraggable,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const STAGES = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'qualified', label: 'Qualified' },
  { id: 'proposal', label: 'Proposal' },
  { id: 'negotiation', label: 'Negotiation' },
  { id: 'won', label: 'Won' }
];

function DraggableCard({ lead, ...props }: { lead: Lead; [key: string]: any }) {
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
    data: { lead },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        // Only navigate if it's not a drag event
        if (!isDragging) {
          navigate(`/app/leads/${lead.id}`);
        }
      }}
      className="bg-white p-3 rounded-lg border shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors touch-none"
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
  );
}

function DroppableColumn({ stage, stageLeads, ...props }: { stage: any, stageLeads: Lead[]; [key: string]: any }) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
    data: { stageId: stage.id },
  });

  const totalValue = stageLeads.reduce((acc, l) => acc + l.estimated_value, 0);

  return (
    <div 
      ref={setNodeRef}
      className={`w-72 flex flex-col rounded-xl border p-3 transition-colors ${
        isOver ? 'bg-primary/5 border-primary/30' : 'bg-muted/30'
      }`}
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
          <DraggableCard key={lead.id} lead={lead} />
        ))}
        
        {stageLeads.length === 0 && (
          <div className="h-24 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center text-xs text-muted-foreground italic">
            Drop leads here
          </div>
        )}
      </div>
    </div>
  );
}

export default function Pipeline() {
  const { leads, updateLead } = useLeads();
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  // Optimistic UI state
  const [localLeads, setLocalLeads] = useState<Lead[]>(leads);

  useEffect(() => {
    setLocalLeads(leads);
  }, [leads]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const lead = localLeads.find(l => l.id === active.id);
    if (lead) setActiveLead(lead);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveLead(null);

    if (!over) return;

    const leadId = active.id as string;
    const newStage = over.id as string;

    const lead = localLeads.find(l => l.id === leadId);
    if (!lead || lead.stage === newStage) return;

    // Optimistic update
    setLocalLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage as any } : l));
    
    // Persist to DB
    await updateLead(leadId, { stage: newStage as any });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">Pipeline</h1>
          <p className="text-muted-foreground font-medium">Drag and drop leads to update their stage.</p>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 h-full min-w-max">
            {STAGES.map(stage => {
              const stageLeads = localLeads.filter(l => l.stage === stage.id);
              return <DroppableColumn key={stage.id} stage={stage} stageLeads={stageLeads} />;
            })}
          </div>

          <DragOverlay dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.4' } } }) }}>
            {activeLead ? (
              <div className="bg-white p-3 rounded-lg border shadow-lg cursor-grabbing opacity-90 scale-105 rotate-2">
                <h4 className="font-semibold text-sm mb-1 truncate">{activeLead.name}</h4>
                <p className="text-xs text-muted-foreground truncate mb-2">{activeLead.project}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium bg-accent-lime/20 text-primary px-1.5 py-0.5 rounded">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(activeLead.estimated_value)}
                  </span>
                  {activeLead.temperature === 'hot' && (
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  )}
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
