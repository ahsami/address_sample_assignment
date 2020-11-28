# address_sample_assignment
the address co. test project 
___
## Commands:
### run project command :
    you can use `npm run dev` for start run project in development mode

### create random data command: 
    use `npm run data` and system will create bunch of random data for you. you can set the limit for it in 'config.json' 

### database table migration command:
    use `npm run migrate` for this

___

## Configurations
you can set your configuration in `config/config.json`

`DB_CONNECTION_STRING` : for your postgress connection string 

`EXPRESS_PORT` : the port that express will listen on 

`RANDOM_GENERATOR_LIMIT` : the number for random data creation 

`RECOMEND_PROPERTIES_DISTANCE` : sets the recommended case area distance radius

`RECOMEND_PROPERTIES_RENT` : recommended cases rend tolerance

`RECOMEND_PROPERTIES_MORTGAGE` :  recommended cases mortgage tolerance

`RECOMEND_PROPERTIES_AREA`:  recommended cases area tolerance

`RECOMEND_PROPERTIES_AGE`:  recommended cases age tolerance


