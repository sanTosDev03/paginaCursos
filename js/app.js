// Variables
const shop = document.querySelector('#carrito');
const shopContainer = document.querySelector('#lista-carrito tbody');
const clearContainerBtn = document.querySelector('#vaciar-carrito');
const coursesList = document.querySelector('#lista-cursos');
let articulosCarrito = []; 

loadEventListeners();
function loadEventListeners() {
    // Cuando Agreges un curso presionando en "Agregar al carrito";
    coursesList.addEventListener('click',loadCourse);

    // Elmina cursos del carrito
    shop.addEventListener('click',eliminarCurso);

    // Vaciar carrito
    clearContainerBtn.addEventListener('click', () => {

        articulosCarrito = []; // Reiniciar carrito
        cleanHTML(); // Cargar cambios
    })
}

// Funciones 

function loadCourse(e) {
    e.preventDefault(); // Para solucionar el salto al hacer click

   if (e.target.classList.contains('agregar-carrito')) {
    const courseCardSelected = e.target.parentElement.parentElement;
    leerDatosCurso(courseCardSelected);
   }
}

function eliminarCurso(e) {
    e.preventDefault(); // Para solucionar el salto al hacer click

    const deleteElement = e;
    if (deleteElement.target.classList.contains('borrar-curso')) {
        const courseID = deleteElement.target.getAttribute('data-id');

        // Elimina del arreglo articulosCarrito por el data-id con .filter
        articulosCarrito = articulosCarrito.filter( course => course.id !== courseID )
        
        carritoHTML();
    }
}


function leerDatosCurso(course) {
    const courseInfo = {
        imagen: course.querySelector('img').src,
        name: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        id: course.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }
    const existe = articulosCarrito.some( course => course.id === courseInfo.id)

        if(existe) {
            // Actualizar la cantidad
            const courses = articulosCarrito.some( course => {
                if (course.id === courseInfo.id) {
                    course.cantidad++;
                    return course; // Retorna el objeto duplicado
                } else {
                    return course; // Retorna los objetos que no son duplicados
                }
            })
        } else {
            articulosCarrito.push(courseInfo);
        }



    console.log(articulosCarrito);
    carritoHTML();
}

// Muestra el carrito de compra 

function carritoHTML() {

    // Limpiando el HTML acumulado

    cleanHTML();

    // Recorriendo el carrito y agregando al HTML
    articulosCarrito.forEach( course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src="${course.imagen}" width=100 alt="${course.name}" > </td>
            <td>${course.name}</td>
            <td>${course.price} </td>
            <td>${course.cantidad}</td>
            <td> <a href="#" class="borrar-curso" data-id=${course.id}>X</a> </td>
        `  

        // Agrega el HTML del carrito en el 'tbody'
        shopContainer.appendChild(row)
    })
}

function cleanHTML() {
   while(shopContainer.firstChild) {
        shopContainer.removeChild(shopContainer.firstChild);
   }
}



