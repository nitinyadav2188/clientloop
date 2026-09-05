import sys

with open('src/pages/LandingPage.tsx', 'r') as f:
    content = f.read()

with open('old_mockup.txt', 'r') as f:
    old_content = f.read()

with open('patch_mockup.txt', 'r') as f:
    new_content = f.read()

if old_content in content:
    with open('src/pages/LandingPage.tsx', 'w') as f:
        f.write(content.replace(old_content, new_content))
    print("Success")
else:
    print("Failed to find old content")
