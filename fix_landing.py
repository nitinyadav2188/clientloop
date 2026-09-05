import sys

with open('src/pages/LandingPage.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '<a href="#founder" className="hover:text-primary transition-colors">About</div>',
    '<a href="#founder" className="hover:text-primary transition-colors">About</a>'
)

with open('src/pages/LandingPage.tsx', 'w') as f:
    f.write(content)
