import sys

with open('src/components/AddClientDialog.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "total_revenue: 0",
    "total_revenue: 0,\n    lead_id: 'direct'"
)

content = content.replace(
    "setFormData({ name: '', company: '', email: '', phone: '', total_revenue: 0 });",
    "setFormData({ name: '', company: '', email: '', phone: '', total_revenue: 0, lead_id: 'direct' });"
)

with open('src/components/AddClientDialog.tsx', 'w') as f:
    f.write(content)

print("Patched AddClientDialog")
