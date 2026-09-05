import sys

with open('src/types.ts', 'r') as f:
    content = f.read()

# Add project_due_date to Lead
content = content.replace(
    '  updated_at: string;\n}',
    '  updated_at: string;\n  project_due_date?: string;\n}'
)

# Add project_due_date to Client
content = content.replace(
    '  total_revenue: number;\n  created_at: string;\n}',
    '  total_revenue: number;\n  created_at: string;\n  project_due_date?: string;\n}'
)

# Add project_due to NotificationType
content = content.replace(
    "'system'",
    "'system' | 'project_due'"
)

with open('src/types.ts', 'w') as f:
    f.write(content)
print("types patched")
