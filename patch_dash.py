import sys

with open('src/pages/Dashboard.tsx', 'r') as f:
    content = f.read()

# Add imports for date math
content = content.replace(
    "import { format, isToday, isPast, parseISO } from 'date-fns';",
    "import { format, isToday, isPast, parseISO, differenceInDays } from 'date-fns';\nimport { AlertTriangle } from 'lucide-react';"
)

# Logic for upcoming deadlines
logic_insertion = """  const todaysFollowUps = leads.filter(l => {
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
"""
content = content.replace(
    """  const todaysFollowUps = leads.filter(l => {
    if (l.stage === 'won' || l.stage === 'lost') return false;
    const followUpDate = parseISO(l.next_follow_up_at);
    return isToday(followUpDate) || isPast(followUpDate);
  }).sort((a, b) => new Date(a.next_follow_up_at).getTime() - new Date(b.next_follow_up_at).getTime());""",
    logic_insertion
)

# Insert the Banner just above the 4 metric cards
ui_insertion = """      {upcomingDeadlines.length > 0 && (
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">"""

content = content.replace(
    '      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">',
    ui_insertion
)

with open('src/pages/Dashboard.tsx', 'w') as f:
    f.write(content)
print("Dashboard updated with alerts")
