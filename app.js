document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los elementos del DOM
    const btnEjecutar = document.getElementById('btnEjecutar');
    const comandoInput = document.getElementById('comando');
    const resultadoDiv = document.getElementById('resultado');

    // Función para ejecutar comando por voz y almacenarlo en MockAPI.io
    function ejecutarComando(comando) {
        switch (comando.toLowerCase()) {
            // Casos para comandos conocidos
            case 'brir nueva pestaña':
                window.open('about:blank', '_blank');
                break;
            case 'ir a google':
                window.location.href = 'https://www.google.com';
                break;
            case 'cerrar pestaña':
                window.close();
                break;
            case 'cerrar navegador':
                window.open('', '_self', '');
                window.close();
                break;
            case 'maximizar ventana':
                window.moveTo(0, 0);
                window.resizeTo(screen.width, screen.height);
                break;
            case 'minimizar ventana':
                window.resizeTo(200, 200);
                break;
            default:
                // Si el comando no se reconoce, almacenarlo en MockAPI.io
                guardarComandoEnMockAPI(comando);
                resultadoDiv.textContent = 'Comando no reconocido';
                break;
        }
    }

    // Función para guardar el comando en MockAPI.io
    function guardarComandoEnMockAPI(comando) {
        fetch('https://661535eab8b8e32ffc7a450b.mockapi.io/POST/comando', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comando: comando })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al almacenar el comando en MockAPI.io');
            }
            return response.json();
        })
        .then(data => {
            console.log('Comando almacenado en MockAPI.io:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Función para manejar el evento de clic en el botón
    btnEjecutar.addEventListener('click', function () {
        const comando = comandoInput.value;
        ejecutarComando(comando);
    });

    // Función para manejar el evento de reconocimiento de voz
    function handleVoiceCommand(event) {
        const comando = event.results[0][0].transcript;
        comandoInput.value = comando;
        ejecutarComando(comando);
    }

    // Iniciar el reconocimiento de voz cuando se haga clic en el botón
    btnEjecutar.addEventListener('click', function () {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.start();
        recognition.onresult = handleVoiceCommand;
    });

});


