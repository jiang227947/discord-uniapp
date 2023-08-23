// 引入请求
import type { CreateChannelParamInterface } from '@/shared/interface/chat-channels';
import request from '../request';

// 查询聊天记录
const queryChatMessage = (data: { channelId: string; pageNum: number; pageSize: number }) => request.post('/queryChatMessage', data);

// 添加反应表情
const addReaction = (data: { emoji: string; id: number; userId: number }) => request.post('/addReaction', data);

// 上传头像
const uploadAvatar = (data: { formData: FormData }) => request.post('/uploadAvatar', data);

// 上传附件
const attachmentsUpload = (data: { formData: FormData }) =>
  request.post('/attachmentsUpload', data, {
    reportProgress: true,
    observe: 'events',
  });

// 创建频道
const createChannel = (data: CreateChannelParamInterface) => request.post('/addReaction', data);

// 查询频道
const queryChannel = (id: string) => request.get('/queryChannel', { id });

// 删除频道
const deleteChannel = (data: { channelId: string }) => request.post('/deleteChannel', data);

// 加入频道
const joinChannel = (data: { channelId: string; password: string }) => request.post('/joinChannel', data);

export { queryChatMessage, addReaction, uploadAvatar, attachmentsUpload, createChannel, queryChannel, deleteChannel, joinChannel };
