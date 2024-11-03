# trainingGeneration
## Geração de treino com inteligência artificial.
#### O trainingGeneration é um Software para geração de treino físico com inteligência artificial. Com ele é possível gerar treino físico, editar o treino sugerido e gerar PDF com o treino semanal.

#### A construção do mesmo pode ser feita a partir dos seguintes passos:

#### 1. Clone o repositório.

#### 2. Para o build do backend, execute:

    2.1 Altere o diretório para o backend.

    2.2 Faça uma cópia do arquivo .env.example e o renomeie para .env

    2.3 Defina as seguintes variaveis de ambiente:

        PORT =
        FRONTEND_URL =
        SESSION_SECRET =
        SECRET_KEY_JWT =
        KEY_OF_CONNECTION_IA =
        RATE_LIMIT_TIME_OF_TRAINING = 
        RATE_LIMIT_TIME_OF_REPORT = 
        RATE_LIMIT_MAX_OF_TRAINING = 
        RATE_LIMIT_MAX_OF_REPORT = 
        USE_MOCK =
        LIMIT_TO_LOCK =
        MINUTE_TO_BLOCK =
        ENVIRONMENT = 

        PORT = Referente à porta na qual o backend será executado.
        FRONTEND_URL = Referente a url HTTPS na qual o frontend será executado.
        SESSION_SECRET = Referente ao segredo que assina a sessão.
        SECRET_KEY_JWT = Referente ao segredo para assinar os tokens JWT.
        KEY_OF_CONNECTION_IA = Referente a chave de acesso para conectar a api da Inteligência artificial. 
        RATE_LIMIT_TIME_OF_TRAINING = Referente a janela de tempo em minutos de requisições na geração de treino.
        RATE_LIMIT_TIME_OF_REPORT = Referente a janela de tempo em minutos de requisições na geração de PDF.
        RATE_LIMIT_MAX_OF_TRAINING = Referente a quantidade de requisições permitidas na janela de tempo na geração de treino.
        RATE_LIMIT_MAX_OF_REPORT = Referente a quantidade de requisições permitidas na janela de tempo na geração de PDF.
        USE_MOCK = Referente a usar os dados mockados de resposta da api que gera o treino.
        LIMIT_TO_LOCK = Referente a quantidade máxima de requisições que o usuário pode realizar na janela de tempo. 
        MINUTE_TO_BLOCK = Referente ao tempo em minutos de escuta para a quantidade de requsições.
        ENVIRONMENT = Referente ao ambiente na qual o mesmo será executado. 
        
        Exemplo para o desenvolvimento local:

        PORT = 8000
        FRONTEND_URL = https://localhost:3000
        SESSION_SECRET = 'sua SESSION_SECRET'
        SECRET_KEY_JWT = 'sua SECRET_KEY_JWT'
        KEY_OF_CONNECTION_IA = 'sua KEY_OF_CONNECTION_IA'
        RATE_LIMIT_TIME_OF_TRAINING = 10
        RATE_LIMIT_TIME_OF_REPORT = 10
        RATE_LIMIT_MAX_OF_TRAINING = 2
        RATE_LIMIT_MAX_OF_REPORT = 2
        USE_MOCK = true
        LIMIT_TO_LOCK = 10
        MINUTE_TO_BLOCK = 1
        ENVIRONMENT = 'development'

        Nesse exemplo, caso o usuário faça 10 requisições em um intervalo de tempo de 1 minuto, ele será bloqueado.    
    
    2.4 Com o git bash dentro do diretório backend execute o seguinte comando:
            
        npm install && mkdir certs
        openssl genrsa -out certs/key.pem 2048
        openssl req -new -key certs/key.pem -out certs/myrequest.csr -subj "//C=country//ST=state//L=locality//O=organization//OU=organizationalUnit//CN=commonName"
        openssl x509 -req -days 365 -in certs/myrequest.csr -signkey certs/key.pem -out certs/cert.pem

    Ele irá instalar todas as dependências do backend, criar uma pasta certs e instalar os certificados, substitua os inputs (country, state, locality, organization, organizationalUnit e commonName) por seu valor para desenvolvimento local. 
    
    2.5 Execute npm start para executar o backend do trainingGeneration

#### 3. Para o build do frontend, execute:

    3.1 Altere o diretório para o frontend.

    3.2 Faça uma cópia do arquivo .env.example e o renomeie para .env

    3.3 Defina as seguintes variaveis de ambiente:

        REACT_APP_TRAININGGENERATION_BACKEND_URL =

        REACT_APP_TRAININGGENERATION_BACKEND_URL = Referente a url HTTPS na qual o backend está sendo executado.

        Exemplo para o desenvolvimento local:

        REACT_APP_TRAININGGENERATION_BACKEND_URL = https://localhost:8000

    3.4 Com o git bash dentro do diretório frontend execute o seguinte comando:

        npm install && mkdir certs
        openssl genrsa -out certs/key.pem 2048
        openssl req -new -key certs/key.pem -out certs/myrequest.csr -subj "//C=country//ST=state//L=locality//O=organization//OU=organizationalUnit//CN=commonName"
        openssl x509 -req -days 365 -in certs/myrequest.csr -signkey certs/key.pem -out certs/cert.pem

    Ele irá instalar todas as dependências do frontend, criar uma pasta certs e instalar os certificados, substitua os inputs (country, state, locality, organization, organizationalUnit e commonName) por seu valor para desenvolvimento local. 

    3.5 Execute npm start para executar o frontend do trainingGeneration
