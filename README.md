# scraper-challenge

### dependencies 
```
node 14+
npm 6+
```
### How install
```
npm install
```
### How config 
```
|      name      | default |  type  | required |                            description                            |
| :------------: | :-----: | :----: | :------: | :---------------------------------------------------------------: |
|      PORT      |  3300   | number |   yes    |                     the port of endpoint API                      |
| SEQUENCE_DEBUG |         | number |    no    | activated mode debug how save in .sequence te intermediate params |
|  SEQUENCE_DIR  |         |  text  |    no    |           the directore to salve te intermediate params           |

```
### How run
```
npm run app
or 
npm run start in dev
```
### How enable debug mode
```
define SEQUENCE_DEBUG to true in .env
```
### Endpoints
**Url** : `localhost:[PORT]/api/scraper`

**Method**: `post`

## body params
|   Parametro    | required |  options  |
| :------------: | :------: | :-------: |
|      model     |   yes    |  Lenovo   |

## incoming schema
```json
{
    "model": "Lenovo"
}
```
## outgoing schema
```json
{
    "RESULT": "success",
    "DATA": {
        ...
    },
    "ERRORS": []
}
```