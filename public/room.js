import { GameEvent, EventTypes} from "../shared/models/events.js";


const botao_join_room = document.querySelector('#botao-join-room')
const botao_spec_room = document.querySelector('#botao-spec-room')
const id_da_sala =  window.location.pathname.split('/')[2]



const soquete = new WebSocket("ws://localhost:8081/")

    soquete.addEventListener("open", () => {
  
}); 


botao_join_room.addEventListener('click', function () {
    console.log("Esse é o botão que o player vai dar join")
    soquete.send(new GameEvent({roomId: id_da_sala, type: EventTypes.PLAYER_JOIN}).toString())
});

botao_spec_room.addEventListener('click', function () {
    console.log("Esse é o botão que o player vai assistir")
    soquete.send(new GameEvent({roomId: id_da_sala, type: EventTypes.SPEC_JOIN}).toString())
});

