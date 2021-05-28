# Apuntes de vue.js

## Fundamentos

### ¿Que es Vue?

- Vue es un framework progresivo para construir interfaces de usuario.
- Diseñado para ser adoptado gradualmente.
- <https://v3.vuejs.org/guide/introduction.html>

### Instalación

De manera sencilla comenzaremos con el CDN

```HTML
<script src="https://unpkg.com/vue@next"></script>
```

### Primer proyecto

```HTML
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi primer proyecto con Vue 3!</title>
    <!-- CDN vue 3 -->
    <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
    <div id="app">
        <h1>Hello Vue 3!</h1>
        <h2>Tipo de cuenta: {{cuenta}}</h2>
    </div>
    <script src="main.js"></script>
</body>
</html>
```

```javascript
const app = Vue.createApp({
    data() {
        return {
            cuenta: 'Vista'
        }
    }
})
```

```HTML
<script src="main.js"></script>
<script>
    app.mount('#app');
</script>
```

- Estamos representando datos al DOM de manera sencilla.
- Ahora todo es reactivo.

### Llaves dobles

- Nos permite escribir expresiones de JS, osea ejecutar Javascript dentro de nuestro HTML.
- En el ejemplo estamos "preguntando" por nuestro dato, lo cual provoca una comunicación directa generando un DOM actualizado, en otras palabras es reactivo.

```JavaScript
{{ cuenta }}
```

Si cambiamos el valor de cuanta, verás que se actualiza automáticamente el DOM.

```javascript
const app = Vue.createApp({
    data() {
        return {
            cuenta: 'Corriente'
        }
    }
})
```

Ejemplo:

```HTML
<h2>Saldo disponible: {{ cantidad > 1 ? cantidad : 'Sin saldo' }}</h2>
```

```javascript
const app = Vue.createApp({
    data() {
        return {
            cuenta: 'Vista',
            cantidad: 0
        }
    }
})
```

### v-bind

Para crear vínculos reactivos entre nuestros datos y los "**atributos de HTML**" utilizamos una directiva de Vue llamada `v-bind`.

```javascript
const app = Vue.createApp({
    data() {
        return {
            cuenta: 'Vista',
            cantidad: 0,
            enlaceYoutube: 'https://youtube.com',
        }
    }
})
```

```html
<a href="{{enlaceYoutube}}">Youtube</a>
```

Al hacerlo de esa manera no funciona, para que funcione tenemos que utilizar `v-bind`

```html
<a v-bind:href="enlaceYoutube">Youtube</a>
```

Podemos abreviarlo

```html
<a :href="enlaceYoutube">Youtube</a>
```

También puedes utilizar `v-bind` por ejemplo en:

```html
<img :src="enlaceImagen" :alt="descripcion">
<p :class="claseCss">Lorem ipsum dolor sit.</p>
<p :style="propiedadCss">Lorem ipsum dolor sit.</p>
```

### v-if v-else

Existen directivas especiales para trabajar con datos condicionales, por ejemplo:

```html
<h2 v-if="estado">Cuenta activada</h2>
<h2 v-else>Cuenta desactivada</h2>
```

```javascript
return {
    cuenta: 'Vista',
    cantidad: 0,
    estado: true,
    enlaceYoutube: 'https://youtube.com/bluuweb',
    enlaceImagen: 'assets/escritorio.jpg',
    descripcion: 'Descripción de un escritorio'
}
```

Ahora pasemos este ejercicio a directivas de Vue:

```html
<h2>Saldo disponible: {{ cantidad > 1 ? cantidad : 'Sin saldo' }}</h2>
```

Podemos hacer lo siguiente:

```html
<h2 v-if="cantidad > 100">Cantidad: {{cantidad}}</h2>
<h2 v-else-if="cantidad <= 100 && cantidad > 0">
    Cantidad: <span style="color:red">{{cantidad}}</span>
</h2>
<h2 v-else>Sin cantidad: {{cantidad}}</h2>
```

### v-for

Podemos recorrer array y array de objetos con directivas de Vue: `v-for`

```javascript
data() {
    return {
        cuenta: 'Vista',
        cantidad: 200,
        estado: true,
        servicios: ['Transferencias', 'Pagos', 'Giros']
    }
}
```

```html
<hr>
<h2>Servicios disponibles:</h2>
<ul>
    <li v-for="item in servicios">{{item}}</li>
</ul>
```

#### Key

Siempre que trabajemos con `v-for`, Vue nos pedirá que estos elementos tengan una llave única, podemos agregar por ahora un index.

```html
<ul>
    <li 
    v-for="(item, index) in servicios" :key="index"
    >
        {{index + 1}} - {{item}}
    </li>
</ul>
```

### v-on:click [Eventos]

Agreguemos un evento que nos permita modificar la cantidad o saldo de nuestra cuenta:

```html
<button v-on:click="agregarSaldo">Agregar Saldo</button>
```

Abreviado:

```html
<button @click="agregarSaldo">Agregar Saldo</button>
```

```javascript
const app = Vue.createApp({
    data() {
        return {
            cuenta: 'Vista',
            cantidad: 200,
            estado: true,
            servicios: ['Transferencias', 'Pagos', 'Giros'],
        }
    },
    methods: {
        agregarSaldo() {
            this.cantidad = this.cantidad + 100
        }
    }
})
```

### Practica

Vamos a repasar lo aprendido con el botón disminuir:

```html
<button v-on:click="disminuirSaldo" :disabled="desactivar">Disminuir Saldo</button>
```

```javascript
const app = Vue.createApp({
    data() {
        return {
            cuenta: 'Vista',
            cantidad: 0,
            estado: true,
            servicios: ['Transferencias', 'Pagos', 'Giros'],
            desactivar: false
        }
    },
    methods: {
        agregarSaldo() {
            this.cantidad = this.cantidad + 100
            this.desactivar = false
        },
        disminuirSaldo() {
            if (this.cantidad === 0) {
                alert('llegaste al final')
                this.desactivar = true
                return
            }
            this.cantidad = this.cantidad - 100
        }
    }
})
```