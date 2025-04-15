'use client';

import { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { useTheme } from '../providers';
import {
  DocumentCheckIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CalendarIcon,
  PencilIcon,
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
const documentsData = [
  {
    id: 1,
    title: 'Contrato de Prestação de Serviços',
    type: 'contrato',
    status: 'pendente',
    dueDate: '2024-03-15',
    author: 'João Silva',
    department: 'Jurídico',
    signers: 3,
    progress: 66,
  },
  {
    id: 2,
    title: 'Termo de Confidencialidade',
    type: 'termo',
    status: 'assinado',
    dueDate: '2024-03-14',
    author: 'Maria Santos',
    department: 'RH',
    signers: 2,
    progress: 100,
  },
  {
    id: 3,
    title: 'Proposta Comercial',
    type: 'proposta',
    status: 'em_andamento',
    dueDate: '2024-03-20',
    author: 'Pedro Oliveira',
    department: 'Comercial',
    signers: 4,
    progress: 25,
  },
];

const monthlyData = [
  { name: 'Jan', enviados: 15, assinados: 12 },
  { name: 'Fev', enviados: 18, assinados: 15 },
  { name: 'Mar', enviados: 20, assinados: 18 },
  { name: 'Abr', enviados: 16, assinados: 14 },
  { name: 'Mai', enviados: 22, assinados: 20 },
  { name: 'Jun', enviados: 25, assinados: 23 },
];

const typeData = [
  { name: 'Contratos', value: 30 },
  { name: 'Termos', value: 25 },
  { name: 'Propostas', value: 20 },
  { name: 'Outros', value: 15 },
];

export default function Assinatura() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const stats = [
    {
      name: 'Total de Documentos',
      value: '100',
      change: '+15%',
      changeType: 'positive',
      icon: DocumentTextIcon,
    },
    {
      name: 'Documentos Pendentes',
      value: '30',
      change: '-5%',
      changeType: 'negative',
      icon: ClockIcon,
    },
    {
      name: 'Taxa de Assinatura',
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
            Assinatura Digital
          </h1>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar documento..."
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
              <option value="signed">Assinados</option>
            </select>
            <button className="btn-primary">
              <PlusIcon className="h-5 w-5 mr-2" />
              Novo Documento
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
                    dataKey="enviados"
                    stroke="#22C55E"
                    name="Documentos Enviados"
                  />
                  <Line
                    type="monotone"
                    dataKey="assinados"
                    stroke="#3B82F6"
                    name="Documentos Assinados"
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
                    name="Quantidade"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Lista de Documentos
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
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Vencimento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Autor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Progresso
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {documentsData.map((document) => (
                  <tr key={document.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <DocumentTextIcon className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {document.title}
                          </div>
                          <div className="flex items-center mt-1">
                            <UserGroupIcon className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {document.signers} signatários
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {document.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          document.status === 'assinado'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : document.status === 'em_andamento'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}
                      >
                        {document.status === 'assinado'
                          ? 'Assinado'
                          : document.status === 'em_andamento'
                          ? 'Em Andamento'
                          : 'Pendente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(document.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <UserGroupIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="ml-2">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {document.author}
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500">
                            {document.department}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            document.progress === 100
                              ? 'bg-green-500'
                              : document.progress > 50
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${document.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {document.progress}%
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