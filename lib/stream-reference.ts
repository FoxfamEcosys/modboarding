// Curated from Veri's “Full STREAM CHECKLIST” UpNote, reviewed 2026-09-05.
// Never import the raw note: it contains credentials and token-bearing URLs.
// These are documented references, not a live inventory or approved announcements.
export interface StreamCopy {
  id: string;
  category: "Title" | "Go live" | "Ticker" | "Quote" | "VOD label" | "Banter" | "Style";
  label: string;
  text: string;
  destination?: "title" | "goLive" | "news";
}

export const streamCopy: readonly StreamCopy[] = [
  { id: "title-menu", category: "Title", label: "Menu screen adventures", text: "ⱭƇƇӀƊҼƝƬⱭLLƳ sᴘᴇᴇᴅʀᴜɴɴɪɴɢ Mᥱᥒᥙ Sᥴrᥱᥱᥒ ᴬᵍᵃᶤᶰ", destination: "title" },
  { id: "title-rhythm", category: "Title", label: "Rhythm · ADHD Jams", text: "𝐀𝐃𝐇𝐃 ᒍams: short ᏚᏫNᏀᏚ shorter ＦＯＣＵＳ🤌", destination: "title" },
  { id: "title-one-tail", category: "Title", label: "Variety · One tail", text: "One ᴛᴀɪʟ, No Diဌղi𝚝ỿ, 𝙼𝙰𝚇𝙸𝙼𝚄𝙼 Entertainment", destination: "title" },
  { id: "title-comfort", category: "Title", label: "Comfort · After Dark", text: "Your New Cσɱϝσɾƚ / 𝗘𝗺𝗼𝘁𝗶𝗼𝗻𝗮𝗹 𝗦𝘂𝗽𝗽𝗼𝗿𝘁 Sƚɾҽαɱҽɾ 🦊VɆⱤł ΛFƬΣЯ DΛЯK 🌸", destination: "title" },
  { id: "live-fps", category: "Go live", label: "FPS · Accidental misfires", text: "🔴 Gothicc ScufFox vs. FPS Games: A Story of Hope, Despair & Accidental Misfires.", destination: "goLive" },
  { id: "live-rhythm", category: "Go live", label: "Rhythm · 47 tabs", text: "Watch an ADHD ScufFox juggle streaming, a rhythm game, and 47 open browser tabs!", destination: "goLive" },
  { id: "live-gameplay", category: "Go live", label: "Variety · Gameplay may include", text: "🔴 NOW LIVE 🔴\nGameplay May Include:\n᠉ Distracted Side Quests\n᠉ Long Spans of Sitting in Menus\n᠉ Frequent Pauses to Googly-Eye Shiny Things on Overlays", destination: "goLive" },
  { id: "live-comfort", category: "Go live", label: "Comfort · Stay a while", text: "Let me help you relax or fall asleep.\nAnd I'll be Right Here When you Wake Up~♥", destination: "goLive" },
  { id: "ticker-fix", category: "Ticker", label: "Report broken command emotes", text: "See a command where emotes aren't working? Let us know which command & what emote you'd replace it with here: https://links.verivt.stream/fix", destination: "news" },
  { id: "ticker-share", category: "Ticker", label: "Share something Veri requested", text: "Veri ask you to share something while she's streaming? Find the Discord channel to do so here: https://links.verivt.stream/scuffshare", destination: "news" },
  { id: "quote-hope", category: "Quote", label: "Hope", text: "𝕀 Will Be Your ℍ𝕆ℙ𝔼 If You Misplace Yours ♥", destination: "news" },
  { id: "quote-moon", category: "Quote", label: "You do not have to be whole", text: "The MOON said to me, \"My 𝒟𝒶𝓇𝓁𝒾𝓃𝑔...you 𝒅𝒐 𝒏𝒐𝒕 have to be WĦOLE in order to SHINE.\"", destination: "news" },
  { id: "quote-boundaries", category: "Quote", label: "Empathy & boundaries", text: "ҼⱮƤⱭƬHƳ without BOUṈDΔRIES is simply ˢᵉˡᶠ 𝔻𝔼𝕊𝕋ℝ𝕌ℂ𝕋𝕀𝕆ℕ", destination: "news" },
  { id: "quote-small-victories", category: "Quote", label: "Small victories", text: "Sometimes, getting out of bed takes everything we have. The energy you require to survive and the energy you use to thrive are two very different things. If all you can do is get out of bed, be proud of your small victory, and understand that it doesn't make you lazy or unproductive: it makes you human.", destination: "news" },
  { id: "vod-deemo", category: "VOD label", label: "Rhythm · DEEMO", text: "ʳʰʸᵗʰᵐ DEEMO⠨" },
  { id: "vod-comfort", category: "VOD label", label: "Comfort & ASMR", text: "ᶜᵒᵐᶠᵒʳᵗ & ASMR⠨" },
  { id: "vod-valo", category: "VOD label", label: "VALOrizz", text: "VALOʳᶤᶻᶻ⠨" },
  { id: "vod-farewell", category: "VOD label", label: "Fond farewells", text: "ᶠᵒᶰᵈ FAREWELLS⠨" },
  { id: "vod-scuff", category: "VOD label", label: "Scuff stuff", text: "𐒖𝙲ᏌƑƑ ˢᵗᵘᶠᶠ⠨" },
  { id: "vod-fox", category: "VOD label", label: "Just Scuffox things", text: "ʲᵘˢᵗ sᴄᴜғғᴏx ᵗʰᶤᶰᵍˢ⠨" },
  { id: "banter-typo", category: "Banter", label: "Scuff", text: "I'm the human equivalent of a typo." },
  { id: "banter-late", category: "Banter", label: "Running late", text: "Time is an illusion, which is why I'm usually late." },
  { id: "banter-valorant", category: "Banter", label: "Valorant · Eco round", text: "Are you an eco round? Because you’re a risk worth taking." },
  { id: "banter-sarcasm", category: "Banter", label: "Sarcasm", text: "My sarcasm has leveled up to where I don’t even know if I'm kidding anymore." },
  { id: "style-brb", category: "Style", label: "BRB title part", text: "🙟・BRB・🙝" },
  { id: "style-collab", category: "Style", label: "Collaboration credit · replace username", text: "〃ᶠᵗ @username" },
  { id: "style-veritonin", category: "Style", label: "VERITONIN wordmark", text: "𝗩 𝗘 𝗥 𝗜 𝗧 𝗢 𝗡 𝗜 𝗡™" },
  { id: "style-divider", category: "Style", label: "Divider", text: "🞮 ───· ꔫ ·─── 🞮" },
  { id: "style-faces", category: "Style", label: "Chat faces", text: "ಠ ⩊ ಠ?   〜(꒪ ꒳ ꒪)〜   ಡ ⩊ ಡ   ಥ ‿ ಥ" },
];

export const audioTracks = [
  { track: "I", source: "Stream · game · system" },
  { track: "II", source: "Microphone" },
  { track: "III", source: "Discord / voice chat" },
  { track: "IV", source: "Alerts · Mix It Up" },
  { track: "V", source: "Music" },
  { track: "VI", source: "VOD" },
] as const;

export const emoteGroups = [
  { label: "Follower", emotes: ["verivtLOVE", "verivtCRINGE", "verivtFOX", "verivtGRIN", "verivtBETTER"] },
  { label: "Subscriber", emotes: ["verivtSPIN", "verivtSHAKE", "verivtAHAH", "verivtZOOM", "verivtSCREAM", "verivtYUH", "verivtLICK", "verivtFACEPALM", "verivtSCUFF", "verivtSHEESH", "verivtFINE", "verivtWHEEZE", "verivtWIGGLE", "verivtHEY", "verivtADHD", "verivtTHERETHERE", "verivtYO", "verivtJAMMIES", "verivtBOUNCEY", "verivtDAB", "verivtSHY", "verivtSTOP", "verivtBLINK", "verivtAHYUK", "verivtRIZZ", "verivtFATW"] },
] as const;

export const documentedFunCommands = ["ahah", "sausage", "busta", "unwell", "shark", "flex", "water", "lanes", "hype", "princess", "scripture", "sweaty", "vine", "wtf", "bde", "bussin", "ew", "butter", "popup", "foxfacts"] as const;
