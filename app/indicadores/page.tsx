'use client';

import { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { useTheme } from '../providers';
import {
  ChartBarIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalendarIcon,
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
const indicatorsData = [
  {
    id: 1,
    name: 'ICMS',
    value: 150000,
    target: 180000,
    status: 'abaixo',
    lastUpdate: '2024-03-15',
    trend: -5,
    period: 'mensal',
  },
  {
    id: 2,
    name: 'PIS/COFINS',
    value: 80000,
    target: 75000,
    status: 'acima',
    lastUpdate: '2024-03-14',
    trend: 3,
    period: 'mensal',
  },
  {
    id: 3,
    name: 'IRPJ',
    value: 120000,
    target: 100000,
    status: 'acima',
    lastUpdate: '2024-03-13',
    trend: 8,
    period: 'mensal',
  },
];

const monthlyData = [
  { name: 'Jan', icms: 150000, pis: 80000, irpj: 120000 },
  { name: 'Fev', icms: 160000, pis: 85000, irpj: 110000 },
  { name: 'Mar', icms: 170000, pis: 90000, irpj: 130000 },
  { name: 'Abr', icms: 180000, pis: 95000, irpj: 140000 },
  { name: 'Mai', icms: 190000, pis: 100000, irpj: 150000 },
  { name: 'Jun', icms: 200000, pis: 105000, irpj: 160000 },
];

const typeData = [
  { name: 'ICMS', value: 45 },
  { name: 'PIS/COFINS', value: 25 },
  { name: 'IRPJ', value: 20 },
  { name: 'CSLL', value: 10 },
];

export default function Indicadores() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const stats = [
    {
      name: 'Total de Impostos',
      value: 'R$ 350K',
      change: '+5%',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
    },
    {
      name: 'Meta Mensal',
      value: 'R$ 400K',
      change: '-2%',
      changeType: 'negative',
      icon: ChartBarIcon,
    },
    {
      name: 'Economia Fiscal',
      value: 'R$ 50K',
      change: '+10%',
      changeType: 'positive',
      icon: CheckCircleIcon,
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Indicadores Fiscais
          </h1>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar indicador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Todos</option>
              <option value="above">Acima da Meta</option>
              <option value="below">Abaixo da Meta</option>
              <option value="on_target">Na Meta</option>
            </select>
            <button className="btn-primary">
              <PlusIcon className="h-5 w-5 mr-2" />
              Novo Indicador
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
          {/* Evolução Mensal */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Evolução Mensal
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="icms"
                    stroke="#22C55E"
                    name="ICMS"
                  />
                  <Line
                    type="monotone"
                    dataKey="pis"
                    stroke="#3B82F6"
                    name="PIS/COFINS"
                  />
                  <Line
                    type="monotone"
                    dataKey="irpj"
                    stroke="#F59E0B"
                    name="IRPJ"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribuição por Tipo */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Distribuição por Tipo
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={typeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="value"
                    fill="#8884d8"
                    name="Percentual"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Indicators List */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Lista de Indicadores
            </h3>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Indicador
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Meta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tendência
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Período
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {indicatorsData.map((indicator) => (
                  <tr key={indicator.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <ChartBarIcon className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {indicator.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Última atualização: {new Date(indicator.lastUpdate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      R$ {indicator.value.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      R$ {indicator.target.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          indicator.status === 'acima'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}
                      >
                        {indicator.status === 'acima' ? 'Acima da Meta' : 'Abaixo da Meta'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {indicator.trend > 0 ? (
                          <CheckCircleIcon className="h-4 w-4 text-green-400 mr-1" />
                        ) : (
                          <ExclamationCircleIcon className="h-4 w-4 text-red-400 mr-1" />
                        )}
                        <span
                          className={`text-sm ${
                            indicator.trend > 0
                              ? 'text-green-500 dark:text-green-400'
                              : 'text-red-500 dark:text-red-400'
                          }`}
                        >
                          {indicator.trend > 0 ? '+' : ''}{indicator.trend}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {indicator.period}
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