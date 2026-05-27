import { GameEvent, EventType} from "../shared/models/events.js";

const botoes_frame = document.getElementById('botaos-room')
const botao_join_room = document.getElementById('botao-join-room')
const botao_spec_room = document.getElementById('botao-spec-room')
const botao_kick_room = document.getElementById('botao-kick')
const botao_ban_room = document.getElementById('botao-ban')
const botao_leave_room =  document.getElementById('botao-leave')

const id_da_sala =  window.location.pathname.split('/')[2]

let resposta_do_servidor
let permisao

const soquete = new WebSocket(`ws://${window.location.hostname}:8081/`)

soquete.addEventListener("open", () => {
    soquete.addEventListener("message", (message) => {
        const evento = GameEvent.fromString(message.data)
        resposta_do_servidor = evento

       
        if(resposta_do_servidor.type === EventType.ROOM_JOINED){
            const pegando_owner = resposta_do_servidor.content.split(',');
            
            permisao = pegando_owner[1];
            
        };

        if(resposta_do_servidor.type === EventType.PLAYER_LIST){
            
            const ids_jogadores = resposta_do_servidor.content.split(',');
            botoes_frame.innerHTML = "";
            
            ids_jogadores.forEach(ids_do_player_na_sala => {
                if(ids_do_player_na_sala.trim() === ""){
                    return;
                }
                
                if(permisao === "owner"){

                    const frame_do_jogador = document.createElement('div');
                    frame_do_jogador.classList.add('botaos-room');
                    frame_do_jogador.innerHTML = `
                        <div style="border: 2px solid #333; margin-top: 20px; padding: 15px; width: 300px;">
                            <span style="font-weight: bold; font-size: 18px;">Player ID:</span>
                            <br>
                            <span style="color: blue;">${ids_do_player_na_sala}</span>
                            <br><br>
                            <button class="botao-spec-room">Spectator</button>
                            <button class="botao-kick">Kick</button>
                            <button class="botao-ban">Ban</button>
                            <button class="botao-leave">Leave</button>
                        </div>
    
                    `;
                    botoes_frame.appendChild(frame_do_jogador);
                }
                else if(permisao === "player"){
                    const frame_do_jogador = document.createElement('div');
                    frame_do_jogador.classList.add('botaos-room');
                    frame_do_jogador.innerHTML = `
                        <div style="border: 2px solid #333; margin-top: 20px; padding: 15px; width: 300px;">
                            <span style="font-weight: bold; font-size: 18px;">Player ID:</span>
                            <br>
                            <span style="color: blue;">${ids_do_player_na_sala}</span>
                            <br><br>
                            <button class="botao-spec-room">Spectator</button>
                            <button class="botao-leave">Leave</button>
                        </div>
    
                    `;
                    botoes_frame.appendChild(frame_do_jogador);

                }

                
            });

            
        }


    });
})
    
    

botao_join_room.addEventListener('click', function () {
    console.log("Esse é o botão que o player vai dar join")
    soquete.send(new GameEvent({roomId: id_da_sala, type: EventType.PLAYER_JOIN}).toString())

    soquete.send(new GameEvent({roomId: id_da_sala, type: EventType.CHECK_PLAYERS}).toString())
   
});

// botao_spec_room.addEventListener('click', function () {
//     console.log("Esse é o botão que o player vai assistir")
//     soquete.send(new GameEvent({roomclass: class_da_sala, type: EventType.SPEC_JOIN}).toString())
// });

// botao_kick_room.addEventListener('click', function() {
//     console.log("Esse é o botão kick")
//     soquete.send(new GameEvent({roomclass: class_da_sala, type: EventType.PLAYER_KICK}).toString())
// });

// botao_ban_room.addEventListener('click', function(){
//     console.log("Esse é o botão ban")
//     soquete.send(new GameEvent({roomclass: class_da_sala, type: EventType.PLAYER_BAN}).toString())
// });

// botao_leave_room.addEventListener('click', function(){
//     console.log("Esse é o botão leave")
//     soquete.send(new GameEvent({roomclass: class_da_sala, type: EventType.PLAYER_LEAVE}).toString())
// });