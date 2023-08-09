import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ChatGptConfig } from '@/types'
import { NotificationInfo } from '@/types/admin'

const VERSION = 'v3';

export interface ConfigState {
  // 配置信息
  config: ChatGptConfig
  // 模型
  models: Array<{
    label: string
    value: string
  }>
  // 配置弹窗开关
  configModal: boolean
  // 修改配置弹窗
  setConfigModal: (value: boolean) => void
  // 修改配置
  changeConfig: (config: ChatGptConfig) => void
  notifications: Array<NotificationInfo>
  shop_introduce: string
  user_introduce: string
  invite_introduce: string
  replaceData: (config: { [key: string]: any }) => void
}

const configStore = create<ConfigState>()(
  persist(
    (set, get) => ({
      configModal: false,
      notifications: [],
      shop_introduce: '',
      user_introduce: '',
      invite_introduce: '',
      models: [
        {
          label: 'GPT-4',
          value: 'gpt-4'
        },
        {
          label: 'GPT-4-32K',
          value: 'gpt-4-32k'
        },
        {
          label: 'GPT-4-备用',
          value: 'gpt-4-32k-0613'
        },
        {
          label: 'GPT-3.5',
          value: 'gpt-3.5-turbo'
        },
        {
          label: 'GPT-3.5-16k',
          value: 'gpt-3.5-turbo-16k'
        },
        {
          label: '联网GPT',
          value: 'gpt-3.5-turbo-16k-0613'
        },
        {
          label: 'Claude 2',
          value: 'gpt-4-0613'
        },
      ],
      config: {
        model: 'gpt-4',
        temperature: 0,
        presence_penalty: 0,
        frequency_penalty: 0,
        max_tokens: 90000
      },
      setConfigModal: (value) => set({ configModal: value }),
      changeConfig: (config) =>
        set((state: ConfigState) => ({
          config: { ...state.config, ...config }
        })),
      replaceData: (data) => set((state: ConfigState) => ({ ...state, ...data }))
    }),
    {
      // 在存储键名中包括版本号
      name: `config_storage_${VERSION}`, // 包括版本号
      storage: createJSONStorage(() => localStorage) // (optional) by default the 'localStorage' is used
    }
  )
)

export default configStore
