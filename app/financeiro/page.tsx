'use client';

import MainLayout from '../components/MainLayout';
import { useTheme } from '../providers';
import {
  BanknotesIcon,
  DocumentTextIcon,
  DocumentCheckIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const financialCards = [
  {
    title: 'Contas a Pagar e Receber',
    description: 'Gerencie suas contas a pagar e receber',
    icon: DocumentTextIcon,
    href: '/financeiro/contas',
    stats: {
      total: 'R$ 25.000,00',
      aPagar: 'R$ 10.000,00',
      aReceber: 'R$ 15.000,00',
    },
  },
  {
    title: 'Conciliação Bancária',
    description: 'Concilie suas transações bancárias',
    icon: DocumentCheckIcon,
    href: '/financeiro/conciliacao',
    stats: {
      saldo: 'R$ 50.000,00',
      conciliado: 'R$ 45.000,00',
      pendente: 'R$ 5.000,00',
    },
  },
];

export default function Financeiro() {
  const { theme } = useTheme();

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Módulo Financeiro
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gerencie todas as operações financeiras do seu escritório
            </p>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CurrencyDollarIcon className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Saldo Total
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        R$ 75.000,00
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ArrowUpIcon className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Receitas do Mês
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        R$ 30.000,00
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ArrowDownIcon className="h-6 w-6 text-red-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Despesas do Mês
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        R$ 15.000,00
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Modules */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {financialCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <card.icon className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {card.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {Object.entries(card.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {key === 'total' ? 'Total' : 
                         key === 'aPagar' ? 'A Pagar' : 
                         key === 'aReceber' ? 'A Receber' :
                         key === 'saldo' ? 'Saldo' :
                         key === 'conciliado' ? 'Conciliado' :
                         'Pendente'}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 