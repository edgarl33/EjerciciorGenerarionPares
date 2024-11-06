const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;
const $n = document.querySelector('#name'); // Se cambió 'name' por '#name' para seleccionar un id
const $b = document.querySelector('#blog'); // Selector correcto para el id 'blog'
const $l = document.querySelector('.location'); // Selector correcto para la clase 'location'

// La función displayUser se define como asincrónica para poder usar 'await' dentro de ella
async function displayUser(username) {
  $n.textContent = 'Cargando...'; // Mensaje de carga temporal mientras se espera la respuesta de la API

  try {
    // Se realiza la solicitud a la API de GitHub
    const response = await fetch(`${usersEndpoint}/${username}`);

    // Verifica si la respuesta es exitosa
    if (!response.ok) throw new Error(`Usuario no encontrado: ${response.status}`);

    // Convierte la respuesta a JSON
    const data = await response.json();

    // Asigna los datos de la API a los elementos HTML correspondientes
    $n.textContent = data.name;
    $b.textContent = data.blog;
    $l.textContent = data.location;
  } catch (err) {
    handleError(err); // Maneja cualquier error que ocurra en la solicitud
  }
}

// Función para manejar errores y mostrarlos en la consola
function handleError(err) {
  console.log('OH NO!');
  console.log(err);
  $n.textContent = `Algo salió mal: ${err.message}`; // Muestra el error en el elemento $n
}

// Llama a la función displayUser y maneja errores
displayUser('stolinski');
