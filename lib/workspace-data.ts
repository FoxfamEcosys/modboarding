export const checklistSeed = [
  { id: "pre-veri-check", phase: "Pre-stream", label: "Veri Check", detail: "Model, mood, meds, water, and whether the fox is spiritually present.", sort: 10 },
  { id: "pre-miu", phase: "Pre-stream", label: "MIU · Refresh", detail: "Open Mix It Up, reconnect services, and refresh anything acting haunted.", sort: 20 },
  { id: "pre-obs", phase: "Pre-stream", label: "OBS", detail: "Correct profile, scene collection, recording path, and stream destination.", sort: 30 },
  { id: "pre-overlays", phase: "Pre-stream", label: "Overlays", detail: "Load, position, and test the overlays needed for tonight.", sort: 40 },
  { id: "pre-news", phase: "Pre-stream", label: "News Ticker", detail: "Update the ticker with tonight's useful news and remove stale lore debris.", sort: 50 },
  { id: "pre-tits", phase: "Pre-stream", label: "TITS", detail: "Connect Twitch Integrated Throwing System and test one harmless projectile.", sort: 60 },
  { id: "pre-chatterino", phase: "Pre-stream", label: "Chatterino", detail: "Open the correct channel tabs and confirm mod actions are available.", sort: 70 },
  { id: "pre-streamdeck", phase: "Pre-stream", label: "StreamDeck", detail: "Confirm pages, scene buttons, and emergency controls are responding.", sort: 80 },
  { id: "pre-commands", phase: "Pre-stream", label: "Commands · User Entrance / Fixes", detail: "Test entrances and repair any commands that chose violence today.", sort: 90 },
  { id: "pre-prayer", phase: "Pre-stream", label: "Prayer Quote", detail: "Choose the shrine quote or blessing for tonight.", sort: 100 },
  { id: "pre-title", phase: "Pre-stream", label: "Title", detail: "Lock the final title and make sure it matches the actual stream. Revolutionary.", sort: 110 },
  { id: "pre-tags", phase: "Pre-stream", label: "Tags · Channel Points", detail: "Set discovery tags and enable only the rewards that can be fulfilled tonight.", sort: 120 },
  { id: "pre-intro", phase: "Pre-stream", label: "Intro Songs", detail: "Queue the intro music and confirm the source is audible but not apocalyptic.", sort: 130 },
  { id: "pre-audio", phase: "Pre-stream", label: "Audio Check", detail: "Mic, game, music, alerts, Discord, and monitoring levels.", sort: 140 },
  { id: "pre-scuff", phase: "Pre-stream", label: "Scuff Check ×", detail: "One deliberate final sweep for the thing everyone assumed someone else checked.", sort: 150 },
  { id: "live-go-lives", phase: "Live", label: "Go Lives", detail: "Post the approved live message everywhere it belongs.", sort: 210 },
  { id: "live-boop", phase: "Live", label: "Boop & Shake", detail: "Confirm both redeems work before chat discovers they do not.", sort: 220 },
  { id: "wrap-clear-chat", phase: "Wrap-up", label: "Clear Chat", detail: "Clear temporary clutter and leave the room ready for the next ritual.", sort: 310 },
] as const;

export const resourceLinks = [
  { category: "Mod tools", title: "Clip Farm", detail: "Open the FoxFam clip farm.", href: "https://links.verivt.stream/clipfarm", external: true },
  { category: "Mod tools", title: "Report a broken command emote", detail: "Include the command and the emote you would replace it with. Link from the stream checklist.", href: "https://links.verivt.stream/fix", external: true },
  { category: "Mod tools", title: "Scuffshare", detail: "Find the Discord channel for something Veri asked you to share on stream.", href: "https://links.verivt.stream/scuffshare", external: true },
  { category: "Reference", title: "Artist reference board", detail: "Artist board linked in the stream checklist. Model note: skin tone #F5C8A6; confirm against the current reference sheet.", href: "https://links.verivt.stream/artistrefboard", external: true },
  { category: "Overlays", title: "StreamElements Overlays", detail: "Edit, duplicate, and launch browser-source overlays.", href: "https://streamelements.com/dashboard/overlays", external: true },
  { category: "Overlays", title: "Twitch Integrated Throwing System", detail: "Open TITS for reactive throwables and redeems.", href: "https://remasuri3.itch.io/tits", external: true },
  { category: "Mod tools", title: "Veri's Twitch Mod View", detail: "Moderation queue, user cards, requests, and channel actions.", href: "https://www.twitch.tv/moderator/veri", external: true },
  { category: "Mod tools", title: "Chatterino", detail: "Open or download the desktop chat client used on shift.", href: "https://chatterino.com/", external: true },
  { category: "Rules", title: "Mod Manual", detail: "The complete source handbook and escalation guidance.", href: "/docs/Mod-Manual.pdf", external: true },
  { category: "Rules", title: "Credential Access Agreement", detail: "Restricted expectations for approved account access.", href: "/docs/Limited-Credential-Access-Agreement.pdf", external: true },
  { category: "Reference", title: "Mix It Up Documentation", detail: "Official setup, command, action, and service documentation.", href: "https://mixitup.bot/docs/getting-started", external: true },
] as const;

export const launchTemplates = {
  title: [
    "{topic} | making scuff sacred ✦ {category}",
    "Surely {topic} Goes Fine | {category}",
    "ADHD Fox Attempts {topic} | Pray for OBS",
    "{topic}, But Every Decision Is Questionable",
    "Tonight's Bad Idea: {topic} | {category}",
  ],
  goLive: [
    "The shrine is open 🏮 We're live with {topic}! {note} Come enable the fox: twitch.tv/Veri",
    "FoxFam, assemble. Tonight we're doing {topic} and pretending this was properly planned. {note} 🔴 twitch.tv/Veri",
    "A new ritual begins: {topic}. Bring snacks, patience, and plausible deniability. {note} ✦ twitch.tv/Veri",
    "LIVE NOW: {topic} | {note} The scuff has already clocked in. twitch.tv/Veri",
  ],
  news: [
    "TONIGHT: {topic} ✦ {note} ✦ Welcome home, FoxFam",
    "SHRINE NEWS // {topic} // {note} // Scuff responsibly",
    "NOW LIVE: {topic} • {note} • Mods are allegedly supervising",
    "FOX BULLETIN: {topic} ✦ {note} ✦ Hydrate or perish, cutely",
  ],
} as const;

export const onboardingSeed = [
  { id: "on-01", category: "Start here", title: "Read the Mod Handbook", detail: "Know the expectations, escalation path, and where decisions are logged.", sort: 10 },
  { id: "on-02", category: "Start here", title: "Join the private mod channels", detail: "Find Twitch Mods on Duty, Remind Veri, Stream Logs, and the Sus List.", sort: 20 },
  { id: "on-03", category: "Start here", title: "Confirm Twitch permissions", detail: "Test timeout, user card, announcements, polls, predictions, markers, and requests.", sort: 30 },
  { id: "on-04", category: "Stream flow", title: "Practice the raid sequence", detail: "Raid intro first, shoutout after, then !magic during the lore pause.", sort: 110 },
  { id: "on-05", category: "Stream flow", title: "Learn duty handoff", detail: "Use !unmod when stepping away, !remod on return, and the Pepsi phrase for urgent DMs.", sort: 120 },
  { id: "on-06", category: "Stream flow", title: "Review reminder and redeem handling", detail: "Learn timing, logging, request queue, and refund expectations.", sort: 130 },
  { id: "on-07", category: "Safety & judgment", title: "Complete moderation scenarios", detail: "Practice spam, hate speech, repeated questions, self-promo, politics, and public disagreement.", sort: 210 },
  { id: "on-08", category: "Safety & judgment", title: "Understand private logging", detail: "Record actions without discussing decisions in public or side-group chats.", sort: 220 },
  { id: "on-09", category: "Tools", title: "Search the Mix It Up library", detail: "Find !newso, !magic, !medcheck, !collab, !unmod, and !remod.", sort: 310 },
  { id: "on-10", category: "Tools", title: "Open StreamElements shared access", detail: "Use your own account and Veri's granted access. Never share credentials.", sort: 320 },
] as const;

export const rules = [
  { title: "Guide the room", tone: "Encourage", body: "Welcome active chatters, keep conversation moving when it is quiet, and redirect arguments with an obvious question. Back off when chat is flowing." },
  { title: "Patience is part of the badge", tone: "Standard", body: "New viewers will repeat questions and rules will be broken again. Stay calm, avoid caps-lock meltdowns, and be stern without becoming the problem." },
  { title: "Do not call out lurkers", tone: "Never", body: "Lurking is valid participation. Do not pressure silent viewers to reveal themselves or explain why they are quiet." },
  { title: "Keep decisions private", tone: "Never", body: "Do not debate moderation in public, contradict Veri or another mod on stream, or move stream-business discussions into unofficial group chats." },
  { title: "Log meaningful actions", tone: "Required", body: "Add Twitch notes and post patterns or incidents to the Discord Sus List. Bots can be banned and reported immediately without extra ceremony." },
  { title: "Hate speech and coordinated harassment", tone: "Escalate", body: "Ban first-time chatters posting misogynistic, homophobic, or racially charged messages. Report coordinated harassment and log the incident." },
  { title: "Politics and religion", tone: "Warn → timeout", body: "Warn once, time out if it continues, and log repeated behavior so the mod team can evaluate the pattern." },
  { title: "Do not publicly manage Veri", tone: "Boundary", body: "Health reminders and operational feedback belong in private mod channels. Do not publicly tell Veri to sleep or steer stream behind her back." },
] as const;

export const essentials = ["newso", "so", "magic", "unmod", "remod", "medcheck", "collab", "remind", "rules", "raiders", "setgame", "requests", "marker"];
