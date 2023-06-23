import { chatStore, configStore } from '@/store'
import { configAsync } from '@/store/async'
import { useEffect, useLayoutEffect } from 'react'
import LoginModal from '../LoginModal'
import ConfigModal from '../ConfigModal'
import { userStore } from '@/store'
import { notification } from 'antd'
import React from 'react'
import { getRooms, chatHistory } from '@/request/api'
import { ChatGpt, ChatsInfo } from '@/types'

type Props = {
  children: React.ReactElement
}


function Global(props: Props) {
  const { models, config, configModal, changeConfig, setConfigModal, notifications } = configStore()
  const { token, loginModal, setLoginModal } = userStore()
  const { chats, addChat, updateChats, changeSelectChatId } = chatStore()
  
  const openNotification = ({
    key,
    title,
    content
  }: {
    key: string | number
    title: string
    content: string
  }) => {
    return notification.open({
      key,
      message: title,
      description: (
        <div
          dangerouslySetInnerHTML={{
            __html: content
          }}
        />
      ),
      onClick: () => {
        console.log('Notification Clicked!')
      }
    })
  }

  function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function onOpenNotifications() {
    for (const item of notifications) {
      openNotification({
        key: item.id,
        title: item.title,
        content: item.content
      })
	  await delay(500)
    }
  }

  async function getMysqlChats(): Promise<Array<ChatsInfo>> {
    return new Promise((resolve, reject) => {
      getRooms().then(roomsResult => {
        if(roomsResult.code !== -1 && roomsResult.data.count >= 1){
          let mysqlChats: Array<ChatsInfo> = [];
          let promises: Array<Promise<void>> = [];
          roomsResult.data.rows.forEach(roomElement => {
            let chatInfo: ChatsInfo = {
              path: roomElement.room_id,
              id: roomElement.room_id,
              name: roomElement.title,
              data: []
            };
            let gptInfoArr : Array<ChatGpt> = [];
            let promise = chatHistory({roomId: roomElement.room_id}).then(messageResult => {
              messageResult.data.rows.forEach(messageElement => {
                let gptInfo: ChatGpt = {
                  id: messageElement.message_id,
                  text: messageElement.content,
                  dateTime: messageElement.create_time,
                  status: 'pass' ,
                  role: messageElement.role,
                  requestOptions: {
                    prompt: messageElement.content,
                    options: {
                      model: messageElement.model,
                      temperature: messageElement.temperature,
                      presence_penalty: parseFloat(messageElement.presence_penalty),
                      frequency_penalty: messageElement.frequency_penalty,
                      max_tokens: messageElement.max_tokens,
                    },
                    parentMessageId: messageElement.parent_message_id,
                    selectChatIdStr: messageElement.room_id,
                    userMessageId: messageElement.message_id,
                    assistantMessageId: messageElement.message_id,
                  },
                }
                gptInfoArr.push(gptInfo)
              })
              chatInfo =  {
                ...chatInfo,
                data: gptInfoArr
              };
              mysqlChats.push(chatInfo);
            });
            promises.push(promise);
          });
          Promise.all(promises).then(() => {
            resolve(mysqlChats);
          }).catch(error => {
            reject(error);
          });
        } else {
          resolve([]);
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  useEffect(() => {
    if (chats.length <= 0) {
      addChat()
    } else {
      // 查找mysql中对话rooms
      getMysqlChats().then(mysqlChats => {
        updateChats(mysqlChats);
      }).catch(error => {
        console.error(error);
      });
      const id = chats[0].id
      changeSelectChatId(id)
    }
	configAsync.fetchConfig()
  }, [])

  useLayoutEffect(()=>{
	onOpenNotifications();
  },[notification])

  return (
    <>
      {props.children}
      <LoginModal
        open={loginModal}
        onCancel={() => {
          setLoginModal(false)
        }}
      />
      <ConfigModal
        open={configModal}
        onCancel={() => {
          setConfigModal(false)
        }}
        models={models}
        onChange={changeConfig}
        data={config}
      />
    </>
  )
}
export default Global
