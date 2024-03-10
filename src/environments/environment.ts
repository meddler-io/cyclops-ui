// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  hawki_api_hostname : 'hawki-api.indiatimes.com',
  url: 'http://localhost:9898',
  
  // url: 'http://localhost:8900',
  // url: 'http://172.24.42.13:9080',

  
  // url: 'http://172.24.42.120/stargate/api',
  // slug: '/',
  
  main_url: "http://localhost:4200/",
  // main_url: 'http://192.168.29.185:4200',
  appname: 'hawki',
  version: '1.0.1',
  buildTimestamp: 'Mon Mar 15 2021 15:43:46 GMT+0530 (India Standard Time)',

  // ioc_url: 'http://172.24.42.120/stargate/ioc_realtime/',
  ioc_url: 'http://172.24.42.94:8080/',

  // minio_url: 'http://hawki-minio.indiatimes.com:9000',
  minio_url: 'http://exthawki.indiatimes.com',


};

// export const environment = {
//   production: false,
//   url: 'http://hawki-api.indiatimes.com',
//   main_url: 'http://172.24.42.120:8900',
//   appname: 'hawki',

// };



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
