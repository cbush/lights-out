// **** Realm Cloud Users:
// **** Replace MY_INSTANCE_ADDRESS with the hostname of your cloud instance
// **** e.g., "mycoolapp.us1.cloud.realm.io"
// ****
// ****
// **** ROS On-Premises Users
// **** Replace the SERVER_URL string with the fully qualified versions of
// **** address of your ROS server, e.g.: "http://127.0.0.1:9080".
const INSTANCE_ADDRESS = 'proactive-steel-table.us1.cloud.realm.io' // <- update this
export const SERVER_URL = `https://${INSTANCE_ADDRESS}`
export const REALM_URL = `realms://${INSTANCE_ADDRESS}`
