document.addEventListener('DOMContentLoaded', () => {
   
  const productosContainer = document.getElementById('productos');
  const carritoLista = document.getElementById('carrito-lista');
  const totalElement = document.getElementById('total');

  // productos con precio y stock
  const carrito = [ ];
  const productos = [ ];
  fetch("/data/producto.json")
    .then( resp => resp.json())
    .then( data => {
        products = [...data];
        console.log(products);
    })

     let mostrarProductos = async () => {
        try {
            const resp = await fetch("/data/producto.json"); 
            const data = await resp.json();
            const productos= [...data]

            productos.forEach(producto => {
                const productoElement = document.createElement('div');
                productoElement.className = 'producto';
                productoElement.innerHTML = `
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio}</p>
                    <p>Stock: ${producto.stock}</p>
                    <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
                `;
                productosContainer.appendChild(productoElement);
            });
    
        } catch (error) {
            console.log("Error al cargar los productos:", error);
        }
    };
  
  
 //  agregar productos al carrito
 
let agregarAlCarrito = async (producto,id) => {
    try {
        const resp = await fetch("/data/producto.json");
        const data = await resp.json();
        const productos = [...data ] ;
        const productoSeleccionado = productos.find(producto => producto.id === productId);
        const cantidadInput = document.getElementById(`cantidad-${productId}`);
        const cantidad = parseInt(cantidadInput.value);
        const productoAgregado = document.createElement  (`button`); HTMLButtonElement.onclick ( productoAgregado )
        productoElement.className= 'agregarcarrito'
        productoElement.innerHTML=`<button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>`;
        productosContainer.appendChild(productoAgregado);
       

        if (productoSeleccionado && productoSeleccionado.stock >= cantidad) {
            if (cantidadesEnCarrito[productId]) {
                cantidadesEnCarrito[productId] === cantidad;
            } else {
                cantidadesEnCarrito[productId] != cantidad;
            }

            const itemEnCarrito = document.createElement('li');
            itemEnCarrito.innerHTML = `${productoSeleccionado.nombre} - $${productoSeleccionado.precio} x ${cantidad}`;
            carritoLista.appendChild(itemEnCarrito);

            productoSeleccionado.stock -= cantidad;
            mostrarProductos();
            actualizarTotal();
        } else {
            alert('Cantidad no válida o producto agotado');
        }
    } catch (error) {
        console.log("Error al cargar los productos:", error);
    } 
};



  //  actualizar el total del carrito
 let actualizarTotal  = async  (producto,id) => {
    try{
        const resp = await fetch("/data/producto.json");
        const data = await resp.json();
        const productos = [...data ] ;
      let total = 0;
      localStorage.setItem("productos", JSON.stringify(producto));
      Array.from(carritoLista.children).forEach(item => {
          const precio = parseFloat(item.innerHTML.split('$')[1]);
          total += precio;

      });
      totalElement.textContent = total.toFixed(2); 
    } catch (error) {
        console.log("Error al cargar los productos:", error);
    } 
  }
    
     realizarCompra = () => {
     Swal.fire({
      title: "Compra realizada",
      icon: "success"
    });
    
    carritoLista.innerHTML = '';
    totalElement.textContent = '0.00';
    cantidadesEnCarrito = {}; 
    productos.forEach(producto => {
        producto.stock = Math.floor(Math.random() * 10) + 1; 
    });
    mostrarProductos();
};

    
  mostrarProductos();
 
});