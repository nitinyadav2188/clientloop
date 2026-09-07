import sys

with open('src/pages/Dashboard.tsx', 'r') as f:
    content = f.read()

# Make sure motion is imported
if "import { motion } from 'motion/react';" not in content:
    if "import { Skeleton } from '@/components/ui/skeleton';" in content:
        content = content.replace(
            "import { Skeleton } from '@/components/ui/skeleton';",
            "import { Skeleton } from '@/components/ui/skeleton';\nimport { motion } from 'motion/react';"
        )
    else:
        print("Could not find where to import motion")
        sys.exit(1)

# Metric cards
content = content.replace(
    '<div className="bg-card border border-border p-5 rounded-2xl">',
    '<motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-card border border-border p-5 rounded-2xl">'
)
content = content.replace(
    '<div className="bg-accent-lime/10 border border-accent-lime p-5 rounded-2xl">',
    '<motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-accent-lime/10 border border-accent-lime p-5 rounded-2xl">'
)
# need to fix closing tags
content = content.replace(
    '''          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Total Leads</p>
          <p className="text-3xl font-black">{totalLeads}</p>
        </div>''',
    '''          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Total Leads</p>
          <p className="text-3xl font-black">{totalLeads}</p>
        </motion.div>'''
)
content = content.replace(
    '''          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Pipeline Value</p>
          <p className="text-3xl font-black">{formatCurrency(pipelineValue)}</p>
        </div>''',
    '''          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Pipeline Value</p>
          <p className="text-3xl font-black">{formatCurrency(pipelineValue)}</p>
        </motion.div>'''
)
content = content.replace(
    '''          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Won Revenue</p>
          <p className="text-3xl font-black">{formatCurrency(wonRevenue)}</p>
        </div>''',
    '''          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Won Revenue</p>
          <p className="text-3xl font-black">{formatCurrency(wonRevenue)}</p>
        </motion.div>'''
)
content = content.replace(
    '''          <p className="text-[10px] text-primary uppercase tracking-widest font-black mb-1">Action Required</p>
          <p className="text-3xl font-black text-accent">{todaysFollowUps.length}</p>
        </div>''',
    '''          <p className="text-[10px] text-primary uppercase tracking-widest font-black mb-1">Action Required</p>
          <p className="text-3xl font-black text-accent">{todaysFollowUps.length}</p>
        </motion.div>'''
)

# Today's Follow-ups
content = content.replace(
    '<div key={lead.id} className={cn("bg-card border border-border p-4 rounded-xl flex items-center gap-4", index === 0 ? "border-l-4 border-l-accent-lime" : "")}>',
    '<motion.div key={lead.id} whileHover={{ x: 4, transition: { duration: 0.2 } }} className={cn("bg-card border border-border p-4 rounded-xl flex items-center gap-4 cursor-pointer", index === 0 ? "border-l-4 border-l-accent-lime" : "")} onClick={() => navigate(`/app/leads/${lead.id}`)}>'
)
# Close tag for Today's Follow-ups
content = content.replace(
    '''                  <Button variant="outline" size="icon" onClick={() => navigate(`/app/leads/${lead.id}`)} className="shrink-0 rounded-lg">
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>''',
    '''                  <Button variant="outline" size="icon" onClick={(e) => { e.stopPropagation(); navigate(`/app/leads/${lead.id}`); }} className="shrink-0 rounded-lg">
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>'''
)

# Recent Activity
content = content.replace(
    '<div key={lead.id} className="space-y-2 pb-4 border-b border-border last:border-0 last:pb-0">',
    '<motion.div key={lead.id} whileHover={{ x: 2, transition: { duration: 0.2 } }} className="space-y-2 pb-4 border-b border-border last:border-0 last:pb-0">'
)
content = content.replace(
    '''                  <p className="text-[10px] text-muted-foreground truncate">Added as new lead</p>
                </div>
              </div>''',
    '''                  <p className="text-[10px] text-muted-foreground truncate">Added as new lead</p>
                </div>
              </motion.div>'''
)

with open('src/pages/Dashboard.tsx', 'w') as f:
    f.write(content)
print("Updated dashboard with motion")
