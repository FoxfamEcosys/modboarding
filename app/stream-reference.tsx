"use client";

import { useState } from "react";
import { audioTracks, documentedFunCommands, emoteGroups, streamCopy, type StreamCopy } from "../lib/stream-reference";
import { Icon } from "./icons";

export function CopyButton({ value }: { value: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 1400);
    } catch {
      setStatus("error");
    }
  }
  return <div className="reference-copy"><button className="copy-button" onClick={copy}><Icon name="copy" />{status === "copied" ? "Copied" : "Copy"}</button><span role="status">{status === "error" ? "Clipboard unavailable. Select the text and copy it manually." : status === "copied" ? "Copied to clipboard." : ""}</span></div>;
}

export function StreamSetupReference() {
  return <section className="panel stream-reference" aria-labelledby="setup-reference-title">
    <h2 id="setup-reference-title">Stream setup reference</h2>
    <p>From Veri’s Full Stream Checklist. Compare these notes with the streaming PC before making changes.</p>
    <details open><summary>Audio track map</summary><table className="reference-table"><caption>Documented OBS track assignments</caption><thead><tr><th scope="col">Track</th><th scope="col">Source</th></tr></thead><tbody>{audioTracks.map(item => <tr key={item.track}><th scope="row">{item.track}</th><td>{item.source}</td></tr>)}</tbody></table><p>Check the actual OBS routing and a short recording. This map alone does not confirm what reaches the live stream or VOD.</p></details>
    <details><summary>VTube Studio · model & hotkeys</summary><ul className="plain-list"><li>Check DAILY fit and the original position before going live.</li><li>Test beckon, HeartHands, BoopyBlank, and any item scenes needed tonight.</li><li>The note lists BoopyBlank as RShift + N6 and the pistol item scene as RShift + 2.</li><li>Updo appears with both Num Lock and Scroll Lock in the note. Confirm the actual binding in VTube Studio; do not overwrite it from this reference.</li><li>Half-Up and Loose Half-Up are listed without complete bindings.</li></ul></details>
    <details><summary>Overlays & scene checks</summary><p>Check GS, Deco, End Creds, Alerts, and the MIU base overlay on the streaming PC. MIU sources use local port 8111; they are not remotely accessible team links.</p><p>The note also names New PFP Chat Main, Fancy PFP Chat, Taking Time Neon, Sound Alerts, and CozyCafe. Main and Fancy share the same source in the note—verify the intended overlay in the dashboard.</p><p>Use the approved dashboards and existing OBS sources for connection details.</p></details>
    <details><summary>Checklist timing</summary><p>The source puts Go Lives, Boop & Shake, and Clear Chat at the end of pre-stream. HQ currently groups those under Live and Wrap-up. Coordinate their timing with Veri; the existing task IDs and completion history are preserved.</p></details>
  </section>;
}

export function StreamCopyLibrary({ onUseDraft }: { onUseDraft: (destination: "title" | "goLive" | "news", text: string) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [notice, setNotice] = useState("");
  const categories = ["All", ...new Set(streamCopy.map(item => item.category))];
  const filtered = streamCopy.filter(item => (category === "All" || item.category === category) && `${item.label} ${item.text} ${item.category}`.normalize("NFKC").toLowerCase().includes(query.normalize("NFKC").trim().toLowerCase()));
  function choose(item: StreamCopy) {
    if (!item.destination) return;
    onUseDraft(item.destination, item.text);
    setNotice(`${item.label} loaded into the ${item.destination === "goLive" ? "go-live" : item.destination === "news" ? "news ticker" : "title"} editor above. Review it before sharing.`);
  }
  return <section className="panel stream-reference" aria-labelledby="copy-library-title">
    <h2 id="copy-library-title">Veri’s copy shelf</h2>
    <p>A curated selection from Full Stream Checklist: original voice, readable labels, and editable drafts. Review context, add tonight’s link or facts, and replace placeholders before posting. Quotes are reproduced as collected in the note; authorship is not verified.</p>
    <div className="reference-controls"><label>Find copy<input value={query} onChange={event => setQuery(event.target.value)} placeholder="Try rhythm, comfort, BRB…" /></label><label>Copy category<select value={category} onChange={event => setCategory(event.target.value)}>{categories.map(value => <option key={value}>{value}</option>)}</select></label></div>
    <p role="status">{notice || `${filtered.length} entries`}</p>
    <div className="reference-entries">{filtered.map(item => <article key={item.id}><div><small>{item.category}</small><h3>{item.label}</h3><p className="reference-text">{item.text}</p></div><div className="reference-actions">{item.destination && <button className="ghost" onClick={() => choose(item)}>Use in {item.destination === "goLive" ? "go-live" : item.destination === "news" ? "ticker" : "title"}</button>}<CopyButton value={item.text} /></div></article>)}</div>
    {!filtered.length && <p className="empty-state">No copy on this shelf yet. Try another word or choose All.</p>}
    <details><summary>Historical announcements · review before reuse</summary><p>The note includes a February 14 debut teaser without a year, a Friday 5:30 p.m. movie night, Tuesday 6 p.m. hangouts, an end-of-month merch change, and a 20% subscriber discount. These are not confirmed current dates, schedules, or offers and are excluded from generated copy.</p><p>Long joke banks, duplicate ticker variants, and incomplete scraps are not imported wholesale. Raid guidance remains in Rules & Playbooks; the note’s raid section contains only a placeholder.</p></details>
  </section>;
}

export function EmoteReference() {
  return <section className="panel stream-reference" aria-labelledby="emote-reference-title"><h2 id="emote-reference-title">Emotes & chat reference</h2><p>Names documented in Full Stream Checklist, grouped as written. Availability and subscriber access have not been checked live.</p>{emoteGroups.map(group => <details key={group.label}><summary>{group.label} emotes · {group.emotes.length}</summary><p className="reference-text">{group.emotes.join(" · ")}</p><CopyButton value={group.emotes.join(" ")} /></details>)}<details><summary>Fun commands mentioned in the note</summary><p className="reference-text">{documentedFunCommands.map(command => `!${command}`).join(" · ")}</p><p>Check MIU Commands for the imported configuration and confirm availability before adding them to tonight’s ticker. This reference does not enable or execute commands.</p><CopyButton value={documentedFunCommands.map(command => `!${command}`).join(" ")} /></details><p>For broken emotes, include the command name and suggested replacement in the command-fix form below.</p></section>;
}
