'use client';

import MainLayout from '../components/MainLayout';
import { ChartBarIcon, DocumentTextIcon, CalendarIcon } from '@heroicons/react/24/outline';

const reports = [
  {
    id: 1,
    title: 'Relatório Financeiro Mensal',
    type: 'Financeiro',
    period: 'Abril 2024',
    status: 'Gerado',
    lastUpdate: '2024-04-15'
  },
  {
    id: 2,
    title: 'Análise de Clientes',
    type: 'Clientes',
    period: 'Q1 2024',
    status: 'Pendente',
    lastUpdate: '2024-04-10'
  },
  {
    id: 3,
    title: 'Declarações Fiscais',
    type: 'Fiscal',
    period: 'Março 2024',
    status: 'Gerado',
    lastUpdate: '2024-04-05'
  }
];

const metrics = [
  {
    name: 'Faturamento Total',
    value: 'R$ 156.789,00',
    change: '+12.5%',
    trend: 'up'
  },
  {
    name: 'Clientes Ativos',
    value: '128',
    change: '+8',
    trend: 'up'
  },
  {
    name: 'Documentos Pendentes',
    value: '24',
    change: '-5',
    trend: 'down'
  },
  {
    name: 'Tarefas Concluídas',
    value: '156',
    change: '+23',
    trend: 'up'
  }
];

export default function Relatorios() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Relatórios</h1>
          <button className="btn-primary">
            <ChartBarIcon className="h-5 w-5 mr-2" />
            Novo Relatório
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.name} className="card">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {metric.name}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                    {metric.value}
                  </p>
                  <p className={`mt-1 text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {metric.change}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Reports */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Relatórios Recentes
            </h3>
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-6 w-6 text-gray-400 dark:text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {report.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {report.type} • {report.period}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      report.status === 'Gerado'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {report.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                      Visualizar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Dashboard */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Análise de Desempenho
            </h3>
            <div className="space-y-4">
              {/* Placeholder for charts - In a real app, you would use a charting library */}
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Gráfico de Desempenho</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Taxa de Conversão
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                    78%
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Tempo Médio de Resposta
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                    2.5h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Relatórios Agendados
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Relatório
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Frequência
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Próxima Geração
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Destinatários
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-3" />
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        Relatório Financeiro Mensal
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Mensal
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    01/05/2024
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    5 pessoas
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4">
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                      Cancelar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 