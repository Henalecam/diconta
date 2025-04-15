'use client';

import { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { useTheme } from '../providers';
import { 
  FaUser, 
  FaPalette, 
  FaBell, 
  FaLanguage, 
  FaKeyboard, 
  FaEye, 
  FaEyeSlash,
  FaCheck
} from 'react-icons/fa';
import { 
  MdOutlineDarkMode, 
  MdOutlineLightMode,
  MdOutlineNotifications,
  MdOutlineNotificationsOff
} from 'react-icons/md';
import { 
  BsFillMoonFill, 
  BsFillSunFill,
  BsTranslate,
  BsKeyboard
} from 'react-icons/bs';

export default function ConfiguracoesUsuario() {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('pt-BR');
  const [keyboardShortcuts, setKeyboardShortcuts] = useState(true);

  const settingsGroups = [
    {
      title: 'Aparência',
      icon: FaPalette,
      settings: [
        {
          name: 'Tema',
          description: 'Escolha entre tema claro ou escuro',
          icon: theme === 'dark' ? BsFillMoonFill : BsFillSunFill,
          action: toggleTheme,
          value: theme === 'dark' ? 'Escuro' : 'Claro'
        },
        {
          name: 'Tamanho da Fonte',
          description: 'Ajuste o tamanho do texto',
          icon: FaEye,
          action: () => {},
          value: 'Médio'
        }
      ]
    },
    {
      title: 'Notificações',
      icon: FaBell,
      settings: [
        {
          name: 'Notificações do Sistema',
          description: 'Receba alertas importantes',
          icon: notifications ? MdOutlineNotifications : MdOutlineNotificationsOff,
          action: () => setNotifications(!notifications),
          value: notifications ? 'Ativado' : 'Desativado'
        }
      ]
    },
    {
      title: 'Idioma e Acessibilidade',
      icon: FaLanguage,
      settings: [
        {
          name: 'Idioma',
          description: 'Selecione o idioma da interface',
          icon: BsTranslate,
          action: () => {},
          value: 'Português (Brasil)'
        },
        {
          name: 'Atalhos de Teclado',
          description: 'Habilite atalhos para navegação rápida',
          icon: BsKeyboard,
          action: () => setKeyboardShortcuts(!keyboardShortcuts),
          value: keyboardShortcuts ? 'Ativado' : 'Desativado'
        }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações do Usuário</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Personalize sua experiência no sistema
          </p>
        </div>

        <div className="space-y-8">
          {settingsGroups.map((group) => (
            <div key={group.title} className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <group.icon className="h-6 w-6 text-gray-500 dark:text-gray-400 mr-3" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {group.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {group.settings.map((setting) => (
                    <div
                      key={setting.name}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <setting.icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {setting.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {setting.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {setting.value}
                        </span>
                        <button
                          onClick={setting.action}
                          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          <FaCheck className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 