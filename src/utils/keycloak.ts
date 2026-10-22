// @ts-ignore
import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: 'http://localhost:8080', // Адрес вашего Keycloak
  realm: 'rioni', // Ваш Realm
  clientId: 'rioni-app' // ID клиента из настроек Keycloak
});

export const keycloakInit: Promise<boolean> = keycloak.init({
  onLoad: 'check-sso',
  checkLoginIframe: false,
  pkceMethod: 'S256',
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
});
