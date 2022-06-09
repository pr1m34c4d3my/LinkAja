export function isNavbarShow(context) {
    const session 		= context.req.session;
	const accessToken 	= session.accessToken;

	if (accessToken != undefined && accessToken != null && accessToken != '') {
		return true;
	} else {
        return false;
    }
}