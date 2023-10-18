# Vue e-commerce website (UNDER CONSTRUCTION)

Esta es una solución a [Audiophile e-commerce website challenge](https://www.frontendmentor.io/challenges/audiophile-ecommerce-website-C8cuSd_wx), de Frontend Mentor, web para practicar desarrollo web con proyectos reales.

## Tabla de contenidos

- [Vue e-commerce website (UNDER CONSTRUCTION)](#vue-e-commerce-website-under-construction)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [El proyecto](#el-proyecto)
    - [Screenshot](#screenshot)
    - [Enlaces](#enlaces)
  - [Petición y envío de datos](#petición-y-envío-de-datos)
    - [Servidor y base de datos fake](#servidor-y-base-de-datos-fake)
    - [Axios y llamadas a la API](#axios-y-llamadas-a-la-api)
  - [Modal y componentes dinámicos](#modal-y-componentes-dinámicos)
    - [Transiciones y animaciones](#transiciones-y-animaciones)
  - [Aumentar/reducir la cantidad y carrito](#aumentarreducir-la-cantidad-y-carrito)
    - [Valor inicial](#valor-inicial)
    - [Aumentar y reducir la cantidad](#aumentar-y-reducir-la-cantidad)
  - [Checkout](#checkout)
    - [Formulario](#formulario)
    - [Validación del formulario](#validación-del-formulario)
  - [Construido con](#construido-con)

## El proyecto

El reto consiste en construir una tienda on-line en una _Single Page_ partiendo de:

- Un archivo Figma con los diseños de la web para desktop, tablet y móvil.
- Un archivo JSON con los datos de los productos
- Las imágenes de la web para desktop, tablet y móvil

Los usuarios deben poder:

- Ver el diseño óptimo de la app según el tamaño de la pantalla de su dispositivo
- Añadir/quitar productos del carrito de la compra
- Editar las cantidades de los productos del carrito
- Completar todos los campos en el _checkout_
- Recibir validaciones del formulario si faltan campos por rellenar o son incorrectos durante el _checkout_
- Ver los totales del pago correctos según los productos del carrito
  - Los gastos de envío son $ 50 por pedido.
  - El IVA es el 20% del precio del producto, sin incluir el envío.
- Ver una ventana modal de confirmación de pedido después de pagar con un resumen de pedido
- ** Bonus **: Hacer un seguimiento de lo que hay en el carrito, incluso después de actualizar el navegador con `localStorage`.

### Screenshot

![](./screenshot.jpg)

### Enlaces

- Solution URL: [github.com/mariam-blanco/vue-ecommerce](https://github.com/mariam-blanco/vue-ecommerce)
- Live Site URL: [vue-ecommerce-five.vercel.app/](https://vue-ecommerce-five.vercel.app/)

## Petición y envío de datos

### Servidor y base de datos fake

Para hacer una simulación de peticiones y envío de datos se crea un servidor fake con [JSON Server](https://github.com/typicode/json-server). Un archivo db.json con los datos de los productos hace la función de base de datos:

[https://fake-server-app-01.herokuapp.com/](https://fake-server-app-01.herokuapp.com/)

Fuente: [Deploying Fake Back-End Server & DataBase Using JSON-SERVER, GitHub, and Heroku.](https://dev.to/youssefzidan/deploying-fake-back-end-server-database-using-json-server-github-and-heroku-1lm4)

### Axios y llamadas a la API

Como la app va a hacer peticiones desde distintos componentes, para evitar importar Axios varias veces y repetir código, se crea una carpeta `services` y un archivo `ProductService.js`.

📁 **src/services/ProductService.js**

```javascript
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://fake-server-production.up.railway.app',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getProductsByCategory(category) {
    return apiClient.get(`/products?category=${category}`)
  },

  /* more code */
}
```

## Modal y componentes dinámicos

La ventana modal contiene componentes distintos, que tienen algunos estilos CSS diferentes. Estos componentes se van a mostrar de manera dinámica gracias a `<component>` de Vue:

- El carrito de la compra: `<ShoppingCart />`
- La navegación de categorías, para tablet y movil: `<NavCategories />`
- La confirmación de la compra, al final del _chekout_: `<ShoppingConfirmation />`

📄 **App.vue**

```html
<BaseModal v-if="isOpen" :class="`modal--${modalClass}`">
  <component :is="activeComponent" />
</BaseModal>
```

Por ejemplo, al hacer click en el icono del carrito del `<header>` se ejecuta el método `toogleModal` al que se le pasa el componente que debe de aparecer dentro de la modal al abrirse:

📄 **TheHeader.vue**

```html
<!-- En <template> -->
<a class="header-icon" @click="toogleModal('ShoppingCart')">
  <BaseIcon icon-name="icon-cart" />
</a>
```

```javascript
// En <script>
methods: {
  toogleModal(component) {
    this.$store.dispatch('openModalComponent', component)
    this.$store.commit('SET_IS_OPEN', !this.$store.state.isOpen)
  }
}
```

Desde el _store_ se actualiza el estado de `activeModalComponent: 'ShoppingCart'` y el estado que abre y cierra la modal `isOpen: true`:

📁 **src/store/index.js**

```javascript
export default createStore({
  state: {
    isOpen: false,
    activeModalComponent: null,

    /* more code */
  },

  mutations: {

    SET_IS_OPEN(state, isOpen) {
      state.isOpen = isOpen
    },
    SET_ACTIVE_MODAL_COMPONENT(state, component) {
      state.activeModalComponent = component
    },

    /* more code */
  },

  actions: {

    openModalComponent({ commit }, component) {
      commit('SET_ACTIVE_MODAL_COMPONENT', component)
    },

    /* more code */
  }
```

A la App.vue, donde está el componente de la modal que envuelve, gracias al `<slot>`, el componente dinámico `<component>`, se pasan estos valores. Con la propiedad `modalClass` se aplican los estilos que corresponden a cada componente:

📄 **App.vue**

```javascript
computed: {

    isOpen() {
      return this.$store.state.isOpen
    },

    modalClass() {
      return this.activeComponent === 'ShoppingCart' && 'cart' ||
             this.activeComponent === 'NavCategories' && 'navigation' ||
             this.activeComponent === 'ShoppingConfirmation' && 'confirmation'
    },

    activeComponent() {
      return this.$store.state.activeModalComponent
    },
  }
```

### Transiciones y animaciones

A la ventana modal, también se aplica una transición para que no resulte tan brusco cuando aparece y lo haga de una manera más suave.
En este caso se usa el componente `<transition>` que ofrece Vue. Es impotante que el componente que envuelve, en este caso, la modal, se muestre de manera condicional para que funcione.

> Vue provides a transition wrapper component, allowing you to add entering/leaving transitions > > for any element or component in the following contexts:
>
> - Conditional rendering (using v-if)
> - Conditional display (using v-show)
> - Dynamic componentsComponent root nodes

📄 **App.vue**

```html
<transition name="fade">
  <BaseModal v-if="isOpen" :class="`modal--${modalClass}`">
    <component :is="activeComponent" />
  </BaseModal>
</transition>
```

En los estilos del componente:

```css
.fade {
  &-enter-active {
    transition: opacity 0.25s ease-out;
  }
  &-leave-active {
    transition: opacity 0.2s ease-in;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
```

Fuente: [Guía oficial de Vue: Enter/Leave & List Transitions](https://vuejs.org/v2/guide/transitions.html)

## Aumentar/reducir la cantidad y carrito

> **Nota:** Para este proyecto no se plantea la funcionalidad de eliminar productos del carrito. Tampoco va a haber inventario de productos con un stock limitado.

El componente `ShoppingButtonQuantity` sirve para aumentar y reducir la cantidad de cada producto. Se utiliza en la página `Product` para cambiar la cantidad de cada producto antes de añadirlo al carrito. También se va a utilizar para cambiar la cantidad de un producto dentro del carrito.

```html
<template>
  <div class="item-quantity">
    <button @click="decreaseQuantity()">-</button>
    <span>{{ quantity }}</span>
    <button @click="increaseQuantity()">+</button>
  </div>
</template>
```

Si estamos en la página `Product`, al crear el componente `ShoppingButtonQuantity`, se inicializa la cantidad que se va a mostrar en `quantity`:

📄 **ShoppingButtonQuantity.vue**

```javascript
created() {
  /* Initializes 'initialQuantity' state in the store */
  if (this.btnQuantityType === 'productQuantity') {
    this.$store.dispatch('setInitialQuantity', this.id)
  }
},

computed: {

  itemFound() {
    return this.$store.getters.found(this.id)
  },

  quantity() {
    return this.btnQuantityType === 'productQuantity'
      ? this.$store.state.initialQuantity
      : this.itemFound.quantity
  },
},
```

### Valor inicial

La cantidad inicial se va a fijar con la función `setInitialQuantity` que va a inicializar el valor de `initialQuantity` en _store_. Si el producto aún no se añadió al carrito el valor será `1`. Si ya está en el carrito, será la cantidad correspondiente del carrito `cart`.

📁 **src/store/index.js**

```javascript
export default createStore({
  state: {
    product: {},
    initialQuantity: null,
    cart: [],
    /* more code */
  },

  mutations: {
    SET_QUANTITY(state, quantity) {
      state.initialQuantity = quantity
    },
    /* more code */
  },

  getters: {
    found: (state) => (id) => state.cart.find((item) => id === item.id,

  },

  actions: {
    setInitialQuantity({ commit, getters }, id) {
      !getters.found(id)
        ? commit('SET_QUANTITY', 1)
        : commit('SET_QUANTITY', getters.found(id).quantity)
    },
    /* more code */
  }
```

### Aumentar y reducir la cantidad

Para aumentar y reducir la cantidad:

📄 **ShoppingButtonQuantity.vue**

```javascript
methods: {

  increase() {
    const found = this.itemFound;

    if (!found || (found && this.btnQuantityType === 'productQuantity')){
      this.$store.commit('INCREASE_QUANTITY')
    } else if (found && this.btnQuantityType === 'cartQuantity') {
      this.$store.dispatch('increaseCartQuantity', this.id)
    }
  },

  decrease() {
    const found = this.itemFound;

    if (this.quantity >= 1) {
      if (!found || (found && this.btnQuantityType === 'productQuantity')) {
        this.$store.commit('DECREASE_QUANTITY')

      } else if (found && this.btnQuantityType === 'cartQuantity') {
        this.$store.dispatch('decreaseCartQuantity', this.id)
      }
    }
  }
}
```

📁 **src/store/index.js**

```javascript
mutations: {

    SET_QUANTITY(state, quantity) {
      state.initialQuantity = quantity
    },
    INCREASE_QUANTITY(state) {
      state.initialQuantity++
    },
    DECREASE_QUANTITY(state) {
      state.initialQuantity--
    },

    // Cart item quantity

    INCREASE_CART_ITEM_QUANTITY(state, found) {
      found.quantity++
    },
    DECREASE_CART_ITEM_QUANTITY(state, found) {
      found.quantity--
    },
    /* more code */

  actions: {

    increaseCartQuantity({ commit, dispatch, state, getters }, id) {
      commit('INCREASE_CART_ITEM_QUANTITY', getters.found(id))
       /* ... code ... */
    },

    decreaseCartQuantity({ commit, dispatch, state, getters }, id) {
      getters.found(id).quantity > 1 &&
        commit('DECREASE_CART_ITEM_QUANTITY', getters.found(id))

    },
    /* more code */
```

## Checkout

### Formulario

En el formulario se recogen los datos del cliente, dirección de envío y método de pago.
Aunque el envío de los datos se puede hacer a mediante un manejador de eventos al hacer click en el botón es preferible aprovechat el evento submit del formulario.

El botón de envío está en un componente distinto de donde se encuentra el formulario. Para asociar este botón con el formulario que va a desencadenar el evento submit es necesario utilizar un identificador mediante el atributo `form="checkoutForm"` del elemento `button`

📄 **CheckoutForm.vue**

```html
<!-- '.prevent' evita que la página se recargue -->
<!-- 'id' para asociar 'form' con su botón correspondiente -->
<form
  @submit.prevent="sendForm"
  id="checkoutForm"
  class="checkout__form"
  novalidate="true"
></form>
```

El botón asociado al formulario:

📄 **CheckoutSummary.vue**

```html
<BaseButton
  :type="'submit'"
  form="checkoutForm"
  class="btn--primary btn--block"
  text="Continue & pay"
/>
```

### Validación del formulario

Se hace una validación básica de los datos del formulario antes de enviarlo. Si un campo no es válido se muestra un mensaje en rojo.

📄 **CheckoutForm.vue**

```html
// En el componente del input
<BaseInput
  label="Name"
  v-model="clientDetails.name"
  type="text"
  placeholder="Alexei Ward"
  :error="errors.name"
/>
```

```javascript
export default {
  /* código */
  data() {
    return {
      errors: {},
      clientDetails: {
        name: '',
        email: '',
        /* más datos */
      }
    }
  },

  methods: {

    formNotValid() {
      this.errors = {}

      const { paymentMethod, eMoney, ...clientDetailsRest } = this.clientDetails

      for (const detail in clientDetailsRest) {
          if (!clientDetailsRest[detail]) {
            this.errors[detail] = `${detail} required`
          }
       }
       return Object.keys(this.errors).length !== 0 ? true : false
  },
  /* código */
```

Si es todo correcto se envían los datos mediante POST con axios, y al recibir la respuesta del servidor se muestra la ventana modal con la confirmación del envío. Si el formulario tiene algún error al rellenarlo se muetran los mensajes correspondientes a cada campo del formulario y los datos no se envían.

```javascript
sendForm() {
  // 1. Si da algún error no envía los datos
  if (this.formNotValid()) {
    return
  }

  // 2. Se envían los datos
  ProductService.sendShoppingDetails(this.clientDetails)
    .then((response) => {
      this.$store.dispatch('openModalComponent', 'ShoppingConfirmation')
      this.$store.commit('SET_IS_OPEN', true)
    })
    .catch((error) => {
      console.log('Error', error)
    })
},
```

## Construido con

- HTML
- CSS y Sass
- Flexbox
- CSS Grid
- Responsive Design
- [Vue 3](https://v3.vuejs.org/) - librería JS
- [Vue Router](https://next.router.vuejs.org/) - Para las rutas
- [Vuex](https://next.vuex.vuejs.org/)
