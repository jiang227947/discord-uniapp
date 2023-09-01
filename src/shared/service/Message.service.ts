import mitt, { type Emitter } from 'mitt';
import type { ChatChannelSubscribeInterface } from '../interface/chat-channels';

/**
 * 订阅流
 */
export class MessageEmitterService {
  private emitter: Emitter<any> = mitt();

  // 返回订阅
  get messagesEmitter(): Emitter<any> {
    return this.emitter;
  }

  /**
   * 发射消息
   * @param type 发射消息的key
   * @param event 消息内容
   */
  sendMessage(message: ChatChannelSubscribeInterface): void {
    this.emitter.emit(message.type, message.msg);
  }

  /**
   * 关闭订阅
   * @param type 订阅key
   */
  close(type: string): void {
    this.emitter.off(type);
  }
}
