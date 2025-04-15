'use client';

import { useTheme } from '../providers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon,
  SunIcon,
  MoonIcon,
  DocumentDuplicateIcon,
  BanknotesIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  BellIcon,
  DocumentCheckIcon,
  UserIcon,
  ShieldCheckIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  DocumentMagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Clientes', href: '/clientes', icon: UserGroupIcon },
  { name: 'Financeiro', href: '/financeiro', icon: BanknotesIcon, submenu: [
    { name: 'Contas a Pagar/Receber', href: '/financeiro/contas', icon: DocumentTextIcon },
    { name: 'Conciliação Bancária', href: '/financeiro/conciliacao', icon: DocumentCheckIcon },
  ]},
  { name: 'Documentos', href: '/documentos', icon: DocumentTextIcon },
  { name: 'Notas Fiscais', href: '/notas-fiscais', icon: DocumentDuplicateIcon },
  { name: 'Tarefas', href: '/tarefas', icon: ClipboardDocumentListIcon },
  { name: 'Demandas Internas', href: '/demandas', icon: ChatBubbleLeftRightIcon },
  { name: 'Checklist Mensal', href: '/checklist', icon: CheckCircleIcon },
  { name: 'Comunicação Interna', href: '/comunicacao', icon: BellIcon },
  { name: 'Assinatura Digital', href: '/assinatura', icon: DocumentMagnifyingGlassIcon },
  { name: 'Multi-CNPJ', href: '/multi-cnpj', icon: UserIcon },
  { name: 'Integrações', href: '/integracoes', icon: ChartBarIcon },
  { name: 'Alertas', href: '/alertas', icon: BellIcon },
  { name: 'Indicadores Fiscais', href: '/indicadores', icon: ChartBarIcon },
  { name: 'Permissões', href: '/permissoes', icon: ShieldCheckIcon },
  { name: 'Histórico de Auditoria', href: '/auditoria', icon: ClockIcon },
  { name: 'Configurações', href: '/configuracoes', icon: CogIcon },
];

export default function Navigation() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex flex-col h-full bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.submenu && item.submenu.some(sub => pathname === sub.href));
          return (
            <div key={item.name}>
              <Link
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-300'
                      : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
              {item.submenu && isActive && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        pathname === subItem.href
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <subItem.icon
                        className={`mr-3 h-5 w-5 ${
                          pathname === subItem.href
                            ? 'text-blue-600 dark:text-blue-300'
                            : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'
                        }`}
                        aria-hidden="true"
                      />
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex-shrink-0 p-4">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {theme === 'dark' ? (
            <>
              <SunIcon className="w-5 h-5 mr-2" />
              Modo Claro
            </>
          ) : (
            <>
              <MoonIcon className="w-5 h-5 mr-2" />
              Modo Escuro
            </>
          )}
        </button>
      </div>
    </nav>
  );
} 