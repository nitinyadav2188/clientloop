with open('src/pages/LandingPage.tsx', 'r') as f:
    content = f.read()

with open('features.txt', 'r') as f:
    features = f.read()

if features in content:
    content = content.replace(features, '')
    with open('src/pages/LandingPage.tsx', 'w') as f:
        f.write(content)
    print("Features section removed successfully")
else:
    print("Features section not found in content!")
