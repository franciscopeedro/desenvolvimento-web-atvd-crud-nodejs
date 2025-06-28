const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let alunos = [
    { id: 1, nome: 'Ana Souza', curso: 'Sistemas de Informação', ira: 8.5 },
    { id: 2, nome: 'Carlos Lima', curso: 'Engenharia de Software', ira: 7.8 },
    { id: 3, nome: 'Mariana Costa', curso: 'Ciência da Computação', ira: 9.2 }
];

app.get('/alunos', (req, res) => {
    res.json(alunos);
});

app.post('/alunos', (req, res) => {
    const { nome, curso, ira } = req.body;

    if (!nome || !curso || typeof ira !== 'number' || isNaN(ira) || ira < 0 || ira > 10) {
        return res.status(400).json({ message: 'Dados inválidos' });
    }

    const novoId = alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1;

    const novoAluno = {
        id: novoId,
        nome,
        curso,
        ira
    };

    alunos.push(novoAluno);
    res.status(201).json(novoAluno);
});

app.put('/alunos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, curso, ira } = req.body;

    const aluno = alunos.find(a => a.id === id);
    if (!aluno) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    aluno.nome = nome;
    aluno.curso = curso;
    aluno.ira = ira;

    res.json(aluno);
});

app.delete('/alunos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = alunos.findIndex(a => a.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    alunos.splice(index, 1);
    res.json({ message: 'Aluno removido com sucesso' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});