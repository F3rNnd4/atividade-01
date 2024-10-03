import { Router } from "express";

const candidatossRoutes = Router();

let candidatos = [
    {
        id: Math.random() * 1000000,
        nome: 'Capitã Lucimara',
        idade: 42,
        partido: 'PSD',
        segundoMandato: true,
        propostas: [
            'Aumento do salário',
            'Redução de impostos',
            'Mais investimentos em educação'
        ]
    },

];

//Rota para buscar todas os candidatos
candidatossRoutes.get("/", (req, res) => {
    return res.status(200).send( candidatos )
});

//Rota para criar uma nova emoção
candidatossRoutes.post("/new", (req, res) => {
    const { nome, cor } = req.body;
    const novaEmocao = {
        id: candidatos.length + 1,
        nome: nome,
        cor: cor
    }

    candidatos.push(novaEmocao)
    return res.status(201).send( candidatos )
});

//Rota para buscar uma emoção pelo ID
candidatossRoutes.get("/:id", (req, res) => {
    const { id } = req.params;

    //console.log(id);

    const emocao = candidatos.find((emotion) => emotion.id == id);

    if (!emocao) {
        return res.status(404).send({message: "Emoção não encontrada!"})
    } 
    return res.status(200).send({message: "Emoção encontrada", emocao,});
});

//Rota para editar uma emoção com o id
candidatossRoutes.put("/:id", (req, res) => {
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

//Rota para deletar um emoção
candidatossRoutes.delete("/:id", (req, res) => {
    const { id } = req.params;

    const emocao = candidatos.find((emotion) => emotion.id == id);

    if (!emocao) {
        return res.status(404).send({message: "Emoção não encontrada!"})
    }

    candidatos = candidatos.filter((emotion) => emotion.id != id);

    return res.status(200).send({message: "Emoção deletada!", emocao,});
});

export default candidatossRoutes;