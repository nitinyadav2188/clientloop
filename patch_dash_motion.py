import sys

with open('src/pages/Dashboard.tsx', 'r') as f:
    content = f.read()

# Add motion import
content = content.replace(
    "import QuickAddLeadModal from '@/components/QuickAddLeadModal';",
    "import QuickAddLeadModal from '@/components/QuickAddLeadModal';\nimport { motion } from 'motion/react';"
)

# 1. Update the 4 metric cards
content = content.replace(
    '<div className="bg-card border border-border p-5 rounded-2xl">',
    '<motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-card border border-border p-5 rounded-2xl">'
)
content = content.replace(
    '<div className="bg-accent-lime/10 border border-accent-lime p-5 rounded-2xl">',
    '<motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-accent-lime/10 border border-accent-lime p-5 rounded-2xl">'
)

# 2. Update the "Today's Follow-ups" cards
content = content.replace(
    '<div key={lead.id} className={cn("bg-card border border-border p-4 rounded-xl flex items-center gap-4", index === 0 ? "border-l-4 border-l-accent-lime" : "")}>',
    '<motion.div whileHover={{ x: 4, transition: { duration: 0.2 } }} key={lead.id} className={cn("bg-card border border-border p-4 rounded-xl flex items-center gap-4", index === 0 ? "border-l-4 border-l-accent-lime" : "")}>'
)

# 3. Update the "Recent Activity" items
content = content.replace(
    '<div key={lead.id} className="space-y-2 pb-4 border-b border-border last:border-0 last:pb-0">',
    '<motion.div whileHover={{ x: 2, transition: { duration: 0.2 } }} key={lead.id} className="space-y-2 pb-4 border-b border-border last:border-0 last:pb-0">'
)

# 4. Close the tags correctly
# In the dashboard, the 4 metric cards have a lot of </div>. It's safer to just change the opening tags and let React throw an error if the closing tags mismatch? Wait, JSX REQUIRES matching tags.
# I need to be careful.

# Let's write a regex or safer replace.
