import sys

with open('src/components/layout/AuthLayout.tsx', 'r') as f:
    content = f.read()

# Add import
import_line = "import { GlobalSearch } from '@/components/GlobalSearch';\n"
if "GlobalSearch" not in content:
    content = content.replace(
        "import { useNotifications } from '@/hooks/useNotifications';",
        "import { useNotifications } from '@/hooks/useNotifications';\n" + import_line
    )

old_search_html = """<div className="relative w-full hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="SEARCH LEADS, CLIENTS OR PROJECTS..."
                className="w-full pl-12 pr-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-[11px] font-black tracking-widest uppercase focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>"""

if old_search_html in content:
    content = content.replace(old_search_html, "<GlobalSearch />")
    with open('src/components/layout/AuthLayout.tsx', 'w') as f:
        f.write(content)
    print("Successfully updated AuthLayout")
else:
    print("Could not find the search HTML snippet!")

