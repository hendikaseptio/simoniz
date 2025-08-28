import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Calendar, ClipboardList, FileText, Folder, LayoutGrid, MapPin, ScrollText, Users, UserSearch } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
        roles: ['admin', 'kabid', 'tim'],
    },
    // admin
    {
        title: 'Data Reklame',
        href: '/reklame',
        icon: ClipboardList,
        roles: ['admin'],
    },
    {
        title: 'Petugas',
        href: '/petugas',
        icon: Users,
        roles: ['admin'],
    },
    {
        title: 'Tim Jalan',
        href: '/tim',
        icon: UserSearch,
        roles: ['admin'],
    },
    {
        title: 'Approval Dokumen',
        href: '/approval',
        icon: ScrollText,
        roles: ['kabid'],
    },
    {
        title: 'Jadwal Monitoring',
        href: '/jadwal',
        icon: Calendar,
        roles: ['admin', 'kabid', 'tim'],
    },
    {
        title: 'Hasil Monitoring',
        href: '/monitoring',
        icon: FileText,
        roles: ['admin', 'tim'],
    },
    {
        title: 'Peta Lokasi',
        href: '/peta',
        icon: MapPin,
        roles: ['admin', 'kabid', 'tim'],
    },
    {
        title: 'Dokumen',
        href: '/dokumen',
        icon: ScrollText,
        roles: ['admin', 'tim'],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

const prefixPerRole: Record<string, string> = {
    admin: '/admin',
    kabid: '/kabid',
    tim: '/tim',
};

export function AppSidebar() {
    const { auth } = usePage<{ auth: { user: { role: string } } }>().props;
    const userRole = auth?.user?.role ?? 'guest';

    const filteredNavItems = mainNavItems
        .filter(item => item.roles ? item.roles.includes(userRole) : true)
        .map(item => ({
            ...item,
            href: item.href.startsWith('http') 
                ? item.href // external link, jangan prefix
                : (prefixPerRole[userRole] ?? '') + item.href,
        }));
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
