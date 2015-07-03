var config_obj = {
  'note': 'A test application',
  'client_id': 'ed2b3d0e57da787ca5f3',
  'client_secret': 'aebcee448f896f1d089b78e38293bd401e4e164c'
// 'single_auth': true
}

require('./')(config_obj, function (err, token) {
  console.log(err)
  console.log(token)
})
