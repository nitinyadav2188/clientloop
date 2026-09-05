import sys

with open('src/pages/Pipeline.tsx', 'r') as f:
    content = f.read()

# Replace column headers in pipeline
old_stage_new = """const stages: { id: LeadStage; name: string; color: string }[] = [
    { id: 'new', name: 'New Lead', color: 'bg-gray-100' },
    { id: 'contacted', name: 'Contacted', color: 'bg-blue-100' },
    { id: 'qualified', name: 'Qualified', color: 'bg-indigo-100' },
    { id: 'proposal', name: 'Proposal', color: 'bg-purple-100' },
    { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-100' },
  ];"""
new_stage_new = """const stages: { id: LeadStage; name: string; color: string }[] = [
    { id: 'new', name: 'New Lead', color: 'border-t-[#00E5FF] bg-gradient-to-b from-[#00E5FF]/10 to-transparent' },
    { id: 'contacted', name: 'Contacted', color: 'border-t-[#3F46FF] bg-gradient-to-b from-[#3F46FF]/10 to-transparent' },
    { id: 'qualified', name: 'Qualified', color: 'border-t-[#9D4EDD] bg-gradient-to-b from-[#9D4EDD]/10 to-transparent' },
    { id: 'proposal', name: 'Proposal', color: 'border-t-[#FF3366] bg-gradient-to-b from-[#FF3366]/10 to-transparent' },
    { id: 'negotiation', name: 'Negotiation', color: 'border-t-[#FF9933] bg-gradient-to-b from-[#FF9933]/10 to-transparent' },
  ];"""
if old_stage_new in content:
    content = content.replace(old_stage_new, new_stage_new)

old_col_div = """<div key={stage.id} className="flex-shrink-0 w-80 flex flex-col bg-muted/30 rounded-2xl border border-border">
              <div className={`p-4 border-b border-border rounded-t-2xl flex items-center justify-between ${stage.color}`}>
                <h3 className="font-black text-sm uppercase tracking-widest">{stage.name}</h3>
                <span className="bg-white/50 px-2 py-0.5 rounded-full text-xs font-bold">
                  {stageLeads.length}
                </span>
              </div>"""
new_col_div = """<div key={stage.id} className="flex-shrink-0 w-80 flex flex-col bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className={`p-4 border-t-4 flex items-center justify-between ${stage.color}`}>
                <h3 className="font-black text-xs uppercase tracking-widest">{stage.name}</h3>
                <span className="bg-white px-2 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm border border-border">
                  {stageLeads.length}
                </span>
              </div>"""
if old_col_div in content:
    content = content.replace(old_col_div, new_col_div)
    
old_card_style = """<div 
                      key={lead.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id, lead.stage)}
                      onClick={() => navigate(`/app/leads/${lead.id}`)}
                      className="bg-card p-4 rounded-xl border border-border shadow-sm cursor-grab active:cursor-grabbing hover:border-primary transition-colors group"
                    >"""
new_card_style = """<div 
                      key={lead.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id, lead.stage)}
                      onClick={() => navigate(`/app/leads/${lead.id}`)}
                      className="bg-card p-4 rounded-xl border border-border shadow-sm cursor-grab active:cursor-grabbing hover:border-[#9D4EDD] hover:shadow-md transition-all group"
                    >"""
if old_card_style in content:
    content = content.replace(old_card_style, new_card_style)

with open('src/pages/Pipeline.tsx', 'w') as f:
    f.write(content)
print("Pipeline patched")
