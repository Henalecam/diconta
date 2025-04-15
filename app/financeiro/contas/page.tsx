'use client';

import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { useTheme } from '../../providers';
import {
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Dados de exemplo
const accountsData = [
  {
    id: 1,
    type: 'receber',
    description: 'Fatura Cliente A',
    value: 5000.00,
    dueDate: '2024-03-15',
    status: 'pendente',
    category: 'Serviços',
  },
  {
    id: 2,
    type: 'pagar',
    description: 'Aluguel',
    value: 2500.00,
    dueDate: '2024-03-10',
    status: 'pendente',
    category: 'Despesas Fixas',
  },
  {
    id: 3,
    type: 'receber',
    description: 'Fatura Cliente B',
    value: 3500.00,
    dueDate: '2024-03-20',
    status: 'pago',
    category: 'Serviços',
  },
];

const monthlyFlowData = [
  { name: 'Jan', receber: 4000, pagar: 2400 },
  { name: 'Fev', receber: 3000, pagar: 1398 },
  { name: 'Mar', receber: 2000, pagar: 9800 },
  { name: 'Abr', receber: 2780, pagar: 3908 },
  { name: 'Mai', receber: 1890, pagar: 4800 },
  { name: 'Jun', receber: 2390, pagar: 3800 },
];

const categoryData = [
  { name: 'Serviços', value: 400 },
  { name: 'Despesas Fixas', value: 300 },
  { name: 'Impostos', value: 200 },
  { name: 'Outros', value: 100 },
];

export default function Contas() {
  const { theme } = useTheme();
  const [view, setView] = useState('all');
  const [timeRange, setTimeRange] = useState('month');

  const stats = [
    {
      name: 'Total a Receber',
      value: 'R$ 8,500.00',
      change: '+12.5%',
      changeType: 'positive',
      icon: ArrowUpIcon,
    },
    {
      name: 'Total a Pagar',
      value: 'R$ 2,500.00',
      change: '-5.2%',
      changeType: 'negative',
      icon: ArrowDownIcon,
    },
    {
      name: 'Saldo Previsto',
      value: 'R$ 6,000.00',
      change: '+18.3%',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Contas a Pagar e Receber
          </h1>
          <div className="flex space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="week">Última Semana</option>
              <option value="month">Último Mês</option>
              <option value="quarter">Último Trimestre</option>
              <option value="year">Último Ano</option>
            </select>
            <button className="btn-primary">
              Nova Conta
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon
                      className={`h-6 w-6 ${
                        stat.changeType === 'positive'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.changeType === 'positive'
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Fluxo Mensal */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Fluxo Mensal
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="receber"
                    stroke="#22C55E"
                    name="A Receber"
                  />
                  <Line
                    type="monotone"
                    dataKey="pagar"
                    stroke="#EF4444"
                    name="A Pagar"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribuição por Categoria */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Distribuição por Categoria
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="Valor" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Accounts List */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Contas
            </h3>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Vencimento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Categoria
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {accountsData.map((account) => (
                  <tr key={account.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {account.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      R$ {account.value.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(account.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          account.status === 'pago'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {account.status === 'pago' ? 'Pago' : 'Pendente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {account.category}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 