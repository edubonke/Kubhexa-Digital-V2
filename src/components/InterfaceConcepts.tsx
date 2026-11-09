import { useState, useRef } from 'react';
import {
  ArrowUpRight,
  Check,
  Calendar,
  Layers,
  LayoutDashboard,
  MessageSquare,
  CircleCheck,
  ArrowRight,
  Download,
  FolderOpen,
  Monitor,
  Smartphone,
  Moon,
  Sun,
  RotateCcw
} from 'lucide-react';

interface InterfaceConceptsProps {
  onOpenProjectModal: (preselectedPackage?: string) => void;
}

const initialTasks = [
  { title: 'Clarify the goal', description: 'Agree what success looks like.', done: true },
  { title: 'Explore the prototype', description: 'Review the important screens.', done: true },
  { title: 'Test the journey', description: 'Try the experience with your team.', done: false },
  { title: 'Prepare for launch', description: 'Check the details and hand over.', done: false }
];

export function InterfaceConcepts({ onOpenProjectModal }: InterfaceConceptsProps) {
  // Concept 1: Booking demo state
  const [bookingDay, setBookingDay] = useState('Tuesday');
  const [bookingTime, setBookingTime] = useState('10:00');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Concept 2: Portal demo state
  const [portalTab, setPortalTab] = useState<'Overview' | 'Files' | 'Updates'>('Overview');

  // Experience Lab state
  const [labMobile, setLabMobile] = useState(false);
  const [labDark, setLabDark] = useState(true);
  const [labTab, setLabTab] = useState<'Tasks' | 'Activity'>('Tasks');
  const [tasks, setTasks] = useState(initialTasks);
  const [activity, setActivity] = useState<Array<{ id: number; text: string }>>([
    { id: 1, text: 'Clarify the goal: completed' },
    { id: 2, text: 'Explore the prototype: completed' }
  ]);
  const activitySeq = useRef(3);

  const completedCount = tasks.filter(t => t.done).length;

  const toggleTask = (index: number) => {
    const nextDone = !tasks[index].done;
    const nextTasks = tasks.map((t, i) => (i === index ? { ...t, done: nextDone } : t));
    setTasks(nextTasks);
    const newId = ++activitySeq.current;
    setActivity(prev => [
      { id: newId, text: `${tasks[index].title}: ${nextDone ? 'completed' : 'reopened'}` },
      ...prev
    ].slice(0, 6));
  };

  const downloadText = (filename: string, text: string) => {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <section id="concepts" className="relative w-full bg-[#050625] py-28 md:py-36 border-t border-[#DAE0E5]/15" aria-label="Interface concepts">
      <div className="w-full max-w-[1536px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Heading */}
        <div className="max-w-[840px] mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#297EE9] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#297EE9]" />
            <span>02 / Interface Concepts & Working Prototypes</span>
          </div>
          <h2 className="section-display-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F9F6FF] mb-6">
            Explore our interface <span className="text-[#297EE9]">concepts.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#DAE0E5]/80 font-normal leading-relaxed max-w-[50ch]">
            Two focused design studies with working booking and customer workspace demonstrations, plus an interactive experience lab.
          </p>
        </div>

        {/* Two-up Concepts with Interactive Live Demos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24 md:mb-32">
          {/* Concept 01: Booking experience */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="border border-[#DAE0E5]/15 bg-[#050625] p-6 sm:p-8 rounded-lg mb-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#DAE0E5]/15 pb-4 mb-6">
                <span className="text-xs font-mono text-[#297EE9] uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Interactive Concept · 01</span>
                </span>
                <span className="text-[11px] font-mono text-[#DAE0E5]/50">Live Demo</span>
              </div>

              {bookingConfirmed ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border border-[#297EE9] bg-[#297EE9]/15 flex items-center justify-center mx-auto text-[#297EE9]">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[#F9F6FF]">Your selection is ready.</h4>
                  <p className="text-sm font-mono text-[#297EE9]">{bookingDay} at {bookingTime}</p>
                  <p className="text-xs text-[#DAE0E5]/70 max-w-[34ch] mx-auto">
                    This is an interactive demonstration. No real appointment has been reserved.
                  </p>
                  <button
                    type="button"
                    onClick={() => setBookingConfirmed(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#297EE9] hover:text-[#F9F6FF] transition-colors pt-2 cursor-pointer"
                  >
                    <span>Try another time</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-bold text-[#F9F6FF] mb-1">Book an appointment</h4>
                    <p className="text-xs text-[#DAE0E5]/70">Choose a day and a time that works for you.</p>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#DAE0E5]/60 uppercase tracking-wider block mb-2">
                      Select a day
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Monday', 'Tuesday', 'Wednesday'].map(d => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setBookingDay(d)}
                          className={`py-2 px-3 text-xs font-mono border transition-all text-center cursor-pointer ${
                            bookingDay === d
                              ? 'border-[#297EE9] bg-[#297EE9]/15 text-[#F9F6FF] font-bold'
                              : 'border-[#DAE0E5]/15 text-[#DAE0E5]/80 hover:border-[#DAE0E5]/40'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#DAE0E5]/60 uppercase tracking-wider block mb-2">
                      Select a time
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {['09:00', '10:00', '11:30', '14:00'].map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setBookingTime(t)}
                          className={`py-2 px-2 text-xs font-mono border transition-all text-center cursor-pointer ${
                            bookingTime === t
                              ? 'border-[#297EE9] bg-[#297EE9]/15 text-[#F9F6FF] font-bold'
                              : 'border-[#DAE0E5]/15 text-[#DAE0E5]/80 hover:border-[#DAE0E5]/40'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setBookingConfirmed(true)}
                    className="w-full py-3 bg-[#297EE9] text-[#F9F6FF] text-xs font-semibold tracking-wider uppercase transition-all hover:bg-[#1E6CD4] flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(41,126,233,0.3)]"
                  >
                    <span>Confirm demo selection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[11px] font-mono text-[#DAE0E5]/50 text-center">
                    An example booking flow, with no real appointments.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-[#297EE9] uppercase tracking-widest">
                Booking experience · Appointment scheduling
              </div>
              <h3 className="text-2xl font-bold text-[#F9F6FF]">A simpler way to book.</h3>
              <p className="text-sm text-[#DAE0E5]/80 leading-relaxed max-w-[48ch]">
                A considered booking flow for salons, clinics, and appointment-based businesses. Designed to reduce friction and eliminate missed appointments.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenProjectModal('bookings')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#297EE9] hover:text-[#F9F6FF] transition-colors cursor-pointer"
                >
                  <span>Build with Bookings package (R11,990)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Concept 02: Customer workspace */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="border border-[#DAE0E5]/15 bg-[#050625] p-6 sm:p-8 rounded-lg mb-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#DAE0E5]/15 pb-4 mb-6">
                <span className="text-xs font-mono text-[#297EE9] uppercase tracking-widest flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Interactive Concept · 02</span>
                </span>
                <span className="text-[11px] font-mono text-[#DAE0E5]/50">Workspace Demo</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-[#F9F6FF]">Your workspace</h4>
                    <p className="text-xs text-[#DAE0E5]/70">A clearer view of your project.</p>
                  </div>
                  {/* Tabs */}
                  <div className="flex border border-[#DAE0E5]/15 divide-x divide-[#DAE0E5]/15">
                    {(['Overview', 'Files', 'Updates'] as const).map(tab => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setPortalTab(tab)}
                        className={`px-3 py-1.5 text-xs font-mono transition-all cursor-pointer ${
                          portalTab === tab
                            ? 'bg-[#297EE9] text-[#F9F6FF] font-bold'
                            : 'text-[#DAE0E5]/70 hover:text-[#F9F6FF]'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="min-h-[190px] border border-[#DAE0E5]/15 bg-[#03041a] p-4 font-mono text-xs space-y-3">
                  {portalTab === 'Overview' && (
                    <div className="space-y-3">
                      <div className="border-b border-[#DAE0E5]/10 pb-2">
                        <span className="text-[10px] text-[#297EE9] uppercase">Project status</span>
                        <div className="text-sm font-bold text-[#F9F6FF]">Taking shape.</div>
                        <p className="text-xs text-[#DAE0E5]/70 font-sans">The prototype is ready for review.</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#DAE0E5]">
                        <Check className="w-3.5 h-3.5 text-[#297EE9]" />
                        <span>Discovery complete</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#DAE0E5]">
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#297EE9]" />
                        <span>Design ready for feedback</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#DAE0E5]">
                        <Calendar className="w-3.5 h-3.5 text-[#297EE9]" />
                        <span>Next step: prototype review</span>
                      </div>
                    </div>
                  )}

                  {portalTab === 'Files' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2.5 border border-[#DAE0E5]/15 bg-[#050625]">
                        <div className="flex items-center gap-2.5">
                          <FolderOpen className="w-4 h-4 text-[#297EE9]" />
                          <div>
                            <div className="text-xs font-bold text-[#F9F6FF]">Project outline</div>
                            <span className="text-[10px] text-[#DAE0E5]/60">Example document · TXT</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            downloadText(
                              'kubhexa-example-project-outline.txt',
                              'KUBHEXA DIGITAL\nExample customer portal project outline\n\nThis is a demonstration document.\nGoal: give customers a clear place to find project updates and documents.\nFirst release: overview, files and activity.\nNext step: test the prototype with intended users.'
                            )
                          }
                          className="p-1.5 border border-[#DAE0E5]/20 hover:border-[#297EE9] text-[#297EE9] transition-colors cursor-pointer"
                          title="Download example project outline"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#DAE0E5]/60 font-sans">
                        Download the sample outline to try the document experience.
                      </p>
                    </div>
                  )}

                  {portalTab === 'Updates' && (
                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2 border-b border-[#DAE0E5]/10 pb-2">
                        <FolderOpen className="w-3.5 h-3.5 text-[#297EE9] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#F9F6FF] block">Project outline added</strong>
                          <span className="text-[10px] text-[#DAE0E5]/50">Example activity</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 border-b border-[#DAE0E5]/10 pb-2">
                        <Check className="w-3.5 h-3.5 text-[#297EE9] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#F9F6FF] block">Discovery complete</strong>
                          <span className="text-[10px] text-[#DAE0E5]/50">Example milestone</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-[#297EE9] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#F9F6FF] block">Prototype ready for review</strong>
                          <span className="text-[10px] text-[#DAE0E5]/50">Example team update</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-[11px] font-mono text-[#DAE0E5]/50 mt-3 text-center">
                  Sample project information for this demonstration.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-[#297EE9] uppercase tracking-widest">
                Customer workspace · Client portal & updates
              </div>
              <h3 className="text-2xl font-bold text-[#F9F6FF]">Everything in one place.</h3>
              <p className="text-sm text-[#DAE0E5]/80 leading-relaxed max-w-[48ch]">
                A dedicated space for project updates, documents, and next steps. This concept explores how a business keeps customers informed without messy email chains.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenProjectModal('business')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#297EE9] hover:text-[#F9F6FF] transition-colors cursor-pointer"
                >
                  <span>Build with Business package (R5,990)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Lab */}
        <div className="border border-[#DAE0E5]/15 bg-[#050625] p-6 sm:p-10 md:p-12 rounded-xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#DAE0E5]/15 pb-8 mb-8">
            <div>
              <span className="text-xs font-mono text-[#297EE9] uppercase tracking-widest block mb-2">
                Experience Lab
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F9F6FF] tracking-tight">
                See the details in action.
              </h3>
              <p className="text-sm sm:text-base text-[#DAE0E5]/80 leading-relaxed max-w-[50ch] mt-2">
                Switch the layout, change the theme, and try the interface. A working concept you can explore.
              </p>
            </div>

            {/* Toolbar Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex border border-[#DAE0E5]/20 divide-x divide-[#DAE0E5]/20 rounded overflow-hidden">
                <button
                  type="button"
                  onClick={() => setLabMobile(false)}
                  className={`px-3 py-2 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                    !labMobile ? 'bg-[#297EE9] text-[#F9F6FF] font-bold' : 'text-[#DAE0E5]/70 hover:text-[#F9F6FF]'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLabMobile(true)}
                  className={`px-3 py-2 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                    labMobile ? 'bg-[#297EE9] text-[#F9F6FF] font-bold' : 'text-[#DAE0E5]/70 hover:text-[#F9F6FF]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setLabDark(!labDark)}
                className="px-3 py-2 text-xs font-mono border border-[#DAE0E5]/20 hover:border-[#297EE9] text-[#DAE0E5] flex items-center gap-1.5 transition-all cursor-pointer rounded"
              >
                {labDark ? <Sun className="w-3.5 h-3.5 text-[#297EE9]" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{labDark ? 'Light preview' : 'Dark preview'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Workspace Stage */}
          <div
            className={`transition-all duration-300 mx-auto ${
              labMobile ? 'max-w-[420px]' : 'w-full'
            }`}
          >
            <div
              className={`border border-[#DAE0E5]/20 rounded-lg overflow-hidden transition-colors ${
                labDark ? 'bg-[#03041a] text-[#F9F6FF]' : 'bg-[#f4f7fb] text-[#050625]'
              }`}
            >
              {/* Browser Bar */}
              <div
                className={`px-4 py-2.5 border-b flex items-center justify-between text-xs font-mono ${
                  labDark ? 'border-[#DAE0E5]/15 bg-[#050625] text-[#DAE0E5]/70' : 'border-[#DAE0E5]/30 bg-white text-[#050625]/80'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#297EE9]" />
                  <span>{labMobile ? 'Mobile experience' : 'Digital workspace'}</span>
                </div>
                <span className="text-[10px] text-[#297EE9] uppercase tracking-wider font-bold">Interactive concept</span>
              </div>

              {/* Workspace Content */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="text-[11px] font-mono text-[#297EE9] uppercase tracking-wider block">Your next release</span>
                    <h4 className="text-xl font-bold tracking-tight">Good ideas. Taking shape.</h4>
                  </div>

                  {/* Checklist progress tracker */}
                  <div className="text-right">
                    <span className="text-xs font-mono opacity-70 block mb-1">Project checklist</span>
                    <strong className="text-sm font-mono text-[#297EE9]">{completedCount} of {tasks.length} complete</strong>
                  </div>
                </div>

                {/* Progress bar */}
                <div className={`w-full h-1.5 rounded-full overflow-hidden mb-6 ${labDark ? 'bg-[#DAE0E5]/10' : 'bg-[#DAE0E5]/30'}`}>
                  <div
                    className="h-full bg-[#297EE9] transition-all duration-500 ease-out"
                    style={{ width: `${(completedCount / tasks.length) * 100}%` }}
                  />
                </div>

                {/* Tabs: Tasks / Activity */}
                <div className="flex items-center gap-4 border-b border-[#DAE0E5]/15 pb-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setLabTab('Tasks')}
                    className={`text-xs font-mono flex items-center gap-1.5 pb-1 cursor-pointer transition-all ${
                      labTab === 'Tasks' ? 'text-[#297EE9] border-b-2 border-[#297EE9] font-bold' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <CircleCheck className="w-3.5 h-3.5" />
                    <span>Tasks</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLabTab('Activity')}
                    className={`text-xs font-mono flex items-center gap-1.5 pb-1 cursor-pointer transition-all ${
                      labTab === 'Activity' ? 'text-[#297EE9] border-b-2 border-[#297EE9] font-bold' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Activity</span>
                  </button>
                </div>

                {/* Tab content */}
                {labTab === 'Tasks' ? (
                  <ul className="space-y-3 font-mono text-xs">
                    {tasks.map((task, idx) => (
                      <li key={task.title}>
                        <button
                          type="button"
                          onClick={() => toggleTask(idx)}
                          className={`w-full p-3.5 text-left flex items-start justify-between gap-4 border rounded transition-all cursor-pointer ${
                            task.done
                              ? labDark
                                ? 'border-[#297EE9]/30 bg-[#297EE9]/5'
                                : 'border-[#297EE9]/40 bg-[#297EE9]/10'
                              : labDark
                              ? 'border-[#DAE0E5]/15 bg-[#050625] hover:border-[#DAE0E5]/30'
                              : 'border-[#DAE0E5]/30 bg-white hover:border-[#DAE0E5]/60'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center shrink-0 ${
                                task.done ? 'border-[#297EE9] bg-[#297EE9] text-white' : 'border-[#DAE0E5]/40'
                              }`}
                            >
                              {task.done && <Check className="w-3 h-3 stroke-[3]" />}
                            </span>
                            <div>
                              <strong className={`block ${task.done ? 'line-through opacity-70' : ''}`}>
                                {task.title}
                              </strong>
                              <span className="text-[11px] opacity-60 font-sans block mt-0.5">
                                {task.description}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#297EE9] shrink-0 opacity-60 mt-1" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-2.5 font-mono text-xs">
                    {activity.map(item => (
                      <div
                        key={item.id}
                        className={`p-3 border flex items-center gap-2.5 rounded ${
                          labDark ? 'border-[#DAE0E5]/15 bg-[#050625]' : 'border-[#DAE0E5]/30 bg-white'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 text-[#297EE9]" />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-[11px] font-mono opacity-50 mt-6 text-center">
                  Sample workflow. Changes stay in this demonstration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
