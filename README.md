# gh-get-token

> Exchange username and password for a GitHub OAuth Token

Designed for CLI apps.

just do :-

```js
config_obj = {
	'note': 'some note',
	'client_id': '',
	'client_secret': ''
};

token = require('gh-get-token')(config_obj);
// token => abcd4567 (OAuth Token)
```

### Want to create a single OAuth Token?

Add just `note` to the `config_obj`. Check out the [API reference](https://developer.github.com/v3/oauth_authorizations/#create-a-new-authorization)

### Want to get or create an authorization for your registered app?

For this, the fields `client_id` and `client_secret` are required. Field `note` is not required, but recommended. Checkout the [API reference](https://developer.github.com/v3/oauth_authorizations/#get-or-create-an-authorization-for-a-specific-app). Before you begin, you must register your app [on GitHub](https://github.com/settings/applications/new), and thus, obtain the App ID and the App Secret.

## License

Copyright [Siddharth Kannan](http://github.com/icyflame) 2015

Code licensed under MIT.