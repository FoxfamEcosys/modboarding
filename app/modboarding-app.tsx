"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import PracticeLab from "./practice-lab";
import { checklistSeed, essentials, launchTemplates, onboardingSeed, resourceLinks, rules } from "../lib/workspace-data";
import { Icon } from "./icons";
import { CopyButton, EmoteReference, StreamCopyLibrary, StreamSetupReference } from "./stream-reference";

type View = "practice" | "home" | "checklist" | "launch" | "modboarding" | "rules" | "commands" | "links" | "documents" | "team";
type Command = { id: string; name: string; type: string; group: string; enabled: boolean; triggers: string[]; actions: string[]; response: string };
type Reminder = { id: number; body: string; createdBy: string; createdAt: string };
type Duty = { userEmail: string; displayName: string; status: string; updatedAt: string };

const nav: { id: View; label: string; icon: "home" | "checklist" | "wand" | "users" | "book" | "terminal" | "link" | "folder" | "team" }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "checklist", label: "Stream Checklist", icon: "checklist" },
  { id: "launch", label: "Launch Lab", icon: "wand" },
  { id: "practice", label: "Practice Lab", icon: "users" },
  { id: "modboarding", label: "Modboarding", icon: "users" },
  { id: "rules", label: "Rules & Playbooks", icon: "book" },
  { id: "commands", label: "MIU Commands", icon: "terminal" },
  { id: "links", label: "Mod Links", icon: "link" },
  { id: "documents", label: "Documents", icon: "folder" },
  { id: "team", label: "Team", icon: "team" },
];

const pageTitle: Record<View, string> = {
  practice: "Mod Practice Lab",
  home: "Tonight’s stream, without the ritual sacrifice.",
  checklist: "Stream checklist",
  launch: "Launch Lab",
  modboarding: "Modboarding path",
  rules: "Rules & playbooks",
  commands: "Mix It Up Command Library",
  links: "Mod links & resources",
  documents: "Internal documents",
  team: "Mod team",
};

const today = () => new Date().toLocaleDateString("en-CA");

function Seal() {
  return <Image className="seal" src="/favicon.svg" width={44} height={44} alt="" aria-hidden="true" />;
}

function AppSidebar({ view, setView, open, setOpen }: { view: View; setView: (view: View) => void; open: boolean; setOpen: (open: boolean) => void }) {
  return <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
    <button className="sidebar-brand" onClick={() => { setView("home"); setOpen(false); }}><span className="brand-mark">V</span><span><b>MODBOARDING</b><small>VERI&apos;S STREAM HQ</small></span></button>
    <nav aria-label="Main navigation">
      {nav.map(item => <button key={item.id} className={view === item.id ? "active" : ""} onClick={() => { setView(item.id); setOpen(false); }}>
        <Icon name={item.icon} /><span>{item.label}</span>
      </button>)}
    </nav>
    <div className="sidebar-art" aria-hidden="true" />
    <div className="sidebar-note"><span className="status-dot online" />Systems nominal-ish</div>
  </aside>;
}

function PhaseRail({ completed, toggle, compact = false }: { completed: Set<string>; toggle: (id: string, value: boolean) => void; compact?: boolean }) {
  const phases = ["Pre-stream", "Live", "Wrap-up"];
  return <div className={`phase-rail ${compact ? "compact" : ""}`}>
    {phases.map(phase => {
      const items = checklistSeed.filter(item => item.phase === phase);
      const shown = compact ? items.slice(0, 2) : items;
      return <section key={phase} className="phase-column">
        <div className="phase-title"><span>{phase === "Live" ? "焔" : phase === "Pre-stream" ? "⛩" : "月"}</span><h3>{phase}</h3></div>
        <div className="task-list">
          {shown.map(item => <label key={item.id} className={`task-row ${completed.has(item.id) ? "done" : ""}`}>
            <input type="checkbox" checked={completed.has(item.id)} onChange={event => toggle(item.id, event.target.checked)} />
            <span className="checkmark" aria-hidden="true">✓</span>
            <span><strong>{item.label}</strong>{!compact && <small>{item.detail}</small>}</span>
          </label>)}
        </div>
      </section>;
    })}
  </div>;
}

function HomeView({ completed, toggleChecklist, reminders, duty, setView }: {
  completed: Set<string>; toggleChecklist: (id: string, value: boolean) => void; reminders: Reminder[]; duty: Duty[]; setView: (view: View) => void;
}) {
  const [showAllDuty, setShowAllDuty] = useState(false);
  const visibleDuty = duty.length ? duty : [
    { userEmail: "nym", displayName: "Nym", status: "on-duty", updatedAt: "" },
    { userEmail: "panda", displayName: "Panda", status: "on-duty", updatedAt: "" },
    { userEmail: "legal", displayName: "Legal", status: "break", updatedAt: "" },
  ];
  const dutyPriority: Record<string, number> = { "on-duty": 0, break: 1, "off-duty": 2 };
  const sortedDuty = [...visibleDuty].sort((a, b) => (dutyPriority[a.status] ?? 2) - (dutyPriority[b.status] ?? 2));
  const handoffDuty = showAllDuty ? sortedDuty : sortedDuty.slice(0, 3);
  const featuredIds = ["pre-veri-check", "pre-miu", "pre-obs", "pre-overlays", "pre-news", "pre-tits", "pre-chatterino", "pre-streamdeck"];
  const progress = Math.round((completed.size / checklistSeed.length) * 100);
  const latestNote = reminders[0]?.body ?? "New access agreement uploaded. Check restricted pages before we go live.";
  return <>
    <section className="hero"><div><p className="eyebrow">STREAM OPERATIONS</p><h1>Welcome back,<br/><em>chaos crew.</em></h1><p className="lede">Everything the mod team needs to get Veri live, keep chat safe, and gently bully the technology into cooperating.</p><div className="hero-actions"><button className="primary" onClick={() => setView("checklist")}>Start pre-stream check <span>↗</span></button><button className="ghost" onClick={() => setView("rules")}>Open quick rules</button></div></div>
      <div className="status-card"><span className="status-label"><i /> TONIGHT&apos;S STATUS</span><strong>Stream prep<br/>in progress</strong><div className="progress"><span style={{width: `${progress}%`}} /></div><div className="status-meta"><span>{completed.size} / {checklistSeed.length} ready</span><b>{progress}%</b></div><div className="team-row"><div className="mini-avatars">{visibleDuty.slice(0,3).map(person => <span key={person.userEmail}>{person.displayName.slice(0,1).toUpperCase()}</span>)}</div><small>{visibleDuty.filter(person => person.status === "on-duty").length} crew on duty</small></div></div>
    </section>
    <section className="section"><div className="section-head"><div><p className="eyebrow">LAUNCH SEQUENCE</p><h2>Pre-stream checklist</h2></div><button className="text-btn" onClick={() => setView("checklist")}>Open all {checklistSeed.length} checks ↗</button></div>
      <div className="check-grid">{featuredIds.map(id => { const item = checklistSeed.find(candidate => candidate.id === id)!; return <button className={`check-item ${completed.has(id) ? "checked" : ""}`} key={id} onClick={() => toggleChecklist(id, !completed.has(id))}><span className="check-box">{completed.has(id) ? "✓" : ""}</span><span><b>{item.label}</b><small>{item.detail}</small></span><span className="arrow">↗</span></button>; })}</div>
    </section>
    <section className="split section"><article className="quick-card"><div className="card-title"><span className="chip lime">LAUNCH LAB</span><button className="text-btn dark-text" onClick={() => setView("launch")}>Open generator ↗</button></div><h2>Tonight&apos;s stream copy</h2><div className="copy-block"><small>TITLE</small><p>ADHD FOX ATTEMPTS A PLAN · surely fine</p><CopyButton value="ADHD FOX ATTEMPTS A PLAN · surely fine" /></div><div className="copy-block"><small>GO LIVE</small><p>The shrine is open. Come witness competence become optional.</p><CopyButton value="The shrine is open. Come witness competence become optional." /></div><div className="tag-row"><span>English</span><span>VTuber</span><span>ADHD</span><span>Chaotic</span></div></article>
      <article className="notice-card"><span className="chip dark">MOD NOTE</span><h2>Keep the room kind.<br/>Keep Veri on task.</h2><p>{latestNote}</p><div className="signed"><span className="seal-text">狐</span><div><b>Veri</b><small>professional task-avoider</small></div></div></article></section>
    <section className="section home-handoff"><div className="section-head"><div><p className="eyebrow">ON SHIFT</p><h2>Mod handoff</h2></div><button className="text-btn" onClick={() => setView("team")}>Open duty board ↗</button></div><div className="handoff-list"><div id="handoff-moderators" className="handoff-moderators">{handoffDuty.map(person => <div key={person.userEmail}><span className="avatar">{person.displayName.slice(0, 1).toUpperCase()}</span><span><strong>{person.displayName}</strong><small>{person.displayName === "Nym" ? "Chat Guardian" : person.displayName === "Panda" ? "Vibe Keeper" : "Rules & Backups"}</small></span><span className={`status-dot ${person.status === "on-duty" ? "online" : person.status === "break" ? "away" : ""}`} /><small>{person.status === "on-duty" ? "On duty" : person.status === "break" ? "Break" : "Off duty"}</small></div>)}</div>{sortedDuty.length > 3 && <button type="button" className="text-btn handoff-toggle" aria-expanded={showAllDuty} aria-controls="handoff-moderators" onClick={() => setShowAllDuty(value => !value)}>{showAllDuty ? "Show fewer moderators" : `Show ${sortedDuty.length - 3} more moderator${sortedDuty.length - 3 === 1 ? "" : "s"}`}</button>}</div></section>
  </>;
}

function ChecklistView({ date, setDate, completed, toggle }: { date: string; setDate: (date: string) => void; completed: Set<string>; toggle: (id: string, value: boolean) => void }) {
  const percent = Math.round((completed.size / checklistSeed.length) * 100);
  return <div className="workspace-layout">
    <section className="panel main-panel"><div className="section-toolbar"><div><h2>{percent}% ready</h2><p>Shared progress for everyone working this stream.</p></div><label>Stream date<input type="date" value={date} onChange={event => setDate(event.target.value)} /></label></div><PhaseRail completed={completed} toggle={toggle} /><StreamSetupReference /></section>
    <aside className="side-stack"><section className="panel readiness-side"><strong className="readiness-number">{percent}%</strong><span className="readiness-label">ready</span><div className="readiness-bar"><span style={{ width: `${percent}%` }} /></div><p>{completed.size} of {checklistSeed.length} tasks complete</p></section><section className="panel"><h3>Emergency shorthand</h3><dl className="shortcut-list"><div><dt>!unmod</dt><dd>Stepping away</dd></div><div><dt>!remod</dt><dd>Back on duty</dd></div><div><dt>“Need a Pepsi”</dt><dd>Check DMs immediately</dd></div></dl></section></aside>
  </div>;
}

type LaunchFields = { topic: string; category: string; note: string };

function fillLaunchTemplate(template: string, fields: LaunchFields) {
  return template.replaceAll("{topic}", fields.topic || "tonight's chaos").replaceAll("{category}", fields.category || "Just Chatting").replaceAll("{note}", fields.note || "The shrine is open.");
}

function LaunchLabView() {
  const [fields, setFields] = useState<LaunchFields>({ topic: "", category: "Just Chatting", note: "" });
  const [version, setVersion] = useState(0);
  const [outputs, setOutputs] = useState({ title: "Tonight's Bad Idea: tonight's chaos | Just Chatting", goLive: "The shrine is open 🏮 We're live with tonight's chaos! The shrine is open. Come enable the fox: twitch.tv/Veri", news: "TONIGHT: tonight's chaos ✦ The shrine is open. ✦ Welcome home, FoxFam" });

  const recycle = () => {
    const next = version + 1;
    setVersion(next);
    setOutputs({
      title: fillLaunchTemplate(launchTemplates.title[next % launchTemplates.title.length], fields),
      goLive: fillLaunchTemplate(launchTemplates.goLive[next % launchTemplates.goLive.length], fields),
      news: fillLaunchTemplate(launchTemplates.news[next % launchTemplates.news.length], fields),
    });
  };

  const updateOutput = (key: keyof typeof outputs, value: string) => setOutputs(current => ({ ...current, [key]: value }));
  return <div className="launch-layout">
    <section className="panel launch-controls">
      <div className="section-toolbar"><div><h2>Tonight’s ingredients</h2><p>Enter the facts once. Recycle variations until one stops offending you.</p></div><button className="recycle-button" onClick={recycle}><Icon name="refresh" />Recycle all</button></div>
      <div className="launch-fields">
        <label><span>Stream topic / game</span><input value={fields.topic} onChange={event => setFields(current => ({ ...current, topic: event.target.value }))} placeholder="Valorant, debut prep, cursed tier list…" /></label>
        <label><span>Twitch category</span><input value={fields.category} onChange={event => setFields(current => ({ ...current, category: event.target.value }))} placeholder="Just Chatting" /></label>
        <label className="wide"><span>Tonight’s news / CTA</span><input value={fields.note} onChange={event => setFields(current => ({ ...current, note: event.target.value }))} placeholder="New model reveal Friday, Discord event, sponsor code…" /></label>
      </div>
    </section>
    <section className="launch-output-grid">
      <article className="panel launch-output title-output"><div><span className="output-label">Stream title</span><small>{outputs.title.length} characters</small></div><textarea value={outputs.title} onChange={event => updateOutput("title", event.target.value)} aria-label="Generated stream title" /><CopyButton value={outputs.title} /></article>
      <article className="panel launch-output"><div><span className="output-label">Go-live post</span><small>Discord · socials</small></div><textarea value={outputs.goLive} onChange={event => updateOutput("goLive", event.target.value)} aria-label="Generated go-live post" /><CopyButton value={outputs.goLive} /></article>
      <article className="panel launch-output ticker-output"><div><span className="output-label">News ticker</span><small>Overlay-ready</small></div><textarea value={outputs.news} onChange={event => updateOutput("news", event.target.value)} aria-label="Generated news ticker" /><div className="ticker-preview"><span>FOX NEWS</span><p>{outputs.news}</p></div><CopyButton value={outputs.news} /></article>
    </section>
    <StreamCopyLibrary onUseDraft={updateOutput} />
    <p className="launch-note"><Icon name="spark" /> Everything stays editable. “Recycle” rotates the wording without eating your inputs like some kind of productivity demon.</p>
  </div>;
}

function LinksView({ setView }: { setView: (view: View) => void }) {
  const groups = ["Overlays", "Mod tools", "Rules", "Reference"];
  return <div className="links-layout">
    <section className="panel links-intro"><div><h2>Open the thing. Do the thing.</h2><p>Fast access to overlays, moderation tools, rules, and the references everyone needs precisely six seconds after forgetting where they live.</p></div><div className="internal-actions"><button onClick={() => setView("rules")}><Icon name="book" />Search rules</button><button onClick={() => setView("commands")}><Icon name="terminal" />Search commands</button></div></section>
    <EmoteReference />
    {groups.map(group => <section key={group} className="resource-group"><h2>{group}</h2><div className="resource-grid">{resourceLinks.filter(link => link.category === group).map(link => <a key={link.title} className="resource-card" href={link.href} target="_blank" rel="noreferrer"><span className="resource-icon"><Icon name={group === "Rules" ? "book" : group === "Overlays" ? "spark" : group === "Mod tools" ? "team" : "link"} /></span><span><strong>{link.title}</strong><small>{link.detail}</small></span><Icon name="chevron" /></a>)}</div></section>)}
  </div>;
}

function ModboardingView({ done, toggle }: { done: Set<string>; toggle: (id: string, value: boolean) => void }) {
  const percent = Math.round((done.size / onboardingSeed.length) * 100);
  const categories = [...new Set(onboardingSeed.map(item => item.category))];
  return <div className="workspace-layout"><section className="panel main-panel onboarding"><div className="section-toolbar"><div><h2>Your training path</h2><p>Learn the system without reading 47 pages while chat is actively on fire.</p></div><strong className="large-stat">{percent}%</strong></div>
    {categories.map(category => <section key={category} className="onboarding-section"><h3>{category}</h3>{onboardingSeed.filter(item => item.category === category).map((item, index) => <label key={item.id} className={`learning-row ${done.has(item.id) ? "done" : ""}`}><input type="checkbox" checked={done.has(item.id)} onChange={event => toggle(item.id, event.target.checked)} /><span className="step-number">{String(index + 1).padStart(2, "0")}</span><span><strong>{item.title}</strong><small>{item.detail}</small></span><span className="completion-mark">✓</span></label>)}</section>)}</section>
    <aside className="side-stack"><section className="panel"><h3>What “ready” means</h3><ul className="plain-list"><li>You can handle a raid without shouting into the void.</li><li>You know where private notes belong.</li><li>You can find an unfamiliar command fast.</li><li>You ask Nym or Veri when judgment is fuzzy.</li></ul></section><a className="document-cta" href="/docs/Mod-Manual.pdf" target="_blank"><Icon name="book" /><span><strong>Read the source handbook</strong><small>Opens the original 11-page PDF</small></span><Icon name="chevron" /></a></aside>
  </div>;
}

function RulesView() {
  const [query, setQuery] = useState("");
  const filtered = rules.filter(rule => `${rule.title} ${rule.body} ${rule.tone}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="workspace-layout"><section className="panel main-panel rules-panel"><div className="search-box"><Icon name="search" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search rules, actions, or situations…" aria-label="Search rules" /></div><div className="rules-list">{filtered.map(rule => <article key={rule.title}><span className={`tone tone-${rule.tone.toLowerCase().replace(/[^a-z]+/g, "-")}`}>{rule.tone}</span><div><h3>{rule.title}</h3><p>{rule.body}</p></div></article>)}</div></section>
    <aside className="side-stack"><section className="panel decision-panel"><h3>When in doubt</h3><ol><li>Stop the immediate harm.</li><li>Log what happened.</li><li>Keep the debate private.</li><li>Ask Nym or Veri.</li></ol></section><section className="panel"><h3>Do not @ Veri</h3><dl className="shortcut-list"><div><dt>1st time</dt><dd>Warning</dd></div><div><dt>2nd time</dt><dd>2-minute timeout</dd></div><div><dt>3rd time</dt><dd>Mod discretion</dd></div></dl></section></aside>
  </div>;
}

function CommandsView() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "enabled" | "disabled" | "essentials">("all");
  const [selected, setSelected] = useState<Command | null>(null);
  const [page, setPage] = useState(1);
  useEffect(() => { fetch("/data/commands.json").then(response => response.json()).then((data: Command[]) => { setCommands(data); const magic = data.find(item => item.triggers.includes("magic")); setSelected(magic ?? data[0] ?? null); }); }, []);
  const groups = useMemo(() => new Set(commands.map(command => command.group)).size, [commands]);
  const filtered = useMemo(() => commands.filter(command => {
    const haystack = `${command.name} ${command.group} ${command.type} ${command.triggers.join(" ")} ${command.response}`.toLowerCase();
    const matchesSearch = haystack.includes(query.toLowerCase());
    const matchesFilter = filter === "all" || (filter === "enabled" && command.enabled) || (filter === "disabled" && !command.enabled) || (filter === "essentials" && command.triggers.some(trigger => essentials.includes(trigger.toLowerCase())));
    return matchesSearch && matchesFilter;
  }), [commands, query, filter]);
  const perPage = 25;
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const rows = filtered.slice((page - 1) * perPage, page * perPage);
  return <div className={`command-workspace ${selected ? "detail-open" : ""}`}><section className="command-main"><div className="search-box command-search"><Icon name="search" /><input value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} placeholder="Search triggers, commands, groups, or responses…" aria-label="Search commands" /></div>
    <div className="filter-row">{(["all", "enabled", "disabled", "essentials"] as const).map(value => <button key={value} className={filter === value ? "active" : ""} onClick={() => { setFilter(value); setPage(1); }}>{value === "essentials" ? "Mod Essentials" : value[0].toUpperCase() + value.slice(1)}</button>)}<span>{groups} groups</span></div>
    <p className="record-summary"><strong>{commands.length || 656}</strong> records <i /> <strong>538</strong> unique names <i /> <strong>{commands.filter(command => command.triggers.length).length || 437}</strong> with chat triggers</p>
    <div className="command-table-wrap"><table className="command-table"><thead><tr><th>Trigger</th><th>Command</th><th>Group</th><th>Status</th><th>Actions</th></tr></thead><tbody>{rows.map(command => <tr key={command.id} className={selected?.id === command.id ? "selected" : ""} onClick={() => setSelected(command)} tabIndex={0} onKeyDown={event => { if (event.key === "Enter") setSelected(command); }}><td><strong>{command.triggers.length ? command.triggers.map(trigger => `!${trigger}`).join(", ") : "—"}</strong></td><td>{command.name}<small>{command.type}</small></td><td>{command.group}</td><td><span className={`command-status ${command.enabled ? "enabled" : "disabled"}`}><b />{command.enabled ? "Enabled" : "Disabled"}</span></td><td>{command.actions.length}<small>{command.actions.slice(0, 2).join(" · ")}</small></td></tr>)}</tbody></table>{!rows.length && <div className="empty-state">No commands escaped that filter. Suspiciously peaceful.</div>}</div>
    <div className="pagination"><span>{filtered.length ? (page - 1) * perPage + 1 : 0}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</span><div><button disabled={page <= 1} onClick={() => setPage(value => value - 1)}>Previous</button><span>Page {page} of {pages}</span><button disabled={page >= pages} onClick={() => setPage(value => value + 1)}>Next</button></div></div>
  </section>{selected && <aside className="command-detail"><button className="detail-close" onClick={() => setSelected(null)} aria-label="Close command details"><Icon name="close" /></button><h2>{selected.triggers[0] ? `!${selected.triggers[0]}` : selected.name}</h2><p className="detail-name">{selected.name}</p><section><h3>Command details</h3><dl><div><dt>Type</dt><dd>{selected.type}</dd></div><div><dt>Group</dt><dd>{selected.group}</dd></div><div><dt>Status</dt><dd>{selected.enabled ? "Enabled" : "Disabled"}</dd></div></dl></section><section><h3>Chat response</h3><p>{selected.response || "No enabled chat response is attached to this command."}</p></section><section><h3>Action stack</h3><ol className="action-stack">{selected.actions.length ? selected.actions.map((action, index) => <li key={`${action}-${index}`}><span>{index + 1}</span>{action}</li>) : <li><span>—</span>No actions recorded</li>}</ol></section>{selected.triggers.some(trigger => essentials.includes(trigger.toLowerCase())) && <div className="essential-note"><Icon name="spark" /><span><strong>Mod essential</strong>Know this one before your first live shift.</span></div>}</aside>}</div>;
}

function DocumentsView() {
  return <div className="documents-grid"><a className="document-card" href="/docs/Mod-Manual.pdf" target="_blank"><div className="doc-cover handbook"><span>VERI</span><strong>MOD<br/>HANDBOOK</strong><small>of D-UwU-m</small></div><div><span className="doc-type">PDF · 11 pages</span><h2>Mod Manual</h2><p>Shoutouts, raids, commands, greeters, behavior, reminders, bot management, and Discord policing.</p><strong className="open-link">Open original <Icon name="chevron" /></strong></div></a><a className="document-card restricted" href="/docs/Limited-Credential-Access-Agreement.pdf" target="_blank"><div className="doc-cover agreement"><Seal /><strong>LIMITED<br/>ACCESS</strong><small>agreement</small></div><div><span className="doc-type">PDF · 3 pages · restricted</span><h2>Credential Access Agreement</h2><p>Scope, control, confidentiality, termination, and acknowledgment for approved account access.</p><strong className="open-link">Open agreement <Icon name="chevron" /></strong></div></a><section className="panel document-index"><div className="panel-heading"><Icon name="folder" /><h2>Living library</h2></div><p>Use this area for stream rules, emergency playbooks, sponsor notes, editor briefs, and future Drive-linked documents.</p><ul><li><span>Imported command index</span><strong>656 records</strong></li><li><span>Source documents</span><strong>2 PDFs</strong></li><li><span>Handbook sections</span><strong>8 playbooks</strong></li></ul></section></div>;
}

function TeamView({ duty, setDuty }: { duty: Duty[]; setDuty: (status: string) => void }) {
  const [status, setStatus] = useState("off-duty");
  const roster = duty.length ? duty : [{ userEmail: "nym", displayName: "Nym", status: "on-duty", updatedAt: "" }, { userEmail: "panda", displayName: "Panda", status: "on-duty", updatedAt: "" }, { userEmail: "legal", displayName: "Legal", status: "break", updatedAt: "" }];
  return <div className="workspace-layout"><section className="panel main-panel"><div className="section-toolbar"><div><h2>Duty board</h2><p>One visible source of truth for who is watching the ritual circle.</p></div><div className="duty-control"><select value={status} onChange={event => setStatus(event.target.value)} aria-label="Your duty status"><option value="on-duty">On duty</option><option value="break">On break</option><option value="off-duty">Off duty</option></select><button onClick={() => setDuty(status)}>Update mine</button></div></div><div className="team-table">{roster.map(person => <div key={person.userEmail}><span className="avatar large">{person.displayName.slice(0, 1).toUpperCase()}</span><span><strong>{person.displayName}</strong><small>{person.userEmail.includes("@") ? person.userEmail : "Moderator"}</small></span><span className={`status-dot ${person.status === "on-duty" ? "online" : person.status === "break" ? "away" : ""}`} /><strong className="duty-label">{person.status.replace("-", " ")}</strong></div>)}</div></section><aside className="side-stack"><section className="panel"><h3>Shift etiquette</h3><ul className="plain-list"><li>Use !unmod before stepping away.</li><li>Use !remod when you return.</li><li>Name a backup during long breaks.</li><li>Keep urgent coordination private.</li></ul></section></aside></div>;
}

export default function ModboardingApp({ user }: { user: { email: string; name: string } }) {
  const [view, setView] = useState<View>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [streamDate, setStreamDate] = useState(today());
  const [completed, setCompleted] = useState<Set<string>>(new Set(["pre-01", "pre-02", "pre-03"]));
  const [onboardingDone, setOnboardingDone] = useState<Set<string>>(new Set(["on-01", "on-02", "on-03", "on-04"]));
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [duty, setDutyRows] = useState<Duty[]>([]);
  const [syncMode, setSyncMode] = useState<"loading" | "shared" | "preview">("loading");
  const [reminderText, setReminderText] = useState("");

  useEffect(() => {
    fetch(`/api/workspace?date=${streamDate}`).then(async response => {
      if (!response.ok) throw new Error("preview");
      const data = await response.json();
      setCompleted(new Set<string>(data.checklist.map((row: { itemId: string }) => row.itemId)));
      setOnboardingDone(new Set<string>(data.onboarding.map((row: { itemId: string }) => row.itemId)));
      setReminders(data.reminders);
      setDutyRows(data.duty);
      setSyncMode("shared");
    }).catch(() => setSyncMode("preview"));
  }, [streamDate]);

  const post = async (payload: Record<string, unknown>) => {
    if (syncMode === "preview") return;
    const response = await fetch("/api/workspace", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    if (!response.ok) setSyncMode("preview");
  };
  const toggleChecklist = (itemId: string, value: boolean) => { setCompleted(current => { const next = new Set(current); if (value) next.add(itemId); else next.delete(itemId); return next; }); post({ action: "toggle-checklist", itemId, streamDate, completed: value }); };
  const toggleOnboarding = (itemId: string, value: boolean) => { setOnboardingDone(current => { const next = new Set(current); if (value) next.add(itemId); else next.delete(itemId); return next; }); post({ action: "toggle-onboarding", itemId, completed: value }); };
  const addReminder = (event: FormEvent) => { event.preventDefault(); const body = reminderText.trim(); if (!body) return; setReminders(current => [...current, { id: Date.now(), body, createdBy: user.email, createdAt: new Date().toISOString() }]); setReminderText(""); post({ action: "add-reminder", body }); };
  const updateDuty = async (status: string) => { await post({ action: "duty-status", status }); setDutyRows(current => [{ userEmail: user.email, displayName: user.name, status, updatedAt: new Date().toISOString() }, ...current.filter(row => row.userEmail !== user.email)]); };

  return <div className="app-shell">
    <AppSidebar view={view} setView={setView} open={menuOpen} setOpen={setMenuOpen} />
    {menuOpen && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
    <main className="app-main">
      <header className="app-header"><button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Icon name="menu" /></button><div className="mobile-brand"><Seal /><strong>Modboarding HQ</strong></div><div className="header-line">{view === "home" ? <span>MODBOARDING HQ / TONIGHT</span> : <span>MODBOARDING HQ / {pageTitle[view].toUpperCase()}</span>}</div><div className="header-user"><span className={`sync-state ${syncMode}`}>{syncMode === "shared" ? "Shared" : syncMode === "preview" ? "Preview" : "Syncing"}</span><span className="avatar">{user.name.slice(0, 1).toUpperCase()}</span><strong>{user.name}</strong></div></header>
      <div className={`content-wrap ${view === "home" ? "home-wrap" : ""}`}>{view !== "home" && <div className="page-heading"><div><h1>{pageTitle[view]}</h1><p>Everything the FoxFam needs to keep stream useful, safe, and only the fun kind of scuffed.</p></div>{view !== "commands" && <form className="quick-reminder" onSubmit={addReminder}><input value={reminderText} onChange={event => setReminderText(event.target.value)} placeholder="Quick reminder…" aria-label="New reminder" /><button aria-label="Add reminder"><Icon name="plus" /></button></form>}</div>}
        {view === "home" && <HomeView completed={completed} toggleChecklist={toggleChecklist} reminders={reminders} duty={duty} setView={setView} />}
        {view === "checklist" && <ChecklistView date={streamDate} setDate={setStreamDate} completed={completed} toggle={toggleChecklist} />}
        {view === "launch" && <LaunchLabView />}
        {view === "practice" && <PracticeLab />}
        {view === "modboarding" && <ModboardingView done={new Set([...onboardingDone].filter(id => !id.startsWith("practice-")))} toggle={toggleOnboarding} />}
        {view === "rules" && <RulesView />}
        {view === "commands" && <CommandsView />}
        {view === "links" && <LinksView setView={setView} />}
        {view === "documents" && <DocumentsView />}
        {view === "team" && <TeamView duty={duty} setDuty={updateDuty} />}
      </div>
    </main>
  </div>;
}
