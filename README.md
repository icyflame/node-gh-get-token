# gh-get-token

> Exchange username and password for a GitHub OAuth Token

Designed for CLI apps.

[![Build Status](https://travis-ci.org/icyflame/node-cube-cli-timer.svg)](https://travis-ci.org/icyflame/node-cube-cli-timer)

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard)

Just do :-

```js
config_obj = {
	'note': 'some note',
	'client_id': '',
	'client_secret': ''
};

require('gh-get-token')(config_obj, function (err, token) {
	if (err) {
		console.log(err);
		// handle error
	} else {
		console.log(token);
	}
});
// token => abcd4567 (OAuth Token)
```

### Want to create a single OAuth Token?

Add just `note` to the `config_obj`. Check out the [API reference](https://developer.github.com/v3/oauth_authorizations/#create-a-new-authorization)

### Want to get or create an authorization for your registered app?

For this, the fields `client_id` and `client_secret` are required. Field `note` is not required, but recommended. Checkout the [API reference](https://developer.github.com/v3/oauth_authorizations/#get-or-create-an-authorization-for-a-specific-app). Before you begin, you must register your app [on GitHub](https://github.com/settings/applications/new), and thus, obtain the App ID and the App Secret.

**Note that if you try to retrieve an existing GitHub authorization, then, you WILL NOT get the OAuth token. You will recieve an empty string. (GitHub returns the OAuth token only once. If you misplace, it then you must re-authenticate.)**

**In the case that you wish to forcefully create a new token for the same application, you must pass in `config_obj.single_auth` as `true`. This will force re-authentication and a new token to be created.**

## License

Copyright [Siddharth Kannan](http://github.com/icyflame) 2015

Code licensed under MIT.
