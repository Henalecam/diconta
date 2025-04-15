'use client';

import MainLayout from '../components/MainLayout';
import { useTheme } from '../providers';
import {
  BellIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  KeyIcon,
  GlobeAltIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

export default function Configuracoes() {
  const { theme } = useTheme();

  const settingsGroups = [
    {
      title: 'Notificações',
      icon: BellIcon,
      settings: [
        {
          name: 'Notificações por Email',
          description: 'Receba atualizações importantes por email',
          icon: EnvelopeIcon,
          enabled: true,
        },
        {
          name: 'Alertas de Documentos',
          description: 'Notificações sobre documentos pendentes',
          icon: DocumentTextIcon,
          enabled: true,
        },
        {
          name: 'Lembretes de Pagamento',
          description: 'Alertas sobre pagamentos próximos',
          icon: CalendarIcon,
          enabled: false,
        },
      ],
    },
    {
      title: 'Segurança',
      icon: ShieldCheckIcon,
      settings: [
        {
          name: 'Autenticação em Duas Etapas',
          description: 'Adicione uma camada extra de segurança',
          icon: KeyIcon,
          enabled: false,
        },
        {
          name: 'Histórico de Acesso',
          description: 'Registro de logins e atividades',
          icon: ChartBarIcon,
          enabled: true,
        },
        {
          name: 'Permissões de Usuário',
          description: 'Gerencie níveis de acesso',
          icon: UserGroupIcon,
          enabled: true,
        },
      ],
    },
    {
      title: 'Financeiro',
      icon: CreditCardIcon,
      settings: [
        {
          name: 'Métodos de Pagamento',
          description: 'Configure formas de pagamento aceitas',
          icon: CurrencyDollarIcon,
          enabled: true,
        },
        {
          name: 'Moeda Padrão',
          description: 'Defina a moeda principal do sistema',
          icon: GlobeAltIcon,
          enabled: true,
        },
        {
          name: 'Impostos',
          description: 'Configurações fiscais e tributárias',
          icon: Cog6ToothIcon,
          enabled: true,
        },
      ],
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Configurações</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gerencie as configurações do seu escritório
          </p>
        </div>

        <div className="space-y-8">
          {settingsGroups.map((group) => (
            <div key={group.title} className="card">
              <div className="flex items-center space-x-3 mb-4">
                <group.icon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  {group.title}
                </h2>
              </div>

              <div className="space-y-4">
                {group.settings.map((setting) => (
                  <div
                    key={setting.name}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <setting.icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {setting.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {setting.description}
                        </p>
                      </div>
                    </div>
                    <button
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        setting.enabled
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {setting.enabled ? 'Ativado' : 'Desativado'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 