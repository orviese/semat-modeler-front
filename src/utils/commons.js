const production = (process.env.NODE_ENV === 'production');
export const applicationPaths = {
    application: production ? 'https://semova.alt111.dev' :'http://localhost:8080',
    publicResource: '/validate-practices/public/'
}