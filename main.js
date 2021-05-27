const app = Vue.createApp({
    data() {
        return {
            titulo: 'Mi Banco con Vue.js',
            cantidad: 0,
            enlace: 'https://youtube.com',
            estado: false,
            servicios: ['transferencias', 'pagos', 'giros', 'cheques']
        }
    }
})