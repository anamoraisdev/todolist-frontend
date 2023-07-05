import { useState } from "react"
import {v4 as uuidv4} from "uuid"


const Form = ({setTarefas, tarefas, acaoForm, tarefaAEditar, closeModal, categorias, darkMode}) => {
    
    const tarefaInicial = {
        titulo: "",
        descricao: "",
        categoria:{},
        prazo: "",
    }

    const [titulo, setTitulo] = useState(tarefaAEditar ? tarefaAEditar.titulo : tarefaInicial.titulo)
    const [descricao, setDescricao] = useState(tarefaAEditar ? tarefaAEditar.descricao : tarefaInicial.descricao)
    const [categoria, setCategoria] = useState(tarefaAEditar ? tarefaAEditar.categoria : tarefaInicial.categoria)
    const [prazo, setPrazo] = useState(tarefaAEditar ? tarefaAEditar.prazo : tarefaInicial.prazo)
    
    const aoSalvarTarefa = () => {
        setTarefas([...tarefas, {titulo: titulo,descricao: descricao, categoria: categoria, prazo: prazo, id: uuidv4(), concluido: false}])
        localStorage.setItem("tarefas", JSON.stringify([...tarefas, {titulo: titulo,descricao: descricao, categoria: categoria, prazo: prazo, id: uuidv4(), concluido: false}]))
        setTitulo("")
        setCategoria("")
        setDescricao("")
        setPrazo("")
    }

    const aoEditarTarefa = (tarefaAEditar) => {
        tarefas.map((tarefa) => {
            if(tarefa.id === tarefaAEditar.id){
                tarefa.titulo = titulo
                tarefa.descricao = descricao
                tarefa.categoria = categoria
                tarefa.prazo = prazo
            }
        })
        localStorage.setItem("tarefas", JSON.stringify([tarefas]))
        return tarefas
    }

    const aoSubmeterForm = (event) => {
        event.preventDefault()
        if(acaoForm === "add-tarefa"){
            aoSalvarTarefa()
        }else if(acaoForm === "edit-tarefa"){
            aoEditarTarefa(tarefaAEditar)
            closeModal()
        }
    }

    return (
        <form onSubmit={(event) => aoSubmeterForm(event)} className={`${darkMode ? "dark" : ""} flex flex-col items-start rounded-md gap-5 text-slate-700`}>
            <h1>Criar nova tarefa</h1>
            <div className="flex flex-col gap-3 items-start">
                <label className="flex flex-col gap-2">
                    Titulo
                    <input className="rounded-lg p-2"
                        placeholder="Digite um titulo para sua tarefa" 
                        required
                        value={titulo} 
                        onChange={(event) => setTitulo(event.target.value)}>
                    </input>
                </label>

                <label className="flex flex-col gap-2">
                    Descricao
                    <textarea className="rounded-lg p-2"
                        placeholder="Descreva sua tarefa..." 
                        value={descricao} 
                        onChange={(event) => setDescricao(event.target.value)}>
                    </textarea>
                </label>

                <label className="flex flex-col gap-2">
                    categoria
                    <select required value={categoria} onChange={(event) => setCategoria(event.target.value)} className="rounded-lg p-2">
                        {categorias?.map((categoria) => 
                            <option key={categoria.id}>{categoria.nome}</option>
                        )}
                    </select>
                </label>

                <label className="flex flex-col gap-2">
                    Prazo de entrega
                    <input type="date" value={prazo} onChange={(event) => setPrazo(event.target.value)} className="rounded-lg p-2"/>
                </label>

            </div>

            <button type="submit" className="py-1 px-3 bg-indigo-400 rounded-md text-white hover:bg-indigo-500">salvar</button>
        </form>
    )
}

export default Form