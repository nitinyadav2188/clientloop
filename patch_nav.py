import sys

with open('src/pages/LandingPage.tsx', 'r') as f:
    content = f.read()

# Replace in nav
content = content.replace(
    '<a href="#features" className="hover:text-primary transition-colors">Features</a>',
    '<a href="#how-it-works" className="hover:text-primary transition-colors">How it works</a>'
)

# Replace in footer
content = content.replace(
    '<li><a href="#" className="hover:text-white transition-colors">Features</a></li>',
    '<li><a href="#how-it-works" className="hover:text-white transition-colors">How it works</a></li>'
)

# Replace how it works section to have id
content = content.replace(
    '<section className="py-32 px-6 bg-white border-y border-border">',
    '<section id="how-it-works" className="py-32 px-6 bg-white border-y border-border">'
)

with open('src/pages/LandingPage.tsx', 'w') as f:
    f.write(content)

print("Replaced links and added id")
