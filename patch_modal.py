import sys

with open('src/components/QuickAddLeadModal.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "estimated_value: 0,",
    "estimated_value: 0,\n    project_due_date: '',"
)

content = content.replace(
    "next_follow_up_at: tomorrow.toISOString(),",
    "next_follow_up_at: tomorrow.toISOString(),\n        project_due_date: formData.project_due_date || undefined,"
)

# Add field to UI
old_ui = """                <div className="space-y-2">
                  <Label>Value (₹)</Label>
                  <Input 
                    type="number"
                    value={formData.estimated_value || ''} 
                    onChange={e => setFormData({...formData, estimated_value: Number(e.target.value)})} 
                    placeholder="50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Source</Label>"""
new_ui = """                <div className="space-y-2">
                  <Label>Value (₹)</Label>
                  <Input 
                    type="number"
                    value={formData.estimated_value || ''} 
                    onChange={e => setFormData({...formData, estimated_value: Number(e.target.value)})} 
                    placeholder="50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Due Date (Optional)</Label>
                  <Input 
                    type="date"
                    value={formData.project_due_date || ''} 
                    onChange={e => setFormData({...formData, project_due_date: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Source</Label>"""

content = content.replace(old_ui, new_ui)

with open('src/components/QuickAddLeadModal.tsx', 'w') as f:
    f.write(content)
print("modal patched")
