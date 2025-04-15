'use client';

import MainLayout from '../components/MainLayout';
import { PlusIcon, MagnifyingGlassIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

const transactions = [
  {
    id: 1,
    date: '2024-04-15',
    description: 'Honorários Contábeis - Empresa ABC',
    value: 2500.00,
    type: 'receita',
    category: 'Honorários',
    status: 'Pago'
  },
  {
    id: 2,
    date: '2024-04-14',
    description: 'Aluguel do Escritório',
    value: 1800.00,
    type: 'despesa',
    category: 'Aluguel',
    status: 'Pago'
  },
  {
    id: 3,
    date: '2024-04-13',
    description: 'Honorários Contábeis - Comércio XYZ',
    value: 3200.00,
    type: 'receita',
    category: 'Honorários',
    status: 'Pendente'
  },
  {
    id: 4,
    date: '2024-04-12',
    description: 'Material de Escritório',
    value: 450.00,
    type: 'despesa',
    category: 'Materiais',
    status: 'Pago'
  }
];

export default function Lancamentos() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Lançamentos</h1>
          <button className="btn-primary">
            <PlusIcon className="h-5 w-5 mr-2" />
            Novo Lançamento
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Summary Cards */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Resumo do Mês</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400">Receitas</span>
                <span className="text-green-600 dark:text-green-400 font-medium">R$ 5.700,00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400">Despesas</span>
                <span className="text-red-600 dark:text-red-400 font-medium">R$ 2.250,00</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-900 dark:text-white font-medium">Saldo</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">R$ 3.450,00</span>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="card lg:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Calendário</h3>
            <div className="grid grid-cols-7 gap-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  {day}
                </div>
              ))}
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                <div
                  key={day}
                  className={`text-center p-2 rounded-lg ${
                    day === 15
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="input pl-10"
                placeholder="Buscar lançamentos..."
              />
            </div>
            <div className="flex space-x-4">
              <select className="input">
                <option>Tipo</option>
                <option>Receita</option>
                <option>Despesa</option>
              </select>
              <select className="input">
                <option>Status</option>
                <option>Pago</option>
                <option>Pendente</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {transaction.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {transaction.type === 'receita' ? (
                          <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm font-medium ${
                          transaction.type === 'receita'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          R$ {transaction.value.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.status === 'Pago'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {transaction.status}
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