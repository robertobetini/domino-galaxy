
const botao_join_homepg = document.getElementById('botao-join')
const botao_criarSala_homepg = document.getElementById('botao-criar-sala')
const barra_join_homepg = document.getElementById('barra-join-game')


botao_join_homepg.addEventListener('click', function () {
    if(barra_join_homepg.classList.contains('barra-join-game-escondido')){
        barra_join_homepg.classList.remove('barra-join-game-escondido')
        barra_join_homepg.classList.add('barra-join-game-aberta')
    }
    else{
        barra_join_homepg.classList.remove('barra-join-game-aberta')
        barra_join_homepg.classList.add('barra-join-game-escondido')
    }
    console.log("Esse é o botão join")
});

botao_criarSala_homepg.addEventListener('click', async function () {
    //Aqui vc está apontando pra qual pagina o botao te leva
    const fazer_postagem = await fetch("/rooms", {
        method: "POST",
    })
    
    if(fazer_postagem.status == 201){
        const id_da_sala = await fazer_postagem.text()

        window.location.href =  `/rooms/${id_da_sala}`

    }
    
    
})