// [z-paging]拦截器

//拦截&处理@query事件
function handleQuery(callback) {
	try {
		setTimeout(function() {
			_getApp().globalData.zp_handleQueryCallback = callback;
		}, 1);
	} catch (e) {}
}

//拦截&处理@query事件(私有，请勿调用)
function _handleQuery(pageNo, pageSize, from){
	const handleQueryCallback = _getApp().globalData.zp_handleQueryCallback;
	if (handleQueryCallback) {
		return handleQueryCallback(pageNo, pageSize, from);
	}
	return [pageNo, pageSize, from];
}

//拦截&处理系统language转i18n local
function handleLanguage2Local(callback) {
	try {
		setTimeout(function() {
			_getApp().globalData.zp_handleLanguage2LocalCallback = callback;
		}, 1);
	} catch (e) {}
}

//拦截&处理系统language转i18n local(私有，请勿调用)
function _handleLanguage2Local(language, local){
	const handleLanguage2LocalCallback = _getApp().globalData.zp_handleLanguage2LocalCallback;
	if (handleLanguage2LocalCallback) {
		return handleLanguage2LocalCallback(language, local);
	}
	return local;
}

//获取当前app对象
function _getApp(){
	// #ifndef APP-NVUE
	return getApp();
	// #endif
	// #ifdef APP-NVUE
	return getApp({allowDefault: true});
	// #endif
}

export default {
	handleQuery,
	_handleQuery,
	handleLanguage2Local,
	_handleLanguage2Local
};
