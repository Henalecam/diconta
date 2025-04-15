'use client';

import MainLayout from '../components/MainLayout';
import { useTheme } from '../providers';
import {
  DocumentCheckIcon,
  ClockIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  UserIcon,
  LockClosedIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

// Dados de exemplo para estatísticas
const estatisticasAuditoria = {
  totalEventos: 1250,
  eventosHoje: 45,
  sucesso: 1180,
  falha: 70,
  alertas: 20,
};

// Dados de exemplo para logs de auditoria
const logsAuditoria = [
  {
    id: 1,
    data: '2024-04-14 10:30',
    usuario: 'João Silva',
    acao: 'Login',
    modulo: 'Sistema',
    ip: '192.168.1.100',
    status: 'Sucesso',
    detalhes: 'Login realizado com sucesso',
    nivel: 'info',
  },
  {
    id: 2,
    data: '2024-04-14 10:35',
    usuario: 'Maria Santos',
    acao: 'Alteração de Permissão',
    modulo: 'Permissões',
    ip: '192.168.1.101',
    status: 'Sucesso',
    detalhes: 'Permissão de acesso atualizada para o usuário Pedro',
    nivel: 'info',
  },
  {
    id: 3,
    data: '2024-04-14 10:40',
    usuario: 'Pedro Oliveira',
    acao: 'Tentativa de Acesso',
    modulo: 'Sistema',
    ip: '192.168.1.102',
    status: 'Falha',
    detalhes: 'Senha incorreta após 3 tentativas',
    nivel: 'warning',
  },
  {
    id: 4,
    data: '2024-04-14 10:45',
    usuario: 'Ana Costa',
    acao: 'Exclusão de Documento',
    modulo: 'Documentos',
    ip: '192.168.1.103',
    status: 'Sucesso',
    detalhes: 'Documento "Contrato 2024" excluído',
    nivel: 'info',
  },
  {
    id: 5,
    data: '2024-04-14 10:50',
    usuario: 'Carlos Mendes',
    acao: 'Alteração de Dados',
    modulo: 'Clientes',
    ip: '192.168.1.104',
    status: 'Alerta',
    detalhes: 'Múltiplas tentativas de alteração de dados sensíveis',
    nivel: 'error',
  },
];

// Dados de exemplo para atividades suspeitas
const atividadesSuspeitas = [
  {
    id: 1,
    tipo: 'Acesso Fora do Horário',
    quantidade: 12,
    usuarios: ['João Silva', 'Maria Santos'],
    periodo: 'Últimas 24h',
  },
  {
    id: 2,
    tipo: 'Tentativas de Acesso Falhas',
    quantidade: 25,
    usuarios: ['Pedro Oliveira'],
    periodo: 'Últimas 24h',
  },
  {
    id: 3,
    tipo: 'Alterações em Massa',
    quantidade: 8,
    usuarios: ['Ana Costa'],
    periodo: 'Últimas 24h',
  },
];

const AuditoriaPage = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Logs de Auditoria
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Monitoramento e registro de todas as atividades do sistema
            </p>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total de Eventos */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentCheckIcon className="h-6 w-6 text-indigo-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total de Eventos
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {estatisticasAuditoria.totalEventos}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Eventos Hoje */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Eventos Hoje
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {estatisticasAuditoria.eventosHoje}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Taxa de Sucesso */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ShieldCheckIcon className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Taxa de Sucesso
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {Math.round((estatisticasAuditoria.sucesso / estatisticasAuditoria.totalEventos) * 100)}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Alertas */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Alertas
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {estatisticasAuditoria.alertas}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Atividades Suspeitas */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Atividades Suspeitas
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {atividadesSuspeitas.map((atividade) => (
                <div key={atividade.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {atividade.tipo}
                    </h4>
                    <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full dark:bg-red-900 dark:text-red-200">
                      {atividade.quantidade} ocorrências
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Usuários: {atividade.usuarios.join(', ')}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Período: {atividade.periodo}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Buscar por usuário, ação ou IP..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white w-full"
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
              <option value="all">Todos os Status</option>
              <option value="sucesso">Sucesso</option>
              <option value="falha">Falha</option>
              <option value="alerta">Alerta</option>
            </select>
            <select
              className="pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">Hoje</option>
              <option value="week">Última Semana</option>
              <option value="month">Último Mês</option>
              <option value="year">Último Ano</option>
            </select>
          </div>
        </div>

        {/* Lista de Logs */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Módulo
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
                {logsAuditoria.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {log.data}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <UserIcon className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {log.usuario}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {log.acao}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {log.modulo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {log.ip}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        log.status === 'Sucesso'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : log.status === 'Falha'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {log.detalhes}
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
};

export default AuditoriaPage; 