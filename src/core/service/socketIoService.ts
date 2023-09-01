import { ChatChannelsMessageTypeEnum } from '@/shared/enum/chat-channels.enum';
import type {
  ChatMessagesInterface,
  ChatChannelSubscribeInterface,
} from '@/shared/interface/chat-channels';
import { MessageEmitterService } from '@/shared/service/Message.service';
import { getRoleId, getStorageSync } from '@/utils';
import io, { Socket } from 'socket.io-client';
/**
 * Websocket服务
 * 使用socket.io
 * https://socket.io/zh-CN/docs/v4/client-api/#ioprotocol
 */
export class SocketIoService {
  public socketIo!: Socket;
  private messagesEmitter: MessageEmitterService;

  constructor(selectActiveChannel: string) {
    this.messagesEmitter = new MessageEmitterService();
    const opt = {
      extraHeaders: {
        role: getRoleId(),
        token: getStorageSync('tokenInfo').tokenValue,
        channelId: selectActiveChannel,
      },
    };
    console.log(this.socketIo);
    this.socketIo = io(`ws://127.0.0.1:3011/`, opt);
  }

  /**
   * 连接
   */
  public connect(): void {
    setTimeout(() => {
      // 连接成功
      this.socketIo.on('connect', () => {
        // todo 需要让服务器保存新进来的用户资料
        // console.log('socket.recovered', this.socketIo.recovered);
        // 是否为紧急重连
        if (this.socketIo.recovered) {
          // any missed packets will be received
        } else {
          // new or unrecoverable session
        }
        // console.log('websocket 连接成功', this.socketIo, this.socketIo.id);
        // this.socketIo.send('ping');
        // 开启心跳检测
        // this.heartCheckStart();
        // this.reconnectCount = RECONNECT_COUNT;
        // this.socketIo.emit('onmessage', this.socketIo.id);
        // 公共频道消息
        this.socketIo.on(
          ChatChannelsMessageTypeEnum.publicMessage,
          (msg: ChatMessagesInterface) => {
            // console.log('公共频道消息', msg);
            const message: ChatChannelSubscribeInterface = {
              type: ChatChannelsMessageTypeEnum.publicMessage,
              msg,
            };
            this.messagesEmitter.sendMessage(message);
          }
        );
        // 房间消息
        this.socketIo.on(ChatChannelsMessageTypeEnum.roomMessage, (msg: ChatMessagesInterface) => {
          // console.log('房间消息', msg);
          const message: ChatChannelSubscribeInterface = {
            type: ChatChannelsMessageTypeEnum.roomMessage,
            msg,
          };
          this.messagesEmitter.sendMessage(message);
        });
        // 系统消息
        this.socketIo.on(ChatChannelsMessageTypeEnum.systemMessage, (msg) => {
          // console.log('系统消息', msg);
          const message: ChatChannelSubscribeInterface = {
            type: ChatChannelsMessageTypeEnum.systemMessage,
            msg,
          };
          this.messagesEmitter.sendMessage(message);
        });
        // 全体消息
        this.socketIo.on(ChatChannelsMessageTypeEnum.allMessage, (msg) => {
          // console.log('全体消息', msg);
          const message: ChatChannelSubscribeInterface = {
            type: ChatChannelsMessageTypeEnum.allMessage,
            msg,
          };
          this.messagesEmitter.sendMessage(message);
        });
        // 连接断开
        this.socketIo.on('disconnect', (reason) => {
          console.log('websocket 连接断开: ', reason);
          if (reason === 'io server disconnect') {
            // 如果是服务器断开则重连
            this.socketIo.connect();
          }
          // 重新连接
          /*let reconnectCount: number = 5;
        const reconnectTimer = setTimeout(() => {
          console.log('重连剩余次数' + reconnectCount);
          if (reconnectCount === 0) {
            return;
          }
          reconnectCount--;
          this.connect(reconnectTimer);
        }, 5000);*/
        });
        // 连接关闭
        this.socketIo.on('close', (msg) => {
          // todo 需要处理断开的用户
          console.log('websocket 连接关闭');
          this.close();
        });
        // 连接错误
        this.socketIo.on('connect_error', (msg) => {
          // todo 需要处理断开的用户
          console.log('websocket 连接错误');
          this.close();
        });
      });
    }, 1000);
    // if (process.env.NODE_ENV === 'development') {
    //   // 部署服务器地址
    //   this.socketIo = io(`wss://www.evziyi.top`, opt);
    // } else {
    //   // this.socketIo = io(`ws://127.0.0.1:3011/`, opt);
    //   this.socketIo = io(`wss://www.evziyi.top`, opt);
    // }
  }

  /**
   * 关闭
   */
  public close(): void {
    if (this.socketIo) {
      this.socketIo.close();
      // this.socketIo = null;
    }
    // 关闭订阅
    this.messagesEmitter.close('');
  }
}
