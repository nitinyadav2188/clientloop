import sys

with open('src/components/ui/button.tsx', 'r') as f:
    content = f.read()

# Remove hover:brightness-110 from base
content = content.replace(' hover:brightness-110', '')

# Add explicit lightened backgrounds to variants
content = content.replace(
    'default: "bg-primary text-white shadow-sm",',
    'default: "bg-primary text-white shadow-sm hover:bg-primary/90",'
)
content = content.replace(
    'destructive: "bg-destructive text-destructive-foreground shadow-sm",',
    'destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",'
)
content = content.replace(
    'secondary: "bg-secondary text-secondary-foreground shadow-sm",',
    'secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",'
)

with open('src/components/ui/button.tsx', 'w') as f:
    f.write(content)

print("Button hovers patched")
