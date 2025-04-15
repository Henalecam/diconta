'use client';

import { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { useTheme } from '../providers';
import {
  ClipboardDocumentCheckIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  UserGroupIcon,
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
const checklistData = [
  {
    id: 1,
    title: 'Declaração de IR',
    description: 'Enviar declaração de imposto de renda',
    category: 'Fiscal',
    status: 'em_andamento',
    dueDate: '2024-03-15',
    assignedTo: 'João Silva',
    progress: 60,
    frequency: 'mensal',
  },
  {
    id: 2,
    title: 'Relatório Financeiro',
    description: 'Preparar relatório financeiro do mês',
    category: 'Financeiro',
    status: 'pendente',
    dueDate: '2024-03-20',
    assignedTo: 'Maria Santos',
    progress: 0,
    frequency: 'mensal',
  },
  {
    id: 3,
    title: 'Reunião de Equipe',
    description: 'Realizar reunião mensal de alinhamento',
    category: 'Gestão',
    status: 'concluido',
    dueDate: '2024-03-10',
    assignedTo: 'Pedro Oliveira',
    progress: 100,
    frequency: 'mensal',
  },
];

const monthlyData = [
  { name: 'Jan', total: 20, concluidas: 18 },
  { name: 'Fev', total: 22, concluidas: 20 },
  { name: 'Mar', total: 25, concluidas: 22 },
  { name: 'Abr', total: 23, concluidas: 20 },
  { name: 'Mai', total: 24, concluidas: 22 },
  { name: 'Jun', total: 26, concluidas: 24 },
];

const categoryData = [
  { name: 'Fiscal', value: 30 },
  { name: 'Financeiro', value: 25 },
  { name: 'Gestão', value: 20 },
  { name: 'RH', value: 15 },
  { name: 'TI', value: 10 },
];

export default function Checklist() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const stats = [
    {
      name: 'Total de Itens',
      value: '100',
      change: '+15%',
      changeType: 'positive',
      icon: ClipboardDocumentCheckIcon,
    },
    {
      name: 'Itens Pendentes',
      value: '30',
      change: '-5%',
      changeType: 'negative',
      icon: ClockIcon,
    },
    {
      name: 'Taxa de Conclusão',
      value: '85%',
      change: '+5%',
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
            Checklist Mensal
          </h1>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar item..."
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
              <option value="pending">Pendentes</option>
              <option value="in_progress">Em Andamento</option>
              <option value="completed">Concluídos</option>
            </select>
            <button className="btn-primary">
              <PlusIcon className="h-5 w-5 mr-2" />
              Novo Item
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
                    dataKey="total"
                    stroke="#22C55E"
                    name="Total de Itens"
                  />
                  <Line
                    type="monotone"
                    dataKey="concluidas"
                    stroke="#3B82F6"
                    name="Itens Concluídos"
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
                  <Bar
                    dataKey="value"
                    fill="#8884d8"
                    name="Quantidade"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Checklist List */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Lista de Itens
            </h3>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Vencimento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Responsável
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Progresso
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {checklistData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <ClipboardDocumentCheckIcon className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {item.description}
                          </div>
                          <div className="flex items-center mt-1">
                            <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {item.frequency}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === 'concluido'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : item.status === 'em_andamento'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}
                      >
                        {item.status === 'concluido'
                          ? 'Concluído'
                          : item.status === 'em_andamento'
                          ? 'Em Andamento'
                          : 'Pendente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(item.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <UserGroupIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          {item.assignedTo}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            item.progress === 100
                              ? 'bg-green-500'
                              : item.progress > 50
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {item.progress}%
                      </div>
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