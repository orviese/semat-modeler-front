
const production = (process.env.NODE_ENV === 'production');

export const applicationPaths = {
    application: production ? 'https://fullmenuonline.com' :'http://localhost:8080',
    menuApi: production ? 'https://api.fullmenuonline.com' :'http://localhost:3000',
    userApi: production? 'https://api.fullmenuonline.com' :'http://localhost:3000',
    publicResource: '/public'
}