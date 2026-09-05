import sys

with open('src/components/layout/AuthLayout.tsx', 'r') as f:
    content = f.read()

# Add ambient orbs to the main content area
old_main = """<main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F9FAFB]">"""
new_main = """<main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F9FAFB] relative">
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-[#FF3366]/5 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-[#00E5FF]/5 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>"""

if old_main in content:
    content = content.replace(old_main, new_main)

# Update sidebar active link state
old_active_link = """? "bg-primary text-[#C8FF2C] shadow-md"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-primary\""""
new_active_link = """? "bg-gradient-to-r from-[#FF3366] to-[#9D4EDD] text-white shadow-lg shadow-[#FF3366]/20 border-none"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-primary\""""

if old_active_link in content:
    content = content.replace(old_active_link, new_active_link)

# Fix logo
old_logo = """<div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <div className="w-4 h-4 bg-[#C8FF2C] rounded-sm rotate-45"></div>
            </div>"""
new_logo = """<div className="w-10 h-10 bg-gradient-to-br from-[#FF3366] to-[#FF9933] rounded-xl flex items-center justify-center shadow-lg shadow-[#FF3366]/20">
              <div className="w-4 h-4 bg-white rounded-sm rotate-45 shadow-sm"></div>
            </div>"""

if old_logo in content:
    content = content.replace(old_logo, new_logo)

# Fix User profile block
old_user_profile = """<div className="w-12 h-12 rounded-xl bg-primary text-white border-2 border-transparent flex items-center justify-center font-black text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black truncate">{user.name}</p>
                <p className="text-[10px] text-[#C8FF2C] bg-primary px-2 py-0.5 rounded-full inline-block uppercase tracking-widest font-black truncate mt-1">{user.plan}</p>
              </div>"""
new_user_profile = """<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#3F46FF] text-white shadow-md flex items-center justify-center font-black text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black truncate">{user.name}</p>
                <p className="text-[10px] text-white bg-gradient-to-r from-[#9D4EDD] to-[#FF3366] px-2 py-0.5 rounded-md inline-block uppercase tracking-widest font-black truncate mt-1 shadow-sm">{user.plan}</p>
              </div>"""

if old_user_profile in content:
    content = content.replace(old_user_profile, new_user_profile)

# Fix Unread badge and notification
old_unread_badge = """<span className="bg-[#C8FF2C] text-primary text-[10px] font-black w-5 h-5 rounded-md flex items-center justify-center shadow-sm">"""
new_unread_badge = """<span className="bg-gradient-to-r from-[#00E5FF] to-[#3F46FF] text-white text-[10px] font-black w-5 h-5 rounded-md flex items-center justify-center shadow-sm">"""

if old_unread_badge in content:
    content = content.replace(old_unread_badge, new_unread_badge)
    
old_notification_dot = """<span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#C8FF2C] rounded-full ring-2 ring-white"></span>"""
new_notification_dot = """<span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#FF3366] rounded-full ring-2 ring-white animate-pulse"></span>"""

if old_notification_dot in content:
    content = content.replace(old_notification_dot, new_notification_dot)


with open('src/components/layout/AuthLayout.tsx', 'w') as f:
    f.write(content)
print("AuthLayout patched")
