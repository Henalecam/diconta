'use client';

import MainLayout from '../components/MainLayout';
import { useTheme } from '../providers';
import {
  UserGroupIcon,
  ShieldCheckIcon,
  DocumentCheckIcon,
  ClockIcon,
  ChartBarIcon,
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { useState } from 'react';

// Dados de exemplo para estatísticas
const estatisticasPermissoes = {
  totalUsuarios: 150,
  totalGrupos: 12,
  totalPermissoes: 45,
  auditoria: {
    totalEventos: 1250,
    eventosHoje: 45,
    eventosSemana: 320,
    eventosMes: 1250,
  },
};

// Dados para gráficos
const evolucaoAcessos = [
  { mes: 'Jan', acessos: 1200, tentativas: 50, bloqueios: 5 },
  { mes: 'Fev', acessos: 1350, tentativas: 45, bloqueios: 3 },
  { mes: 'Mar', acessos: 1500, tentativas: 40, bloqueios: 2 },
  { mes: 'Abr', acessos: 1650, tentativas: 35, bloqueios: 1 },
  { mes: 'Mai', acessos: 1800, tentativas: 30, bloqueios: 0 },
];

const distribuicaoPermissoes = [
  { nome: 'Administrador', quantidade: 5, nivel: 100 },
  { nome: 'Gerente', quantidade: 15, nivel: 80 },
  { nome: 'Operador', quantidade: 50, nivel: 60 },
  { nome: 'Visualizador', quantidade: 80, nivel: 40 },
];

const atividadesAuditoria = [
  {
    id: 1,
    usuario: 'João Silva',
    acao: 'Login',
    data: '2024-04-14 10:30',
    ip: '192.168.1.100',
    status: 'Sucesso',
    detalhes: 'Login realizado com sucesso',
  },
  {
    id: 2,
    usuario: 'Maria Santos',
    acao: 'Alteração de Permissão',
    data: '2024-04-14 10:35',
    ip: '192.168.1.101',
    status: 'Sucesso',
    detalhes: 'Permissão de acesso atualizada',
  },
  {
    id: 3,
    usuario: 'Pedro Oliveira',
    acao: 'Tentativa de Acesso',
    data: '2024-04-14 10:40',
    ip: '192.168.1.102',
    status: 'Falha',
    detalhes: 'Senha incorreta',
  },
];

const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#6366F1', '#8B5CF6'];

export default function Permissoes() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Permissões e Auditoria
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gerencie permissões de usuários e monitore atividades do sistema
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              <PlusIcon className="h-5 w-5 mr-2" />
              Nova Permissão
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
              <UserGroupIcon className="h-5 w-5 mr-2" />
              Gerenciar Grupos
            </button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total de Usuários */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserIcon className="h-6 w-6 text-indigo-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total de Usuários
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {estatisticasPermissoes.totalUsuarios}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Total de Grupos */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total de Grupos
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {estatisticasPermissoes.totalGrupos}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Total de Permissões */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ShieldCheckIcon className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total de Permissões
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {estatisticasPermissoes.totalPermissoes}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Eventos de Auditoria */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentCheckIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Eventos de Auditoria
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {estatisticasPermissoes.auditoria.totalEventos}
                      </div>
                    </dd>
                    <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Hoje: {estatisticasPermissoes.auditoria.eventosHoje}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Evolução de Acessos */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Evolução de Acessos
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={evolucaoAcessos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="acessos" stroke="#10B981" fill="#10B981" fillOpacity={0.2} name="Acessos" />
                  <Area type="monotone" dataKey="tentativas" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} name="Tentativas" />
                  <Area type="monotone" dataKey="bloqueios" stroke="#EF4444" fill="#EF4444" fillOpacity={0.2} name="Bloqueios" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribuição de Permissões */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Distribuição de Permissões
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={distribuicaoPermissoes}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="nome" />
                  <PolarRadiusAxis />
                  <Radar name="Nível" dataKey="nivel" stroke="#6366F1" fill="#6366F1" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Atividades de Auditoria */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Atividades de Auditoria
              </h3>
              <div className="flex space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar atividade..."
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
                <select
                  className="pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">Todos</option>
                  <option value="sucesso">Sucesso</option>
                  <option value="falha">Falha</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    IP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Detalhes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {atividadesAuditoria.map((atividade) => (
                  <tr key={atividade.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {atividade.usuario}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {atividade.acao}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {atividade.data}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {atividade.ip}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        atividade.status === 'Sucesso'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {atividade.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {atividade.detalhes}
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