'use client';

import MainLayout from '../components/MainLayout';
import { useTheme } from '../providers';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
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
  ComposedChart,
  Scatter,
  ReferenceLine,
} from 'recharts';

// Dados de exemplo para estatísticas
const estatisticas = {
  receita: {
    total: 1250000,
    variacao: '+15%',
    meta: 1500000,
  },
  despesas: {
    total: 850000,
    variacao: '+8%',
    meta: 800000,
  },
  clientes: {
    total: 150,
    novos: 25,
    ativos: 120,
  },
  documentos: {
    total: 450,
    pendentes: 15,
    processados: 435,
  },
};

// Dados para gráficos
const evolucaoFinanceira = [
  { mes: 'Jan', receita: 1000000, despesa: 700000, lucro: 300000 },
  { mes: 'Fev', receita: 1100000, despesa: 750000, lucro: 350000 },
  { mes: 'Mar', receita: 1200000, despesa: 800000, lucro: 400000 },
  { mes: 'Abr', receita: 1300000, despesa: 850000, lucro: 450000 },
  { mes: 'Mai', receita: 1400000, despesa: 900000, lucro: 500000 },
];

const distribuicaoClientes = [
  { segmento: 'Varejo', quantidade: 45, valor: 450000 },
  { segmento: 'Serviços', quantidade: 35, valor: 350000 },
  { segmento: 'Indústria', quantidade: 30, valor: 300000 },
  { segmento: 'Tecnologia', quantidade: 25, valor: 250000 },
  { segmento: 'Outros', quantidade: 15, valor: 150000 },
];

const desempenhoMensal = [
  { mes: 'Jan', meta: 100, realizado: 95, tendencia: 90 },
  { mes: 'Fev', meta: 100, realizado: 98, tendencia: 95 },
  { mes: 'Mar', meta: 100, realizado: 102, tendencia: 100 },
  { mes: 'Abr', meta: 100, realizado: 105, tendencia: 105 },
  { mes: 'Mai', meta: 100, realizado: 110, tendencia: 110 },
];

const indicadoresChave = [
  { nome: 'Satisfação do Cliente', valor: 92, meta: 90, variacao: '+2%' },
  { nome: 'Tempo de Resposta', valor: 85, meta: 80, variacao: '+5%' },
  { nome: 'Taxa de Conversão', valor: 75, meta: 70, variacao: '+5%' },
  { nome: 'Retenção de Clientes', valor: 88, meta: 85, variacao: '+3%' },
];

const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#6366F1', '#8B5CF6'];

// Novos dados para visualizações avançadas
const correlacaoDesempenho = [
  { satisfacao: 85, receita: 1000000, documentos: 100, tarefas: 50 },
  { satisfacao: 88, receita: 1100000, documentos: 120, tarefas: 55 },
  { satisfacao: 90, receita: 1200000, documentos: 140, tarefas: 60 },
  { satisfacao: 92, receita: 1300000, documentos: 160, tarefas: 65 },
  { satisfacao: 95, receita: 1400000, documentos: 180, tarefas: 70 },
];

const insightsInteligentes = [
  {
    titulo: 'Correlação Positiva',
    descricao: 'Aumento de 15% na satisfação do cliente correlaciona com crescimento de 20% na receita',
    impacto: 'Alto',
    acao: 'Manter estratégias de satisfação do cliente',
    icone: 'trending-up',
  },
  {
    titulo: 'Oportunidade Identificada',
    descricao: 'Segmento de tecnologia mostra maior potencial de crescimento',
    impacto: 'Médio',
    acao: 'Aumentar investimentos em marketing digital',
    icone: 'light-bulb',
  },
  {
    titulo: 'Alerta de Performance',
    descricao: 'Tempo médio de resposta aumentou 10% no último mês',
    impacto: 'Baixo',
    acao: 'Revisar processos de atendimento',
    icone: 'alert',
  },
];

const previsoes = [
  { mes: 'Jun', previsao: 1500000, intervaloMin: 1400000, intervaloMax: 1600000 },
  { mes: 'Jul', previsao: 1600000, intervaloMin: 1500000, intervaloMax: 1700000 },
  { mes: 'Ago', previsao: 1700000, intervaloMin: 1600000, intervaloMax: 1800000 },
  { mes: 'Set', previsao: 1800000, intervaloMin: 1700000, intervaloMax: 1900000 },
  { mes: 'Out', previsao: 1900000, intervaloMin: 1800000, intervaloMax: 2000000 },
];

export default function Dashboard() {
  const { theme } = useTheme();

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Visão geral do desempenho e métricas do sistema
            </p>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Receita */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CurrencyDollarIcon className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Receita Total
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        R$ {estatisticas.receita.total.toLocaleString()}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <ArrowUpIcon className="h-4 w-4" />
                        <span>{estatisticas.receita.variacao}</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Despesas */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CurrencyDollarIcon className="h-6 w-6 text-red-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Despesas
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        R$ {estatisticas.despesas.total.toLocaleString()}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                        <ArrowUpIcon className="h-4 w-4" />
                        <span>{estatisticas.despesas.variacao}</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Clientes */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total de Clientes
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {estatisticas.clientes.total}
                      </div>
                    </dd>
                    <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {estatisticas.clientes.ativos} ativos
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Documentos */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentTextIcon className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Documentos
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {estatisticas.documentos.total}
                      </div>
                    </dd>
                    <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {estatisticas.documentos.pendentes} pendentes
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Evolução Financeira */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Evolução Financeira
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={evolucaoFinanceira}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="receita" fill="#10B981" stroke="#10B981" fillOpacity={0.2} name="Receita" />
                  <Area type="monotone" dataKey="despesa" fill="#EF4444" stroke="#EF4444" fillOpacity={0.2} name="Despesa" />
                  <Line type="monotone" dataKey="lucro" stroke="#6366F1" name="Lucro" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribuição de Clientes */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Distribuição de Clientes
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={distribuicaoClientes}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="segmento" />
                  <PolarRadiusAxis />
                  <Radar name="Quantidade" dataKey="quantidade" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  <Radar name="Valor" dataKey="valor" stroke="#6366F1" fill="#6366F1" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Desempenho Mensal */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Desempenho Mensal
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={desempenhoMensal}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine y={100} stroke="#F59E0B" strokeDasharray="3 3" />
                  <Bar dataKey="meta" fill="#F59E0B" fillOpacity={0.2} name="Meta" />
                  <Line type="monotone" dataKey="realizado" stroke="#10B981" name="Realizado" />
                  <Line type="monotone" dataKey="tendencia" stroke="#6366F1" strokeDasharray="3 3" name="Tendência" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Indicadores Chave */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Indicadores Chave
            </h3>
            <div className="space-y-4">
              {indicadoresChave.map((indicador, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {indicador.valor >= indicador.meta ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircleIcon className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {indicador.nome}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Meta: {indicador.meta}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {indicador.valor}%
                    </p>
                    <span className={`ml-2 text-sm font-medium ${
                      indicador.valor >= indicador.meta
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {indicador.variacao}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Novas Visualizações Inteligentes */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Correlação de Desempenho */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Correlação de Desempenho
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={correlacaoDesempenho}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="satisfacao" label={{ value: 'Satisfação (%)', position: 'bottom' }} />
                  <YAxis yAxisId="left" orientation="left" label={{ value: 'Receita (R$)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Atividades', angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Legend />
                  <Scatter yAxisId="left" dataKey="receita" fill="#10B981" name="Receita" />
                  <Scatter yAxisId="right" dataKey="documentos" fill="#6366F1" name="Documentos" />
                  <Scatter yAxisId="right" dataKey="tarefas" fill="#F59E0B" name="Tarefas" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Previsões de Receita */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Previsões de Receita
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={previsoes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="previsao" stroke="#10B981" fill="#10B981" fillOpacity={0.2} name="Previsão" />
                  <Area type="monotone" dataKey="intervaloMax" stroke="#10B981" fill="#10B981" fillOpacity={0.1} name="Intervalo Máximo" />
                  <Area type="monotone" dataKey="intervaloMin" stroke="#10B981" fill="#10B981" fillOpacity={0.1} name="Intervalo Mínimo" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Insights Inteligentes */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Insights Inteligentes
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {insightsInteligentes.map((insight, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {insight.titulo}
                  </h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    insight.impacto === 'Alto' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    insight.impacto === 'Médio' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {insight.impacto}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {insight.descricao}
                </p>
                <div className="flex items-center text-sm text-indigo-600 dark:text-indigo-400">
                  <span className="mr-1">Ação:</span>
                  <span className="font-medium">{insight.acao}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de Performance */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Eficiência Operacional */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Eficiência Operacional
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Processamento de Documentos</span>
                <span className="text-sm font-medium text-green-600">95%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Tempo Médio de Resposta</span>
                <span className="text-sm font-medium text-yellow-600">2.5h</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>

          {/* Satisfação do Cliente */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Satisfação do Cliente
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">NPS</span>
                <span className="text-sm font-medium text-blue-600">+45</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Taxa de Retenção</span>
                <span className="text-sm font-medium text-blue-600">92%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>

          {/* Performance Financeira */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Performance Financeira
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Margem de Lucro</span>
                <span className="text-sm font-medium text-purple-600">32%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">ROI</span>
                <span className="text-sm font-medium text-purple-600">+28%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 