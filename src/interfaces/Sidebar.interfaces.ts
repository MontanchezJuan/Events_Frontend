export interface SidebarItems {
  title: string;
  items: SidebarItem[];
}

interface SidebarItem {
  icon: React.ElementType;
  name: string;
  path: string;
}
