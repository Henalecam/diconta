'use client';

import { useState, useCallback } from 'react';
import MainLayout from '../components/MainLayout';
import { useTheme } from '../providers';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  CalendarIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DocumentTextIcon,
  UserIcon,
  FolderIcon,
  TagIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ShareIcon,
  DocumentDuplicateIcon,
  ArrowUpTrayIcon,
  DocumentMagnifyingGlassIcon,
  LinkIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
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
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  assignee: string;
  dependencies: string[];
}

interface KanbanColumn {
  id: string;
  title: string;
  tasks: Task[];
}

interface KanbanColumns {
  [key: string]: KanbanColumn;
}

// Dados de exemplo
const tarefas = [
  {
    id: 1,
    titulo: 'Desenvolvimento do Módulo Financeiro',
    descricao: 'Implementar funcionalidades de gestão financeira',
    prioridade: 'Alta',
    status: 'Em Andamento',
    dataCriacao: '2024-04-14',
    dataPrevista: '2024-04-20',
    responsavel: 'João Silva',
    progresso: 60,
    tempoEstimado: '40h',
    tempoGasto: '24h',
    dependencias: [2, 3],
    etiquetas: ['Desenvolvimento', 'Financeiro', 'Urgente'],
  },
  // ... mais tarefas
];

const evolucaoMensal = [
  { mes: 'Jan', criadas: 50, concluidas: 40, atrasadas: 5 },
  { mes: 'Fev', criadas: 45, concluidas: 35, atrasadas: 3 },
  { mes: 'Mar', criadas: 60, concluidas: 50, atrasadas: 4 },
  { mes: 'Abr', criadas: 55, concluidas: 45, atrasadas: 2 },
];

const distribuicaoPrioridade = [
  { prioridade: 'Alta', quantidade: 25 },
  { prioridade: 'Média', quantidade: 20 },
  { prioridade: 'Baixa', quantidade: 15 },
];

// Add new data for Kanban board
const kanbanColumns: KanbanColumns = {
  'todo': {
    id: 'todo',
    title: 'A Fazer',
    tasks: [
      {
        id: '1',
        title: 'Implementar login',
        description: 'Criar sistema de autenticação',
        priority: 'high',
        dueDate: '2024-03-15',
        assignee: 'João Silva',
        dependencies: ['2'],
      },
      {
        id: '2',
        title: 'Criar banco de dados',
        description: 'Estruturar tabelas principais',
        priority: 'medium',
        dueDate: '2024-03-10',
        assignee: 'Maria Santos',
        dependencies: [],
      },
    ],
  },
  'in-progress': {
    id: 'in-progress',
    title: 'Em Andamento',
    tasks: [
      {
        id: '3',
        title: 'Desenvolver API',
        description: 'Implementar endpoints principais',
        priority: 'high',
        dueDate: '2024-03-20',
        assignee: 'Pedro Oliveira',
        dependencies: ['1'],
      },
    ],
  },
  'done': {
    id: 'done',
    title: 'Concluído',
    tasks: [
      {
        id: '4',
        title: 'Design do sistema',
        description: 'Criar wireframes e protótipos',
        priority: 'low',
        dueDate: '2024-03-05',
        assignee: 'Ana Costa',
        dependencies: [],
      },
    ],
  },
};

export default function Tarefas() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [columns, setColumns] = useState(kanbanColumns);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const task = sourceColumn.tasks.find(t => t.id === draggableId);

    if (!task) return;

    sourceColumn.tasks.splice(source.index, 1);
    destColumn.tasks.splice(destination.index, 0, task);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourceColumn.tasks,
      },
      [destination.droppableId]: {
        ...destColumn,
        tasks: destColumn.tasks,
      },
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Gestão de Tarefas
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Organize e acompanhe suas tarefas com Kanban e dependências
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
              Todos
            </button>
            <button
              onClick={() => setFilter('todo')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              A Fazer
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FolderIcon className="h-5 w-5 mr-2" />
              Em Andamento
            </button>
            <button
              onClick={() => setFilter('done')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Concluídos
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              <PlusIcon className="h-5 w-5 mr-2" />
              Nova Tarefa
            </button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClipboardDocumentListIcon className="h-6 w-6 text-indigo-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total de Tarefas
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        100
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>+15%</span>
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
                  <ClockIcon className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Tarefas em Andamento
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        30
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>-5%</span>
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
                  <UserGroupIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Taxa de Conclusão
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        85%
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>+5%</span>
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
                  <CalendarIcon className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Tempo Médio de Conclusão
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        3.2 dias
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>-0.5 dias</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Evolução Mensal
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evolucaoMensal}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="criadas" stroke="#8884d8" name="Criadas" />
                  <Line type="monotone" dataKey="concluidas" stroke="#82ca9d" name="Concluídas" />
                  <Line type="monotone" dataKey="atrasadas" stroke="#ff7300" name="Atrasadas" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Distribuição por Prioridade
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distribuicaoPrioridade}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="prioridade" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantidade" fill="#8884d8" name="Quantidade" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Quadro Kanban
          </h3>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.values(columns).map((column: KanbanColumn) => (
                <div key={column.id} className="bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium">{column.title}</h3>
                  </div>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="p-4"
                      >
                        {column.tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4"
                              >
                                <h4 className="font-medium">{task.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {task.description}
                                </p>
                                <div className="mt-2 flex items-center justify-between">
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {task.dueDate}
                                  </span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {task.assignee}
                                  </span>
                                </div>
                                {task.dependencies.length > 0 && (
                                  <div className="mt-2">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      Dependências: {task.dependencies.join(', ')}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </div>

        {/* Lista de Tarefas */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Lista de Tarefas
              </h3>
              <div className="flex space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar tarefa..."
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
                  <option value="todo">A Fazer</option>
                  <option value="in-progress">Em Andamento</option>
                  <option value="done">Concluídos</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tarefa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Prioridade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data Prevista
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Responsável
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Progresso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tempo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Etiquetas
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {tarefas.map((tarefa) => (
                  <tr key={tarefa.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <ClipboardDocumentListIcon className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {tarefa.titulo}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {tarefa.descricao}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        tarefa.prioridade === 'Alta'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : tarefa.prioridade === 'Média'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {tarefa.prioridade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        tarefa.status === 'Concluído'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : tarefa.status === 'Em Andamento'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {tarefa.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {tarefa.dataPrevista}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {tarefa.responsavel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            tarefa.progresso < 30
                              ? 'bg-red-500'
                              : tarefa.progresso < 70
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${tarefa.progresso}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {tarefa.progresso}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <div>Estimado: {tarefa.tempoEstimado}</div>
                        <div>Gasto: {tarefa.tempoGasto}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {tarefa.etiquetas.map((etiqueta) => (
                          <span
                            key={etiqueta}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          >
                            {etiqueta}
                          </span>
                        ))}
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