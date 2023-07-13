//Object
let note = localStorage.getItem('note')
if(note == null && note == undefined){
    note = {
        "title": "",
        "description": "",
        "topics": [],
        "cursos": [],
    };
}else{
    note = JSON.parse(note);
    note_view()
}

//Initial informations
if(window.location.pathname == "/relatorios/"){
    let title = document.getElementById('title');
    let desc = document.getElementById('description');

    title.addEventListener("keyup", () => {
        note.title = title.value;
        
        note_save();
        note_view();
    })
    desc.addEventListener("keyup", () => {
        note.description = desc.value;
        
        note_save();
        note_view();
    })
}


//FUNCTIONS
function note_save(){
    localStorage.setItem('note', JSON.stringify(note));
}

function note_view(){
    var nota = JSON.parse(localStorage.getItem('note'));

    note_content.innerHTML = "";

    if(nota.title != null && nota.title != undefined){
        if(window.location.pathname == "/relatorios/"){
            document.getElementById('title').value = note.title;
        }
        note_content.innerHTML += `
            <h4>${nota.title}</h4>
        `
    }

    if(nota.description != null && nota.description != undefined){
        if(window.location.pathname == "/relatorios/"){
            document.getElementById('description').value = note.description;
        }
        note_content.innerHTML += `
            <p>${nota.description}<p>
        `
    }

    //TÓPICS
    if(nota.topics != null && nota.topics != undefined && nota.topics != {} && nota.topics != ""){

        if(window.location.pathname == "/relatorios/"){
            // document.getElementById('title').value = note.title;
        }
        
        var array = nota.topics

        var count = 0;
        array.forEach(topics => {
            if(topics != ""){
                var button = ""

                if(window.location.pathname == "/relatorios/"){
                    button = `
                        <button class="bg-transparent text-danger border-0 mx-1 pb-2" onclick="remove_topico(${count})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                            </svg>
                        </button>
                    `
                }

                note_content.innerHTML += `
                    <div class="d-flex flex-wrap">
                        <h5>${topics[0]}</h5>
                        ${button}
                    </div>
                    <p>${topics[1]}</p>
                `
            }
            count++
        });
    }

    //CURSOS
    if(nota.cursos != null && nota.cursos != undefined && nota.cursos != {} && nota.cursos != ""){
        if(window.location.pathname == "/relatorios/"){
            // document.getElementById('title').value = note.title;
        }
        
        note_content.innerHTML += `
        <h5>Novos cursos</h5>
        <ul id="curso_lista">
        </ul>
        `

        var array = nota.cursos
        
        var count = 0;
        array.forEach(cursos => {
            if(cursos != ""){
                var button = "";
                if(window.location.pathname == "/relatorios/"){
                    button = `
                        <button class="bg-transparent text-danger border-0 mx-1 pb-2" onclick="remove_curso(${count})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                            </svg>
                        </button>
                    `
                }

                var desc = ".";
                if(cursos[3] != ""){
                    desc = `: ${cursos[3]}`
                }
                curso_lista.innerHTML += `
                <li>
                    <b id="${cursos[1]}_content">${cursos[1]} (ID: ${cursos[0]}) - Duração: ${cursos[2]} horas</b>${button} ${desc}
                </li>
                `
            }
            count++
        });
        
    }
}

function remove_curso(id){

    var array = note.cursos
    array[id] = "";

    note_save();
    note_view();
}


//JSON
function show_json(){
    json_content.innerHTML = `
        <p class="text-danger">*Para ver como JSON abra o console do navegador</p>
        <br>
        <b>JSON como string:</b><br>
        ${localStorage.getItem('note')}
    `
    console.log(JSON.parse(localStorage.getItem('note')))
}


//TOPIC
    function save_topic(){

        let topic_title = document.getElementById('topic_title');
        let topic_content = document.getElementById('topic_content');

        var array = note.topics;
        array.push([topic_title.value, topic_content.value])

        note_save();
        note_view();

        topic_title.value = "";
        topic_content.value = "";

    }

    function remove_topico(id){

        var array = note.topics
        array[id] = "";

        note_save();
        note_view();
    }


//CURSOS    
    function save_curso(){

        let curso_name = document.getElementById('curso_name');
        let curso_hours = document.getElementById('curso_hours');
        let curso_desc = document.getElementById('curso_desc');
        let curso_id = document.getElementById('curso_id');

        var array = note.cursos;
        array.push([curso_id.value, curso_name.value, curso_hours.value,curso_desc.value])

        note_save();
        note_view();

        curso_name.value = "";
        curso_hours.value = "";
        curso_desc.value = "";
        curso_id.value = "";
    }


//Final

function import_json(){
    let json = document.getElementById('json_n').value;
    let json_str = document.getElementById('json_s').value;

    if(json != "" || json_str != ""){
        if(localStorage.getItem('note') != null && localStorage.getItem('note') != undefined){
            if(confirm("Já existe um relatório em produção. Deseja sobrescrever?")){
                if(json != ""){
                    localStorage.setItem('note', JSON.stringify(JSON.parse(json)))
                }else if(json_str != ""){
                    localStorage.setItem('note', JSON.stringify(JSON.parse(json_str)))
                }
            }
        }
    }

    document.getElementById('json_n').value = "";
    document.getElementById('json_s').value = "";
    note_view();
}

if(window.location.pathname == "/relatorios/note.html"){
    window.print();
}

console.log(document);