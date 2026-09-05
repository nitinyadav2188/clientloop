import sys

with open('src/pages/LeadDetail.tsx', 'r') as f:
    content = f.read()

# Add due date UI to Timeline
old_timeline = """<div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Lead Created</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{format(parseISO(lead.created_at), 'MMM d, yyyy')}</p>
                </div>
              </div>"""
new_timeline = """<div className="flex items-start gap-3">
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
              )}"""

if old_timeline in content:
    content = content.replace(old_timeline, new_timeline)

with open('src/pages/LeadDetail.tsx', 'w') as f:
    f.write(content)
print("Lead Detail patched")
