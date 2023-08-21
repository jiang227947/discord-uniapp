/**
 * @description 权限存储函数
 */
const authorizationKey : string = 'Authorization';

/**
 * 获取返回鉴权码
 * @return 
 */ 
export function getAuthorization() {
	return uni.getStorageSync(authorizationKey)
}

/**
 * 设置鉴权码
 * @param {any} authorization 
 * @return 
 */ 
export function setAuthorization(authorization : string) {
	return uni.setStorageSync(authorizationKey, authorization)
}

/**
 * 删除鉴权码
 * @param {any} authorization 
 * @return 
 */ 
export function removeAuthorization(authorization : string) {
	return uni.removeStorageSync(authorizationKey)
}