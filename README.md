## Getting Started

Primeiro, instale as dependencias:

```bash
yarn
```

Em seguida, inicie o projeto com:

```bash
yarn start
```

Para buildar, faça:

```bash
yarn build
```

Para subir o build com pm2, primeiro instale serve:

```bash
yarn add serve -g
```

Em seguida, adicione ao pm2 com:

```bash
pm2 serve build 8082 --spa
```

# Git

Toda e qualquer modificação deve ser feita na branch `development`, para isso, antes de iniciar as mudanças certifique-se que está na branch correta, utilizando o seguinte comando:

```bash
git branch
```

Caso não esteja selecionado a branch correta, altere utilizando o seguinte comando:

```bash
git checkout development
```

Após alterar a branch e realizar os devidos commites, faça testes da integridade das modificações utilizando a máquina local.
Uma vez confirmado as modificações, suba para o status de `staging` com a finalidade de permitir testes.
Para isso, execute os seguintes comandos:

```bash
git checkout staging
git merge development
git add .
git commit -am "Atualizando para testes"
git push -u origin staging
```

Após isso, volte para o ambiente de development a partir do seguinte comando:

```bash
git checkout development
```


Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado.
