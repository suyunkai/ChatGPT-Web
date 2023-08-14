import styles from './index.module.less';

function Reminder(){


    return (
<div className={styles.reminder}>
        <h2 className={styles.reminder_title}><img src="https://www.imageoss.com/images/2023/04/23/robot-logo4987eb2ca3f5ec85.png" alt="" />欢迎来到ChatGPT</h2><br/>
        <p className={styles.reminder_message}><span>Shift</span> + <span>Enter</span> 换行。开头输入 <span>/</span> 召唤 Prompt 角色预设。</p><br/>
        <p className={styles.reminder_message}>使用前请在右下角选择AI模型（默认为GPT-4），以下为各模型的能力及特点：</p>
        <p className={styles.reminder_message}>GPT-4：能力稍弱于官方GPT-4，稳定性相对较高，适合日常使用。</p>
        <p className={styles.reminder_message}>GPT-4-32K：在普通GPT-4模型的基础上，有更长的上下文记录长度，最长能记录约2万字以上。</p>
        <p className={styles.reminder_message}>GPT-4-测试：仅作为测试用，日常不要使用。</p>
        <p className={styles.reminder_message}>GPT-3.5：最普通的ChatGPT模型，回复速度快，能力一般。</p>
        <p className={styles.reminder_message}>GPT-3.5-16K：比普通GPT-3.5的上下文记录长度更长，能记录1万字以上内容，回复速度快，能力一般。</p>
        <p className={styles.reminder_message}>联网GPT：能够联网搜索资料的GPT-4，需要联网搜索时候可尝试使用。</p>
        <p className={styles.reminder_message}>Claude 2：另一个强大的大语言模型，跟ChatGPT的能力不相上下，优点是能记录数万字的超长上下文。</p><br/>
        <p className={styles.reminder_message}>如果感觉GPT-4能力不足，无法满足使用需求，请移步ChatGPT备用服务，效果更好。</p>
        <p className={styles.reminder_message}>使用过程中有任何疑问，请钉钉@苏云凯，将在第一时间为您解决问题。</p>
</div>
);
}

export default Reminder;
