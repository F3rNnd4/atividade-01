import { Router } from "express";

const candidatosRoutes = Router();

let candidatos = [
    {
        id: Math.floor(Math.random() * 1000000),
        nome: 'Capitã Lucimara',
        idade: 42,
        partido: 'PSD',
        segundo: true, //Segundo mandato
        propostas: [
            'Aumento do salário',
            'Redução de impostos',
            'Mais investimentos em educação'
        ]
    },
];

///////Rota para buscar todas os candidatos///////
candidatosRoutes.get("/", (req, res) => {
    return res.status(200).send( candidatos )
});

///////Rota para criar um novo candidato///////
candidatosRoutes.post("/", (req, res) => {
    const { nome, partido, idade, segundo, propostas } = req.body;

//Validação dos campos nome e partido
    if (!nome || !partido) {
        return res.status(400).send({message: 'O nome ou partido não foi preenchido!'})
    }

//Validação de idade
    if (idade < 18) {
        return res.status(400).send({message: 'O candidato não possui idade suficiente para participar!'})
    }

    const novoCandidato = {
        id: Math.floor(Math.random() * 1000000),
        nome,
        partido,
        idade,
        segundo,
        propostas
    }

    candidatos.push(novoCandidato)
    return res.status(201).send( {message: "Candidato cadastrado com sucesso!", novoCandidato} )
});

//Rota para buscar um candidato pelo id
candidatosRoutes.get("/:id", (req, res) => {
    const { id } = req.params;

    //console.log(id);

    const emocao = candidatos.find((emotion) => emotion.id == id);

    if (!emocao) {
        return res.status(404).send({message: "Emoção não encontrada!"})
    } 
    return res.status(200).send({message: "Emoção encontrada", emocao,});
});

//Rota para editar um candidato com o id
candidatosRoutes.put("/:id", (req, res) => {
    const { id } = req.params;

    const emocao = candidatos.find((emotion) => emotion.id == id);

    if (!emocao) {
        return res.status(404).send({message: "Emoção não encontrada!"})
    } 
    
    const { nome, cor } = req.body;
    emocao.nome = nome;
    emocao.cor = cor;

    return res.status(200).send({message: "Emoção atualizada!", emocao,});
})

//Rota para deletar um candidato
candidatosRoutes.delete("/:id", (req, res) => {
    const { id } = req.params;

    const emocao = candidatos.find((emotion) => emotion.id == id);

    if (!emocao) {
        return res.status(404).send({message: "Emoção não encontrada!"})
    }

    candidatos = candidatos.filter((emotion) => emotion.id != id);

    return res.status(200).send({message: "Emoção deletada!", emocao,});
});

export default candidatosRoutes;