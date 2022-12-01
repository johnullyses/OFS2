# OFS 2.0 Front End

## Framework 
* Quasar CLI

# Node.js >=12.22.1 is required.
```bash
$ npm install -g @quasar/cli
```

## Dependencies Installation

```bash
$ cd /"{ofs 2.0 project root folder}"
$ npm install
$ cp .env.example .env
$ cp .env.prod.example .env.prod
```

## Config | credentials can be found at `oauth_clients` table on database
- .env for development
- .env.prod for production build
## Example 
```
API_URL=http://192.168.10.32
CLIENT_ID=2
CLIENT_SECRET=bl6HsVoERhc3EcR9nQcoI5AbhnCoZs19tpPLxTcM
```

## Building
```bash
$ quasar dev    // for local development
$ quasar build  // for production
```

## .htaccess for production build
## to save ctrl + d
```bash
$ cat > dist/spa/.htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

