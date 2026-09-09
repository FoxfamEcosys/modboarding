import type { ComponentProps } from "react";
import {
  ArrowsClockwise, Bell, BookOpenText, CaretRight, ClipboardText, Copy,
  FileText, FolderSimple, House, Link, List, MagicWand, MagnifyingGlass,
  Plus, Sparkle, TerminalWindow, UserList, UsersThree, X,
} from "@phosphor-icons/react";

const icons = {
  home: House,
  checklist: ClipboardText,
  users: UsersThree,
  book: BookOpenText,
  terminal: TerminalWindow,
  folder: FolderSimple,
  team: UserList,
  search: MagnifyingGlass,
  bell: Bell,
  chevron: CaretRight,
  close: X,
  file: FileText,
  menu: List,
  plus: Plus,
  spark: Sparkle,
  wand: MagicWand,
  link: Link,
  copy: Copy,
  refresh: ArrowsClockwise,
} as const;

export function Icon({ name, ...props }: Omit<ComponentProps<typeof House>, "ref"> & { name: keyof typeof icons }) {
  const Glyph = icons[name];
  return <Glyph aria-hidden="true" weight="regular" {...props} />;
}
