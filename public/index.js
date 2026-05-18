
const botao_join_homepg = document.querySelector('#botao-join')
const botao_select_homepg =  document.querySelector('#botao-select')
const botao_criarSala_homepg = document.querySelector('#botao-criar-sala')

botao_join_homepg.addEventListener('click', function () {
    console.log("Esse é o botão join")
});

botao_select_homepg.addEventListener('click', function () {
    console.log("Esse é o botão select")
});

botao_criarSala_homepg.addEventListener('click', async function () {
    const fazer_postagem = await fetch("http://localhost:8080/rooms", {
        method: "POST",
        
    })
    
    if(fazer_postagem.status == 201){
        const soquete = new WebSocket("ws://localhost:8081/")

        soquete.addEventListener("open", () => {
            console.log("Acho que deu certo, apesar de ainda está confuso");
            soquete.send("Cu")
        }); 
    }
    
})