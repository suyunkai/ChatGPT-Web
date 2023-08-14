import useDocumentResize from '@/hooks/useDocumentResize';
import styles from './index.module.less';

// function Reminder(){
//     const { width } = useDocumentResize()
//     const list = [
//         {
//             id: 'zhichangzhuli',
//             icon: 'https://www.imageoss.com/images/2023/04/23/Frame2x11dd9e54d8caafc4b2.png',
//             name: '职场助理',
//             desc: '作为手机斗地主游戏的产品经理，该如何做成国内爆款？'
//         },
//         {
//             id: 'dianyingjiaoben',
//             icon: 'https://www.imageoss.com/images/2023/04/23/Frame2x12ff8d52b031b85fbe.png',
//             name: '电影脚本',
//             desc: '写一段电影脚本，讲一个北漂草根创业逆袭的故事'
//         },
//         {
//             id: 'cuanxieduanwen',
//             icon: 'https://www.imageoss.com/images/2023/04/23/Frame2x132f6276a56cf44e81.png',
//             name: '撰写短文',
//             desc: '写一篇短文，用故事阐释幸福的意义'
//         },{
//             id: 'daimabianxie',
//             icon: 'https://www.imageoss.com/images/2023/04/23/Frame2x14a0f6c48d4355c6ea.png',
//             name: '代码编写',
//             desc: '使用JavaScript写一个获取随机数的函数'
//         }
//     ]

    return (
<div className={styles.reminder}>
{/*      {import.meta.env.VITE_APP_TITLE} */}
        <h2 className={styles.reminder_title}><img src="https://www.imageoss.com/images/2023/04/23/robot-logo4987eb2ca3f5ec85.png" alt="" />欢迎来到ChatGpt</h2>
{/*         <p className={styles.reminder_message}>与AI智能聊天，畅想无限可能！基于先进的AI引擎，让你的交流更加智能、高效、便捷！</p> */}
        <p className={styles.reminder_message}><span>Shift</span> + <span>Enter</span> 换行。开头输入 <span>/</span> 召唤 Prompt 角色预设。</p>
        <p className={styles.reminder_message}>使用前请在右下角选择AI模型（默认为GPT-4），以下为各模型的能力及特点：</p>
        <p className={styles.reminder_message}>GPT-4：能力稍弱于官方GPT-4，稳定性相对较高，适合日常使用。</p>
        <p className={styles.reminder_message}>GPT-4-32K：在普通GPT-4模型的基础上，有更长的上下文记录长度，最长能记录约2万字以上。</p>
        <p className={styles.reminder_message}>GPT-4-备用：仅作为备用，日常不要使用。如果需要能力更强的GPT-4，请移步ChatGPT备用服务。</p>
        <p className={styles.reminder_message}>GPT-3.5：最普通的ChatGPT模型，回复速度快，能力一般。</p>
        <p className={styles.reminder_message}>GPT-3.5-16K：比普通GPT-3.5的上下文记录长度更长，能记录1万字以上内容，回复速度快，能力一般。</p>
        <p className={styles.reminder_message}>联网GPT：能够联网搜索资料的GPT-4，需要联网搜索时候可尝试使用。</p>
        <p className={styles.reminder_message}>Claude 2：另一个强大的大语言模型，跟ChatGPT的能力不相上下，优点是能记录数万字的超长上下文。</p>
        <p className={styles.reminder_message}>使用过程中有任何疑问，请钉钉@苏云凯，将在第一时间为您解决问题。</p>
    

    
    
    
        <div className={styles.reminder_question}>
            {
               width > 600 && list.map((item)=>{
                    return (
<div key={item.id} className={styles.reminder_question_item}>
                        <img src={item.icon} alt="" />
                        <h3>{item.name}</h3>
                        <p>{item.desc}</p>
</div>
)
                })
            }

        </div>
</div>
);
}

export default Reminder;
