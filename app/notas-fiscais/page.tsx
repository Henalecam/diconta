'use client';

import MainLayout from '../components/MainLayout';
import { useTheme } from '../providers';
import {
  DocumentDuplicateIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  DocumentTextIcon,
  UserIcon,
  FolderIcon,
  TagIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ShareIcon,
  ArrowUpTrayIcon,
  DocumentMagnifyingGlassIcon,
  LinkIcon,
  CloudArrowUpIcon,
  DocumentCheckIcon,
  DocumentArrowUpIcon,
  DocumentArrowDownIcon,
  ArrowPathIcon,
  ChartBarIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  DocumentIcon,
  ClipboardDocumentCheckIcon,
  DocumentChartBarIcon,
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
} from 'recharts';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

// Dados de exemplo
const notasFiscais = [
  {
    id: 1,
    numero: 'NF-2024-001',
    cliente: 'Empresa ABC Ltda',
    data: '2024-04-14',
    valor: 2500.00,
    status: 'Emitida',
    tipo: 'Entrada',
    prazo: '2024-04-30',
    prioridade: 'Alta',
    xml: 'NF-2024-001.xml',
    danfe: 'NF-2024-001.pdf',
    validacao: {
      status: 'Aprovada',
      data: '2024-04-14 10:30',
      observacoes: 'Nota fiscal validada com sucesso',
    },
    sefaz: {
      status: 'Autorizada',
      protocolo: '123456789',
      data: '2024-04-14 10:35',
    },
  },
  // ... mais notas fiscais
];

const evolucaoMensal = [
  { mes: 'Jan', emitidas: 50, canceladas: 5, pendentes: 10 },
  { mes: 'Fev', emitidas: 45, canceladas: 3, pendentes: 8 },
  { mes: 'Mar', emitidas: 60, canceladas: 4, pendentes: 12 },
  { mes: 'Abr', emitidas: 55, canceladas: 2, pendentes: 5 },
];

const distribuicaoTipo = [
  { tipo: 'Entrada', quantidade: 25 },
  { tipo: 'Saída', quantidade: 20 },
  { tipo: 'Serviço', quantidade: 15 },
  { tipo: 'Outros', quantidade: 10 },
];

// Add new data for batch processing
const lotesProcessamento = [
  {
    id: 1,
    nome: 'Lote 001',
    quantidade: 50,
    status: 'Processado',
    data: '2024-04-14',
    sucesso: 48,
    falhas: 2,
    tempo: '2h 30min',
  },
  // ... mais lotes
];

// Add new data for SEFAZ status
const statusSefaz = [
  {
    id: 1,
    nota: 'NF-2024-001',
    status: 'Autorizada',
    protocolo: '123456789',
    data: '2024-04-14 10:35',
    mensagem: 'Nota fiscal autorizada com sucesso',
  },
  // ... mais status
];

// Add new data for detailed statistics
const estatisticasDetalhadas = {
  total: {
    valor: 1250,
    variacao: '+15%',
    valorTotal: 'R$ 4.8M',
    variacaoValor: '+12%',
  },
  pendentes: {
    quantidade: 25,
    variacao: '-5%',
    valor: 'R$ 120K',
    prazoMedio: '3 dias',
  },
  validacao: {
    taxa: '98%',
    variacao: '+2%',
    erros: 3,
    variacaoErros: '-1',
  },
  sefaz: {
    status: 'Ativo',
    disponibilidade: '100%',
    ultimaSincronizacao: '10:35',
    tempoResposta: '0.8s',
  },
};

// Add new data for detailed charts
const evolucaoFinanceira = [
  { mes: 'Jan', receita: 1200000, despesa: 800000, lucro: 400000 },
  { mes: 'Fev', receita: 1300000, despesa: 850000, lucro: 450000 },
  { mes: 'Mar', receita: 1500000, despesa: 900000, lucro: 600000 },
  { mes: 'Abr', receita: 1400000, despesa: 950000, lucro: 450000 },
];

const distribuicaoStatus = [
  { status: 'Autorizada', quantidade: 1000, valor: 'R$ 3.8M' },
  { status: 'Pendente', quantidade: 25, valor: 'R$ 120K' },
  { status: 'Cancelada', quantidade: 15, valor: 'R$ 60K' },
  { status: 'Rejeitada', quantidade: 10, valor: 'R$ 40K' },
];

const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#6366F1'];

// Add new data for XML validation
const xmlValidationRules = [
  {
    id: 1,
    nome: 'Validação de CNPJ',
    status: 'Aprovado',
    detalhes: 'CNPJ válido e ativo',
  },
  {
    id: 2,
    nome: 'Validação de Chave',
    status: 'Aprovado',
    detalhes: 'Chave de acesso válida',
  },
  {
    id: 3,
    nome: 'Validação de Assinatura',
    status: 'Aprovado',
    detalhes: 'Assinatura digital válida',
  },
  {
    id: 4,
    nome: 'Validação de XML',
    status: 'Aprovado',
    detalhes: 'XML bem formado e válido',
  },
];

// Add type definitions
interface Produto {
  codigo: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

interface XMLDetails {
  numero: string;
  dataEmissao: string;
  valor: number;
  emitente: {
    nome: string;
    cnpj: string;
    endereco: string;
  };
  destinatario: {
    nome: string;
    cnpj: string;
    endereco: string;
  };
  produtos: Produto[];
  impostos: {
    icms: number;
    pis: number;
    cofins: number;
    total: number;
  };
  informacoesAdicionais: {
    observacoes: string;
    pedido: string;
    vendedor: string;
  };
}

// Add default values for XML details
const defaultXMLDetails: XMLDetails = {
  numero: 'NF-2024-001',
  dataEmissao: '2024-04-14 10:30',
  valor: 2500.00,
  emitente: {
    nome: 'Empresa ABC Ltda',
    cnpj: '12.345.678/0001-90',
    endereco: 'Rua Exemplo, 123 - São Paulo/SP',
  },
  destinatario: {
    nome: 'Comércio XYZ S.A.',
    cnpj: '98.765.432/0001-10',
    endereco: 'Av. Teste, 456 - Rio de Janeiro/RJ',
  },
  produtos: [
    {
      codigo: '001',
      descricao: 'Produto A',
      quantidade: 10,
      valorUnitario: 100.00,
      valorTotal: 1000.00,
    },
    {
      codigo: '002',
      descricao: 'Produto B',
      quantidade: 15,
      valorUnitario: 100.00,
      valorTotal: 1500.00,
    },
  ],
  impostos: {
    icms: 450.00,
    pis: 16.25,
    cofins: 75.00,
    total: 541.25,
  },
  informacoesAdicionais: {
    observacoes: 'Nota fiscal referente a pedido #12345',
    pedido: '12345',
    vendedor: 'João Silva',
  },
};

// Add new data for batch processing details
const batchProcessingDetails = {
  total: {
    arquivos: 50,
    processados: 48,
    pendentes: 2,
    tempoTotal: '2h 30min',
  },
  status: {
    sucesso: 48,
    falhas: 2,
    taxaSucesso: '96%',
  },
  arquivos: [
    {
      nome: 'NF-2024-001.xml',
      status: 'Processado',
      data: '2024-04-14 10:30',
      tamanho: '45KB',
      validacao: 'Aprovado',
    },
    {
      nome: 'NF-2024-002.xml',
      status: 'Processado',
      data: '2024-04-14 10:31',
      tamanho: '52KB',
      validacao: 'Aprovado',
    },
    {
      nome: 'NF-2024-003.xml',
      status: 'Falha',
      data: '2024-04-14 10:32',
      tamanho: '48KB',
      validacao: 'Rejeitado',
      erro: 'XML mal formado',
    },
  ],
};

// Add new data for SEFAZ integration
const sefazIntegration = {
  status: {
    online: true,
    ultimaVerificacao: '2024-04-14 10:35',
    tempoResposta: '0.8s',
    disponibilidade: '100%',
  },
  autorizacoes: [
    {
      nota: 'NF-2024-001',
      status: 'Autorizada',
      protocolo: '123456789',
      data: '2024-04-14 10:35',
      mensagem: 'Nota fiscal autorizada com sucesso',
    },
    {
      nota: 'NF-2024-002',
      status: 'Autorizada',
      protocolo: '123456790',
      data: '2024-04-14 10:36',
      mensagem: 'Nota fiscal autorizada com sucesso',
    },
    {
      nota: 'NF-2024-003',
      status: 'Rejeitada',
      protocolo: '123456791',
      data: '2024-04-14 10:37',
      mensagem: 'Erro na validação do XML',
    },
  ],
  estatisticas: {
    autorizadas: 48,
    rejeitadas: 2,
    taxaAutorizacao: '96%',
    tempoMedio: '1.2s',
  },
};

export default function NotasFiscais() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [uploadedXml, setUploadedXml] = useState<File | null>(null);
  const [xmlContent, setXmlContent] = useState<string | null>(null);
  const [xmlDetails, setXmlDetails] = useState<XMLDetails>(defaultXMLDetails);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedXml(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        setXmlContent(content);
        
        // Simulate XML parsing (in a real app, you'd use an XML parser)
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(content, "text/xml");
          
          // Extract relevant information with all required properties
          const details: XMLDetails = {
            numero: xmlDoc.querySelector("nNF")?.textContent || defaultXMLDetails.numero,
            dataEmissao: xmlDoc.querySelector("dhEmi")?.textContent || defaultXMLDetails.dataEmissao,
            valor: parseFloat(xmlDoc.querySelector("vNF")?.textContent || defaultXMLDetails.valor.toString()),
            emitente: {
              nome: xmlDoc.querySelector("xNome")?.textContent || defaultXMLDetails.emitente.nome,
              cnpj: xmlDoc.querySelector("CNPJ")?.textContent || defaultXMLDetails.emitente.cnpj,
              endereco: defaultXMLDetails.emitente.endereco, // Default value as this might not be in XML
            },
            destinatario: {
              nome: xmlDoc.querySelector("xNome")?.textContent || defaultXMLDetails.destinatario.nome,
              cnpj: xmlDoc.querySelector("CNPJ")?.textContent || defaultXMLDetails.destinatario.cnpj,
              endereco: defaultXMLDetails.destinatario.endereco, // Default value as this might not be in XML
            },
            produtos: Array.from(xmlDoc.querySelectorAll("prod")).map(prod => ({
              codigo: prod.querySelector("cProd")?.textContent || '',
              descricao: prod.querySelector("xProd")?.textContent || '',
              quantidade: parseFloat(prod.querySelector("qCom")?.textContent || '0'),
              valorUnitario: parseFloat(prod.querySelector("vUnCom")?.textContent || '0'),
              valorTotal: parseFloat(prod.querySelector("vProd")?.textContent || '0'),
            })),
            impostos: defaultXMLDetails.impostos, // Use default values for taxes
            informacoesAdicionais: defaultXMLDetails.informacoesAdicionais, // Use default values for additional info
          };
          
          setXmlDetails(details);
        } catch (error) {
          console.error("Error parsing XML:", error);
          // If parsing fails, use default values
          setXmlDetails(defaultXMLDetails);
        }
      };
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/xml': ['.xml'],
    },
    multiple: false
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Notas Fiscais
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gerencie e acompanhe todas as notas fiscais do seu escritório
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
              Nova Nota Fiscal
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
              <CloudArrowUpIcon className="h-5 w-5 mr-2" />
              Processar Lote
            </button>
          </div>
        </div>

        {/* Estatísticas Detalhadas */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total de Notas */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentTextIcon className="h-6 w-6 text-indigo-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total de Notas
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {estatisticasDetalhadas.total.valor}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>{estatisticasDetalhadas.total.variacao}</span>
                      </div>
                    </dd>
                    <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Valor Total: {estatisticasDetalhadas.total.valorTotal}
                      <span className="ml-2 text-green-600">
                        {estatisticasDetalhadas.total.variacaoValor}
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Pendentes */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Pendentes
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {estatisticasDetalhadas.pendentes.quantidade}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                        <span>{estatisticasDetalhadas.pendentes.variacao}</span>
                      </div>
                    </dd>
                    <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Valor: {estatisticasDetalhadas.pendentes.valor}
                      <span className="ml-2">• Prazo Médio: {estatisticasDetalhadas.pendentes.prazoMedio}</span>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Validação */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Taxa de Validação
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {estatisticasDetalhadas.validacao.taxa}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>{estatisticasDetalhadas.validacao.variacao}</span>
                      </div>
                    </dd>
                    <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Erros Hoje: {estatisticasDetalhadas.validacao.erros}
                      <span className="ml-2 text-green-600">
                        {estatisticasDetalhadas.validacao.variacaoErros}
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* SEFAZ */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentCheckIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      SEFAZ Online
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {estatisticasDetalhadas.sefaz.status}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>{estatisticasDetalhadas.sefaz.disponibilidade}</span>
                      </div>
                    </dd>
                    <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Última Sinc: {estatisticasDetalhadas.sefaz.ultimaSincronizacao}
                      <span className="ml-2">• Tempo: {estatisticasDetalhadas.sefaz.tempoResposta}</span>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos Detalhados */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Evolução Financeira */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Evolução Financeira
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evolucaoFinanceira}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="receita" stroke="#10B981" name="Receita" />
                  <Line type="monotone" dataKey="despesa" stroke="#EF4444" name="Despesa" />
                  <Line type="monotone" dataKey="lucro" stroke="#3B82F6" name="Lucro" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribuição por Status */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Distribuição por Status
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribuicaoStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="quantidade"
                    nameKey="status"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {distribuicaoStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* XML Upload and Validation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
            }`}
          >
            <input {...getInputProps()} />
            <DocumentMagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isDragActive
                ? 'Solte o arquivo XML aqui...'
                : 'Arraste e solte o arquivo XML aqui, ou clique para selecionar'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Apenas arquivos XML
            </p>
          </div>

          {/* XML Validation Results */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Resultados da Validação
            </h3>
            <div className="space-y-4">
              {xmlValidationRules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`h-2 w-2 rounded-full mr-2 ${
                      rule.status === 'Aprovado'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`} />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {rule.nome}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {rule.detalhes}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* XML Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Detalhes da Nota Fiscal
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informações Básicas */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                  Informações Básicas
                </h4>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Número</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{xmlDetails.numero}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Data de Emissão</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{xmlDetails.dataEmissao}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Valor Total</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">R$ {xmlDetails.valor.toFixed(2)}</dd>
                  </div>
                </dl>
              </div>

              {/* Emitente */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                  Emitente
                </h4>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Nome</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{xmlDetails.emitente.nome}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">CNPJ</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{xmlDetails.emitente.cnpj}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Endereço</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{xmlDetails.emitente.endereco}</dd>
                  </div>
                </dl>
              </div>

              {/* Destinatário */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                  Destinatário
                </h4>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Nome</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{xmlDetails.destinatario.nome}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">CNPJ</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{xmlDetails.destinatario.cnpj}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Endereço</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{xmlDetails.destinatario.endereco}</dd>
                  </div>
                </dl>
              </div>

              {/* Produtos */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                  Produtos
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Código
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Descrição
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Qtd
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Valor
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {xmlDetails.produtos.map((produto: Produto, index: number) => (
                        <tr key={index}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {produto.codigo}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {produto.descricao}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {produto.quantidade}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            R$ {produto.valorUnitario.toFixed(2)}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            R$ {produto.valorTotal.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Impostos */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                  Impostos
                </h4>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">ICMS</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">R$ {xmlDetails.impostos.icms.toFixed(2)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">PIS</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">R$ {xmlDetails.impostos.pis.toFixed(2)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">COFINS</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">R$ {xmlDetails.impostos.cofins.toFixed(2)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Impostos</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">R$ {xmlDetails.impostos.total.toFixed(2)}</dd>
                  </div>
                </dl>
              </div>

              {/* Informações Adicionais */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                  Informações Adicionais
                </h4>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Observações</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{xmlDetails.informacoesAdicionais.observacoes}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Pedido</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{xmlDetails.informacoesAdicionais.pedido}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Vendedor</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{xmlDetails.informacoesAdicionais.vendedor}</dd>
                  </div>
                </dl>
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
                  <Line type="monotone" dataKey="emitidas" stroke="#8884d8" name="Emitidas" />
                  <Line type="monotone" dataKey="canceladas" stroke="#ff7300" name="Canceladas" />
                  <Line type="monotone" dataKey="pendentes" stroke="#82ca9d" name="Pendentes" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Distribuição por Tipo
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distribuicaoTipo}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tipo" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantidade" fill="#8884d8" name="Quantidade" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Lotes de Processamento */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Lotes de Processamento
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Lote
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Quantidade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Sucesso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Falhas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tempo
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {lotesProcessamento.map((lote) => (
                  <tr key={lote.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {lote.nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {lote.quantidade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        lote.status === 'Processado'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {lote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {lote.data}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {lote.sucesso}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {lote.falhas}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {lote.tempo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status SEFAZ */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Status SEFAZ
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Nota Fiscal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Protocolo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Mensagem
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {statusSefaz.map((status) => (
                  <tr key={status.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {status.nota}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        status.status === 'Autorizada'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {status.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {status.protocolo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {status.data}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {status.mensagem}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Batch Processing Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Detalhes do Processamento em Lote
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Total de Arquivos
                </h4>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {batchProcessingDetails.total.arquivos}
                  </p>
                  <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    ({batchProcessingDetails.total.processados} processados)
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Taxa de Sucesso
                </h4>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {batchProcessingDetails.status.taxaSucesso}
                  </p>
                  <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    ({batchProcessingDetails.status.sucesso} sucessos)
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Tempo Total
                </h4>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {batchProcessingDetails.total.tempoTotal}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Arquivo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Tamanho
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Validação
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Erro
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {batchProcessingDetails.arquivos.map((arquivo, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {arquivo.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          arquivo.status === 'Processado'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {arquivo.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {arquivo.data}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {arquivo.tamanho}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          arquivo.validacao === 'Aprovado'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {arquivo.validacao}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {arquivo.erro || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SEFAZ Integration */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Integração SEFAZ
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Status
                </h4>
                <div className="flex items-center">
                  <span className={`h-2 w-2 rounded-full mr-2 ${
                    sefazIntegration.status.online
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`} />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {sefazIntegration.status.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Última Verificação
                </h4>
                <p className="text-sm text-gray-900 dark:text-white">
                  {sefazIntegration.status.ultimaVerificacao}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Tempo de Resposta
                </h4>
                <p className="text-sm text-gray-900 dark:text-white">
                  {sefazIntegration.status.tempoResposta}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Disponibilidade
                </h4>
                <p className="text-sm text-gray-900 dark:text-white">
                  {sefazIntegration.status.disponibilidade}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Nota Fiscal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Protocolo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Mensagem
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {sefazIntegration.autorizacoes.map((autorizacao, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {autorizacao.nota}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          autorizacao.status === 'Autorizada'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {autorizacao.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {autorizacao.protocolo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {autorizacao.data}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {autorizacao.mensagem}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Notas Autorizadas
                </h4>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {sefazIntegration.estatisticas.autorizadas}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Notas Rejeitadas
                </h4>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {sefazIntegration.estatisticas.rejeitadas}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Taxa de Autorização
                </h4>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {sefazIntegration.estatisticas.taxaAutorizacao}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Tempo Médio
                </h4>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {sefazIntegration.estatisticas.tempoMedio}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Notas Fiscais */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Lista de Notas Fiscais
              </h3>
              <div className="flex space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar nota fiscal..."
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
                  <option value="emitida">Emitidas</option>
                  <option value="pendente">Pendentes</option>
                  <option value="cancelada">Canceladas</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Número
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Prazo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {notasFiscais.map((nota) => (
                  <tr key={nota.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {nota.numero}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {nota.cliente}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {nota.data}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      R$ {nota.valor.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        nota.status === 'Emitida'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : nota.status === 'Pendente'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {nota.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {nota.tipo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {nota.prazo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300">
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                          <ShareIcon className="h-5 w-5" />
                        </button>
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