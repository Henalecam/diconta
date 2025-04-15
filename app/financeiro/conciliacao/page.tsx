'use client';

import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { useTheme } from '../../providers';
import {
  BanknotesIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  DocumentCheckIcon,
  DocumentMagnifyingGlassIcon,
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
const reconciliationData = [
  {
    id: 1,
    date: '2024-03-01',
    description: 'Depósito Cliente A',
    bankValue: 5000.00,
    systemValue: 5000.00,
    status: 'conciliado',
    type: 'entrada',
  },
  {
    id: 2,
    date: '2024-03-02',
    description: 'Pagamento Fornecedor B',
    bankValue: 2500.00,
    systemValue: 2500.00,
    status: 'conciliado',
    type: 'saida',
  },
  {
    id: 3,
    date: '2024-03-03',
    description: 'Transferência Cliente C',
    bankValue: 3500.00,
    systemValue: 3500.00,
    status: 'pendente',
    type: 'entrada',
  },
];

const monthlyBalanceData = [
  { name: 'Jan', saldo: 4000, conciliado: 3800 },
  { name: 'Fev', saldo: 3000, conciliado: 2800 },
  { name: 'Mar', saldo: 2000, conciliado: 1500 },
  { name: 'Abr', saldo: 2780, conciliado: 2500 },
  { name: 'Mai', saldo: 1890, conciliado: 1800 },
  { name: 'Jun', saldo: 2390, conciliado: 2000 },
];

const statusData = [
  { name: 'Conciliados', value: 75 },
  { name: 'Pendentes', value: 25 },
];

export default function Conciliacao() {
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState('month');

  const stats = [
    {
      name: 'Saldo Bancário',
      value: 'R$ 45,231.89',
      change: '+20.1%',
      changeType: 'positive',
      icon: BanknotesIcon,
    },
    {
      name: 'Transações Conciliadas',
      value: '85%',
      change: '+5%',
      changeType: 'positive',
      icon: DocumentCheckIcon,
    },
    {
      name: 'Transações Pendentes',
      value: '15%',
      change: '-5%',
      changeType: 'negative',
      icon: DocumentMagnifyingGlassIcon,
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Conciliação Bancária
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
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              Conciliar
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
          {/* Evolução do Saldo */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Evolução do Saldo
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyBalanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="saldo"
                    stroke="#22C55E"
                    name="Saldo Total"
                  />
                  <Line
                    type="monotone"
                    dataKey="conciliado"
                    stroke="#3B82F6"
                    name="Saldo Conciliado"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status de Conciliação */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Status de Conciliação
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="value"
                    fill={(entry) =>
                      entry.name === 'Conciliados' ? '#22C55E' : '#EF4444'
                    }
                    name="Quantidade"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Transações
            </h3>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Valor Banco
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Valor Sistema
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {reconciliationData.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      R$ {transaction.bankValue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      R$ {transaction.systemValue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === 'conciliado'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {transaction.status === 'conciliado'
                          ? 'Conciliado'
                          : 'Pendente'}
                      </span>
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