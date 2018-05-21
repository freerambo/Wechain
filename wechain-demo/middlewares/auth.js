// 用户登陆校验中间件

exports.requireLogin = function(req, res, next){
	if(req.session.user){
		console.log(req.session.user);
		return next();
	}
    console.log("user is null");
	res.status(422);
	res.redirect('/signin');
}
