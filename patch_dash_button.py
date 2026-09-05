import sys

with open('src/pages/Dashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '<button onClick={() => navigate(`/app/leads/${lead.id}`)} className="p-2 hover:bg-accent-lime rounded-lg transition-colors border border-border shrink-0 text-primary">',
    '<Button variant="outline" size="icon" onClick={() => navigate(`/app/leads/${lead.id}`)} className="shrink-0 rounded-lg">'
)
content = content.replace(
    '</button>',
    '</Button>'
)

with open('src/pages/Dashboard.tsx', 'w') as f:
    f.write(content)
print("Dashboard button patched")
