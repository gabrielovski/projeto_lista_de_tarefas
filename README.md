# Projeto de Lista de Tarefas

Este é um projeto simples de lista de tarefas desenvolvido com Node.js, Express, Sequelize e PostgreSQL no backend, e HTML, CSS e JavaScript no frontend.

## Configuração do Ambiente

### Requisitos

- Node.js e npm
- PostgreSQL

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. Navegue até o diretório do projeto:

    ```bash
    cd seu-repositorio
    ```

3. Instale as dependências do backend:

    ```bash
    cd backend
    npm install express sequelize pg pg-hstore cors
    ```

4. Configuração do Banco de Dados

    1. Certifique-se de que o PostgreSQL esteja instalado e em execução em sua máquina.

    2. No diretório backend/config, renomeie o arquivo config.example.js para config.js.

    3. Edite o arquivo config.js e insira suas credenciais do PostgreSQL:

        ```bash
        module.exports = {
          development: {
            username: 'seu-usuario',
            password: 'sua-senha',
            database: 'nome-do-banco-de-dados',
            host: '127.0.0.1',
            dialect: 'postgres',
          },
        };
        ```

    4. Execute as migrações do Sequelize para criar as tabelas no banco de dados:

        ```bash
        npx sequelize-cli db:migrate
        ```

### Execução

1. Inicie o servidor backend:

    Abra um terminal na pasta **backend**.

    Execute o comando:
    ```bash
    node server.js
    ```

    Você verá uma mensagem indicando que o servidor está rodando na porta especificada (por exemplo, Servidor rodando na porta 5000).

2. Inicie o frontend:

    Certifique-se de que o arquivo index.html e script.js estão configurados corretamente e estão acessíveis via um servidor web local (pode usar uma extensão do VS Code como "Live Server").

3. Acesse o aplicativo em seu navegador com a extensão Live Server do VSCode:

    http://127.0.0.1:5500/

### Funcionalidades
  - Adicionar uma nova tarefa
  - Marcar uma tarefa como concluída
  - Editar o texto de uma tarefa existente
  - Excluir uma tarefa