import sys

with open('src/pages/Dashboard.tsx', 'r') as f:
    content = f.read()

# 1. Add state and effect
state_code = """  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [quickNotes, setQuickNotes] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('clientloop_quick_notes');
    if (savedNotes) {
      setQuickNotes(savedNotes);
    }
  }, []);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuickNotes(e.target.value);
    localStorage.setItem('clientloop_quick_notes', e.target.value);
  };"""

content = content.replace("""  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);""", state_code)

# 2. Add Quick Notes UI in the sidebar
ui_code = """        <div className="w-full lg:w-80 flex flex-col gap-6 overflow-hidden shrink-0 pb-6">
          <div className="flex flex-col gap-3 shrink-0">
            <h3 className="text-lg font-black tracking-tight uppercase">Quick Notes</h3>
            <div className="bg-[#C8FF2C]/10 border border-[#C8FF2C]/30 rounded-2xl p-1 shadow-sm relative group focus-within:border-[#C8FF2C] transition-colors">
              <textarea
                value={quickNotes}
                onChange={handleNotesChange}
                placeholder="Jot down quick thoughts, reminders, or numbers..."
                className="w-full h-32 bg-transparent resize-none outline-none text-sm p-3 placeholder:text-muted-foreground/60 text-foreground"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1 overflow-hidden">
            <h3 className="text-lg font-black tracking-tight uppercase">Recent Activity</h3>
            <div className="flex-1 bg-card border border-border rounded-2xl p-5 overflow-y-auto space-y-4">"""

content = content.replace("""        <div className="w-full lg:w-80 flex flex-col gap-4 overflow-hidden shrink-0 pb-6">
          <h3 className="text-lg font-black tracking-tight uppercase">Recent Activity</h3>
          <div className="flex-1 bg-card border border-border rounded-2xl p-5 overflow-y-auto space-y-4">""", ui_code)

with open('src/pages/Dashboard.tsx', 'w') as f:
    f.write(content)
print("Dashboard updated with Quick Notes")
