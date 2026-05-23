import { GameEvent, EventTypes} from "../shared/models/events.js";


const botao_join_room = document.querySelector('#botao-join-room')
const botao_spec_room = document.querySelector('#botao-spec-room')
const botao_kick_room = document.querySelector('#botao-kick')
const botao_ban_room = document.querySelector('#botao-ban')
const botao_leave_room =  document.querySelector('#botao-leave')

const id_da_sala =  window.location.pathname.split('/')[2]
let resposta_do_servidor

const soquete = new WebSocket(`ws://${window.location.hostname}:8081/`)

soquete.addEventListener("open", () => {
    soquete.addEventListener("message", (message) => {
        const evento = GameEvent.fromString(message.data)
        resposta_do_servidor = evento

    });
})
    
    

botao_join_room.addEventListener('click', function () {
    console.log("Esse é o botão que o player vai dar join")
    soquete.send(new GameEvent({roomId: id_da_sala, type: EventTypes.PLAYER_JOIN}).toString())
   
});

botao_spec_room.addEventListener('click', function () {
    console.log("Esse é o botão que o player vai assistir")
    soquete.send(new GameEvent({roomId: id_da_sala, type: EventTypes.SPEC_JOIN}).toString())
});

botao_kick_room.addEventListener('click', function() {
    console.log("Esse é o botão kick")
    soquete.send(new GameEvent({roomId: id_da_sala, type: EventTypes.PLAYER_KICK}).toString())
});

botao_ban_room.addEventListener('click', function(){
    console.log("Esse é o botão ban")
    soquete.send(new GameEvent({roomId: id_da_sala, type: EventTypes.PLAYER_BAN}).toString())
})

botao_leave_room.addEventListener('click', function(){
    console.log("Esse é o botão leave")
    soquete.send(new GameEvent({roomId: id_da_sala, type: EventTypes.PLAYER_LEAVE}).toString())
})


